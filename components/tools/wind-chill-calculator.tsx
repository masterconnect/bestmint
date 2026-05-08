"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function WindChillCalculator() {
  const [unit, setUnit] = useState<"F" | "C">("F");
  const [tempIn, setTempIn] = useState(20);
  const [windIn, setWindIn] = useState(15);

  // Convert to °F and mph for NWS formula
  const T = unit === "F" ? tempIn : tempIn * 9 / 5 + 32;
  const V = unit === "F" ? windIn : windIn * 0.621371;

  const valid = T <= 50 && V >= 3;
  const wcF = 35.74 + 0.6215 * T - 35.75 * Math.pow(V, 0.16) + 0.4275 * T * Math.pow(V, 0.16);
  const wcC = (wcF - 32) * 5 / 9;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <div className="flex gap-2 mb-3">
          {(["F", "C"] as const).map((u) => (
            <button key={u} onClick={() => setUnit(u)} className={`px-3 py-1.5 rounded-md text-sm border ${unit === u ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}>°{u}</button>
          ))}
        </div>
        <Lbl label={`Temperature (°${unit})`}><input type="number" step="0.1" value={tempIn} onChange={(e) => setTempIn(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label={`Wind speed (${unit === "F" ? "mph" : "km/h"})`}><input type="number" min={0} step="0.1" value={windIn} onChange={(e) => setWindIn(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
      </Panel>
      <Panel title="Wind chill">
        {valid ? (
          <>
            <div className="text-6xl font-bold tabular-nums">{wcF.toFixed(1)} °F</div>
            <div className="text-2xl tabular-nums text-[var(--color-muted)] mt-1">{wcC.toFixed(1)} °C</div>
            <p className="mt-4 text-xs text-[var(--color-muted)]">NWS formula: WC = 35.74 + 0.6215T − 35.75V^0.16 + 0.4275T·V^0.16 (T in °F, V in mph).</p>
          </>
        ) : (
          <p className="text-sm text-amber-400">Wind chill is defined for T ≤ 50 °F and V ≥ 3 mph.</p>
        )}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
