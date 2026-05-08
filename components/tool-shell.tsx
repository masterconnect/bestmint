import Link from "next/link";
import { CATEGORY_BY_SLUG } from "@/lib/tools/categories";
import { relatedTools, type Tool } from "@/lib/tools/registry";
import { FAQs } from "@/components/seo-faq";
import { SITE } from "@/lib/site";
import { breadcrumbsJsonLd, toolJsonLd } from "@/lib/seo/jsonld";

interface ToolShellProps {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolShell({ tool, children }: ToolShellProps) {
  const category = CATEGORY_BY_SLUG[tool.category];
  const related = relatedTools(tool);
  const breadcrumbs = [
    { name: "Home", url: SITE.url },
    { name: "Tools", url: `${SITE.url}/tools/${category.slug}` },
    { name: category.name, url: `${SITE.url}/tools/${category.slug}` },
    { name: tool.name, url: `${SITE.url}/tools/${category.slug}/${tool.slug}` },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-[var(--color-muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-[var(--color-foreground)]">Home</Link></li>
          <li>/</li>
          <li>
            <Link href={`/tools/${category.slug}`} className="hover:text-[var(--color-foreground)]">
              {category.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-[var(--color-foreground)]">{tool.name}</li>
        </ol>
      </nav>

      <header className="mt-6 flex items-start gap-4">
        <span
          className="flex-none h-12 w-12 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `color-mix(in srgb, ${category.accent} 18%, transparent)`, color: category.accent }}
          aria-hidden="true"
        >
          {tool.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{tool.name}</h1>
          <p className="mt-2 text-[var(--color-muted)]">{tool.tagline}</p>
        </div>
      </header>

      <p className="mt-6 text-sm text-[var(--color-muted)] leading-relaxed">{tool.summary}</p>

      <section className="mt-8">{children}</section>

      <FAQs items={tool.faqs} />

      <section className="mt-12 border-t border-[var(--color-border)] pt-10">
        <h2 className="text-xl font-semibold tracking-tight">Related tools</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {related.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.category}/${t.slug}`}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-accent)]/60 transition"
            >
              <div className="text-lg">{t.icon}</div>
              <div className="mt-2 font-medium text-sm">{t.name}</div>
              <div className="mt-1 text-xs text-[var(--color-muted)] line-clamp-2">{t.tagline}</div>
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd(tool)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(breadcrumbs)) }}
      />
    </article>
  );
}
