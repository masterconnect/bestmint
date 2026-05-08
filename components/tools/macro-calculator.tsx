"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const PRESETS: Record<string, [number, number, number]> = {
  Balanced: [30, 40, 30],
  "Low-carb": [40, 20, 40],
  Keto: [25, 5, 70],
  "High-protein": [40, 35, 25],
};

export default function MacroCalculator() {
  const [calories, setCalories] = useState(2200);
  const [preset, setPreset] = useState<string>("Balanced");
  const [P, setP] = useState(30);
  const [C, setC] = useState(40);
  const [F, setF] = useState(30);

  const sum = P + C + F;
  const valid = sum === 100;

  const proteinG = (calories * P) / 100 / 4;
  const carbG = (calories * C) / 100 / 4;
  const fatG = (calories * F) / 100 / 9;

  const apply = (k: string) => {
    setPreset(k);
    if (k !== "Custom") {
      const [p, c, f] = PRESETS[k];
      setP(p); setC(c); setF(f);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Daily calories"><input type="number" min={0} value={calories} onChange={(e) => setCalories(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Preset">
          <select value={preset} onChange={(e) => apply(e.target.value)} className={inputCls()}>
            {Object.keys(PRESETS).map((k) => <option key={k} value={k}>{k} ({PRESETS[k].join("/")})</option>)}
            <option value="Custom">Custom</option>
          </select>
        </Lbl>
        <div className="grid grid-cols-3 gap-2">
          <Lbl label="Protein %"><input type="number" min={0} max={100} value={P} onChange={(e) => { setP(Number(e.target.value)); setPreset("Custom"); }} className={inputCls("font-mono")} /></Lbl>
          <Lbl label="Carbs %"><input type="number" min={0} max={100} value={C} onChange={(e) => { setC(Number(e.target.value)); setPreset("Custom"); }} className={inputCls("font-mono")} /></Lbl>
          <Lbl label="Fat %"><input type="number" min={0} max={100} value={F} onChange={(e) => { setF(Number(e.target.value)); setPreset("Custom"); }} className={inputCls("font-mono")} /></Lbl>
        </div>
        <p className={`text-xs mt-1 ${valid ? "text-[var(--color-muted)]" : "text-red-400"}`}>Total: {sum}% {valid ? "" : "(must = 100)"}</p>
      </Panel>
      <Panel title="Daily macros">
        <Big label="Protein" value={proteinG} unit="g" sub={`${Math.round(proteinG * 4)} kcal`} />
        <Big label="Carbs" value={carbG} unit="g" sub={`${Math.round(carbG * 4)} kcal`} />
        <Big label="Fat" value={fatG} unit="g" sub={`${Math.round(fatG * 9)} kcal`} />
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Big({ label, value, unit, sub }: { label: string; value: number; unit: string; sub: string }) {
  return (
    <div className="border-b border-[var(--color-border)] py-3 last:border-0">
      <div className="flex items-baseline justify-between">
        <span className="text-[var(--color-muted)] text-sm">{label}</span>
        <span className="text-3xl font-semibold tabular-nums">{value.toFixed(1)} {unit}</span>
      </div>
      <div className="text-xs text-[var(--color-muted)] text-right">{sub}</div>
    </div>
  );
}
