"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function level(hi: number) {
  if (hi < 80) return { label: "Safe", color: "text-emerald-400" };
  if (hi < 90) return { label: "Caution", color: "text-amber-300" };
  if (hi < 103) return { label: "Extreme caution", color: "text-amber-400" };
  if (hi < 125) return { label: "Danger", color: "text-orange-400" };
  return { label: "Extreme danger", color: "text-red-400" };
}

export default function HeatIndexCalculator() {
  const [T, setT] = useState(90);
  const [RH, setRH] = useState(60);

  // Rothfusz regression (T in °F, RH 0-100)
  let hi = 0.5 * (T + 61.0 + (T - 68.0) * 1.2 + RH * 0.094);
  if ((hi + T) / 2 >= 80) {
    hi = -42.379 + 2.04901523 * T + 10.14333127 * RH
      - 0.22475541 * T * RH - 0.00683783 * T * T
      - 0.05481717 * RH * RH + 0.00122874 * T * T * RH
      + 0.00085282 * T * RH * RH - 0.00000199 * T * T * RH * RH;
    if (RH < 13 && T >= 80 && T <= 112) hi -= ((13 - RH) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
    else if (RH > 85 && T >= 80 && T <= 87) hi += ((RH - 85) / 10) * ((87 - T) / 5);
  }
  const hiC = (hi - 32) * 5 / 9;
  const w = level(hi);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Temperature (°F)"><input type="number" step="0.1" value={T} onChange={(e) => setT(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label={`Humidity (${RH}%)`}>
          <input type="range" min={0} max={100} value={RH} onChange={(e) => setRH(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
        </Lbl>
      </Panel>
      <Panel title="Heat index">
        <div className="text-6xl font-bold tabular-nums">{hi.toFixed(1)} °F</div>
        <div className="text-2xl tabular-nums text-[var(--color-muted)] mt-1">{hiC.toFixed(1)} °C</div>
        <div className={`mt-3 text-lg font-semibold ${w.color}`}>{w.label}</div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">Rothfusz regression (NWS). Most accurate for T ≥ 80 °F and RH ≥ 40%.</p>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
