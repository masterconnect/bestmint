"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function diff(birth: Date, ref: Date) {
  let y = ref.getFullYear() - birth.getFullYear();
  let m = ref.getMonth() - birth.getMonth();
  let d = ref.getDate() - birth.getDate();
  if (d < 0) {
    m--;
    const prev = new Date(ref.getFullYear(), ref.getMonth(), 0).getDate();
    d += prev;
  }
  if (m < 0) { y--; m += 12; }
  const totalMs = ref.getTime() - birth.getTime();
  return {
    years: y, months: m, days: d,
    totalDays: Math.floor(totalMs / 86400000),
    totalHours: Math.floor(totalMs / 3600000),
    totalMinutes: Math.floor(totalMs / 60000),
  };
}

export default function AgeCalculator() {
  const [birth, setBirth] = useState("2000-01-01");
  const [ref, setRef] = useState(() => new Date().toISOString().slice(0, 10));
  const b = new Date(birth), r = new Date(ref);
  const ok = !isNaN(b.getTime()) && !isNaN(r.getTime()) && b <= r;
  const x = ok ? diff(b, r) : null;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Dates">
        <label className="block mb-3">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Date of birth</span>
          <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className={inputCls()} />
        </label>
        <label className="block">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Reference date</span>
          <input type="date" value={ref} onChange={(e) => setRef(e.target.value)} className={inputCls()} />
        </label>
      </Panel>
      <Panel title="Age">
        {x ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold tabular-nums">{x.years}</span>
              <span className="text-[var(--color-muted)]">years</span>
              <span className="text-3xl font-semibold tabular-nums">{x.months}</span>
              <span className="text-[var(--color-muted)]">months</span>
              <span className="text-3xl font-semibold tabular-nums">{x.days}</span>
              <span className="text-[var(--color-muted)]">days</span>
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <Cell label="Total days" value={x.totalDays} />
              <Cell label="Total hours" value={x.totalHours} />
              <Cell label="Total minutes" value={x.totalMinutes} />
            </dl>
          </>
        ) : (
          <p className="text-sm text-[var(--color-muted)]">Pick a valid birth date earlier than the reference date.</p>
        )}
      </Panel>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-[var(--color-border)] p-3">
      <div className="text-xs text-[var(--color-muted)]">{label}</div>
      <div className="mt-1 font-mono">{value.toLocaleString()}</div>
    </div>
  );
}
