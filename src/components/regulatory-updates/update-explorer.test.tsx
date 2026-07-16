import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { UpdateExplorer } from "@/components/regulatory-updates/update-explorer";
import { regulatoryUpdates } from "@/data/regulatory-updates/updates";

describe("UpdateExplorer", () => {
  it("filters the bounded Safety Intelligence slice", async () => {
    const user = userEvent.setup();
    render(<UpdateExplorer records={regulatoryUpdates} />);

    await user.selectOptions(
      screen.getByLabelText("Update category filter"),
      "safety_intelligence",
    );

    expect(screen.getByText("Showing 6 of 14")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "FDA evaluates a drug-hypersensitivity signal for corticotropin products",
      }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", {
        name: "FDA issues draft master-protocol guidance for comment",
      }),
    ).not.toBeInTheDocument();
  });

  it("combines agency and category filters", async () => {
    const user = userEvent.setup();
    render(<UpdateExplorer records={regulatoryUpdates} />);

    await user.selectOptions(screen.getByLabelText("Agency filter"), "FDA");
    await user.selectOptions(
      screen.getByLabelText("Update category filter"),
      "safety_intelligence",
    );

    expect(screen.getByText("Showing 2 of 14")).toBeVisible();
  });
});
