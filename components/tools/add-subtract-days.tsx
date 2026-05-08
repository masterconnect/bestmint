"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

type Unit = "days" | "weeks" | "months" | "years";

function addAmount(d: Date, n: number, unit: Unit, sign: 1 | -1): Date {
  const r = new Date(d);
  const v = n * sign;
  if (unit === "days") r.setDate(r.getDate() + v);
  else if (unit === "weeks") r.setDate(r.getDate() + v * 7);
  else if (unit === "months") r.setMonth(r.getMonth() + v);
  else if (unit === "years") r.setFullYear(r.getFullYear() + v);
  return r;
}

export default function AddSubtractDays() {
  const [start, setStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [n, setN] = useState(30);
  const [unit, setUnit] = useState<Unit>("days");
  const [direction, setDirection] = useState<"add" | "subtract">("add");

  const sd = new Date(start + "T00:00:00");
  const valid = !isNaN(sd.getTime()) && Number.isFinite(n);
  const sign = direction === "add" ? 1 : -1;
  const result = valid ? addAmount(sd, n, unit, sign) : null;

  let diffDays = 0;
  if (result) {
    diffDays = Math.round((result.getTime() - sd.getTime()) / 86400000);
  }
  const absDays = Math.abs(diffDays);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Start date">
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className={inputCls()} />
        </Lbl>
        <Lbl label="Direction">
          <select value={direction} onChange={(e) => setDirection(e.target.value as "add" | "subtract")} className={inputCls()}>
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (−)</option>
          </select>
        </Lbl>
        <div className="grid grid-cols-2 gap-2">
          <Lbl label="Amount">
            <input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} className={inputCls("font-mono")} />
          </Lbl>
          <Lbl label="Unit">
            <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className={inputCls()}>
              <option>days</option>
              <option>weeks</option>
              <option>months</option>
              <option>years</option>
            </select>
          </Lbl>
        </div>
      </Panel>
      <Panel title="Result">
        {!valid || !result ? (
          <p className="text-sm text-red-400">Enter valid inputs.</p>
        ) : (
          <>
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Result date</div>
              <div className="mt-1 text-2xl font-semibold">{result.toISOString().slice(0, 10)}</div>
              <div className="mt-1 text-sm text-[var(--color-muted)]">
                {result.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <Stat label="Days" value={String(absDays)} />
              <Stat label="Weeks" value={(absDays / 7).toFixed(2)} />
              <Stat label="Months (avg)" value={(absDays / 30.4375).toFixed(2)} />
              <Stat label="Years (avg)" value={(absDays / 365.25).toFixed(3)} />
            </div>
          </>
        )}
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
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--color-border)] p-2">
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">{label}</div>
      <div className="mt-0.5 font-mono">{value}</div>
    </div>
  );
}
