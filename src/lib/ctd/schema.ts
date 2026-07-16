import { z } from "zod";
import { calculateSourceSetHash } from "@/lib/ctd/integrity";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use an ISO date (YYYY-MM-DD).");

export const requirementClassificationSchema = z.enum([
  "required",
  "conditional",
  "recommended",
  "potentially_impacted",
  "best_practice",
  "undetermined",
]);

export const sourceApprovalStatusSchema = z.enum([
  "missing",
  "draft",
  "under_review",
  "approved",
  "superseded",
  "not_applicable",
]);

export const editorialReviewStatusSchema = z.enum([
  "source_verification_required",
  "source_checked",
  "human_reviewed",
]);

export const ctdExpectationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  classification: requirementClassificationSchema,
  appliesWhen: z.string().min(1).optional(),
  citationIds: z.array(z.string().min(1)).min(1),
});

export const sourceDocumentRequirementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
  owner: z.string().min(1),
  version: z.string().min(1),
  approvalStatus: sourceApprovalStatusSchema,
  sectionsSupported: z.array(z.string().min(1)).min(1),
  informationUsed: z.array(z.string().min(1)).min(1),
  notes: z.string().min(1),
  critical: z.boolean(),
  blocksFinalAuthoring: z.boolean(),
});

export const sourceDataRequirementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  owner: z.string().min(1),
  status: sourceApprovalStatusSchema,
  purpose: z.string().min(1),
  classification: requirementClassificationSchema,
});

export const consistencyCheckSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  comparedLocations: z.array(z.string().min(1)).min(2),
  severity: z.enum(["critical", "high", "medium", "low"]),
  status: z.enum(["pass", "unresolved", "intentional_difference", "unable_to_compare"]),
  rationale: z.string().min(1),
});

export const sourceVersionRecordSchema = z.object({
  versionLabel: z.string().min(1),
  sourceStatus: z.enum(["draft", "final", "effective", "superseded", "withdrawn"]),
  verifiedDate: isoDate,
  note: z.string().min(1),
});

export const regulatoryCitationSchema = z.object({
  id: z.string().min(1),
  owner: z.enum(["ICH", "FDA", "EMA"]),
  title: z.string().min(1),
  sourceStatus: z.enum(["draft", "final", "effective", "superseded", "withdrawn"]),
  publicationDate: isoDate.optional(),
  effectiveDate: isoDate.optional(),
  sectionOrPage: z.string().min(1),
  officialUrl: z.url(),
  lastVerifiedDate: isoDate,
  editorialReviewStatus: editorialReviewStatusSchema,
  note: z.string().min(1),
  versionHistory: z.array(sourceVersionRecordSchema).min(1),
});

export const reviewRecordSchema = z.object({
  id: z.string().min(1),
  entityType: z.literal("ctd_section"),
  entityId: z.string().min(1),
  reviewer: z.string().min(1),
  reviewerRole: z.string().min(1),
  reviewerQualifications: z.string().min(1),
  reviewDate: isoDate,
  result: z.enum(["approved", "changes_required", "rejected"]),
  notes: z.string().min(1),
  contentVersion: z.string().min(1),
  sourceSetHash: z.string().regex(/^[a-f0-9]{64}$/, "Use a SHA-256 source-set hash."),
});

export const contentVersionRecordSchema = z.object({
  version: z.string().min(1),
  date: isoDate,
  changeSummary: z.string().min(1),
  editorialReviewStatus: editorialReviewStatusSchema,
  sourceCitationIds: z.array(z.string().min(1)).min(1),
});

export const readinessContextSchema = z.object({
  ownersAssigned: z.boolean(),
  keyDecisionsStable: z.boolean(),
  dataCutoffConfirmed: z.boolean(),
  sourceVersionsConflict: z.boolean(),
  reviewCommentsClosed: z.boolean(),
  unresolvedQuestions: z.array(
    z.object({
      id: z.string().min(1),
      text: z.string().min(1),
      blocking: z.boolean(),
      resolved: z.boolean(),
      owner: z.string().min(1),
    }),
  ),
  dependencyStatuses: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      required: z.boolean(),
      resolved: z.boolean(),
    }),
  ),
});

