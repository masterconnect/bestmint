"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function dayName(d: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { weekday: "long" }).format(d);
}
function fullDate(d: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(d);
}

export default function WeekdayFinder() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const d = new Date(date + "T00:00:00");
  const ok = !isNaN(d.getTime());

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Date">
        <label className="block">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Pick a date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls()} />
        </label>
        {ok && (
          <p className="mt-3 text-xs text-[var(--color-muted)]">
            ISO {date}
          </p>
        )}
      </Panel>
      <Panel title="Weekday">
        {!ok ? (
          <p className="text-sm text-red-400">Pick a valid date.</p>
        ) : (
          <div>
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">English</div>
              <div className="mt-1 text-3xl font-semibold">{dayName(d, "en-US")}</div>
              <div className="mt-1 text-sm text-[var(--color-muted)]">{fullDate(d, "en-US")}</div>
            </div>
            <div className="grid sm:grid-cols-3 gap-2 mt-3">
              {[
                ["Spanish", "es-ES"],
                ["French", "fr-FR"],
                ["Chinese", "zh-CN"],
              ].map(([label, loc]) => (
                <div key={loc} className="rounded-md border border-[var(--color-border)] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">{label}</div>
                  <div className="mt-1 text-base font-medium">{dayName(d, loc)}</div>
                  <div className="mt-0.5 text-xs text-[var(--color-muted)]">{fullDate(d, loc)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
}
