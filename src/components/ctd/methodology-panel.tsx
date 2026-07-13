import Link from "next/link";
import { StatusBadge } from "@/components/ctd/status-badge";

export function MethodologyPanel() {
  return (
    <aside
      aria-labelledby="methodology-panel-title"
      className="print-break-avoid border-teal/20 mt-16 rounded-3xl border bg-[#e6efe8] p-6 shadow-[var(--shadow-soft)] md:p-8"
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone="teal">Official sources linked</StatusBadge>
        <StatusBadge tone="gold">Editorial draft</StatusBadge>
        <StatusBadge tone="neutral">No confidential data</StatusBadge>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 id="methodology-panel-title" className="font-serif text-2xl font-semibold">
            Methodology & limitations
          </h2>
          <p className="text-muted mt-3 max-w-3xl leading-7">
            CTD structure helps organize information; it does not independently establish every
            product-specific evidence expectation. Product guidance, regional requirements,
            scientific context, agency correspondence, waivers, and commitments may alter the
            content plan.
          </p>
          <p className="mt-3 max-w-3xl text-sm font-semibold text-[#6f4314]">
            Editorial draft — source verification required. No qualified human review record is
            attached.
          </p>
        </div>
        <Link
          className="no-print bg-teal hover:bg-teal-dark inline-flex rounded-xl px-4 py-3 text-sm font-bold text-white no-underline"
          href="/methodology"
        >
          Review methodology
        </Link>
      </div>
    </aside>
  );
}
