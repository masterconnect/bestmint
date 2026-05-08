"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const C_SAMPLE = `name,age,role\nAlice,30,Engineer\nBob,25,"Product, Manager"`;
const T_SAMPLE = `name\tage\trole\nAlice\t30\tEngineer\nBob\t25\tProduct, Manager`;

function parse(s: string, delim: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQ) {
      if (c === '"' && s[i + 1] === '"') { cur += '"'; i++; }
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
  return rows.filter((r) => r.some((v) => v !== ""));
}

function emit(rows: string[][], delim: string) {
  return rows.map((r) => r.map((v) => {
    if (v.includes(delim) || v.includes('"') || /[\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
    return v;
  }).join(delim)).join("\n");
}

export default function TsvCsvConverter() {
  const [mode, setMode] = useState<"t2c" | "c2t">("c2t");
  const [input, setInput] = useState(C_SAMPLE);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      if (mode === "t2c") return emit(parse(input, "\t"), ",");
      return emit(parse(input, ","), "\t");
    } catch { return ""; }
  }, [input, mode]);

  function swap(next: "t2c" | "c2t") {
    setMode(next);
    setInput(next === "t2c" ? T_SAMPLE : C_SAMPLE);
  }

  return (
    <div className="space-y-4">
      <Panel title="Direction">
        <div className="flex gap-2 flex-wrap">
          <button className={mode === "c2t" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => swap("c2t")}>CSV → TSV</button>
          <button className={mode === "t2c" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => swap("t2c")}>TSV → CSV</button>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title={mode === "c2t" ? "CSV input" : "TSV input"}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[280px]")} spellCheck={false} />
        </Panel>
        <Panel title={mode === "c2t" ? "TSV output" : "CSV output"} action={<CopyButton value={output} />}>
          <pre className={textareaCls("min-h-[280px] whitespace-pre-wrap break-words")}>{output}</pre>
        </Panel>
      </div>
    </div>
  );
}
