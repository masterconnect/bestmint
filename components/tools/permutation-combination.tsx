"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function fact(n: bigint): bigint {
  let r = 1n;
  for (let i = 2n; i <= n; i++) r *= i;
  return r;
}

export default function PermutationCombination() {
  const [n, setN] = useState(10);
  const [r, setR] = useState(3);

  const ok = Number.isInteger(n) && Number.isInteger(r) && n >= 0 && r >= 0 && r <= n;

  let nPr = "—", nCr = "—";
  if (ok) {
    try {
      const nB = BigInt(n);
      const rB = BigInt(r);
      const nFact = fact(nB);
      const denomP = fact(nB - rB);
      const P = nFact / denomP;
      const C = P / fact(rB);
      nPr = P.toString();
      nCr = C.toString();
    } catch { /* overflow */ }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="n (total items)"><input type="number" min={0} step="1" value={n} onChange={(e) => setN(Math.floor(Number(e.target.value)))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="r (chosen)"><input type="number" min={0} step="1" value={r} onChange={(e) => setR(Math.floor(Number(e.target.value)))} className={inputCls("font-mono")} /></Lbl>
        <p className="mt-2 text-xs text-[var(--color-muted)]">nPr = n! / (n−r)! · nCr = n! / (r!(n−r)!)</p>
      </Panel>
      <Panel title="Results">
        {ok ? (
          <>
            <div className="border-b border-[var(--color-border)] py-3">
              <div className="text-xs text-[var(--color-muted)]">Permutations (order matters)</div>
              <div className="text-3xl font-bold tabular-nums break-all mt-1">{n}P{r} = {nPr}</div>
            </div>
            <div className="py-3">
              <div className="text-xs text-[var(--color-muted)]">Combinations (order ignored)</div>
              <div className="text-3xl font-bold tabular-nums break-all mt-1">{n}C{r} = {nCr}</div>
            </div>
          </>
        ) : <p className="text-sm text-red-400">Need integers with 0 ≤ r ≤ n.</p>}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
