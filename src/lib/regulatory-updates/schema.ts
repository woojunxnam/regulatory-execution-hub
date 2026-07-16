import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use an ISO date (YYYY-MM-DD).");

export const updateAgencySchema = z.enum(["FDA", "EMA"]);
export const updateImpactClassificationSchema = z.enum([
  "conditional",
  "potentially_impacted",
  "undetermined",
]);

export const regulatoryUpdateSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    agency: updateAgencySchema,
    jurisdiction: z.enum(["United States", "European Union"]),
    title: z.string().min(1),
    updateType: z.enum([
      "final_guidance",
      "draft_guidance",
      "regulatory_framework",
      "procedural_guidance",
      "procedural_timetable",
    ]),
    officialSourceStatus: z.literal("official"),
    sourceDocumentStatus: z.enum(["final", "draft", "effective", "updated"]),
    editorialReviewStatus: z.literal("source_checked"),
    qualifiedReviewRecord: z.null(),
    sourceDate: z.object({
      date: isoDate,
      type: z.enum(["issue_date", "content_current", "last_updated", "effective_date"]),
      label: z.string().min(1),
    }),
    commentDeadline: isoDate.optional(),
    lastVerifiedDate: isoDate,
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
