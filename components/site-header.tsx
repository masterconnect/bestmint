import Link from "next/link";
import { Search } from "@/components/search";
import { CATEGORIES } from "@/lib/tools/categories";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_85%,transparent)] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-background)_70%,transparent)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-accent)] text-white text-sm font-bold">B</span>
            <span>BestMint</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm text-[var(--color-muted)]">
            {CATEGORIES.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/tools/${c.slug}`}
                className="px-3 py-1.5 rounded-md hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)] transition"
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <div className="flex-1" />
          <div className="w-full max-w-sm">
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
}
