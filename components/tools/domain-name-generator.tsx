"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const PREFIX = ["get", "try", "go", "use", "join", "my", "the", "hi", "yo", "build"];
const SUFFIX = ["hq", "io", "app", "labs", "stack", "kit", "now", "go", "x", "ly", "hub", "loop", "studio"];
const TLDS = [".com", ".io", ".ai", ".dev", ".app", ".co", ".net", ".xyz", ".tech"];

function rd(n: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
function pick<T>(arr: T[]) { return arr[rd(arr.length)]; }
function clean(s: string) { return s.toLowerCase().replace(/[^a-z0-9]/g, ""); }

function gen(keyword: string, tlds: string[]) {
  const k = clean(keyword);
  if (!k) return [];
  const stems = new Set<string>([
    k,
    `${pick(PREFIX)}${k}`,
    `${k}${pick(SUFFIX)}`,
    `${pick(PREFIX)}${k}${pick(SUFFIX)}`,
    `${k}${pick(SUFFIX)}`,
    `${pick(PREFIX)}${k}`,
    `${k}ly`,
    `${k}hq`,
    `my${k}`,
    `the${k}`,
    `${k}${pick(SUFFIX)}`,
    `${k}stack`,
  ]);
  const results: string[] = [];
  for (const stem of stems) {
    for (const tld of tlds) {
      results.push(`${stem}${tld}`);
      if (results.length >= 30) break;
    }
    if (results.length >= 30) break;
  }
  return results;
}

export default function DomainNameGenerator() {
  const [keyword, setKeyword] = useState("cloud");
  const [tlds, setTlds] = useState<string[]>([".com", ".io", ".ai", ".dev"]);
  const [out, setOut] = useState<string[]>(() => gen("cloud", [".com", ".io", ".ai", ".dev"]));

  function toggleTld(t: string) {
    setTlds((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
  }

  function regen() { setOut(gen(keyword, tlds.length ? tlds : [".com"])); }

  return (
    <div className="space-y-4">
      <Panel title="Inputs">
        <label className="block">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Keyword</span>
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className={inputCls()} placeholder="e.g. coffee, trip, code" />
        </label>
        <div className="mt-3">
          <span className="block text-xs text-[var(--color-muted)] mb-1">TLDs</span>
          <div className="flex flex-wrap gap-2">
            {TLDS.map((t) => (
              <label key={t} className={`px-3 py-1 rounded-md border cursor-pointer text-sm ${tlds.includes(t) ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)]"}`}>
                <input type="checkbox" checked={tlds.includes(t)} onChange={() => toggleTld(t)} className="hidden" />
                {t}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-3"><button onClick={regen} className={btnPrimary()}>Generate domains</button></div>
      </Panel>
      <Panel title={`Domain ideas (${out.length})`} action={<CopyButton value={out.join("\n")} label="Copy all" />}>
        <ul className="font-mono text-sm grid sm:grid-cols-2 gap-2">
          {out.map((d, i) => (
            <li key={i} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 flex items-center justify-between gap-2">
              <span className="truncate">{d}</span>
              <CopyButton value={d} />
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-[var(--color-muted)]">Availability not checked — verify with your registrar before purchase.</p>
      </Panel>
    </div>
  );
}
