import Link from "next/link";
import { CATEGORIES } from "@/lib/tools/categories";
import { TOOLS } from "@/lib/tools/registry";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  // Split categories into three columns of three so the footer stays balanced.
  const cols: typeof CATEGORIES[] = [
    CATEGORIES.slice(0, 3),
    CATEGORIES.slice(3, 6),
    CATEGORIES.slice(6, 9),
  ];
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-accent)] text-white text-sm font-bold">B</span>
              <span>BestMint</span>
            </div>
            <p className="mt-3 text-sm text-[var(--color-muted)] max-w-xs">
              {SITE.description}
            </p>
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              {TOOLS.length} free tools across {CATEGORIES.length} categories. No signup required.
            </p>
          </div>
          {cols.map((col, idx) => (
            <div key={idx}>
              <h2 className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-medium mb-3">
                {idx === 0 ? "Build" : idx === 1 ? "Generate" : "Optimize"}
              </h2>
              <ul className="space-y-2">
                {col.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/tools/${c.slug}`}
                      className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} {SITE.name}. Most tools run entirely in your browser.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-[var(--color-foreground)]">Privacy</Link>
            <Link href="/cookies" className="hover:text-[var(--color-foreground)]">Cookies</Link>
            <Link href="/terms" className="hover:text-[var(--color-foreground)]">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-[var(--color-foreground)]">Sitemap</Link>
            <Link href="/robots.txt" className="hover:text-[var(--color-foreground)]">Robots</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
