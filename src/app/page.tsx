import Link from "next/link";
import { StatusBadge } from "@/components/ctd/status-badge";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="mx-auto grid min-h-[72vh] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="teal">Official-source first</StatusBadge>
            <StatusBadge tone="gold">Editorial prototype</StatusBadge>
          </div>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-7xl">
            From regulation to execution.
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-xl leading-8">
            A traceable authoring-support environment for understanding what belongs in a CTD
            section, which sources support it, and what blocks the next readiness state.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/submission-navigator/ctd"
              className="bg-teal hover:bg-teal-dark rounded-xl px-5 py-3.5 font-bold text-white no-underline"
            >
              Open CTD Builder
            </Link>
            <Link
              href="/methodology"
              className="border-teal text-teal hover:bg-sage rounded-xl border bg-white px-5 py-3.5 font-bold no-underline"
            >
              Review methodology
            </Link>
          </div>
        </div>
        <aside className="border-line rounded-[2rem] border bg-white p-7 shadow-[var(--shadow-soft)] md:p-9">
          <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">
            First vertical slice
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold">
            3.2.P.5 Control of Drug Product
          </h2>
          <ol className="text-muted mt-6 space-y-4 text-sm leading-6">
            {[
              "Understand section purpose and boundaries",
              "Map controlled sources to CTD subsections",
              "Expose missing, draft, and superseded evidence",
              "Calculate readiness with visible deterministic rules",
              "Export a non-confidential authoring packet",
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="bg-sage text-teal grid size-7 shrink-0 place-items-center rounded-full font-bold">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="border-line text-muted mt-7 border-t pt-5 text-xs leading-5">
            No login, upload, patient data, proprietary dossier content, or final regulatory
            determination.
          </p>
        </aside>
      </section>
    </main>
  );
}
