import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { StatusBadge } from "@/components/ctd/status-badge";
import { drugProductSections } from "@/data/ctd/module-3-sections";

export const metadata: Metadata = {
  title: "Module 3 Drug Product",
};

export default function DrugProductIndexPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "CTD Builder", href: "/submission-navigator/ctd" },
          { label: "Module 3", href: "/submission-navigator/ctd/module-3" },
          { label: "Drug Product" },
        ]}
      />
      <PageIntro
        eyebrow="3.2.P"
        title="Drug Product section index"
        summary="A future-compatible section map for drug product composition, development, manufacture, control, packaging, and stability. Only 3.2.P.5 is fully implemented in this slice."
      />
      <section aria-labelledby="sections-title">
        <h2 id="sections-title" className="sr-only">
          Drug Product sections
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {drugProductSections.map((section) => {
            const card = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-teal font-mono text-sm font-bold">{section.sectionId}</span>
                  <StatusBadge tone={section.status === "available" ? "teal" : "neutral"}>
                    {section.status === "available" ? "Reference available" : "Planned"}
                  </StatusBadge>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{section.title}</h3>
                <p className="text-muted mt-2 text-sm leading-6">{section.description}</p>
              </>
            );
            return section.href ? (
              <Link
                key={section.sectionId}
                href={section.href}
                className="border-teal/30 rounded-2xl border bg-white p-6 no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {card}
              </Link>
            ) : (
              <article
                key={section.sectionId}
                className="border-line rounded-2xl border bg-white/70 p-6"
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
