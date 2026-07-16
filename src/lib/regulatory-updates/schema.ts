import { z } from "zod";
import {
  checklistClassificationSchema,
  isoDateSchema,
  regulatoryRecordControlFields,
  regulatoryRecordControlSchema,
} from "@/lib/regulatory/schema";

export const updateAgencySchema = z.enum(["FDA", "EMA"]);
export const updateCategorySchema = z.enum(["regulatory_guidance", "safety_intelligence"]);
export const updateImpactClassificationSchema = z.enum([
  "conditional",
  "potentially_impacted",
  "undetermined",
]);
export const safetySourceTypeSchema = z.enum([
  "potential_signal",
  "safety_communication",
  "prac_recommendation",
  "product_information_wording",
  "dhpc",
]);

export const safetyIntelligenceSchema = z.object({
  sourceType: safetySourceTypeSchema,
  productNames: z.array(z.string().min(1)).min(1),
  activeSubstances: z.array(z.string().min(1)).min(1),
  safetyTopic: z.string().min(1),
  safetyStage: z.enum([
    "potential_signal",
    "under_assessment",
    "assessment_completed",
    "undetermined",
  ]),
  causalityStatus: z.enum([
    "not_applicable",
    "not_established",
    "under_evaluation",
    "supported",
    "not_supported",
    "undetermined",
  ]),
  regulatoryOutcome: z.enum([
    "additional_data_requested",
    "action_recommended",
    "labeling_change",
    "risk_management_change",
    "communication_issued",
    "no_action",
    "undetermined",
  ]),
  implementationStatus: z.enum([
    "not_applicable",
    "assessment_needed",
    "planned",
    "in_progress",
    "completed",
    "undetermined",
  ]),
  affectedDocuments: z
    .array(
      z.object({
        label: z.string().min(1),
        classification: checklistClassificationSchema,
      }),
    )
    .min(1),
  potentiallyAffectedFunctions: z.array(z.string().min(1)).min(1),
});

export const regulatoryUpdateSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    agency: updateAgencySchema,
    jurisdiction: z.enum(["United States", "European Union"]),
    category: updateCategorySchema.default("regulatory_guidance"),
    title: z.string().min(1),
    updateType: z.enum([
      "final_guidance",
      "draft_guidance",
      "regulatory_framework",
      "procedural_guidance",
      "procedural_timetable",
      "potential_signal",
      "safety_communication",
      "prac_recommendation",
      "product_information_wording",
      "dhpc",
    ]),
    sourceDocumentStatus: z.enum(["final", "draft", "effective", "updated"]),
    ...regulatoryRecordControlFields,
    sourceDate: z.object({
      date: isoDateSchema,
      type: z.enum(["issue_date", "content_current", "last_updated", "effective_date"]),
      label: z.string().min(1),
    }),
    commentDeadline: isoDateSchema.optional(),
    source: z.object({
      owner: updateAgencySchema,
      title: z.string().min(1),
      url: z.url(),
      location: z.string().min(1),
      versionLabel: z.string().min(1),
    }),
    summary: z.string().min(1),
    whyItMatters: z.string().min(1),
    impactClassification: updateImpactClassificationSchema,
    applicabilityBoundary: z.string().min(1),
    topics: z.array(z.string().min(1)).min(1),
    relatedRoutes: z.array(
      z.object({
        label: z.string().min(1),
        href: z.string().startsWith("/"),
      }),
    ),
    verificationQuestions: z.array(z.string().min(1)).min(1),
    safety: safetyIntelligenceSchema.optional(),
    recordVersion: z.string().min(1),
  })
  .superRefine((record, context) => {
    const expectedJurisdiction = record.agency === "FDA" ? "United States" : "European Union";
    if (record.jurisdiction !== expectedJurisdiction) {
      context.addIssue({
        code: "custom",
        path: ["jurisdiction"],
        message: "Agency and jurisdiction must match.",
      });
    }

    if (record.source.owner !== record.agency) {
      context.addIssue({
        code: "custom",
        path: ["source", "owner"],
        message: "Source owner must match the update agency.",
      });
    }

    const sourceHost = new URL(record.source.url).hostname;
    const expectedHost = record.agency === "FDA" ? "www.fda.gov" : "www.ema.europa.eu";
    if (sourceHost !== expectedHost) {
      context.addIssue({
        code: "custom",
        path: ["source", "url"],
        message: `Use the official ${expectedHost} source host.`,
      });
    }

    if (record.sourceDate.date > record.lastVerifiedDate) {
      context.addIssue({
        code: "custom",
        path: ["sourceDate", "date"],
        message: "Source date cannot be later than the verification date.",
      });
    }

    if (record.sourceDocumentStatus === "draft" && !record.commentDeadline) {
      context.addIssue({
        code: "custom",
        path: ["commentDeadline"],
        message: "Draft guidance records must expose the official comment deadline.",
      });
    }

    if (record.commentDeadline && record.commentDeadline < record.sourceDate.date) {
      context.addIssue({
        code: "custom",
        path: ["commentDeadline"],
        message: "Comment deadline cannot precede the source date.",
      });
    }

    const controlResult = regulatoryRecordControlSchema.safeParse(record);
    for (const issue of controlResult.success ? [] : controlResult.error.issues) {
      context.addIssue({
        code: "custom",
        path: issue.path,
        message: issue.message,
      });
    }

    if (record.category === "safety_intelligence" && !record.safety) {
      context.addIssue({
        code: "custom",
        path: ["safety"],
        message: "Safety Intelligence records require controlled safety fields.",
      });
    }

    if (record.category !== "safety_intelligence" && record.safety) {
      context.addIssue({
        code: "custom",
        path: ["category"],
        message: "Controlled safety fields require the Safety Intelligence category.",
      });
    }

    if (record.safety && record.updateType !== record.safety.sourceType) {
      context.addIssue({
        code: "custom",
        path: ["updateType"],
        message: "Update type and safety source type must match.",
      });
    }

    if (
      record.safety?.sourceType === "potential_signal" &&
      !["not_established", "under_evaluation", "undetermined"].includes(
        record.safety.causalityStatus,
      )
    ) {
      context.addIssue({
        code: "custom",
        path: ["safety", "causalityStatus"],
        message: "A potential-signal record cannot overstate causality.",
      });
    }
  });

export const regulatoryUpdateCollectionSchema = z
  .array(regulatoryUpdateSchema)
  .min(1)
  .superRefine((records, context) => {
    const slugs = records.map((record) => record.slug);
    if (new Set(slugs).size !== slugs.length) {
      context.addIssue({
        code: "custom",
        message: "Regulatory update slugs must be unique.",
      });
    }

    const sourceUrls = records.map((record) => record.source.url);
    if (new Set(sourceUrls).size !== sourceUrls.length) {
      context.addIssue({
        code: "custom",
        message: "Each update record must identify a distinct primary source URL.",
      });
    }
  });

export type RegulatoryUpdate = z.infer<typeof regulatoryUpdateSchema>;
export type UpdateImpactClassification = z.infer<typeof updateImpactClassificationSchema>;
