import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";
import { getRegulatoryUpdate, regulatoryUpdates } from "@/data/regulatory-updates/updates";

export const dynamicParams = false;

const impactLabels = {
  conditional: "Conditional",
  potentially_impacted: "Potentially impacted",
  undetermined: "Undetermined",
};

const sourceStatusLabels = {
  final: "Final",
  draft: "Draft — not for implementation",
  effective: "Effective",
  updated: "Updated",
};

export function generateStaticParams() {
  return regulatoryUpdates.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = getRegulatoryUpdate(slug);

  if (!record) return {};

  return {
    title: record.title,
    description: record.summary,
    alternates: { canonical: `/regulatory-updates/${record.slug}` },
  };
}

export default async function RegulatoryUpdateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = getRegulatoryUpdate(slug);

  if (!record) notFound();

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
      <Breadcrumbs
        items={[
          { label: "Regulatory Updates", href: "/regulatory-updates" },
          { label: record.title },
        ]}
      />
      <PageIntro
        eyebrow={`${record.agency} · ${record.updateType.replaceAll("_", " ")}`}
        title={record.title}
        summary={record.summary}
        aside={
          <div className="border-line rounded-2xl border bg-white p-5">
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone={record.agency === "FDA" ? "blue" : "teal"}>
                {record.agency}
              </StatusBadge>
              <StatusBadge tone={record.sourceDocumentStatus === "draft" ? "gold" : "neutral"}>
                {sourceStatusLabels[record.sourceDocumentStatus]}
              </StatusBadge>
            </div>
            <dl className="text-muted mt-5 grid gap-3 text-sm">
              <div>
                <dt className="text-ink font-bold">{record.sourceDate.label}</dt>
                <dd className="mt-1">
                  <time dateTime={record.sourceDate.date}>{record.sourceDate.date}</time>
                </dd>
              </div>
              <div>
                <dt className="text-ink font-bold">Official source checked</dt>
                <dd className="mt-1">
                  <time dateTime={record.lastVerifiedDate}>{record.lastVerifiedDate}</time>
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      {record.sourceDocumentStatus === "draft" ? (
        <section className="border-gold/25 bg-gold-soft mb-10 rounded-3xl border p-6 md:p-8">
          <StatusBadge tone="gold">Draft guidance</StatusBadge>
          <h2 className="mt-4 font-serif text-2xl font-semibold">Not for implementation</h2>
          <p className="text-muted mt-3 leading-7">
            FDA labels this source draft and distributed for comment. It must not be presented as a
            final recommendation or a new binding requirement.
          </p>
          <p className="text-rose mt-4 text-sm font-bold">
            Official comment deadline:{" "}
            <time dateTime={record.commentDeadline}>{record.commentDeadline}</time>
          </p>
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <section className="border-line rounded-3xl border bg-white p-7">
            <p className="text-teal text-xs font-bold tracking-[0.15em] uppercase">RA relevance</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">Why this may matter</h2>
            <p className="text-muted mt-4 leading-7">{record.whyItMatters}</p>
          </section>

          <section className="border-line rounded-3xl border bg-white p-7">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-teal text-xs font-bold tracking-[0.15em] uppercase">
                Applicability boundary
              </p>
              <StatusBadge tone={record.impactClassification === "conditional" ? "blue" : "gold"}>
                {impactLabels[record.impactClassification]}
              </StatusBadge>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-semibold">What is not determined here</h2>
            <p className="text-muted mt-4 leading-7">{record.applicabilityBoundary}</p>
          </section>

          <section className="border-line rounded-3xl border bg-white p-7">
            <p className="text-teal text-xs font-bold tracking-[0.15em] uppercase">
              Preparation prompts
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">Questions to verify</h2>
            <ol className="mt-6 space-y-3">
              {record.verificationQuestions.map((question, index) => (
                <li
                  key={question}
                  className="border-line grid grid-cols-[2rem_1fr] gap-3 rounded-2xl border bg-[#f8faf7] p-4 text-sm leading-6"
                >
                  <span className="text-teal font-bold">{index + 1}</span>
                  <span>{question}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="border-line rounded-3xl border bg-white p-6">
            <p className="text-teal text-xs font-bold tracking-[0.15em] uppercase">
              Controlling source
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">Official source record</h2>
            <dl className="text-muted mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-ink font-bold">Owner</dt>
                <dd className="mt-1">{record.source.owner}</dd>
              </div>
              <div>
                <dt className="text-ink font-bold">Official-source status</dt>
                <dd className="mt-1">{record.officialSourceStatus}</dd>
              </div>
              <div>
                <dt className="text-ink font-bold">Document status</dt>
                <dd className="mt-1">{sourceStatusLabels[record.sourceDocumentStatus]}</dd>
              </div>
              <div>
                <dt className="text-ink font-bold">Version</dt>
                <dd className="mt-1">{record.source.versionLabel}</dd>
              </div>
              <div>
                <dt className="text-ink font-bold">Location checked</dt>
                <dd className="mt-1 leading-6">{record.source.location}</dd>
              </div>
            </dl>
            <a
              className="bg-teal hover:bg-teal-dark mt-6 inline-flex rounded-xl px-4 py-3 text-sm font-bold text-white no-underline"
              href={record.source.url}
              rel="noreferrer"
              target="_blank"
            >
              Open official {record.agency} source
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </section>

          <section className="border-gold/25 bg-gold-soft rounded-3xl border p-6">
            <p className="text-xs font-bold tracking-[0.15em] text-[#74440f] uppercase">
              Editorial status
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">Source checked · draft</h2>
            <dl className="text-muted mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-ink font-bold">Editorial review</dt>
                <dd className="mt-1">{record.editorialReviewStatus.replaceAll("_", " ")}</dd>
              </div>
              <div>
                <dt className="text-ink font-bold">Qualified review record</dt>
                <dd className="mt-1">None attached</dd>
              </div>
              <div>
                <dt className="text-ink font-bold">Record version</dt>
                <dd className="mt-1">{record.recordVersion}</dd>
              </div>
            </dl>
          </section>

          <section className="border-line rounded-3xl border bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold">Related workspaces</h2>
            <ul className="mt-4 space-y-3 text-sm font-bold">
              {record.relatedRoutes.map((route) => (
                <li key={route.href}>
                  <Link className="text-teal underline" href={route.href}>
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <div className="border-line mt-10 border-t pt-6">
        <Link className="text-teal text-sm font-bold underline" href="/regulatory-updates">
          Return to all regulatory updates
        </Link>
      </div>
    </main>
  );
}
