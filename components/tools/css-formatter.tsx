"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, Panel, textareaCls } from "@/components/ui/panel";

const SAMPLE = `.btn{background:#6366f1;color:white;padding:12px 16px;border-radius:8px}@media (max-width:768px){.btn{padding:8px 12px}}`;

function formatCss(input: string, indent = 2): string {
  const pad = " ".repeat(indent);
  // First strip comments while preserving content out
  const noComments = input.replace(/\/\*[\s\S]*?\*\//g, "");
  let out = "";
  let depth = 0;
  let i = 0;
  let buf = "";
  function flushDecl() {
    const t = buf.trim();
    buf = "";
    if (!t) return;
    out += pad.repeat(depth) + t + ";\n";
  }
  while (i < noComments.length) {
    const c = noComments[i];
    if (c === "{") {
      const sel = buf.trim().replace(/\s+/g, " ");
      buf = "";
      out += pad.repeat(depth) + sel + " {\n";
      depth++;
      i++;
      continue;
    }
    if (c === "}") {
      flushDecl();
      depth = Math.max(0, depth - 1);
      out += pad.repeat(depth) + "}\n";
      i++;
      continue;
    }
    if (c === ";") {
      flushDecl();
      i++;
      continue;
    }
    if (c === "\n" || c === "\r" || c === "\t") {
      buf += " ";
    } else {
      buf += c;
    }
    i++;
  }
  if (buf.trim()) out += pad.repeat(depth) + buf.trim() + "\n";
  // Clean: declarations like "prop : value" → "prop: value"
  return out
    .split("\n")
    .map((l) => l.replace(/\s*:\s*/g, ": ").replace(/\s{2,}/g, " ").replace(/^(\s*)\s/, "$1"))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim() + "\n";
}

export default function CssFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);
  const output = useMemo(() => {
    if (!input.trim()) return "";
    try { return formatCss(input, indent); } catch { return ""; }
  }, [input, indent]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Input CSS" action={<button onClick={() => setInput("")} className={btnGhost("text-xs px-2 py-1")}>Clear</button>}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[320px]")} spellCheck={false} />
      </Panel>
      <Panel
        title="Formatted"
        action={
          <div className="flex items-center gap-2">
            <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="text-xs rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
            <CopyButton value={output} />
          </div>
        }
      >
        <pre className={textareaCls("min-h-[320px] whitespace-pre-wrap break-words")}>{output}</pre>
      </Panel>
    </div>
  );
}
