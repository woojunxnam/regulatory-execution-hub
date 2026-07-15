import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";
import {
  crossModuleConsistencyRules,
  qualitySummaryTraceability,
} from "@/data/ctd/quality-summary-traceability";
import { evaluateCrossModuleReadiness } from "@/lib/ctd/traceability";

export const metadata: Metadata = {
  title: "2.3 Quality Overall Summary Traceability",
  description:
    "Trace draft Quality Overall Summary locations to controlled Module 3 evidence and visible consistency checks.",
};

function traceabilityTone(status: "linked" | "open" | "blocked") {
  if (status === "linked") return "teal" as const;
  if (status === "blocked") return "rose" as const;
  return "gold" as const;
}

export default function QualityOverallSummaryPage() {
  const readiness = evaluateCrossModuleReadiness(crossModuleConsistencyRules);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "CTD Builder", href: "/submission-navigator/ctd" },
          { label: "Module 2" },
          { label: "Quality Overall Summary" },
        ]}
      />
      <PageIntro
        eyebrow="CTD Module 2.3"
        title="Quality Overall Summary traceability"
        summary="A draft relationship map from Quality Overall Summary locations to controlled Module 3 sections, source-document metadata, and explicit consistency checks. It does not generate summary conclusions or replace qualified regulatory review."
        aside={
          <div className="border-line space-y-3 rounded-2xl border bg-white p-5 shadow-sm">
            <StatusBadge tone="gold">Editorial draft</StatusBadge>
            <p className="text-muted text-sm leading-6">
              Source verification and cross-module reconciliation remain open. No qualified human
              review record is attached.
            </p>
          </div>
        }
      />

      <section
        aria-labelledby="cross-readiness-title"
        className="border-line mb-10 rounded-3xl border bg-white p-6 shadow-[var(--shadow-soft)] md:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-muted text-xs font-bold tracking-[0.16em] uppercase">
              Deterministic cross-module gate
            </p>
            <h2 id="cross-readiness-title" className="mt-1 font-serif text-2xl font-semibold">
              Reviewer readiness
            </h2>
          </div>
          <StatusBadge tone={readiness.state === "blocked" ? "rose" : "teal"}>
            {readiness.state.replaceAll("_", " ")}
          </StatusBadge>
        </div>
        <p className="text-muted mt-4 leading-7">
          Critical unresolved or unable-to-compare rules block this draft. The evaluator reports
          discrepancies and never selects a preferred technical value.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-rose text-sm font-bold tracking-wide uppercase">
              Critical blockers ({readiness.blockers.length})
            </h3>
            <ul className="text-muted mt-3 space-y-2 text-sm leading-6">
              {readiness.blockers.map((blocker) => (
                <li key={blocker}>{blocker}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide text-[#74440f] uppercase">
              Noncritical open rules ({readiness.warnings.length})
            </h3>
            <ul className="text-muted mt-3 space-y-2 text-sm leading-6">
              {readiness.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="traceability-title">
        <div className="mb-5">
          <p className="text-teal text-xs font-bold tracking-[0.16em] uppercase">
            Summary-to-evidence map
          </p>
          <h2 id="traceability-title" className="mt-2 font-serif text-3xl font-semibold">
            2.3.P to 3.2.P traceability
          </h2>
        </div>
        <div className="border-line overflow-x-auto rounded-2xl border bg-white">
          <table className="data-table">
            <caption className="sr-only">
              Quality Overall Summary to Module 3 traceability records
            </caption>
            <thead>
              <tr>
                <th scope="col">QOS / Module 3</th>
                <th scope="col">Relationship and topics</th>
                <th scope="col">Controlled references</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {qualitySummaryTraceability.map((record) => (
                <tr key={record.id}>
                  <td>
                    <strong className="text-ink block">{record.qosLocation}</strong>
                    <Link
                      className="text-teal mt-1 inline-block font-semibold underline"
                      href={`/submission-navigator/ctd/module-3/drug-product/${record.module3Slug}`}
                    >
                      {record.module3SectionId}
                    </Link>
                  </td>
                  <td>
                    <span className="text-muted block text-sm leading-6">
                      {record.relationship}
                    </span>
                    <span className="text-ink mt-2 block text-xs font-semibold">
                      {record.topics.join(" · ")}
                    </span>
                  </td>
                  <td>
                    <span className="text-muted block text-xs leading-5">
                      Sources: {record.sourceDocumentIds.join(", ")}
                    </span>
                    <span className="text-muted mt-2 block text-xs leading-5">
                      Checks: {record.consistencyCheckIds.join(", ")}
                    </span>
                  </td>
                  <td>
                    <StatusBadge tone={traceabilityTone(record.traceabilityStatus)}>
                      {record.traceabilityStatus}
                    </StatusBadge>
                    <span className="text-muted mt-2 block text-xs">
                      Review: {record.reviewStatus.replaceAll("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="rules-title" className="mt-12">
        <p className="text-teal text-xs font-bold tracking-[0.16em] uppercase">Visible rules</p>
        <h2 id="rules-title" className="mt-2 font-serif text-3xl font-semibold">
          Cross-module consistency checks
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {crossModuleConsistencyRules.map((rule) => (
            <article key={rule.id} className="border-line rounded-2xl border bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="max-w-lg font-semibold">{rule.label}</h3>
                <div className="flex gap-2">
                  <StatusBadge tone={rule.severity === "critical" ? "rose" : "gold"}>
                    {rule.severity}
                  </StatusBadge>
                  <StatusBadge tone={rule.status === "pass" ? "teal" : "neutral"}>
                    {rule.status.replaceAll("_", " ")}
                  </StatusBadge>
                </div>
              </div>
              <p className="text-muted mt-3 text-sm">{rule.comparedLocations.join(" · ")}</p>
              <p className="text-muted mt-3 text-sm leading-6">{rule.rationale}</p>
              <p className="text-ink mt-3 text-xs font-bold">
                Owner: {rule.owner} · Evaluated: {rule.lastEvaluatedDate}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="border-gold/25 bg-gold-soft mt-10 rounded-2xl border p-5 text-sm leading-6 text-[#684217]">
        <strong>Editorial boundary:</strong> all records on this page are
        source-verification-required drafts. `reviewer_ready` can be displayed only after the
        critical rules are explicitly resolved; human-reviewed status additionally requires a
        qualified review record for the exact content version and source set.
      </div>
    </>
  );
}
