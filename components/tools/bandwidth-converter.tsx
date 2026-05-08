"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const UNITS: Record<string, number> = {
  bps: 1,
  Kbps: 1e3,
  Mbps: 1e6,
  Gbps: 1e9,
  Tbps: 1e12,
  Bps: 8,
  KBps: 8e3,
  MBps: 8e6,
  GBps: 8e9,
};

export default function BandwidthConverter() {
  const [val, setVal] = useState(100);
  const [unit, setUnit] = useState<keyof typeof UNITS>("Mbps");
  const bps = val * UNITS[unit];

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Panel title="From">
        <Lbl label="Value"><input type="number" min={0} step="any" value={val} onChange={(e) => setVal(Number(e.target.value))} className={inputCls("font-mono")} /></Lbl>
        <Lbl label="Unit">
          <select value={unit} onChange={(e) => setUnit(e.target.value as keyof typeof UNITS)} className={inputCls()}>
            {Object.keys(UNITS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </Lbl>
      </Panel>
      <div className="lg:col-span-2">
        <Panel title="All units">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(UNITS).map(([k, factor]) => (
              <div key={k} className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm ${k === unit ? "border-[var(--color-accent)]" : "border-[var(--color-border)]"}`}>
                <span className="text-[var(--color-muted)]">{k}</span>
                <span className="font-mono tabular-nums">{Number((bps / factor).toPrecision(8))}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--color-muted)]">b = bits, B = bytes (8 bits). Mbps ≠ MB/s — divide Mbps by 8 to get MB/s.</p>
        </Panel>
      </div>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
