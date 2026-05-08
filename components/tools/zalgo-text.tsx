"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

// Combining diacritics from U+0300..U+036F
const DIACRITICS: string[] = [];
for (let i = 0x0300; i <= 0x036F; i++) DIACRITICS.push(String.fromCodePoint(i));

function zalgoize(text: string, intensity: number, seed: number): string {
  void seed;
  return [...text].map((c) => {
    if (/\s/.test(c)) return c;
    const count = Math.floor(Math.random() * intensity * 4) + intensity;
    let out = c;
    for (let i = 0; i < count; i++) {
      out += DIACRITICS[Math.floor(Math.random() * DIACRITICS.length)];
    }
    return out;
  }).join("");
}

export default function ZalgoText() {
  const [input, setInput] = useState("Hello, BestMint!");
  const [intensity, setIntensity] = useState(3);
  const [seed, setSeed] = useState(0);
  const output = useMemo(() => zalgoize(input, intensity, seed), [input, intensity, seed]);

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Intensity">
        <label className="block">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Level: {intensity}</span>
          <input type="range" min={1} max={5} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
        </label>
        <button onClick={() => setSeed((s) => s + 1)} className="mt-3 px-3 py-1.5 text-sm rounded border border-[var(--color-border)] hover:border-[var(--color-accent)]">Re-roll</button>
      </Panel>
      <Panel title="Cursed output" action={<CopyButton value={output} />}>
        <div className="font-mono text-base break-all leading-loose">{output}</div>
      </Panel>
    </div>
  );
}
