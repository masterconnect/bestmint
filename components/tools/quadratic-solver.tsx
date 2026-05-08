"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function QuadraticSolver() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(2);

  const disc = b * b - 4 * a * c;
  let roots: { x1: string; x2: string; complex: boolean } | null = null;
  if (a !== 0) {
    if (disc >= 0) {
      const s = Math.sqrt(disc);
      const x1 = (-b + s) / (2 * a);
      const x2 = (-b - s) / (2 * a);
      roots = { x1: fmt(x1), x2: fmt(x2), complex: false };
    } else {
      const re = -b / (2 * a);
      const im = Math.sqrt(-disc) / (2 * a);
      roots = { x1: `${fmt(re)} + ${fmt(Math.abs(im))}i`, x2: `${fmt(re)} − ${fmt(Math.abs(im))}i`, complex: true };
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="ax² + bx + c = 0">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Lbl label="a"><input type="number" step="any" value={a} onChange={(e) => setA(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
          <Lbl label="b"><input type="number" step="any" value={b} onChange={(e) => setB(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
          <Lbl label="c"><input type="number" step="any" value={c} onChange={(e) => setC(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        </div>
        <div className="text-sm font-mono">{a}x² {b >= 0 ? "+" : ""} {b}x {c >= 0 ? "+" : ""} {c} = 0</div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">x = (−b ± √(b² − 4ac)) / (2a)</p>
      </Panel>
      <Panel title="Solutions">
        {a === 0 ? (
          <p className="text-sm text-red-400">a cannot be 0 (not quadratic).</p>
        ) : roots ? (
          <>
            <div className="text-sm text-[var(--color-muted)]">Discriminant b² − 4ac</div>
            <div className="text-2xl font-semibold tabular-nums">{fmt(disc)}</div>
            <div className="mt-4 grid gap-2">
              <Cell label="x₁" value={roots.x1} />
              <Cell label="x₂" value={roots.x2} />
            </div>
            <p className={`mt-3 text-xs ${roots.complex ? "text-amber-400" : "text-emerald-400"}`}>{roots.complex ? "Complex roots (disc < 0)" : disc === 0 ? "One repeated real root" : "Two real roots"}</p>
          </>
        ) : null}
      </Panel>
    </div>
  );
}

function fmt(n: number) {
  return Number(n.toFixed(6)).toString();
}
function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Cell({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-[var(--color-border)] p-3 flex items-baseline justify-between"><span className="text-xs text-[var(--color-muted)]">{label}</span><span className="text-2xl font-bold tabular-nums">{value}</span></div>;
}
