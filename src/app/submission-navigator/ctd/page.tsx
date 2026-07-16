import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";

export const metadata: Metadata = {
  title: "CTD Authoring & Dossier Builder",
  description:
    "Trace CTD section intent, source readiness, dependencies, and reviewer preparation.",
  alternates: { canonical: "/submission-navigator/ctd" },
};

const modules = [
  {
    id: "Module 1",
    title: "Regional administrative information",
    note: "Separate FDA and EMA builders are planned because Module 1 is not harmonized.",
    status: "Planned",
  },
  {
    id: "Module 2",
    title: "Summaries and overviews",
    note: "Quality Overall Summary traceability to the available Module 3 Drug Product foundation is available; other summaries remain planned.",
    status: "Available",
    href: "/submission-navigator/ctd/module-2/quality-overall-summary",
  },
  {
    id: "Module 3",
    title: "Quality",
    note: "Six Drug Product sections and their reusable evidence, consistency, version, and review workflow are available.",
    status: "Available",
    href: "/submission-navigator/ctd/module-3",
  },
  {
    id: "Module 4",
    title: "Nonclinical study reports",
    note: "Evidence and Module 2 relationships are planned.",
    status: "Planned",
  },
  {
    id: "Module 5",
    title: "Clinical study reports",
    note: "Study, summary, and labeling-claim traceability are planned.",
    status: "Planned",
  },
];

export default function CtdLandingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Submission Navigator" }, { label: "CTD Builder" }]} />
      <PageIntro
        eyebrow="Submission Navigator"
        title="CTD Authoring & Dossier Builder"
        summary="Move from a CTD heading to a traceable authoring packet: section purpose, expected information, controlled sources, open decisions, consistency checks, and reviewer preparation."
        aside={
          <div className="border-line rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-ink text-sm font-semibold">This builder does not</p>
            <p className="text-muted mt-2 text-sm leading-6">
              Generate an NDA/MAA, invent technical content, or determine product-specific
              requirements from a section heading alone.
            </p>
          </div>
        }
      />

      <section
        aria-labelledby="evidence-model-title"
        className="bg-teal-dark mb-12 rounded-3xl p-7 text-white md:p-9"
      >
        <p className="text-xs font-bold tracking-[0.16em] text-[#cde1d4] uppercase">
          Evidence model
        </p>
        <h2 id="evidence-model-title" className="mt-2 font-serif text-3xl font-semibold">
          Five layers, one visible reasoning chain
        </h2>
        <ol className="mt-7 grid gap-3 md:grid-cols-5">
          {[
            "ICH CTD structure",
            "Scientific & technical guidelines",
            "FDA or EMA regional requirements",
            "Product-specific requirements",
            "Advice, waivers, commitments & correspondence",
          ].map((layer, index) => (
            <li
              key={layer}
              className="rounded-xl border border-white/20 bg-white/7 p-4 text-sm leading-6"
            >
              <span className="mb-2 block text-xs font-bold text-[#cde1d4]">0{index + 1}</span>
              {layer}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="modules-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-teal text-xs font-bold tracking-[0.16em] uppercase">CTD map</p>
            <h2 id="modules-title" className="mt-2 font-serif text-3xl font-semibold">
              Choose a module
            </h2>
          </div>
          <Link
            className="text-teal text-sm font-bold underline"
            href="/submission-navigator/ctd/source-matrix"
          >
            Open Source-to-CTD Matrix
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const content = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-teal text-xs font-bold tracking-[0.14em] uppercase">
                    {module.id}
                  </span>
                  <StatusBadge tone={module.status === "Available" ? "teal" : "neutral"}>
                    {module.status}
                  </StatusBadge>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{module.title}</h3>
                <p className="text-muted mt-3 text-sm leading-6">{module.note}</p>
              </>
            );
            return module.href ? (
              <Link
                key={module.id}
                href={module.href}
                className="border-teal/30 rounded-2xl border bg-white p-6 no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {content}
              </Link>
            ) : (
              <article key={module.id} className="border-line rounded-2xl border bg-white/70 p-6">
                {content}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
