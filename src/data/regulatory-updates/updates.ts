import { regulatoryUpdateCollectionSchema } from "@/lib/regulatory-updates/schema";

const LAST_VERIFIED_DATE = "2026-07-16";

const rawUpdates = [
  {
    slug: "ema-type-ii-variation-guidance-rev-118",
    agency: "EMA",
    jurisdiction: "European Union",
    title: "EMA Type II variation guidance updated in Rev. 118",
    updateType: "procedural_guidance",
    officialSourceStatus: "official",
    sourceDocumentStatus: "updated",
    editorialReviewStatus: "source_checked",
    qualifiedReviewRecord: null,
    sourceDate: {
      date: "2026-07-13",
      type: "last_updated",
      label: "Post-authorisation procedural advice last updated",
    },
    lastVerifiedDate: LAST_VERIFIED_DATE,
    source: {
      owner: "EMA",
      title: "Type-II variations: questions and answers",
      url: "https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/variations-including-extensions-marketing-authorisations/type-ii-variations-questions-answers",
      location: "Type II variations Q&A; question 7; Rev. 118 procedural advice",
      versionLabel: "EMEA-H-19984/03 Rev. 118",
    },
    summary:
      "EMA lists Rev. 118 of its post-authorisation procedural advice as last updated on 13 July 2026. The Type II Q&A includes a July 2026 revision to presentation of the application, including EU-CTD headings, the electronic application form, scope description, and procedure-number handling.",
    whyItMatters:
      "Teams preparing a Type II variation may need to compare current templates, cover-letter content, application-form scope, and dossier placement against the revised procedural advice.",
    impactClassification: "potentially_impacted",
    applicabilityBoundary:
      "Potential impact depends on whether the planned change is a Type II variation under the current framework and on the product-specific procedure. This record does not classify a proposed change.",
    topics: ["Lifecycle", "Type II variation", "EU-CTD", "eAF"],
    relatedRoutes: [
      { label: "Lifecycle Changes", href: "/lifecycle-changes" },
      { label: "CTD Workspace", href: "/submission-navigator/ctd" },
    ],
    verificationQuestions: [
      "Has the proposed change been classified under the current variations framework?",
      "Is the current eAF and current product-specific procedural advice being used?",
      "Does the scope description identify relationships to consequential variations?",
    ],
    recordVersion: "1.0.0",
  },
  {
    slug: "ema-grouping-variations-guidance-rev-118",
    agency: "EMA",
    jurisdiction: "European Union",
    title: "EMA grouping-of-variations guidance updated in Rev. 118",
    updateType: "procedural_guidance",
    officialSourceStatus: "official",
    sourceDocumentStatus: "updated",
    editorialReviewStatus: "source_checked",
    qualifiedReviewRecord: null,
    sourceDate: {
      date: "2026-07-13",
      type: "last_updated",
      label: "Post-authorisation procedural advice last updated",
    },
    lastVerifiedDate: LAST_VERIFIED_DATE,
    source: {
      owner: "EMA",
      title: "Grouping of variations: questions and answers",
      url: "https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/variations-including-extensions-marketing-authorisations/grouping-variations-questions-answers",
      location: "Grouping Q&A; Rev. 118 procedural advice; grouping examples",
      versionLabel: "EMEA-H-19984/03 Rev. 118",
    },
    summary:
      "EMA lists Rev. 118 of its post-authorisation procedural advice as last updated on 13 July 2026. The grouping Q&A explains that proposed changes should be consequential or related so simultaneous review is meaningful, and that convenience alone is not a sufficient basis for grouping.",
    whyItMatters:
      "Regulatory teams planning one submission for multiple changes may need to document the relationship between scopes and confirm whether prior agreement with EMA is needed.",
    impactClassification: "potentially_impacted",
    applicabilityBoundary:
      "Acceptability depends on the exact combination of changes, the legal grouping case, the product, and any prior agreement with EMA. This record does not determine that a group is acceptable.",
    topics: ["Lifecycle", "Grouping", "Variations", "Submission strategy"],
    relatedRoutes: [{ label: "Lifecycle Changes", href: "/lifecycle-changes" }],
    verificationQuestions: [
      "Are the proposed changes consequential or otherwise meaningfully related?",
      "Does the proposed group fall within an applicable grouping case?",
      "Is advance agreement with EMA required for the proposed combination?",
    ],
    recordVersion: "1.0.0",
  },
  {
    slug: "fda-antiviral-ngs-submission-final-guidance",
    agency: "FDA",
    jurisdiction: "United States",
    title: "FDA finalizes antiviral NGS submission technical specifications",
    updateType: "final_guidance",
    officialSourceStatus: "official",
    sourceDocumentStatus: "final",
    editorialReviewStatus: "source_checked",
    qualifiedReviewRecord: null,
    sourceDate: {
      date: "2026-07-01",
      type: "content_current",
      label: "FDA content current as of",
    },
    lastVerifiedDate: LAST_VERIFIED_DATE,
    source: {
      owner: "FDA",
      title: "Submitting Next-Generation Sequencing Data to the Division of Antiviral Products",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/submitting-next-generation-sequencing-data-division-antiviral-products",
      location: "Guidance page; purpose statement; Final Level 2 Guidance",
      versionLabel: "Final Level 2 Guidance, July 2026",
    },
    summary:
      "FDA issued final technical specifications describing the Division of Antivirals' current thinking on submission of NGS protocols, data, and analyses used to support resistance assessments in antiviral drug development.",
    whyItMatters:
      "Antiviral development teams submitting NGS resistance data may need to align data packaging, analysis documentation, and submission preparation with the final technical specifications.",
    impactClassification: "conditional",
    applicabilityBoundary:
      "This update is relevant when an antiviral development program submits NGS information to FDA's Division of Antivirals. It is not a general NGS requirement for every drug submission.",
    topics: ["Clinical data", "Antiviral", "NGS", "Technical specifications"],
    relatedRoutes: [
      { label: "Application Preparation", href: "/applications" },
      { label: "CTD Workspace", href: "/submission-navigator/ctd" },
    ],
    verificationQuestions: [
      "Is the submission handled by FDA's Division of Antivirals?",
      "Will NGS data support a resistance assessment?",
      "Have the final guidance document and current technical specifications been reviewed directly?",
    ],
    recordVersion: "1.0.0",
  },
  {
    slug: "ema-procedural-timetables-july-2026",
    agency: "EMA",
    jurisdiction: "European Union",
    title: "EMA refreshes multiple procedural timetable files",
    updateType: "procedural_timetable",
    officialSourceStatus: "official",
    sourceDocumentStatus: "updated",
    editorialReviewStatus: "source_checked",
    qualifiedReviewRecord: null,
    sourceDate: {
      date: "2026-07-01",
      type: "last_updated",
      label: "Latest timetable updates shown on source page",
    },
    lastVerifiedDate: LAST_VERIFIED_DATE,
    source: {
      owner: "EMA",
      title: "Procedural timetables",
      url: "https://www.ema.europa.eu/en/human-regulatory-overview/marketing-authorisation/submission-dates/procedural-timetables",
      location:
        "Initial applications, variations, renewals, pharmacovigilance, and ATMP timetables",
      versionLabel: "Procedural timetable register verified 2026-07-16",
    },
    summary:
      "EMA's official timetable register shows multiple files updated during June and July 2026, including Type II and worksharing timetables and July updates for Type IB linguistic review, PSUR/PSUSA, and PASS procedures.",
    whyItMatters:
      "Teams using a saved timetable may need to retrieve the current file for the exact procedure before locking a submission or response plan.",
    impactClassification: "potentially_impacted",
    applicabilityBoundary:
      "The relevant timetable depends on the exact procedure, assessment route, product, and submission scenario. This record does not calculate a regulatory deadline.",
    topics: ["Submission planning", "Timetables", "Variations", "Pharmacovigilance"],
    relatedRoutes: [
      { label: "Application Preparation", href: "/applications" },
      { label: "Lifecycle Changes", href: "/lifecycle-changes" },
    ],
    verificationQuestions: [
      "Which exact EMA procedure and timetable applies?",
      "Has the current file been downloaded from the official register?",
      "Have product-specific correspondence and start dates been reconciled with the generic timetable?",
    ],
    recordVersion: "1.0.0",
  },
  {
    slug: "fda-master-protocols-draft-guidance-2026",
    agency: "FDA",
    jurisdiction: "United States",
    title: "FDA issues draft master-protocol guidance for comment",
    updateType: "draft_guidance",
    officialSourceStatus: "official",
    sourceDocumentStatus: "draft",
    editorialReviewStatus: "source_checked",
    qualifiedReviewRecord: null,
    sourceDate: {
      date: "2026-06-25",
      type: "content_current",
      label: "FDA content current as of",
    },
    commentDeadline: "2026-08-24",
    lastVerifiedDate: LAST_VERIFIED_DATE,
    source: {
      owner: "FDA",
      title: "Master Protocols for Drug and Biological Product Development",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/master-protocols-drug-and-biological-product-development",
      location: "Guidance page; draft status; summary; comment deadline",
      versionLabel: "Draft Guidance, June 2026",
    },
    summary:
      "FDA published draft guidance with recommendations on design and analysis of trials conducted under a master protocol and on documentation submitted to support regulatory review. FDA labels it draft, not for implementation, and distributed for comment.",
    whyItMatters:
      "Sponsors using or planning a master protocol may want to compare protocol, statistical, operational, and submission-documentation assumptions with the draft and decide whether to comment.",
    impactClassification: "potentially_impacted",
    applicabilityBoundary:
      "This is draft guidance and is not for implementation. Relevance depends on whether the development program uses a master protocol and on the final guidance outcome.",
    topics: ["Clinical development", "Master protocol", "Draft guidance", "Comment period"],
    relatedRoutes: [{ label: "Application Preparation", href: "/applications" }],
    verificationQuestions: [
      "Does the development program use a master protocol?",
      "Has the draft status been preserved in internal interpretation?",
      "Is stakeholder comment appropriate before the official deadline?",
    ],
    recordVersion: "1.0.0",
  },
  {
    slug: "fda-substantial-evidence-effectiveness-draft-2026",
    agency: "FDA",
    jurisdiction: "United States",
    title: "FDA reissues draft guidance on substantial evidence of effectiveness",
    updateType: "draft_guidance",
    officialSourceStatus: "official",
    sourceDocumentStatus: "draft",
    editorialReviewStatus: "source_checked",
    qualifiedReviewRecord: null,
    sourceDate: {
      date: "2026-06-25",
      type: "content_current",
      label: "FDA content current as of",
    },
    commentDeadline: "2026-09-22",
    lastVerifiedDate: LAST_VERIFIED_DATE,
    source: {
      owner: "FDA",
      title:
        "Demonstrating Substantial Evidence of Effectiveness for Human Drug and Biological Products",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/demonstrating-substantial-evidence-effectiveness-human-drug-and-biological-products",
      location: "Guidance page; revised draft summary; comment deadline",
      versionLabel: "Draft Level 1 Guidance, June 2026",
    },
    summary:
      "FDA revised and reissued draft guidance discussing factors that affect the strength of effectiveness evidence and how one adequate and well-controlled investigation with confirmatory evidence may satisfy the substantial-evidence standard. FDA labels it draft and not for implementation.",
    whyItMatters:
      "Clinical and regulatory strategy teams may need to assess whether the revised draft changes assumptions about evidence packages and whether comments should be submitted.",
    impactClassification: "potentially_impacted",
    applicabilityBoundary:
      "This is draft guidance. The evidentiary strategy remains product- and program-specific and should not be changed solely from this editorial summary.",
    topics: ["Clinical evidence", "Effectiveness", "Draft guidance", "Comment period"],
    relatedRoutes: [{ label: "Application Preparation", href: "/applications" }],
    verificationQuestions: [
      "Which effectiveness-evidence pathway is being considered for the program?",
      "Has the revised draft been compared with the prior program strategy and source materials?",
      "Is stakeholder comment appropriate before the official deadline?",
    ],
    recordVersion: "1.0.0",
  },
  {
    slug: "fda-immunogenicity-pk-dataset-final-guidance",
    agency: "FDA",
    jurisdiction: "United States",
    title: "FDA finalizes immunogenicity–pharmacokinetics dataset specifications",
    updateType: "final_guidance",
    officialSourceStatus: "official",
    sourceDocumentStatus: "final",
    editorialReviewStatus: "source_checked",
    qualifiedReviewRecord: null,
    sourceDate: {
      date: "2026-06-17",
      type: "content_current",
      label: "FDA content current as of",
    },
    lastVerifiedDate: LAST_VERIFIED_DATE,
    source: {
      owner: "FDA",
      title:
        "Submitting Clinical Trial Datasets to Evaluate the Impact of Immunogenicity on the Pharmacokinetics of a Drug",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/submitting-clinical-trial-datasets-evaluate-impact-immunogenicity-pharmacokinetics-drug",
      location: "Guidance page; Final Level 2 Guidance",
      versionLabel: "Final Level 2 Guidance, June 2026",
    },
    summary:
      "FDA issued final Level 2 guidance on submitting clinical trial datasets used to evaluate the impact of immunogenicity on a drug's pharmacokinetics. FDA describes the document as current thinking and non-binding guidance.",
    whyItMatters:
      "Programs evaluating immunogenicity effects on pharmacokinetics may need to align dataset preparation and submission specifications with the final document.",
    impactClassification: "conditional",
    applicabilityBoundary:
      "Relevance depends on the product, immunogenicity assessment, pharmacokinetic analysis, and planned FDA data submission. The guidance is not a universal dataset requirement for every application.",
    topics: ["Clinical data", "Immunogenicity", "Pharmacokinetics", "Technical specifications"],
    relatedRoutes: [{ label: "Application Preparation", href: "/applications" }],
    verificationQuestions: [
      "Does the program evaluate immunogenicity impact on pharmacokinetics?",
      "Which datasets and analysis outputs are planned for submission?",
      "Has the final guidance document been reviewed by the relevant data and clinical pharmacology owners?",
    ],
    recordVersion: "1.0.0",
  },
  {
    slug: "ema-revised-variations-framework-2026",
    agency: "EMA",
    jurisdiction: "European Union",
    title: "Revised EU variations guidelines apply from 15 January 2026",
    updateType: "regulatory_framework",
    officialSourceStatus: "official",
    sourceDocumentStatus: "effective",
    editorialReviewStatus: "source_checked",
    qualifiedReviewRecord: null,
    sourceDate: {
      date: "2026-01-15",
      type: "effective_date",
      label: "New variations guidelines apply from",
    },
    lastVerifiedDate: LAST_VERIFIED_DATE,
    source: {
      owner: "EMA",
      title: "Guidance on the application of the revised variations framework",
      url: "https://www.ema.europa.eu/en/guidance-application-revised-variations-framework",
      location: "Implementation of the variations framework; legal framework",
      versionLabel: "Revised framework guidance verified 2026-07-16",
    },
    summary:
      "EMA states that the new European Commission variations guidelines apply from 15 January 2026. Its transition guidance distinguishes Type IA implementation timing from submission timing for Type IB and Type II variations and points applicants to updated categories and electronic application forms.",
    whyItMatters:
      "Marketing authorisation holders should ensure current classification, forms, procedures, and internal lifecycle processes align with the revised framework for applicable changes.",
    impactClassification: "conditional",
    applicabilityBoundary:
      "Application depends on the variation type, implementation or submission date, authorisation route, and product-specific facts. In case of doubt, EMA directs stakeholders to contact EMA or the relevant national authority.",
    topics: ["Lifecycle", "Variations framework", "eAF", "Implementation"],
    relatedRoutes: [{ label: "Lifecycle Changes", href: "/lifecycle-changes" }],
    verificationQuestions: [
      "Which variation type and authorisation route apply?",
      "When was or will the change be implemented and submitted?",
      "Are the current classification category, eAF, and procedural guidance being used?",
    ],
    recordVersion: "1.0.0",
  },
] as const;

export const regulatoryUpdates = regulatoryUpdateCollectionSchema
  .parse(rawUpdates)
  .sort(
    (left, right) =>
      right.sourceDate.date.localeCompare(left.sourceDate.date) ||
      left.title.localeCompare(right.title),
  );

export function getRegulatoryUpdate(slug: string) {
  return regulatoryUpdates.find((record) => record.slug === slug);
}
