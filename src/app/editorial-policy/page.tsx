import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ctd/breadcrumbs";
import { PageIntro } from "@/components/ctd/page-intro";
import { CONTENT_LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "Source hierarchy, classification language, review status, correction handling, and AI boundaries for Regulatory Execution Hub.",
  alternates: { canonical: "/editorial-policy" },
};

const classifications = [
  ["Required", "An official source establishes an obligation within the stated scope."],
  [
    "Conditional",
    "The item applies only when stated facts, procedure, product, or change conditions are met.",
  ],
  [
    "Recommended",
    "An official source recommends the item but does not establish it as universally required.",
  ],
  [
    "Potentially impacted",
    "The item needs assessment; the available facts do not establish final applicability.",
  ],
  [
    "Best practice",
    "An editorial execution practice, clearly separated from an agency requirement.",
  ],
  ["Undetermined", "The available facts or evidence are insufficient to classify the item."],
];

const policySections = [
  {
    title: "Source hierarchy",
    body: "Primary official materials from the relevant regulator, institution, or standards body control the published regulatory basis. Secondary sources may support discovery or context, but do not establish a requirement in this product.",
  },
  {
    title: "Record-level evidence",
    body: "Regulatory records must expose official-source status, editorial-review status, and a last-verification date. A direct source location is retained when available so readers can inspect the controlling material.",
  },
  {
    title: "Qualified human review",
    body: "Content is not labeled human-reviewed without a review record. Source verification and qualified editorial review are separate states; verifying a link does not approve the editorial interpretation.",
  },
  {
    title: "Versioning and corrections",
    body: "Material content changes should update version or verification metadata. Reported issues are evaluated against the cited official source and the stated scope; visible corrections should not erase relevant history.",
  },
  {
    title: "AI and automation boundary",
    body: "The current Home query is a browser-side deterministic router, not an LLM answer. Deterministic readiness rules are visible and tested. Future generated explanations must preserve citation traceability, uncertainty, and human-review boundaries.",
  },
  {
    title: "Conflict and independence",
    body: "The product is independent and is not affiliated with FDA, EMA, the European Commission, or ICH. Sponsorship or commercial relationships, if introduced, must not silently change source selection or classification.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
      <Breadcrumbs items={[{ label: "Editorial Policy" }]} />
      <PageIntro
        eyebrow="Content governance"
        title="Editorial policy"
        summary="The rules used to separate official evidence, editorial interpretation, applicability uncertainty, automation, and qualified human review."
        aside={
          <div className="border-line rounded-2xl border bg-white p-5 text-sm">
            <p className="text-ink font-bold">Policy metadata</p>
            <p className="text-muted mt-2 leading-6">
              Current version: 1.0
              <br />
              Last updated: <time dateTime={CONTENT_LAST_UPDATED}>{CONTENT_LAST_UPDATED}</time>
            </p>
          </div>
        }
      />

      <section aria-labelledby="policy-principles-title">
        <h2 id="policy-principles-title" className="font-serif text-3xl font-semibold">
          Publication principles
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {policySections.map((section) => (
            <article key={section.title} className="border-line rounded-2xl border bg-white p-6">
              <h3 className="font-serif text-2xl font-semibold">{section.title}</h3>
              <p className="text-muted mt-3 text-sm leading-6">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="classification-title" className="mt-12">
        <p className="text-teal text-xs font-bold tracking-[0.15em] uppercase">
          Controlled language
        </p>
        <h2 id="classification-title" className="mt-2 font-serif text-3xl font-semibold">
          Classification meanings inside this product
        </h2>
        <p className="text-muted mt-4 max-w-3xl leading-7">
          These labels describe the editorial evidence state within the stated scope. They do not
          replace the wording of the controlling official source or a product-specific assessment.
        </p>
        <dl className="border-line mt-6 overflow-hidden rounded-2xl border bg-white">
          {classifications.map(([term, definition]) => (
            <div
              key={term}
              className="border-line grid gap-2 border-b p-5 last:border-b-0 md:grid-cols-[12rem_1fr]"
            >
              <dt className="font-bold">{term}</dt>
              <dd className="text-muted text-sm leading-6">{definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-gold/25 bg-gold-soft mt-12 rounded-3xl border p-7 md:p-9">
        <h2 className="font-serif text-2xl font-semibold">Current editorial status</h2>
        <p className="text-muted mt-3 max-w-4xl leading-7">
          The live CTD foundation is an editorial draft with source-verification metadata. No
          qualified human review record is attached, so it is not labeled human-reviewed or a final
          regulatory conclusion.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold">
          <Link className="text-teal underline" href="/methodology">
            Review implementation methodology
          </Link>
          <Link className="text-teal underline" href="/corrections">
            Report a content issue
          </Link>
        </div>
      </section>
    </main>
  );
}
