"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

type Format = "js" | "json" | "html" | "sql" | "shell" | "regex";

function escape(format: Format, s: string): string {
  switch (format) {
    case "js":
      return s
        .replace(/\\/g, "\\\\")
        .replace(/"/g, "\\\"")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t");
    case "json":
      return JSON.stringify(s).slice(1, -1);
    case "html":
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    case "sql":
      return s.replace(/'/g, "''");
    case "shell":
      return "'" + s.replace(/'/g, "'\\''") + "'";
    case "regex":
      return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}

function unescape(format: Format, s: string): string {
  switch (format) {
    case "js":
    case "json":
      try { return JSON.parse('"' + s.replace(/"/g, '\\"') + '"'); }
      catch { return s.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\"/g, '"').replace(/\\\\/g, "\\"); }
    case "html":
      return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
    case "sql":
      return s.replace(/''/g, "'");
    case "shell":
      if (s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1).replace(/'\\''/g, "'");
      return s;
    case "regex":
      return s.replace(/\\([.*+?^${}()|[\]\\])/g, "$1");
  }
}

export default function StringEscaper() {
  const [format, setFormat] = useState<Format>("js");
  const [mode, setMode] = useState<"esc" | "unesc">("esc");
  const [input, setInput] = useState(`Hello "world"\nLine 2\tTabbed`);

  const output = useMemo(() => {
    if (!input) return "";
    return mode === "esc" ? escape(format, input) : unescape(format, input);
  }, [format, mode, input]);

  return (
    <div className="space-y-4">
      <Panel title="Format">
        <div className="flex gap-2 flex-wrap items-center">
          {(["js", "json", "html", "sql", "shell", "regex"] as Format[]).map((f) => (
            <button key={f} className={format === f ? btnPrimary("text-xs uppercase") : btnGhost("text-xs uppercase")} onClick={() => setFormat(f)}>{f}</button>
          ))}
          <div className="flex-1" />
          <button className={mode === "esc" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("esc")}>Escape</button>
          <button className={mode === "unesc" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("unesc")}>Unescape</button>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Input">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} spellCheck={false} />
        </Panel>
        <Panel title="Output" action={<CopyButton value={output} />}>
          <textarea readOnly value={output} className={textareaCls()} />
        </Panel>
      </div>
    </div>
  );
}
