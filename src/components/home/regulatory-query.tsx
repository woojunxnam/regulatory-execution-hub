"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { StatusBadge } from "@/components/ctd/status-badge";
import { exampleRegulatoryQueries } from "@/data/home/regulatory-pathways";
import {
  findRegulatoryPathways,
  type RegulatoryPathwayMatch,
} from "@/lib/navigation/regulatory-query";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current">
      <path d="M4 10h11M11 5l5 5-5 5" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current">
      <circle cx="11" cy="11" r="6.5" strokeWidth="1.8" />
      <path d="m16 16 4 4" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function RegulatoryQuery() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<RegulatoryPathwayMatch[] | null>(null);
  const [error, setError] = useState("");

  function runQuery(nextQuery: string) {
    const trimmedQuery = nextQuery.trim();
    setQuery(nextQuery);

    if (!trimmedQuery) {
      setMatches(null);
      setError("Enter a submission, CTD section, evidence gap, or regulatory task.");
      return;
    }

    setError("");
    setMatches(findRegulatoryPathways(trimmedQuery));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runQuery(query);
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/16 bg-[#f9fbf8] shadow-[0_30px_80px_rgb(0_0_0/22%)]">
      <div className="border-line flex items-center justify-between gap-4 border-b px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className="bg-teal absolute inline-flex size-full animate-ping rounded-full opacity-25 motion-reduce:animate-none" />
            <span className="bg-teal relative inline-flex size-2.5 rounded-full" />
          </span>
          <div>
            <p className="text-ink text-sm font-bold">Ask Regulatory Execution Hub</p>
            <p className="text-muted mt-0.5 text-xs">Deterministic guided search</p>
          </div>
        </div>
        <StatusBadge tone="teal">Browser-only</StatusBadge>
      </div>

      <form className="p-5 sm:p-6" onSubmit={handleSubmit} noValidate>
        <label htmlFor="regulatory-query" className="text-ink block text-sm font-bold">
          What are you preparing or trying to verify?
        </label>
        <div className="border-line focus-within:border-teal focus-within:ring-teal/15 mt-3 rounded-2xl border bg-white p-3 shadow-sm transition focus-within:ring-4">
          <textarea
            id="regulatory-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Example: What sources support 3.2.P.5?"
            aria-describedby="regulatory-query-help regulatory-query-error"
            rows={3}
            className="text-ink placeholder:text-muted/65 block w-full resize-none border-0 bg-transparent px-1 py-1 text-base leading-7 outline-none"
          />
          <div className="mt-2 flex flex-col-reverse gap-3 border-t border-[#e9ede9] pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p id="regulatory-query-help" className="text-muted text-xs leading-5">
              Do not enter confidential, patient, or proprietary dossier information.
            </p>
            <button
              type="submit"
              className="bg-teal hover:bg-teal-dark inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition"
            >
              <SearchIcon />
              Find execution path
            </button>
          </div>
        </div>
        <p
          id="regulatory-query-error"
          role={error ? "alert" : undefined}
          className="text-rose mt-2 min-h-5 text-xs font-semibold"
        >
          {error}
        </p>

        <div className="mt-3">
          <p className="text-muted text-xs font-bold tracking-[0.12em] uppercase">Try a prompt</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {exampleRegulatoryQueries.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => runQuery(example)}
                className="border-line text-muted hover:border-teal/50 hover:text-teal rounded-full border bg-white px-3 py-2 text-left text-xs font-semibold transition"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>

      <div
        data-testid="query-results"
        aria-live="polite"
        className="border-line border-t bg-[#eef3ee] px-5 py-5 sm:px-6"
      >
        {matches ? (
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-teal text-xs font-bold tracking-[0.13em] uppercase">
                  Guided result
                </p>
                <h2 className="text-ink mt-1 font-serif text-xl font-semibold">
                  Best matching execution paths
                </h2>
              </div>
              <p className="text-muted max-w-xs text-xs leading-5">
                Navigation result only — not a generated regulatory answer or determination.
              </p>
            </div>
            <div className="mt-4 grid gap-3">
              {matches.map(({ pathway }) => {
                const content = (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-muted text-[0.68rem] font-bold tracking-[0.12em] uppercase">
                        {pathway.category}
                      </p>
                      <StatusBadge tone={pathway.status === "available" ? "teal" : "gold"}>
                        {pathway.status === "available" ? "Available" : "Planned"}
                      </StatusBadge>
                    </div>
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-ink font-semibold">{pathway.title}</h3>
                        <p className="text-muted mt-1 text-xs leading-5">{pathway.description}</p>
                      </div>
                      {pathway.status === "available" && pathway.href ? (
                        <span
                          aria-hidden="true"
                          className="bg-sage text-teal grid size-8 shrink-0 place-items-center rounded-full"
                        >
                          <ArrowIcon />
                        </span>
                      ) : null}
                    </div>
                  </>
                );

                return pathway.status === "available" && pathway.href ? (
                  <Link
                    key={pathway.id}
                    href={pathway.href}
                    aria-label={`Open ${pathway.title}`}
                    className="border-line hover:border-teal/40 rounded-xl border bg-white p-4 no-underline transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    {content}
                  </Link>
                ) : (
                  <article
                    key={pathway.id}
                    className="border-gold/20 rounded-xl border bg-[#fffaf1] p-4"
                  >
                    {content}
                    {pathway.href ? (
                      <Link
                        href={pathway.href}
                        aria-label={`View planned coverage for ${pathway.title}`}
                        className="text-teal mt-3 inline-flex items-center gap-2 text-xs font-bold underline"
                      >
                        View planned coverage
                        <ArrowIcon />
                      </Link>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
            <div
              aria-hidden="true"
              className="border-teal/20 bg-sage text-teal grid size-11 place-items-center rounded-xl border"
            >
              <SearchIcon />
            </div>
            <div>
              <p className="text-ink text-sm font-bold">Search the live scope and roadmap</p>
              <p className="text-muted mt-1 text-xs leading-5">
                Available pages open directly. Unreleased FDA, EMA, lifecycle, and update support is
                labelled Planned instead of producing a made-up answer.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
