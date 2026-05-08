"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, inputCls, Panel } from "@/components/ui/panel";

interface Crumb { name: string; url: string; }

export default function BreadcrumbJsonLd() {
  const [crumbs, setCrumbs] = useState<Crumb[]>([
    { name: "Home", url: "https://example.com/" },
    { name: "Blog", url: "https://example.com/blog" },
    { name: "Article", url: "https://example.com/blog/article" },
  ]);

  function update(i: number, fn: (c: Crumb) => Crumb) { setCrumbs(crumbs.map((c, idx) => idx === i ? fn(c) : c)); }

  const out = useMemo(() => {
    const list = crumbs.filter((c) => c.name);
    const json = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: list.map((c, i) => ({
        "@type": "ListItem", position: i + 1, name: c.name, item: c.url || undefined,
      })),
    };
    return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
  }, [crumbs]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Crumbs">
        <div className="space-y-2">
          {crumbs.map((c, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
              <input value={c.name} onChange={(e) => update(i, (cc) => ({ ...cc, name: e.target.value }))} placeholder="Name" className={inputCls()} />
              <input value={c.url} onChange={(e) => update(i, (cc) => ({ ...cc, url: e.target.value }))} placeholder="https://…" className={inputCls()} />
              <button onClick={() => setCrumbs(crumbs.filter((_, idx) => idx !== i))} disabled={crumbs.length === 1} className={btnGhost("text-xs disabled:opacity-40")}>×</button>
            </div>
          ))}
        </div>
        <button onClick={() => setCrumbs([...crumbs, { name: "", url: "" }])} className={btnGhost("text-xs mt-3")}>+ Add crumb</button>
      </Panel>
      <Panel title="JSON-LD" action={<CopyButton value={out} />}>
        <pre className="font-mono text-xs whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 max-h-[480px] overflow-auto">{out}</pre>
      </Panel>
    </div>
  );
}
