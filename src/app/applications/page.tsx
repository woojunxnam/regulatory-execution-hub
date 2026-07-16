import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";
import { guideEvidenceContract, plannedApplicationGuides } from "@/data/product/product-areas";

export const metadata: Metadata = {
  title: "FDA and EMA Application Preparation",
  description:
    "Application preparation roadmap for source-backed FDA and EMA guides, evidence, dependencies, ownership, and review gates.",
  alternates: { canonical: "/applications" },
};

export default function ApplicationsPage() {
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "Application Preparation" }]} />
      <PageIntro
        eyebrow="Application preparation"
        title="Prepare the application, not only the dossier."
        summary="The planned Application Hub will connect submission-specific scope to official sources, evidence, dependencies, owners, and review gates. The CTD Workspace remains one execution layer inside this broader preparation model."
        aside={
          <div className="border-gold/25 bg-gold-soft rounded-2xl border p-5">
            <StatusBadge tone="gold">Foundation building</StatusBadge>
            <p className="mt-3 text-sm leading-6 text-[#684217]">
              This page is a transparent coverage roadmap, not a regulatory checklist. Guide content
              remains unpublished until source and review metadata are complete.
            </p>
          </div>
        }
      />

      <section aria-labelledby="application-roadmap-title">
        <div className="grid gap-7 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
          <div>
            <p className="text-teal text-xs font-bold tracking-[0.16em] uppercase">
              Coverage roadmap
            </p>
            <h2 id="application-roadmap-title" className="mt-2 font-serif text-3xl font-semibold">
              Initial application guides
            </h2>
          </div>
          <p className="text-muted max-w-2xl leading-7 lg:justify-self-end">
            Each guide will begin with applicability and procedure scope. Similar names will not be
            treated as interchangeable, and CTD placement will remain separate from regional
            preparation requirements.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {plannedApplicationGuides.map((guide) => (
            <article
              id={guide.id}
              key={guide.id}
              className="border-line scroll-mt-28 rounded-2xl border bg-white p-6 shadow-sm"
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

      <section
        aria-labelledby="guide-contract-title"
        className="bg-teal-dark mt-12 rounded-3xl p-7 text-white md:p-9"
      >
        <p className="text-xs font-bold tracking-[0.15em] text-[#add0c4] uppercase">
          Publication gate
        </p>
        <h2 id="guide-contract-title" className="mt-2 font-serif text-3xl font-semibold">
          What every published guide must expose
        </h2>
        <ul className="mt-7 grid gap-3 md:grid-cols-2">
          {guideEvidenceContract.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/16 bg-white/7 p-4 text-sm leading-6"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-line mt-12 grid gap-5 rounded-3xl border bg-white p-7 md:grid-cols-2 md:p-9">
        <div>
          <p className="text-teal text-xs font-bold tracking-[0.14em] uppercase">
            Available foundation
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">Continue into CTD evidence</h2>
          <p className="text-muted mt-3 text-sm leading-6">
            The current live workspace demonstrates source traceability, deterministic readiness,
            and reviewer preparation for a bounded CTD Quality foundation.
          </p>
          <Link
            href="/submission-navigator/ctd"
            className="text-teal mt-4 inline-block text-sm font-bold underline"
          >
            Open CTD Workspace
          </Link>
        </div>
        <div>
          <p className="text-teal text-xs font-bold tracking-[0.14em] uppercase">After approval</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">
            Continue into lifecycle planning
          </h2>
          <p className="text-muted mt-3 text-sm leading-6">
            See how future post-approval and variation support will remain conditional on product
            facts and current official sources.
          </p>
          <Link
            href="/lifecycle-changes"
            className="text-teal mt-4 inline-block text-sm font-bold underline"
          >
            View lifecycle roadmap
          </Link>
        </div>
      </section>
    </main>
  );
}
