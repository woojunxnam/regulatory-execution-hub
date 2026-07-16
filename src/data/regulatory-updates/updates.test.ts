import { describe, expect, it } from "vitest";
import { getRegulatoryUpdate, regulatoryUpdates } from "@/data/regulatory-updates/updates";

describe("regulatory update records", () => {
  it("publishes the first bounded FDA and EMA source-checked snapshot", () => {
    expect(regulatoryUpdates).toHaveLength(8);
    expect(regulatoryUpdates.filter((record) => record.agency === "FDA")).toHaveLength(4);
    expect(regulatoryUpdates.filter((record) => record.agency === "EMA")).toHaveLength(4);
  });

  it("exposes source, editorial, and verification status for every record", () => {
    for (const record of regulatoryUpdates) {
      expect(record.officialSourceStatus).toBe("official");
      expect(record.editorialReviewStatus).toBe("source_checked");
      expect(record.qualifiedReviewRecord).toBeNull();
      expect(record.lastVerifiedDate).toBe("2026-07-16");
      expect(new URL(record.source.url).hostname).toBe(
        record.agency === "FDA" ? "www.fda.gov" : "www.ema.europa.eu",
      );
    }
  });

  it("keeps draft FDA guidance distinct and exposes comment deadlines", () => {
    const drafts = regulatoryUpdates.filter((record) => record.sourceDocumentStatus === "draft");

    expect(drafts).toHaveLength(2);
    expect(drafts.every((record) => record.agency === "FDA")).toBe(true);
    expect(drafts.map((record) => record.commentDeadline).sort()).toEqual([
      "2026-08-24",
      "2026-09-22",
    ]);
  });

  it("finds a record only by its controlled slug", () => {
    expect(getRegulatoryUpdate("ema-type-ii-variation-guidance-rev-118")?.agency).toBe("EMA");
    expect(getRegulatoryUpdate("not-published")).toBeUndefined();
  });
});
