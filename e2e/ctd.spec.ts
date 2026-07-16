import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  {
    path: "/",
    heading: "What do you need to prepare?",
  },
  { path: "/about", heading: "What this product is — and is not." },
  { path: "/applications", heading: "Prepare the application, not only the dossier." },
  { path: "/corrections", heading: "Corrections and content feedback" },
  { path: "/editorial-policy", heading: "Editorial policy" },
  {
    path: "/lifecycle-changes",
    heading: "Start with the change. Trace every downstream impact.",
  },
  {
    path: "/regulatory-updates",
    heading: "Official update. Visible status. Practical next question.",
  },
  {
    path: "/regulatory-updates/ema-type-ii-variation-guidance-rev-118",
    heading: "EMA Type II variation guidance updated in Rev. 118",
  },
  {
    path: "/regulatory-updates/ema-grouping-variations-guidance-rev-118",
    heading: "EMA grouping-of-variations guidance updated in Rev. 118",
  },
  {
    path: "/regulatory-updates/fda-antiviral-ngs-submission-final-guidance",
    heading: "FDA finalizes antiviral NGS submission technical specifications",
  },
  {
    path: "/regulatory-updates/ema-procedural-timetables-july-2026",
    heading: "EMA refreshes multiple procedural timetable files",
  },
  {
    path: "/regulatory-updates/fda-master-protocols-draft-guidance-2026",
    heading: "FDA issues draft master-protocol guidance for comment",
  },
  {
    path: "/regulatory-updates/fda-substantial-evidence-effectiveness-draft-2026",
    heading: "FDA reissues draft guidance on substantial evidence of effectiveness",
  },
  {
    path: "/regulatory-updates/fda-immunogenicity-pk-dataset-final-guidance",
    heading: "FDA finalizes immunogenicity–pharmacokinetics dataset specifications",
  },
  {
    path: "/regulatory-updates/ema-revised-variations-framework-2026",
    heading: "Revised EU variations guidelines apply from 15 January 2026",
  },
  { path: "/submission-navigator/ctd", heading: "CTD Authoring & Dossier Builder" },
  { path: "/submission-navigator/ctd/module-3", heading: "Quality" },
  {
    path: "/submission-navigator/ctd/module-3/drug-product",
    heading: "Drug Product section index",
  },
  {
    path: "/submission-navigator/ctd/module-2/quality-overall-summary",
    heading: "Quality Overall Summary traceability",
  },
  {
    path: "/submission-navigator/ctd/module-3/drug-product/3-2-p-1",
    heading: "Description and Composition of the Drug Product",
  },
  {
    path: "/submission-navigator/ctd/module-3/drug-product/3-2-p-2",
    heading: "Pharmaceutical Development",
  },
  {
    path: "/submission-navigator/ctd/module-3/drug-product/3-2-p-3",
    heading: "Manufacture",
  },
  {
    path: "/submission-navigator/ctd/module-3/drug-product/3-2-p-5",
    heading: "Control of Drug Product",
  },
  {
    path: "/submission-navigator/ctd/module-3/drug-product/3-2-p-7",
    heading: "Container-Closure System",
  },
  {
    path: "/submission-navigator/ctd/module-3/drug-product/3-2-p-8",
    heading: "Stability",
  },
  { path: "/submission-navigator/ctd/source-matrix", heading: "Source-to-CTD Matrix" },
  { path: "/methodology", heading: "Methodology & limitations" },
  { path: "/privacy", heading: "Privacy for the current public prototype" },
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

test("Home guided search separates available and planned coverage", async ({ page }) => {
  await page.goto("/");

  const query = page.getByRole("searchbox", {
    name: "What do you need to prepare or verify?",
  });
  await query.fill("What sources support 3.2.P.5?");
  await page.getByRole("button", { name: "Find a page" }).click();

  await expect(page.getByRole("link", { name: /3.2.P.5 Control of Drug Product/ })).toBeVisible();
  await expect(page.getByText(/Page navigation only — no generated advice/)).toBeVisible();

  await query.fill("FDA IND");
  await page.getByRole("button", { name: "Find a page" }).click();
  await expect(
    page
      .getByTestId("query-results")
      .getByRole("heading", { name: "FDA Initial IND preparation guide" }),
  ).toBeVisible();
  await expect(
    page.getByTestId("query-results").getByRole("link", {
      name: "View planned coverage for FDA Initial IND preparation guide",
    }),
  ).toHaveAttribute("href", "/applications#fda-initial-ind");

  await page.getByRole("button", { name: "Latest FDA updates" }).click();
  await expect(
    page.getByTestId("query-results").getByRole("link", {
      name: "Open Curated FDA and EMA Updates",
    }),
  ).toHaveAttribute("href", "/regulatory-updates");
});

