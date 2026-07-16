import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";
import { regulatoryUpdates } from "@/data/regulatory-updates/updates";

export const metadata: Metadata = {
  title: "Source-Checked FDA and EMA Regulatory Updates",
  description:
    "Curated official-source FDA and EMA guidance, procedure, variation, and submission-planning updates with visible status and applicability boundaries.",
  alternates: { canonical: "/regulatory-updates" },
};

const impactLabels = {
  conditional: "Conditional",
  potentially_impacted: "Potentially impacted",
  undetermined: "Undetermined",
};

const sourceStatusLabels = {
  final: "Final",
  draft: "Draft",
  effective: "Effective",
  updated: "Updated",
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
        summary="A manually curated first release of FDA and EMA regulatory changes connected to possible preparation impact. Every record exposes its official source, document status, editorial status, applicability boundary, and last-verification date."
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

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {regulatoryUpdates.map((record) => (
            <article
              key={record.slug}
              className="border-line group flex flex-col rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={record.agency === "FDA" ? "blue" : "teal"}>
                    {record.agency}
                  </StatusBadge>
                  <StatusBadge tone={record.sourceDocumentStatus === "draft" ? "gold" : "neutral"}>
                    {sourceStatusLabels[record.sourceDocumentStatus]}
                  </StatusBadge>
                </div>
                <time
                  className="text-muted text-xs font-semibold"
                  dateTime={record.sourceDate.date}
                >
                  {record.sourceDate.date}
                </time>
              </div>

              <h3 className="mt-5 font-serif text-2xl leading-tight font-semibold">
                {record.title}
              </h3>
              <p className="text-muted mt-3 text-sm leading-6">{record.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <StatusBadge tone={record.impactClassification === "conditional" ? "blue" : "gold"}>
                  {impactLabels[record.impactClassification]}
                </StatusBadge>
                {record.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="border-line text-muted rounded-full border px-2.5 py-1 text-xs font-semibold"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {record.commentDeadline ? (
                <p className="text-rose mt-5 text-xs font-bold">
                  Official comment deadline:{" "}
                  <time dateTime={record.commentDeadline}>{record.commentDeadline}</time>
                </p>
              ) : null}

              <div className="border-line mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                <p className="text-muted text-xs">
                  Official source checked {record.lastVerifiedDate}
                </p>
                <Link
                  href={`/regulatory-updates/${record.slug}`}
                  className="text-teal inline-flex items-center gap-2 text-sm font-bold underline"
                >
                  Review update
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
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
