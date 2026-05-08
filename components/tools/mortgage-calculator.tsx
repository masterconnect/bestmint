"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function MortgageCalculator() {
  const [price, setPrice] = useState(400000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [taxAnnual, setTaxAnnual] = useState(4800);
  const [insAnnual, setInsAnnual] = useState(1200);
  const [hoa, setHoa] = useState(0);

  const down = price * (downPct / 100);
  const principal = Math.max(0, price - down);

  const { pi, total, totalLoan } = useMemo(() => {
    const n = Math.max(1, years * 12);
    const r = rate / 100 / 12;
    const M = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const monthlyEx = taxAnnual / 12 + insAnnual / 12 + hoa;
    return { pi: M, total: M + monthlyEx, totalLoan: M * n };
  }, [principal, rate, years, taxAnnual, insAnnual, hoa]);

  const ok = price > 0 && years > 0 && rate >= 0 && downPct >= 0 && downPct <= 100;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Home & loan">
        <Lbl label="Home price ($)"><input type="number" min={0} step="1000" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label={`Down payment (${downPct.toFixed(1)}% = $${down.toLocaleString(undefined, { maximumFractionDigits: 0 })})`}>
          <input type="range" min={0} max={50} step="0.5" value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
        </Lbl>
        <Lbl label="Interest rate (%)"><input type="number" min={0} step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Term (years)"><input type="number" min={1} step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputCls()} /></Lbl>
      </Panel>
      <Panel title="Taxes, insurance, HOA">
        <Lbl label="Property tax / year ($)"><input type="number" min={0} value={taxAnnual} onChange={(e) => setTaxAnnual(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Homeowners insurance / year ($)"><input type="number" min={0} value={insAnnual} onChange={(e) => setInsAnnual(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="HOA / month ($)"><input type="number" min={0} value={hoa} onChange={(e) => setHoa(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
      </Panel>
      <div className="lg:col-span-2">
        <Panel title="Monthly breakdown">
          {ok ? (
            <>
              <Big label="Principal & interest" value={pi} />
              <Big label="Property tax" value={taxAnnual / 12} />
              <Big label="Insurance" value={insAnnual / 12} />
              <Big label="HOA" value={hoa} />
              <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                <Big label="Total monthly" value={total} bold />
                <Big label="Loan principal" value={principal} />
                <Big label="Total over loan (P&I)" value={totalLoan} />
              </div>
            </>
          ) : <p className="text-sm text-[var(--color-muted)]">Enter valid values.</p>}
        </Panel>
      </div>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Big({ label, value, bold = false }: { label: string; value: number; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--color-border)] py-2 last:border-0">
      <span className={`text-sm ${bold ? "font-medium" : "text-[var(--color-muted)]"}`}>{label}</span>
      <span className={`tabular-nums ${bold ? "text-3xl font-bold" : "text-xl font-semibold"}`}>${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
    </div>
  );
}
