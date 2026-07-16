import { createEditorialQualitySection } from "@/data/ctd/sections/section-factory";

export const descriptionAndComposition = createEditorialQualitySection({
  sectionId: "3.2.P.1",
  slug: "3-2-p-1",
  title: "Description and Composition of the Drug Product",
  module: 3,
  category: "drug_product",
  regulatoryPurpose:
    "Organize the dosage-form description and the qualitative and quantitative composition presentation within the current M4Q(R1) structure. Product-specific evidence, regional expectations, and agreed positions must still be assessed separately.",
  include: [
    "A concise description of the dosage form and distinguishing physical characteristics supported by controlled product information.",
    "A component-by-component composition presentation with function and a traceable basis for the stated amount or concentration.",
    "Cross-references for accompanying diluents or other presentation elements when they are part of the product configuration.",
  ],
  normallyExclude: [
    "Formulation-development rationale, which is organized in 3.2.P.2.",
    "Commercial batch formula and manufacturing-process instructions, which are organized in 3.2.P.3.",
    "Detailed container-closure component information, which is organized in 3.2.P.7.",
  ],
  informationExpected: [
    {
      id: "p1-description",
      title: "Dosage-form description",
      description:
        "Provide a source-traceable description of the dosage form without introducing unsupported marketing or labeling claims.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1"],
    },
    {
      id: "p1-composition",
      title: "Composition presentation",
      description:
        "Present the components and their functions using controlled composition sources; this prototype does not store component names or quantities.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1", "ich-m4q-qa"],
    },
  ],
  conditionalInformation: [
    {
      id: "p1-diluent",
      title: "Accompanying diluent or presentation component",
      description:
        "Assess whether an accompanying diluent or related presentation element requires description and composition traceability.",
      classification: "conditional",
      appliesWhen: "A diluent or related component is supplied with the drug product.",
      citationIds: ["ich-m4q-r1"],
    },
    {
      id: "p1-program-specific",
      title: "Program-specific composition presentation",
      description:
        "Confirm whether product-specific guidance, regional requirements, correspondence, or commitments alter the presentation.",
      classification: "undetermined",
      appliesWhen: "Program-specific evidence or agency interaction exists.",
      citationIds: ["ema-m4q-step5"],
    },
  ],
  sourceDocuments: [
    {
      id: "p1-src-composition",
      title: "Controlled drug product composition record",
      type: "Controlled formulation record",
      owner: "Formulation Development",
      version: "DEMO-1.0",
      approvalStatus: "approved",
      sectionsSupported: ["3.2.P.1"],
      informationUsed: ["Component inventory", "Component function", "Composition basis"],
      notes: "Demonstration metadata only; no component names or quantities are stored.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p1-src-description",
      title: "Controlled dosage-form description",
      type: "Product description record",
      owner: "Regulatory CMC",
      version: "DEMO-DRAFT-1",
      approvalStatus: "under_review",
      sectionsSupported: ["3.2.P.1", "2.3.P.1"],
      informationUsed: ["Dosage form", "Physical description", "Strength presentation"],
      notes: "Reconcile terminology with labeling and Module 2 before final authoring.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p1-src-correspondence",
      title: "Product-specific composition advice and correspondence inventory",
      type: "Regulatory program inventory",
      owner: "Regulatory CMC",
      version: "Not assigned",
      approvalStatus: "missing",
      sectionsSupported: ["3.2.P.1"],
      informationUsed: ["Agreed presentation", "Waivers", "Commitments"],
      notes: "Conditional source; confirm whether relevant program records exist.",
      critical: false,
      blocksFinalAuthoring: false,
    },
  ],
  sourceData: [
    {
      id: "p1-data-components",
      title: "Component and function mapping",
      owner: "Formulation Development",
      status: "approved",
      purpose: "Supports composition traceability without retaining proprietary values.",
      classification: "recommended",
    },
    {
      id: "p1-data-presentations",
      title: "Dosage-form and strength presentation mapping",
      owner: "Regulatory CMC",
      status: "under_review",
      purpose: "Supports terminology reconciliation across dossier and labeling locations.",
      classification: "recommended",
    },
  ],
  primaryOwner: "Regulatory CMC",
  contributors: ["Formulation Development", "Manufacturing", "Quality Assurance", "Labeling"],
  approvers: ["Regulatory CMC Lead", "Quality Unit"],
  dependencies: [
    "The controlled composition record and presentation terminology are identified.",
    "Formulation-development and batch-formula relationships are available for reconciliation.",
    "Applicable product-specific advice and commitments are inventoried.",
  ],
  crossReferences: [
    "2.3.P.1 — Description and Composition",
    "3.2.P.2 — Pharmaceutical Development",
    "3.2.P.3.2 — Batch Formula",
    "3.2.P.7 — Container-Closure System",
    "Applicable labeling product-description locations",
  ],
  downstreamOutputs: [
    "2.3 Quality Overall Summary",
    "Manufacturing batch-formula reconciliation",
    "Labeling terminology consistency review",
  ],
  authoringQuestions: [
    "Is each composition statement traceable to the current controlled formulation record?",
    "Are dosage-form and strength terms consistent with Module 2, manufacturing, and labeling locations?",
    "Are conditional presentation components explicitly resolved rather than assumed?",
  ],
  smeQuestions: [
    "Which controlled record is the source of truth for composition and component function?",
    "Do any overages, diluents, or presentation components require product-specific discussion?",
    "Which terminology remains under review across formulation, manufacturing, and labeling teams?",
  ],
  expectedTables: [
    "Composition and component-function traceability table without demonstration values",
    "Dosage-form and presentation terminology reconciliation table",
  ],
  expectedFigures: [],
  consistencyChecks: [
    {
      id: "p1-check-batch-formula",
      label: "Composition aligns with the 3.2.P.3.2 batch formula",
      comparedLocations: ["3.2.P.1", "3.2.P.3.2", "2.3.P.1"],
      severity: "critical",
      status: "unable_to_compare",
      rationale:
        "The controlled batch-formula mapping is not yet part of this demonstration record.",
    },
    {
      id: "p1-check-labeling",
      label: "Dosage-form and strength terminology is reconciled with labeling",
      comparedLocations: ["3.2.P.1", "2.3.P.1", "Labeling"],
      severity: "high",
      status: "unresolved",
      rationale: "The controlled description is still under review.",
    },
  ],
  reviewerQuestions: [
    "Is the product description concise, source-traceable, and internally consistent?",
    "Does the composition presentation reconcile with development and manufacturing sources?",
    "Are product-specific or regional presentation questions clearly identified?",
  ],
  commonDeficiencies: [
    "Editorial QA risk: component roles or composition terms differ between controlled sources.",
    "Editorial QA risk: dosage-form or strength terminology diverges across dossier and labeling locations.",
    "Editorial QA risk: conditional presentation components are omitted without a documented applicability decision.",
  ],
  inspectionRelevance: [
    "Potentially impacted: the controlled composition may support dossier-to-master-formula traceability.",
    "This educational record does not determine inspection scope or site conformance.",
  ],
  readinessContext: {
    ownersAssigned: true,
    keyDecisionsStable: true,
    dataCutoffConfirmed: false,
    sourceVersionsConflict: false,
    reviewCommentsClosed: false,
    unresolvedQuestions: [
      {
        id: "p1-q-terminology",
        text: "Is the controlled dosage-form description reconciled with all labeling presentations?",
        blocking: false,
        resolved: false,
        owner: "Regulatory CMC",
      },
    ],
    dependencyStatuses: [
      {
        id: "p1-dep-description",
        label: "Controlled dosage-form description is approved",
        required: true,
        resolved: false,
      },
    ],
  },
  m4qLocation: "3.2.P.1, document p.13 (PDF p.18)",
  qnaLocation: "Applicable composition and location Q&As",
  changeSummary: "Initial 3.2.P.1 structured editorial draft.",
});
