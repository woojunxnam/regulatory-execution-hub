"use client";

import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/ctd/status-badge";
import { sourceStatusLabels } from "@/lib/ctd/presentation";
import type { SourceApprovalStatus, SourceMatrixRow } from "@/lib/ctd/schema";

function downloadCsv(rows: SourceMatrixRow[]) {
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const header = [
    "Source document",
    "Source type",
    "Version",
    "Approval status",
    "Owner",
    "Supported CTD sections",
    "Information used",
    "Review status",
    "Change impact",
  ];
  const body = rows.map((row) =>
    [
      row.sourceDocument,
      row.sourceType,
      row.version,
      row.approvalStatus,
      row.owner,
      row.supportedSections.join("; "),
      row.informationUsed.join("; "),
      row.reviewStatus,
      row.changeImpact,
    ]
      .map(escape)
      .join(","),
  );
  const blob = new Blob([[header.map(escape).join(","), ...body].join("\r\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "source-to-ctd-matrix.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function SourceMatrixTable({ rows }: { rows: SourceMatrixRow[] }) {
  const [status, setStatus] = useState<"all" | SourceApprovalStatus>("all");
  const [section, setSection] = useState("all");
  const sections = useMemo(
    () => Array.from(new Set(rows.flatMap((row) => row.supportedSections))).sort(),
    [rows],
  );
  const filtered = useMemo(
    () =>
      rows.filter(
        (row) =>
          (status === "all" || row.approvalStatus === status) &&
          (section === "all" || row.supportedSections.includes(section)),
      ),
    [rows, section, status],
  );

  return (
    <section
      aria-labelledby="matrix-title"
      className="border-line rounded-3xl border bg-white p-5 shadow-[var(--shadow-soft)] md:p-7"
    >
      <div className="no-print flex flex-wrap items-end justify-between gap-5">
        <div>
          <h2 id="matrix-title" className="font-serif text-2xl font-semibold">
            Matrix records
          </h2>
          <p className="text-muted mt-1 text-sm">
            Showing {filtered.length} of {rows.length} non-confidential demonstration records.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm font-semibold">
            Approval status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as typeof status)}
              className="border-line mt-1 block rounded-lg border bg-white px-3 py-2 font-normal"
            >
              <option value="all">All statuses</option>
              {Object.entries(sourceStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold">
            CTD section
            <select
              value={section}
              onChange={(event) => setSection(event.target.value)}
              className="border-line mt-1 block rounded-lg border bg-white px-3 py-2 font-normal"
            >
              <option value="all">All sections</option>
              {sections.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => downloadCsv(filtered)}
            className="bg-teal hover:bg-teal-dark rounded-xl px-4 py-2.5 text-sm font-bold text-white"
          >
            Export filtered CSV
          </button>
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        Showing {filtered.length} matrix records.
      </p>
      <div className="border-line mt-6 overflow-x-auto rounded-xl border">
        <table className="data-table">
          <caption className="sr-only">
            Source documents mapped to supported CTD sections and information
          </caption>
          <thead>
            <tr>
              <th scope="col">Source document</th>
              <th scope="col">Version / status</th>
              <th scope="col">Owner</th>
              <th scope="col">Supported sections</th>
              <th scope="col">Information used</th>
              <th scope="col">Change impact</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.sourceDocument}</strong>
                  <span className="text-muted mt-1 block text-xs">{row.sourceType}</span>
                </td>
                <td>
                  <span className="block">{row.version}</span>
                  <span className="mt-2 inline-block">
                    <StatusBadge
                      tone={
                        row.approvalStatus === "approved"
                          ? "teal"
                          : row.approvalStatus === "missing" || row.approvalStatus === "superseded"
                            ? "rose"
                            : "gold"
                      }
                    >
                      {sourceStatusLabels[row.approvalStatus]}
                    </StatusBadge>
                  </span>
                </td>
                <td>{row.owner}</td>
                <td>{row.supportedSections.join(", ")}</td>
                <td>{row.informationUsed.join("; ")}</td>
                <td className="text-muted min-w-64 text-sm leading-6">{row.changeImpact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 ? (
        <p className="text-muted rounded-b-xl bg-[#f7f8f6] px-4 py-8 text-center text-sm">
          No source records match both filters. Change a filter to continue.
        </p>
      ) : null}
    </section>
  );
}
