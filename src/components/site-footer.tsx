import Link from "next/link";
import { CONTENT_LAST_UPDATED, SITE_VERSION } from "@/lib/site";

const policyLinks = [
  { href: "/about", label: "About" },
  { href: "/editorial-policy", label: "Editorial policy" },
  { href: "/corrections", label: "Corrections" },
  { href: "/privacy", label: "Privacy" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export function SiteFooter() {
  return (
    <footer className="no-print border-line mt-20 border-t bg-[#e9eee9]">
      <div className="text-muted mx-auto grid max-w-7xl gap-7 px-5 py-10 text-sm md:grid-cols-[1fr_auto] md:items-end lg:px-8">
        <div className="max-w-2xl">
          <p className="text-ink font-semibold">Independent educational decision support</p>
          <p className="mt-2 leading-6">
            Not affiliated with FDA, EMA, the European Commission, or ICH. Official sources control.
            Product-specific facts and qualified review may change the result.
          </p>
          <nav aria-label="Trust and policy navigation" className="mt-5">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {policyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-ink hover:text-teal font-semibold underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="md:text-right">
          Release {SITE_VERSION}
          <br />
          Content metadata updated{" "}
          <time dateTime={CONTENT_LAST_UPDATED}>{CONTENT_LAST_UPDATED}</time>
        </p>
      </div>
    </footer>
  );
}
