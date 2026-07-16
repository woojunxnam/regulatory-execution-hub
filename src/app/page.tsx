import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/ctd/status-badge";
import { RegulatoryQuery } from "@/components/home/regulatory-query";
import { regulatoryPathways } from "@/data/home/regulatory-pathways";
import { productAreas } from "@/data/product/product-areas";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ask Regulatory Execution Hub",
  description:
    "Start with a regulatory task or question and find source-aware CTD, evidence, and preparation support.",
  alternates: { canonical: "/" },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

const liveWorkspaces = [
  {
    number: "01",
    eyebrow: "Submission structure",
    title: "CTD Builder",
    description:
      "Move from a CTD heading to purpose, boundaries, expected information, sources, gaps, and reviewer preparation.",
    href: "/submission-navigator/ctd",
    linkLabel: "Open CTD Builder",
  },
  {
    number: "02",
    eyebrow: "Evidence control",
    title: "Source-to-CTD Matrix",
    description:
      "See how non-confidential demonstration sources connect to CTD destinations, status, ownership, and open gaps.",
    href: "/submission-navigator/ctd/source-matrix",
    linkLabel: "Inspect the matrix",
  },
  {
    number: "03",
    eyebrow: "Cross-module review",
    title: "QOS traceability",
    description:
      "Trace draft 2.3.P locations to available 3.2.P evidence and visible consistency checks without inventing conclusions.",
    href: "/submission-navigator/ctd/module-2/quality-overall-summary",
    linkLabel: "Review QOS traceability",
  },
];

const executionSteps = [
  {
    number: "1",
    title: "Describe the task",
    detail:
      "Use the application, CTD section, evidence gap, or reviewer question you already have.",
  },
  {
    number: "2",
    title: "Find the controlled path",
    detail: "The current guided search routes intent with visible deterministic matching rules.",
  },
  {
    number: "3",
    title: "Inspect evidence",
    detail:
      "Available references expose source status, editorial status, verification dates, and dependencies.",
  },
  {
    number: "4",
    title: "Prepare for review",
    detail:
      "Visible gates distinguish missing evidence from qualified human review and final decisions.",
  },
];

const plannedIds = ["fda-initial-ind", "ema-centralised-maa"];
const plannedPathways = plannedIds.map((id) => {
  const pathway = regulatoryPathways.find((item) => item.id === id);
  if (!pathway) throw new Error(`Missing homepage pathway: ${id}`);
  return pathway;
});

