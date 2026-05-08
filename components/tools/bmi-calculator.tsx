"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function category(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-sky-400" };
  if (bmi < 25) return { label: "Normal", color: "text-emerald-400" };
  if (bmi < 30) return { label: "Overweight", color: "text-amber-400" };
  return { label: "Obese", color: "text-red-400" };
}

export default function BmiCalculator() {
  const [system, setSystem] = useState<"metric" | "imperial">("metric");
  const [h, setH] = useState(170);
  const [w, setW] = useState(70);
  const [ft, setFt] = useState(5);
  const [inch, setInch] = useState(9);
  const [lb, setLb] = useState(154);

  const bmi = system === "metric"
    ? w / Math.pow(h / 100, 2)
    : (lb / Math.pow(ft * 12 + inch, 2)) * 703;
  const c = category(bmi);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <div className="flex gap-2 mb-4">
          {(["metric", "imperial"] as const).map((s) => (
            <button key={s} onClick={() => setSystem(s)} className={`px-3 py-1.5 rounded-md text-sm border ${system === s ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}>
              {s === "metric" ? "Metric" : "Imperial"}
            </button>
          ))}
        </div>
        {system === "metric" ? (
          <div className="space-y-3">
            <Lbl label="Height (cm)"><input type="number" value={h} onChange={(e) => setH(Number(e.target.value))} className={inputCls()} /></Lbl>
            <Lbl label="Weight (kg)"><input type="number" value={w} onChange={(e) => setW(Number(e.target.value))} className={inputCls()} /></Lbl>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Lbl label="Height (ft)"><input type="number" value={ft} onChange={(e) => setFt(Number(e.target.value))} className={inputCls()} /></Lbl>
              <Lbl label="(in)"><input type="number" value={inch} onChange={(e) => setInch(Number(e.target.value))} className={inputCls()} /></Lbl>
            </div>
            <Lbl label="Weight (lb)"><input type="number" value={lb} onChange={(e) => setLb(Number(e.target.value))} className={inputCls()} /></Lbl>
          </div>
        )}
      </Panel>
      <Panel title="Result">
        <div className="text-6xl font-bold tabular-nums">{isFinite(bmi) ? bmi.toFixed(1) : "—"}</div>
        <div className={`mt-1 text-lg font-semibold ${c.color}`}>{c.label}</div>
        <p className="mt-4 text-xs text-[var(--color-muted)]">BMI is an indicator only — not a diagnosis. Consult a clinician for personalised advice.</p>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
