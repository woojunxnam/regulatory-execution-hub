import { z } from "zod";
import type { CtdSection } from "@/lib/ctd/schema";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use an ISO date (YYYY-MM-DD).");

export const qualitySummaryTraceabilityRecordSchema = z.object({
  id: z.string().min(1),
  qosLocation: z.string().min(1),
  module3SectionId: z.string().min(1),
  module3Slug: z.string().min(1),
  relationship: z.string().min(1),
  topics: z.array(z.string().min(1)).min(1),
  sourceDocumentIds: z.array(z.string().min(1)).min(1),
  consistencyCheckIds: z.array(z.string().min(1)).min(1),
  traceabilityStatus: z.enum(["linked", "open", "blocked"]),
  reviewStatus: z.enum(["not_started", "in_review", "closed"]),
  editorialReviewStatus: z.enum([
    "source_verification_required",
    "source_checked",
    "human_reviewed",
  ]),
  lastVerifiedDate: isoDate,
});

export const qualitySummaryTraceabilitySchema = z
  .array(qualitySummaryTraceabilityRecordSchema)
  .min(1)
  .superRefine((records, context) => {
    const ids = records.map((record) => record.id);
    if (new Set(ids).size !== ids.length) {
      context.addIssue({ code: "custom", message: "Traceability record IDs must be unique." });
    }
    const qosLocations = records.map((record) => record.qosLocation);
    if (new Set(qosLocations).size !== qosLocations.length) {
      context.addIssue({ code: "custom", message: "QOS locations must be unique." });
    }
  });

export const crossModuleConsistencyRuleSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  comparedLocations: z.array(z.string().min(1)).min(2),
  sourceSectionIds: z.array(z.string().min(1)).min(2),
  severity: z.enum(["critical", "high", "medium", "low"]),
  status: z.enum(["pass", "unresolved", "intentional_difference", "unable_to_compare"]),
  rationale: z.string().min(1),
  owner: z.string().min(1),
  lastEvaluatedDate: isoDate,
});

export const crossModuleConsistencyRulesSchema = z.array(crossModuleConsistencyRuleSchema).min(1);

export type QualitySummaryTraceabilityRecord = z.infer<
  typeof qualitySummaryTraceabilityRecordSchema
>;
export type CrossModuleConsistencyRule = z.infer<typeof crossModuleConsistencyRuleSchema>;

export interface CrossModuleReadinessResult {
  state: "blocked" | "reviewer_ready";
  blockers: string[];
  warnings: string[];
}

export function validateQualitySummaryTraceability(
  records: QualitySummaryTraceabilityRecord[],
  sections: CtdSection[],
) {
  const sectionsById = new Map(sections.map((section) => [section.sectionId, section]));
  const issues: string[] = [];

  for (const record of records) {
    const section = sectionsById.get(record.module3SectionId);
    if (!section) {
      issues.push(`${record.id}: Module 3 section is missing.`);
      continue;
    }
    if (section.slug !== record.module3Slug) {
      issues.push(`${record.id}: Module 3 slug does not match the section record.`);
    }

    const sourceIds = new Set(section.sourceDocuments.map((source) => source.id));
    for (const sourceId of record.sourceDocumentIds) {
      if (!sourceIds.has(sourceId)) {
        issues.push(
          `${record.id}: Source document ${sourceId} is not present in ${section.sectionId}.`,
        );
      }
    }

    const checkIds = new Set(section.consistencyChecks.map((check) => check.id));
    for (const checkId of record.consistencyCheckIds) {
      if (!checkIds.has(checkId)) {
        issues.push(
          `${record.id}: Consistency check ${checkId} is not present in ${section.sectionId}.`,
        );
      }
    }
  }

  const mappedSectionIds = new Set(records.map((record) => record.module3SectionId));
  for (const section of sections) {
    if (!mappedSectionIds.has(section.sectionId)) {
      issues.push(`${section.sectionId}: Quality Overall Summary traceability record is missing.`);
    }
  }

  return issues;
}

export function validateCrossModuleRules(
  rules: CrossModuleConsistencyRule[],
  sections: CtdSection[],
) {
  const sectionIds = new Set(sections.map((section) => section.sectionId));
  const issues: string[] = [];

  for (const rule of rules) {
    for (const sectionId of rule.sourceSectionIds) {
      if (!sectionIds.has(sectionId)) {
        issues.push(`${rule.id}: Source section ${sectionId} is not available.`);
      }
    }
  }

  return issues;
}

export function evaluateCrossModuleReadiness(
  rules: CrossModuleConsistencyRule[],
): CrossModuleReadinessResult {
  const resolvedStatuses = new Set(["pass", "intentional_difference"]);
  const unresolved = rules.filter((rule) => !resolvedStatuses.has(rule.status));
  const blockers = unresolved
    .filter((rule) => rule.severity === "critical")
    .map((rule) => `${rule.label}: ${rule.status.replaceAll("_", " ")}`);
  const warnings = unresolved
    .filter((rule) => rule.severity !== "critical")
    .map((rule) => `${rule.label}: ${rule.status.replaceAll("_", " ")}`);

  return {
    state: blockers.length ? "blocked" : "reviewer_ready",
    blockers,
    warnings,
  };
}
