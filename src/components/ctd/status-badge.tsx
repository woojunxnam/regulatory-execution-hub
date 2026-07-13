import type { ReactNode } from "react";

type Tone = "teal" | "gold" | "rose" | "blue" | "neutral";

const toneClasses: Record<Tone, string> = {
  teal: "border-teal/20 bg-sage text-teal-dark",
  gold: "border-gold/20 bg-gold-soft text-[#74440f]",
  rose: "border-rose/20 bg-rose-soft text-[#7c2931]",
  blue: "border-[#51759b]/20 bg-blue-soft text-[#294e73]",
  neutral: "border-line bg-[#edf0ee] text-[#49575a]",
};

export function StatusBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs leading-none font-bold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
