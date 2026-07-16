"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/ctd/status-badge";
import type { RegulatoryUpdate } from "@/lib/regulatory-updates/schema";

const impactLabels = {
  conditional: "Conditional",
  potentially_impacted: "Potentially impacted",
  undetermined: "Undetermined",
};

const sourceStatusLabels = {
  final: "Final",
  draft: "Draft",
  effective: "Effective",
  updated: "Updated",
};

type AgencyFilter = "all" | RegulatoryUpdate["agency"];
type CategoryFilter = "all" | RegulatoryUpdate["category"];

export function UpdateExplorer({ records }: { records: readonly RegulatoryUpdate[] }) {
  const [agency, setAgency] = useState<AgencyFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filteredRecords = useMemo(
    () =>
      records.filter(
        (record) =>
          (agency === "all" || record.agency === agency) &&
          (category === "all" || record.category === category),
      ),
    [agency, category, records],
  );

  return (
    <>
      <div className="border-line mt-7 grid gap-4 rounded-2xl border bg-white p-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="text-muted text-xs font-bold tracking-wide uppercase">
          Agency
          <select
            aria-label="Agency filter"
            className="border-line text-ink mt-2 block w-full rounded-xl border bg-white px-3 py-2.5 text-sm font-semibold normal-case"
            value={agency}
            onChange={(event) => setAgency(event.target.value as AgencyFilter)}
          >
            <option value="all">All agencies</option>
            <option value="FDA">FDA</option>
            <option value="EMA">EMA</option>
          </select>
        </label>

        <label className="text-muted text-xs font-bold tracking-wide uppercase">
          Category
          <select
            aria-label="Update category filter"
            className="border-line text-ink mt-2 block w-full rounded-xl border bg-white px-3 py-2.5 text-sm font-semibold normal-case"
            value={category}
            onChange={(event) => setCategory(event.target.value as CategoryFilter)}
          >
            <option value="all">All categories</option>
            <option value="regulatory_guidance">Guidance &amp; procedures</option>
            <option value="safety_intelligence">Safety Intelligence</option>
          </select>
        </label>

        <p className="text-muted pb-2 text-sm font-semibold" aria-live="polite">
          Showing {filteredRecords.length} of {records.length}
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {filteredRecords.map((record) => (
          <article
            key={record.slug}
            className="border-line group flex flex-col rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone={record.agency === "FDA" ? "blue" : "teal"}>
                  {record.agency}
                </StatusBadge>
                <StatusBadge tone={record.sourceDocumentStatus === "draft" ? "gold" : "neutral"}>
                  {sourceStatusLabels[record.sourceDocumentStatus]}
                </StatusBadge>
                {record.category === "safety_intelligence" ? (
                  <StatusBadge tone="rose">Safety Intelligence</StatusBadge>
                ) : null}
              </div>
              <time className="text-muted text-xs font-semibold" dateTime={record.sourceDate.date}>
                {record.sourceDate.date}
              </time>
            </div>

            <h3 className="mt-5 font-serif text-2xl leading-tight font-semibold">{record.title}</h3>
            <p className="text-muted mt-3 text-sm leading-6">{record.summary}</p>

            {record.safety ? (
              <dl className="border-rose/15 bg-rose-soft/50 mt-5 grid grid-cols-2 gap-3 rounded-2xl border p-4 text-xs">
                <div>
                  <dt className="text-muted font-bold tracking-wide uppercase">Safety stage</dt>
                  <dd className="text-ink mt-1 font-semibold">
                    {record.safety.safetyStage.replaceAll("_", " ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted font-bold tracking-wide uppercase">Outcome</dt>
                  <dd className="text-ink mt-1 font-semibold">
                    {record.safety.regulatoryOutcome.replaceAll("_", " ")}
                  </dd>
                </div>
              </dl>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge tone={record.impactClassification === "conditional" ? "blue" : "gold"}>
                {impactLabels[record.impactClassification]}
              </StatusBadge>
              {record.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="border-line text-muted rounded-full border px-2.5 py-1 text-xs font-semibold"
                >
                  {topic}
                </span>
              ))}
            </div>

            {record.commentDeadline ? (
              <p className="text-rose mt-5 text-xs font-bold">
                Official comment deadline:{" "}
                <time dateTime={record.commentDeadline}>{record.commentDeadline}</time>
              </p>
            ) : null}

            <div className="border-line mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-5">
              <p className="text-muted text-xs">
                Official source checked {record.lastVerifiedDate}
              </p>
              <Link
                href={`/regulatory-updates/${record.slug}`}
                className="text-teal inline-flex items-center gap-2 text-sm font-bold underline"
              >
                Review update
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredRecords.length === 0 ? (
        <p className="border-line text-muted mt-5 rounded-2xl border bg-white p-6 text-sm">
          No source-checked records match both filters.
        </p>
      ) : null}
    </>
  );
}
