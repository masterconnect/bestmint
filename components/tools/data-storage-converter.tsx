"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const UNITS: Record<string, number> = {
  bit: 1 / 8,
  B: 1,
  KB: 1e3,
  MB: 1e6,
  GB: 1e9,
  TB: 1e12,
  PB: 1e15,
  KiB: 1024,
  MiB: 1024 ** 2,
  GiB: 1024 ** 3,
  TiB: 1024 ** 4,
  PiB: 1024 ** 5,
};

export default function DataStorageConverter() {
  const [val, setVal] = useState(1);
  const [unit, setUnit] = useState<keyof typeof UNITS>("GB");
  const bytes = val * UNITS[unit];

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
                <span className="font-mono tabular-nums">{Number((bytes / factor).toPrecision(8))}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--color-muted)]">Decimal (KB) = 10³ bytes · Binary (KiB) = 2¹⁰ = 1024 bytes.</p>
        </Panel>
      </div>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
