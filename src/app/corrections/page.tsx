import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { CORRECTIONS_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corrections and Content Feedback",
  description:
    "Public process for reporting source, interpretation, status, date, broken-link, and accessibility issues.",
  alternates: { canonical: "/corrections" },
};

const reportDetails = [
  "The exact page URL and section or claim",
  "The issue type: source, interpretation, classification, status, date, broken link, or accessibility",
  "A direct official source URL and location when available",
  "Why the current content may be incomplete, outdated, or incorrect",
  "No patient, personal, product-confidential, or proprietary dossier information",
];

export default function CorrectionsPage() {
  return (
    <main id="main-content" className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "Corrections" }]} />
      <PageIntro
        eyebrow="Accountability"
        title="Corrections and content feedback"
        summary="Report a potentially incorrect source, interpretation, classification, status, date, broken link, or accessibility problem through the public project issue tracker."
      />

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-teal text-xs font-bold tracking-[0.15em] uppercase">What to include</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">Make the issue reproducible.</h2>
          <p className="text-muted mt-4 leading-7">
            A correction is easier to evaluate when it points to the exact public claim and the
            controlling evidence. Do not use the public tracker for confidential consultation.
          </p>
        </div>
        <ol className="grid gap-3">
          {reportDetails.map((detail, index) => (
            <li
              key={detail}
              className="border-line grid grid-cols-[2rem_1fr] gap-3 rounded-2xl border bg-white p-5 text-sm leading-6"
            >
              <span className="text-teal font-bold">{index + 1}</span>
              <span>{detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-teal-dark mt-12 rounded-3xl p-7 text-white md:p-9">
        <p className="text-xs font-bold tracking-[0.15em] text-[#add0c4] uppercase">
          Public channel
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold">Open a project issue</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#cfddda]">
          Reports submitted to GitHub may be publicly visible. Remove confidential information
          before submitting. The current prototype does not offer a private regulatory support or
          incident-reporting channel.
        </p>
        <a
          className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0d4a4d] no-underline"
          href={CORRECTIONS_URL}
          rel="noreferrer"
          target="_blank"
        >
          Open GitHub issue
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>

      <section className="border-line mt-10 border-t pt-8">
        <h2 className="font-serif text-2xl font-semibold">How reports should be handled</h2>
        <p className="text-muted mt-3 leading-7">
          A maintainer should verify the report against the cited official material, assess the
          stated scope, record the decision, update affected metadata or content, and preserve an
          appropriate public change history. No response-time commitment is offered for the current
          unstaffed prototype.
        </p>
      </section>
    </main>
  );
}
