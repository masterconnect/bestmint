"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

const ROMAN: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return "";
  let s = "";
  for (const [v, sym] of ROMAN) {
    while (n >= v) { s += sym; n -= v; }
  }
  return s;
}

const RX = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

function fromRoman(s: string): number | null {
  if (!s || !RX.test(s)) return null;
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const up = s.toUpperCase();
  let total = 0;
  for (let i = 0; i < up.length; i++) {
    const cur = map[up[i]];
    const next = map[up[i + 1]] || 0;
    total += cur < next ? -cur : cur;
  }
  return total;
}

export default function RomanNumeralDate() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [reverse, setReverse] = useState("VIII·V·MMXXVI");

  const d = new Date(date + "T00:00:00");
  const valid = !isNaN(d.getTime());
  const day = valid ? toRoman(d.getDate()) : "";
  const month = valid ? toRoman(d.getMonth() + 1) : "";
  const year = valid ? toRoman(d.getFullYear()) : "";
  const formatted = valid ? `${day}·${month}·${year}` : "";

  const parts = reverse.split(/[·.\-/\s]+/).filter(Boolean);
  const parsed = parts.length === 3 ? {
    day: fromRoman(parts[0]),
    month: fromRoman(parts[1]),
    year: fromRoman(parts[2]),
  } : null;
  const reverseValid = parsed && parsed.day && parsed.month && parsed.year &&
    parsed.day >= 1 && parsed.day <= 31 && parsed.month >= 1 && parsed.month <= 12;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Date → Roman" action={formatted ? <CopyButton value={formatted} /> : null}>
        <label className="block">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Pick a date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls()} />
        </label>
        {valid ? (
          <div className="mt-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4">
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Roman form</div>
            <div className="mt-1 text-3xl font-mono">{formatted}</div>
            <div className="mt-2 text-xs text-[var(--color-muted)]">
              Day {day} · Month {month} · Year {year}
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-red-400">Pick a valid date.</p>
        )}
      </Panel>

      <Panel title="Roman → Date">
        <label className="block">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Roman date (day · month · year)</span>
          <input value={reverse} onChange={(e) => setReverse(e.target.value)} className={inputCls("font-mono")} placeholder="VIII·V·MMXXVI" />
        </label>
        {reverseValid ? (
          <div className="mt-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4">
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Parsed</div>
            <div className="mt-1 text-2xl font-semibold">
              {String(parsed!.year).padStart(4, "0")}-{String(parsed!.month).padStart(2, "0")}-{String(parsed!.day).padStart(2, "0")}
            </div>
            <div className="mt-1 text-sm text-[var(--color-muted)]">
              {new Date(parsed!.year!, parsed!.month! - 1, parsed!.day!).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-red-400">Could not parse — use three Roman numerals separated by · . - / or space.</p>
        )}
      </Panel>
    </div>
  );
}
