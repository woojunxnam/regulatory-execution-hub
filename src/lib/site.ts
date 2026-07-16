const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_NAME = "Regulatory Execution Hub";
export const SITE_DESCRIPTION =
  "Official-source-first educational decision support for FDA and EMA application preparation, lifecycle changes, regulatory updates, and CTD evidence execution.";
export const SITE_URL = configuredSiteUrl || "https://regulatory-execution-hub.vercel.app";
export const CONTENT_LAST_UPDATED = "2026-07-16";
export const SITE_VERSION = "0.2.0";
export const REPOSITORY_URL = "https://github.com/woojunxnam/regulatory-execution-hub";
export const CORRECTIONS_URL = `${REPOSITORY_URL}/issues/new`;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
