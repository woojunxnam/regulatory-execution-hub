import { describe, expect, it } from "vitest";
import { controlOfDrugProduct } from "@/data/ctd/sections/3-2-p-5";
import { drugProductSectionRecords } from "@/data/ctd/sections";
import { ctdSectionSchema } from "@/lib/ctd/schema";

describe("ctdSectionSchema", () => {
  it("accepts the valid 3.2.P.5 structured section", () => {
    const result = ctdSectionSchema.safeParse(controlOfDrugProduct);

    expect(result.success).toBe(true);
  });

  it("accepts every available Drug Product section and its citation/version links", () => {
    for (const section of drugProductSectionRecords) {
      expect(ctdSectionSchema.safeParse(section).success).toBe(true);
      const sourceIds = new Set(section.officialSources.map((source) => source.id));

      for (const expectation of [
        ...section.informationExpected,
        ...section.conditionalInformation,
      ]) {
        expect(expectation.citationIds.every((citationId) => sourceIds.has(citationId))).toBe(true);
      }
      expect(
        section.contentHistory.some((record) => record.version === section.contentVersion),
      ).toBe(true);
    }
  });

  it("rejects a section with missing verification metadata", () => {
    const invalidSection = { ...controlOfDrugProduct, lastVerifiedDate: undefined };
    const result = ctdSectionSchema.safeParse(invalidSection);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.join(".") === "lastVerifiedDate")).toBe(
        true,
      );
    }
  });

  it("rejects an invalid source approval status", () => {
    const invalidSection = structuredClone(controlOfDrugProduct) as unknown as Record<
      string,
      unknown
    >;
    const sources = invalidSection.sourceDocuments as Array<Record<string, unknown>>;
    sources[0].approvalStatus = "almost approved";

    expect(ctdSectionSchema.safeParse(invalidSection).success).toBe(false);
  });

  it("rejects human_reviewed status without an approved current review record", () => {
    const invalidSection = structuredClone(controlOfDrugProduct);
    invalidSection.editorialReviewStatus = "human_reviewed";
    invalidSection.reviewer = "Unrecorded reviewer";
    invalidSection.contentHistory[0].editorialReviewStatus = "human_reviewed";

    const result = ctdSectionSchema.safeParse(invalidSection);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.message.includes("approved review record")),
      ).toBe(true);
    }
  });

  it("rejects expectation citations that are absent from the official source set", () => {
    const invalidSection = structuredClone(controlOfDrugProduct);
    invalidSection.informationExpected[0].citationIds = ["missing-citation"];

    const result = ctdSectionSchema.safeParse(invalidSection);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message.includes("officialSources"))).toBe(
        true,
      );
    }
  });

  it("rejects duplicate content versions", () => {
    const invalidSection = structuredClone(controlOfDrugProduct);
    invalidSection.contentHistory.push(structuredClone(invalidSection.contentHistory[0]));

    const result = ctdSectionSchema.safeParse(invalidSection);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.message.includes("versions must be unique")),
      ).toBe(true);
    }
  });
});
