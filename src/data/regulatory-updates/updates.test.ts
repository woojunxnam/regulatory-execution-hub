import { describe, expect, it } from "vitest";
import { getRegulatoryUpdate, regulatoryUpdates } from "@/data/regulatory-updates/updates";

describe("regulatory update records", () => {
  it("publishes the first bounded FDA and EMA source-checked snapshot", () => {
    expect(regulatoryUpdates).toHaveLength(14);
    expect(regulatoryUpdates.filter((record) => record.agency === "FDA")).toHaveLength(6);
    expect(regulatoryUpdates.filter((record) => record.agency === "EMA")).toHaveLength(8);
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

  it("publishes six Safety Intelligence records with separate signal and action states", () => {
    const safetyRecords = regulatoryUpdates.filter(
      (record) => record.category === "safety_intelligence",
    );
    const potentialSignal = getRegulatoryUpdate(
      "fda-aems-corticotropin-hypersensitivity-signal-2026-q1",
    );

    expect(safetyRecords).toHaveLength(6);
    expect(safetyRecords.every((record) => record.safety)).toBe(true);
    expect(potentialSignal?.safety).toMatchObject({
      safetyStage: "under_assessment",
      causalityStatus: "under_evaluation",
      regulatoryOutcome: "undetermined",
      implementationStatus: "not_applicable",
    });
    expect(
      safetyRecords.filter((record) => record.safety?.implementationStatus === "completed"),
    ).toHaveLength(2);
  });

  it("finds a record only by its controlled slug", () => {
    expect(getRegulatoryUpdate("ema-type-ii-variation-guidance-rev-118")?.agency).toBe("EMA");
    expect(getRegulatoryUpdate("not-published")).toBeUndefined();
  });
});
