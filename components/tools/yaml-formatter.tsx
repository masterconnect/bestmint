"use client";
import { useMemo, useState } from "react";
import yaml from "js-yaml";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, Panel, textareaCls } from "@/components/ui/panel";

const SAMPLE = `name: BestMint\nversion: 1.0\nfeatures:\n  - json\n  - yaml\n  - xml\nmeta:\n  free: true\n  online: true\n`;

export default function YamlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true as const, output: "" };
    try {
      const parsed = yaml.load(input);
      const output = yaml.dump(parsed, { indent, lineWidth: 120 });
      return { ok: true as const, output };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid YAML";
      return { ok: false as const, output: msg };
    }
  }, [input, indent]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel
        title="Input YAML"
        action={<button onClick={() => setInput("")} className={btnGhost("text-xs px-2 py-1")}>Clear</button>}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={textareaCls("min-h-[320px]")}
          placeholder="Paste your YAML here…"
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
            </select>
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
