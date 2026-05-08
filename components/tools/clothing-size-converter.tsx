"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

// Each table row: [US, UK, EU, Numeric/letter]
const TABLES: Record<string, { rows: (string | number)[][]; cols: string[] }> = {
  "Men shirt": {
    cols: ["US/Letter", "UK", "EU", "Neck (cm)"],
    rows: [
      ["XS", "XS", 44, 36],
      ["S", "S", 46, 38],
      ["M", "M", 48, 40],
      ["L", "L", 50, 42],
      ["XL", "XL", 52, 44],
      ["XXL", "XXL", 54, 46],
    ],
  },
  "Men pants": {
    cols: ["US (waist in)", "UK", "EU", "Numeric"],
    rows: [
      [28, 28, 44, 36],
      [30, 30, 46, 38],
      [32, 32, 48, 40],
      [34, 34, 50, 42],
      [36, 36, 52, 44],
      [38, 38, 54, 46],
      [40, 40, 56, 48],
    ],
  },
  "Women shirt": {
    cols: ["US", "UK", "EU", "Letter"],
    rows: [
      [2, 6, 32, "XS"],
      [4, 8, 34, "S"],
      [6, 10, 36, "S"],
      [8, 12, 38, "M"],
      [10, 14, 40, "M"],
      [12, 16, 42, "L"],
      [14, 18, 44, "L"],
      [16, 20, 46, "XL"],
    ],
  },
  "Women pants": {
    cols: ["US", "UK", "EU", "Numeric"],
    rows: [
      [0, 4, 32, 24],
      [2, 6, 34, 25],
      [4, 8, 36, 27],
      [6, 10, 38, 28],
      [8, 12, 40, 29],
      [10, 14, 42, 30],
      [12, 16, 44, 32],
      [14, 18, 46, 33],
    ],
  },
};

export default function ClothingSizeConverter() {
  const [type, setType] = useState<keyof typeof TABLES>("Men shirt");
  const t = TABLES[type];
  const [col, setCol] = useState(0);
  const [size, setSize] = useState<string>(String(t.rows[2][0]));

  const matched = useMemo(() => {
    return t.rows.find((r) => String(r[col]) === String(size).trim()) || null;
  }, [t, col, size]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Garment">
          <select value={type} onChange={(e) => { setType(e.target.value as keyof typeof TABLES); setCol(0); }} className={inputCls()}>
            {Object.keys(TABLES).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </Lbl>
        <Lbl label="Input system">
          <select value={col} onChange={(e) => setCol(Number(e.target.value))} className={inputCls()}>
            {t.cols.map((c, i) => <option key={c} value={i}>{c}</option>)}
          </select>
        </Lbl>
        <Lbl label="Size">
          <input value={size} onChange={(e) => setSize(e.target.value)} className={inputCls("font-mono")} />
        </Lbl>
      </Panel>
      <Panel title="Equivalents">
        {matched ? (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {t.cols.map((c, i) => (
              <div key={c} className={`rounded-md border px-3 py-2 ${i === col ? "border-[var(--color-accent)]" : "border-[var(--color-border)]"}`}>
                <div className="text-xs text-[var(--color-muted)]">{c}</div>
                <div className="text-2xl font-bold tabular-nums">{matched[i]}</div>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-amber-400">No exact match — see table below.</p>}
      </Panel>
      <div className="lg:col-span-2">
        <Panel title={`${type} reference table`}>
          <div className="overflow-auto">
            <table className="w-full text-sm tabular-nums">
              <thead className="text-[var(--color-muted)]"><tr>{t.cols.map((c) => <th key={c} className="text-left p-2">{c}</th>)}</tr></thead>
              <tbody>
                {t.rows.map((r, i) => (
                  <tr key={i} className="border-t border-[var(--color-border)]">{r.map((v, j) => <td key={j} className="p-2">{v}</td>)}</tr>
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
