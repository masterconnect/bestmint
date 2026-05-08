"use client";
import { useMemo, useState } from "react";
import { Panel, textareaCls } from "@/components/ui/panel";

const VALID_FREQ = new Set(["always","hourly","daily","weekly","monthly","yearly","never"]);

interface Check { label: string; ok: boolean; detail?: string; }

function validate(xml: string): { checks: Check[]; urlCount: number } {
  const checks: Check[] = [];
  if (!xml.trim()) return { checks: [{ label: "Has input", ok: false }], urlCount: 0 };
  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(xml, "application/xml");
  } catch {
    return { checks: [{ label: "Well-formed XML", ok: false }], urlCount: 0 };
  }
  const parserError = doc.querySelector("parsererror");
  checks.push({ label: "Well-formed XML", ok: !parserError, detail: parserError?.textContent?.slice(0, 160) });
  if (parserError) return { checks, urlCount: 0 };

  const urlset = doc.querySelector("urlset");
  checks.push({ label: "Has <urlset> root", ok: !!urlset });
  if (!urlset) return { checks, urlCount: 0 };

  const ns = urlset.getAttribute("xmlns") || "";
  checks.push({ label: "Sitemap namespace", ok: ns.includes("sitemaps.org/schemas/sitemap"), detail: ns });

  const urls = Array.from(urlset.querySelectorAll("url"));
  checks.push({ label: `URL count ≥ 1`, ok: urls.length > 0, detail: `${urls.length} url elements` });

  let missingLoc = 0, badFreq = 0, badPriority = 0, badLastmod = 0;
  const isoRe = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;
  for (const u of urls) {
    const loc = u.querySelector("loc")?.textContent?.trim();
    if (!loc) missingLoc++;
    const cf = u.querySelector("changefreq")?.textContent?.trim();
    if (cf && !VALID_FREQ.has(cf.toLowerCase())) badFreq++;
    const pr = u.querySelector("priority")?.textContent?.trim();
    if (pr) {
      const n = Number(pr);
      if (!Number.isFinite(n) || n < 0 || n > 1) badPriority++;
    }
    const lm = u.querySelector("lastmod")?.textContent?.trim();
    if (lm && !isoRe.test(lm)) badLastmod++;
  }
  checks.push({ label: "All <url> have <loc>", ok: missingLoc === 0, detail: missingLoc ? `${missingLoc} missing` : undefined });
  checks.push({ label: "Valid changefreq values", ok: badFreq === 0, detail: badFreq ? `${badFreq} invalid` : undefined });
  checks.push({ label: "Priority in 0.0–1.0", ok: badPriority === 0, detail: badPriority ? `${badPriority} out of range` : undefined });
  checks.push({ label: "Lastmod is ISO date", ok: badLastmod === 0, detail: badLastmod ? `${badLastmod} not ISO` : undefined });

  return { checks, urlCount: urls.length };
}

export default function SitemapValidator() {
  const [xml, setXml] = useState("");
  const result = useMemo(() => validate(xml), [xml]);

  return (
    <div className="space-y-4">
      <Panel title="Paste sitemap.xml">
        <textarea value={xml} onChange={(e) => setXml(e.target.value)} placeholder="<?xml version='1.0' encoding='UTF-8'?>…" className={textareaCls("min-h-[180px]")} />
      </Panel>
      <Panel title={`Validation (${result.urlCount} URL${result.urlCount === 1 ? "" : "s"})`}>
        {xml.trim() === "" ? (
          <div className="text-sm text-[var(--color-muted)]">Paste a sitemap to validate.</div>
        ) : (
          <ul className="space-y-2 text-sm">
            {result.checks.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={`mt-0.5 inline-block w-4 ${c.ok ? "text-emerald-400" : "text-red-400"}`}>{c.ok ? "✓" : "✗"}</span>
                <span>
                  <span className="font-medium">{c.label}</span>
                  {c.detail && <span className="ml-2 text-[var(--color-muted)] font-mono text-xs">{c.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
