"use client";
import { useMemo, useState } from "react";
import { Panel, textareaCls } from "@/components/ui/panel";

export default function AverageMeanMedianMode() {
  const [text, setText] = useState("4, 8, 15, 16, 23, 42, 16");

  const stats = useMemo(() => {
    const nums = text.split(/[\s,;]+/).map((s) => s.trim()).filter(Boolean).map(Number).filter((n) => !isNaN(n));
    if (nums.length === 0) return null;
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((s, n) => s + n, 0);
    const mean = sum / nums.length;
    const min = sorted[0], max = sorted[sorted.length - 1];
    const range = max - min;
    const median = sorted.length % 2 === 0 ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 : sorted[Math.floor(sorted.length / 2)];
    const counts = new Map<number, number>();
    nums.forEach((n) => counts.set(n, (counts.get(n) || 0) + 1));
    const maxCount = Math.max(...counts.values());
    const modes = maxCount > 1 ? [...counts.entries()].filter(([, c]) => c === maxCount).map(([n]) => n) : [];
    const variance = nums.reduce((s, n) => s + (n - mean) ** 2, 0) / nums.length;
    const stdDev = Math.sqrt(variance);
    return { count: nums.length, sum, mean, median, modes, min, max, range, variance, stdDev, sorted };
  }, [text]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Numbers">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls()} placeholder="Comma, space, or newline separated" />
      </Panel>
      <Panel title="Statistics">
        {stats ? (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Cell label="Count" value={`${stats.count}`} />
            <Cell label="Sum" value={fmt(stats.sum)} />
            <Cell label="Mean" value={fmt(stats.mean)} />
            <Cell label="Median" value={fmt(stats.median)} />
            <Cell label="Mode(s)" value={stats.modes.length ? stats.modes.map(fmt).join(", ") : "—"} />
            <Cell label="Min" value={fmt(stats.min)} />
            <Cell label="Max" value={fmt(stats.max)} />
            <Cell label="Range" value={fmt(stats.range)} />
            <Cell label="Variance" value={fmt(stats.variance)} />
            <Cell label="Std deviation" value={fmt(stats.stdDev)} />
          </div>
        ) : <p className="text-sm text-[var(--color-muted)]">Enter at least one number.</p>}
        {stats && (
          <div className="mt-4 text-xs text-[var(--color-muted)]">
            <div className="font-medium mb-1">Sorted:</div>
            <div className="font-mono break-all">{stats.sorted.map(fmt).join(", ")}</div>
          </div>
        )}
      </Panel>
    </div>
  );
}

function fmt(n: number) {
  return Number(n.toFixed(6)).toString();
}
function Cell({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-[var(--color-border)] p-3"><div className="text-xs text-[var(--color-muted)]">{label}</div><div className="mt-1 font-semibold tabular-nums">{value}</div></div>;
}