test("Home navigation prioritizes live tasks and keeps planned work compact", async ({ page }) => {
  await page.goto("/");

  const mobileMenuToggle = page.getByTestId("mobile-menu-toggle");
  const usesMobileMenu = await mobileMenuToggle.isVisible();
  if (usesMobileMenu) await mobileMenuToggle.click();
  const primaryNavigation = page.getByRole("navigation", {
    name: usesMobileMenu ? "Mobile navigation" : "Primary navigation",
  });

  await expect(
    primaryNavigation.getByRole("link", { name: "Regulatory Updates", exact: true }),
  ).toBeVisible();
  await expect(
    primaryNavigation.getByRole("link", { name: "CTD Builder", exact: true }),
  ).toBeVisible();
  await expect(
    primaryNavigation.getByRole("link", { name: "Trust & Sources", exact: true }),
  ).toBeVisible();
  await expect(primaryNavigation.getByRole("link", { name: "About", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Open a live workspace." })).toBeVisible();
  await expect(page.getByText("Application Guides · Lifecycle Changes")).toBeVisible();
});

test("SEO endpoints expose indexable routes and protect planned thin pages", async ({
  page,
  request,
}) => {
  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain(
    "Sitemap: https://regulatory-execution-hub.vercel.app/sitemap.xml",
  );

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemapBody = await sitemapResponse.text();
  expect(sitemapBody).toContain("https://regulatory-execution-hub.vercel.app/applications");
  expect(sitemapBody).toContain("https://regulatory-execution-hub.vercel.app/editorial-policy");
  expect(sitemapBody).toContain("https://regulatory-execution-hub.vercel.app/regulatory-updates");
  expect(sitemapBody).not.toContain("/lifecycle-changes");

  await page.goto("/applications");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://regulatory-execution-hub.vercel.app/applications",
  );

  await page.goto("/lifecycle-changes");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
});

test("regulatory updates expose official-source and review boundaries", async ({ page }) => {
  await page.goto("/regulatory-updates/fda-master-protocols-draft-guidance-2026");

  await expect(page.getByText("Draft — not for implementation", { exact: true })).toHaveCount(2);
  await expect(page.getByText("Official comment deadline: 2026-08-24")).toBeVisible();
  await expect(page.getByText("None attached", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open official FDA source/ })).toHaveAttribute(
    "href",
    "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/master-protocols-drug-and-biological-product-development",
  );

  await page.goto("/regulatory-updates/ema-revised-variations-framework-2026");
  await expect(page.getByText("Conditional", { exact: true })).toBeVisible();
  await expect(page.getByText("source checked", { exact: true })).toBeVisible();
});

test("Safety Intelligence separates potential signals from completed actions", async ({ page }) => {
  await page.goto("/regulatory-updates");
  await page.getByLabel("Update category filter").selectOption("safety_intelligence");

  await expect(page.getByText("Showing 6 of 14")).toBeVisible();
  const signalCard = page.getByRole("article").filter({
    has: page.getByRole("heading", {
      name: "FDA evaluates a drug-hypersensitivity signal for corticotropin products",
    }),
  });
  await signalCard.getByRole("link", { name: "Review update" }).click();

  await expect(
    page.getByRole("heading", { name: /Signal, action, and implementation/ }),
  ).toBeVisible();
  await expect(page.getByText("under assessment", { exact: true })).toBeVisible();
  await expect(page.getByText("under evaluation", { exact: true })).toBeVisible();
  await expect(page.getByText("Drug hypersensitivity", { exact: true })).toBeVisible();
  await expect(page.getByText(/Acthar Gel, Corticotrophin/)).toBeVisible();
  await expect(
    page.getByText("Listing does not establish causality", { exact: false }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Open official FDA source/ })).toHaveAttribute(
    "href",
    "https://www.fda.gov/drugs/fda-adverse-event-monitoring-system-aems/january-march-2026-new-safety-information-or-potential-signals-serious-risks-identified-fda-adverse",
  );
});

