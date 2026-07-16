import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";
import { guideEvidenceContract, plannedLifecycleGuides } from "@/data/product/product-areas";

export const metadata: Metadata = {
  title: "FDA and EMA Lifecycle Change Preparation",
  description:
    "Transparent roadmap for source-backed FDA post-approval and EMA variation preparation support.",
  alternates: { canonical: "/lifecycle-changes" },
  robots: { index: false, follow: true },
};

export default function LifecycleChangesPage() {
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "Lifecycle Changes" }]} />
      <PageIntro
        eyebrow="Lifecycle preparation"
        title="Start with the change. Trace every downstream impact."
        summary="The planned Lifecycle Hub will connect a proposed change to potentially impacted submission pathways, dossier sections, supporting evidence, commitments, implementation controls, and review gates."
        aside={
          <div className="border-gold/25 bg-gold-soft rounded-2xl border p-5">
            <StatusBadge tone="gold">Planned coverage</StatusBadge>
            <p className="mt-3 text-sm leading-6 text-[#684217]">
              No change classification or filing path is produced here yet. Product-specific facts
              and current official sources must control the future result.
            </p>
          </div>
        }
      />

      <section aria-labelledby="lifecycle-roadmap-title">
        <p className="text-teal text-xs font-bold tracking-[0.16em] uppercase">Coverage roadmap</p>
        <h2 id="lifecycle-roadmap-title" className="mt-2 font-serif text-3xl font-semibold">
          Planned lifecycle workspaces
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {plannedLifecycleGuides.map((guide) => (
            <article
              key={guide.id}
              className="border-line rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-teal text-xs font-bold tracking-[0.14em] uppercase">
                  {guide.jurisdiction}
                </span>
                <StatusBadge tone="gold">Planned</StatusBadge>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-semibold">{guide.title}</h3>
              <p className="text-muted mt-3 text-sm leading-6">{guide.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-line mt-12 rounded-3xl border bg-[#e8eee9] p-7 md:p-9">
        <p className="text-teal text-xs font-bold tracking-[0.15em] uppercase">
          Rule before automation
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold">
          The future navigator will show why a path is suggested.
        </h2>
        <ul className="text-muted mt-6 grid gap-3 text-sm leading-6 md:grid-cols-2">
          {guideEvidenceContract.map((item) => (
            <li key={item} className="border-line rounded-xl border bg-white p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="border-line mt-10 border-t pt-6">
        <Link className="text-teal text-sm font-bold underline" href="/applications">
          Return to Application Preparation
        </Link>
      </div>
    </main>
  );
}
