"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const ZONES = [
  "UTC",
  "America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York", "America/Sao_Paulo",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Athens", "Europe/Moscow",
  "Asia/Dubai", "Asia/Karachi", "Asia/Kolkata", "Asia/Bangkok", "Asia/Shanghai", "Asia/Tokyo",
  "Australia/Sydney", "Pacific/Auckland",
];

function pad(n: number) { return String(n).padStart(2, "0"); }
function nowLocalIso() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function format(d: Date, tz: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz, dateStyle: "medium", timeStyle: "short",
  }).format(d);
}

export default function TimezoneConverter() {
  const [iso, setIso] = useState(() => nowLocalIso());
  const [from, setFrom] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [targets, setTargets] = useState<string[]>(["UTC", "Europe/London", "Asia/Tokyo"]);

  // Reinterpret the local datetime input as being IN the source timezone.
  function asInZone(local: string, zone: string): Date {
    const [datePart, timePart] = local.split("T");
    const [Y, M, D] = datePart.split("-").map(Number);
    const [h, m] = timePart.split(":").map(Number);
    // Approximate by computing the offset between zone and UTC at that moment.
    const utcGuess = Date.UTC(Y, M - 1, D, h, m);
    const tzString = new Intl.DateTimeFormat("en-US", {
      timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false,
    }).formatToParts(new Date(utcGuess));
    const get = (t: string) => Number(tzString.find((p) => p.type === t)?.value);
    const tzAsIfUTC = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") === 24 ? 0 : get("hour"), get("minute"));
    const offset = utcGuess - tzAsIfUTC;
    return new Date(utcGuess + offset);
  }

  const date = asInZone(iso, from);

  return (
    <div className="space-y-4">
      <Panel title="Source time">
        <div className="grid sm:grid-cols-2 gap-3">
          <Lbl label="Date and time"><input type="datetime-local" value={iso} onChange={(e) => setIso(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="In timezone">
            <select value={from} onChange={(e) => setFrom(e.target.value)} className={inputCls()}>
              {ZONES.map((z) => <option key={z}>{z}</option>)}
              {!ZONES.includes(from) && <option>{from}</option>}
            </select>
          </Lbl>
        </div>
      </Panel>
      <Panel title="Equivalent times">
        <div className="space-y-2">
          {targets.map((tz, i) => (
            <div key={i} className="flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3 py-2">
              <select value={tz} onChange={(e) => { const ns = [...targets]; ns[i] = e.target.value; setTargets(ns); }}
                className="text-sm rounded-md bg-transparent border border-[var(--color-border)] px-2 py-1">
                {ZONES.map((z) => <option key={z}>{z}</option>)}
              </select>
              <span className="flex-1 font-mono text-sm">{format(date, tz)}</span>
              <button onClick={() => setTargets(targets.filter((_, idx) => idx !== i))} className="text-[var(--color-muted)] hover:text-red-400">×</button>
            </div>
          ))}
        </div>
        <button className="mt-3 text-sm text-[var(--color-accent)]" onClick={() => setTargets([...targets, "UTC"])}>+ Add timezone</button>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
