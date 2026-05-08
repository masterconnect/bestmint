"use client";
import { useMemo, useState } from "react";
import { Panel, textareaCls } from "@/components/ui/panel";

type Op = "same" | "add" | "del";
interface DiffLine { op: Op; text: string; }

function diff(a: string[], b: string[]): DiffLine[] {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (a[i] === b[j]) dp[i][j] = dp[i + 1][j + 1] + 1;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: DiffLine[] = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) { out.push({ op: "same", text: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ op: "del", text: a[i] }); i++; }
    else { out.push({ op: "add", text: b[j] }); j++; }
  }
  while (i < m) out.push({ op: "del", text: a[i++] });
  while (j < n) out.push({ op: "add", text: b[j++] });
  return out;
}

export default function TextDiff() {
  const [left, setLeft] = useState("The quick brown fox\njumps over the lazy dog.\nFin.");
  const [right, setRight] = useState("The quick red fox\njumps over the lazy cat.\nFin.");

  const lines = useMemo(() => diff(left.split(/\r?\n/), right.split(/\r?\n/)), [left, right]);

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Original">
          <textarea value={left} onChange={(e) => setLeft(e.target.value)} className={textareaCls()} />
        </Panel>
        <Panel title="Modified">
          <textarea value={right} onChange={(e) => setRight(e.target.value)} className={textareaCls()} />
        </Panel>
      </div>
      <Panel title="Diff">
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">
          {lines.map((l, idx) => (
            <div
              key={idx}
              className={
                l.op === "add"
                  ? "bg-emerald-500/10 text-emerald-300 px-2 -mx-2"
                  : l.op === "del"
                  ? "bg-red-500/10 text-red-300 px-2 -mx-2 line-through opacity-90"
                  : ""
              }
            >
              <span className="inline-block w-4 text-[var(--color-muted)]">{l.op === "add" ? "+" : l.op === "del" ? "-" : " "}</span>
              {l.text || " "}
            </div>
          ))}
        </pre>
      </Panel>
    </div>
  );
}
