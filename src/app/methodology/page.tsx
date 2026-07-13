import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { CitationList } from "@/components/ctd/citation-list";
import { PageIntro } from "@/components/ctd/page-intro";
import { controlOfDrugProduct } from "@/data/ctd/sections/3-2-p-5";

export const metadata: Metadata = {
  title: "Methodology & Limitations",
};

export default function MethodologyPage() {
  return (
    <main id="main-content" className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "Methodology" }]} />
      <PageIntro
        eyebrow="Trust framework"
        title="Methodology & limitations"
        summary="How official sources, classifications, deterministic readiness rules, human review, and visible uncertainty are kept separate."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Source hierarchy",
            body: "Primary official sources control. Structured records retain source owner, status, location, URL, and last verification. Secondary material may aid discovery but does not establish a requirement.",
          },
          {
            title: "Classification discipline",
            body: "Required, conditional, recommended, potentially impacted, best practice, and undetermined are distinct states. A CTD heading alone does not prove product-specific applicability.",
          },
          {
            title: "Deterministic readiness",
            body: "A visible, tested rule evaluates missing or unapproved sources, unresolved strategy, dependencies, citations, consistency checks, comments, and verification metadata. No runtime LLM decides readiness.",
          },
          {
            title: "Human review",
            body: "Official links have been source-checked, but the editorial synthesis has no qualified human review record. The site therefore labels it Editorial draft — source verification required.",
          },
        ].map((item) => (
          <section
            key={item.title}
            className="border-line rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h2 className="font-serif text-2xl font-semibold">{item.title}</h2>
            <p className="text-muted mt-3 leading-7">{item.body}</p>
          </section>
        ))}
      </div>
      <section className="border-rose/20 bg-rose-soft mt-10 rounded-3xl border p-7">
        <h2 className="font-serif text-2xl font-semibold">Educational-use limitation</h2>
        <p className="text-muted mt-3 leading-7">
          This independent prototype is not affiliated with FDA, EMA, the European Commission, or
          ICH. It is not legal or regulatory advice, a final product-specific strategy, a validated
          GxP system, or the sole system of record for regulated decisions. Official source
          documents control.
        </p>
      </section>
      <section className="mt-10" aria-labelledby="source-register-title">
        <h2 id="source-register-title" className="font-serif text-3xl font-semibold">
          Source register for this slice
        </h2>
        <div className="mt-6">
          <CitationList citations={controlOfDrugProduct.officialSources} />
        </div>
      </section>
      <div className="no-print border-line mt-10 border-t pt-6">
        <Link className="text-teal font-bold underline" href="/submission-navigator/ctd">
          Return to CTD Builder
        </Link>
      </div>
    </main>
  );
}
