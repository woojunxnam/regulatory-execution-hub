import { createEditorialQualitySection } from "@/data/ctd/sections/section-factory";

export const manufacture = createEditorialQualitySection({
  sectionId: "3.2.P.3",
  slug: "3-2-p-3",
  title: "Manufacture",
  module: 3,
  category: "drug_product",
  regulatoryPurpose:
    "Organize manufacturer, batch-formula, process, control, and process-evaluation evidence within the current M4Q(R1) structure. Site, process, validation, and regional applicability must be established from controlled program records.",
  include: [
    "Traceable manufacturer and responsibility information for relevant drug product operations.",
    "A controlled batch-formula relationship and a process description with identified controls and decision points.",
    "Process-control and validation or evaluation information when applicable to the product, process, and filing stage.",
  ],
  normallyExclude: [
    "Formulation and process-development rationale organized in 3.2.P.2.",
    "Finished-product specifications and analytical procedures organized in 3.2.P.5.",
    "Detailed stability protocols and results organized in 3.2.P.8.",
  ],
  informationExpected: [
    {
      id: "p3-manufacturer-responsibility",
      title: "Manufacturer and responsibility mapping",
      description:
        "Map relevant operations to controlled site and responsibility records without asserting an unverified facility scope.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1", "fda-ectd"],
    },
    {
      id: "p3-process-controls",
      title: "Manufacturing process and controls",
      description:
        "Present a source-traceable process sequence and control framework consistent with approved manufacturing records.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1", "ich-m4q-qa"],
    },
  ],
  conditionalInformation: [
    {
      id: "p3-validation-evaluation",
      title: "Process validation or evaluation information",
      description:
        "Determine the applicable validation or evaluation presentation from product, process, filing-stage, and regional context.",
      classification: "conditional",
      appliesWhen:
        "The applicable dossier structure, product/process risk, or regional filing context calls for this information.",
      citationIds: ["ich-m4q-r1", "ema-m4q-step5"],
    },
    {
      id: "p3-novel-operation",
      title: "Program-specific operation or control",
      description:
        "Identify whether an operation, technology, or agency position requires additional source-supported explanation.",
      classification: "undetermined",
      appliesWhen:
        "The controlled risk assessment or program correspondence identifies a program-specific topic.",
      citationIds: ["ema-m4q-step5", "fda-m4q-r2-draft"],
    },
  ],
  sourceDocuments: [
    {
      id: "p3-src-master-record",
      title: "Controlled master manufacturing record",
      type: "Manufacturing instruction",
      owner: "Manufacturing",
      version: "DEMO-DRAFT-2",
      approvalStatus: "under_review",
      sectionsSupported: ["3.2.P.3", "3.2.P.1", "2.3.P.3"],
      informationUsed: ["Batch formula relationship", "Process sequence", "In-process controls"],
      notes:
        "Demonstration metadata only; no formulation, process parameter, or batch-size values are stored.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p3-src-site-map",
      title: "Manufacturer and operation responsibility map",
      type: "Controlled site-responsibility record",
      owner: "Regulatory CMC",
      version: "DEMO-1.0",
      approvalStatus: "approved",
      sectionsSupported: ["3.2.P.3", "2.3.P.3", "Module 1 regional forms"],
      informationUsed: ["Site identity", "Operation responsibility", "Cross-document terminology"],
      notes: "Non-confidential demonstration record; actual facility details are not retained.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p3-src-validation-plan",
      title: "Process validation and evaluation strategy",
      type: "Validation lifecycle record",
      owner: "Process Validation",
      version: "Not assigned",
      approvalStatus: "missing",
      sectionsSupported: ["3.2.P.3"],
      informationUsed: ["Applicability decision", "Validation status", "Commitments"],
      notes: "Applicability and filing-stage status require confirmation.",
      critical: false,
      blocksFinalAuthoring: false,
    },
  ],
  sourceData: [
    {
      id: "p3-data-process-map",
      title: "Process-step and control mapping",
      owner: "Manufacturing Science and Technology",
      status: "under_review",
      purpose:
        "Connects process steps to controlled descriptions, controls, and accountable records.",
      classification: "recommended",
    },
    {
      id: "p3-data-site-map",
      title: "Site-to-operation mapping",
      owner: "Regulatory CMC",
      status: "approved",
      purpose: "Supports consistent site and operation presentation across dossier locations.",
      classification: "recommended",
    },
  ],
  primaryOwner: "Manufacturing Science and Technology",
  contributors: [
    "Manufacturing",
    "Process Development",
    "Process Validation",
    "Regulatory CMC",
    "Quality Assurance",
  ],
  approvers: ["Manufacturing Lead", "Regulatory CMC Lead", "Quality Unit"],
  dependencies: [
    "The commercial manufacturing record and site-responsibility map have controlled versions.",
    "Process-development conclusions and product controls are available for reconciliation.",
    "Validation or evaluation applicability and filing-stage status are documented.",
  ],
  crossReferences: [
    "2.3.P.3 — Manufacture",
    "3.2.P.1 — Description and Composition",
    "3.2.P.2 — Pharmaceutical Development",
    "3.2.P.5 — Control of Drug Product",
    "Module 1 regional establishment information",
  ],
  downstreamOutputs: [
    "2.3 Quality Overall Summary",
    "Regional manufacturer presentations",
    "Process and control-strategy consistency review",
  ],
  authoringQuestions: [
    "Is every site and operation mapped to a controlled responsibility record?",
    "Does the process description agree with the current master record and control strategy?",
    "Are validation or evaluation status and commitments presented without implying completion?",
  ],
  smeQuestions: [
    "Which record is the source of truth for the proposed commercial process and batch formula?",
    "Which controls are essential to understanding process performance and product quality?",
    "Which site, scale, or lifecycle differences require an explicit reconciliation?",
  ],
  expectedTables: [
    "Manufacturer and operation responsibility table",
    "Process step, control, and source-document traceability table",
  ],
  expectedFigures: [
    "Manufacturing process flow diagram supported by the controlled manufacturing record",
  ],
  consistencyChecks: [
    {
      id: "p3-check-batch-formula",
      label: "Batch formula aligns with composition and the controlled manufacturing record",
      comparedLocations: [
        "3.2.P.1",
        "3.2.P.3.2",
        "Controlled master manufacturing record",
        "2.3.P.3",
      ],
      severity: "critical",
      status: "unresolved",
      rationale:
        "The master manufacturing record is under review, so the comparison cannot be closed.",
    },
    {
      id: "p3-check-sites",
      label: "Manufacturer responsibilities align across quality and regional locations",
      comparedLocations: ["3.2.P.3.1", "2.3.P.3", "Module 1 regional forms"],
      severity: "high",
      status: "unable_to_compare",
      rationale: "Regional forms are outside the current demonstration dataset.",
    },
  ],
  reviewerQuestions: [
    "Are manufacturer responsibilities and the process sequence unambiguous and traceable?",
    "Does the control narrative reconcile with development and finished-product controls?",
    "Are validation status, limitations, and future commitments accurately distinguished?",
  ],
  commonDeficiencies: [
    "Editorial QA risk: site names or operation responsibilities differ across dossier locations.",
    "Editorial QA risk: process descriptions drift from the current master record.",
    "Editorial QA risk: planned validation work is written as completed work.",
  ],
  inspectionRelevance: [
    "Potentially impacted: manufacturer, process-control, and validation records may be relevant to inspection preparation.",
    "This educational record does not determine inspection scope, validation acceptability, or facility compliance.",
  ],
  readinessContext: {
    ownersAssigned: true,
    keyDecisionsStable: true,
    dataCutoffConfirmed: false,
    sourceVersionsConflict: false,
    reviewCommentsClosed: false,
    unresolvedQuestions: [
      {
        id: "p3-q-validation-status",
        text: "What validation or evaluation evidence is applicable at the intended filing stage?",
        blocking: false,
        resolved: false,
        owner: "Process Validation",
      },
    ],
    dependencyStatuses: [
      {
        id: "p3-dep-master-record",
        label: "Controlled master manufacturing record is approved",
        required: true,
        resolved: false,
      },
    ],
  },
  m4qLocation: "3.2.P.3, document pp.14–16 (PDF pp.19–21)",
  qnaLocation: "Applicable manufacture, batch-formula, and CTD-Q location Q&As",
  changeSummary: "Initial 3.2.P.3 structured editorial draft.",
});
