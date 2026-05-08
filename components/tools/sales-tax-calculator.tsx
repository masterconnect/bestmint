"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function SalesTaxCalculator() {
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(8.875);
  const [total, setTotal] = useState(108.88);
  const [rateR, setRateR] = useState(8.875);

  const tax = amount * (rate / 100);
  const totalForward = amount + tax;

  const preTax = total / (1 + rateR / 100);
  const taxAmount = total - preTax;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Forward: pre-tax → total">
        <Lbl label="Amount ($)"><input type="number" min={0} step="0.01" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Tax rate (%)"><input type="number" min={0} step="0.001" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <div className="mt-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">
          <div className="text-xs text-[var(--color-muted)]">Total with tax</div>
          <div className="mt-1 text-3xl font-bold tabular-nums">${totalForward.toFixed(2)}</div>
          <div className="text-sm text-[var(--color-muted)] mt-1">Tax: ${tax.toFixed(2)}</div>
        </div>
      </Panel>
      <Panel title="Reverse: total → pre-tax">
        <Lbl label="Total amount ($)"><input type="number" min={0} step="0.01" value={total} onChange={(e) => setTotal(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Tax rate (%)"><input type="number" min={0} step="0.001" value={rateR} onChange={(e) => setRateR(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <div className="mt-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">
          <div className="text-xs text-[var(--color-muted)]">Pre-tax amount</div>
          <div className="mt-1 text-3xl font-bold tabular-nums">${preTax.toFixed(2)}</div>
          <div className="text-sm text-[var(--color-muted)] mt-1">Tax: ${taxAmount.toFixed(2)}</div>
        </div>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
