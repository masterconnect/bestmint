"use client";
import { useState } from "react";
import { customAlphabet, nanoid } from "nanoid";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

export default function NanoidGenerator() {
  const [size, setSize] = useState(21);
  const [count, setCount] = useState(8);
  const [useCustom, setUseCustom] = useState(false);
  const [alphabet, setAlphabet] = useState("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const [ids, setIds] = useState<string[]>(() => Array.from({ length: 8 }, () => nanoid(21)));

  function regen() {
    const gen = useCustom && alphabet.length > 1 ? customAlphabet(alphabet, size) : () => nanoid(size);
    setIds(Array.from({ length: count }, () => gen()));
  }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Size</span>
            <input type="number" min={1} max={64} value={size} onChange={(e) => setSize(Math.max(1, Math.min(64, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Count</span>
            <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
          <div className="flex items-end"><button onClick={regen} className={btnPrimary("w-full")}>Generate</button></div>
        </div>
        <div className="mt-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={useCustom} onChange={(e) => setUseCustom(e.target.checked)} className="accent-[var(--color-accent)]" />
            Custom alphabet
          </label>
          {useCustom && (
            <input value={alphabet} onChange={(e) => setAlphabet(e.target.value)} className={inputCls("mt-2 font-mono")} placeholder="characters to use" />
          )}
        </div>
      </Panel>
      <Panel title={`IDs (${ids.length})`} action={<CopyButton value={ids.join("\n")} label="Copy all" />}>
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
