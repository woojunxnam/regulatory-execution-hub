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
        </li>
      ))}
    </ol>
  );
}
