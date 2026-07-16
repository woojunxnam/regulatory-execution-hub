import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";
import { moduleThreeGroups } from "@/data/ctd/module-3-sections";

export const metadata: Metadata = {
  title: "Module 3 Quality",
  description:
    "Navigate the CTD Module 3 Quality structure and the available Drug Product evidence foundation.",
  alternates: { canonical: "/submission-navigator/ctd/module-3" },
};

export default function ModuleThreePage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "CTD Builder", href: "/submission-navigator/ctd" }, { label: "Module 3" }]}
      />
      <PageIntro
        eyebrow="CTD Module 3"
        title="Quality"
        summary="Navigate the harmonized quality structure while preserving the distinction between section placement and the scientific evidence required for a specific product or program."
        aside={
          <div className="bg-gold-soft rounded-2xl p-5 text-sm leading-6 text-[#654018]">
            <strong className="block">Current structure</strong>
            M4Q(R1) powers this prototype. Draft M4Q(R2) remains a separate future-readiness
            reference and is not current implementation content.
          </div>
        }
      />
      <section aria-labelledby="module-groups-title">
        <h2 id="module-groups-title" className="sr-only">
          Module 3 groups
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {moduleThreeGroups.map((group) => {
            const card = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-teal text-sm font-bold">{group.sectionId}</span>
                  <StatusBadge tone={group.status === "available" ? "teal" : "neutral"}>
                    {group.status === "available" ? "Available" : "Planned"}
                  </StatusBadge>
                </div>
                <h3 className="mt-5 font-serif text-3xl font-semibold">{group.title}</h3>
                <p className="text-muted mt-3 leading-7">{group.description}</p>
              </>
            );
            return group.href ? (
              <Link
                key={group.sectionId}
                href={group.href}
                className="border-teal/30 rounded-3xl border bg-white p-7 no-underline shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
              >
                {card}
              </Link>
            ) : (
              <article
                key={group.sectionId}
                className="border-line rounded-3xl border bg-white/70 p-7"
              >
                {card}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
