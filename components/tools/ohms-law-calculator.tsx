"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

type Field = "V" | "I" | "R" | "P";

export default function OhmsLawCalculator() {
  const [vals, setVals] = useState<Record<Field, string>>({ V: "12", I: "2", R: "", P: "" });

  const get = (k: Field) => vals[k] === "" ? null : Number(vals[k]);
  const set = (k: Field, v: string) => setVals((s) => ({ ...s, [k]: v }));

  const V = get("V"), I = get("I"), R = get("R"), P = get("P");
  const filled = [V, I, R, P].filter((x) => x !== null && !isNaN(x as number)).length;

  let outV: number | null = V, outI: number | null = I, outR: number | null = R, outP: number | null = P;
  if (filled >= 2) {
    if (V !== null && I !== null) { outR = I !== 0 ? V / I : null; outP = V * I; }
    else if (V !== null && R !== null) { outI = R !== 0 ? V / R : null; outP = R !== 0 ? V * V / R : null; }
    else if (V !== null && P !== null) { outI = V !== 0 ? P / V : null; outR = P !== 0 ? V * V / P : null; }
    else if (I !== null && R !== null) { outV = I * R; outP = I * I * R; }
    else if (I !== null && P !== null) { outV = I !== 0 ? P / I : null; outR = I !== 0 ? P / (I * I) : null; }
    else if (R !== null && P !== null) {
      const v = Math.sqrt(P * R); outV = v; outI = R !== 0 ? v / R : null;
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs (provide any 2)">
        <Lbl label="Voltage V (volts)"><input type="number" step="any" value={vals.V} onChange={(e) => set("V", e.target.value)} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Current I (amps)"><input type="number" step="any" value={vals.I} onChange={(e) => set("I", e.target.value)} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Resistance R (ohms)"><input type="number" step="any" value={vals.R} onChange={(e) => set("R", e.target.value)} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Power P (watts)"><input type="number" step="any" value={vals.P} onChange={(e) => set("P", e.target.value)} className={inputCls("font-mono")} /></Lbl>
        <p className="mt-2 text-xs text-[var(--color-muted)]">V = IR · P = VI · P = I²R · P = V²/R</p>
      </Panel>
      <Panel title="Results">
        {filled < 2 ? (
          <p className="text-sm text-[var(--color-muted)]">Enter at least 2 values.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Cell label="V (volts)" value={outV} suffix="V" />
            <Cell label="I (amps)" value={outI} suffix="A" />
            <Cell label="R (ohms)" value={outR} suffix="Ω" />
            <Cell label="P (watts)" value={outP} suffix="W" />
          </div>
        )}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Cell({ label, value, suffix }: { label: string; value: number | null; suffix: string }) {
  return (
    <div className="rounded-md border border-[var(--color-border)] p-3">
      <div className="text-xs text-[var(--color-muted)]">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value !== null && isFinite(value) ? `${Number(value.toFixed(6))} ${suffix}` : "—"}</div>
    </div>
  );
}
