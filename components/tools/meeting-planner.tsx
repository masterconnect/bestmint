"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const ZONES = [
  "UTC",
  "America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow",
  "Asia/Dubai", "Asia/Kolkata", "Asia/Bangkok", "Asia/Shanghai", "Asia/Tokyo",
  "Australia/Sydney", "Pacific/Auckland",
];

interface Participant {
  id: number;
  name: string;
  tz: string;
  start: number; // work-hour start (local)
  end: number;   // work-hour end (local)
}

function localHourAt(utcHour: number, tz: string, baseDate: Date): number {
  const d = new Date(baseDate);
  d.setUTCHours(utcHour, 0, 0, 0);
  const hStr = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", hour12: false }).format(d);
  let h = parseInt(hStr, 10);
  if (h === 24) h = 0;
  return h;
}

let nextId = 4;

export default function MeetingPlanner() {
  const [parts, setParts] = useState<Participant[]>([
    { id: 1, name: "Alice (NYC)", tz: "America/New_York", start: 9, end: 17 },
    { id: 2, name: "Bob (London)", tz: "Europe/London", start: 9, end: 17 },
    { id: 3, name: "Carol (Tokyo)", tz: "Asia/Tokyo", start: 9, end: 17 },
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const grid = Array.from({ length: 24 }, (_, utcHour) =>
    parts.map((p) => {
      const lh = localHourAt(utcHour, p.tz, today);
      const inWork = lh >= p.start && lh < p.end;
      return { utcHour, localHour: lh, inWork };
    })
  );

  function addParticipant() {
    setParts([...parts, { id: nextId++, name: `Person ${parts.length + 1}`, tz: "UTC", start: 9, end: 17 }]);
  }
  function removeParticipant(id: number) {
    setParts(parts.filter((p) => p.id !== id));
  }
  function update(id: number, patch: Partial<Participant>) {
    setParts(parts.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  return (
    <div className="space-y-4">
      <Panel title="Participants">
        <div className="space-y-2">
          {parts.map((p) => (
            <div key={p.id} className="grid grid-cols-12 gap-2 items-center">
              <input
                value={p.name}
                onChange={(e) => update(p.id, { name: e.target.value })}
                className={inputCls("col-span-3")}
                placeholder="Name"
              />
              <select
                value={p.tz}
                onChange={(e) => update(p.id, { tz: e.target.value })}
                className={inputCls("col-span-4")}
              >
                {ZONES.map((z) => <option key={z}>{z}</option>)}
              </select>
              <input
                type="number" min={0} max={23} value={p.start}
                onChange={(e) => update(p.id, { start: Math.max(0, Math.min(23, Number(e.target.value))) })}
                className={inputCls("col-span-2 font-mono")}
              />
              <input
                type="number" min={1} max={24} value={p.end}
                onChange={(e) => update(p.id, { end: Math.max(1, Math.min(24, Number(e.target.value))) })}
                className={inputCls("col-span-2 font-mono")}
              />
              <button
                onClick={() => removeParticipant(p.id)}
                className="col-span-1 text-[var(--color-muted)] hover:text-red-400"
                aria-label="Remove"
              >×</button>
            </div>
          ))}
        </div>
        <button onClick={addParticipant} className="mt-3 text-sm text-[var(--color-accent)]">+ Add participant</button>
      </Panel>

      <Panel title="Hour grid (UTC rows)">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr>
                <th className="text-left p-1 text-[var(--color-muted)] font-normal">UTC</th>
                {parts.map((p) => (
                  <th key={p.id} className="text-left p-1 text-[var(--color-muted)] font-normal whitespace-nowrap">
                    {p.name.split(" ")[0]}
                  </th>
                ))}
                <th className="text-left p-1 text-[var(--color-muted)] font-normal">All</th>
              </tr>
            </thead>
            <tbody>
              {grid.map((row, utcHour) => {
                const allWork = row.every((c) => c.inWork) && parts.length > 0;
                return (
                  <tr key={utcHour}>
                    <td className="p-1 text-[var(--color-muted)] tabular-nums">
                      {String(utcHour).padStart(2, "0")}:00
                    </td>
                    {row.map((c, i) => (
                      <td
                        key={i}
                        className={`p-1 tabular-nums ${c.inWork ? "bg-[var(--color-accent)]/20 text-[var(--color-foreground)]" : "text-[var(--color-muted)]"}`}
                      >
                        {String(c.localHour).padStart(2, "0")}:00
                      </td>
                    ))}
                    <td className={`p-1 ${allWork ? "text-green-400 font-semibold" : "text-[var(--color-muted)]"}`}>
                      {allWork ? "✓ all" : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">
          Highlighted cells = participant is within their work hours. Rows where every column is highlighted are the best meeting times.
        </p>
      </Panel>
    </div>
  );
}
