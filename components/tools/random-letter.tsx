"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const VOWELS = "AEIOU";
const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ";
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Filter = "any" | "vowels" | "consonants" | "uppercase" | "lowercase";

function pool(filter: Filter) {
  switch (filter) {
    case "vowels": return VOWELS + VOWELS.toLowerCase();
    case "consonants": return CONSONANTS + CONSONANTS.toLowerCase();
    case "uppercase": return ALPHA;
    case "lowercase": return ALPHA.toLowerCase();
    default: return ALPHA + ALPHA.toLowerCase();
  }
}

function rd(n: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }

export default function RandomLetter() {
  const [count, setCount] = useState(10);
  const [filter, setFilter] = useState<Filter>("any");
  const [letters, setLetters] = useState<string[]>(() => {
    const p = pool("any");
    return Array.from({ length: 10 }, () => p[rd(p.length)]);
  });

  function regen() {
    const p = pool(filter);
    setLetters(Array.from({ length: count }, () => p[rd(p.length)]));
  }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">How many</span>
            <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Filter</span>
            <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)} className={inputCls()}>
              <option value="any">Any letter</option>
              <option value="vowels">Vowels only</option>
              <option value="consonants">Consonants only</option>
              <option value="uppercase">Uppercase only</option>
              <option value="lowercase">Lowercase only</option>
            </select>
          </label>
          <div className="flex items-end"><button onClick={regen} className={btnPrimary("w-full")}>Generate</button></div>
        </div>
      </Panel>
      <Panel title={`Letters (${letters.length})`} action={<CopyButton value={letters.join(" ")} label="Copy all" />}>
        <div className="font-mono text-2xl flex flex-wrap gap-2">
          {letters.map((l, i) => (
            <span key={i} className="inline-flex items-center justify-center w-12 h-12 rounded-md border border-[var(--color-border)]">{l}</span>
          ))}
        </div>
      </Panel>
    </div>
  );
}
