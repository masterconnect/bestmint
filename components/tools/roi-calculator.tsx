"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function RoiCalculator() {
  const [initial, setInitial] = useState(10000);
  const [final, setFinal] = useState(15000);
  const [years, setYears] = useState(3);

  const profit = final - initial;
  const roi = initial > 0 ? (profit / initial) * 100 : 0;
  const annualized = initial > 0 && years > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Initial investment ($)"><input type="number" min={0} step="0.01" value={initial} onChange={(e) => setInitial(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Final value ($)"><input type="number" min={0} step="0.01" value={final} onChange={(e) => setFinal(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Holding period (years, optional)"><input type="number" min={0} step="0.01" value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
      </Panel>
      <Panel title="Results">
        <div className={`text-5xl font-bold tabular-nums ${profit >= 0 ? "text-emerald-400" : "text-red-400"}`}>{roi.toFixed(2)}%</div>
        <div className="text-sm text-[var(--color-muted)] mt-1">ROI</div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <Cell label="Profit / Loss" value={`${profit >= 0 ? "+" : ""}$${profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
          <Cell label="Annualized ROI" value={years > 0 && initial > 0 ? `${annualized.toFixed(2)}%` : "—"} />
        </div>
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
