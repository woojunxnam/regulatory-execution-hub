import { createEditorialQualitySection } from "@/data/ctd/sections/section-factory";

export const containerClosureSystem = createEditorialQualitySection({
  sectionId: "3.2.P.7",
  slug: "3-2-p-7",
  title: "Container-Closure System",
  module: 3,
  category: "drug_product",
  regulatoryPurpose:
    "Organize the container-closure component description, material and specification references, and source-supported suitability relationships for the proposed presentation. Product-specific compatibility, protection, performance, and regional evidence remain separately assessable.",
  include: [
    "A component-level description of the proposed primary and relevant secondary packaging configuration.",
    "Controlled material, drawing, specification, and supplier-source relationships for each applicable component.",
    "Cross-references to development, compatibility, performance, or stability evidence supporting suitability when applicable.",
  ],
  normallyExclude: [
    "General product composition organized in 3.2.P.1.",
    "Full pharmaceutical-development studies organized in 3.2.P.2.",
    "Stability study protocols and results organized in 3.2.P.8.",
  ],
  informationExpected: [
    {
      id: "p7-component-description",
      title: "Container-closure component description",
      description:
        "Present controlled component and material descriptors without retaining confidential supplier or drawing details in this demonstration.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1", "ich-m4q-qa"],
    },
    {
      id: "p7-specification-traceability",
      title: "Specification and control traceability",
      description:
        "Connect each described component to the applicable controlled specification or justified control source.",
      classification: "recommended",
      citationIds: ["ich-m4q-r1"],
    },
  ],
  conditionalInformation: [
    {
      id: "p7-functional-secondary",
      title: "Functional secondary packaging",
      description:
        "Assess whether secondary packaging performs a product-protection or delivery function that needs source-supported description.",
      classification: "conditional",
      appliesWhen:
        "A secondary component contributes to protection, performance, delivery, or stability.",
      citationIds: ["ich-m4q-r1"],
    },
    {
      id: "p7-regional-suitability",
      title: "Regional or program-specific suitability evidence",
      description:
        "Confirm whether regional guidance, product-specific correspondence, or the proposed presentation changes the expected suitability evidence.",
      classification: "undetermined",
      appliesWhen:
        "Applicable regional or product-specific records identify an additional consideration.",
      citationIds: ["ema-m4q-step5", "fda-ectd"],
    },
  ],
  sourceDocuments: [
    {
      id: "p7-src-component-specs",
      title: "Controlled packaging component specification set",
      type: "Packaging control record",
      owner: "Packaging Engineering",
      version: "DEMO-DRAFT-1",
      approvalStatus: "under_review",
      sectionsSupported: ["3.2.P.7", "3.2.P.2", "3.2.P.8"],
      informationUsed: ["Component identity", "Material description", "Specification relationship"],
      notes:
        "Demonstration metadata only; supplier identities, dimensions, and proprietary drawings are excluded.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p7-src-suitability",
      title: "Container-closure suitability evidence map",
      type: "Compatibility and performance evidence map",
      owner: "Product Development",
      version: "DEMO-1.0",
      approvalStatus: "approved",
      sectionsSupported: ["3.2.P.2", "3.2.P.7", "3.2.P.8"],
      informationUsed: ["Evidence location", "Conclusion owner", "Configuration mapping"],
      notes: "Stores traceability metadata rather than study data or conclusions.",
      critical: true,
      blocksFinalAuthoring: true,
    },
    {
      id: "p7-src-change-inventory",
      title: "Packaging change and correspondence inventory",
      type: "Lifecycle and regulatory program inventory",
      owner: "Regulatory CMC",
      version: "Not assigned",
      approvalStatus: "missing",
      sectionsSupported: ["3.2.P.7"],
      informationUsed: ["Presentation changes", "Commitments", "Program-specific positions"],
      notes: "Conditional source; establish whether relevant historical or planned changes exist.",
      critical: false,
      blocksFinalAuthoring: false,
    },
  ],
  sourceData: [
    {
      id: "p7-data-component-map",
      title: "Presentation-to-component map",
      owner: "Packaging Engineering",
      status: "under_review",
      purpose: "Maps each proposed presentation to its controlled component records.",
      classification: "recommended",
    },
    {
      id: "p7-data-evidence-map",
      title: "Component-to-suitability evidence map",
      owner: "Product Development",
      status: "approved",
      purpose:
        "Supports traceability to development, performance, and stability evidence without retaining study results.",
      classification: "recommended",
    },
  ],
  primaryOwner: "Packaging Engineering",
  contributors: [
    "Product Development",
    "Analytical Development",
    "Stability",
    "Regulatory CMC",
    "Quality Assurance",
  ],
  approvers: ["Packaging Engineering Lead", "Regulatory CMC Lead", "Quality Unit"],
  dependencies: [
    "The proposed commercial presentation and component configuration are frozen for the authoring cut-off.",
    "Controlled specifications and drawings are identified for applicable components.",
    "Development and stability evidence maps use the same configuration terminology.",
  ],
  crossReferences: [
    "2.3.P.7 — Container-Closure System",
    "3.2.P.1 — Description and Composition",
    "3.2.P.2 — Pharmaceutical Development",
    "3.2.P.8 — Stability",
    "Applicable regional packaging information",
  ],
  downstreamOutputs: [
    "2.3 Quality Overall Summary",
    "Stability configuration justification",
    "Packaging lifecycle and change-impact review",
  ],
  authoringQuestions: [
    "Is each presentation mapped to a complete controlled component set?",
    "Are material and specification descriptions consistent with current packaging records?",
    "Are suitability statements limited to conclusions supported by traceable evidence?",
  ],
  smeQuestions: [
    "Which components are primary, functional secondary, or otherwise relevant to product protection and performance?",
    "Which controlled specification and drawing is current for each component?",
    "Which compatibility, performance, or stability evidence supports the proposed configuration?",
  ],
  expectedTables: [
    "Presentation, component, material, and specification traceability table",
    "Container-closure suitability evidence cross-reference table",
  ],
  expectedFigures: [
    "Optional annotated presentation diagram when supported by controlled packaging records",
  ],
  consistencyChecks: [
    {
      id: "p7-check-configuration",
      label:
        "Container-closure configuration aligns across development, packaging, and stability records",
      comparedLocations: ["3.2.P.2", "3.2.P.7", "3.2.P.8", "2.3.P.7"],
      severity: "critical",
      status: "unresolved",
      rationale: "The controlled component specification set remains under review.",
    },
    {
      id: "p7-check-terminology",
      label: "Component terminology and specification versions are consistent",
      comparedLocations: ["3.2.P.7", "Packaging specifications", "Stability configuration map"],
      severity: "high",
      status: "unable_to_compare",
      rationale: "The final presentation-to-component map is not approved in this demonstration.",
    },
  ],
  reviewerQuestions: [
    "Is the complete proposed configuration described at an appropriate level and source-traceable?",
    "Do component controls and suitability evidence map to the same configuration?",
    "Are regional, supplier, or lifecycle questions distinguished from current conclusions?",
  ],
  commonDeficiencies: [
    "Editorial QA risk: presentation or component terminology differs across dossier locations.",
    "Editorial QA risk: suitability is asserted without a controlled evidence link.",
    "Editorial QA risk: an obsolete packaging specification is cited as current.",
  ],
  inspectionRelevance: [
    "Potentially impacted: component specifications, supplier controls, and packaging operations may support inspection preparation.",
    "This educational record does not determine inspection scope, component suitability, or supplier compliance.",
  ],
  readinessContext: {
    ownersAssigned: true,
    keyDecisionsStable: true,
    dataCutoffConfirmed: false,
    sourceVersionsConflict: false,
    reviewCommentsClosed: false,
    unresolvedQuestions: [
      {
        id: "p7-q-configuration",
        text: "Has the commercial presentation-to-component map been approved for the authoring cut-off?",
        blocking: true,
        resolved: false,
        owner: "Packaging Engineering",
      },
    ],
    dependencyStatuses: [
      {
        id: "p7-dep-specifications",
        label: "Controlled packaging component specification set is approved",
        required: true,
        resolved: false,
      },
    ],
  },
  m4qLocation: "3.2.P.7, document p.19 (PDF p.24)",
  qnaLocation: "Applicable container-closure and CTD-Q location Q&As",
  changeSummary: "Initial 3.2.P.7 structured editorial draft.",
});
