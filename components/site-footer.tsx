import Link from "next/link";
import { CATEGORIES } from "@/lib/tools/categories";
import { SITE } from "@/lib/site";

export function SiteFooter() {
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
          </div>
          {CATEGORIES.slice(0, 3).map((c) => (
            <FooterCol key={c.slug} title={c.name} href={`/tools/${c.slug}`} />
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} {SITE.name}. All tools run in your browser.</p>
          <div className="flex gap-4">
            <Link href="/sitemap.xml" className="hover:text-[var(--color-foreground)]">Sitemap</Link>
            <Link href="/robots.txt" className="hover:text-[var(--color-foreground)]">Robots</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, href }: { title: string; href: string }) {
  return (
    <div>
      <Link href={href} className="font-medium text-sm hover:text-[var(--color-accent)]">{title}</Link>
    </div>
  );
}
