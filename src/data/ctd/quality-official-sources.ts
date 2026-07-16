import type { RegulatoryCitation } from "@/lib/ctd/schema";

export function createQualityOfficialSources({
  m4qLocation,
  qnaLocation,
}: {
  m4qLocation: string;
  qnaLocation: string;
}): RegulatoryCitation[] {
  return [
    {
      id: "ich-m4q-r1",
      owner: "ICH",
      title: "M4Q(R1): The Common Technical Document — Quality",
      sourceStatus: "final",
      sectionOrPage: m4qLocation,
      officialUrl: "https://database.ich.org/sites/default/files/M4Q_R1_Guideline.pdf",
      lastVerifiedDate: "2026-07-13",
      editorialReviewStatus: "source_checked",
      note: "Current structure used by this prototype; source wording is summarized, not reproduced.",
      versionHistory: [
        {
          versionLabel: "M4Q(R1)",
          sourceStatus: "final",
          verifiedDate: "2026-07-13",
          note: "Current source version used for the section structure.",
        },
      ],
    },
    {
      id: "ich-m4q-qa",
      owner: "ICH",
      title: "CTD-Q Questions & Answers: Location Issues",
      sourceStatus: "final",
      sectionOrPage: qnaLocation,
      officialUrl: "https://database.ich.org/sites/default/files/M4Q_Q%26As_R1_Q%26As.pdf",
      lastVerifiedDate: "2026-07-13",
      editorialReviewStatus: "source_checked",
      note: "Used only for applicable section-placement and cross-reference clarifications.",
      versionHistory: [
        {
          versionLabel: "M4Q(R1) Questions & Answers",
          sourceStatus: "final",
          verifiedDate: "2026-07-13",
          note: "Current source version used for location clarifications.",
        },
      ],
    },
    {
      id: "ema-m4q-step5",
      owner: "EMA",
      title: "ICH M4Q Quality — Step 5",
      sourceStatus: "effective",
      publicationDate: "2003-07-01",
      effectiveDate: "2003-07-01",
      sectionOrPage: "Current effective version and scope statement",
      officialUrl:
        "https://www.ema.europa.eu/en/ich-m-4-q-common-technical-document-registration-pharmaceuticals-human-use-quality-scientific-guideline",
      lastVerifiedDate: "2026-07-13",
      editorialReviewStatus: "source_checked",
      note: "EMA status context; applicable regional and product-specific sources must also be assessed.",
      versionHistory: [
        {
          versionLabel: "EMA Step 5 page snapshot 2026-07-13",
          sourceStatus: "effective",
          verifiedDate: "2026-07-13",
          note: "Web source state recorded at the last source check.",
        },
      ],
    },
    {
      id: "fda-ectd",
      owner: "FDA",
      title: "Electronic Common Technical Document (eCTD)",
      sourceStatus: "effective",
      sectionOrPage: "Current versions and submission-format overview",
      officialUrl:
        "https://www.fda.gov/drugs/electronic-regulatory-submission-and-review/electronic-common-technical-document-ectd",
      lastVerifiedDate: "2026-07-13",
      editorialReviewStatus: "source_checked",
      note: "Technical format context only; not used to infer product-specific evidence requirements.",
      versionHistory: [
        {
          versionLabel: "FDA eCTD page snapshot 2026-07-13",
          sourceStatus: "effective",
          verifiedDate: "2026-07-13",
          note: "Web source state recorded at the last source check.",
        },
      ],
    },
    {
      id: "fda-m4q-r2-draft",
      owner: "FDA",
      title: "M4Q(R2) draft guidance",
      sourceStatus: "draft",
      sectionOrPage: "Draft status notice",
      officialUrl:
        "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/m4qr2-common-technical-document-registration-pharmaceuticals-human-use-quality",
      lastVerifiedDate: "2026-07-13",
      editorialReviewStatus: "source_checked",
      note: "Future-readiness reference only; it is not used as current implementation content.",
      versionHistory: [
        {
          versionLabel: "FDA draft guidance page snapshot 2026-07-13",
          sourceStatus: "draft",
          verifiedDate: "2026-07-13",
          note: "Draft status recorded separately from current M4Q(R1) implementation content.",
        },
      ],
    },
  ];
}
