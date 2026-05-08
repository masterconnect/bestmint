"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(20000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(5);

  const { monthly, totalPaid, totalInterest, schedule } = useMemo(() => {
    const n = Math.max(1, Math.round(years * 12));
    const r = rate / 100 / 12;
    const M = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    let bal = principal;
    const rows: { i: number; interest: number; pr: number; balance: number }[] = [];
    for (let i = 1; i <= Math.min(12, n); i++) {
      const interest = bal * r;
      const pr = M - interest;
      bal -= pr;
      rows.push({ i, interest, pr, balance: Math.max(0, bal) });
    }
    return {
      monthly: M,
      totalPaid: M * n,
      totalInterest: M * n - principal,
      schedule: rows,
    };
  }, [principal, rate, years]);

  const ok = principal > 0 && years > 0 && rate >= 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Loan terms">
        <Lbl label="Loan amount ($)"><input type="number" min={0} step="100" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Annual interest rate (%)"><input type="number" min={0} step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Term (years)"><input type="number" min={1} step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputCls()} /></Lbl>
      </Panel>
      <Panel title="Payment summary">
        {ok ? (
          <>
            <Big label="Monthly payment" value={monthly} />
            <Big label="Total paid" value={totalPaid} />
            <Big label="Total interest" value={totalInterest} />
          </>
        ) : <p className="text-sm text-[var(--color-muted)]">Enter valid loan terms.</p>}
      </Panel>
      {ok && (
        <div className="lg:col-span-2">
          <Panel title="First 12 months">
            <div className="overflow-auto">
              <table className="w-full text-sm tabular-nums">
                <thead className="text-[var(--color-muted)]">
                  <tr><th className="text-left p-2">#</th><th className="text-right p-2">Interest</th><th className="text-right p-2">Principal</th><th className="text-right p-2">Balance</th></tr>
                </thead>
                <tbody>
                  {schedule.map((r) => (
                    <tr key={r.i} className="border-t border-[var(--color-border)]">
                      <td className="p-2">{r.i}</td>
                      <td className="p-2 text-right">${r.interest.toFixed(2)}</td>
                      <td className="p-2 text-right">${r.pr.toFixed(2)}</td>
                      <td className="p-2 text-right">${r.balance.toFixed(2)}</td>
                    </tr>
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
function Big({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--color-border)] py-3 last:border-0">
      <span className="text-[var(--color-muted)] text-sm">{label}</span>
      <span className="text-3xl font-semibold tabular-nums">${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
    </div>
  );
}
