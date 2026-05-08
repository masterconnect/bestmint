"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";


type Mode = "az" | "za" | "lenAsc" | "lenDesc" | "numAsc" | "numDesc" | "shuffle" | "reverse";

export default function TextSorter() {
  const [input, setInput] = useState("banana\napple\ncherry\ndate");
  const [mode, setMode] = useState<Mode>("az");
  const [unique, setUnique] = useState(false);
  const [seed, setSeed] = useState(0);

  const output = useMemo(() => {
    void seed;
    let lines = input.split(/\r?\n/);
    if (unique) {
      const seen = new Set<string>();
      lines = lines.filter((l) => (seen.has(l) ? false : (seen.add(l), true)));
    }
    const num = (s: string) => {
      const m = s.match(/-?\d+(?:\.\d+)?/);
      return m ? parseFloat(m[0]) : Number.NaN;
    };
    switch (mode) {
      case "az": lines = lines.slice().sort((a, b) => a.localeCompare(b)); break;
      case "za": lines = lines.slice().sort((a, b) => b.localeCompare(a)); break;
      case "lenAsc": lines = lines.slice().sort((a, b) => a.length - b.length); break;
      case "lenDesc": lines = lines.slice().sort((a, b) => b.length - a.length); break;
      case "numAsc": lines = lines.slice().sort((a, b) => (num(a) || 0) - (num(b) || 0)); break;
      case "numDesc": lines = lines.slice().sort((a, b) => (num(b) || 0) - (num(a) || 0)); break;
      case "reverse": lines = lines.slice().reverse(); break;
      case "shuffle": {
        const arr = lines.slice();
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        lines = arr;
        break;
      }
    }
    return lines.join("\n");
  }, [input, mode, unique, seed]);

  return (
    <div className="space-y-4">
      <Panel title="Input lines">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Options">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Sort mode</span>
            <select value={mode} onChange={(e) => setMode(e.target.value as Mode)} className={inputCls()}>
              <option value="az">A → Z (alphabetical)</option>
              <option value="za">Z → A (reverse alphabetical)</option>
              <option value="lenAsc">Length ascending</option>
              <option value="lenDesc">Length descending</option>
              <option value="numAsc">Numeric ascending</option>
              <option value="numDesc">Numeric descending</option>
              <option value="shuffle">Random shuffle</option>
              <option value="reverse">Reverse order</option>
            </select>
          </label>
          <label className="flex items-end gap-2 pb-1">
            <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="accent-[var(--color-accent)]" />
            <span className="text-sm">Remove duplicates</span>
          </label>
        </div>
        {mode === "shuffle" && (
          <button onClick={() => setSeed((s) => s + 1)} className="mt-3 px-3 py-1.5 text-sm rounded border border-[var(--color-border)] hover:border-[var(--color-accent)]">Re-shuffle</button>
        )}
      </Panel>
      <Panel title="Sorted output" action={<CopyButton value={output} />}>
        <textarea readOnly value={output} className={textareaCls()} />
      </Panel>
    </div>
  );
}
