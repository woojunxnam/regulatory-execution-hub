import type { CtdSection } from "@/lib/ctd/schema";
import { calculateSourceSetHash } from "@/lib/ctd/integrity";

export type ReadinessState =
  "not_ready" | "ready_for_initial_drafting" | "ready_for_final_authoring" | "reviewer_ready";

export interface ReadinessResult {
  state: ReadinessState;
  reasons: string[];
  blockers: string[];
  warnings: string[];
  nextActions: string[];
}

const approvedOrNotApplicable = new Set(["approved", "not_applicable"]);
const evidencePresent = new Set(["draft", "under_review", "approved", "not_applicable"]);

export function evaluateAuthoringReadiness(section: CtdSection): ReadinessResult {
  const hardBlockers: string[] = [];
  const warnings: string[] = [];

  for (const source of section.sourceDocuments) {
    if (source.critical && source.approvalStatus === "missing") {
      hardBlockers.push(`Critical source is missing: ${source.title}`);
    }
    if (source.critical && source.approvalStatus === "superseded") {
      hardBlockers.push(`Critical source is superseded: ${source.title}`);
    }
    if (!source.critical && source.approvalStatus === "missing") {
      warnings.push(`Conditional or non-critical source is not available: ${source.title}`);
    }
    if (!source.critical && source.approvalStatus === "superseded") {
      warnings.push(
        `Superseded source is retained for historical traceability only: ${source.title}`,
      );
    }
  }

  if (section.readinessContext.sourceVersionsConflict) {
    hardBlockers.push("Critical source versions conflict and require reconciliation.");
  }

  const blockingQuestions = section.readinessContext.unresolvedQuestions.filter(
    (question) => question.blocking && !question.resolved,
  );
  hardBlockers.push(
    ...blockingQuestions.map((question) => `Blocking question is unresolved: ${question.text}`),
  );

  if (hardBlockers.length > 0) {
    return {
      state: "not_ready",
      reasons: [
        "Initial drafting cannot start safely while critical evidence or strategy is blocked.",
      ],
      blockers: hardBlockers,
      warnings,
      nextActions: [
        "Obtain or replace each critical source.",
        "Resolve blocking strategy questions and reconcile source versions.",
        "Run the readiness assessment again after the structured record is updated.",
      ],
    };
  }

  const criticalEvidenceExists = section.sourceDocuments
    .filter((source) => source.critical)
    .every((source) => evidencePresent.has(source.approvalStatus));

  if (!criticalEvidenceExists || !section.readinessContext.ownersAssigned) {
    return {
      state: "not_ready",
      reasons: ["Core evidence and accountable owners are prerequisites for initial drafting."],
      blockers: [
        ...(!criticalEvidenceExists ? ["Not all critical evidence is available."] : []),
        ...(!section.readinessContext.ownersAssigned ? ["Required owners are not assigned."] : []),
      ],
      warnings,
      nextActions: ["Confirm core evidence availability and assign accountable owners."],
    };
  }

  const finalAuthoringBlockers = section.sourceDocuments
    .filter(
      (source) =>
        source.blocksFinalAuthoring && !approvedOrNotApplicable.has(source.approvalStatus),
    )
    .map((source) => `Final-authoring source is not approved: ${source.title}`);

  if (!section.readinessContext.keyDecisionsStable) {
    finalAuthoringBlockers.push("Key technical or regulatory decisions are not stable.");
  }
  if (!section.readinessContext.dataCutoffConfirmed) {
    finalAuthoringBlockers.push("The demonstration data cut-off is not confirmed.");
  }
  finalAuthoringBlockers.push(
    ...section.readinessContext.dependencyStatuses
      .filter((dependency) => dependency.required && !dependency.resolved)
      .map((dependency) => `Required dependency is unresolved: ${dependency.label}`),
  );

  if (finalAuthoringBlockers.length > 0) {
    return {
      state: "ready_for_initial_drafting",
      reasons: [
        "Core evidence exists and owners are assigned, so a controlled initial draft can begin.",
      ],
      blockers: finalAuthoringBlockers,
      warnings,
      nextActions: [
        "Advance blocking source documents to approved or record a justified not-applicable status.",
        "Stabilize key decisions, dependencies, and the data cut-off before final authoring.",
      ],
    };
  }

  const reviewerBlockers: string[] = [];
  if (section.officialSources.length === 0) {
    reviewerBlockers.push("No official citations are recorded.");
  }

  const resolvedConsistencyStatuses = new Set(["pass", "intentional_difference"]);
  const criticalDiscrepancies = section.consistencyChecks.filter(
    (check) => check.severity === "critical" && !resolvedConsistencyStatuses.has(check.status),
  );
  reviewerBlockers.push(
    ...criticalDiscrepancies.map(
      (check) => `Critical discrepancy is ${check.status.replaceAll("_", " ")}: ${check.label}`,
    ),
  );

  if (!section.readinessContext.reviewCommentsClosed) {
    reviewerBlockers.push("Demonstration review comments are not all closed.");
  }
  if (!section.lastVerifiedDate || !section.contentVersion) {
    reviewerBlockers.push("Verification metadata is incomplete.");
  }

  const currentSourceSetHash = calculateSourceSetHash(section.officialSources);
  const approvedCurrentReview = section.reviewRecords.find(
    (record) =>
      record.entityId === section.sectionId &&
      record.contentVersion === section.contentVersion &&
      record.sourceSetHash === currentSourceSetHash &&
      record.result === "approved",
  );
  if (!approvedCurrentReview || section.editorialReviewStatus !== "human_reviewed") {
    reviewerBlockers.push(
      "No approved qualified review record matches the current content version and source set.",
    );
  }

  if (reviewerBlockers.length > 0) {
    return {
      state: "ready_for_final_authoring",
      reasons: ["Final-authoring prerequisites pass, but reviewer-readiness checks remain open."],
      blockers: reviewerBlockers,
      warnings,
      nextActions: [
        "Reconcile citations, critical consistency checks, review comments, and verification metadata.",
      ],
    };
  }

  return {
    state: "reviewer_ready",
    reasons: [
      "Structured demonstration data passes final-authoring, citation, consistency, comment, and verification checks.",
    ],
    blockers: [],
    warnings: [
      ...warnings,
      "Reviewer-ready is an internal demonstration workflow state, not an FDA or EMA completeness decision.",
    ],
    nextActions: [
      "Preserve the approved review record and repeat qualified review if the content version or source set changes.",
    ],
  };
}
