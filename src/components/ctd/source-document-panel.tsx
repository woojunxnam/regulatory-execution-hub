"use client";

import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/ctd/status-badge";
import { sourceStatusLabels } from "@/lib/ctd/presentation";
import type { SourceApprovalStatus, SourceDocumentRequirement } from "@/lib/ctd/schema";

const filterOptions: Array<{ value: "all" | SourceApprovalStatus; label: string }> = [
  { value: "all", label: "All statuses" },
  ...Object.entries(sourceStatusLabels).map(([value, label]) => ({
    value: value as SourceApprovalStatus,
    label,
  })),
];

function sourceTone(status: SourceApprovalStatus) {
  if (status === "missing" || status === "superseded") return "rose" as const;
  if (status === "draft" || status === "under_review") return "gold" as const;
  if (status === "approved") return "teal" as const;
  return "neutral" as const;
}

export function SourceDocumentPanel({ sources }: { sources: SourceDocumentRequirement[] }) {
  const [filter, setFilter] = useState<"all" | SourceApprovalStatus>("all");
  const filtered = useMemo(
    () =>
      filter === "all" ? sources : sources.filter((source) => source.approvalStatus === filter),
    [filter, sources],
  );
  const missingCount = sources.filter((source) => source.approvalStatus === "missing").length;
  const unapprovedCount = sources.filter(
    (source) => source.approvalStatus !== "approved" && source.approvalStatus !== "not_applicable",
  ).length;

  return (
    <div>
      <div className="no-print mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex gap-3" aria-label="Source status summary">
          <div className="bg-rose-soft rounded-xl px-3 py-2 text-sm">
            <strong className="text-rose">{missingCount}</strong> missing
          </div>
          <div className="bg-gold-soft rounded-xl px-3 py-2 text-sm">
            <strong className="text-[#74440f]">{unapprovedCount}</strong> not approved
          </div>
        </div>
        <label className="text-ink text-sm font-semibold">
          Approval status
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as typeof filter)}
            className="border-line mt-1 block min-w-52 rounded-lg border bg-white px-3 py-2 font-normal"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {filtered.length} source documents.
      </p>
      <div className="border-line overflow-x-auto rounded-xl border">
        <table className="data-table">
          <caption className="sr-only">Source documents supporting CTD section 3.2.P.5</caption>
          <thead>
            <tr>
              <th scope="col">Source document</th>
              <th scope="col">Owner / version</th>
              <th scope="col">Status</th>
              <th scope="col">Sections supported</th>
              <th scope="col">Final-authoring impact</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((source) => (
              <tr key={source.id}>
                <td>
                  <strong className="text-ink block">{source.title}</strong>
                  <span className="text-muted mt-1 block text-xs leading-5">{source.type}</span>
                </td>
                <td>
                  {source.owner}
                  <span className="text-muted mt-1 block text-xs">{source.version}</span>
                </td>
                <td>
                  <StatusBadge tone={sourceTone(source.approvalStatus)}>
                    {sourceStatusLabels[source.approvalStatus]}
                  </StatusBadge>
                </td>
                <td>{source.sectionsSupported.join(", ")}</td>
                <td>
                  <span className="text-ink font-semibold">
                    {source.blocksFinalAuthoring
                      ? "Blocks until resolved"
                      : "Does not automatically block"}
                  </span>
                  <span className="text-muted mt-1 block text-xs leading-5">{source.notes}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 ? (
        <p className="text-muted rounded-b-xl bg-[#f7f8f6] px-4 py-6 text-center text-sm">
          No demonstration sources match this status.
        </p>
      ) : null}
    </div>
  );
}
