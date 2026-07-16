import { describe, expect, it } from "vitest";
import { controlOfDrugProduct } from "@/data/ctd/sections/3-2-p-5";
import { calculateSourceSetHash } from "@/lib/ctd/integrity";
import { evaluateAuthoringReadiness } from "@/lib/ctd/readiness";
import { ctdSectionSchema, type CtdSection } from "@/lib/ctd/schema";

function completeDemonstrationSection(): CtdSection {
  const section = structuredClone(controlOfDrugProduct);
  section.sourceDocuments = section.sourceDocuments.map((source) => ({
    ...source,
    approvalStatus: source.id === "src-correspondence" ? "not_applicable" : "approved",
  }));
  section.sourceData = section.sourceData.map((source) => ({
    ...source,
    status: "approved",
  }));
  section.consistencyChecks = section.consistencyChecks.map((check) => ({
    ...check,
    status: "pass",
  }));
  section.readinessContext = {
    ...section.readinessContext,
    ownersAssigned: true,
    keyDecisionsStable: true,
    dataCutoffConfirmed: true,
    sourceVersionsConflict: false,
    reviewCommentsClosed: true,
    unresolvedQuestions: section.readinessContext.unresolvedQuestions.map((question) => ({
      ...question,
      resolved: true,
    })),
    dependencyStatuses: section.readinessContext.dependencyStatuses.map((dependency) => ({
      ...dependency,
      resolved: true,
    })),
  };
  section.editorialReviewStatus = "human_reviewed";
  section.contentHistory = section.contentHistory.map((record) =>
    record.version === section.contentVersion
      ? { ...record, editorialReviewStatus: "human_reviewed" as const }
      : record,
  );
  section.reviewer = "Synthetic qualified-review fixture";
  section.reviewRecords = [
    {
      id: "review-fixture-approved",
      entityType: "ctd_section",
      entityId: section.sectionId,
      reviewer: "Synthetic qualified-review fixture",
      reviewerRole: "Regulatory reviewer fixture",
      reviewerQualifications: "Test-only qualification fixture; never published as live review",
      reviewDate: "2026-07-15",
      result: "approved",
      notes: "Synthetic approved record used only to exercise the deterministic readiness branch.",
      contentVersion: section.contentVersion,
      sourceSetHash: calculateSourceSetHash(section.officialSources),
    },
  ];
  return section;
}

describe("evaluateAuthoringReadiness", () => {
  it("returns not_ready when a critical source is missing", () => {
    const section = completeDemonstrationSection();
    section.sourceDocuments[0].approvalStatus = "missing";

    const result = evaluateAuthoringReadiness(section);

    expect(result.state).toBe("not_ready");
    expect(result.blockers.join(" ")).toContain("Critical source is missing");
  });

  it("blocks ready_for_final_authoring when a core source is draft", () => {
    const section = completeDemonstrationSection();
    section.sourceDocuments[0].approvalStatus = "draft";

    const result = evaluateAuthoringReadiness(section);

    expect(result.state).toBe("ready_for_initial_drafting");
    expect(result.blockers.join(" ")).toContain("not approved");
  });

  it("blocks reviewer_ready for an unresolved critical discrepancy", () => {
    const section = completeDemonstrationSection();
    section.consistencyChecks[0].status = "unresolved";
    section.consistencyChecks[0].severity = "critical";

    const result = evaluateAuthoringReadiness(section);

    expect(result.state).toBe("ready_for_final_authoring");
    expect(result.blockers.join(" ")).toContain("Critical discrepancy is unresolved");
  });

  it("blocks reviewer_ready when a critical comparison cannot be performed", () => {
    const section = completeDemonstrationSection();
    section.consistencyChecks[0].status = "unable_to_compare";
    section.consistencyChecks[0].severity = "critical";

    const result = evaluateAuthoringReadiness(section);

    expect(result.state).toBe("ready_for_final_authoring");
    expect(result.blockers.join(" ")).toContain("Critical discrepancy is unable to compare");
  });

  it("reaches reviewer_ready for a complete demonstration case", () => {
    const section = completeDemonstrationSection();
    const result = evaluateAuthoringReadiness(section);

    expect(ctdSectionSchema.safeParse(section).success).toBe(true);
    expect(result.state).toBe("reviewer_ready");
    expect(result.blockers).toEqual([]);
  });

  it("blocks reviewer_ready when official citations are missing", () => {
    const section = completeDemonstrationSection();
    section.officialSources = [];
    section.reviewRecords = [];

    const result = evaluateAuthoringReadiness(section);

    expect(result.state).toBe("ready_for_final_authoring");
    expect(result.blockers).toContain("No official citations are recorded.");
  });

  it("blocks reviewer_ready without a matching qualified review record", () => {
    const section = completeDemonstrationSection();
    section.reviewRecords = [];
    section.editorialReviewStatus = "source_verification_required";

    const result = evaluateAuthoringReadiness(section);

    expect(result.state).toBe("ready_for_final_authoring");
    expect(result.blockers).toContain(
      "No approved qualified review record matches the current content version and source set.",
    );
  });

  it("keeps the page demonstration at initial-drafting readiness", () => {
    expect(evaluateAuthoringReadiness(controlOfDrugProduct).state).toBe(
      "ready_for_initial_drafting",
    );
  });
});
