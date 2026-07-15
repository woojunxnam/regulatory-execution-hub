import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { CitationList } from "@/components/ctd/citation-list";
import { DisclosureGroup } from "@/components/ctd/disclosure-group";
import { PageIntro } from "@/components/ctd/page-intro";
import { PrintExportActions } from "@/components/ctd/print-export-actions";
import { ReadinessPanel } from "@/components/ctd/readiness-panel";
import { ReviewRecordPanel } from "@/components/ctd/review-record-panel";
import { SourceDocumentPanel } from "@/components/ctd/source-document-panel";
import { StatusBadge } from "@/components/ctd/status-badge";
import { classificationLabels } from "@/lib/ctd/presentation";
import { evaluateAuthoringReadiness } from "@/lib/ctd/readiness";
import type { CtdSection } from "@/lib/ctd/schema";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="text-muted space-y-3 text-sm leading-6">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="bg-teal mt-2 size-1.5 shrink-0 rounded-full" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CtdSectionDetail({ section }: { section: CtdSection }) {
  const readiness = evaluateAuthoringReadiness(section);
  const unresolvedQuestions = section.readinessContext.unresolvedQuestions.filter(
    (question) => !question.resolved,
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "CTD Builder", href: "/submission-navigator/ctd" },
          { label: "Module 3", href: "/submission-navigator/ctd/module-3" },
          { label: "Drug Product", href: "/submission-navigator/ctd/module-3/drug-product" },
          { label: section.sectionId },
        ]}
      />
      <PageIntro
        eyebrow={`${section.sectionId} · Module ${section.module}`}
        title={section.title}
        summary={section.regulatoryPurpose}
        aside={
          <div className="border-line space-y-3 rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="gold">Editorial draft</StatusBadge>
              <StatusBadge tone="blue">M4Q(R1)</StatusBadge>
            </div>
            <dl className="text-muted grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-ink font-bold">Content version</dt>
                <dd>{section.contentVersion}</dd>
              </div>
              <div>
                <dt className="text-ink font-bold">Last source check</dt>
                <dd>{section.lastVerifiedDate}</dd>
              </div>
            </dl>
          </div>
        }
      />

      <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="border-gold/25 bg-gold-soft rounded-2xl border p-5 text-sm leading-6 text-[#684217]">
          <strong>Scope boundary:</strong> this page organizes current M4Q(R1) section content. It
          does not infer that every listed source or activity is mandatory for every product. Draft
          M4Q(R2) is not used as current implementation content.
        </div>
        <PrintExportActions section={section} readiness={readiness} />
      </div>

      <ReadinessPanel result={readiness} />

      <div className="mt-8 space-y-4">
        <DisclosureGroup
          title="Scope: what belongs here"
          summary="Current section boundary based on M4Q(R1) and CTD-Q location guidance."
          defaultOpen
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-ink mb-4 font-semibold">Include</h3>
              <BulletList items={section.include} />
            </div>
            <div>
              <h3 className="text-ink mb-4 font-semibold">Normally organized elsewhere</h3>
              <BulletList items={section.normallyExclude} />
            </div>
          </div>
        </DisclosureGroup>

        <DisclosureGroup
          title="Expected & conditional information"
          summary="Classification is visible; a CTD heading alone is never treated as proof of product-specific applicability."
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-ink mb-4 font-semibold">Expected information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {section.informationExpected.map((item) => (
                  <article key={item.id} className="border-line rounded-xl border bg-[#fafbf9] p-4">
                    <StatusBadge tone="blue">
                      {classificationLabels[item.classification]}
                    </StatusBadge>
                    <h4 className="mt-3 font-semibold">{item.title}</h4>
                    <p className="text-muted mt-2 text-sm leading-6">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-ink mb-4 font-semibold">Conditional or undetermined</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {section.conditionalInformation.map((item) => (
                  <article
                    key={item.id}
                    className="border-gold/20 bg-gold-soft/55 rounded-xl border p-4"
                  >
                    <StatusBadge tone="gold">
                      {classificationLabels[item.classification]}
                    </StatusBadge>
                    <h4 className="mt-3 font-semibold">{item.title}</h4>
                    <p className="text-muted mt-2 text-sm leading-6">{item.description}</p>
                    <p className="mt-3 text-xs font-semibold text-[#6f4314]">
                      When: {item.appliesWhen}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </DisclosureGroup>

        <DisclosureGroup
          title="Source documents & source data"
          summary="Filter controlled sources and see what prevents final authoring."
        >
          <SourceDocumentPanel sources={section.sourceDocuments} sectionId={section.sectionId} />
          <div className="border-line mt-8 border-t pt-6">
            <h3 className="font-semibold">Source data inventory</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {section.sourceData.map((item) => (
                <article key={item.id} className="rounded-xl bg-[#f2f5f1] p-4">
                  <StatusBadge tone={item.status === "approved" ? "teal" : "gold"}>
                    {item.status.replaceAll("_", " ")}
                  </StatusBadge>
                  <h4 className="mt-3 font-semibold">{item.title}</h4>
                  <p className="text-muted mt-2 text-xs leading-5">{item.purpose}</p>
                  <p className="text-ink mt-3 text-xs font-bold">Owner: {item.owner}</p>
                </article>
              ))}
            </div>
          </div>
        </DisclosureGroup>

        <DisclosureGroup
          title="Owners, dependencies & unresolved questions"
          summary={`${unresolvedQuestions.length} unresolved question${unresolvedQuestions.length === 1 ? "" : "s"} in the demonstration record.`}
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold">Ownership</h3>
              <dl className="text-muted mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-ink font-bold">Primary owner</dt>
                  <dd>{section.primaryOwner}</dd>
                </div>
                <div>
                  <dt className="text-ink font-bold">Contributors</dt>
                  <dd>{section.contributors.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-ink font-bold">Approvers</dt>
                  <dd>{section.approvers.join(", ")}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Dependencies</h3>
              <BulletList items={section.dependencies} />
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Open questions</h3>
              {unresolvedQuestions.length ? (
                <ul className="text-muted space-y-3 text-sm leading-6">
                  {unresolvedQuestions.map((question) => (
                    <li key={question.id} className="bg-rose-soft rounded-lg p-3">
                      {question.text}
                      <span className="text-rose mt-1 block text-xs font-bold">
                        Owner: {question.owner}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted text-sm">No unresolved questions.</p>
              )}
            </div>
          </div>
        </DisclosureGroup>

        <DisclosureGroup
          title="Authoring & SME questions"
          summary="Prompts for a controlled authoring packet, not generated submission prose."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-semibold">Authoring questions</h3>
              <BulletList items={section.authoringQuestions} />
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Questions for SMEs</h3>
              <BulletList items={section.smeQuestions} />
            </div>
          </div>
        </DisclosureGroup>

        <DisclosureGroup
          title="Expected tables, figures & cross-references"
          summary="Traceable presentation aids and dossier relationships."
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold">Tables</h3>
              <BulletList items={section.expectedTables} />
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Figures</h3>
              <p className="text-muted text-sm leading-6">
                {section.expectedFigures.length
                  ? section.expectedFigures.join("; ")
                  : "No default figure is asserted. Add one only when supported by the product-specific content plan."}
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Cross-references</h3>
              <BulletList items={section.crossReferences} />
            </div>
          </div>
        </DisclosureGroup>

        <DisclosureGroup
          title="Consistency checks"
          summary="The checker exposes discrepancies; it does not silently choose a correct value."
        >
          <div className="space-y-3">
            {section.consistencyChecks.map((check) => (
              <article key={check.id} className="border-line rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold">{check.label}</h3>
                  <div className="flex gap-2">
                    <StatusBadge tone={check.severity === "critical" ? "rose" : "gold"}>
                      {check.severity}
                    </StatusBadge>
                    <StatusBadge tone={check.status === "pass" ? "teal" : "neutral"}>
                      {check.status.replaceAll("_", " ")}
                    </StatusBadge>
                  </div>
                </div>
                <p className="text-muted mt-2 text-sm">{check.comparedLocations.join(" · ")}</p>
                <p className="text-muted mt-2 text-sm leading-6">{check.rationale}</p>
              </article>
            ))}
          </div>
        </DisclosureGroup>

        <DisclosureGroup
          title="Reviewer lens, editorial risk signals & inspection relevance"
          summary="Educational preparation only; not an FDA/EMA-issued review or inspection determination."
        >
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold">Reviewer questions</h3>
              <BulletList items={section.reviewerQuestions} />
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Editorial QA risk signals</h3>
              <BulletList items={section.commonDeficiencies} />
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Inspection relevance</h3>
              <BulletList items={section.inspectionRelevance} />
            </div>
          </div>
        </DisclosureGroup>

        <DisclosureGroup
          title="Official sources & verification metadata"
          summary="Official source status and website editorial status are deliberately separate."
        >
          <CitationList citations={section.officialSources} />
        </DisclosureGroup>

        <DisclosureGroup
          title="Content version history"
          summary="Each version records its editorial status and complete official-source set."
        >
          <ol className="space-y-3">
            {section.contentHistory.map((record) => (
              <li
                key={`${record.version}-${record.date}`}
                className="border-line rounded-xl border bg-[#fafbf9] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-sm font-bold">{record.version}</span>
                  <StatusBadge
                    tone={record.editorialReviewStatus === "human_reviewed" ? "teal" : "gold"}
                  >
                    {record.editorialReviewStatus.replaceAll("_", " ")}
                  </StatusBadge>
                </div>
                <p className="text-muted mt-2 text-sm">
                  {record.date} · {record.changeSummary}
                </p>
                <p className="text-muted mt-2 text-xs">
                  Sources: {record.sourceCitationIds.join(", ")}
                </p>
              </li>
            ))}
          </ol>
        </DisclosureGroup>

        <DisclosureGroup
          title="Qualified review record"
          summary="Review status is version- and source-set-specific; no approval is inferred."
        >
          <ReviewRecordPanel section={section} />
        </DisclosureGroup>
      </div>

      <div className="no-print border-line mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-7">
        <Link
          className="text-teal font-bold underline"
          href="/submission-navigator/ctd/source-matrix"
        >
          Continue to Source-to-CTD Matrix
        </Link>
        <Link
          className="text-muted text-sm underline"
          href="/submission-navigator/ctd/module-3/drug-product"
        >
          Back to Drug Product index
        </Link>
      </div>
    </>
  );
}
