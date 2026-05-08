"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function isoWeek(d: Date): { week: number; year: number } {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { week, year: t.getUTCFullYear() };
}

function usWeek(d: Date): number {
  // US convention: week 1 is the week containing Jan 1, weeks start Sunday.
  const start = new Date(d.getFullYear(), 0, 1);
  const diffDays = Math.floor((d.getTime() - start.getTime()) / 86400000);
  return Math.ceil((diffDays + start.getDay() + 1) / 7);
}

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

function daysInMonth(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

function isLeap(y: number) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }

export default function WeekNumberCalculator() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const d = new Date(date + "T00:00:00");
  const ok = !isNaN(d.getTime());

  if (!ok) {
    return <Panel title="Week numbers"><p className="text-sm text-red-400">Pick a valid date.</p></Panel>;
  }

  const iso = isoWeek(d);
  const us = usWeek(d);
  const doy = dayOfYear(d);
  const dim = daysInMonth(d);
  const yLen = isLeap(d.getFullYear()) ? 366 : 365;
  const remaining = yLen - doy;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Date">
        <label className="block">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Pick a date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls()} />
        </label>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          {d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </Panel>
      <Panel title="Calendar metrics">
        <Stat label="ISO 8601 week" value={`${iso.year}-W${String(iso.week).padStart(2, "0")}`} />
        <Stat label="ISO week number" value={String(iso.week)} />
        <Stat label="US week number" value={String(us)} />
        <Stat label="Day of year" value={`${doy} of ${yLen}`} />
        <Stat label="Days in month" value={String(dim)} />
        <Stat label="Days remaining in year" value={String(remaining)} />
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] py-2 last:border-0">
      <span className="text-sm text-[var(--color-muted)]">{label}</span>
      <span className="font-mono text-base tabular-nums">{value}</span>
    </div>
  );
}
