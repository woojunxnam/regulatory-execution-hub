export type ProductAreaStatus = "available" | "building" | "planned";

export interface ProductArea {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  status: ProductAreaStatus;
}

export const productAreas: ProductArea[] = [
  {
    id: "application-preparation",
    number: "01",
    eyebrow: "Before submission",
    title: "Application Preparation",
    description:
      "Plan application-specific scope, official sources, evidence, dependencies, owners, and review gates.",
    href: "/applications",
    linkLabel: "View application roadmap",
    status: "building",
  },
  {
    id: "lifecycle-changes",
    number: "02",
    eyebrow: "After approval",
    title: "Lifecycle Changes",
    description:
      "Prepare for post-approval submissions and variations without treating one pathway as universally applicable.",
    href: "/lifecycle-changes",
    linkLabel: "View lifecycle roadmap",
    status: "planned",
  },
  {
    id: "regulatory-updates",
    number: "03",
    eyebrow: "What changed",
    title: "Regulatory Updates",
    description:
      "Turn curated official-source FDA and EMA updates into visible impact and preparation paths.",
    href: "/regulatory-updates",
    linkLabel: "View source-checked updates",
    status: "available",
  },
  {
    id: "ctd-evidence",
    number: "04",
    eyebrow: "Dossier evidence",
    title: "CTD Workspace",
    description:
      "Work with the available Quality foundation, source traceability, deterministic readiness, and reviewer preparation.",
    href: "/submission-navigator/ctd",
    linkLabel: "Open CTD Workspace",
    status: "available",
  },
];

export interface PlannedGuide {
  id: string;
  jurisdiction: "FDA" | "EMA" | "Cross-region";
  title: string;
  description: string;
  status: "planned";
}

export const plannedApplicationGuides: PlannedGuide[] = [
  {
    id: "fda-initial-ind",
    jurisdiction: "FDA",
    title: "Initial IND preparation",
    description:
      "A source-backed preparation path covering applicability, evidence, dependencies, ownership, and review gates.",
    status: "planned",
  },
  {
    id: "fda-marketing-applications",
    jurisdiction: "FDA",
    title: "Marketing application preparation",
    description:
      "A future library for application-specific readiness. Procedure and product type will be separated before checklist content is published.",
    status: "planned",
  },
  {
    id: "ema-centralised-maa",
    jurisdiction: "EMA",
    title: "Centralised MAA preparation",
    description:
      "A source-backed preparation path with regional artifacts, dependencies, evidence, and explicit review status.",
    status: "planned",
  },
  {
    id: "application-comparison",
    jurisdiction: "Cross-region",
    title: "Application pathway comparison",
    description:
      "A scoped comparison surface that distinguishes harmonized CTD content from agency- and procedure-specific preparation.",
    status: "planned",
  },
];

export const plannedLifecycleGuides: PlannedGuide[] = [
  {
    id: "fda-post-approval",
    jurisdiction: "FDA",
    title: "Post-approval submission preparation",
    description:
      "Future conditional support for classifying the preparation path after product facts and current official sources are confirmed.",
    status: "planned",
  },
  {
    id: "ema-variations",
    jurisdiction: "EMA",
    title: "Variations preparation",
    description:
      "Future source-backed support for variation planning, dependencies, evidence, and implementation controls.",
    status: "planned",
  },
  {
    id: "renewals-transfers",
    jurisdiction: "EMA",
    title: "Renewals and transfers",
    description:
      "Planned preparation guides with procedure-specific scope, official citations, ownership, and review gates.",
    status: "planned",
  },
  {
    id: "cross-region-change-impact",
    jurisdiction: "Cross-region",
    title: "Change impact navigator",
    description:
      "A future decision-support layer linking a proposed change to potentially impacted submissions, dossier sections, evidence, and commitments.",
    status: "planned",
  },
];

export const guideEvidenceContract = [
  "Applicability questions before checklist selection",
  "Required, conditional, recommended, best-practice, and undetermined classification",
  "Official-source owner, URL, location, status, and last-verification date",
  "Expected evidence, dependency, owner, and review gate",
  "Visible editorial status and qualified human-review record when one exists",
];
