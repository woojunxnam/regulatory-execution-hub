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
    title: "Review an update before acting",
    description:
      "Check document status, source dates, comment deadlines, and applicability boundaries.",
    href: "/regulatory-updates",
    linkLabel: "Review regulatory updates",
  },
  {
    number: "02",
    title: "Trace sources behind a CTD section",
    description:
      "Map demonstration evidence to CTD destinations and expose missing or unapproved sources.",
    href: "/submission-navigator/ctd/source-matrix",
    linkLabel: "Open Source-to-CTD Matrix",
  },
  {
    number: "03",
    title: "Prepare a CTD Quality section",
    description:
      "Start with section purpose, expected information, source documents, gaps, and reviewer questions.",
    href: "/submission-navigator/ctd",
    linkLabel: "Open CTD Builder",
  },
  {
    number: "04",
    title: "Check QOS traceability",
    description:
      "Connect draft Module 2.3 content to available Module 3 evidence and consistency checks.",
    href: "/submission-navigator/ctd/module-2/quality-overall-summary",
    linkLabel: "Review QOS traceability",
  },
];

const sourceStatusLabels = {
  final: "Final",
  draft: "Draft — not for implementation",
  effective: "Effective",
  updated: "Updated",
};

const latestUpdates = regulatoryUpdates.slice(0, 3);

function HeroActions({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/regulatory-updates"
          className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0d4a4d] no-underline transition hover:bg-[#eaf3ed]"
        >
          Review regulatory updates
        </Link>
        <Link
          href="/submission-navigator/ctd"
          className="rounded-xl border border-white/35 px-5 py-3 text-center text-sm font-bold text-white no-underline transition hover:border-white hover:bg-white/10"
        >
          Open CTD Builder
        </Link>
      </div>

      <dl className="mt-7 grid gap-2 border-t border-white/14 pt-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[0.68rem] font-bold tracking-[0.13em] text-[#91b8ae] uppercase">
            Available now
          </dt>
          <dd className="mt-1 font-semibold">Regulatory Updates · CTD Quality</dd>
        </div>
        <div>
          <dt className="text-[0.68rem] font-bold tracking-[0.13em] text-[#d9bc86] uppercase">
            Coming next
          </dt>
          <dd className="mt-1 font-semibold">Submission Guides · Post-Approval Changes</dd>
        </div>
      </dl>
    </div>
  );
}

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

        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-12 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-y-0 lg:px-8 lg:py-20">
          <div className="max-w-xl lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="text-xs font-bold tracking-[0.18em] text-[#a8cec1] uppercase">
              For Regulatory Affairs teams
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] text-balance sm:text-5xl md:text-6xl">
              Find what to prepare — traced to official FDA and EMA sources.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#cfddda] sm:text-lg sm:leading-8">
              Start with a regulatory update or CTD task. See what is available, what is planned,
              and where qualified review is still pending.
            </p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <RegulatoryQuery />
          </div>
          <HeroActions className="lg:col-start-1 lg:row-start-2 lg:mt-7 lg:self-start" />
        </div>
      </section>

      <section
        aria-labelledby="popular-tasks-title"
        className="border-line border-b bg-white py-16"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">
                Available now
              </p>
              <h2 id="popular-tasks-title" className="mt-2 font-serif text-4xl font-semibold">
                Choose a live task.
              </h2>
            </div>
            <p className="text-muted max-w-xl text-sm leading-6 md:text-right">
              Every route below opens published coverage. Planned work stays in the compact roadmap
              above until a source-backed workflow is ready.
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {popularTasks.map((task) => (
              <Link
                key={task.number}
                href={task.href}
                className="border-line group flex min-h-64 flex-col rounded-2xl border bg-[#f8faf7] p-5 no-underline transition hover:-translate-y-0.5 hover:border-[#8eb0a2] hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-serif text-2xl text-[#61746c]">{task.number}</span>
                  <StatusBadge tone="teal">Available</StatusBadge>
                </div>
                <h3 className="mt-7 font-serif text-2xl font-semibold">{task.title}</h3>
                <p className="text-muted mt-3 text-sm leading-6">{task.description}</p>
                <span className="text-teal mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold underline">
                  {task.linkLabel}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="latest-updates-title"
        className="mx-auto max-w-7xl px-5 py-16 lg:px-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">
              Manually curated
            </p>
            <h2 id="latest-updates-title" className="mt-2 font-serif text-4xl font-semibold">
              Latest source-checked updates
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
              className="border-line grid gap-4 rounded-2xl border bg-white p-5 md:grid-cols-[auto_1fr_auto] md:items-center"
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

        <div className="bg-teal-dark mt-10 grid gap-5 rounded-3xl p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-[#a8cec1] uppercase">
              Trust boundary
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Official sources first. Review status visible.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#cfddda]">
              Draft guidance stays draft. Qualified regulatory review is shown only when a review
              record exists. Nothing here is a final regulatory determination.
            </p>
          </div>
          <Link
            href="/methodology"
            className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#0d4a4d] no-underline"
          >
            Review Trust &amp; Sources
          </Link>
        </div>
      </section>
    </main>
  );
}
