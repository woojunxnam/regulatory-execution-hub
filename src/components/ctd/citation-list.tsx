import { StatusBadge } from "@/components/ctd/status-badge";
import type { RegulatoryCitation } from "@/lib/ctd/schema";

export function CitationList({ citations }: { citations: RegulatoryCitation[] }) {
  return (
    <ol className="space-y-4">
      {citations.map((citation) => (
        <li key={citation.id} className="border-line rounded-xl border bg-[#fafbf9] p-4">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="blue">{citation.owner}</StatusBadge>
            <StatusBadge tone={citation.sourceStatus === "draft" ? "gold" : "teal"}>
              Official status: {citation.sourceStatus}
            </StatusBadge>
            <StatusBadge
              tone={citation.editorialReviewStatus === "human_reviewed" ? "teal" : "neutral"}
            >
              Editorial: {citation.editorialReviewStatus.replaceAll("_", " ")}
            </StatusBadge>
          </div>
          <a
            className="text-teal hover:text-teal-dark mt-3 inline-block font-semibold underline"
            href={citation.officialUrl}
            target="_blank"
            rel="noreferrer"
          >
            {citation.title}
          </a>
          <dl className="text-muted mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-ink font-semibold">Location</dt>
              <dd>{citation.sectionOrPage}</dd>
            </div>
            <div>
              <dt className="text-ink font-semibold">Last verified</dt>
              <dd>{citation.lastVerifiedDate}</dd>
            </div>
          </dl>
          <p className="text-muted mt-3 text-sm leading-6">{citation.note}</p>
          <details className="border-line mt-4 border-t pt-3">
            <summary className="text-teal cursor-pointer text-sm font-semibold">
              Source version history ({citation.versionHistory.length})
            </summary>
            <ol className="text-muted mt-3 space-y-3 text-xs leading-5">
              {citation.versionHistory.map((version) => (
                <li key={`${version.versionLabel}-${version.verifiedDate}`}>
                  <span className="text-ink font-semibold">{version.versionLabel}</span>
                  {` · ${version.sourceStatus} · verified ${version.verifiedDate}`}
                  <span className="mt-1 block">{version.note}</span>
                </li>
              ))}
            </ol>
          </details>
        </li>
      ))}
    </ol>
  );
}
