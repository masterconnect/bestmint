"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

// Approximate conversion tables (men's). Each row: [US, UK, EU, JP cm]
const MEN = [
  [6, 5.5, 38.5, 24],
  [6.5, 6, 39, 24.5],
  [7, 6.5, 40, 25],
  [7.5, 7, 40.5, 25.5],
  [8, 7.5, 41, 26],
  [8.5, 8, 42, 26.5],
  [9, 8.5, 42.5, 27],
  [9.5, 9, 43, 27.5],
  [10, 9.5, 44, 28],
  [10.5, 10, 44.5, 28.5],
  [11, 10.5, 45, 29],
  [11.5, 11, 45.5, 29.5],
  [12, 11.5, 46, 30],
  [13, 12.5, 47, 31],
];
const WOMEN = [
  [5, 2.5, 35, 22],
  [5.5, 3, 35.5, 22.5],
  [6, 3.5, 36, 23],
  [6.5, 4, 37, 23.5],
  [7, 4.5, 37.5, 24],
  [7.5, 5, 38, 24.5],
  [8, 5.5, 38.5, 25],
  [8.5, 6, 39, 25.5],
  [9, 6.5, 40, 26],
  [9.5, 7, 40.5, 26.5],
  [10, 7.5, 41, 27],
  [11, 8.5, 42, 28],
];
const KIDS = [
  [10, 9.5, 27, 16],
  [11, 10.5, 28.5, 17],
  [12, 11.5, 30, 18],
  [13, 12.5, 31, 19],
  [1, 13.5, 32, 20],
  [2, 1, 33.5, 21],
  [3, 2, 35, 22],
];

const TABLES: Record<string, number[][]> = { Men: MEN, Women: WOMEN, Kids: KIDS };
const COLS = ["US", "UK", "EU", "JP (cm)"];

export default function ShoeSizeConverter() {
  const [gender, setGender] = useState<keyof typeof TABLES>("Men");
  const [system, setSystem] = useState(0);
  const [size, setSize] = useState(9);
  const table = TABLES[gender];

  const matched = useMemo(() => {
    let best = table[0]; let bestDiff = Math.abs(table[0][system] - size);
    for (const r of table) {
      const d = Math.abs(r[system] - size);
      if (d < bestDiff) { best = r; bestDiff = d; }
    }
    return best;
  }, [table, system, size]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <div className="flex gap-2 mb-3">
          {Object.keys(TABLES).map((g) => (
            <button key={g} onClick={() => setGender(g as keyof typeof TABLES)} className={`px-3 py-1.5 rounded-md text-sm border ${gender === g ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}>{g}</button>
          ))}
        </div>
        <Lbl label="Input system">
          <select value={system} onChange={(e) => setSystem(Number(e.target.value))} className={inputCls()}>
            {COLS.map((c, i) => <option key={c} value={i}>{c}</option>)}
          </select>
        </Lbl>
        <Lbl label="Size">
          <input type="number" step="0.5" min={0} value={size} onChange={(e) => setSize(Number(e.target.value))} className={inputCls("font-mono")} />
        </Lbl>
      </Panel>
      <Panel title="Equivalents (closest)">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {COLS.map((c, i) => (
            <div key={c} className={`rounded-md border px-3 py-2 ${i === system ? "border-[var(--color-accent)]" : "border-[var(--color-border)]"}`}>
              <div className="text-xs text-[var(--color-muted)]">{c}</div>
              <div className="text-2xl font-bold tabular-nums">{matched[i]}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">Conversions are approximate — sizes vary by brand.</p>
      </Panel>
      <div className="lg:col-span-2">
        <Panel title={`${gender} reference table`}>
          <div className="overflow-auto">
            <table className="w-full text-sm tabular-nums">
              <thead className="text-[var(--color-muted)]">
                <tr>{COLS.map((c) => <th key={c} className="text-left p-2">{c}</th>)}</tr>
              </thead>
              <tbody>
                {table.map((r, i) => (
                  <tr key={i} className="border-t border-[var(--color-border)]">
                    {r.map((v, j) => <td key={j} className="p-2">{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
