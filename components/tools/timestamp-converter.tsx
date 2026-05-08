"use client";
import { useEffect, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

function pad(n: number) { return String(n).padStart(2, "0"); }
function toIsoLocal(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function TimestampConverter() {
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState(String(now));
  const [dateInput, setDateInput] = useState(() => toIsoLocal(new Date()));

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const tsNumber = Number(tsInput);
  const interpreted = !Number.isFinite(tsNumber) ? null : tsInput.trim().length > 12 ? new Date(tsNumber) : new Date(tsNumber * 1000);
  const tsValid = interpreted !== null && !isNaN(interpreted.getTime());

  const fromDate = (() => {
    const d = new Date(dateInput);
    return isNaN(d.getTime()) ? null : Math.floor(d.getTime() / 1000);
  })();

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel
        title="Current time"
        action={<CopyButton value={String(now)} />}
      >
        <div className="font-mono text-3xl tabular-nums">{now}</div>
        <div className="mt-1 text-sm text-[var(--color-muted)]">{new Date(now * 1000).toUTCString()}</div>
        <button className={btnPrimary("mt-4 text-xs")} onClick={() => setTsInput(String(now))}>Use as input ↓</button>
      </Panel>

      <Panel title="Timestamp → Date">
        <label className="block text-xs text-[var(--color-muted)]">Unix timestamp (seconds or milliseconds)</label>
        <input
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          className={inputCls("font-mono mt-1")}
          inputMode="numeric"
        />
        {tsValid && interpreted ? (
          <div className="mt-3 space-y-1.5 text-sm">
            <Row label="UTC" value={interpreted.toUTCString()} />
            <Row label="Local" value={interpreted.toString()} />
            <Row label="ISO 8601" value={interpreted.toISOString()} />
            <Row label="Relative" value={relative(interpreted)} />
          </div>
        ) : (
          <p className="mt-3 text-sm text-red-400">Invalid timestamp</p>
        )}
      </Panel>

      <Panel title="Date → Timestamp" >
        <label className="block text-xs text-[var(--color-muted)]">Local date and time</label>
        <input
          type="datetime-local"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className={inputCls("mt-1")}
        />
        {fromDate !== null ? (
          <div className="mt-3 space-y-1.5 text-sm">
            <Row label="Seconds" value={String(fromDate)} copy />
            <Row label="Milliseconds" value={String(fromDate * 1000)} copy />
          </div>
        ) : null}
      </Panel>
    </div>
  );
}

function Row({ label, value, copy }: { label: string; value: string; copy?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-[var(--color-border)] px-3 py-2">
      <span className="w-20 text-xs text-[var(--color-muted)]">{label}</span>
      <span className="flex-1 font-mono text-xs break-all">{value}</span>
      {copy && <CopyButton value={value} />}
    </div>
  );
}

function relative(d: Date) {
  const diff = (d.getTime() - Date.now()) / 1000;
  const abs = Math.abs(diff);
  const future = diff > 0;
  const units: [number, string][] = [[60, "second"], [60, "minute"], [24, "hour"], [30, "day"], [12, "month"], [Infinity, "year"]];
  let value = abs;
  let unit = "second";
  for (const [div, u] of units) {
    if (value < div) { unit = u; break; }
    value /= div;
    unit = u;
  }
  const rounded = Math.round(value);
  return `${future ? "in " : ""}${rounded} ${unit}${rounded === 1 ? "" : "s"}${future ? "" : " ago"}`;
}
