"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, inputCls, Panel } from "@/components/ui/panel";

interface Stop { color: string; pos: number; }

export default function GradientGenerator() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([
    { color: "#6366f1", pos: 0 },
    { color: "#ec4899", pos: 100 },
  ]);

  const css = type === "linear"
    ? `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.pos}%`).join(", ")})`
    : `radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.pos}%`).join(", ")})`;

  return (
    <div className="space-y-4">
      <Panel title="Preview" action={<CopyButton value={`background: ${css};`} />}>
        <div className="h-48 rounded-lg" style={{ background: css }} />
        <code className="block mt-3 text-xs font-mono break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2">background: {css};</code>
      </Panel>
      <Panel title="Settings">
        <div className="flex gap-2 mb-4">
          <button className={btnGhost(type === "linear" ? "ring-2 ring-[var(--color-accent)] text-xs" : "text-xs")} onClick={() => setType("linear")}>Linear</button>
          <button className={btnGhost(type === "radial" ? "ring-2 ring-[var(--color-accent)] text-xs" : "text-xs")} onClick={() => setType("radial")}>Radial</button>
          {type === "linear" && (
            <label className="flex items-center gap-2 ml-2 text-sm">
              <span className="text-[var(--color-muted)]">Angle</span>
              <input type="number" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className={inputCls("w-24")} />
            </label>
          )}
        </div>
        <div className="space-y-2">
          {stops.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="color" value={s.color} onChange={(e) => { const ns = [...stops]; ns[i].color = e.target.value; setStops(ns); }} className="h-9 w-12 rounded cursor-pointer" />
              <input type="text" value={s.color} onChange={(e) => { const ns = [...stops]; ns[i].color = e.target.value; setStops(ns); }} className={inputCls("font-mono w-32")} />
              <input type="range" min={0} max={100} value={s.pos} onChange={(e) => { const ns = [...stops]; ns[i].pos = Number(e.target.value); setStops(ns); }} className="flex-1 accent-[var(--color-accent)]" />
              <span className="w-10 text-right text-xs text-[var(--color-muted)]">{s.pos}%</span>
              {stops.length > 2 && <button onClick={() => setStops(stops.filter((_, idx) => idx !== i))} className="text-[var(--color-muted)] hover:text-red-400">×</button>}
            </div>
          ))}
        </div>
        <button className={btnGhost("text-xs mt-3")} onClick={() => setStops([...stops, { color: "#22c55e", pos: 50 }])}>+ Add stop</button>
      </Panel>
    </div>
  );
}
