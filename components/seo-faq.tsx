import { faqJsonLd } from "@/lib/seo/jsonld";
import type { FAQ } from "@/lib/tools/registry";

export function FAQs({ items }: { items: FAQ[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-12 border-t border-[var(--color-border)] pt-10">
      <h2 className="text-xl font-semibold tracking-tight">Frequently asked questions</h2>
      <div className="mt-6 space-y-2">
        {items.map((f, i) => (
          <details
            key={i}
            className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] open:bg-[var(--color-surface-2)] transition"
          >
            <summary className="cursor-pointer list-none flex justify-between items-start gap-4 px-4 py-3 font-medium text-sm">
              <span>{f.q}</span>
              <span className="text-[var(--color-muted)] transition group-open:rotate-180">▾</span>
            </summary>
            <div className="px-4 pb-4 text-sm text-[var(--color-muted)] leading-relaxed">{f.a}</div>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
      />
    </section>
  );
}
