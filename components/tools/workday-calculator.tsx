"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

// Common US federal holidays for 2024-2028 (observed dates approximated to actual fixed/calculated dates).
const HOLIDAYS = new Set<string>([
  // 2024
  "2024-01-01", "2024-01-15", "2024-02-19", "2024-05-27", "2024-06-19",
  "2024-07-04", "2024-09-02", "2024-10-14", "2024-11-11", "2024-11-28", "2024-12-25",
  // 2025
  "2025-01-01", "2025-01-20", "2025-02-17", "2025-05-26", "2025-06-19",
  "2025-07-04", "2025-09-01", "2025-10-13", "2025-11-11", "2025-11-27", "2025-12-25",
  // 2026
  "2026-01-01", "2026-01-19", "2026-02-16", "2026-05-25", "2026-06-19",
  "2026-07-03", "2026-09-07", "2026-10-12", "2026-11-11", "2026-11-26", "2026-12-25",
  // 2027
  "2027-01-01", "2027-01-18", "2027-02-15", "2027-05-31", "2027-06-18",
  "2027-07-05", "2027-09-06", "2027-10-11", "2027-11-11", "2027-11-25", "2027-12-24",
  // 2028
  "2028-01-03", "2028-01-17", "2028-02-21", "2028-05-29", "2028-06-19",
  "2028-07-04", "2028-09-04", "2028-10-09", "2028-11-10", "2028-11-23", "2028-12-25",
]);

function pad(n: number) { return String(n).padStart(2, "0"); }
function iso(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }

export default function WorkdayCalculator() {
  const [start, setStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [n, setN] = useState(10);
  const [direction, setDirection] = useState<"add" | "subtract">("add");
  const [excludeWeekends, setExcludeWeekends] = useState(true);
  const [excludeHolidays, setExcludeHolidays] = useState(false);

  const startDate = new Date(start + "T00:00:00");
  const valid = !isNaN(startDate.getTime()) && Number.isFinite(n) && n >= 0;

  let result: Date | null = null;
  let skippedW = 0;
  let skippedH = 0;
  if (valid) {
    const cur = new Date(startDate);
    const step = direction === "add" ? 1 : -1;
    let counted = 0;
    while (counted < n) {
      cur.setDate(cur.getDate() + step);
      const day = cur.getDay();
      const isWeekend = day === 0 || day === 6;
      const isHol = HOLIDAYS.has(iso(cur));
      if (excludeWeekends && isWeekend) { skippedW++; continue; }
      if (excludeHolidays && isHol) { skippedH++; continue; }
      counted++;
    }
    result = cur;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Start date">
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className={inputCls()} />
        </Lbl>
        <Lbl label="Number of days">
          <input type="number" min={0} value={n} onChange={(e) => setN(Number(e.target.value))} className={inputCls("font-mono")} />
        </Lbl>
        <Lbl label="Direction">
          <select value={direction} onChange={(e) => setDirection(e.target.value as "add" | "subtract")} className={inputCls()}>
            <option value="add">Add (forward)</option>
            <option value="subtract">Subtract (backward)</option>
          </select>
        </Lbl>
        <label className="flex items-center gap-2 text-sm mt-2">
          <input type="checkbox" checked={excludeWeekends} onChange={(e) => setExcludeWeekends(e.target.checked)} className="accent-[var(--color-accent)]" />
          Exclude weekends (Sat & Sun)
        </label>
        <label className="flex items-center gap-2 text-sm mt-2">
          <input type="checkbox" checked={excludeHolidays} onChange={(e) => setExcludeHolidays(e.target.checked)} className="accent-[var(--color-accent)]" />
          Exclude US federal holidays
        </label>
      </Panel>
      <Panel title="Result">
        {!valid ? (
          <p className="text-sm text-red-400">Enter a valid date and a non-negative count.</p>
        ) : result ? (
          <div className="space-y-3">
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Result date</div>
              <div className="mt-1 text-2xl font-semibold">{iso(result)}</div>
              <div className="mt-1 text-sm text-[var(--color-muted)]">
                {result.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
            <div className="text-xs text-[var(--color-muted)]">
              Skipped {skippedW} weekend day{skippedW === 1 ? "" : "s"} and {skippedH} holiday{skippedH === 1 ? "" : "s"}.
            </div>
          </div>
        ) : null}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>
      {children}
    </label>
  );
}
