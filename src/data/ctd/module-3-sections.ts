export interface ModuleSectionSummary {
  sectionId: string;
  title: string;
  description: string;
  status: "available" | "planned";
  href?: string;
}

export const drugProductSections: ModuleSectionSummary[] = [
  {
    sectionId: "3.2.P.1",
    title: "Description and Composition",
    description: "Drug product description and component composition.",
    status: "planned",
  },
  {
    sectionId: "3.2.P.2",
    title: "Pharmaceutical Development",
    description: "Development rationale and product/process understanding.",
    status: "planned",
  },
  {
    sectionId: "3.2.P.3",
    title: "Manufacture",
    description: "Manufacturers, batch formula, process, controls, and validation.",
    status: "planned",
  },
  {
    sectionId: "3.2.P.4",
    title: "Control of Excipients",
    description: "Specifications, procedures, validation, and excipient considerations.",
    status: "planned",
  },
  {
    sectionId: "3.2.P.5",
    title: "Control of Drug Product",
    description:
      "Specifications, analytical procedures, validation, batch data, impurities, and justification.",
    status: "available",
    href: "/submission-navigator/ctd/module-3/drug-product/3-2-p-5",
  },
  {
    sectionId: "3.2.P.6",
    title: "Reference Standards or Materials",
    description: "Reference standards or materials used for drug product testing.",
    status: "planned",
  },
  {
    sectionId: "3.2.P.7",
    title: "Container-Closure System",
    description: "Packaging components, materials, specifications, and suitability links.",
    status: "planned",
  },
  {
    sectionId: "3.2.P.8",
    title: "Stability",
    description: "Stability conclusions, protocol/commitment, and supporting data.",
    status: "planned",
  },
];

export const moduleThreeGroups = [
  {
    sectionId: "3.2.S",
    title: "Drug Substance",
    description:
      "Substance identity, manufacture, characterisation, controls, reference standards, packaging, and stability.",
    status: "planned" as const,
  },
  {
    sectionId: "3.2.P",
    title: "Drug Product",
    description:
      "Product composition, development, manufacture, controls, packaging, and stability.",
    status: "available" as const,
    href: "/submission-navigator/ctd/module-3/drug-product",
  },
  {
    sectionId: "3.2.A",
    title: "Appendices",
    description: "Applicable facilities, equipment, adventitious-agent, and excipient information.",
    status: "planned" as const,
  },
  {
    sectionId: "3.2.R",
    title: "Regional Information",
    description: "Region-specific quality information where applicable.",
    status: "planned" as const,
  },
];
