"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel } from "@/components/ui/panel";

type Align = "left" | "center" | "right";

export default function MarkdownTableGenerator() {
  const [headers, setHeaders] = useState<string[]>(["Tool", "Category", "Free"]);
  const [rows, setRows] = useState<string[][]>([
    ["JSON Formatter", "Developer", "Yes"],
    ["Color Picker", "Color", "Yes"],
  ]);
  const [aligns, setAligns] = useState<Align[]>(["left", "left", "center"]);

  const cols = headers.length;

  function addRow() {
    setRows((r) => [...r, new Array(cols).fill("")]);
  }
  function removeRow(i: number) {
    setRows((r) => r.filter((_, idx) => idx !== i));
  }
  function addCol() {
    setHeaders((h) => [...h, `Col ${h.length + 1}`]);
    setRows((r) => r.map((row) => [...row, ""]));
    setAligns((a) => [...a, "left"]);
  }
  function removeCol(i: number) {
    if (cols <= 1) return;
    setHeaders((h) => h.filter((_, idx) => idx !== i));
    setRows((r) => r.map((row) => row.filter((_, idx) => idx !== i)));
    setAligns((a) => a.filter((_, idx) => idx !== i));
  }
  function setHeader(i: number, v: string) {
    setHeaders((h) => h.map((x, idx) => (idx === i ? v : x)));
  }
  function setCell(r: number, c: number, v: string) {
    setRows((rows) => rows.map((row, ri) => (ri === r ? row.map((x, ci) => (ci === c ? v : x)) : row)));
  }
  function setAlign(i: number, a: Align) {
    setAligns((arr) => arr.map((x, idx) => (idx === i ? a : x)));
  }

  const md = useMemo(() => {
    const widths = headers.map((_, c) => Math.max(headers[c].length, ...rows.map((r) => (r[c] || "").length), 3));
    const headerRow = "| " + headers.map((h, i) => h.padEnd(widths[i])).join(" | ") + " |";
    const sepRow = "| " + aligns.map((a, i) => {
      const w = widths[i];
      if (a === "left") return ":" + "-".repeat(w - 1);
      if (a === "right") return "-".repeat(w - 1) + ":";
      return ":" + "-".repeat(Math.max(1, w - 2)) + ":";
    }).join(" | ") + " |";
    const bodyRows = rows.map((r) => "| " + headers.map((_, i) => (r[i] || "").padEnd(widths[i])).join(" | ") + " |");
    return [headerRow, sepRow, ...bodyRows].join("\n");
  }, [headers, rows, aligns]);

  return (
    <div className="space-y-4">
      <Panel title="Editor">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="p-1 align-top">
                    <input value={h} onChange={(e) => setHeader(i, e.target.value)} className="w-full rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm font-medium" />
                    <div className="flex items-center gap-1 mt-1">
                      <select value={aligns[i]} onChange={(e) => setAlign(i, e.target.value as Align)} className="text-xs rounded border border-[var(--color-border)] bg-[var(--color-background)] px-1 py-0.5">
                        <option value="left">left</option>
                        <option value="center">center</option>
                        <option value="right">right</option>
                      </select>
                      <button onClick={() => removeCol(i)} className="text-xs text-red-400 hover:underline">×</button>
                    </div>
                  </th>
                ))}
                <th className="p-1"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {headers.map((_, ci) => (
                    <td key={ci} className="p-1">
                      <input value={r[ci] || ""} onChange={(e) => setCell(ri, ci, e.target.value)} className="w-full rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm" />
                    </td>
                  ))}
                  <td className="p-1">
                    <button onClick={() => removeRow(ri)} className="text-xs text-red-400 hover:underline">×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={addRow} className={btnGhost("text-xs")}>+ Row</button>
          <button onClick={addCol} className={btnGhost("text-xs")}>+ Column</button>
        </div>
      </Panel>
      <Panel title="Markdown" action={<CopyButton value={md} />}>
        <pre className="font-mono text-xs whitespace-pre overflow-auto rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">{md}</pre>
      </Panel>
    </div>
  );
}
