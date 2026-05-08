"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const ACTIVITY: Record<string, number> = {
  Sedentary: 1.2,
  "Lightly active": 1.375,
  Moderate: 1.55,
  "Very active": 1.725,
  "Extra active": 1.9,
};

export default function CalorieCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [activity, setActivity] = useState<keyof typeof ACTIVITY>("Moderate");

  // Mifflin-St Jeor
  const bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * ACTIVITY[activity];
  const cut = tdee - 500;
  const bulk = tdee + 300;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <div className="flex gap-2 mb-3">
          {(["male", "female"] as const).map((g) => (
            <button key={g} onClick={() => setGender(g)} className={`px-3 py-1.5 rounded-md text-sm border ${gender === g ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}>{g === "male" ? "Male" : "Female"}</button>
          ))}
        </div>
        <Lbl label="Age"><input type="number" min={0} value={age} onChange={(e) => setAge(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Height (cm)"><input type="number" min={0} value={height} onChange={(e) => setHeight(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Weight (kg)"><input type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Activity">
          <select value={activity} onChange={(e) => setActivity(e.target.value as keyof typeof ACTIVITY)} className={inputCls()}>
            {Object.keys(ACTIVITY).map((k) => <option key={k} value={k}>{k} (×{ACTIVITY[k]})</option>)}
          </select>
        </Lbl>
      </Panel>
      <Panel title="Results">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Cell label="BMR" value={`${Math.round(bmr)} kcal`} />
          <Cell label="TDEE" value={`${Math.round(tdee)} kcal`} highlight />
          <Cell label="Cut (-500)" value={`${Math.round(cut)} kcal`} />
          <Cell label="Maintain" value={`${Math.round(tdee)} kcal`} />
          <Cell label="Bulk (+300)" value={`${Math.round(bulk)} kcal`} />
        </div>
        <p className="mt-4 text-xs text-[var(--color-muted)]">Mifflin-St Jeor BMR × activity factor.</p>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Cell({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div className={`rounded-md border p-3 ${highlight ? "border-[var(--color-accent)]" : "border-[var(--color-border)]"}`}><div className="text-xs text-[var(--color-muted)]">{label}</div><div className={`mt-1 ${highlight ? "text-2xl font-bold" : "text-lg font-semibold"} tabular-nums`}>{value}</div></div>;
}
