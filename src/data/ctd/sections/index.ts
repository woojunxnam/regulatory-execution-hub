import { descriptionAndComposition } from "@/data/ctd/sections/3-2-p-1";
import { pharmaceuticalDevelopment } from "@/data/ctd/sections/3-2-p-2";
import { manufacture } from "@/data/ctd/sections/3-2-p-3";
import { controlOfDrugProduct } from "@/data/ctd/sections/3-2-p-5";
import { containerClosureSystem } from "@/data/ctd/sections/3-2-p-7";
import { stability } from "@/data/ctd/sections/3-2-p-8";

export const drugProductSectionRecords = [
  descriptionAndComposition,
  pharmaceuticalDevelopment,
  manufacture,
  controlOfDrugProduct,
  containerClosureSystem,
  stability,
] as const;

const drugProductSectionsBySlug = new Map(
  drugProductSectionRecords.map((section) => [section.slug, section]),
);

export function getDrugProductSection(slug: string) {
  return drugProductSectionsBySlug.get(slug);
}
