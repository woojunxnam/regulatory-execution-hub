import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { CONTENT_LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Current data-handling boundaries for the public Regulatory Execution Hub prototype.",
  alternates: { canonical: "/privacy" },
};

const dataPractices = [
  {
    title: "No account or dossier upload",
    body: "The current public prototype has no user accounts, product workspace, submission upload, patient-data workflow, or proprietary dossier repository.",
  },
  {
    title: "Home query stays in the browser",
    body: "The current guided query is matched in the browser against a fixed navigation index. The application does not intentionally send or persist the typed query, and it does not send it to an external LLM.",
  },
  {
    title: "Standard infrastructure processing",
    body: "Hosting and network providers may process standard request, security, device, and network information under their own policies. Page requests do not need to include the Home query text because it is not placed in the URL.",
  },
  {
    title: "External official-source links",
    body: "Following an external link leaves this site. The destination agency or institution applies its own privacy, cookie, accessibility, and recordkeeping practices.",
  },
];

export default function PrivacyPage() {
  return (
    <main id="main-content" className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "Privacy" }]} />
      <PageIntro
        eyebrow="Data boundary"
        title="Privacy for the current public prototype"
        summary="This page describes the application behavior currently implemented. It is not a promise about planned account, analytics, monitoring, or collaboration features that have not been built."
        aside={
          <div className="border-line rounded-2xl border bg-white p-5 text-sm">
            <p className="font-bold">Last updated</p>
            <p className="text-muted mt-2">
              <time dateTime={CONTENT_LAST_UPDATED}>{CONTENT_LAST_UPDATED}</time>
            </p>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {dataPractices.map((practice) => (
          <section key={practice.title} className="border-line rounded-2xl border bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold">{practice.title}</h2>
            <p className="text-muted mt-3 text-sm leading-6">{practice.body}</p>
          </section>
        ))}
      </div>

      <section className="border-rose/20 bg-rose-soft mt-10 rounded-3xl border p-7 md:p-9">
        <h2 className="font-serif text-2xl font-semibold">Do not enter confidential information</h2>
        <p className="text-muted mt-3 leading-7">
          Do not enter patient data, personal data, trade secrets, proprietary product strategy,
          unpublished dossier content, credentials, or other confidential information. The query box
          is a navigation aid, not a secure regulatory workspace.
        </p>
      </section>

      <section className="border-line mt-10 border-t pt-8">
        <h2 className="font-serif text-2xl font-semibold">Before adding new data features</h2>
        <p className="text-muted mt-3 leading-7">
          Accounts, analytics, saved workspaces, monitoring subscriptions, or AI services will
          require an updated privacy notice, purpose and retention decisions, vendor review,
          security controls, and any required consent or legal review before public activation.
        </p>
      </section>
    </main>
  );
}
