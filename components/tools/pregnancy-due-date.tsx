"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

export default function PregnancyDueDate() {
  const [lmp, setLmp] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 60);
    return d.toISOString().slice(0, 10);
  });

  const lmpDate = new Date(lmp);
  const ok = !isNaN(lmpDate.getTime());
  const due = ok ? new Date(lmpDate.getTime() + 280 * 86400000) : null;
  const today = new Date();
  const daysSinceLmp = ok ? Math.floor((today.getTime() - lmpDate.getTime()) / 86400000) : 0;
  const week = Math.floor(daysSinceLmp / 7);
  const day = daysSinceLmp % 7;
  const trimester = week < 14 ? 1 : week < 28 ? 2 : 3;
  const remaining = due ? Math.max(0, Math.floor((due.getTime() - today.getTime()) / 86400000)) : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Last menstrual period">
        <Lbl label="LMP date"><input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className={inputCls()} /></Lbl>
        <p className="mt-3 text-xs text-[var(--color-muted)]">Naegele&apos;s rule: due date = LMP + 280 days. Always confirm with a clinician — ultrasound dating is more accurate.</p>
      </Panel>
      <Panel title="Result">
        {ok && due ? (
          <>
            <div className="text-xs text-[var(--color-muted)]">Estimated due date</div>
            <div className="text-3xl font-bold tabular-nums mt-1">{due.toDateString()}</div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <Cell label="Current week" value={daysSinceLmp >= 0 ? `${week}w ${day}d` : "Before LMP"} />
              <Cell label="Trimester" value={daysSinceLmp >= 0 ? `${trimester}` : "—"} />
              <Cell label="Days remaining" value={`${remaining}`} />
              <Cell label="Days since LMP" value={`${Math.max(0, daysSinceLmp)}`} />
            </div>
          </>
        ) : <p className="text-sm text-[var(--color-muted)]">Pick a valid date.</p>}
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
function Cell({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-[var(--color-border)] p-3"><div className="text-xs text-[var(--color-muted)]">{label}</div><div className="mt-1 font-semibold">{value}</div></div>;
}
