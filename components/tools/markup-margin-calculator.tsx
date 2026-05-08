"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

type Mode = "markup" | "margin" | "price";

export default function MarkupMarginCalculator() {
  const [cost, setCost] = useState(50);
  const [mode, setMode] = useState<Mode>("markup");
  const [val, setVal] = useState(50);

  let price = 0, markup = 0, margin = 0;
  if (cost > 0) {
    if (mode === "markup") {
      markup = val;
      price = cost * (1 + markup / 100);
      margin = price > 0 ? ((price - cost) / price) * 100 : 0;
    } else if (mode === "margin") {
      margin = Math.min(val, 99.99);
      price = cost / (1 - margin / 100);
      markup = ((price - cost) / cost) * 100;
    } else {
      price = val;
      markup = ((price - cost) / cost) * 100;
      margin = price > 0 ? ((price - cost) / price) * 100 : 0;
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Cost ($)"><input type="number" min={0} step="0.01" value={cost} onChange={(e) => setCost(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <div className="flex gap-2 mb-3">
          {(["markup", "margin", "price"] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`px-3 py-1.5 rounded-md text-sm border ${mode === m ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`}>
              {m === "markup" ? "Markup %" : m === "margin" ? "Margin %" : "Price"}
            </button>
          ))}
        </div>
        <Lbl label={mode === "price" ? "Price ($)" : `${mode === "markup" ? "Markup" : "Margin"} (%)`}>
          <input type="number" min={0} step="0.01" value={val} onChange={(e) => setVal(Number(e.target.value))} className={inputCls("font-mono")} />
        </Lbl>
      </Panel>
      <Panel title="Results">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Cell label="Cost" value={`$${cost.toFixed(2)}`} />
          <Cell label="Price" value={`$${price.toFixed(2)}`} />
          <Cell label="Markup %" value={`${markup.toFixed(2)}%`} />
          <Cell label="Margin %" value={`${margin.toFixed(2)}%`} />
        </div>
        <p className="mt-4 text-xs text-[var(--color-muted)]">Markup = (price − cost) / cost. Margin = (price − cost) / price.</p>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Cell({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-[var(--color-border)] p-3"><div className="text-xs text-[var(--color-muted)]">{label}</div><div className="mt-1 text-2xl font-bold tabular-nums">{value}</div></div>;
}
