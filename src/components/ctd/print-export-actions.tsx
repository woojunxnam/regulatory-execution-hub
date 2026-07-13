"use client";

import type { CtdSection } from "@/lib/ctd/schema";
import type { ReadinessResult } from "@/lib/ctd/readiness";
import { readinessLabels } from "@/lib/ctd/presentation";

function buildAuthoringPacket(section: CtdSection, readiness: ReadinessResult) {
  const lines = [
    `${section.sectionId} — ${section.title}`,
    `Content version: ${section.contentVersion}`,
    `Last source check: ${section.lastVerifiedDate}`,
    `Editorial status: Editorial draft — source verification required`,
    "",
    "PURPOSE",
    section.regulatoryPurpose,
    "",
    "READINESS",
    readinessLabels[readiness.state],
    ...readiness.blockers.map((item) => `- Blocker: ${item}`),
    ...readiness.nextActions.map((item) => `- Next action: ${item}`),
    "",
    "SOURCE DOCUMENTS",
    ...section.sourceDocuments.map(
      (source) =>
        `- ${source.title} | ${source.approvalStatus} | ${source.owner} | ${source.version}`,
    ),
    "",
    "QUESTIONS FOR SMES",
    ...section.smeQuestions.map((question) => `- ${question}`),
    "",
    "CONSISTENCY CHECKS",
    ...section.consistencyChecks.map(
      (check) => `- ${check.label} | ${check.status} | ${check.comparedLocations.join(" ↔ ")}`,
    ),
    "",
    "OFFICIAL SOURCES",
    ...section.officialSources.map(
      (source) => `- ${source.owner}: ${source.title} | ${source.officialUrl}`,
    ),
    "",
    "LIMITATION",
    "Educational decision support only. This packet is not a final regulatory determination, agency completeness decision, legal advice, or GxP record.",
  ];
  return lines.join("\n");
}

export function PrintExportActions({
  section,
  readiness,
}: {
  section: CtdSection;
  readiness: ReadinessResult;
}) {
  function exportPacket() {
    const file = new Blob([buildAuthoringPacket(section, readiness)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${section.slug}-authoring-packet.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="no-print flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="border-teal text-teal hover:bg-sage rounded-xl border bg-white px-4 py-3 text-sm font-bold"
      >
        Print packet
      </button>
      <button
        type="button"
        onClick={exportPacket}
        className="bg-teal hover:bg-teal-dark rounded-xl px-4 py-3 text-sm font-bold text-white"
      >
        Export text packet
      </button>
    </div>
  );
}
