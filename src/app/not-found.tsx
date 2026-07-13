import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-teal text-sm font-bold tracking-[0.16em] uppercase">404</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold">Section not available</h1>
      <p className="text-muted mt-5 text-lg leading-8">
        This CTD section may be planned but is not implemented in the current vertical slice.
      </p>
      <Link
        className="bg-teal mt-8 inline-flex rounded-xl px-5 py-3 font-bold text-white no-underline"
        href="/submission-navigator/ctd"
      >
        Return to CTD Builder
      </Link>
    </main>
  );
}
