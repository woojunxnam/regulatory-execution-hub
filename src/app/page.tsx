import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/ctd/status-badge";
import { RegulatoryQuery } from "@/components/home/regulatory-query";
import { regulatoryUpdates } from "@/data/regulatory-updates/updates";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FDA & EMA Preparation Support",
  description:
    "Find source-checked FDA and EMA regulatory updates and traceable CTD Quality preparation support.",
  alternates: { canonical: "/" },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

const popularTasks = [
  {
    number: "01",
    title: "Review regulatory updates",
    description: "Document status, source dates, and applicability.",
    href: "/regulatory-updates",
  },
  {
    number: "02",
    title: "Trace CTD sources",
    description: "Evidence destinations, approval state, and gaps.",
    href: "/submission-navigator/ctd/source-matrix",
  },
  {
    number: "03",
    title: "Prepare CTD Quality",
    description: "Section purpose, source documents, and review questions.",
    href: "/submission-navigator/ctd",
  },
  {
    number: "04",
    title: "Check QOS traceability",
    description: "Module 2.3-to-3 evidence and consistency.",
    href: "/submission-navigator/ctd/module-2/quality-overall-summary",
  },
];

const sourceStatusLabels = {
  final: "Final",
  draft: "Draft — not for implementation",
  effective: "Effective",
  updated: "Updated",
};

const latestUpdates = regulatoryUpdates.slice(0, 3);

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
          className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgb(255_255_255/5%)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/5%)_1px,transparent_1px)] [background-size:54px_54px] opacity-35"
        />
        <div
          aria-hidden="true"
          className="bg-teal absolute -top-36 right-[-8rem] -z-10 size-[34rem] rounded-full opacity-20 blur-[120px]"
        />

        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-12 text-center md:py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.18em] text-[#a8cec1] uppercase">
              For Regulatory Affairs teams
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl md:text-6xl">
              What do you need to prepare?
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#cfddda] sm:text-lg">
              Find source-checked FDA and EMA updates, CTD references, and the next available
              workflow.
            </p>
          </div>

          <div className="mt-7 w-full">
            <RegulatoryQuery />
          </div>

          <dl
            aria-label="Coverage status"
            className="mt-5 flex flex-col items-center justify-center gap-2 text-xs sm:flex-row sm:gap-5"
          >
            <div className="flex items-center gap-2">
              <dt className="font-bold tracking-[0.11em] text-[#91b8ae] uppercase">Live</dt>
              <dd className="font-semibold">Regulatory Updates · CTD Quality</dd>
            </div>
            <div className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <dt className="font-bold tracking-[0.11em] text-[#d9bc86] uppercase">Next</dt>
              <dd className="font-semibold">Application Guides · Lifecycle Changes</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="popular-tasks-title"
        className="border-line border-b bg-white py-12"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">Available now</p>
          <h2 id="popular-tasks-title" className="mt-2 font-serif text-3xl font-semibold">
            Open a live workspace.
          </h2>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {popularTasks.map((task) => (
              <Link
                key={task.number}
                href={task.href}
                className="border-line group rounded-2xl border bg-[#f8faf7] p-5 no-underline transition hover:-translate-y-0.5 hover:border-[#8eb0a2] hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-serif text-xl text-[#61746c]">{task.number}</span>
                  <span
                    aria-hidden="true"
                    className="text-teal transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold">{task.title}</h3>
                <p className="text-muted mt-2 text-sm leading-5">{task.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="latest-updates-title"
        className="mx-auto max-w-7xl px-5 py-12 lg:px-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">
              Official source checked
            </p>
            <h2 id="latest-updates-title" className="mt-2 font-serif text-3xl font-semibold">
              Latest updates
            </h2>
          </div>
          <Link className="text-teal text-sm font-bold underline" href="/regulatory-updates">
            View all regulatory updates
          </Link>
        </div>

        <div className="mt-8 grid gap-3">
          {latestUpdates.map((record) => (
            <article
              key={record.slug}
              className="border-line grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-[auto_1fr_auto] md:items-center"
            >
              <div className="flex flex-wrap gap-2 md:w-48">
                <StatusBadge tone={record.agency === "FDA" ? "blue" : "teal"}>
                  {record.agency}
                </StatusBadge>
                <StatusBadge tone={record.sourceDocumentStatus === "draft" ? "gold" : "neutral"}>
                  {sourceStatusLabels[record.sourceDocumentStatus]}
                </StatusBadge>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold">{record.title}</h3>
                <p className="text-muted mt-1 text-xs leading-5">
                  Source date{" "}
                  <time dateTime={record.sourceDate.date}>{record.sourceDate.date}</time>
                  {" · "}Official source checked{" "}
                  <time dateTime={record.lastVerifiedDate}>{record.lastVerifiedDate}</time>
                </p>
              </div>
              <Link
                className="text-teal text-sm font-bold underline md:text-right"
                href={`/regulatory-updates/${record.slug}`}
              >
                Review update
              </Link>
            </article>
          ))}
        </div>

        <div className="bg-teal-dark mt-8 grid gap-4 rounded-2xl p-5 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-xl font-semibold">
              Source and review status stay visible.
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-5 text-[#cfddda]">
              Draft stays draft; qualified review appears only with a review record.
            </p>
          </div>
          <Link
            href="/methodology"
            className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0d4a4d] no-underline"
          >
            How sources are handled
          </Link>
        </div>
      </section>
    </main>
  );
}
