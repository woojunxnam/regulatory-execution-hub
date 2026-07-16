import { createQualityOfficialSources } from "@/data/ctd/quality-official-sources";
import { ctdSectionSchema } from "@/lib/ctd/schema";
import type { z } from "zod";

type CtdSectionInput = z.input<typeof ctdSectionSchema>;

type EditorialQualitySectionInput = Omit<
  CtdSectionInput,
  | "officialSources"
  | "sourceStatus"
  | "lastVerifiedDate"
  | "contentVersion"
  | "editorialReviewStatus"
  | "reviewRecords"
  | "contentHistory"
> & {
  m4qLocation: string;
  qnaLocation: string;
  changeSummary: string;
};

export function createEditorialQualitySection(input: EditorialQualitySectionInput) {
  const { changeSummary, m4qLocation, qnaLocation, ...section } = input;
  const officialSources = createQualityOfficialSources({ m4qLocation, qnaLocation });

  return ctdSectionSchema.parse({
    ...section,
    officialSources,
    sourceStatus: "draft",
    lastVerifiedDate: "2026-07-13",
    contentVersion: "0.1.0",
    editorialReviewStatus: "source_verification_required",
    reviewRecords: [],
    contentHistory: [
      {
        version: "0.1.0",
        date: "2026-07-15",
        changeSummary,
        editorialReviewStatus: "source_verification_required",
        sourceCitationIds: officialSources.map((source) => source.id),
      },
    ],
  });
}
