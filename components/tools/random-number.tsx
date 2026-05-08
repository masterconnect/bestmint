"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

function rngInt(min: number, max: number) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0] % (max - min + 1));
}

function rngFloat(min: number, max: number, decimals: number) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  const v = min + (arr[0] / 0x100000000) * (max - min);
  return Number(v.toFixed(decimals));
}

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(10);
  const [type, setType] = useState<"int" | "float">("int");
  const [unique, setUnique] = useState(false);
  const [decimals, setDecimals] = useState(2);
  const [out, setOut] = useState<number[]>([]);

  function gen() {
    const result: number[] = [];
    const seen = new Set<number>();
    let attempts = 0;
    while (result.length < count && attempts < count * 50) {
      const v = type === "int" ? rngInt(min, max) : rngFloat(min, max, decimals);
      if (unique) {
        if (!seen.has(v)) { seen.add(v); result.push(v); }
      } else result.push(v);
      attempts++;
    }
    setOut(result);
  }

  return (
    <div className="space-y-4">
      <Panel title="Range & options">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Lbl label="Min"><input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className={inputCls()} /></Lbl>
          <Lbl label="Max"><input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className={inputCls()} /></Lbl>
          <Lbl label="How many"><input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Number(e.target.value))} className={inputCls()} /></Lbl>
          <Lbl label="Type">
            <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className={inputCls()}>
              <option value="int">Integer</option>
              <option value="float">Decimal</option>
            </select>
          </Lbl>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="accent-[var(--color-accent)]" />
            Unique values only
          </label>
          {type === "float" && (
            <label className="flex items-center gap-2 text-sm">
              <span className="text-[var(--color-muted)]">Decimals</span>
              <input type="number" min={0} max={10} value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} className={inputCls("w-20")} />
            </label>
          )}
          <button className={btnPrimary("ml-auto")} onClick={gen}>Generate</button>
        </div>
      </Panel>
      {out.length > 0 && (
        <Panel title={`Numbers (${out.length})`} action={<CopyButton value={out.join("\n")} label="Copy all" />}>
          <div className="font-mono text-sm grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {out.map((n, i) => <span key={i} className="rounded border border-[var(--color-border)] px-2 py-1 text-center">{n}</span>)}
          </div>
        </Panel>
      )}
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>
      {children}
    </label>
  );
}
