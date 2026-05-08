"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

type Field = number[];
const RANGES: [number, number][] = [
  [0, 59], // minute
  [0, 23], // hour
  [1, 31], // day of month
  [1, 12], // month
  [0, 6],  // day of week (0 = Sunday)
];

function expandField(part: string, [min, max]: [number, number]): Field {
  const result = new Set<number>();
  for (const tok of part.split(",")) {
    let step = 1;
    let body = tok;
    if (body.includes("/")) {
      const [b, s] = body.split("/");
      step = Number(s);
      if (!Number.isFinite(step) || step < 1) throw new Error(`Bad step in "${tok}"`);
      body = b;
    }
    let lo: number, hi: number;
    if (body === "*" || body === "") { lo = min; hi = max; }
    else if (body.includes("-")) {
      const [a, b] = body.split("-").map(Number);
      lo = a; hi = b;
    } else {
      lo = hi = Number(body);
    }
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) throw new Error(`Bad token "${tok}"`);
    if (lo < min || hi > max) throw new Error(`Out of range "${tok}" (${min}-${max})`);
    for (let v = lo; v <= hi; v += step) result.add(v);
  }
  return [...result].sort((a, b) => a - b);
}

function parseCron(expr: string): Field[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Need exactly 5 fields: minute hour dom month dow");
  return parts.map((p, i) => expandField(p, RANGES[i]));
}

function describe(fields: Field[], parts: string[]): string {
  const [, , dom, mon, dow] = parts;
  const [mins, hours] = fields;
  const time =
    mins.length === 60 && hours.length === 24
      ? "every minute"
      : mins.length === 60
      ? `every minute of ${listHours(hours)}`
      : hours.length === 1 && mins.length === 1
      ? `at ${String(hours[0]).padStart(2, "0")}:${String(mins[0]).padStart(2, "0")}`
      : `at ${listHours(hours)}, minute ${mins.join(",")}`;
  let when = "";
  if (dom !== "*" && dow === "*") when = ` on day ${dom} of the month`;
  else if (dom === "*" && dow !== "*") when = ` on day-of-week ${dow}`;
  else if (dom !== "*" && dow !== "*") when = ` on day ${dom} or day-of-week ${dow}`;
  if (mon !== "*") when += `, month ${mon}`;
  return `Runs ${time}${when}.`;
}
function listHours(h: Field) { return h.map((x) => String(x).padStart(2, "0")).join(","); }

function nextRuns(fields: Field[], from: Date, count = 10): Date[] {
  const [mins, hours, doms, mons, dows] = fields;
  const out: Date[] = [];
  const cur = new Date(from);
  cur.setSeconds(0, 0);
  cur.setMinutes(cur.getMinutes() + 1);
  let safety = 0;
  while (out.length < count && safety < 366 * 24 * 60) {
    safety++;
    if (
      mins.includes(cur.getMinutes()) &&
      hours.includes(cur.getHours()) &&
      doms.includes(cur.getDate()) &&
      mons.includes(cur.getMonth() + 1) &&
      dows.includes(cur.getDay())
    ) {
      out.push(new Date(cur));
    }
    cur.setMinutes(cur.getMinutes() + 1);
  }
  return out;
}

export default function CronNextRun() {
  const [expr, setExpr] = useState("*/15 9-17 * * 1-5");

  const result = useMemo(() => {
    try {
      const fields = parseCron(expr);
      const parts = expr.trim().split(/\s+/);
      const text = describe(fields, parts);
      const runs = nextRuns(fields, new Date(), 10);
      return { ok: true as const, text, runs };
    } catch (e) {
      return { ok: false as const, error: (e as Error).message };
    }
  }, [expr]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Cron expression">
        <input value={expr} onChange={(e) => setExpr(e.target.value)} className={inputCls("font-mono")} placeholder="*/15 9-17 * * 1-5" />
        <div className="mt-3 text-xs text-[var(--color-muted)] leading-relaxed">
          <p>Format: <span className="font-mono">minute hour day-of-month month day-of-week</span></p>
          <ul className="list-disc list-inside mt-1 space-y-0.5">
            <li><span className="font-mono">*</span> any value</li>
            <li><span className="font-mono">5,10</span> list</li>
            <li><span className="font-mono">1-5</span> range</li>
            <li><span className="font-mono">*/15</span> step</li>
          </ul>
        </div>
        {result.ok ? (
          <p className="mt-3 text-sm">{result.text}</p>
        ) : (
          <p className="mt-3 text-sm text-red-400">{result.error}</p>
        )}
      </Panel>
      <Panel title="Next 10 runs">
        {result.ok ? (
          <ol className="space-y-1.5">
            {result.runs.map((d, i) => (
              <li key={i} className="flex items-center gap-3 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm">
                <span className="w-6 text-xs text-[var(--color-muted)]">{i + 1}.</span>
                <span className="font-mono">{d.toLocaleString()}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-[var(--color-muted)]">Fix the expression to see the next runs.</p>
        )}
      </Panel>
    </div>
  );
}
