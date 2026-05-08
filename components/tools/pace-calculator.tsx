"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

type Mode = "pace" | "time" | "distance";

function fmt(min: number) {
  if (!isFinite(min) || min < 0) return "—";
  const h = Math.floor(min / 60);
  const m = Math.floor(min % 60);
  const s = Math.round((min - Math.floor(min)) * 60);
  return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
}
function fmtPace(minPerUnit: number) {
  if (!isFinite(minPerUnit) || minPerUnit <= 0) return "—";
  const m = Math.floor(minPerUnit);
  const s = Math.round((minPerUnit - m) * 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PaceCalculator() {
  const [mode, setMode] = useState<Mode>("pace");
  const [unit, setUnit] = useState<"km" | "mi">("km");
  const [distance, setDistance] = useState(10);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(50);
  const [seconds, setSeconds] = useState(0);
  const [paceMin, setPaceMin] = useState(5);
  const [paceSec, setPaceSec] = useState(0);

  const totalMin = hours * 60 + minutes + seconds / 60;
  const totalPace = paceMin + paceSec / 60;

  let outPace = 0, outTime = 0, outDistance = 0;
  if (mode === "pace") {
    outPace = distance > 0 ? totalMin / distance : 0;
  } else if (mode === "time") {
    outTime = distance * totalPace;
  } else {
    outDistance = totalPace > 0 ? totalMin / totalPace : 0;
  }

  // Cross-conversion
  const KM_PER_MI = 1.609344;
  const paceKm = unit === "km" ? outPace : outPace / KM_PER_MI;
  const paceMi = unit === "mi" ? outPace : outPace * KM_PER_MI;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <div className="flex gap-2 mb-3">
          {(["pace", "time", "distance"] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`px-3 py-1.5 rounded-md text-sm border ${mode === m ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}>Find {m}</button>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          {(["km", "mi"] as const).map((u) => (
            <button key={u} onClick={() => setUnit(u)} className={`px-3 py-1.5 rounded-md text-xs border ${unit === u ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}>{u}</button>
          ))}
        </div>
        {mode !== "distance" && (
          <Lbl label={`Distance (${unit})`}><input type="number" min={0} step="0.01" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        )}
        {mode !== "time" && (
          <div>
            <span className="block text-xs text-[var(--color-muted)] mb-1">Time</span>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <input type="number" min={0} value={hours} onChange={(e) => setHours(Number(e.target.value))} className={inputCls("font-mono")} placeholder="h" />
              <input type="number" min={0} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className={inputCls("font-mono")} placeholder="m" />
              <input type="number" min={0} value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} className={inputCls("font-mono")} placeholder="s" />
            </div>
          </div>
        )}
        {mode !== "pace" && (
          <div>
            <span className="block text-xs text-[var(--color-muted)] mb-1">Pace (min:sec / {unit})</span>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <input type="number" min={0} value={paceMin} onChange={(e) => setPaceMin(Number(e.target.value))} className={inputCls("font-mono")} placeholder="min" />
              <input type="number" min={0} value={paceSec} onChange={(e) => setPaceSec(Number(e.target.value))} className={inputCls("font-mono")} placeholder="sec" />
            </div>
          </div>
        )}
      </Panel>
      <Panel title="Result">
        {mode === "pace" && (
          <>
            <div className="text-5xl font-bold tabular-nums">{fmtPace(outPace)}</div>
            <div className="text-sm text-[var(--color-muted)] mt-1">min / {unit}</div>
            <div className="mt-4 text-sm space-y-1">
              <div>Pace: <span className="font-mono">{fmtPace(paceKm)}</span> /km · <span className="font-mono">{fmtPace(paceMi)}</span> /mi</div>
            </div>
          </>
        )}
        {mode === "time" && (
          <>
            <div className="text-5xl font-bold tabular-nums">{fmt(outTime)}</div>
            <div className="text-sm text-[var(--color-muted)] mt-1">total time</div>
          </>
        )}
        {mode === "distance" && (
          <>
            <div className="text-5xl font-bold tabular-nums">{outDistance.toFixed(2)}</div>
            <div className="text-sm text-[var(--color-muted)] mt-1">{unit}</div>
          </>
        )}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
