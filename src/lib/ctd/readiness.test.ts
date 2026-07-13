import { describe, expect, it } from "vitest";
import { controlOfDrugProduct } from "@/data/ctd/sections/3-2-p-5";
import { evaluateAuthoringReadiness } from "@/lib/ctd/readiness";
import type { CtdSection } from "@/lib/ctd/schema";

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

  it("reaches reviewer_ready for a complete demonstration case", () => {
    const result = evaluateAuthoringReadiness(completeDemonstrationSection());

    expect(result.state).toBe("reviewer_ready");
    expect(result.blockers).toEqual([]);
  });

  it("blocks reviewer_ready when official citations are missing", () => {
    const section = completeDemonstrationSection();
    section.officialSources = [];

    const result = evaluateAuthoringReadiness(section);

    expect(result.state).toBe("ready_for_final_authoring");
    expect(result.blockers).toContain("No official citations are recorded.");
  });

  it("keeps the page demonstration at initial-drafting readiness", () => {
    expect(evaluateAuthoringReadiness(controlOfDrugProduct).state).toBe(
      "ready_for_initial_drafting",
    );
  });
});
