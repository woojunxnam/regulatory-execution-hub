import { describe, expect, it } from "vitest";
import {
  checklistItemSchema,
  officialSourceSchema,
  regulatoryRecordControlSchema,
} from "@/lib/regulatory/schema";

const sourceCheckedControl = {
  officialSourceStatus: "official",
  editorialReviewStatus: "source_checked",
  qualifiedReviewRecord: null,
  lastVerifiedDate: "2026-07-16",
} as const;

describe("shared regulatory schemas", () => {
  it("requires a qualified review record before human-reviewed status", () => {
    const result = regulatoryRecordControlSchema.safeParse({
      ...sourceCheckedControl,
      editorialReviewStatus: "human_reviewed",
    });

    expect(result.success).toBe(false);
  });

  it("parses a controlled official source", () => {
    expect(
      officialSourceSchema.parse({
        id: "fda-example-source",
        owner: "FDA",
        title: "Official example",
        url: "https://www.fda.gov/example",
        location: "Section 1",
        versionLabel: "Current page",
        sourceDate: "2026-07-16",
        ...sourceCheckedControl,
      }),
    ).toMatchObject({ owner: "FDA", officialSourceStatus: "official" });
  });

  it("applies the human-review gate to official sources", () => {
    const result = officialSourceSchema.safeParse({
      id: "fda-example-source",
      owner: "FDA",
      title: "Official example",
      url: "https://www.fda.gov/example",
      location: "Section 1",
      versionLabel: "Current page",
      sourceDate: "2026-07-16",
      ...sourceCheckedControl,
      editorialReviewStatus: "human_reviewed",
    });

    expect(result.success).toBe(false);
  });

  it("keeps checklist classification and source traceability explicit", () => {
    const item = checklistItemSchema.parse({
      id: "confirm-applicability",
      title: "Confirm the applicable submission pathway",
      classification: "conditional",
      applicability: "Depends on the product and proposed regulatory action.",
      preparationOutput: "Documented pathway rationale",
      sourceIds: ["fda-example-source"],
      verificationQuestions: ["Which official pathway applies?"],
      ...sourceCheckedControl,
    });

    expect(item.classification).toBe("conditional");
    expect(item.sourceIds).toEqual(["fda-example-source"]);
  });
});
