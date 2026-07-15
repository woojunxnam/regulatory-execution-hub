import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtdSectionDetail } from "@/components/ctd/ctd-section-detail";
import { drugProductSectionRecords, getDrugProductSection } from "@/data/ctd/sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return drugProductSectionRecords
    .filter((section) => section.slug !== "3-2-p-5")
    .map((section) => ({ section: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section: slug } = await params;
  const section = getDrugProductSection(slug);

  if (!section) return {};

  return {
    title: `${section.sectionId} ${section.title}`,
    description: `Structured CTD authoring, evidence, consistency, and review preparation for ${section.sectionId}.`,
  };
}

export default async function DrugProductSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: slug } = await params;
  const section = getDrugProductSection(slug);

  if (!section || section.slug === "3-2-p-5") notFound();

  return <CtdSectionDetail section={section} />;
}
