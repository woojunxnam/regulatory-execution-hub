import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SourceDocumentPanel } from "@/components/ctd/source-document-panel";
import { controlOfDrugProduct } from "@/data/ctd/sections/3-2-p-5";

describe("SourceDocumentPanel", () => {
  it("filters sources by approval status and announces the result", async () => {
    const user = userEvent.setup();
    render(<SourceDocumentPanel sources={controlOfDrugProduct.sourceDocuments} />);

    await user.selectOptions(screen.getByLabelText("Approval status"), "missing");

    const table = screen.getByRole("table", {
      name: "Source documents supporting CTD section 3.2.P.5",
    });
    expect(within(table).getByText(/Product-specific advice/)).toBeInTheDocument();
    expect(within(table).queryByText(/release and shelf-life specification package/)).toBeNull();
    expect(screen.getByText("Showing 1 source documents.")).toBeInTheDocument();
  });
});
