"use client";
import { useEffect, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function pad(n: number) { return String(n).padStart(2, "0"); }
function nowLocalIso() {
  const d = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function CountdownTimer() {
  const [target, setTarget] = useState<string>(() => nowLocalIso());
  const [label, setLabel] = useState<string>("Launch day");
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = new Date(target).getTime();
  const valid = !isNaN(t);
  const diff = valid ? t - now : 0;
  const past = diff < 0;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / 86_400_000);
  const hours = Math.floor((abs % 86_400_000) / 3_600_000);
  const mins = Math.floor((abs % 3_600_000) / 60_000);
  const secs = Math.floor((abs % 60_000) / 1000);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Target">
        <label className="block mb-3">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Label (optional)</span>
          <input value={label} onChange={(e) => setLabel(e.target.value)} className={inputCls()} placeholder="My event" />
        </label>
        <label className="block mb-3">
          <span className="block text-xs text-[var(--color-muted)] mb-1">Target date and time (local)</span>
          <input type="datetime-local" value={target} onChange={(e) => setTarget(e.target.value)} className={inputCls()} />
        </label>
        {valid && (
          <p className="text-xs text-[var(--color-muted)]">
            {new Date(t).toString()}
          </p>
        )}
      </Panel>

      <Panel title={label || "Countdown"}>
        {!valid ? (
          <p className="text-sm text-red-400">Pick a valid date and time.</p>
        ) : (
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
              {past ? "Time elapsed" : "Time remaining"}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                ["Days", days],
                ["Hours", hours],
                ["Min", mins],
                ["Sec", secs],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 text-center">
                  <div className="text-3xl font-mono font-semibold tabular-nums">{pad(v as number)}</div>
                  <div className="mt-1 text-[10px] uppercase text-[var(--color-muted)]">{k as string}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-[var(--color-muted)]">
              {past ? "This time has passed " : "Counting down to "}
              <span className="text-[var(--color-foreground)]">{new Date(t).toLocaleString()}</span>
              {past ? "." : "."}
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
}