export const ctdSectionSchema = z
  .object({
    sectionId: z.string().min(1),
    slug: z.string().min(1),
    title: z.string().min(1),
    module: z.number().int().min(1).max(5),
    category: z.enum(["drug_substance", "drug_product", "appendix", "regional"]),
    regulatoryPurpose: z.string().min(1),
    include: z.array(z.string().min(1)).min(1),
    normallyExclude: z.array(z.string().min(1)).min(1),
    informationExpected: z.array(ctdExpectationSchema).min(1),
    conditionalInformation: z.array(ctdExpectationSchema),
    sourceDocuments: z.array(sourceDocumentRequirementSchema).min(1),
    sourceData: z.array(sourceDataRequirementSchema).min(1),
    primaryOwner: z.string().min(1),
    contributors: z.array(z.string().min(1)).min(1),
    approvers: z.array(z.string().min(1)).min(1),
    dependencies: z.array(z.string().min(1)).min(1),
    crossReferences: z.array(z.string().min(1)).min(1),
    downstreamOutputs: z.array(z.string().min(1)).min(1),
    authoringQuestions: z.array(z.string().min(1)).min(1),
    smeQuestions: z.array(z.string().min(1)).min(1),
    expectedTables: z.array(z.string().min(1)).min(1),
    expectedFigures: z.array(z.string().min(1)),
    consistencyChecks: z.array(consistencyCheckSchema).min(1),
    reviewerQuestions: z.array(z.string().min(1)).min(1),
    commonDeficiencies: z.array(z.string().min(1)).min(1),
    inspectionRelevance: z.array(z.string().min(1)).min(1),
    officialSources: z.array(regulatoryCitationSchema),
    sourceStatus: z.enum(["draft", "final", "effective", "superseded"]),
    lastVerifiedDate: isoDate,
    contentVersion: z.string().min(1),
    editorialReviewStatus: editorialReviewStatusSchema,
    reviewer: z.string().min(1).optional(),
    reviewRecords: z.array(reviewRecordSchema),
    contentHistory: z.array(contentVersionRecordSchema).min(1),
    readinessContext: readinessContextSchema,
  })
  .superRefine((section, context) => {
    const citationIds = section.officialSources.map((citation) => citation.id);
    const citationIdSet = new Set(citationIds);

    if (citationIdSet.size !== citationIds.length) {
      context.addIssue({
        code: "custom",
        path: ["officialSources"],
        message: "Official citation IDs must be unique.",
      });
    }

    const reviewRecordIds = section.reviewRecords.map((record) => record.id);
    if (new Set(reviewRecordIds).size !== reviewRecordIds.length) {
      context.addIssue({
        code: "custom",
        path: ["reviewRecords"],
        message: "Review record IDs must be unique.",
      });
    }
    for (const [recordIndex, record] of section.reviewRecords.entries()) {
      if (record.entityId !== section.sectionId) {
        context.addIssue({
          code: "custom",
          path: ["reviewRecords", recordIndex, "entityId"],
          message: "Review record entityId must match the CTD section.",
        });
      }
    }

    const contentVersions = section.contentHistory.map((record) => record.version);
    if (new Set(contentVersions).size !== contentVersions.length) {
      context.addIssue({
        code: "custom",
        path: ["contentHistory"],
        message: "Content history versions must be unique.",
      });
    }

    const expectations = [...section.informationExpected, ...section.conditionalInformation];
    for (const [expectationIndex, expectation] of expectations.entries()) {
      for (const citationId of expectation.citationIds) {
        if (!citationIdSet.has(citationId)) {
          context.addIssue({
            code: "custom",
            path: ["informationExpected", expectationIndex, "citationIds"],
            message: `Citation ${citationId} is not present in officialSources.`,
          });
        }
      }
    }

    for (const [citationIndex, citation] of section.officialSources.entries()) {
      const currentVersionRecorded = citation.versionHistory.some(
        (version) =>
          version.sourceStatus === citation.sourceStatus &&
          version.verifiedDate === citation.lastVerifiedDate,
      );
      if (!currentVersionRecorded) {
        context.addIssue({
          code: "custom",
          path: ["officialSources", citationIndex, "versionHistory"],
          message: "Source version history must include the current status and verification date.",
        });
      }
    }

    const currentContentHistory = section.contentHistory.find(
      (record) => record.version === section.contentVersion,
    );
    if (!currentContentHistory) {
      context.addIssue({
        code: "custom",
        path: ["contentHistory"],
        message: "Content history must include the current contentVersion.",
      });
    } else {
      if (currentContentHistory.editorialReviewStatus !== section.editorialReviewStatus) {
        context.addIssue({
          code: "custom",
          path: ["contentHistory"],
          message: "Current content history and editorial review status must match.",
        });
      }
      const historyCitationIds = new Set(currentContentHistory.sourceCitationIds);
      if (
        historyCitationIds.size !== citationIdSet.size ||
        citationIds.some((citationId) => !historyCitationIds.has(citationId))
      ) {
        context.addIssue({
          code: "custom",
          path: ["contentHistory"],
          message: "Current content history must identify the complete official source set.",
        });
      }
    }

    if (section.editorialReviewStatus === "human_reviewed") {
      const sourceSetHash = calculateSourceSetHash(section.officialSources);
      const approvedReview = section.reviewRecords.find(
        (record) =>
          record.entityId === section.sectionId &&
          record.contentVersion === section.contentVersion &&
          record.sourceSetHash === sourceSetHash &&
          record.result === "approved",
      );
      if (!approvedReview) {
        context.addIssue({
          code: "custom",
          path: ["reviewRecords"],
          message:
            "human_reviewed requires an approved review record for the current content version and source set.",
        });
      }
      if (
        approvedReview &&
        currentContentHistory &&
        approvedReview.reviewDate < currentContentHistory.date
      ) {
        context.addIssue({
          code: "custom",
          path: ["reviewRecords"],
          message: "Approved review date cannot precede the current content version date.",
        });
      }
      const latestSourceVerificationDate = section.officialSources.reduce(
        (latest, citation) =>
          citation.lastVerifiedDate > latest ? citation.lastVerifiedDate : latest,
        "0000-00-00",
      );
      if (approvedReview && approvedReview.reviewDate < latestSourceVerificationDate) {
        context.addIssue({
          code: "custom",
          path: ["reviewRecords"],
          message: "Approved review date cannot precede the current source verification date.",
        });
      }
      if (!section.reviewer) {
        context.addIssue({
          code: "custom",
          path: ["reviewer"],
          message: "human_reviewed content must identify the reviewer.",
        });
      } else if (approvedReview && section.reviewer !== approvedReview.reviewer) {
        context.addIssue({
          code: "custom",
          path: ["reviewer"],
          message: "Section reviewer must match the approved current review record.",
        });
      }
    }
  });

