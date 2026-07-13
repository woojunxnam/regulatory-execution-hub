export function SiteFooter() {
  return (
    <footer className="no-print border-line mt-20 border-t bg-[#e9eee9]">
      <div className="text-muted mx-auto grid max-w-7xl gap-5 px-5 py-10 text-sm md:grid-cols-[1fr_auto] md:items-end lg:px-8">
        <div className="max-w-2xl">
          <p className="text-ink font-semibold">Independent educational decision support</p>
          <p className="mt-2 leading-6">
            Not affiliated with FDA, EMA, the European Commission, or ICH. Official sources control.
            Product-specific facts and qualified review may change the result.
          </p>
        </div>
        <p>Content version 0.1.0 · Source check 2026-07-13</p>
      </div>
    </footer>
  );
}
