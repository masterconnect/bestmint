"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function isLeap(y: number) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }

export default function LeapYearChecker() {
  const [year, setYear] = useState<number>(() => new Date().getFullYear());

  const valid = Number.isInteger(year);
  const leap = valid ? isLeap(year) : false;

  const upcoming: number[] = [];
  if (valid) {
    let y = year + (leap ? 1 : 1);
    while (upcoming.length < 5 && y < year + 50) {
      if (isLeap(y)) upcoming.push(y);
      y++;
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Year">
        <label className="block">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Year (Gregorian)</span>
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className={inputCls("font-mono")} />
        </label>
        <div className="mt-4 text-xs text-[var(--color-muted)] leading-relaxed">
          <p className="font-semibold text-[var(--color-foreground)] mb-1">Gregorian leap year rules</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Divisible by 4 → leap…</li>
            <li>…unless divisible by 100 → not leap…</li>
            <li>…unless divisible by 400 → leap.</li>
          </ul>
        </div>
      </Panel>
      <Panel title="Result">
        {!valid ? (
          <p className="text-sm text-red-400">Enter a valid year.</p>
        ) : (
          <>
            <div className={`rounded-md border p-4 ${leap ? "border-[var(--color-accent)]" : "border-[var(--color-border)]"} bg-[var(--color-background)]`}>
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">{year}</div>
              <div className={`mt-1 text-2xl font-semibold ${leap ? "text-[var(--color-accent)]" : ""}`}>
                {leap ? "Is a leap year" : "Not a leap year"}
              </div>
              <div className="mt-1 text-sm text-[var(--color-muted)]">
                February has {leap ? 29 : 28} days. The year has {leap ? 366 : 365} days.
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">Next 5 leap years</div>
              <div className="flex flex-wrap gap-2">
                {upcoming.map((y) => (
                  <span key={y} className="rounded-md border border-[var(--color-border)] px-3 py-1.5 font-mono text-sm">{y}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </Panel>
    </div>
  );
}
