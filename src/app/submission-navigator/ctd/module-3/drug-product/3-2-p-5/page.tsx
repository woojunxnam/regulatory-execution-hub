import type { Metadata } from "next";
import { CtdSectionDetail } from "@/components/ctd/ctd-section-detail";
import { controlOfDrugProduct } from "@/data/ctd/sections/3-2-p-5";

export const metadata: Metadata = {
  title: "3.2.P.5 Control of Drug Product",
  description:
    "CTD section purpose, source readiness, authoring questions, consistency checks, and official citations for 3.2.P.5.",
  alternates: {
    canonical: "/submission-navigator/ctd/module-3/drug-product/3-2-p-5",
  },
};

export default function ControlOfDrugProductPage() {
  return <CtdSectionDetail section={controlOfDrugProduct} />;
}
