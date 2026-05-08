"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

export default function JsonFormatter() {
  const [input, setInput] = useState('{"name":"BestMint","tools":44,"free":true,"tags":["json","formatter","validator"]}');
  const [indent, setIndent] = useState(2);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true as const, output: "" };
    try {
      const parsed = JSON.parse(input);
      return { ok: true as const, output: JSON.stringify(parsed, null, indent) };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      return { ok: false as const, output: msg };
    }
  }, [input, indent]);

  function minify() {
    try {
      setInput(JSON.stringify(JSON.parse(input)));
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel
        title="Input JSON"
        action={
          <div className="flex items-center gap-2">
            <button onClick={() => setInput("")} className={btnGhost("text-xs px-2 py-1")}>Clear</button>
          </div>
        }
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={textareaCls("min-h-[320px]")}
          placeholder="Paste your JSON here…"
          spellCheck={false}
        />
      </Panel>
      <Panel
        title={
          <span className="flex items-center gap-2">
            Output
            {result.ok ? (
              <span className="text-emerald-400 text-xs">valid</span>
            ) : (
              <span className="text-red-400 text-xs">invalid</span>
            )}
          </span>
        }
        action={
          <div className="flex items-center gap-2">
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="text-xs rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={0}>Minified</option>
            </select>
            <button onClick={minify} className={btnGhost("text-xs px-2 py-1")}>Minify</button>
            <CopyButton value={result.output} />
          </div>
        }
      >
        <pre className={`${textareaCls("min-h-[320px] whitespace-pre-wrap break-words")} ${result.ok ? "" : "text-red-400"}`}>
          {result.output || (result.ok ? "Output will appear here…" : "")}
        </pre>
      </Panel>
    </div>
  );
}
