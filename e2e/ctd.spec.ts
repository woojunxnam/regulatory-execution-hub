import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/submission-navigator/ctd", heading: "CTD Authoring & Dossier Builder" },
  { path: "/submission-navigator/ctd/module-3", heading: "Quality" },
  {
    path: "/submission-navigator/ctd/module-3/drug-product",
    heading: "Drug Product section index",
  },
  {
    path: "/submission-navigator/ctd/module-3/drug-product/3-2-p-5",
    heading: "Control of Drug Product",
  },
  { path: "/submission-navigator/ctd/source-matrix", heading: "Source-to-CTD Matrix" },
  { path: "/methodology", heading: "Methodology & limitations" },
];

for (const route of routes) {
  test(`${route.path} renders its primary content`, async ({ page }) => {
    await page.goto(route.path);

    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    await expect(page.locator("main#main-content")).toBeVisible();
  });
}

test("3.2.P.5 controls are keyboard accessible", async ({ page }) => {
  await page.goto("/submission-navigator/ctd/module-3/drug-product/3-2-p-5");
  const disclosure = page.getByRole("button", { name: "Expected & conditional information" });

  await disclosure.focus();
  await page.keyboard.press("Enter");

  await expect(disclosure).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("3.2.P.5.1 Specification(s)")).toBeVisible();

  await page.getByRole("button", { name: "Source documents & source data" }).click();
  await page.getByLabel("Approval status").selectOption("missing");
  await expect(page.getByText("Showing 1 source documents.")).toBeAttached();
});

test("Source-to-CTD Matrix exposes missing and superseded filters", async ({ page }) => {
  await page.goto("/submission-navigator/ctd/source-matrix");
  await page.getByLabel("Approval status").selectOption("missing");

  await expect(
    page.getByText("Showing 1 of 7 non-confidential demonstration records."),
  ).toBeVisible();
  await expect(page.getByText(/Product-specific advice/)).toBeVisible();

  await page.getByLabel("Approval status").selectOption("superseded");
  await expect(
    page.getByText("Showing 1 of 7 non-confidential demonstration records."),
  ).toBeVisible();
  await expect(page.getByText("Historical analytical procedure summary")).toBeVisible();
});

test("3.2.P.5 has no detectable WCAG A/AA axe violations", async ({ page }) => {
  await page.goto("/submission-navigator/ctd/module-3/drug-product/3-2-p-5");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

  expect(results.violations).toEqual([]);
});

test("print view keeps the authoring content and removes site chrome", async ({ page }) => {
  await page.goto("/submission-navigator/ctd/module-3/drug-product/3-2-p-5");
  await page.emulateMedia({ media: "print" });

  await expect(page.locator("header")).toBeHidden();
  await expect(
    page.getByRole("heading", { level: 1, name: "Control of Drug Product" }),
  ).toBeVisible();
});

test("interactive CTD routes produce no browser console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/submission-navigator/ctd/module-3/drug-product/3-2-p-5");
  await page.getByRole("button", { name: "Consistency checks" }).click();
  await page.goto("/submission-navigator/ctd/source-matrix");
  await page.getByLabel("Approval status").selectOption("under_review");

  expect(errors).toEqual([]);
});

test("captures desktop and mobile review evidence", async ({ page }, testInfo) => {
  await page.goto("/submission-navigator/ctd/module-3/drug-product/3-2-p-5");
  await page.screenshot({
    path: `artifacts/screenshots/3-2-p-5-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
