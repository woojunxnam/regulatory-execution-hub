import { StatusBadge } from "@/components/ctd/status-badge";
import { readinessLabels } from "@/lib/ctd/presentation";
import type { ReadinessResult } from "@/lib/ctd/readiness";

function readinessTone(state: ReadinessResult["state"]) {
  if (state === "not_ready") return "rose" as const;
  if (state === "ready_for_initial_drafting") return "gold" as const;
  if (state === "ready_for_final_authoring") return "blue" as const;
  return "teal" as const;
}

export function ReadinessPanel({ result }: { result: ReadinessResult }) {
  return (
    <section
      aria-labelledby="readiness-title"
      className="print-break-avoid border-line rounded-3xl border bg-white p-6 shadow-[var(--shadow-soft)] md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-muted text-xs font-bold tracking-[0.16em] uppercase">
            Deterministic result
          </p>
          <h2 id="readiness-title" className="mt-1 font-serif text-2xl font-semibold">
            Authoring readiness
          </h2>
        </div>
        <StatusBadge tone={readinessTone(result.state)}>
          {readinessLabels[result.state]}
        </StatusBadge>
      </div>
      <p className="text-muted mt-5 leading-7">{result.reasons[0]}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-rose text-sm font-bold tracking-[0.08em] uppercase">
            Blockers to next state
          </h3>
          {result.blockers.length ? (
            <ul className="text-muted mt-3 space-y-2 text-sm leading-6">
              {result.blockers.map((blocker) => (
                <li key={blocker} className="flex gap-2">
                  <span aria-hidden="true" className="text-rose">
                    ●
                  </span>
                  {blocker}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted mt-3 text-sm">No structured blocker is recorded.</p>
          )}
        </div>
        <div>
          <h3 className="text-teal text-sm font-bold tracking-[0.08em] uppercase">Next actions</h3>
          <ol className="text-muted mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
            {result.nextActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </div>
      </div>
      {result.warnings.length ? (
        <div className="bg-gold-soft mt-6 rounded-xl p-4">
          <h3 className="text-sm font-bold tracking-[0.08em] text-[#74440f] uppercase">Warnings</h3>
          <ul className="text-muted mt-2 space-y-1 text-sm leading-6">
            {result.warnings.map((warning) => (
              <li key={warning}>• {warning}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="border-line text-muted mt-6 border-t pt-4 text-xs leading-5">
        This state is calculated from visible demonstration fields. It is not an agency completeness
        or filing decision and is not produced by an LLM.
      </p>
    </section>
  );
}
