"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, Panel, textareaCls } from "@/components/ui/panel";

const SAMPLE = `name,age,role\nAlice,30,Engineer\nBob,25,"Product, Manager"\nCarol,28,Designer`;

function detectDelim(s: string): string {
  const candidates = [",", ";", "\t", "|"];
  const firstLine = s.split(/\r?\n/, 1)[0] || "";
  let best = ",";
  let bestCount = -1;
  for (const d of candidates) {
    const count = (firstLine.match(new RegExp(d === "\t" ? "\\t" : `\\${d}`, "g")) || []).length;
    if (count > bestCount) { bestCount = count; best = d; }
  }
  return best;
}

function parseCsv(csv: string, delim: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (inQ) {
      if (c === '"' && csv[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQ = false;
      else cur += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === delim) { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (c === "\r") { /* skip */ }
      else cur += c;
    }
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
  return rows.filter((r) => r.length && r.some((v) => v !== ""));
}

function escape(v: string, delim: string) {
  if (v.includes(delim) || v.includes('"') || /[\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export default function CsvFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [forceDelim, setForceDelim] = useState<string>("");
  const result = useMemo(() => {
    if (!input.trim()) return { rows: [] as string[][], delim: ",", ok: true, error: "" };
    try {
      const delim = forceDelim || detectDelim(input);
      const rows = parseCsv(input, delim);
      return { rows, delim, ok: true, error: "" };
    } catch (e) {
      return { rows: [] as string[][], delim: ",", ok: false, error: e instanceof Error ? e.message : "Parse error" };
    }
  }, [input, forceDelim]);

  const cleaned = useMemo(() => {
    return result.rows.map((r) => r.map((v) => escape(v, ",")).join(",")).join("\n");
  }, [result]);

  const aligned = useMemo(() => {
    if (!result.rows.length) return "";
    const widths: number[] = [];
    for (const r of result.rows) {
      for (let i = 0; i < r.length; i++) widths[i] = Math.max(widths[i] || 0, r[i].length);
    }
    return result.rows.map((r) => r.map((v, i) => v.padEnd(widths[i] || 0)).join("  ")).join("\n");
  }, [result]);

  const cols = result.rows[0]?.length || 0;
  const rows = result.rows.length;

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <span>Delimiter:</span>
          <select value={forceDelim} onChange={(e) => setForceDelim(e.target.value)} className="text-xs rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
            <option value="">Auto ({result.delim === "\t" ? "tab" : result.delim})</option>
            <option value=",">,</option>
            <option value=";">;</option>
            <option value={"\t"}>tab</option>
            <option value="|">|</option>
          </select>
          <span className="text-[var(--color-muted)]">{rows} rows × {cols} cols</span>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Input CSV" action={<button onClick={() => setInput("")} className={btnGhost("text-xs px-2 py-1")}>Clear</button>}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[260px]")} spellCheck={false} />
        </Panel>
        <Panel title="Validated CSV" action={<CopyButton value={cleaned} />}>
          <pre className={textareaCls("min-h-[260px] whitespace-pre-wrap break-words")}>{cleaned}</pre>
        </Panel>
      </div>
      <Panel title="Aligned preview" action={<CopyButton value={aligned} />}>
        <pre className="font-mono text-xs whitespace-pre overflow-auto rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 max-h-[300px]">{aligned}</pre>
      </Panel>
    </div>
  );
}
