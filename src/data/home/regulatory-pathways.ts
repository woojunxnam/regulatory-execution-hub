export type RegulatoryPathwayStatus = "available" | "planned";

export interface RegulatoryPathway {
  id: string;
  category: string;
  title: string;
  description: string;
  status: RegulatoryPathwayStatus;
  href?: string;
  keywords: string[];
  priority: number;
}

export const regulatoryPathways: RegulatoryPathway[] = [
  {
    id: "ctd-builder",
    category: "Submission structure",
    title: "CTD Authoring & Dossier Builder",
    description:
      "Navigate the available CTD foundation, section boundaries, evidence relationships, and visible readiness rules.",
    status: "available",
    href: "/submission-navigator/ctd",
    keywords: ["ctd", "dossier", "submission", "module", "authoring", "application preparation"],
    priority: 60,
  },
  {
    id: "quality-overall-summary",
    category: "Cross-module traceability",
    title: "2.3 Quality Overall Summary",
    description:
      "Trace draft 2.3.P locations to available Module 3 evidence and explicit consistency checks.",
    status: "available",
    href: "/submission-navigator/ctd/module-2/quality-overall-summary",
    keywords: [
      "2.3",
      "2 3",
      "2.3.p",
      "qos",
      "quality overall summary",
      "quality summary",
      "cross module",
      "consistency",
    ],
    priority: 90,
  },
  {
    id: "module-3",
    category: "Quality dossier",
    title: "Module 3 Quality",
    description:
      "Open the quality structure and see which Drug Product sections are available or planned.",
    status: "available",
    href: "/submission-navigator/ctd/module-3",
    keywords: ["module 3", "quality module", "quality dossier", "3.2", "3 2"],
    priority: 75,
  },
  {
    id: "drug-product-index",
    category: "Drug Product",
    title: "3.2.P Drug Product index",
    description:
      "Browse the available composition, development, manufacture, control, packaging, and stability references.",
    status: "available",
    href: "/submission-navigator/ctd/module-3/drug-product",
    keywords: ["3.2.p", "3 2 p", "drug product", "finished product", "product quality"],
    priority: 82,
  },
  {
    id: "drug-product-composition",
    category: "CTD section",
    title: "3.2.P.1 Description and Composition",
    description:
      "Review the editorial reference for drug product description and component composition.",
    status: "available",
    href: "/submission-navigator/ctd/module-3/drug-product/3-2-p-1",
    keywords: ["3.2.p.1", "3 2 p 1", "composition", "components", "dosage form"],
    priority: 100,
  },
  {
    id: "pharmaceutical-development",
    category: "CTD section",
    title: "3.2.P.2 Pharmaceutical Development",
    description:
      "Review development rationale and product and process understanding reference content.",
    status: "available",
    href: "/submission-navigator/ctd/module-3/drug-product/3-2-p-2",
    keywords: [
      "3.2.p.2",
      "3 2 p 2",
      "pharmaceutical development",
      "development rationale",
      "formulation development",
    ],
    priority: 100,
  },
  {
    id: "drug-product-manufacture",
    category: "CTD section",
    title: "3.2.P.3 Manufacture",
    description:
      "Review manufacturers, batch formula, process, controls, and validation reference content.",
    status: "available",
    href: "/submission-navigator/ctd/module-3/drug-product/3-2-p-3",
    keywords: [
      "3.2.p.3",
      "3 2 p 3",
      "manufacture",
      "manufacturing process",
      "batch formula",
      "process validation",
    ],
    priority: 100,
  },
  {
    id: "control-of-drug-product",
    category: "CTD section",
    title: "3.2.P.5 Control of Drug Product",
    description:
      "Work through specifications, analytical procedures, validation, batch data, impurities, and justification.",
    status: "available",
    href: "/submission-navigator/ctd/module-3/drug-product/3-2-p-5",
    keywords: [
      "3.2.p.5",
      "3 2 p 5",
      "control of drug product",
      "specification",
      "analytical procedure",
      "analytical validation",
      "batch analysis",
      "impurities",
    ],
    priority: 105,
  },
  {
    id: "container-closure",
    category: "CTD section",
    title: "3.2.P.7 Container-Closure System",
    description:
      "Review packaging components, materials, specifications, and suitability relationships.",
    status: "available",
    href: "/submission-navigator/ctd/module-3/drug-product/3-2-p-7",
    keywords: ["3.2.p.7", "3 2 p 7", "container closure", "packaging", "packaging system"],
    priority: 100,
  },
  {
    id: "stability",
    category: "CTD section",
    title: "3.2.P.8 Stability",
    description:
      "Review stability conclusions, protocols, commitments, and supporting-data relationships.",
    status: "available",
    href: "/submission-navigator/ctd/module-3/drug-product/3-2-p-8",
    keywords: [
      "3.2.p.8",
      "3 2 p 8",
      "stability",
      "shelf life",
      "stability protocol",
      "stability commitment",
    ],
    priority: 100,
  },
  {
    id: "source-matrix",
    category: "Evidence control",
    title: "Source-to-CTD Matrix",
    description:
      "Inspect the non-confidential demonstration source set, CTD destinations, approval status, and gaps.",
    status: "available",
    href: "/submission-navigator/ctd/source-matrix",
    keywords: [
      "source matrix",
      "source to ctd",
      "source document",
      "evidence",
      "missing source",
      "superseded",
      "traceability",
    ],
    priority: 95,
  },
  {
    id: "methodology",
    category: "Trust & limitations",
    title: "Methodology & limitations",
    description:
      "Understand source hierarchy, deterministic rules, editorial status, and the product's decision-support boundary.",
    status: "available",
    href: "/methodology",
    keywords: [
      "methodology",
      "limitations",
      "source hierarchy",
      "official source",
      "decision rule",
      "human review",
      "verification",
    ],
    priority: 70,
  },
  {
    id: "fda-initial-ind",
    category: "Application preparation",
    title: "FDA Initial IND preparation guide",
    description:
      "Planned guided checklist with official-source citations, conditional logic, owners, evidence, and review gates.",
    status: "planned",
    href: "/applications#fda-initial-ind",
    keywords: [
      "fda",
      "ind",
      "initial ind",
      "investigational new drug",
      "fda application",
      "us submission",
    ],
    priority: 92,
  },
  {
    id: "ema-centralised-maa",
    category: "Application preparation",
    title: "EMA Centralised MAA preparation guide",
    description:
      "Planned guided checklist with official-source citations, dependencies, regional artifacts, and review gates.",
    status: "planned",
    href: "/applications#ema-centralised-maa",
    keywords: [
      "ema",
      "maa",
      "centralised procedure",
      "centralized procedure",
      "marketing authorisation application",
      "marketing authorization application",
      "eu submission",
    ],
    priority: 92,
  },
  {
    id: "post-approval-changes",
    category: "Lifecycle preparation",
    title: "FDA and EMA post-approval change preparation",
    description:
      "Planned change-classification and preparation support. Product-specific facts and current official rules will control.",
    status: "planned",
    href: "/lifecycle-changes",
    keywords: [
      "post approval change",
      "lifecycle",
      "variation",
      "supplement",
      "change control",
      "annual report",
      "type ia",
      "type ib",
      "type ii",
    ],
    priority: 88,
  },
  {
    id: "regulatory-updates",
    category: "Regulatory intelligence",
    title: "Curated FDA and EMA Updates",
    description:
      "Open the manually curated official-source update snapshot with document status, applicability boundaries, and last-verification dates.",
    status: "available",
    href: "/regulatory-updates",
    keywords: [
      "fda update",
      "ema update",
      "regulatory update",
      "news",
      "new guidance",
      "guideline update",
      "effective date",
    ],
    priority: 90,
  },
];

export const exampleRegulatoryQueries = [
  "Sources for 3.2.P.5",
  "Quality Overall Summary",
  "Latest FDA updates",
  "Latest EMA updates",
];
