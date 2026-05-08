"use client";
import { useEffect, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const ZONES = [
  "UTC",
  "America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York", "America/Sao_Paulo",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Athens", "Europe/Moscow",
  "Africa/Cairo", "Africa/Johannesburg",
  "Asia/Dubai", "Asia/Karachi", "Asia/Kolkata", "Asia/Bangkok", "Asia/Hong_Kong",
  "Asia/Shanghai", "Asia/Singapore", "Asia/Tokyo", "Asia/Seoul",
  "Australia/Sydney", "Pacific/Auckland",
];

const DEFAULT = ["America/New_York", "Europe/London", "Asia/Tokyo", "Australia/Sydney", "Asia/Dubai"];

function offsetFor(d: Date, tz: string): string {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "shortOffset",
    hour: "numeric",
  });
  const parts = dtf.formatToParts(d);
  const tzPart = parts.find((p) => p.type === "timeZoneName")?.value || "";
  return tzPart.replace("GMT", "UTC");
}

function timeFor(d: Date, tz: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).format(d);
}

function dateFor(d: Date, tz: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz, weekday: "short", month: "short", day: "numeric", year: "numeric",
  }).format(d);
}

export default function WorldClock() {
  const [zones, setZones] = useState<string[]>(DEFAULT);
  const [adding, setAdding] = useState<string>("UTC");
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <Panel title="Add timezone">
        <div className="flex gap-2">
          <select value={adding} onChange={(e) => setAdding(e.target.value)} className={inputCls("flex-1")}>
            {ZONES.map((z) => <option key={z}>{z}</option>)}
          </select>
          <button
            onClick={() => { if (!zones.includes(adding)) setZones([...zones, adding]); }}
            className="px-4 py-2 rounded-md border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-sm"
          >Add</button>
        </div>
      </Panel>
      <Panel title="World clocks">
        <div className="grid sm:grid-cols-2 gap-3">
          {zones.map((tz) => (
            <div key={tz} className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">{tz}</div>
                <div className="mt-1 font-mono text-2xl tabular-nums">{timeFor(now, tz)}</div>
                <div className="mt-0.5 text-xs text-[var(--color-muted)]">{dateFor(now, tz)} · {offsetFor(now, tz)}</div>
              </div>
              <button onClick={() => setZones(zones.filter((z) => z !== tz))} className="text-[var(--color-muted)] hover:text-red-400" aria-label="Remove">×</button>
            </div>
          ))}
          {zones.length === 0 && <p className="text-sm text-[var(--color-muted)]">No timezones — add one above.</p>}
        </div>
      </Panel>
    </div>
  );
}
