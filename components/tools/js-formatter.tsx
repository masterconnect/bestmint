"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, Panel, textareaCls } from "@/components/ui/panel";

const SAMPLE = `function greet(name){if(!name){return "Hello";}const greeting="Hello, "+name+"!";return greeting;}const arr=[1,2,3].map(x=>x*2);`;

function beautifyJs(src: string, indent = 2): string {
  const pad = " ".repeat(indent);
  let out = "";
  let depth = 0;
  let i = 0;
  let inStr: false | '"' | "'" | "`" = false;
  let inLineCmt = false;
  let inBlockCmt = false;
  function nl() {
    out = out.replace(/[ \t]+$/, "");
    out += "\n" + pad.repeat(Math.max(0, depth));
  }
  while (i < src.length) {
    const c = src[i];
    const next = src[i + 1];
    if (inLineCmt) {
      if (c === "\n") { inLineCmt = false; nl(); i++; continue; }
      out += c; i++; continue;
    }
    if (inBlockCmt) {
      out += c;
      if (c === "*" && next === "/") { out += "/"; i += 2; inBlockCmt = false; continue; }
      i++; continue;
    }
    if (inStr) {
      out += c;
      if (c === "\\" && next !== undefined) { out += next; i += 2; continue; }
      if (c === inStr) inStr = false;
      i++; continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; out += c; i++; continue; }
    if (c === "/" && next === "/") { inLineCmt = true; out += "//"; i += 2; continue; }
    if (c === "/" && next === "*") { inBlockCmt = true; out += "/*"; i += 2; continue; }
    if (c === "{") {
      out += "{";
      depth++;
      nl();
      i++; continue;
    }
    if (c === "}") {
      depth = Math.max(0, depth - 1);
      out = out.replace(/[ \t]+$/, "");
      if (!out.endsWith("\n")) out += "\n";
      out += pad.repeat(depth) + "}";
      // peek for ; , or following block
      i++;
      continue;
    }
    if (c === ";") {
      out += ";";
      nl();
      i++; continue;
    }
    if (c === "\n" || c === "\r") {
      // collapse with our own newlines
      i++; continue;
    }
    if (c === " " || c === "\t") {
      if (out.endsWith(" ") || out.endsWith("\n") || out.match(/[\s(]$/)) { i++; continue; }
      out += " "; i++; continue;
    }
    out += c; i++;
  }
  return out
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .filter((l, idx, arr) => !(l === "" && arr[idx - 1] === ""))
    .join("\n")
    .trim() + "\n";
}

export default function JsFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);
  const output = useMemo(() => (input.trim() ? beautifyJs(input, indent) : ""), [input, indent]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Input JS / TS" action={<button onClick={() => setInput("")} className={btnGhost("text-xs px-2 py-1")}>Clear</button>}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[320px]")} spellCheck={false} />
      </Panel>
      <Panel
        title="Beautified"
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
