import type { ReadinessState } from "@/lib/ctd/readiness";
import type { SourceApprovalStatus } from "@/lib/ctd/schema";

export const readinessLabels: Record<ReadinessState, string> = {
  not_ready: "Not ready",
  ready_for_initial_drafting: "Ready for initial drafting",
  ready_for_final_authoring: "Ready for final authoring",
  reviewer_ready: "Reviewer ready",
};

export const sourceStatusLabels: Record<SourceApprovalStatus, string> = {
  missing: "Missing",
  draft: "Draft",
  under_review: "Under review",
  approved: "Approved",
  superseded: "Superseded",
  not_applicable: "Not applicable",
};

export const classificationLabels = {
  required: "Required",
  conditional: "Conditional",
  recommended: "Recommended",
  potentially_impacted: "Potentially impacted",
  best_practice: "Best practice",
  undetermined: "Undetermined",
} as const;