test("Regulatory Updates has no detectable WCAG A/AA axe violations", async ({ page }) => {
  await page.goto("/regulatory-updates");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

  expect(results.violations).toEqual([]);
});

test("public responses expose security and social-discovery metadata", async ({
  page,
  request,
}) => {
  const response = await request.get("/");
  expect(response.ok()).toBe(true);
  const headers = response.headers();

  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");

  await page.goto("/");
  const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(imageUrl).toContain("/opengraph-image");

  const parsedImageUrl = new URL(imageUrl!);
  const imageResponse = await request.get(`${parsedImageUrl.pathname}${parsedImageUrl.search}`);
  expect(imageResponse.ok()).toBe(true);
  expect(imageResponse.headers()["content-type"]).toContain("image/png");
});

test("footer exposes public governance and privacy routes", async ({ page }) => {
  await page.goto("/");

  const trustNavigation = page.getByRole("navigation", { name: "Trust and policy navigation" });
  await expect(trustNavigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "/about",
  );
  await expect(trustNavigation.getByRole("link", { name: "Editorial policy" })).toHaveAttribute(
    "href",
    "/editorial-policy",
  );
  await expect(trustNavigation.getByRole("link", { name: "Corrections" })).toHaveAttribute(
    "href",
    "/corrections",
  );
  await expect(trustNavigation.getByRole("link", { name: "Privacy" })).toHaveAttribute(
    "href",
    "/privacy",
  );
});

test("Home has no detectable WCAG A/AA axe violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

  expect(results.violations).toEqual([]);
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

test("exports filtered matrix and authoring packet files", async ({ page }) => {
  await page.goto("/submission-navigator/ctd/source-matrix");
  await page.getByLabel("Approval status").selectOption("missing");

  const csvDownloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export filtered CSV" }).click();
  const csvDownload = await csvDownloadPromise;
  expect(csvDownload.suggestedFilename()).toBe("source-to-ctd-matrix.csv");

  await page.goto("/submission-navigator/ctd/module-3/drug-product/3-2-p-5");
  const packetDownloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export text packet" }).click();
  const packetDownload = await packetDownloadPromise;
  expect(packetDownload.suggestedFilename()).toBe("3-2-p-5-authoring-packet.txt");
});

test("public reference page exposes draft and educational-use boundaries", async ({ page }) => {
  await page.goto("/submission-navigator/ctd/module-3/drug-product/3-2-p-5");

  await expect(
    page.getByText(
      "Editorial draft — source verification required. No qualified human review record is attached.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByText("Independent educational decision support", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "This state is calculated from visible demonstration fields. It is not an agency completeness or filing decision and is not produced by an LLM.",
      { exact: true },
    ),
  ).toBeVisible();
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

  await page.goto("/");
  await page
    .getByRole("searchbox", { name: "What do you need to prepare or verify?" })
    .fill("FDA IND");
  await page.getByRole("button", { name: "Find a page" }).click();
  await page.goto("/submission-navigator/ctd/module-3/drug-product/3-2-p-5");
  await page.getByRole("button", { name: "Consistency checks" }).click();
  await page.goto("/submission-navigator/ctd/source-matrix");
  await page.getByLabel("Approval status").selectOption("under_review");

  expect(errors).toEqual([]);
});

test("captures desktop and mobile review evidence", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.screenshot({
    path: `artifacts/screenshots/home-${testInfo.project.name}.png`,
    fullPage: false,
  });

  await page.goto("/submission-navigator/ctd/module-3/drug-product/3-2-p-5");
  await page.screenshot({
    path: `artifacts/screenshots/3-2-p-5-${testInfo.project.name}.png`,
    fullPage: true,
  });

  await page.goto("/regulatory-updates");
  await page.getByLabel("Update category filter").selectOption("safety_intelligence");
  await page.locator('section[aria-labelledby="updates-title"]').screenshot({
    path: `artifacts/screenshots/safety-intelligence-${testInfo.project.name}.png`,
  });

  await page.goto("/regulatory-updates/fda-aems-corticotropin-hypersensitivity-signal-2026-q1");
  await page.locator('section[aria-labelledby="safety-state-title"]').screenshot({
    path: `artifacts/screenshots/safety-signal-detail-${testInfo.project.name}.png`,
  });
});
