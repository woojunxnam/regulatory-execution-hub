import { drugProductSectionRecords } from "@/data/ctd/sections";
import {
  crossModuleConsistencyRulesSchema,
  qualitySummaryTraceabilitySchema,
  validateCrossModuleRules,
  validateQualitySummaryTraceability,
} from "@/lib/ctd/traceability";

export const qualitySummaryTraceability = qualitySummaryTraceabilitySchema.parse([
  {
    id: "qos-p1",
    qosLocation: "2.3.P.1",
    module3SectionId: "3.2.P.1",
    module3Slug: "3-2-p-1",
    relationship:
      "The summary should remain traceable to the controlled product description and composition sources without becoming a second source of truth.",
    topics: ["Dosage form", "Composition", "Presentation terminology"],
    sourceDocumentIds: ["p1-src-composition", "p1-src-description"],
    consistencyCheckIds: ["p1-check-batch-formula", "p1-check-labeling"],
    traceabilityStatus: "open",
    reviewStatus: "not_started",
    editorialReviewStatus: "source_verification_required",
    lastVerifiedDate: "2026-07-15",
  },
  {
    id: "qos-p2",
    qosLocation: "2.3.P.2",
    module3SectionId: "3.2.P.2",
    module3Slug: "3-2-p-2",
    relationship:
      "Summary conclusions must point back to controlled development rationale and preserve visible limitations and configuration differences.",
    topics: ["Formulation development", "Process development", "Control-strategy rationale"],
    sourceDocumentIds: ["p2-src-development-report", "p2-src-risk-assessment"],
    consistencyCheckIds: ["p2-check-control-strategy", "p2-check-configuration"],
    traceabilityStatus: "open",
    reviewStatus: "not_started",
    editorialReviewStatus: "source_verification_required",
    lastVerifiedDate: "2026-07-15",
  },
  {
    id: "qos-p3",
    qosLocation: "2.3.P.3",
    module3SectionId: "3.2.P.3",
    module3Slug: "3-2-p-3",
    relationship:
      "Manufacturer, process, control, and validation-status summaries must remain aligned with the current controlled manufacturing records.",
    topics: ["Manufacturers", "Batch formula", "Process and controls", "Validation status"],
    sourceDocumentIds: ["p3-src-master-record", "p3-src-site-map"],
    consistencyCheckIds: ["p3-check-batch-formula", "p3-check-sites"],
    traceabilityStatus: "blocked",
    reviewStatus: "not_started",
    editorialReviewStatus: "source_verification_required",
    lastVerifiedDate: "2026-07-15",
  },
  {
    id: "qos-p5",
    qosLocation: "2.3.P.5",
    module3SectionId: "3.2.P.5",
    module3Slug: "3-2-p-5",
    relationship:
      "The control-strategy summary must trace to current specification, method, validation, batch-analysis, impurity, and justification records.",
    topics: [
      "Specifications",
      "Analytical procedures",
      "Validation",
      "Batch analyses",
      "Impurities",
    ],
    sourceDocumentIds: ["src-specification", "src-methods", "src-validation"],
    consistencyCheckIds: ["check-spec-method", "check-stability", "check-impurities"],
    traceabilityStatus: "open",
    reviewStatus: "not_started",
    editorialReviewStatus: "source_verification_required",
    lastVerifiedDate: "2026-07-15",
  },
  {
    id: "qos-p7",
    qosLocation: "2.3.P.7",
    module3SectionId: "3.2.P.7",
    module3Slug: "3-2-p-7",
    relationship:
      "The summary configuration and suitability conclusion must use the same component terminology and controlled evidence map as Module 3.",
    topics: ["Container-closure configuration", "Component controls", "Suitability evidence"],
    sourceDocumentIds: ["p7-src-component-specs", "p7-src-suitability"],
    consistencyCheckIds: ["p7-check-configuration", "p7-check-terminology"],
    traceabilityStatus: "blocked",
    reviewStatus: "not_started",
    editorialReviewStatus: "source_verification_required",
    lastVerifiedDate: "2026-07-15",
  },
  {
    id: "qos-p8",
    qosLocation: "2.3.P.8",
    module3SectionId: "3.2.P.8",
    module3Slug: "3-2-p-8",
    relationship:
      "Stability conclusions in the summary must identify the same controlled data cut, configurations, and commitment status used in Module 3.",
    topics: ["Stability evidence", "Data cut-off", "Conclusions", "Commitments"],
    sourceDocumentIds: ["p8-src-master-plan", "p8-src-data-extract"],
    consistencyCheckIds: ["p8-check-configuration", "p8-check-conclusions"],
    traceabilityStatus: "blocked",
    reviewStatus: "not_started",
    editorialReviewStatus: "source_verification_required",
    lastVerifiedDate: "2026-07-15",
  },
]);

const traceabilityIssues = validateQualitySummaryTraceability(qualitySummaryTraceability, [
  ...drugProductSectionRecords,
]);

if (traceabilityIssues.length) {
  throw new Error(`Invalid Quality Overall Summary traceability: ${traceabilityIssues.join(" ")}`);
}

export const crossModuleConsistencyRules = crossModuleConsistencyRulesSchema.parse([
  {
    id: "cross-composition-batch-formula",
    label: "Composition and batch-formula relationship is reconciled",
    comparedLocations: ["2.3.P.1", "3.2.P.1", "3.2.P.3.2"],
    sourceSectionIds: ["3.2.P.1", "3.2.P.3"],
    severity: "critical",
    status: "unresolved",
    rationale:
      "The current master manufacturing record is under review; no value is selected automatically.",
    owner: "Regulatory CMC",
    lastEvaluatedDate: "2026-07-15",
  },
  {
    id: "cross-development-control-strategy",
    label: "Development rationale aligns with manufacture and finished-product controls",
    comparedLocations: ["2.3.P.2", "3.2.P.2", "3.2.P.3", "3.2.P.5"],
    sourceSectionIds: ["3.2.P.2", "3.2.P.3", "3.2.P.5"],
    severity: "critical",
    status: "unable_to_compare",
    rationale: "The controlled development report and manufacturing record are not both approved.",
    owner: "Product Development",
    lastEvaluatedDate: "2026-07-15",
  },
  {
    id: "cross-container-stability",
    label: "Container-closure configurations match the stability evidence set",
    comparedLocations: ["2.3.P.7", "2.3.P.8", "3.2.P.7", "3.2.P.8"],
    sourceSectionIds: ["3.2.P.7", "3.2.P.8"],
    severity: "critical",
    status: "unresolved",
    rationale: "The packaging specification set and stability data extract remain under review.",
    owner: "Stability",
    lastEvaluatedDate: "2026-07-15",
  },
  {
    id: "cross-summary-source-version",
    label: "Module 2.3 and Module 3 use the same controlled source versions",
    comparedLocations: ["2.3.P", "3.2.P"],
    sourceSectionIds: ["3.2.P.1", "3.2.P.2", "3.2.P.3", "3.2.P.5", "3.2.P.7", "3.2.P.8"],
    severity: "high",
    status: "unable_to_compare",
    rationale:
      "Module 2.3 records are an editorial traceability draft and have not completed source-version reconciliation.",
    owner: "Regulatory CMC",
    lastEvaluatedDate: "2026-07-15",
  },
]);

const consistencyRuleIssues = validateCrossModuleRules(crossModuleConsistencyRules, [
  ...drugProductSectionRecords,
]);

if (consistencyRuleIssues.length) {
  throw new Error(`Invalid cross-module consistency rules: ${consistencyRuleIssues.join(" ")}`);
}
