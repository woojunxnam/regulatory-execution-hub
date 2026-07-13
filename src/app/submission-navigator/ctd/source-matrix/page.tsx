import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { SourceMatrixTable } from "@/components/ctd/source-matrix-table";
import { sourceMatrix } from "@/data/ctd/source-matrix";

export const metadata: Metadata = {
  title: "Source-to-CTD Matrix",
};

export default function SourceMatrixPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "CTD Builder", href: "/submission-navigator/ctd" },
          { label: "Source-to-CTD Matrix" },
        ]}
      />
      <PageIntro
        eyebrow="Traceability prototype"
        title="Source-to-CTD Matrix"
        summary="See which controlled source supports each CTD subsection, what information is extracted, who owns it, and what must be reassessed when the source changes."
        aside={
          <div className="border-line text-muted rounded-2xl border bg-white p-5 text-sm leading-6 shadow-sm">
            Safe sample data only. This matrix stores metadata and workflow state, not proprietary
            technical values or dossier content.
          </div>
        }
      />
      <SourceMatrixTable rows={sourceMatrix} />
    </>
  );
}