export default function HomePage() {
  return (
    <main id="main-content" className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <section className="relative isolate border-b border-white/10 bg-[#0d2c2e] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgb(255_255_255/5%)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/5%)_1px,transparent_1px)] [background-size:54px_54px] opacity-40"
        />
        <div
          aria-hidden="true"
          className="bg-teal absolute -top-36 right-[-8rem] -z-10 size-[34rem] rounded-full opacity-25 blur-[120px]"
        />

        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:gap-12 md:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/8 px-3 py-1 text-xs font-bold tracking-[0.14em] text-[#d4e6dc] uppercase">
                Regulatory execution workspace
              </span>
              <span className="rounded-full border border-[#d3a657]/35 bg-[#d3a657]/10 px-3 py-1 text-xs font-bold text-[#f3d9aa]">
                Editorial prototype
              </span>
            </div>
            <p className="mt-6 flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-[#9bc7ba] uppercase md:mt-8">
              <span className="h-px w-8 bg-[#9bc7ba]" aria-hidden="true" />
              Start with the work, not the menu
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl md:text-6xl">
              Ask what you need to prepare.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#cfddda] sm:mt-6 sm:text-lg sm:leading-8">
              Describe an application, lifecycle change, regulatory update, CTD section, evidence
              gap, or reviewer question. The Hub shows the best available execution path — and says
              clearly when coverage is still planned.
            </p>

            <dl className="mt-9 hidden grid-cols-3 gap-3 border-t border-white/14 pt-6 sm:grid">
              <div>
                <dt className="text-[0.68rem] font-bold tracking-[0.13em] text-[#91b8ae] uppercase">
                  Source policy
                </dt>
                <dd className="mt-2 text-sm font-semibold">Official-first</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold tracking-[0.13em] text-[#91b8ae] uppercase">
                  Search mode
                </dt>
                <dd className="mt-2 text-sm font-semibold">Deterministic</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold tracking-[0.13em] text-[#91b8ae] uppercase">
                  Data entry
                </dt>
                <dd className="mt-2 text-sm font-semibold">Non-confidential</dd>
              </div>
            </dl>
          </div>

          <RegulatoryQuery />
        </div>
      </section>

      <section
        aria-labelledby="product-areas-title"
        className="border-line border-b bg-white py-18"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">
                Start by regulatory task
              </p>
              <h2 id="product-areas-title" className="mt-3 font-serif text-4xl font-semibold">
                One execution hub. Four connected workspaces.
              </h2>
            </div>
            <p className="text-muted max-w-2xl leading-7 lg:justify-self-end">
              CTD evidence is one part of regulatory execution. The product architecture now makes
              application preparation, lifecycle changes, and official-source updates visible as
              first-class areas while preserving honest coverage status.
            </p>
          </div>

          <div className="mt-9 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {productAreas.map((area) => {
              const badgeTone = area.status === "available" ? "teal" : "gold";
              const badgeLabel =
                area.status === "available"
                  ? "Available"
                  : area.status === "building"
                    ? "Building"
                    : "Planned";

              return (
                <Link
                  key={area.id}
                  href={area.href}
                  className="border-line group flex min-h-72 flex-col rounded-2xl border bg-[#f8faf7] p-5 no-underline transition hover:-translate-y-0.5 hover:border-[#8eb0a2] hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-serif text-2xl text-[#61746c]">{area.number}</span>
                    <StatusBadge tone={badgeTone}>{badgeLabel}</StatusBadge>
                  </div>
                  <p className="text-teal mt-7 text-[0.68rem] font-bold tracking-[0.13em] uppercase">
                    {area.eyebrow}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold">{area.title}</h3>
                  <p className="text-muted mt-3 text-sm leading-6">{area.description}</p>
                  <span className="text-teal mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold underline">
                    {area.linkLabel}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="live-workspace-title"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">
              First live execution layer
            </p>
            <h2 id="live-workspace-title" className="mt-3 font-serif text-4xl font-semibold">
              CTD is the foundation — not the whole product.
            </h2>
          </div>
          <p className="text-muted max-w-2xl text-base leading-7 lg:justify-self-end">
            The current release is a bounded CTD Quality foundation. It demonstrates how structured
            execution support can connect guidance, controlled evidence, visible rules, and reviewer
            preparation without presenting draft content as an agency determination.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {liveWorkspaces.map((workspace) => (
            <article
              key={workspace.number}
              className="border-line group relative flex min-h-80 flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-[var(--shadow-soft)] md:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-serif text-3xl text-[#61746c]">{workspace.number}</span>
                <StatusBadge tone="teal">Available</StatusBadge>
              </div>
              <p className="text-teal mt-9 text-xs font-bold tracking-[0.14em] uppercase">
                {workspace.eyebrow}
              </p>
              <h3 className="mt-2 font-serif text-3xl font-semibold">{workspace.title}</h3>
              <p className="text-muted mt-4 text-sm leading-6">{workspace.description}</p>
              <Link
                href={workspace.href}
                className="text-teal mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold underline decoration-[#a8c8bb] decoration-2 transition group-hover:gap-3"
              >
                {workspace.linkLabel}
                <span aria-hidden="true">→</span>
              </Link>
              <span
                aria-hidden="true"
                className="bg-teal absolute bottom-0 left-0 h-1 w-14 transition-all group-hover:w-full"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e8eee9] py-20" aria-labelledby="execution-model-title">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">
                Execution model
              </p>
              <h2 id="execution-model-title" className="mt-3 font-serif text-4xl font-semibold">
                A question is only the entry point.
              </h2>
              <p className="text-muted mt-5 max-w-md leading-7">
                The product edge is not a chat box. It is the traceable chain behind the answer:
                scope, source, evidence state, rule, owner, and review gate.
              </p>
              <Link
                href="/methodology"
                className="border-teal text-teal hover:bg-teal mt-7 inline-flex rounded-xl border bg-transparent px-4 py-3 text-sm font-bold no-underline transition hover:text-white"
              >
                Review methodology
              </Link>
            </div>

            <ol className="grid gap-px overflow-hidden rounded-3xl border border-[#ccd7cf] bg-[#ccd7cf] sm:grid-cols-2">
              {executionSteps.map((step) => (
                <li key={step.number} className="bg-[#f8faf7] p-6 md:p-7">
                  <span className="bg-teal-dark grid size-9 place-items-center rounded-full text-sm font-bold text-white">
                    {step.number}
                  </span>
                  <h3 className="mt-7 text-lg font-bold">{step.title}</h3>
                  <p className="text-muted mt-2 text-sm leading-6">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="coverage-title" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">
              Coverage ledger
            </p>
            <h2 id="coverage-title" className="mt-3 font-serif text-4xl font-semibold">
              Clear about what is live — and what comes next.
            </h2>
            <p className="text-muted mt-5 leading-7">
              The first source-checked FDA/EMA update snapshot is live. Application preparation
              guides and continuous source monitoring remain planned so users can distinguish
              published coverage from the roadmap.
            </p>
            <div className="mt-7 grid gap-3">
              <div className="border-line rounded-2xl border bg-white p-5">
                <div className="flex items-center gap-3">
                  <StatusBadge tone="teal">Live now</StatusBadge>
                  <p className="text-sm font-bold">CTD Quality foundation</p>
                </div>
                <p className="text-muted mt-3 text-sm leading-6">
                  Six 3.2.P section references, 2.3.P traceability, source matrix, deterministic
                  readiness, export, and methodology boundaries.
                </p>
              </div>
              <div className="border-line rounded-2xl border bg-white p-5">
                <div className="flex items-center gap-3">
                  <StatusBadge tone="teal">Live now</StatusBadge>
                  <p className="text-sm font-bold">FDA/EMA update snapshot</p>
                </div>
                <p className="text-muted mt-3 text-sm leading-6">
                  Eight official-source records with source status, draft/final boundaries,
                  applicability prompts, related workflows, and verification dates.
                </p>
                <Link
                  className="text-teal mt-3 inline-block text-sm font-bold underline"
                  href="/regulatory-updates"
                >
                  Review regulatory updates
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {plannedPathways.map((pathway, index) => (
              <article
                key={pathway.id}
                className="border-line grid gap-4 rounded-2xl border bg-white p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center"
              >
                <span className="text-muted font-serif text-2xl">0{index + 1}</span>
                <div>
                  <p className="text-teal text-[0.68rem] font-bold tracking-[0.13em] uppercase">
                    {pathway.category}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{pathway.title}</h3>
                  <p className="text-muted mt-1 text-sm leading-6">{pathway.description}</p>
                </div>
                <StatusBadge tone="gold">Planned</StatusBadge>
              </article>
            ))}
          </div>
        </div>

        <div className="bg-teal-dark mt-12 grid gap-6 rounded-3xl p-7 text-white md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-[#a8cec1] uppercase">
              Trust boundary
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Educational decision support, not a final regulatory determination.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#cfddda]">
              Official sources control. Product-specific facts, current agency requirements, and
              qualified review may change the preparation path. No confidential product, patient, or
              proprietary dossier information should be entered.
            </p>
          </div>
          <Link
            href="/methodology"
            className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0d4a4d] no-underline"
          >
            See how status is determined
          </Link>
        </div>
      </section>
    </main>
  );
}
