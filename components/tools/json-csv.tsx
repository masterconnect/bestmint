"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

function flatten(obj: unknown, prefix = "", out: Record<string, unknown> = {}) {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    out[prefix.replace(/\.$/, "")] = obj as never;
    return out;
  }
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v as never;
  }
  return out;
}

function escapeCsv(v: unknown) {
  if (v === undefined || v === null) return "";
  let s = typeof v === "string" ? v : JSON.stringify(v);
  if (/[",\n\r]/.test(s)) s = `"${s.replace(/"/g, '""')}"`;
  return s;
}

function jsonToCsv(json: string) {
  const data = JSON.parse(json);
  const rows = Array.isArray(data) ? data : [data];
  const flat = rows.map((r) => flatten(r));
  const headers = Array.from(new Set(flat.flatMap((r) => Object.keys(r))));
  const lines = [headers.join(",")];
  for (const r of flat) lines.push(headers.map((h) => escapeCsv(r[h])).join(","));
  return lines.join("\n");
}

function parseCsv(csv: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (inQuotes) {
      if (c === '"' && csv[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else cur += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (c === "\r") { /* skip */ }
      else cur += c;
    }
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

function csvToJson(csv: string) {
  const rows = parseCsv(csv.trim()).filter((r) => r.length && r.some((v) => v !== ""));
  if (!rows.length) return "[]";
  const [headers, ...data] = rows;
  const out = data.map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
  return JSON.stringify(out, null, 2);
}

export default function JsonCsv() {
  const [mode, setMode] = useState<"j2c" | "c2j">("j2c");
  const [input, setInput] = useState('[{"name":"Alice","age":30,"role":{"title":"Eng"}},{"name":"Bob","age":25,"role":{"title":"PM"}}]');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function run() {
    setError("");
    try {
      setOutput(mode === "j2c" ? jsonToCsv(input) : csvToJson(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="Direction">
        <div className="flex gap-2">
          <button className={mode === "j2c" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("j2c")}>JSON → CSV</button>
          <button className={mode === "c2j" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("c2j")}>CSV → JSON</button>
          <div className="flex-1" />
          <button className={btnPrimary("text-xs")} onClick={run}>Convert ↓</button>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Input">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
        </Panel>
        <Panel title="Output" action={<CopyButton value={output} />}>
          <textarea readOnly value={error || output} className={textareaCls(error ? "text-red-400" : "")} />
        </Panel>
      </div>
    </div>
  );
}
