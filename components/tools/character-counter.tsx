"use client";
import { useMemo, useState } from "react";
import { Panel, textareaCls } from "@/components/ui/panel";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const chars = [...text].length;
    const noSpaces = [...text.replace(/\s/g, "")].length;
    const bytes = new TextEncoder().encode(text).length;
    return { chars, noSpaces, bytes };
  }, [text]);

  const limits = [
    { label: "Tweet", max: 280 },
    { label: "Meta title", max: 60 },
    { label: "Meta description", max: 160 },
    { label: "SMS", max: 160 },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Panel title="Text">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={textareaCls("min-h-[260px]")}
            placeholder="Paste or type text here…"
          />
        </Panel>
      </div>
      <div className="space-y-4">
        <Panel title="Counts">
          <Stat label="Characters" value={stats.chars} />
          <Stat label="Without spaces" value={stats.noSpaces} />
          <Stat label="UTF-8 bytes" value={stats.bytes} />
        </Panel>
        <Panel title="Limits">
          <div className="space-y-3">
            {limits.map((l) => {
              const pct = Math.min(100, (stats.chars / l.max) * 100);
              const over = stats.chars > l.max;
              return (
                <div key={l.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--color-muted)]">{l.label}</span>
                    <span className={over ? "text-red-400" : ""}>{stats.chars}/{l.max}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full overflow-hidden bg-[var(--color-background)]">
                    <div className={`h-full ${over ? "bg-red-500" : "bg-[var(--color-accent)]"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-baseline py-1.5 border-b border-[var(--color-border)] last:border-0">
      <span className="text-sm text-[var(--color-muted)]">{label}</span>
      <span className="text-xl font-semibold tabular-nums">{value}</span>
    </div>
  );
}
