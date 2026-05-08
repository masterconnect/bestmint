"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

function pin(len: number) {
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  let out = "";
  for (let i = 0; i < len; i++) out += (arr[i] % 10).toString();
  return out;
}

export default function PinGenerator() {
  const [length, setLength] = useState(6);
  const [count, setCount] = useState(10);
  const [pins, setPins] = useState<string[]>(() => Array.from({ length: 10 }, () => pin(6)));

  function regen() { setPins(Array.from({ length: count }, () => pin(length))); }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="flex items-end gap-3 flex-wrap">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Length (4-12)</span>
            <input type="number" min={4} max={12} value={length} onChange={(e) => setLength(Math.max(4, Math.min(12, Number(e.target.value) || 6)))} className={inputCls("w-32")} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">How many</span>
            <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} className={inputCls("w-32")} />
          </label>
          <button onClick={regen} className={btnPrimary()}>Generate</button>
          <CopyButton value={pins.join("\n")} label="Copy all" className="px-3 py-2" />
        </div>
      </Panel>
      <Panel title={`PINs — ${pins.length}`}>
        <div className="font-mono text-base grid grid-cols-3 sm:grid-cols-5 gap-2">
          {pins.map((p, i) => (
            <span key={i} className="rounded-md border border-[var(--color-border)] px-2 py-1.5 text-center tracking-wider">{p}</span>
          ))}
        </div>
      </Panel>
    </div>
  );
}
