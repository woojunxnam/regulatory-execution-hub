"use client";

import { useId, useState, type ReactNode } from "react";

export function DisclosureGroup({
  title,
  summary,
  children,
  defaultOpen = false,
}: {
  title: string;
  summary?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className="print-break-avoid border-line overflow-hidden rounded-2xl border bg-white shadow-sm">
      <h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left hover:bg-[#f6f8f5] md:px-6"
        >
          <span>
            <span className="text-ink block font-serif text-xl font-semibold">{title}</span>
            {summary ? (
              <span className="text-muted mt-1 block text-sm leading-6 font-normal">{summary}</span>
            ) : null}
          </span>
          <span
            aria-hidden="true"
            className={`bg-sage text-teal mt-1 grid size-7 shrink-0 place-items-center rounded-full text-lg font-bold transition-transform ${open ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
      </h2>
      <div id={contentId} hidden={!open} className="border-line border-t px-5 py-6 md:px-6">
        {children}
      </div>
    </section>
  );
}
