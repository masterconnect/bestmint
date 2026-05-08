"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function PercentageCalculator() {
  const [a1, setA1] = useState(20); const [b1, setB1] = useState(150);
  const [a2, setA2] = useState(30); const [b2, setB2] = useState(120);
  const [a3, setA3] = useState(120); const [b3, setB3] = useState(180);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Panel title="What is X% of Y?">
        <Field label="X (%)" value={a1} onChange={setA1} />
        <Field label="Y" value={b1} onChange={setB1} />
        <Result label="Result" value={`${(a1 * b1 / 100).toFixed(2)}`} />
      </Panel>
      <Panel title="X is what % of Y?">
        <Field label="X" value={a2} onChange={setA2} />
        <Field label="Y" value={b2} onChange={setB2} />
        <Result label="Result" value={`${b2 ? (a2 / b2 * 100).toFixed(2) : "—"}%`} />
      </Panel>
      <Panel title="% change from A → B">
        <Field label="A (old)" value={a3} onChange={setA3} />
        <Field label="B (new)" value={b3} onChange={setB3} />
        <Result label="Result" value={a3 ? `${((b3 - a3) / a3 * 100).toFixed(2)}%` : "—"} />
      </Panel>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className={inputCls("font-mono")} />
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">
      <div className="text-xs text-[var(--color-muted)]">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
