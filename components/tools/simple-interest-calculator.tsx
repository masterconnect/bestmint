"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function SimpleInterestCalculator() {
  const [P, setP] = useState(5000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(3);

  const interest = P * (rate / 100) * years;
  const total = P + interest;
  const ok = P >= 0 && rate >= 0 && years >= 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Principal ($)"><input type="number" min={0} value={P} onChange={(e) => setP(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Annual rate (%)"><input type="number" min={0} step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Time (years)"><input type="number" min={0} step="0.1" value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
      </Panel>
      <Panel title="Results">
        {ok ? (
          <>
            <div className="text-5xl font-bold tabular-nums">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            <div className="text-sm text-[var(--color-muted)] mt-1">Total amount</div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <Cell label="Interest" value={`$${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
              <Cell label="Principal" value={`$${P.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
            </div>
            <p className="mt-4 text-xs text-[var(--color-muted)]">Formula: I = P × r × t</p>
          </>
        ) : <p className="text-sm text-[var(--color-muted)]">Enter valid values.</p>}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Cell({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-[var(--color-border)] p-3"><div className="text-xs text-[var(--color-muted)]">{label}</div><div className="mt-1 font-semibold">{value}</div></div>;
}
