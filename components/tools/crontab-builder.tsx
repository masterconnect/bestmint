"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel } from "@/components/ui/panel";

type Mode = "every" | "at" | "range" | "step";

function fieldExpr(mode: Mode, val: string, range: [string, string], step: string, min: number, max: number): string {
  if (mode === "every") return "*";
  if (mode === "at") return val || "0";
  if (mode === "range") return `${range[0] || min}-${range[1] || max}`;
  return `*/${step || "1"}`;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function CrontabBuilder() {
  const [m, setM] = useState<{ mode: Mode; val: string; r: [string, string]; step: string }>({ mode: "at", val: "0", r: ["0", "0"], step: "5" });
  const [h, setH] = useState<{ mode: Mode; val: string; r: [string, string]; step: string }>({ mode: "at", val: "9", r: ["9", "17"], step: "1" });
  const [dom, setDom] = useState<{ mode: Mode; val: string; r: [string, string]; step: string }>({ mode: "every", val: "1", r: ["1", "31"], step: "1" });
  const [month, setMonth] = useState<{ mode: Mode; val: string; r: [string, string]; step: string }>({ mode: "every", val: "1", r: ["1", "12"], step: "1" });
  const [dow, setDow] = useState<{ mode: Mode; val: string; r: [string, string]; step: string }>({ mode: "range", val: "1", r: ["1", "5"], step: "1" });

  const expr = useMemo(() => {
    return [
      fieldExpr(m.mode, m.val, m.r, m.step, 0, 59),
      fieldExpr(h.mode, h.val, h.r, h.step, 0, 23),
      fieldExpr(dom.mode, dom.val, dom.r, dom.step, 1, 31),
      fieldExpr(month.mode, month.val, month.r, month.step, 1, 12),
      fieldExpr(dow.mode, dow.val, dow.r, dow.step, 0, 6),
    ].join(" ");
  }, [m, h, dom, month, dow]);

  function FieldRow({ label, state, setter, min, max, names }: { label: string; state: typeof m; setter: (s: typeof m) => void; min: number; max: number; names?: string[] }) {
    return (
      <div className="rounded-md border border-[var(--color-border)] p-3 space-y-2">
        <div className="font-medium text-sm">{label}</div>
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <select value={state.mode} onChange={(e) => setter({ ...state, mode: e.target.value as Mode })} className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-xs">
            <option value="every">Every</option>
            <option value="at">At specific value</option>
            <option value="range">Range</option>
            <option value="step">Every N</option>
          </select>
          {state.mode === "at" && (
            <select value={state.val} onChange={(e) => setter({ ...state, val: e.target.value })} className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-xs">
              {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((n) => (
                <option key={n} value={n}>{names ? `${n} (${names[n - (min === 1 ? 1 : 0)] || n})` : n}</option>
              ))}
            </select>
          )}
          {state.mode === "range" && (
            <>
              <input type="number" min={min} max={max} value={state.r[0]} onChange={(e) => setter({ ...state, r: [e.target.value, state.r[1]] })} className="w-16 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-xs" />
              <span>–</span>
              <input type="number" min={min} max={max} value={state.r[1]} onChange={(e) => setter({ ...state, r: [state.r[0], e.target.value] })} className="w-16 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-xs" />
            </>
          )}
          {state.mode === "step" && (
            <>
              <span>every</span>
              <input type="number" min={1} max={max} value={state.step} onChange={(e) => setter({ ...state, step: e.target.value })} className="w-16 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-xs" />
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Panel title="Build cron schedule">
        <div className="grid md:grid-cols-2 gap-3">
          <FieldRow label="Minute (0-59)" state={m} setter={setM} min={0} max={59} />
          <FieldRow label="Hour (0-23)" state={h} setter={setH} min={0} max={23} />
          <FieldRow label="Day of month (1-31)" state={dom} setter={setDom} min={1} max={31} />
          <FieldRow label="Month (1-12)" state={month} setter={setMonth} min={1} max={12} names={MONTHS} />
          <FieldRow label="Day of week (0=Sun)" state={dow} setter={setDow} min={0} max={6} names={DAYS} />
        </div>
      </Panel>
      <Panel title="Cron expression" action={<CopyButton value={expr} />}>
        <code className="block text-xl font-mono text-[var(--color-accent)] py-2">{expr}</code>
      </Panel>
    </div>
  );
}
