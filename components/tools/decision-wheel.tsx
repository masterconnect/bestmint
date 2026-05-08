"use client";
import { useState } from "react";
import { btnGhost, btnPrimary, inputCls, Panel } from "@/components/ui/panel";

function rd(n: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }

const COLORS = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"];

export default function DecisionWheel() {
  const [opts, setOpts] = useState<string[]>(["Pizza", "Burger", "Sushi", "Tacos", "Salad", "Pasta"]);
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  function spin() {
    if (opts.length < 2) return;
    setSpinning(true);
    setWinner(null);
    const choice = rd(opts.length);
    const slice = 360 / opts.length;
    // Pointer at top: rotate so chosen slice center is at the top
    const target = 360 * 6 + (360 - (choice * slice + slice / 2));
    setAngle(target);
    setTimeout(() => {
      setWinner(opts[choice]);
      setSpinning(false);
    }, 4200);
  }

  function update(i: number, v: string) { setOpts((p) => p.map((x, idx) => (idx === i ? v : x))); }
  function remove(i: number) { setOpts((p) => p.filter((_, idx) => idx !== i)); }
  function add() { setOpts((p) => [...p, ""]); }

  // Build conic-gradient string
  const slice = 360 / Math.max(opts.length, 1);
  const stops = opts.map((_, i) => `${COLORS[i % COLORS.length]} ${i * slice}deg ${(i + 1) * slice}deg`).join(", ");

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Options" action={<button onClick={add} className={btnGhost("text-xs px-2.5 py-1")}>+ Option</button>}>
        <div className="space-y-2">
          {opts.map((o, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
              <input value={o} onChange={(e) => update(i, e.target.value)} className={inputCls("flex-1")} />
              <button onClick={() => remove(i)} className={btnGhost("text-xs px-2 py-1")}>×</button>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Wheel">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div
              className="rounded-full"
              style={{
                width: 280,
                height: 280,
                background: opts.length ? `conic-gradient(${stops})` : "var(--color-border)",
                transform: `rotate(${angle}deg)`,
                transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.21, 0.99)" : "none",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0" style={{ borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: "20px solid var(--color-accent)" }} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border)]" />
            </div>
          </div>
          <button onClick={spin} disabled={spinning || opts.length < 2} className={btnPrimary("mt-6 px-8 py-3")}>{spinning ? "Spinning…" : "Spin"}</button>
          {winner && !spinning && <div className="mt-3 text-xl">Winner: <span className="font-semibold text-[var(--color-accent)]">{winner}</span></div>}
        </div>
      </Panel>
    </div>
  );
}