export const sourceMatrixRowSchema = z.object({
  id: z.string().min(1),
  sourceDocument: z.string().min(1),
  sourceType: z.string().min(1),
  version: z.string().min(1),
  approvalStatus: sourceApprovalStatusSchema,
  owner: z.string().min(1),
  supportedSections: z.array(z.string().min(1)).min(1),
  informationUsed: z.array(z.string().min(1)).min(1),
  reviewStatus: z.enum(["not_started", "in_review", "closed"]),
  changeImpact: z.string().min(1),
});

export const sourceMatrixSchema = z.array(sourceMatrixRowSchema).min(1);

export type CtdSection = z.infer<typeof ctdSectionSchema>;
export type CtdExpectation = z.infer<typeof ctdExpectationSchema>;
export type SourceDocumentRequirement = z.infer<typeof sourceDocumentRequirementSchema>;
export type SourceApprovalStatus = z.infer<typeof sourceApprovalStatusSchema>;
export type RegulatoryCitation = z.infer<typeof regulatoryCitationSchema>;
export type ReviewRecord = z.infer<typeof reviewRecordSchema>;
export type ContentVersionRecord = z.infer<typeof contentVersionRecordSchema>;
export type SourceMatrixRow = z.infer<typeof sourceMatrixRowSchema>;
