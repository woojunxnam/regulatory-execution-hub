import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RegulatoryQuery } from "@/components/home/regulatory-query";

describe("RegulatoryQuery", () => {
  it("requires a task before matching a pathway", async () => {
    const user = userEvent.setup();
    render(<RegulatoryQuery />);

    await user.click(screen.getByRole("button", { name: "Find a page" }));

    expect(
      screen.getByText("Enter a submission, CTD section, evidence gap, or regulatory task."),
    ).toHaveAttribute("role", "alert");
  });

  it("returns an available CTD route without generating an answer", async () => {
    const user = userEvent.setup();
    render(<RegulatoryQuery />);

    await user.type(
      screen.getByRole("searchbox", {
        name: "What do you need to prepare or verify?",
      }),
      "What sources support 3.2.P.5?",
    );
    await user.click(screen.getByRole("button", { name: "Find a page" }));

    expect(screen.getByRole("link", { name: /3.2.P.5 Control of Drug Product/ })).toHaveAttribute(
      "href",
      "/submission-navigator/ctd/module-3/drug-product/3-2-p-5",
    );
    expect(
      screen.getByText("Guided navigation only — no generated regulatory advice."),
    ).toBeVisible();
  });

  it("labels unreleased FDA IND support as planned and links only to its roadmap", async () => {
    const user = userEvent.setup();
    render(<RegulatoryQuery />);

    await user.type(
      screen.getByRole("searchbox", { name: "What do you need to prepare or verify?" }),
      "FDA IND",
    );
    await user.click(screen.getByRole("button", { name: "Find a page" }));

    expect(
      screen.getByRole("heading", { name: "FDA Initial IND preparation guide" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("link", { name: /FDA Initial IND preparation guide/ }),
    ).toHaveAttribute("href", "/applications#fda-initial-ind");
  });

  it("offers examples only for available coverage", () => {
    render(<RegulatoryQuery />);

    expect(screen.getByRole("button", { name: "Sources for 3.2.P.5" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Quality Overall Summary" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Latest FDA updates" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Latest EMA updates" })).toBeVisible();
    expect(screen.queryByRole("button", { name: /FDA IND/ })).not.toBeInTheDocument();
  });
});
