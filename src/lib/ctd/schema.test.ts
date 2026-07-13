import { describe, expect, it } from "vitest";
import { controlOfDrugProduct } from "@/data/ctd/sections/3-2-p-5";
import { ctdSectionSchema } from "@/lib/ctd/schema";

describe("ctdSectionSchema", () => {
  it("accepts the valid 3.2.P.5 structured section", () => {
    const result = ctdSectionSchema.safeParse(controlOfDrugProduct);

    expect(result.success).toBe(true);
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
});
