"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

type UnitDef = { name: string; toBase: (v: number) => number; fromBase: (v: number) => number };

const groups: Record<string, Record<string, UnitDef>> = {
  Length: {
    Meter: { name: "m", toBase: (v) => v, fromBase: (v) => v },
    Kilometer: { name: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    Centimeter: { name: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    Inch: { name: "in", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    Foot: { name: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    Mile: { name: "mi", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  Weight: {
    Kilogram: { name: "kg", toBase: (v) => v, fromBase: (v) => v },
    Gram: { name: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    Pound: { name: "lb", toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
    Ounce: { name: "oz", toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
  },
  Temperature: {
    Celsius: { name: "°C", toBase: (v) => v, fromBase: (v) => v },
    Fahrenheit: { name: "°F", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
    Kelvin: { name: "K", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  },
  Volume: {
    Liter: { name: "L", toBase: (v) => v, fromBase: (v) => v },
    Milliliter: { name: "ml", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    "US gallon": { name: "gal", toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
    "US cup": { name: "cup", toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
  },
};

export default function UnitConverter() {
  const [group, setGroup] = useState("Length");
  const units = groups[group];
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState(Object.keys(units)[0]);
  const baseValue = units[from].toBase(value);

  return (
    <div className="space-y-4">
      <Panel title="Category">
        <div className="flex gap-2 flex-wrap">
          {Object.keys(groups).map((g) => (
            <button
              key={g}
              onClick={() => { setGroup(g); setFrom(Object.keys(groups[g])[0]); }}
              className={`px-3 py-1.5 rounded-md text-sm border ${group === g ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </Panel>
      <Panel title="From">
        <div className="flex gap-3">
          <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className={inputCls("flex-1 font-mono")} />
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-sm">
            {Object.entries(units).map(([k, u]) => <option key={k} value={k}>{k} ({u.name})</option>)}
          </select>
        </div>
      </Panel>
      <Panel title="Conversions">
        <div className="grid sm:grid-cols-2 gap-2">
          {Object.entries(units).map(([k, u]) => k === from ? null : (
            <div key={k} className="flex items-center justify-between rounded-md border border-[var(--color-border)] px-3 py-2">
              <span className="text-sm text-[var(--color-muted)]">{k}</span>
              <span className="font-mono text-sm">{Number(u.fromBase(baseValue).toFixed(6)).toString()} {u.name}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
