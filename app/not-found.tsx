import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/tools/categories";
import { TOOLS } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <p className="text-sm text-[var(--color-muted)]">404</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-xl mx-auto">
          We couldn&rsquo;t find the page you were looking for. It may have moved or never existed.
          Try one of the {CATEGORIES.length} categories below — between them, BestMint has{" "}
          {TOOLS.length} free online tools you can use right now.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block px-4 py-2 rounded-md bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition"
        >
          ← Back to homepage
        </Link>
      </div>

      <section className="mt-16" aria-labelledby="cats-heading">
        <h2 id="cats-heading" className="text-xl font-semibold tracking-tight">
          Browse by category
        </h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/tools/${c.slug}`}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)]/60 transition"
            >
              <div className="flex items-center gap-2">
                <span
                  className="cat-bar"
                  style={{ background: c.accent }}
                  aria-hidden="true"
                />
                <span className="font-medium text-sm">{c.name}</span>
              </div>
              <p className="mt-2 text-xs text-[var(--color-muted)] line-clamp-2">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="popular-heading">
        <h2 id="popular-heading" className="text-xl font-semibold tracking-tight">
          Popular tools
        </h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {TOOLS.slice(0, 12).map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.category}/${t.slug}`}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)] transition"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
