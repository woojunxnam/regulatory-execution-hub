import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DisclosureGroup } from "@/components/ctd/disclosure-group";

describe("DisclosureGroup", () => {
  it("can be opened and closed with a keyboard-operable button", async () => {
    const user = userEvent.setup();
    render(
      <DisclosureGroup title="Expected information">
        <p>Controlled content</p>
      </DisclosureGroup>,
    );
    const button = screen.getByRole("button", { name: "Expected information" });

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Controlled content")).not.toBeVisible();

    button.focus();
    await user.keyboard("{Enter}");

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Controlled content")).toBeVisible();
  });
});
