import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORY_BY_SLUG, CATEGORIES, type CategorySlug } from "@/lib/tools/categories";
import { toolsByCategory } from "@/lib/tools/registry";
import { metadataForCategory } from "@/lib/seo/metadata";
import { breadcrumbsJsonLd, categoryCollectionJsonLd } from "@/lib/seo/jsonld";
import { FAQs } from "@/components/seo-faq";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORY_BY_SLUG[category as CategorySlug];
  if (!cat) return {};
  return metadataForCategory(cat);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORY_BY_SLUG[category as CategorySlug];
  if (!cat) notFound();
  const tools = toolsByCategory(cat.slug);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== cat.slug);

  const breadcrumbs = [
    { name: "Home", url: SITE.url },
    { name: cat.name, url: `${SITE.url}/tools/${cat.slug}` },
  ];
  const collection = categoryCollectionJsonLd(
    cat,
    tools.map((t) => ({
      name: t.name,
      url: `${SITE.url}/tools/${cat.slug}/${t.slug}`,
    })),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-[var(--color-muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-[var(--color-foreground)]">Home</Link></li>
          <li>/</li>
          <li className="text-[var(--color-foreground)]">{cat.name}</li>
        </ol>
      </nav>
      <header className="mt-6 flex items-start gap-3">
        <span className="cat-bar mt-3" style={{ background: cat.accent }} />
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Free {cat.name} Tools Online
          </h1>
          <p className="mt-2 text-[var(--color-muted)] max-w-2xl">{cat.description}</p>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            {tools.length} free tools · No signup · Runs in your browser
          </p>
        </div>
      </header>

      <section className="mt-10" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="sr-only">All {cat.name} tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.category}/${t.slug}`}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-accent)]/60 transition"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-lg flex-none"
                  style={{ background: `color-mix(in srgb, ${cat.accent} 18%, transparent)`, color: cat.accent }}
                  aria-hidden="true"
                >
                  {t.icon}
                </span>
                <h3 className="font-semibold tracking-tight group-hover:text-[var(--color-accent)]">{t.name}</h3>
              </div>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{t.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="about-heading">
        <h2 id="about-heading" className="text-2xl font-semibold tracking-tight">
          About our {cat.name.toLowerCase()} tools
        </h2>
        <div className="mt-6 space-y-4 text-[var(--color-muted)] leading-relaxed">
          {cat.intro.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="included-heading">
        <h2 id="included-heading" className="text-2xl font-semibold tracking-tight">
          What&rsquo;s included in this category
        </h2>
        <ul className="mt-6 space-y-4">
          {tools.map((t) => (
            <li key={t.slug} className="flex items-start gap-3">
              <span
                className="h-8 w-8 rounded-md flex items-center justify-center text-sm flex-none mt-0.5"
                style={{ background: `color-mix(in srgb, ${cat.accent} 18%, transparent)`, color: cat.accent }}
                aria-hidden="true"
              >
                {t.icon}
              </span>
              <div>
                <Link
                  href={`/tools/${t.category}/${t.slug}`}
                  className="font-medium hover:text-[var(--color-accent)]"
                >
                  {t.name}
                </Link>
                <span className="text-[var(--color-muted)]"> — {t.tagline}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <FAQs items={cat.faqs} />

      <section className="mt-16 border-t border-[var(--color-border)] pt-10" aria-labelledby="other-cats-heading">
        <h2 id="other-cats-heading" className="text-xl font-semibold tracking-tight">
          Browse other categories
        </h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {otherCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/tools/${c.slug}`}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)] transition"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(breadcrumbs)) }}
      />
    </div>
  );
}
