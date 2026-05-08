"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const ALPHA = "abcdefghijklmnopqrstuvwxyz0123456789";

function cuid2(length = 24) {
  // CUID2-style: lowercase letter + base36 random tail
  const buf = new Uint8Array(length * 2);
  crypto.getRandomValues(buf);
  let out = "";
  // Start with a letter
  const letters = "abcdefghijklmnopqrstuvwxyz";
  out += letters[buf[0] % letters.length];
  // Mix timestamp with random bytes
  let t = Date.now();
  for (let i = 0; out.length < length; i++) {
    if (i < 8) {
      out += ALPHA[t % 36];
      t = Math.floor(t / 36);
    } else {
      out += ALPHA[buf[i] % ALPHA.length];
    }
  }
  return out.slice(0, length);
}

export default function CuidGenerator() {
  const [count, setCount] = useState(8);
  const [length, setLength] = useState(24);
  const [ids, setIds] = useState<string[]>(() => Array.from({ length: 8 }, () => cuid2(24)));

  function regen() { setIds(Array.from({ length: count }, () => cuid2(length))); }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="flex items-end gap-3 flex-wrap">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Length</span>
            <input type="number" min={8} max={64} value={length} onChange={(e) => setLength(Math.max(8, Math.min(64, Number(e.target.value) || 24)))} className={inputCls("w-32")} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">How many</span>
            <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} className={inputCls("w-32")} />
          </label>
          <button onClick={regen} className={btnPrimary()}>Generate</button>
          <CopyButton value={ids.join("\n")} label="Copy all" className="px-3 py-2" />
        </div>
      </Panel>
      <Panel title={`CUIDs — ${ids.length}`}>
        <ul className="font-mono text-sm space-y-1">
          {ids.map((id, i) => (
            <li key={i} className="flex items-center gap-3 rounded-md border border-[var(--color-border)] px-3 py-1.5">
              <span className="flex-1 break-all">{id}</span>
              <CopyButton value={id} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
