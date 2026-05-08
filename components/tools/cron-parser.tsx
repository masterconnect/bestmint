"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

type Field = { values: number[]; raw: string };

function parseField(raw: string, min: number, max: number): Field {
  const values = new Set<number>();
  for (const part of raw.split(",")) {
    let stepStr: string | undefined;
    let body = part;
    if (part.includes("/")) {
      [body, stepStr] = part.split("/");
    }
    const step = stepStr ? parseInt(stepStr, 10) : 1;
    let start: number, end: number;
    if (body === "*") { start = min; end = max; }
    else if (body.includes("-")) {
      const [a, b] = body.split("-").map((x) => parseInt(x, 10));
      start = a; end = b;
    } else {
      const n = parseInt(body, 10);
      if (Number.isNaN(n)) throw new Error(`Invalid value "${part}"`);
      start = end = n;
    }
    if (start < min || end > max || start > end) throw new Error(`Out of range: ${part}`);
    for (let v = start; v <= end; v += step) values.add(v);
  }
  return { values: Array.from(values).sort((a, b) => a - b), raw };
}

function parseCron(expr: string) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Cron expression must have 5 fields: minute hour day-of-month month day-of-week");
  return {
    minute: parseField(parts[0], 0, 59),
    hour: parseField(parts[1], 0, 23),
    dom: parseField(parts[2], 1, 31),
    month: parseField(parts[3], 1, 12),
    dow: parseField(parts[4].replace("7", "0"), 0, 6),
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function describe(expr: string): string {
  try {
    const c = parseCron(expr);
    const minStr = c.minute.values.length === 60 ? "every minute" :
      c.minute.values.length === 1 ? `at minute ${c.minute.values[0]}` :
      `at minutes [${c.minute.values.join(", ")}]`;
    const hourStr = c.hour.values.length === 24 ? "" :
      c.hour.values.length === 1 ? ` past hour ${c.hour.values[0]}` :
      ` past hours [${c.hour.values.join(", ")}]`;
    const domStr = c.dom.values.length === 31 ? "" : ` on day-of-month [${c.dom.values.join(", ")}]`;
    const monStr = c.month.values.length === 12 ? "" : ` in ${c.month.values.map((m) => MONTHS[m - 1]).join(", ")}`;
    const dowStr = c.dow.values.length === 7 ? "" : ` on ${c.dow.values.map((d) => DAYS[d]).join(", ")}`;
    return [minStr + hourStr, domStr, monStr, dowStr].filter(Boolean).join("");
  } catch (e) {
    return e instanceof Error ? e.message : "Invalid cron";
  }
}

function nextRuns(expr: string, n = 10): Date[] {
  const c = parseCron(expr);
  const out: Date[] = [];
  const d = new Date();
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  for (let i = 0; i < 366 * 24 * 60 && out.length < n; i++) {
    if (
      c.minute.values.includes(d.getMinutes()) &&
      c.hour.values.includes(d.getHours()) &&
      c.dom.values.includes(d.getDate()) &&
      c.month.values.includes(d.getMonth() + 1) &&
      c.dow.values.includes(d.getDay())
    ) {
      out.push(new Date(d));
    }
    d.setMinutes(d.getMinutes() + 1);
  }
  return out;
}

export default function CronParser() {
  const [expr, setExpr] = useState("0 9 * * 1-5");
  const desc = useMemo(() => describe(expr), [expr]);
  const ok = !desc.startsWith("Invalid") && !desc.includes("must have") && !desc.includes("Out of range");
  const runs = useMemo(() => {
    if (!ok) return [];
    try { return nextRuns(expr, 10); } catch { return []; }
  }, [expr, ok]);

  return (
    <div className="space-y-4">
      <Panel title="Cron expression (5-field: min hour day-of-month month day-of-week)">
        <input value={expr} onChange={(e) => setExpr(e.target.value)} className={inputCls("font-mono")} placeholder="0 9 * * 1-5" />
        <p className={`mt-2 text-sm ${ok ? "" : "text-red-400"}`}>{desc}</p>
      </Panel>
      <Panel title={`Next ${runs.length} fire times`} action={<CopyButton value={runs.map((d) => d.toISOString()).join("\n")} />}>
        {ok && runs.length ? (
          <ul className="text-sm font-mono space-y-1">
            {runs.map((d, i) => (
              <li key={i} className="flex justify-between border-b border-[var(--color-border)] py-1 last:border-b-0">
                <span>{d.toLocaleString()}</span>
                <span className="text-[var(--color-muted)]">{d.toISOString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[var(--color-muted)] text-sm">Enter a valid cron expression to see fire times.</p>
        )}
      </Panel>
    </div>
  );
}
