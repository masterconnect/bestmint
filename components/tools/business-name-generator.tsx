"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

type Style = "modern" | "classic" | "playful" | "tech";

const STYLE_PARTS: Record<Style, { prefix: string[]; suffix: string[] }> = {
  modern: {
    prefix: ["Nova", "Lumen", "Ever", "Aero", "Polar", "Neo", "Vivid", "Atlas", "Lunar", "Echo", "Volt", "Orbit"],
    suffix: ["ly", "ify", "io", "lab", "Studio", "Works", "Co", "Studio", "Hub", "Stack"],
  },
  classic: {
    prefix: ["Royal", "Heritage", "Crown", "Oak", "Ironwood", "Sterling", "Pinewood", "Stonebrook", "Hamilton", "Wellington"],
    suffix: ["& Co", "Holdings", "Trust", "Brothers", "House", "Manor", "Group", "Partners", "Hall"],
  },
  playful: {
    prefix: ["Happy", "Snappy", "Doodle", "Wiggle", "Bouncy", "Giggle", "Zippy", "Jolly", "Funky", "Bubbly"],
    suffix: ["Pop", "Pals", "Bunch", "Party", "Crew", "Friends", "Squad", "Fizz", "Joy", "Land"],
  },
  tech: {
    prefix: ["Quantum", "Cyber", "Bit", "Byte", "Pixel", "Cipher", "Vector", "Matrix", "Synth", "Flux", "Code", "Logic"],
    suffix: ["Labs", "AI", "OS", "Cloud", "Stack", "Ops", "Grid", "Net", "X", "Core", "Forge"],
  },
};

function rd(n: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
function pick<T>(arr: T[]) { return arr[rd(arr.length)]; }
function cap(s: string) { return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s; }

function gen(keyword: string, style: Style) {
  const { prefix, suffix } = STYLE_PARTS[style];
  const k = cap(keyword.trim());
  const ideas = new Set<string>();
  while (ideas.size < 10) {
    const r = rd(5);
    if (k && r < 2) ideas.add(`${k}${pick(suffix)}`);
    else if (k && r < 3) ideas.add(`${pick(prefix)}${k}`);
    else if (k && r < 4) ideas.add(`${k} & ${pick(prefix)}`);
    else ideas.add(`${pick(prefix)}${pick(suffix)}`);
  }
  return Array.from(ideas);
}

export default function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState("Cloud");
  const [style, setStyle] = useState<Style>("modern");
  const [names, setNames] = useState<string[]>(() => gen("Cloud", "modern"));

  function regen() { setNames(gen(keyword, style)); }

  return (
    <div className="space-y-4">
      <Panel title="Inputs">
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Keyword (optional)</span>
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className={inputCls()} placeholder="e.g. Coffee" />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Style</span>
            <select value={style} onChange={(e) => setStyle(e.target.value as Style)} className={inputCls()}>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="playful">Playful</option>
              <option value="tech">Tech</option>
            </select>
          </label>
          <div className="flex items-end"><button onClick={regen} className={btnPrimary("w-full")}>Generate ideas</button></div>
        </div>
      </Panel>
      <Panel title={`${style} ideas`} action={<CopyButton value={names.join("\n")} label="Copy all" />}>
        <ul className="grid sm:grid-cols-2 gap-2">
          {names.map((n, i) => (
            <li key={i} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-base flex items-center justify-between gap-2">
              <span>{n}</span>
              <CopyButton value={n} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
