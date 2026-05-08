"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function DiscountCalculator() {
  const [orig, setOrig] = useState(100);
  const [pct, setPct] = useState(20);
  const [origR, setOrigR] = useState(100);
  const [sale, setSale] = useState(75);

  const savings = orig * (pct / 100);
  const salePrice = orig - savings;

  const reverseSavings = origR - sale;
  const reversePct = origR > 0 ? (reverseSavings / origR) * 100 : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Forward: original → sale">
        <Lbl label="Original price ($)"><input type="number" min={0} step="0.01" value={orig} onChange={(e) => setOrig(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label={`Discount ${pct}%`}>
          <input type="range" min={0} max={100} value={pct} onChange={(e) => setPct(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
        </Lbl>
        <div className="mt-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">
          <div className="text-xs text-[var(--color-muted)]">Sale price</div>
          <div className="mt-1 text-3xl font-bold tabular-nums">${salePrice.toFixed(2)}</div>
          <div className="text-sm text-emerald-400 mt-1">You save ${savings.toFixed(2)}</div>
        </div>
      </Panel>
      <Panel title="Reverse: prices → discount %">
        <Lbl label="Original price ($)"><input type="number" min={0} step="0.01" value={origR} onChange={(e) => setOrigR(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Sale price ($)"><input type="number" min={0} step="0.01" value={sale} onChange={(e) => setSale(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <div className="mt-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">
          <div className="text-xs text-[var(--color-muted)]">Discount %</div>
          <div className="mt-1 text-3xl font-bold tabular-nums">{origR > 0 ? `${reversePct.toFixed(2)}%` : "—"}</div>
          <div className="text-sm text-emerald-400 mt-1">Saved ${Math.max(0, reverseSavings).toFixed(2)}</div>
        </div>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
