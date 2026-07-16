import { describe, expect, it } from "vitest";
import {
  crossModuleConsistencyRules,
  qualitySummaryTraceability,
} from "@/data/ctd/quality-summary-traceability";
import { drugProductSectionRecords } from "@/data/ctd/sections";
import {
  evaluateCrossModuleReadiness,
  validateCrossModuleRules,
  validateQualitySummaryTraceability,
} from "@/lib/ctd/traceability";

describe("Quality Overall Summary traceability", () => {
  it("links every traceability source and consistency check to a current section record", () => {
    expect(
      validateQualitySummaryTraceability(qualitySummaryTraceability, [
        ...drugProductSectionRecords,
      ]),
    ).toEqual([]);
  });

  it("reports a missing source link instead of silently accepting it", () => {
    const invalid = structuredClone(qualitySummaryTraceability);
    invalid[0].sourceDocumentIds = ["missing-source"];

    expect(validateQualitySummaryTraceability(invalid, [...drugProductSectionRecords])).toEqual([
      "qos-p1: Source document missing-source is not present in 3.2.P.1.",
    ]);
  });
});

describe("cross-module reviewer readiness", () => {
  it("references only available Drug Product sections", () => {
    expect(
      validateCrossModuleRules(crossModuleConsistencyRules, [...drugProductSectionRecords]),
    ).toEqual([]);
  });

  it("blocks the current draft while critical comparisons remain unresolved", () => {
    const result = evaluateCrossModuleReadiness(crossModuleConsistencyRules);

    expect(result.state).toBe("blocked");
    expect(result.blockers).toHaveLength(3);
  });

  it("becomes reviewer_ready only when all critical rules are explicitly resolved", () => {
    const resolved = crossModuleConsistencyRules.map((rule) => ({
      ...rule,
      status: "pass" as const,
    }));

    expect(evaluateCrossModuleReadiness(resolved)).toEqual({
      state: "reviewer_ready",
      blockers: [],
      warnings: [],
    });
  });

  it("treats a documented intentional difference as resolved", () => {
    const resolved = crossModuleConsistencyRules.map((rule) => ({
      ...rule,
      status: "intentional_difference" as const,
    }));

    expect(evaluateCrossModuleReadiness(resolved).state).toBe("reviewer_ready");
  });

  it("reports an unavailable source section", () => {
    const invalid = structuredClone(crossModuleConsistencyRules);
    invalid[0].sourceSectionIds = ["3.2.P.1", "3.2.P.99"];

    expect(validateCrossModuleRules(invalid, [...drugProductSectionRecords])).toEqual([
      "cross-composition-batch-formula: Source section 3.2.P.99 is not available.",
    ]);
  });
});
