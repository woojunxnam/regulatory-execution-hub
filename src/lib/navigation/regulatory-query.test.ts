import { describe, expect, it } from "vitest";
import { findRegulatoryPathways } from "@/lib/navigation/regulatory-query";

describe("findRegulatoryPathways", () => {
  it("routes an explicit CTD section question to the exact available section", () => {
    const matches = findRegulatoryPathways("What sources support 3.2.P.5?");

    expect(matches[0]?.pathway.id).toBe("control-of-drug-product");
    expect(matches[0]?.pathway.status).toBe("available");
    expect(matches[0]?.pathway.href).toBe(
      "/submission-navigator/ctd/module-3/drug-product/3-2-p-5",
    );
  });

  it("routes a QOS question to cross-module traceability", () => {
    const matches = findRegulatoryPathways("How do I prepare the Quality Overall Summary?");

    expect(matches[0]?.pathway.id).toBe("quality-overall-summary");
  });

  it("marks unreleased application support as planned", () => {
    const matches = findRegulatoryPathways("Show FDA IND preparation support");

    expect(matches[0]?.pathway.id).toBe("fda-initial-ind");
    expect(matches[0]?.pathway.status).toBe("planned");
    expect(matches[0]?.pathway.href).toBe("/applications#fda-initial-ind");
  });

  it("opens the source-checked update snapshot as available coverage", () => {
    const matches = findRegulatoryPathways("What FDA and EMA updates are available?");

    expect(matches[0]?.pathway.id).toBe("regulatory-updates");
    expect(matches[0]?.pathway.status).toBe("available");
    expect(matches[0]?.pathway.href).toBe("/regulatory-updates");
    expect(matches.map(({ pathway }) => pathway.id)).toEqual(["regulatory-updates"]);
  });

  it("routes a drug-safety question to Safety Intelligence", () => {
    const matches = findRegulatoryPathways("Show FDA AEMS adverse event signals");

    expect(matches[0]?.pathway.id).toBe("safety-intelligence");
    expect(matches[0]?.pathway.status).toBe("available");
    expect(matches[0]?.pathway.href).toBe("/regulatory-updates");
  });

  it("returns honest navigation fallbacks for an unmatched question", () => {
    const matches = findRegulatoryPathways("Where should I begin with an unfamiliar task?");

    expect(matches.map(({ pathway }) => pathway.id)).toEqual([
      "source-matrix",
      "methodology",
      "ctd-builder",
    ]);
    expect(matches.every(({ score }) => score === 0)).toBe(true);
  });

  it("returns no results for an empty query", () => {
    expect(findRegulatoryPathways("   ")).toEqual([]);
  });
});
