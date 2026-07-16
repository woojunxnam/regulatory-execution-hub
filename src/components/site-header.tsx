import Link from "next/link";

const navigation = [
  { href: "/regulatory-updates", label: "Regulatory Updates" },
  { href: "/submission-navigator/ctd", label: "CTD Builder" },
  { href: "/methodology", label: "Trust & Sources" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="no-print border-line/90 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3 no-underline">
          <span
            aria-hidden="true"
            className="bg-teal grid size-10 place-items-center rounded-xl text-sm font-bold tracking-wide text-white shadow-sm"
          >
            RE
          </span>
          <span>
            <span className="text-ink block font-serif text-lg leading-tight font-semibold">
              Regulatory Execution Hub
            </span>
            <span className="text-muted group-hover:text-teal block text-xs font-medium tracking-[0.16em] uppercase">
              From regulation to execution
            </span>
          </span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="text-muted flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold xl:gap-x-5">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-teal rounded-sm" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <details className="relative lg:hidden">
          <summary
            data-testid="mobile-menu-toggle"
            className="border-line text-ink cursor-pointer list-none rounded-lg border bg-white px-3 py-2 text-sm font-bold [&::-webkit-details-marker]:hidden"
          >
            Menu
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="border-line absolute top-12 right-0 z-40 w-64 rounded-2xl border bg-white p-3 shadow-xl"
          >
            <ul className="grid gap-1 text-sm font-semibold">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-muted hover:bg-sage hover:text-teal block rounded-lg px-3 py-2 no-underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
