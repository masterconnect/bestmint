"use client";
import { useState } from "react";
import { ulid } from "ulid";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

export default function UlidGenerator() {
  const [count, setCount] = useState(8);
  const [ids, setIds] = useState<string[]>(() => Array.from({ length: 8 }, () => ulid()));

  function regen() { setIds(Array.from({ length: count }, () => ulid())); }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="flex items-end gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">How many</span>
            <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} className={inputCls("w-32")} />
          </label>
          <button onClick={regen} className={btnPrimary()}>Generate</button>
          <CopyButton value={ids.join("\n")} label="Copy all" className="px-3 py-2" />
        </div>
      </Panel>
      <Panel title={`ULIDs — ${ids.length}`}>
        <ul className="font-mono text-sm space-y-1">
          {ids.map((id) => (
            <li key={id} className="flex items-center gap-3 rounded-md border border-[var(--color-border)] px-3 py-1.5">
              <span className="flex-1 break-all">{id}</span>
              <CopyButton value={id} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
