import Link from "next/link";
import { CATEGORIES } from "@/lib/tools/categories";
import { TOOLS, toolsByCategory } from "@/lib/tools/registry";

export default function Home() {
  const total = TOOLS.length;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="grid-backdrop absolute inset-0 -z-10" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            {total} free tools, no signup
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight">
            The all-in-one toolbox<br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
              for the modern web.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            JSON, image, color, text, SEO and AI utilities — fast, private, and free.
            Every tool runs in your browser, so your data never leaves your device.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["JSON Formatter", "Password Generator", "Color Picker", "QR Code", "AI Summarizer"].map((label, i) => {
              const slugs = ["json-formatter", "password-generator", "color-picker", "qr-generator", "ai-summarizer"];
              const cats = ["developer", "generators", "color", "generators", "ai"];
              return (
                <Link
                  key={label}
                  href={`/tools/${cats[i]}/${slugs[i]}`}
                  className="px-3 py-1.5 rounded-md text-sm border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition"
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Browse by category</h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">{CATEGORIES.length} categories · {total} tools and growing</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => {
            const list = toolsByCategory(c.slug);
            return (
              <Link
                key={c.slug}
                href={`/tools/${c.slug}`}
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-surface-2)] transition"
              >
                <div className="flex items-center justify-between">
                  <span className="cat-bar" style={{ background: c.accent }} />
                  <span className="text-xs text-[var(--color-muted)]">{list.length} tools</span>
                </div>
                <h3 className="mt-4 font-semibold tracking-tight group-hover:text-[var(--color-accent)]">{c.name}</h3>
                <p className="mt-1 text-sm text-[var(--color-muted)] line-clamp-2">{c.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {list.slice(0, 4).map((t) => (
                    <span key={t.slug} className="text-xs px-2 py-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted)]">
                      {t.name.length > 18 ? t.name.slice(0, 18) + "…" : t.name}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular tools strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">Popular tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {TOOLS.slice(0, 12).map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.category}/${t.slug}`}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)]/60 transition"
            >
              <div className="text-xl">{t.icon}</div>
              <div className="mt-2 font-medium text-sm">{t.name}</div>
              <div className="mt-1 text-xs text-[var(--color-muted)] line-clamp-2">{t.tagline}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
