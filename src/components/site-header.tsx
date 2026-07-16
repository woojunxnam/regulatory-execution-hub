import Link from "next/link";

const navigation = [
  { href: "/applications", label: "Applications" },
  { href: "/lifecycle-changes", label: "Lifecycle Changes" },
  { href: "/regulatory-updates", label: "Updates" },
  { href: "/submission-navigator/ctd", label: "CTD Workspace" },
  { href: "/methodology", label: "Methodology" },
];

export function SiteHeader() {
  return (
    <header className="no-print border-line/90 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
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
        <nav aria-label="Primary navigation">
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
      </div>
    </header>
  );
}
