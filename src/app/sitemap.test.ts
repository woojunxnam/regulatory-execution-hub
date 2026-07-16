import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { drugProductSectionRecords } from "@/data/ctd/sections";
import { regulatoryUpdates } from "@/data/regulatory-updates/updates";
import { absoluteUrl, SITE_URL } from "@/lib/site";

describe("public discovery metadata", () => {
  it("allows crawling and advertises the root sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: absoluteUrl("/sitemap.xml"),
      host: SITE_URL,
    });
  });

  it("includes substantive canonical routes and excludes planned noindex routes", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(absoluteUrl("/"));
    expect(urls).toContain(absoluteUrl("/about"));
    expect(urls).toContain(absoluteUrl("/applications"));
    expect(urls).toContain(absoluteUrl("/editorial-policy"));
    expect(urls).toContain(absoluteUrl("/privacy"));
    expect(urls).toContain(absoluteUrl("/regulatory-updates"));
    expect(urls).toContain(absoluteUrl("/submission-navigator/ctd"));
    expect(urls).not.toContain(absoluteUrl("/lifecycle-changes"));

    for (const section of drugProductSectionRecords) {
      expect(urls).toContain(
        absoluteUrl(`/submission-navigator/ctd/module-3/drug-product/${section.slug}`),
      );
    }

    for (const record of regulatoryUpdates) {
      expect(urls).toContain(absoluteUrl(`/regulatory-updates/${record.slug}`));
    }
  });

  it("publishes an installable web manifest with the site identity", () => {
    expect(manifest()).toMatchObject({
      name: "Regulatory Execution Hub",
      short_name: "RE Hub",
      start_url: "/",
      display: "standalone",
    });
  });
});
