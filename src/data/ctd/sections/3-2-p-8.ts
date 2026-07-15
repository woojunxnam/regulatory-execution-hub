import { createEditorialQualitySection } from "@/data/ctd/sections/section-factory";

export const stability = createEditorialQualitySection({
  sectionId: "3.2.P.8",
  slug: "3-2-p-8",
  title: "Stability",
  module: 3,
  category: "drug_product",
  regulatoryPurpose:
    "Organize stability conclusions, protocol and commitment status, and source-data traceability for the proposed drug product presentations. The adequacy of study design, data, shelf life, storage conditions, and commitments remains a qualified product-specific assessment.",
  include: [
    "A source-traceable summary of stability evidence and the proposed conclusion without duplicating raw study data.",
    "Controlled protocol, specification, batch, presentation, storage, time-point, and data-cut relationships.",
    "Post-approval protocol or commitment information when applicable and supported by current records.",
  ],
  normallyExclude: [
    "Detailed pharmaceutical-development rationale organized in 3.2.P.2.",
    "Container-closure component specifications organized in 3.2.P.7.",
    "Finished-product analytical procedure and validation records organized in 3.2.P.5.",
  ],
  informationExpected: [
    {
      id: "p8-summary-conclusions",
      title: "Stability summary and conclusions",
      description:
        "Connect each conclusion to controlled study, batch, configuration, method, and data-cut metadata without storing proprietary results here.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1", "ich-m4q-qa"],
    },
    {
      id: "p8-data-presentation",
      title: "Stability data presentation",
      description:
        "Organize traceable study and result locations using the current approved data extract and defined authoring cut-off.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1"],
    },
  ],
  conditionalInformation: [
    {
      id: "p8-protocol-commitment",
      title: "Post-approval stability protocol and commitment",
      description:
        "Determine whether a protocol, commitment, or ongoing study status must be presented for the intended filing context.",
      classification: "conditional",
      appliesWhen:
        "Ongoing studies, filing-stage data maturity, or an agreed commitment makes the topic applicable.",
      citationIds: ["ich-m4q-r1", "ema-m4q-step5"],
    },
    {
      id: "p8-program-specific",
      title: "Program-specific stability consideration",
      description:
        "Confirm whether product-specific evidence, regional guidance, advice, or correspondence changes the presentation or assessment.",
      classification: "undetermined",
      appliesWhen: "An applicable program record identifies a specific stability question.",
      citationIds: ["ema-m4q-step5", "fda-ectd"],
    },
  ],
  sourceDocuments: [
    {
      id: "p8-src-master-plan",
      title: "Controlled stability master plan and protocol set",
      type: "Stability program record",
      owner: "Stability",
      version: "DEMO-1.0",
      approvalStatus: "approved",
      sectionsSupported: ["3.2.P.8", "2.3.P.8"],
      informationUsed: [
        "Study design metadata",
        "Configuration mapping",
        "Protocol and commitment status",
      ],
      notes:
        "Demonstration metadata only; storage conditions, time points, and product-specific criteria are not retained.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p8-src-data-extract",
      title: "Validated stability data extract",
      type: "Controlled analytical data extract",
      owner: "Stability Data Management",
      version: "DEMO-DRAFT-1",
      approvalStatus: "under_review",
      sectionsSupported: ["3.2.P.8", "2.3.P.8"],
      informationUsed: ["Batch and time-point coverage", "Result locations", "Data cut-off"],
      notes:
        "No results are stored; final authoring is blocked until the controlled extract and data cut-off are approved.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p8-src-commitment-inventory",
      title: "Stability commitment and correspondence inventory",
      type: "Regulatory program inventory",
      owner: "Regulatory CMC",
      version: "Not assigned",
      approvalStatus: "missing",
      sectionsSupported: ["3.2.P.8"],
      informationUsed: ["Commitments", "Agency advice", "Ongoing study status"],
      notes: "Conditional source; confirm applicability before final authoring.",
      critical: false,
      blocksFinalAuthoring: false,
    },
  ],
  sourceData: [
    {
      id: "p8-data-study-map",
      title: "Study, batch, presentation, and protocol map",
      owner: "Stability",
      status: "approved",
      purpose: "Supports coverage and configuration traceability across stability evidence.",
      classification: "recommended",
    },
    {
      id: "p8-data-cut",
      title: "Authoring data-cut inventory",
      owner: "Stability Data Management",
      status: "under_review",
      purpose:
        "Records which controlled extract supports the current draft and identifies late-data handling.",
      classification: "recommended",
    },
  ],
  primaryOwner: "Stability",
  contributors: [
    "Stability Data Management",
    "Analytical Development",
    "Packaging Engineering",
    "Regulatory CMC",
    "Quality Assurance",
  ],
  approvers: ["Stability Lead", "Regulatory CMC Lead", "Quality Unit"],
  dependencies: [
    "The proposed formulation, manufacturing process, specifications, and container-closure configurations are identifiable.",
    "The controlled stability data extract and authoring cut-off are approved.",
    "Ongoing studies, commitments, deviations, and late data have documented disposition.",
  ],
  crossReferences: [
    "2.3.P.8 — Stability",
    "3.2.P.2 — Pharmaceutical Development",
    "3.2.P.5 — Control of Drug Product",
    "3.2.P.7 — Container-Closure System",
    "Applicable labeling storage and shelf-life locations",
  ],
  downstreamOutputs: [
    "2.3 Quality Overall Summary",
    "Proposed shelf-life and storage-condition consistency review",
    "Post-approval stability commitment tracking",
  ],
  authoringQuestions: [
    "Does each stability conclusion trace to the approved data extract and defined data cut-off?",
    "Are batches, strengths, presentations, manufacturing configurations, and analytical methods reconciled?",
    "Are ongoing work and commitments distinguished from completed evidence?",
  ],
  smeQuestions: [
    "Which controlled extract is the source of truth for the current authoring cut-off?",
    "Which batches and configurations support each proposed conclusion?",
    "Which deviations, trends, changes, or late data require documented assessment?",
  ],
  expectedTables: [
    "Study, batch, presentation, condition, time-point, and source traceability table",
    "Stability conclusion-to-evidence and commitment table",
  ],
  expectedFigures: [
    "Optional trend visualization generated only from an approved controlled dataset",
  ],
  consistencyChecks: [
    {
      id: "p8-check-configuration",
      label:
        "Stability configurations align with formulation, manufacture, and container-closure records",
      comparedLocations: ["3.2.P.1", "3.2.P.3", "3.2.P.7", "3.2.P.8", "2.3.P.8"],
      severity: "critical",
      status: "unable_to_compare",
      rationale:
        "The final controlled stability extract and packaging configuration map are not both approved.",
    },
    {
      id: "p8-check-conclusions",
      label: "Stability conclusions align with specifications and proposed labeling terminology",
      comparedLocations: ["3.2.P.5", "3.2.P.8", "2.3.P.8", "Labeling"],
      severity: "critical",
      status: "unresolved",
      rationale: "The authoring data cut-off and labeling reconciliation are not closed.",
    },
  ],
  reviewerQuestions: [
    "Are conclusions proportionate to the controlled evidence and current data cut-off?",
    "Is coverage across batches, configurations, conditions, and time points visible and traceable?",
    "Are ongoing studies, commitments, deviations, and limitations accurately distinguished?",
  ],
  commonDeficiencies: [
    "Editorial QA risk: a stability conclusion is based on a different data cut than the displayed tables.",
    "Editorial QA risk: the container-closure or manufacturing configuration differs from the supported stability configuration.",
    "Editorial QA risk: ongoing or planned data are described as complete.",
  ],
  inspectionRelevance: [
    "Potentially impacted: stability protocols, data governance, investigations, and ongoing commitments may support inspection preparation.",
    "This educational record does not determine shelf-life acceptability, data integrity, or inspection scope.",
  ],
  readinessContext: {
    ownersAssigned: true,
    keyDecisionsStable: true,
    dataCutoffConfirmed: false,
    sourceVersionsConflict: false,
    reviewCommentsClosed: false,
    unresolvedQuestions: [
      {
        id: "p8-q-data-cut",
        text: "Has the validated stability data extract and authoring cut-off been approved?",
        blocking: true,
        resolved: false,
        owner: "Stability Data Management",
      },
    ],
    dependencyStatuses: [
      {
        id: "p8-dep-data-extract",
        label: "Validated stability data extract is approved",
        required: true,
        resolved: false,
      },
    ],
  },
  m4qLocation: "3.2.P.8, document pp.19–20 (PDF pp.24–25)",
  qnaLocation: "Applicable stability and CTD-Q location Q&As",
  changeSummary: "Initial 3.2.P.8 structured editorial draft.",
});
