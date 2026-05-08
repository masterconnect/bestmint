"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function pad(n: number) { return String(n).padStart(2, "0"); }
function iso(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }

export default function QuarterCalculator() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [fyStart, setFyStart] = useState(1); // 1 = January

  const d = new Date(date + "T00:00:00");
  const valid = !isNaN(d.getTime()) && fyStart >= 1 && fyStart <= 12;

  let info: { q: number; start: Date; end: Date; daysIn: number; daysRemain: number; fy: number } | null = null;
  if (valid) {
    const m = d.getMonth();
    const y = d.getFullYear();
    // Months since fiscal-year start (0..11)
    const monthsSinceFy = ((m - (fyStart - 1)) + 12) % 12;
    const q = Math.floor(monthsSinceFy / 3) + 1;
    // Quarter start: fyStart-1 + (q-1)*3 months from start of fiscal year that contains d
    const fyYear = m >= fyStart - 1 ? y : y - 1;
    const qStartMonthAbsolute = (fyStart - 1) + (q - 1) * 3;
    const qStartMonth = qStartMonthAbsolute % 12;
    const qStartYear = fyYear + Math.floor(qStartMonthAbsolute / 12);
    const start = new Date(qStartYear, qStartMonth, 1);
    const end = new Date(qStartYear, qStartMonth + 3, 0);
    const daysIn = Math.floor((d.getTime() - start.getTime()) / 86400000) + 1;
    const daysRemain = Math.floor((end.getTime() - d.getTime()) / 86400000);
    info = { q, start, end, daysIn, daysRemain, fy: fyYear };
  }

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <label className="block mb-3">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls()} />
        </label>
        <label className="block mb-3">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Fiscal year starts in</span>
          <select value={fyStart} onChange={(e) => setFyStart(Number(e.target.value))} className={inputCls()}>
            {months.map((m, i) => <option key={m} value={i + 1}>{m} {i === 0 ? "(calendar year)" : ""}</option>)}
          </select>
        </label>
      </Panel>
      <Panel title="Quarter">
        {!valid || !info ? (
          <p className="text-sm text-red-400">Enter a valid date.</p>
        ) : (
          <>
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Quarter</div>
              <div className="mt-1 text-3xl font-semibold">Q{info.q} {info.fy}{fyStart === 1 ? "" : ` (FY${info.fy + 1})`}</div>
            </div>
            <div className="mt-3 space-y-1.5 text-sm">
              <Row label="Start" value={iso(info.start)} />
              <Row label="End" value={iso(info.end)} />
              <Row label="Days into quarter" value={String(info.daysIn)} />
              <Row label="Days remaining" value={String(info.daysRemain)} />
            </div>
          </>
        )}
      </Panel>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-[var(--color-border)] px-3 py-2">
      <span className="text-xs text-[var(--color-muted)]">{label}</span>
      <span className="font-mono text-sm">{value}</span>
    </div>
  );
}
