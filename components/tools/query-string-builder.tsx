"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, inputCls, Panel } from "@/components/ui/panel";

type Row = { key: string; value: string };

export default function QueryStringBuilder() {
  const [rows, setRows] = useState<Row[]>([
    { key: "q", value: "hello world" },
    { key: "lang", value: "en" },
  ]);
  const [parseInput, setParseInput] = useState("");

  function update(i: number, field: "key" | "value", v: string) {
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, [field]: v } : row)));
  }
  function add() { setRows((r) => [...r, { key: "", value: "" }]); }
  function remove(i: number) { setRows((r) => r.filter((_, idx) => idx !== i)); }

  const queryString = useMemo(() => {
    const sp = new URLSearchParams();
    for (const { key, value } of rows) {
      if (!key) continue;
      sp.append(key, value);
    }
    return "?" + sp.toString();
  }, [rows]);

  function importString() {
    let s = parseInput.trim();
    if (s.startsWith("?")) s = s.slice(1);
    if (!s) return;
    try {
      const sp = new URLSearchParams(s);
      const next: Row[] = [];
      sp.forEach((v, k) => next.push({ key: k, value: v }));
      setRows(next);
    } catch { /* ignore */ }
  }

  return (
    <div className="space-y-4">
      <Panel title="Parameters">
        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="flex gap-2">
              <input value={r.key} onChange={(e) => update(i, "key", e.target.value)} placeholder="key" className={inputCls("flex-1 font-mono")} />
              <input value={r.value} onChange={(e) => update(i, "value", e.target.value)} placeholder="value" className={inputCls("flex-1 font-mono")} />
              <button onClick={() => remove(i)} className={btnGhost("text-xs")}>×</button>
            </div>
          ))}
          <button onClick={add} className={btnGhost("text-xs")}>+ Add row</button>
        </div>
      </Panel>
      <Panel title="Query string" action={<CopyButton value={queryString} />}>
        <code className="block font-mono text-sm break-all py-2">{queryString}</code>
      </Panel>
      <Panel title="Import existing query string">
        <div className="flex gap-2">
          <input value={parseInput} onChange={(e) => setParseInput(e.target.value)} placeholder="?q=hi&lang=en" className={inputCls("flex-1 font-mono")} />
          <button onClick={importString} className={btnGhost("text-xs")}>Parse</button>
        </div>
      </Panel>
    </div>
  );
}
