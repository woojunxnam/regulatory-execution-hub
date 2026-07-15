import { createEditorialQualitySection } from "@/data/ctd/sections/section-factory";

export const pharmaceuticalDevelopment = createEditorialQualitySection({
  sectionId: "3.2.P.2",
  slug: "3-2-p-2",
  title: "Pharmaceutical Development",
  module: 3,
  category: "drug_product",
  regulatoryPurpose:
    "Organize the source-supported development rationale that connects formulation, process, container-closure, microbiological attributes, and intended product performance. Applicability and the depth of discussion remain product- and program-specific.",
  include: [
    "A traceable account of formulation and process-development decisions relevant to the proposed product and control strategy.",
    "Relationships among critical material attributes, process understanding, product performance, and the proposed commercial presentation.",
    "Development evidence for container-closure, microbiological attributes, compatibility, or other topics when applicable.",
  ],
  normallyExclude: [
    "The concise composition presentation organized in 3.2.P.1.",
    "Commercial manufacturing instructions and batch formula organized in 3.2.P.3.",
    "Final specifications and analytical-procedure records organized in 3.2.P.5.",
  ],
  informationExpected: [
    {
      id: "p2-formulation-development",
      title: "Formulation-development rationale",
      description:
        "Connect formulation choices to controlled development evidence without storing proprietary formulation values in this demonstration.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1", "ich-m4q-qa"],
    },
    {
      id: "p2-process-development",
      title: "Process-development rationale",
      description:
        "Trace the development knowledge used to justify the proposed process and related control strategy.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1"],
    },
  ],
  conditionalInformation: [
    {
      id: "p2-microbiological-attributes",
      title: "Microbiological attributes",
      description:
        "Assess whether microbiological attributes, preservative considerations, or sterility-related development evidence belongs in the product narrative.",
      classification: "conditional",
      appliesWhen:
        "The dosage form, route, manufacturing approach, or product configuration makes the topic applicable.",
      citationIds: ["ich-m4q-r1"],
    },
    {
      id: "p2-regional-program-specific",
      title: "Regional or program-specific development considerations",
      description:
        "Confirm whether applicable regional guidance, agency advice, commitments, or product-specific evidence changes the discussion.",
      classification: "undetermined",
      appliesWhen: "Relevant regional or program-specific records exist.",
      citationIds: ["ema-m4q-step5", "fda-ectd"],
    },
  ],
  sourceDocuments: [
    {
      id: "p2-src-development-report",
      title: "Controlled pharmaceutical-development report",
      type: "Development knowledge record",
      owner: "Formulation Development",
      version: "DEMO-DRAFT-1",
      approvalStatus: "under_review",
      sectionsSupported: ["3.2.P.2", "2.3.P.2"],
      informationUsed: ["Formulation rationale", "Process rationale", "Product-performance links"],
      notes:
        "Demonstration metadata only; no product values or proprietary conclusions are stored.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p2-src-risk-assessment",
      title: "Product and process risk assessment",
      type: "Quality risk-management record",
      owner: "Product Development",
      version: "DEMO-1.0",
      approvalStatus: "approved",
      sectionsSupported: ["3.2.P.2", "3.2.P.3", "3.2.P.5"],
      informationUsed: [
        "Attribute relationships",
        "Process relationships",
        "Control-strategy rationale",
      ],
      notes:
        "The demonstration records approval state and relationships, not confidential risk rankings.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p2-src-advice",
      title: "Development advice, commitment, and correspondence inventory",
      type: "Regulatory program inventory",
      owner: "Regulatory CMC",
      version: "Not assigned",
      approvalStatus: "missing",
      sectionsSupported: ["3.2.P.2"],
      informationUsed: ["Agreed development positions", "Commitments", "Open agency questions"],
      notes: "Conditional source; establish applicability before final authoring.",
      critical: false,
      blocksFinalAuthoring: false,
    },
  ],
  sourceData: [
    {
      id: "p2-data-study-map",
      title: "Development study-to-conclusion map",
      owner: "Product Development",
      status: "under_review",
      purpose: "Connects each planned conclusion to a controlled study or documented rationale.",
      classification: "recommended",
    },
    {
      id: "p2-data-scale-map",
      title: "Development-to-commercial scale relationship map",
      owner: "Process Development",
      status: "approved",
      purpose:
        "Supports reconciliation of development knowledge with the proposed manufacturing description.",
      classification: "recommended",
    },
  ],
  primaryOwner: "Product Development",
  contributors: [
    "Formulation Development",
    "Process Development",
    "Analytical Development",
    "Regulatory CMC",
    "Quality Assurance",
  ],
  approvers: ["Product Development Lead", "Regulatory CMC Lead", "Quality Unit"],
  dependencies: [
    "The proposed composition, process description, control strategy, and container-closure configuration are identifiable.",
    "Development studies and conclusions have controlled versions and accountable owners.",
    "Applicable agency advice and commitments are inventoried.",
  ],
  crossReferences: [
    "2.3.P.2 — Pharmaceutical Development",
    "3.2.P.1 — Description and Composition",
    "3.2.P.3 — Manufacture",
    "3.2.P.5 — Control of Drug Product",
    "3.2.P.7 — Container-Closure System",
    "3.2.P.8 — Stability",
  ],
  downstreamOutputs: [
    "2.3 Quality Overall Summary",
    "Commercial control-strategy narrative",
    "Lifecycle knowledge and change-impact assessment",
  ],
  authoringQuestions: [
    "Is every development conclusion linked to a controlled source and the proposed commercial configuration?",
    "Are differences between development and commercial materials, scale, process, or presentation visible and reconciled?",
    "Are conditional development topics resolved through documented applicability decisions?",
  ],
  smeQuestions: [
    "Which development decisions are essential to understanding the proposed control strategy?",
    "Which studies or risk assessments support each material, process, and performance relationship?",
    "Which unresolved development assumptions could change another CTD section?",
  ],
  expectedTables: [
    "Development question-to-evidence traceability table",
    "Development and commercial configuration comparison table",
  ],
  expectedFigures: [
    "Optional product/process relationship diagram when supported by controlled development records",
  ],
  consistencyChecks: [
    {
      id: "p2-check-control-strategy",
      label: "Development rationale aligns with the proposed process and control strategy",
      comparedLocations: ["3.2.P.2", "3.2.P.3", "3.2.P.5", "2.3.P.2"],
      severity: "critical",
      status: "unable_to_compare",
      rationale:
        "The controlled development report remains under review and the complete cross-section mapping is not available.",
    },
    {
      id: "p2-check-configuration",
      label: "Development and proposed commercial configurations are reconciled",
      comparedLocations: ["3.2.P.1", "3.2.P.2", "3.2.P.7"],
      severity: "high",
      status: "unresolved",
      rationale: "The final configuration comparison has not been approved in this demonstration.",
    },
  ],
  reviewerQuestions: [
    "Does the narrative explain why the proposed product and process are appropriate without overstating the evidence?",
    "Are material, process, performance, and control-strategy relationships traceable?",
    "Are limitations, differences, and unresolved program-specific questions visible?",
  ],
  commonDeficiencies: [
    "Editorial QA risk: conclusions appear without a controlled evidence link.",
    "Editorial QA risk: development and commercial configurations are discussed as if identical without reconciliation.",
    "Editorial QA risk: the summary and Module 3 describe different development rationales.",
  ],
  inspectionRelevance: [
    "Potentially impacted: development knowledge may support the rationale for commercial controls and change management.",
    "This educational record does not determine inspection scope, validation acceptability, or site conformance.",
  ],
  readinessContext: {
    ownersAssigned: true,
    keyDecisionsStable: false,
    dataCutoffConfirmed: false,
    sourceVersionsConflict: false,
    reviewCommentsClosed: false,
    unresolvedQuestions: [
      {
        id: "p2-q-commercial-comparison",
        text: "Has the final development-to-commercial configuration comparison been approved?",
        blocking: true,
        resolved: false,
        owner: "Product Development",
      },
    ],
    dependencyStatuses: [
      {
        id: "p2-dep-development-report",
        label: "Controlled pharmaceutical-development report is approved",
        required: true,
        resolved: false,
      },
    ],
  },
  m4qLocation: "3.2.P.2, document pp.13–14 (PDF pp.18–19)",
  qnaLocation: "Applicable pharmaceutical-development and CTD-Q location Q&As",
  changeSummary: "Initial 3.2.P.2 structured editorial draft.",
});
