"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

interface Parsed { line: string; seconds: number | null; }

function parseLine(raw: string): number | null {
  const s = raw.trim();
  if (!s) return null;
  const parts = s.split(":").map((p) => p.trim());
  if (parts.length < 2 || parts.length > 3) return null;
  const nums = parts.map((p) => {
    if (!/^\d+(\.\d+)?$/.test(p)) return NaN;
    return Number(p);
  });
  if (nums.some((n) => !Number.isFinite(n))) return null;
  if (parts.length === 2) {
    const [h, m] = nums;
    return h * 3600 + m * 60;
  }
  const [h, m, sec] = nums;
  return h * 3600 + m * 60 + sec;
}

function fmt(secs: number): string {
  const sign = secs < 0 ? "-" : "";
  let s = Math.abs(secs);
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  const ss = Math.round(s);
  return `${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export default function DurationCalculator() {
  const [text, setText] = useState("01:30:00\n00:45:30\n02:15:45");

  const { rows, total, valid, count } = useMemo(() => {
    const lines = text.split(/\r?\n/);
    const rows: Parsed[] = lines.map((l) => ({ line: l, seconds: parseLine(l) }));
    const valid = rows.filter((r) => r.seconds !== null);
    const total = valid.reduce((a, r) => a + (r.seconds || 0), 0);
    return { rows, total, valid, count: valid.length };
  }, [text]);

  const avg = count ? total / count : 0;
  const totalText = fmt(total);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Durations (one per line)">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={textareaCls("min-h-[260px]")}
          placeholder={"HH:MM:SS or HH:MM\n01:30:00\n00:45:30"}
        />
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          One duration per line. Use <span className="font-mono">HH:MM:SS</span> or <span className="font-mono">HH:MM</span>. Hours can exceed 24.
        </p>
      </Panel>
      <Panel title="Totals" action={<CopyButton value={totalText} />}>
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4">
          <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Total</div>
          <div className="mt-1 text-3xl font-mono tabular-nums">{totalText}</div>
          <div className="mt-1 text-sm text-[var(--color-muted)]">
            {(total / 3600).toFixed(2)} hours · {Math.round(total / 60)} minutes
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <Stat label="Lines counted" value={String(count)} />
          <Stat label="Average" value={fmt(Math.round(avg))} />
        </div>
        <div className="mt-3">
          <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">Per line</div>
          <ul className="space-y-1 text-sm font-mono">
            {rows.map((r, i) => (
              <li
                key={i}
                className={`flex items-center justify-between border-b border-[var(--color-border)] py-1 ${r.line.trim() === "" ? "opacity-40" : ""}`}
              >
                <span className="truncate">{r.line || <span className="italic">(empty)</span>}</span>
                <span className={r.seconds === null && r.line.trim() ? "text-red-400" : ""}>
                  {r.line.trim() === "" ? "—" : r.seconds === null ? "invalid" : fmt(r.seconds)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--color-border)] p-2">
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">{label}</div>
      <div className="mt-0.5 font-mono">{value}</div>
    </div>
  );
}
