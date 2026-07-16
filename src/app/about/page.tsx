import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";

export const metadata: Metadata = {
  title: "About",
  description:
    "Scope, current coverage, planned work, and limitations of the independent Regulatory Execution Hub.",
  alternates: { canonical: "/about" },
};

const scopeAreas = [
  {
    status: "Available",
    tone: "teal" as const,
    title: "CTD Quality foundation",
    body: "A bounded, non-confidential demonstration of CTD section orientation, source traceability, visible evidence gaps, deterministic readiness, export, and QOS links.",
  },
  {
    status: "Building",
    tone: "gold" as const,
    title: "Application preparation",
    body: "A publication framework for future FDA and EMA application guides. The current route is a coverage roadmap, not an application checklist.",
  },
  {
    status: "Planned",
    tone: "gold" as const,
    title: "Lifecycle changes and updates",
    body: "Source-backed post-approval preparation and regulatory update records are planned. No classification or monitoring result is currently produced.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "About" }]} />
      <PageIntro
        eyebrow="Public product scope"
        title="What this product is — and is not."
        summary="Regulatory Execution Hub is an independent educational decision-support prototype designed to connect a regulatory task to scope, official sources, evidence state, visible rules, ownership, and review gates."
        aside={
          <div className="border-teal/20 bg-sage rounded-2xl border p-5">
            <StatusBadge tone="teal">Public prototype</StatusBadge>
            <p className="text-muted mt-3 text-sm leading-6">
              Current coverage is deliberately narrow. Planned routes are labeled and are not
              presented as completed regulatory guidance.
            </p>
          </div>
        }
      />

      <section aria-labelledby="coverage-scope-title">
        <h2 id="coverage-scope-title" className="font-serif text-3xl font-semibold">
          Current coverage ledger
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {scopeAreas.map((area) => (
            <article
              key={area.title}
              className="border-line rounded-2xl border bg-white p-6 shadow-sm"
            >
              <StatusBadge tone={area.tone}>{area.status}</StatusBadge>
              <h3 className="mt-5 font-serif text-2xl font-semibold">{area.title}</h3>
              <p className="text-muted mt-3 text-sm leading-6">{area.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-line mt-12 grid gap-7 rounded-3xl border bg-white p-7 md:grid-cols-2 md:p-9">
        <div>
          <p className="text-teal text-xs font-bold tracking-[0.15em] uppercase">Designed for</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">Preparation and review support</h2>
          <p className="text-muted mt-4 leading-7">
            The intended users are regulatory affairs and cross-functional contributors who need a
            clearer path from official material to preparation work, evidence gaps, and review
            questions.
          </p>
        </div>
        <div>
          <p className="text-rose text-xs font-bold tracking-[0.15em] uppercase">
            Not designed for
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">Final regulated decisions</h2>
          <p className="text-muted mt-4 leading-7">
            This site is not legal or regulatory advice, an agency determination, a validated GxP
            system, a submission gateway, or the sole system of record for regulated decisions.
          </p>
        </div>
      </section>

      <section className="bg-teal-dark mt-12 rounded-3xl p-7 text-white md:p-9">
        <p className="text-xs font-bold tracking-[0.15em] text-[#add0c4] uppercase">
          Governance before scale
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold">See how content earns trust.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#cfddda]">
          Publication status, source verification, qualified review, correction handling, and
          product limitations are kept visible instead of being hidden behind a generated answer.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#0d4a4d] no-underline"
            href="/editorial-policy"
          >
            Read editorial policy
          </Link>
          <Link
            className="rounded-xl border border-white/30 px-4 py-3 text-sm font-bold text-white no-underline"
            href="/methodology"
          >
            Review methodology
          </Link>
        </div>
      </section>
    </main>
  );
}
