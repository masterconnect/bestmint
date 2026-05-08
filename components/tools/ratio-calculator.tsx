"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

type V = { val: string };

export default function RatioCalculator() {
  const [a, setA] = useState<V>({ val: "2" });
  const [b, setB] = useState<V>({ val: "3" });
  const [c, setC] = useState<V>({ val: "10" });
  const [d, setD] = useState<V>({ val: "" });

  const A = a.val === "" ? null : Number(a.val);
  const B = b.val === "" ? null : Number(b.val);
  const C = c.val === "" ? null : Number(c.val);
  const D = d.val === "" ? null : Number(d.val);

  const blanks = [A, B, C, D].filter((x) => x === null).length;
  const status = blanks === 1 ? "ok" : blanks === 0 ? "all" : "many";

  let result: { label: string; value: number } | null = null;
  if (status === "ok") {
    if (A === null && B && C && D) result = { label: "A", value: (B * C) / D };
    if (B === null && A && C && D) result = { label: "B", value: (A * D) / C };
    if (C === null && A && B && D) result = { label: "C", value: (A * D) / B };
    if (D === null && A && B && C) result = { label: "D", value: (B * C) / A };
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="A : B = C : D (leave one blank)">
        <div className="flex items-center gap-2">
          <Cell value={a.val} onChange={(v) => setA({ val: v })} disabled={A === null && status === "ok"} />
          <span>:</span>
          <Cell value={b.val} onChange={(v) => setB({ val: v })} disabled={B === null && status === "ok"} />
          <span className="px-1">=</span>
          <Cell value={c.val} onChange={(v) => setC({ val: v })} disabled={C === null && status === "ok"} />
          <span>:</span>
          <Cell value={d.val} onChange={(v) => setD({ val: v })} disabled={D === null && status === "ok"} />
        </div>
        <p className="text-xs text-[var(--color-muted)] mt-3">Solves the proportion A/B = C/D for the missing value.</p>
      </Panel>
      <Panel title="Result">
        {result && isFinite(result.value) ? (
          <>
            <div className="text-xs text-[var(--color-muted)]">{result.label} =</div>
            <div className="text-6xl font-bold tabular-nums mt-1">{Number(result.value.toFixed(6))}</div>
          </>
        ) : status === "many" ? (
          <p className="text-sm text-amber-400">Leave exactly one field blank.</p>
        ) : status === "all" ? (
          <p className="text-sm text-[var(--color-muted)]">All four are filled — clear one to solve.</p>
        ) : (
          <p className="text-sm text-red-400">Need non-zero divisors.</p>
        )}
      </Panel>
    </div>
  );
}

function Cell({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return <input type="number" value={value} onChange={(e) => onChange(e.target.value)} className={inputCls(`w-24 font-mono text-center ${disabled ? "opacity-60" : ""}`)} placeholder="?" />;
}
