import { z } from "zod";

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
  citationIds: z.array(z.string().min(1)),
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

export const ctdSectionSchema = z.object({
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
  readinessContext: readinessContextSchema,
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
export type SourceMatrixRow = z.infer<typeof sourceMatrixRowSchema>;
