import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Regulatory Execution Hub",
    template: "%s | Regulatory Execution Hub",
  },
  description:
    "Evidence-linked FDA/EMA execution support for CTD authoring, source readiness, and reviewer preparation.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="bg-ink sr-only fixed top-4 left-4 z-50 rounded px-4 py-2 text-white focus:not-sr-only"
        >
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
