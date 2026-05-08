"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const VOL: Record<string, number> = {
  cup: 236.5882365,
  tbsp: 14.7867648,
  tsp: 4.92892159,
  ml: 1,
  "fl oz (US)": 29.5735,
};
const WT: Record<string, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
};

export default function CookingConverter() {
  const [vVal, setVVal] = useState(1);
  const [vUnit, setVUnit] = useState<keyof typeof VOL>("cup");
  const ml = vVal * VOL[vUnit];

  const [wVal, setWVal] = useState(100);
  const [wUnit, setWUnit] = useState<keyof typeof WT>("g");
  const grams = wVal * WT[wUnit];

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Volume">
        <div className="flex gap-2 mb-3">
          <input type="number" min={0} step="any" value={vVal} onChange={(e) => setVVal(Number(e.target.value))} className={inputCls("flex-1 font-mono")} />
          <select value={vUnit} onChange={(e) => setVUnit(e.target.value as keyof typeof VOL)} className={inputCls("w-32")}>
            {Object.keys(VOL).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(VOL).map(([k, factor]) => k === vUnit ? null : (
            <div key={k} className="flex items-center justify-between rounded-md border border-[var(--color-border)] px-3 py-2 text-sm">
              <span className="text-[var(--color-muted)]">{k}</span>
              <span className="font-mono tabular-nums">{Number((ml / factor).toPrecision(6))}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Weight">
        <div className="flex gap-2 mb-3">
          <input type="number" min={0} step="any" value={wVal} onChange={(e) => setWVal(Number(e.target.value))} className={inputCls("flex-1 font-mono")} />
          <select value={wUnit} onChange={(e) => setWUnit(e.target.value as keyof typeof WT)} className={inputCls("w-32")}>
            {Object.keys(WT).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(WT).map(([k, factor]) => k === wUnit ? null : (
            <div key={k} className="flex items-center justify-between rounded-md border border-[var(--color-border)] px-3 py-2 text-sm">
              <span className="text-[var(--color-muted)]">{k}</span>
              <span className="font-mono tabular-nums">{Number((grams / factor).toPrecision(6))}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
