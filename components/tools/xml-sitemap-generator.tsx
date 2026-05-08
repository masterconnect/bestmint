"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

const FREQS = ["always","hourly","daily","weekly","monthly","yearly","never"] as const;

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export default function XmlSitemapGenerator() {
  const [urls, setUrls] = useState("https://example.com/\nhttps://example.com/about\nhttps://example.com/blog");
  const [lastmod, setLastmod] = useState(new Date().toISOString().slice(0, 10));
  const [changefreq, setChangefreq] = useState<typeof FREQS[number]>("weekly");
  const [priority, setPriority] = useState("0.8");

  const out = useMemo(() => {
    const list = urls.split("\n").map((s) => s.trim()).filter(Boolean);
    if (list.length === 0) return "";
    const body = list.map((u) =>
      `  <url>\n    <loc>${escapeXml(u)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${escapeXml(priority)}</priority>\n  </url>`
    ).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
  }, [urls, lastmod, changefreq, priority]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="URLs & options">
        <Lbl label="URLs (one per line)">
          <textarea value={urls} onChange={(e) => setUrls(e.target.value)} className={textareaCls("min-h-[160px]")} />
        </Lbl>
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          <Lbl label="Last modified (YYYY-MM-DD)"><input value={lastmod} onChange={(e) => setLastmod(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Change frequency">
            <select value={changefreq} onChange={(e) => setChangefreq(e.target.value as typeof FREQS[number])} className={inputCls()}>
              {FREQS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </Lbl>
          <Lbl label="Priority (0.0–1.0)"><input value={priority} onChange={(e) => setPriority(e.target.value)} className={inputCls()} /></Lbl>
        </div>
      </Panel>
      <Panel title="sitemap.xml" action={out ? <CopyButton value={out} /> : null}>
        {out ? (
          <pre className="font-mono text-xs whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 max-h-[480px] overflow-auto">{out}</pre>
        ) : (
          <div className="text-sm text-[var(--color-muted)]">Add at least one URL above.</div>
        )}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
