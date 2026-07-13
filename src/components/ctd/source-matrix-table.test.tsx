import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SourceMatrixTable } from "@/components/ctd/source-matrix-table";
import { sourceMatrix } from "@/data/ctd/source-matrix";

describe("SourceMatrixTable", () => {
  it("supports combined status and section filters", async () => {
    const user = userEvent.setup();
    render(<SourceMatrixTable rows={sourceMatrix} />);

    await user.selectOptions(screen.getByLabelText("Approval status"), "under_review");
    await user.selectOptions(screen.getByLabelText("CTD section"), "3.2.P.5.2");

    expect(
      screen.getByText("Showing 1 of 7 non-confidential demonstration records."),
    ).toBeVisible();
    expect(screen.getByText("Drug product analytical procedure package")).toBeVisible();
  });
});
