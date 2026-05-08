"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(2);
  const tipAmount = bill * tip / 100;
  const total = bill + tipAmount;
  const perPerson = people > 0 ? total / people : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Bill amount"><input type="number" min={0} step="0.01" value={bill} onChange={(e) => setBill(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label={`Tip ${tip}%`}>
          <input type="range" min={0} max={30} value={tip} onChange={(e) => setTip(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
        </Lbl>
        <Lbl label="People"><input type="number" min={1} value={people} onChange={(e) => setPeople(Number(e.target.value))} className={inputCls()} /></Lbl>
      </Panel>
      <Panel title="Totals">
        <Big label="Tip" value={tipAmount} />
        <Big label="Total" value={total} />
        <Big label="Per person" value={perPerson} />
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}

function Big({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--color-border)] py-3 last:border-0">
      <span className="text-[var(--color-muted)] text-sm">{label}</span>
      <span className="text-3xl font-semibold tabular-nums">${value.toFixed(2)}</span>
    </div>
  );
}
