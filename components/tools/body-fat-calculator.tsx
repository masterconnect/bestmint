"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [height, setHeight] = useState(175);
  const [waist, setWaist] = useState(85);
  const [neck, setNeck] = useState(38);
  const [hip, setHip] = useState(95);
  const [weight, setWeight] = useState(75);

  // US Navy formula. Convert all to inches first if cm, then use log10 formula.
  // Or use cm version directly:
  let bf = 0;
  if (unit === "cm") {
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
  } else {
    if (gender === "male") {
      bf = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      bf = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }
  }
  const valid = isFinite(bf) && bf > 0;
  const bfDisplay = valid ? Math.max(0, Math.min(60, bf)) : 0;
  const fatMass = (bfDisplay / 100) * weight;
  const leanMass = weight - fatMass;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Measurements">
        <div className="flex gap-2 mb-3">
          {(["male", "female"] as const).map((g) => (
            <button key={g} onClick={() => setGender(g)} className={`px-3 py-1.5 rounded-md text-sm border ${gender === g ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}>{g === "male" ? "Male" : "Female"}</button>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          {(["cm", "in"] as const).map((u) => (
            <button key={u} onClick={() => setUnit(u)} className={`px-3 py-1.5 rounded-md text-xs border ${unit === u ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}>{u}</button>
          ))}
        </div>
        <Lbl label={`Height (${unit})`}><input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label={`Waist (${unit})`}><input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label={`Neck (${unit})`}><input type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        {gender === "female" && <Lbl label={`Hip (${unit})`}><input type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>}
        <Lbl label={`Weight (${unit === "cm" ? "kg" : "lb"})`}><input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
      </Panel>
      <Panel title="Result">
        <div className="text-6xl font-bold tabular-nums">{valid ? `${bfDisplay.toFixed(1)}%` : "—"}</div>
        <div className="text-sm text-[var(--color-muted)] mt-1">Body fat (US Navy)</div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <Cell label="Fat mass" value={valid ? `${fatMass.toFixed(1)} ${unit === "cm" ? "kg" : "lb"}` : "—"} />
          <Cell label="Lean mass" value={valid ? `${leanMass.toFixed(1)} ${unit === "cm" ? "kg" : "lb"}` : "—"} />
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
