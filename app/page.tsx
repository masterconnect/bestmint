import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/tools/categories";
import { TOOLS, toolsByCategory } from "@/lib/tools/registry";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    site: SITE.twitter,
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${SITE.name} — Tool index`,
  itemListElement: TOOLS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    url: `${SITE.url}/tools/${t.category}/${t.slug}`,
  })),
};

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
            Free online tools<br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
              for developers, designers and creators.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            BestMint is an all-in-one toolbox of {total}+ free utilities — JSON formatter, image
            converter, color picker, text utilities, SEO helpers and AI tools. Every tool runs
            entirely in your browser, so your data never leaves your device. No signup, no
            tracking, no upload limits.
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
                    <span key={t.slug} className="text-xs px-2 py-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted)] max-w-full truncate">
                      {t.name}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

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

      {/* Long-form intro for SEO */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Why BestMint?
        </h2>
        <div className="mt-6 space-y-4 text-[var(--color-muted)] leading-relaxed">
          <p>
            BestMint is a free online toolbox built for developers, designers, marketers and
            students who need a fast, no-friction way to format JSON, convert images, generate
            passwords, pick colors, calculate percentages, decode JWTs or summarize an article.
            Instead of hunting through ad-heavy single-purpose websites, you get {total} hand-picked
            utilities under one clean interface.
          </p>
          <p>
            <strong className="text-[var(--color-foreground)]">Privacy-first by design.</strong>{" "}
            Almost every tool runs entirely in your browser using the Web Crypto, Canvas and{" "}
            <code>Intl</code> APIs. Your JSON, images, passwords and personal data never leave your
            device — there is no upload step, no server-side processing, and no analytics tracking
            your input. The only exceptions are the AI tools (Summarizer, Paraphraser, Translator),
            which forward your prompt to Google Gemma to generate a response.
          </p>
          <p>
            <strong className="text-[var(--color-foreground)]">Always free, no signup.</strong>{" "}
            Every tool is free to use without an account, without a paywall, and without rate
            limits. We don&rsquo;t ask for your email, we don&rsquo;t lock features behind a Pro
            tier, and we don&rsquo;t inject affiliate links. The site loads fast, works on mobile,
            and ships zero third-party trackers.
          </p>
          <p>
            <strong className="text-[var(--color-foreground)]">Categories.</strong>{" "}
            Browse our {CATEGORIES.length} categories — {CATEGORIES.map((c, i) => (
              <span key={c.slug}>
                <Link
                  href={`/tools/${c.slug}`}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {c.name}
                </Link>
                {i === CATEGORIES.length - 1 ? "" : i === CATEGORIES.length - 2 ? " and " : ", "}
              </span>
            ))} — or jump straight to a popular utility like the{" "}
            <Link href="/tools/developer/json-formatter" className="text-[var(--color-accent)] hover:underline">
              JSON Formatter
            </Link>
            ,{" "}
            <Link href="/tools/generators/password-generator" className="text-[var(--color-accent)] hover:underline">
              Password Generator
            </Link>{" "}
            or{" "}
            <Link href="/tools/color/contrast-checker" className="text-[var(--color-accent)] hover:underline">
              WCAG Contrast Checker
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
