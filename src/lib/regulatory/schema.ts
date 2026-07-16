import { z } from "zod";

export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use an ISO date (YYYY-MM-DD).");

export const regulatoryAgencySchema = z.enum(["FDA", "EMA", "EC", "ICH"]);
export const officialSourceStatusSchema = z.literal("official");
export const editorialReviewStatusSchema = z.enum([
  "source_verification_required",
  "source_checked",
  "human_reviewed",
]);

export const qualifiedReviewRecordSchema = z.object({
  id: z.string().min(1),
  reviewerRole: z.string().min(1),
  reviewedAt: isoDateSchema,
  scope: z.string().min(1),
  contentVersion: z.string().min(1),
});

export const regulatoryRecordControlFields = {
  officialSourceStatus: officialSourceStatusSchema,
  editorialReviewStatus: editorialReviewStatusSchema,
  qualifiedReviewRecord: qualifiedReviewRecordSchema.nullable(),
  lastVerifiedDate: isoDateSchema,
};

export const regulatoryRecordControlSchema = z
  .object(regulatoryRecordControlFields)
  .superRefine((record, context) => {
    if (record.editorialReviewStatus === "human_reviewed" && !record.qualifiedReviewRecord) {
      context.addIssue({
        code: "custom",
        path: ["qualifiedReviewRecord"],
        message: "Human-reviewed status requires a qualified review record.",
      });
    }

    if (record.editorialReviewStatus !== "human_reviewed" && record.qualifiedReviewRecord) {
      context.addIssue({
        code: "custom",
        path: ["qualifiedReviewRecord"],
        message: "A qualified review record requires human-reviewed editorial status.",
      });
    }
  });

export const officialSourceSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    owner: regulatoryAgencySchema,
    title: z.string().min(1),
    url: z.url(),
    location: z.string().min(1),
    versionLabel: z.string().min(1),
    sourceDate: isoDateSchema,
    ...regulatoryRecordControlFields,
  })
  .superRefine((record, context) => {
    const controlResult = regulatoryRecordControlSchema.safeParse(record);
    for (const issue of controlResult.success ? [] : controlResult.error.issues) {
      context.addIssue({
        code: "custom",
        path: issue.path,
        message: issue.message,
      });
    }
  });

export const checklistClassificationSchema = z.enum([
  "required",
  "conditional",
  "recommended",
  "potentially_impacted",
  "best_practice",
  "undetermined",
]);

export const checklistItemSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    classification: checklistClassificationSchema,
    applicability: z.string().min(1),
    preparationOutput: z.string().min(1),
    sourceIds: z.array(z.string().min(1)).min(1),
    verificationQuestions: z.array(z.string().min(1)).min(1),
    ...regulatoryRecordControlFields,
  })
  .superRefine((record, context) => {
    const controlResult = regulatoryRecordControlSchema.safeParse(record);
    for (const issue of controlResult.success ? [] : controlResult.error.issues) {
      context.addIssue({
        code: "custom",
        path: issue.path,
        message: issue.message,
      });
    }
  });

export type ChecklistClassification = z.infer<typeof checklistClassificationSchema>;
export type ChecklistItem = z.infer<typeof checklistItemSchema>;
export type OfficialSource = z.infer<typeof officialSourceSchema>;
