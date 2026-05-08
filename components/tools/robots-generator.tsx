"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, inputCls, Panel } from "@/components/ui/panel";

interface Rule { agent: string; allow: string[]; disallow: string[]; }

export default function RobotsGenerator() {
  const [rules, setRules] = useState<Rule[]>([{ agent: "*", allow: ["/"], disallow: ["/admin", "/api/private"] }]);
  const [sitemap, setSitemap] = useState("https://bestmint.com/sitemap.xml");

  const output = rules.map((r) => {
    const lines = [`User-agent: ${r.agent}`];
    for (const p of r.allow) if (p) lines.push(`Allow: ${p}`);
    for (const p of r.disallow) if (p) lines.push(`Disallow: ${p}`);
    return lines.join("\n");
  }).join("\n\n") + (sitemap ? `\n\nSitemap: ${sitemap}` : "");

  function update(idx: number, fn: (r: Rule) => Rule) { setRules(rules.map((r, i) => i === idx ? fn(r) : r)); }

  return (
    <div className="space-y-4">
      <Panel title="Rules">
        <div className="space-y-3">
          {rules.map((r, i) => (
            <div key={i} className="rounded-md border border-[var(--color-border)] p-3 space-y-2">
              <Lbl label="User-agent"><input value={r.agent} onChange={(e) => update(i, (rr) => ({ ...rr, agent: e.target.value }))} className={inputCls("font-mono")} /></Lbl>
              <Lbl label="Allow (one path per line)"><textarea value={r.allow.join("\n")} onChange={(e) => update(i, (rr) => ({ ...rr, allow: e.target.value.split("\n") }))} className={inputCls("font-mono min-h-[60px]")} /></Lbl>
              <Lbl label="Disallow (one path per line)"><textarea value={r.disallow.join("\n")} onChange={(e) => update(i, (rr) => ({ ...rr, disallow: e.target.value.split("\n") }))} className={inputCls("font-mono min-h-[60px]")} /></Lbl>
              {rules.length > 1 && <button onClick={() => setRules(rules.filter((_, idx) => idx !== i))} className="text-sm text-red-400">Remove</button>}
            </div>
          ))}
        </div>
        <button className={btnGhost("text-xs mt-3")} onClick={() => setRules([...rules, { agent: "Googlebot", allow: ["/"], disallow: [] }])}>+ Add rule block</button>
        <Lbl label="Sitemap URL" className="mt-3"><input value={sitemap} onChange={(e) => setSitemap(e.target.value)} className={inputCls()} /></Lbl>
      </Panel>
      <Panel title="robots.txt" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">{output}</pre>
      </Panel>
    </div>
  );
}

function Lbl({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
