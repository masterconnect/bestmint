"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function GradeCalculator() {
  const [current, setCurrent] = useState(85);
  const [finalWeight, setFinalWeight] = useState(30);
  const [target, setTarget] = useState(90);

  const currWeight = 100 - finalWeight;
  // target = current*currWeight/100 + finalGrade*finalWeight/100  →  finalGrade = (target - current*currWeight/100) / (finalWeight/100)
  const required = finalWeight > 0 ? (target - (current * currWeight) / 100) / (finalWeight / 100) : 0;

  const status = required > 100 ? "Not achievable without extra credit" : required < 0 ? "Achievable even with 0% on final" : null;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Current grade (%)"><input type="number" min={0} max={100} step="0.01" value={current} onChange={(e) => setCurrent(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Weight of final (%)"><input type="number" min={0} max={100} step="0.01" value={finalWeight} onChange={(e) => setFinalWeight(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Target grade (%)"><input type="number" min={0} max={100} step="0.01" value={target} onChange={(e) => setTarget(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
      </Panel>
      <Panel title="Result">
        <div className="text-xs text-[var(--color-muted)]">You need on the final</div>
        <div className={`text-6xl font-bold tabular-nums mt-1 ${required > 100 ? "text-red-400" : "text-emerald-400"}`}>{isFinite(required) ? `${required.toFixed(2)}%` : "—"}</div>
        {status && <div className={`mt-3 text-sm ${required > 100 ? "text-red-400" : "text-emerald-400"}`}>{status}</div>}
        <p className="mt-4 text-xs text-[var(--color-muted)]">Assumes the final makes up {finalWeight}% of your grade and existing work makes up the rest.</p>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
