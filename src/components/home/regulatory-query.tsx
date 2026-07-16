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
      <div className="border-line border-b px-5 py-4 sm:px-6">
        <p className="text-ink text-sm font-bold">Find a page by task</p>
        <p className="text-muted mt-1 text-xs">
          Guided site search — no generated regulatory answer. Nothing you type is stored or sent.
        </p>
      </div>

      <form className="p-5 sm:p-6" onSubmit={handleSubmit} noValidate>
        <label htmlFor="regulatory-query" className="text-ink block text-sm font-bold">
          What do you need to prepare or verify?
        </label>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="search"
            id="regulatory-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Example: sources for 3.2.P.5 or Quality Overall Summary"
            aria-describedby="regulatory-query-help regulatory-query-error"
            className="border-line focus:border-teal focus:ring-teal/15 text-ink placeholder:text-muted/65 min-w-0 flex-1 rounded-xl border bg-white px-4 py-3 text-sm transition outline-none focus:ring-4"
          />
          <button
            type="submit"
            className="bg-teal hover:bg-teal-dark inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition"
          >
            <SearchIcon />
            Find a page
          </button>
        </div>
        <p id="regulatory-query-help" className="text-muted mt-2 text-xs leading-5">
          Do not enter confidential, patient, or proprietary dossier information.
        </p>
        <p
          id="regulatory-query-error"
          role={error ? "alert" : undefined}
          className="text-rose mt-2 min-h-5 text-xs font-semibold"
        >
          {error}
        </p>

        <div className="mt-3">
          <p className="text-muted text-xs font-bold tracking-[0.12em] uppercase">Try an example</p>
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

      <div data-testid="query-results" aria-live="polite">
        {matches ? (
          <div className="border-line border-t bg-[#eef3ee] px-5 py-5 sm:px-6">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-teal text-xs font-bold tracking-[0.13em] uppercase">
                    Matching resources
                  </p>
                  <h2 className="text-ink mt-1 font-serif text-xl font-semibold">
                    Available regulatory paths
                  </h2>
                </div>
                <p className="text-muted max-w-xs text-xs leading-5">
                  Guided navigation only — no generated regulatory advice.
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
          </div>
        ) : null}
      </div>
    </div>
  );
}
