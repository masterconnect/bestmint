"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function pad(n: number) { return String(n).padStart(2, "0"); }
function iso(d: Date) { return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`; }

// Returns the number of ISO weeks in the given year (52 or 53).
function isoWeeksInYear(year: number): number {
  const jan1 = new Date(Date.UTC(year, 0, 1)).getUTCDay();
  const dec31 = new Date(Date.UTC(year, 11, 31)).getUTCDay();
  // 53 weeks if Jan 1 is Thursday, or it's a leap year and Jan 1 is Wednesday.
  if (jan1 === 4 || dec31 === 4) return 53;
  return 52;
}

// Monday of given ISO week.
function isoWeekStart(year: number, week: number): Date {
  // Jan 4 is always in week 1.
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7;
  const week1Mon = new Date(jan4);
  week1Mon.setUTCDate(jan4.getUTCDate() - (jan4Day - 1));
  const target = new Date(week1Mon);
  target.setUTCDate(week1Mon.getUTCDate() + (week - 1) * 7);
  return target;
}

export default function IsoWeekCalculator() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [week, setWeek] = useState(() => {
    // current ISO week
    const d = new Date();
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const day = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - day);
    const start = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    return Math.ceil(((t.getTime() - start.getTime()) / 86400000 + 1) / 7);
  });

  const max = Number.isFinite(year) ? isoWeeksInYear(year) : 0;
  const valid = Number.isInteger(year) && Number.isInteger(week) && week >= 1 && week <= max;

  const start = valid ? isoWeekStart(year, week) : null;
  const end = start ? new Date(start.getTime() + 6 * 86400000) : null;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="ISO year + week">
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Year</span>
            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className={inputCls("font-mono")} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Week (1–{max || "?"})</span>
            <input type="number" min={1} max={max || 53} value={week} onChange={(e) => setWeek(Number(e.target.value))} className={inputCls("font-mono")} />
          </label>
        </div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">
          ISO 8601: weeks start Monday and week 1 contains the year&rsquo;s first Thursday.
          {Number.isFinite(year) ? ` ${year} has ${max} ISO weeks.` : ""}
        </p>
      </Panel>
      <Panel title="Week dates">
        {!valid || !start || !end ? (
          <p className="text-sm text-red-400">
            {Number.isFinite(year) ? `Week must be between 1 and ${max}.` : "Enter a valid year."}
          </p>
        ) : (
          <div className="space-y-3">
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Range</div>
              <div className="mt-1 text-xl font-semibold">{iso(start)} → {iso(end)}</div>
              <div className="mt-1 text-sm text-[var(--color-muted)]">{year}-W{String(week).padStart(2, "0")}</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs text-center">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => {
                const day = new Date(start.getTime() + i * 86400000);
                return (
                  <div key={d} className="rounded-md border border-[var(--color-border)] p-2">
                    <div className="text-[10px] uppercase text-[var(--color-muted)]">{d}</div>
                    <div className="mt-0.5 font-mono">{day.getUTCDate()}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
}
