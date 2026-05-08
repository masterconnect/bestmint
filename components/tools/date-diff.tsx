"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function DateDiff() {
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));
  const [businessOnly, setBusinessOnly] = useState(false);

  const a = new Date(start), b = new Date(end);
  const ok = !isNaN(a.getTime()) && !isNaN(b.getTime());
  const total = ok ? Math.floor((b.getTime() - a.getTime()) / 86400000) : 0;
  const absTotal = Math.abs(total);

  let business = 0;
  if (ok && businessOnly) {
    const sign = total >= 0 ? 1 : -1;
    const cur = new Date(Math.min(a.getTime(), b.getTime()));
    const target = new Date(Math.max(a.getTime(), b.getTime()));
    while (cur < target) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) business++;
      cur.setDate(cur.getDate() + 1);
    }
    business *= sign;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Dates">
        <Lbl label="Start"><input type="date" value={start} onChange={(e) => setStart(e.target.value)} className={inputCls()} /></Lbl>
        <Lbl label="End"><input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className={inputCls()} /></Lbl>
        <label className="flex items-center gap-2 text-sm mt-2">
          <input type="checkbox" checked={businessOnly} onChange={(e) => setBusinessOnly(e.target.checked)} className="accent-[var(--color-accent)]" />
          Show business days
        </label>
      </Panel>
      <Panel title="Difference">
        {ok ? (
          <div className="space-y-3">
            <Big label="Days" value={absTotal} />
            <Big label="Weeks" value={Math.floor(absTotal / 7)} suffix={` (+${absTotal % 7} days)`} />
            <Big label="Months (avg)" value={Number((absTotal / 30.4375).toFixed(2))} />
            <Big label="Years (avg)" value={Number((absTotal / 365.25).toFixed(2))} />
            {businessOnly && <Big label="Business days" value={Math.abs(business)} />}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-muted)]">Pick valid start and end dates.</p>
        )}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Big({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--color-border)] py-2 last:border-0">
      <span className="text-sm text-[var(--color-muted)]">{label}</span>
      <span className="font-mono text-2xl tabular-nums">{value}{suffix}</span>
    </div>
  );
}
