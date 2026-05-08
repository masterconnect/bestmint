"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const FREQ: Record<string, number | "cont"> = {
  Annually: 1, Semi: 2, Quarterly: 4, Monthly: 12, Daily: 365, Continuously: "cont",
};

export default function CompoundInterestCalculator() {
  const [P, setP] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState<keyof typeof FREQ>("Monthly");
  const [contrib, setContrib] = useState(200);

  const { final, contributed, interest, breakdown } = useMemo(() => {
    const r = rate / 100;
    const f = FREQ[freq];
    const rows: { y: number; balance: number }[] = [];
    let bal = P;
    if (f === "cont") {
      for (let y = 1; y <= years; y++) {
        const start = bal;
        bal = start * Math.exp(r) + contrib * 12 * (Math.exp(r) - 1) / r;
        rows.push({ y, balance: bal });
      }
    } else {
      const n = f as number;
      const periodRate = r / n;
      const monthsPerPeriod = 12 / n;
      for (let y = 1; y <= years; y++) {
        for (let p = 0; p < n; p++) {
          bal = bal * (1 + periodRate) + contrib * monthsPerPeriod;
        }
        rows.push({ y, balance: bal });
      }
    }
    const totalContrib = P + contrib * 12 * years;
    return { final: bal, contributed: totalContrib, interest: bal - totalContrib, breakdown: rows };
  }, [P, rate, years, freq, contrib]);

  const ok = P >= 0 && years > 0 && rate >= 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Inputs">
        <Lbl label="Principal ($)"><input type="number" min={0} value={P} onChange={(e) => setP(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Annual rate (%)"><input type="number" min={0} step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Years"><input type="number" min={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputCls()} /></Lbl>
        <Lbl label="Compounding">
          <select value={freq} onChange={(e) => setFreq(e.target.value as keyof typeof FREQ)} className={inputCls()}>
            {Object.keys(FREQ).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </Lbl>
        <Lbl label="Monthly contribution ($)"><input type="number" min={0} value={contrib} onChange={(e) => setContrib(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
      </Panel>
      <Panel title="Results">
        {ok ? (
          <>
            <div className="text-5xl font-bold tabular-nums">${final.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            <div className="text-sm text-[var(--color-muted)] mt-1">Final balance</div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <Cell label="Total contributed" value={`$${contributed.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
              <Cell label="Interest earned" value={`$${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
            </div>
          </>
        ) : <p className="text-sm text-[var(--color-muted)]">Enter valid values.</p>}
      </Panel>
      {ok && (
        <div className="lg:col-span-2">
          <Panel title="Year-by-year">
            <div className="overflow-auto max-h-72">
              <table className="w-full text-sm tabular-nums">
                <thead className="text-[var(--color-muted)] sticky top-0 bg-[var(--color-surface)]"><tr><th className="text-left p-2">Year</th><th className="text-right p-2">Balance</th></tr></thead>
                <tbody>
                  {breakdown.map((r) => (
                    <tr key={r.y} className="border-t border-[var(--color-border)]"><td className="p-2">{r.y}</td><td className="p-2 text-right">${r.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Cell({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-[var(--color-border)] p-3"><div className="text-xs text-[var(--color-muted)]">{label}</div><div className="mt-1 font-semibold">{value}</div></div>;
}
