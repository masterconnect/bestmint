"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, inputCls, Panel } from "@/components/ui/panel";

interface Row { lang: string; url: string; }

export default function HreflangGenerator() {
  const [rows, setRows] = useState<Row[]>([
    { lang: "en", url: "https://example.com/" },
    { lang: "fr", url: "https://example.com/fr/" },
    { lang: "de", url: "https://example.com/de/" },
  ]);
  const [xDefault, setXDefault] = useState("https://example.com/");

  function update(i: number, fn: (r: Row) => Row) { setRows(rows.map((r, idx) => idx === i ? fn(r) : r)); }

  const out = useMemo(() => {
    const lines = rows.filter((r) => r.lang && r.url).map((r) => `<link rel="alternate" hreflang="${r.lang}" href="${r.url}">`);
    if (xDefault) lines.push(`<link rel="alternate" hreflang="x-default" href="${xDefault}">`);
    return lines.join("\n");
  }, [rows, xDefault]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Locales">
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[100px_1fr_auto] gap-2 items-center">
              <input value={r.lang} onChange={(e) => update(i, (rr) => ({ ...rr, lang: e.target.value }))} placeholder="en-US" className={inputCls("font-mono")} />
              <input value={r.url} onChange={(e) => update(i, (rr) => ({ ...rr, url: e.target.value }))} placeholder="https://example.com/" className={inputCls()} />
              <button onClick={() => setRows(rows.filter((_, idx) => idx !== i))} disabled={rows.length === 1} className={btnGhost("text-xs disabled:opacity-40")}>×</button>
            </div>
          ))}
        </div>
        <button onClick={() => setRows([...rows, { lang: "", url: "" }])} className={btnGhost("text-xs mt-3")}>+ Add locale</button>
        <label className="block mt-4"><span className="block text-xs text-[var(--color-muted)] mb-1">x-default URL (optional)</span>
          <input value={xDefault} onChange={(e) => setXDefault(e.target.value)} className={inputCls()} />
        </label>
      </Panel>
      <Panel title="<head> snippet" action={<CopyButton value={out} />}>
        <pre className="font-mono text-xs whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 max-h-[480px] overflow-auto">{out || <span className="text-[var(--color-muted)]">Add at least one locale.</span>}</pre>
      </Panel>
    </div>
  );
}
