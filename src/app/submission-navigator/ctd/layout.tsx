import type { ReactNode } from "react";
import { MethodologyPanel } from "@/components/ctd/methodology-panel";

export default function CtdLayout({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      {children}
      <MethodologyPanel />
    </main>
  );
}
