"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function SalaryCalculator() {
  const [hourly, setHourly] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [overtime, setOvertime] = useState(true);

  const { annual, monthly, weekly, daily, otHours, otPay } = useMemo(() => {
    const reg = Math.min(hoursPerWeek, 40);
    const ot = overtime ? Math.max(0, hoursPerWeek - 40) : 0;
    const weeklyPay = reg * hourly + ot * hourly * 1.5;
    const annualPay = weeklyPay * weeksPerYear;
    return {
      annual: annualPay,
      monthly: annualPay / 12,
      weekly: weeklyPay,
      daily: weeklyPay / Math.max(1, hoursPerWeek > 0 ? Math.min(5, hoursPerWeek / 8 || 5) : 5),
      otHours: ot,
      otPay: ot * hourly * 1.5,
    };
  }, [hourly, hoursPerWeek, weeksPerYear, overtime]);

  const ok = hourly >= 0 && hoursPerWeek >= 0 && weeksPerYear >= 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Hourly rate ($)"><input type="number" min={0} step="0.01" value={hourly} onChange={(e) => setHourly(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Hours per week"><input type="number" min={0} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Weeks per year"><input type="number" min={0} max={52} value={weeksPerYear} onChange={(e) => setWeeksPerYear(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <label className="flex items-center gap-2 text-sm mt-2">
          <input type="checkbox" checked={overtime} onChange={(e) => setOvertime(e.target.checked)} />
          Overtime (1.5× over 40 hrs/wk)
        </label>
      </Panel>
      <Panel title="Earnings">
        {ok ? (
          <>
            <Big label="Annual" value={annual} />
            <Big label="Monthly" value={monthly} />
            <Big label="Weekly" value={weekly} />
            <Big label="Daily" value={daily} />
            {otHours > 0 && <p className="mt-3 text-xs text-[var(--color-muted)]">Includes {otHours} OT hrs/wk = ${otPay.toFixed(2)} extra weekly.</p>}
          </>
        ) : <p className="text-sm text-[var(--color-muted)]">Enter valid values.</p>}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Big({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--color-border)] py-3 last:border-0">
      <span className="text-[var(--color-muted)] text-sm">{label}</span>
      <span className="text-3xl font-semibold tabular-nums">${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
    </div>
  );
}
