import { StatusBadge } from "@/components/ctd/status-badge";
import { calculateSourceSetHash } from "@/lib/ctd/integrity";
import type { CtdSection } from "@/lib/ctd/schema";

export function ReviewRecordPanel({ section }: { section: CtdSection }) {
  const sourceSetHash = calculateSourceSetHash(section.officialSources);
  const approvedCurrentReview = section.reviewRecords.find(
    (record) =>
      record.entityId === section.sectionId &&
      record.contentVersion === section.contentVersion &&
      record.sourceSetHash === sourceSetHash &&
      record.result === "approved",
  );

  return (
    <div className="space-y-5">
      <div className="border-line grid gap-4 rounded-xl border bg-[#fafbf9] p-5 md:grid-cols-3">
        <div>
          <p className="text-muted text-xs font-bold tracking-wide uppercase">Review gate</p>
          <div className="mt-2">
            <StatusBadge tone={approvedCurrentReview ? "teal" : "gold"}>
              {approvedCurrentReview ? "Approved current review" : "No approved review record"}
            </StatusBadge>
          </div>
        </div>
        <div>
          <p className="text-muted text-xs font-bold tracking-wide uppercase">Content version</p>
          <p className="mt-2 font-mono text-sm font-semibold">{section.contentVersion}</p>
        </div>
        <div>
          <p className="text-muted text-xs font-bold tracking-wide uppercase">
            Source-set fingerprint
          </p>
          <p className="mt-2 font-mono text-sm font-semibold">{sourceSetHash.slice(0, 12)}…</p>
        </div>
      </div>

      {section.reviewRecords.length ? (
        <ol className="space-y-3">
          {section.reviewRecords.map((record) => (
            <li key={record.id} className="border-line rounded-xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold">{record.reviewer}</p>
                <StatusBadge tone={record.result === "approved" ? "teal" : "gold"}>
                  {record.result.replaceAll("_", " ")}
                </StatusBadge>
              </div>
              <p className="text-muted mt-2 text-sm">
                {record.reviewerRole} · {record.reviewerQualifications}
              </p>
              <p className="text-muted mt-2 text-sm">
                Reviewed {record.reviewDate} against content {record.contentVersion}
              </p>
              <p className="text-muted mt-3 text-sm leading-6">{record.notes}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="border-gold/25 bg-gold-soft rounded-xl border p-5 text-sm leading-6 text-[#684217]">
          No qualified regulatory review record is attached. The content must remain
          <strong> Editorial draft — source verification required</strong>. A reviewer must verify
          the current content version and source-set fingerprint, record qualifications and the
          review result, and approve that exact version before `human_reviewed` or `reviewer_ready`
          can be displayed.
        </div>
      )}
    </div>
  );
}
