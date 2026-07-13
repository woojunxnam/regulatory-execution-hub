import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  summary,
  aside,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  aside?: ReactNode;
}) {
  return (
    <section className="border-line mb-12 grid gap-8 border-b pb-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
      <div>
        <p className="text-teal mb-3 text-xs font-bold tracking-[0.18em] uppercase">{eyebrow}</p>
        <h1 className="text-ink max-w-4xl font-serif text-4xl leading-[1.08] font-semibold tracking-[-0.025em] md:text-6xl">
          {title}
        </h1>
        <p className="text-muted mt-5 max-w-3xl text-lg leading-8">{summary}</p>
      </div>
      {aside ? <aside>{aside}</aside> : null}
    </section>
  );
}
