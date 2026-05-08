"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, inputCls, Panel, textareaCls } from "@/components/ui/panel";

interface Item { q: string; a: string; }

export default function FaqJsonLd() {
  const [items, setItems] = useState<Item[]>([
    { q: "Is BestMint free?", a: "Yes — every tool is free and runs in your browser." },
    { q: "Do you store my data?", a: "No, processing happens locally and nothing leaves your device unless explicitly noted." },
  ]);

  function update(i: number, fn: (x: Item) => Item) { setItems(items.map((x, idx) => idx === i ? fn(x) : x)); }

  const out = useMemo(() => {
    const json = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.filter((x) => x.q).map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    };
    return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
  }, [items]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Q&A">
        <div className="space-y-3">
          {items.map((x, i) => (
            <div key={i} className="rounded-md border border-[var(--color-border)] p-3 space-y-2">
              <input value={x.q} onChange={(e) => update(i, (xx) => ({ ...xx, q: e.target.value }))} placeholder="Question" className={inputCls()} />
              <textarea value={x.a} onChange={(e) => update(i, (xx) => ({ ...xx, a: e.target.value }))} placeholder="Answer" className={textareaCls("min-h-[80px]")} />
              <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} disabled={items.length === 1} className="text-xs text-red-400 disabled:opacity-40">Remove</button>
            </div>
          ))}
        </div>
        <button onClick={() => setItems([...items, { q: "", a: "" }])} className={btnGhost("text-xs mt-3")}>+ Add Q&A</button>
      </Panel>
      <Panel title="JSON-LD" action={<CopyButton value={out} />}>
        <pre className="font-mono text-xs whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 max-h-[480px] overflow-auto">{out}</pre>
      </Panel>
    </div>
  );
}
