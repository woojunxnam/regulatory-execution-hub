import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RegulatoryQuery } from "@/components/home/regulatory-query";

describe("RegulatoryQuery", () => {
  it("requires a task before matching a pathway", async () => {
    const user = userEvent.setup();
    render(<RegulatoryQuery />);

    await user.click(screen.getByRole("button", { name: "Find execution path" }));

    expect(
      screen.getByText("Enter a submission, CTD section, evidence gap, or regulatory task."),
    ).toHaveAttribute("role", "alert");
  });

  it("returns an available CTD route without generating an answer", async () => {
    const user = userEvent.setup();
    render(<RegulatoryQuery />);

    await user.type(
      screen.getByRole("textbox", {
        name: "What are you preparing or trying to verify?",
      }),
      "What sources support 3.2.P.5?",
    );
    await user.click(screen.getByRole("button", { name: "Find execution path" }));

    expect(screen.getByRole("link", { name: /3.2.P.5 Control of Drug Product/ })).toHaveAttribute(
      "href",
      "/submission-navigator/ctd/module-3/drug-product/3-2-p-5",
    );
    expect(
      screen.getByText(
        "Navigation result only — not a generated regulatory answer or determination.",
      ),
    ).toBeVisible();
  });

  it("labels unreleased FDA IND support as planned and links only to its roadmap", async () => {
    const user = userEvent.setup();
    render(<RegulatoryQuery />);

    await user.click(screen.getByRole("button", { name: "Show FDA IND preparation support" }));

    expect(
      screen.getByRole("heading", { name: "FDA Initial IND preparation guide" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("link", { name: /FDA Initial IND preparation guide/ }),
    ).toHaveAttribute("href", "/applications#fda-initial-ind");
  });
});
