import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";
import { UpdateExplorer } from "@/components/regulatory-updates/update-explorer";
import { regulatoryUpdates } from "@/data/regulatory-updates/updates";

export const metadata: Metadata = {
  title: "Source-Checked FDA and EMA Regulatory Updates",
  description:
    "Curated official-source FDA and EMA guidance, procedure, submission-planning, and Safety Intelligence updates with visible status and applicability boundaries.",
  alternates: { canonical: "/regulatory-updates" },
};

const agencyCounts = regulatoryUpdates.reduce(
  (counts, record) => ({ ...counts, [record.agency]: counts[record.agency] + 1 }),
  { FDA: 0, EMA: 0 },
);

export default function RegulatoryUpdatesPage() {
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "Regulatory Updates" }]} />
      <PageIntro
        eyebrow="Regulatory intelligence"
        title="Official update. Visible status. Practical next question."
        summary="A manually curated FDA and EMA snapshot connecting guidance, procedures, and Safety Intelligence to possible preparation impact. Every record exposes its official source, document status, editorial status, applicability boundary, and last-verification date."
        aside={
          <div className="border-teal/20 bg-sage rounded-2xl border p-5">
            <StatusBadge tone="teal">{regulatoryUpdates.length} source-checked records</StatusBadge>
            <dl className="text-muted mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs font-bold tracking-wide uppercase">FDA</dt>
                <dd className="text-ink mt-1 font-serif text-2xl font-semibold">
                  {agencyCounts.FDA}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold tracking-wide uppercase">EMA</dt>
                <dd className="text-ink mt-1 font-serif text-2xl font-semibold">
                  {agencyCounts.EMA}
                </dd>
              </div>
            </dl>
            <p className="text-muted mt-4 text-xs leading-5">
              Manual snapshot last checked 2026-07-16. This is not continuous monitoring.
            </p>
          </div>
        }
      />

      <section className="border-gold/25 bg-gold-soft grid gap-5 rounded-3xl border p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-[#74440f] uppercase">
            Editorial boundary
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">
            Published as source-checked editorial drafts
          </h2>
          <p className="text-muted mt-3 max-w-4xl text-sm leading-6">
            Official-source status has been checked, but no qualified human review record is
            attached. Draft FDA guidance remains draft and not for implementation. Impact labels are
            prompts for assessment, not product-specific conclusions.
          </p>
        </div>
        <Link className="text-teal text-sm font-bold underline" href="/editorial-policy">
          Read editorial policy
        </Link>
      </section>

      <section aria-labelledby="updates-title" className="mt-12">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-teal text-xs font-bold tracking-[0.16em] uppercase">
              Curated snapshot
            </p>
            <h2 id="updates-title" className="mt-2 font-serif text-4xl font-semibold">
              FDA and EMA updates
            </h2>
          </div>
          <p className="text-muted max-w-lg text-sm leading-6 md:text-right">
            Sorted by the source date shown in each record. Open the official page before acting.
          </p>
        </div>

        <UpdateExplorer records={regulatoryUpdates} />
      </section>

      <section className="bg-teal-dark mt-12 grid gap-7 rounded-3xl p-7 text-white md:grid-cols-3 md:p-9">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-[#add0c4] uppercase">
            Current mode
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">Manual curation</h2>
          <p className="mt-3 text-sm leading-6 text-[#cfddda]">
            Records are selected and checked manually. No scheduled monitor or automatic publishing
            is active.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-[#add0c4] uppercase">
            Next control
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">Change detection</h2>
          <p className="mt-3 text-sm leading-6 text-[#cfddda]">
            Future monitoring must distinguish new content, substantive revisions, metadata-only
            changes, source failure, and superseded material.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-[#add0c4] uppercase">
            Publication gate
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">Review before interpretation</h2>
          <p className="mt-3 text-sm leading-6 text-[#cfddda]">
            Automated discovery may suggest a record later; it must not silently publish a
            product-specific regulatory conclusion.
          </p>
        </div>
      </section>
    </main>
  );
}
