"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}
function simplify(n: number, d: number): [number, number] {
  if (d === 0) return [n, 0];
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(Math.round(n)), Math.abs(Math.round(d)));
  return [Math.round(n) / g, Math.round(d) / g];
}

export default function FractionCalculator() {
  const [n1, setN1] = useState(1);
  const [d1, setD1] = useState(2);
  const [n2, setN2] = useState(1);
  const [d2, setD2] = useState(3);
  const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");

  let resN = 0, resD = 1, valid = true, error = "";
  if (d1 === 0 || d2 === 0) { valid = false; error = "Denominators cannot be 0."; }
  else {
    if (op === "+") { resN = n1 * d2 + n2 * d1; resD = d1 * d2; }
    else if (op === "-") { resN = n1 * d2 - n2 * d1; resD = d1 * d2; }
    else if (op === "*") { resN = n1 * n2; resD = d1 * d2; }
    else {
      if (n2 === 0) { valid = false; error = "Cannot divide by 0."; }
      else { resN = n1 * d2; resD = d1 * n2; }
    }
  }
  const [sn, sd] = valid ? simplify(resN, resD) : [0, 1];
  const decimal = valid && sd !== 0 ? sn / sd : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <div className="flex items-center gap-2 mb-3">
          <FracInput n={n1} d={d1} setN={setN1} setD={setD1} />
          <select value={op} onChange={(e) => setOp(e.target.value as typeof op)} className={inputCls("w-20")}>
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
          <FracInput n={n2} d={d2} setN={setN2} setD={setD2} />
        </div>
      </Panel>
      <Panel title="Result">
        {valid ? (
          <>
            <div className="text-xs text-[var(--color-muted)]">Simplified</div>
            <div className="text-6xl font-bold tabular-nums">
              {sd === 0 ? "—" : sd === 1 ? sn : <span className="inline-flex flex-col items-center text-4xl"><span>{sn}</span><span className="border-t-2 border-current px-2">{sd}</span></span>}
            </div>
            <div className="mt-4 text-sm">
              Raw: <span className="font-mono">{resN}/{resD}</span>
            </div>
            <div className="text-sm">
              Decimal: <span className="font-mono">{decimal.toFixed(6)}</span>
            </div>
          </>
        ) : <p className="text-sm text-red-400">{error}</p>}
      </Panel>
    </div>
  );
}

function FracInput({ n, d, setN, setD }: { n: number; d: number; setN: (v: number) => void; setD: (v: number) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} className={inputCls("w-24 text-center font-mono")} />
      <div className="border-t-2 border-[var(--color-border)]" />
      <input type="number" value={d} onChange={(e) => setD(Number(e.target.value))} className={inputCls("w-24 text-center font-mono")} />
    </div>
  );
}
