"use client";
import { useMemo, useState } from "react";
import yaml from "js-yaml";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const Y_SAMPLE = `name: BestMint\nversion: 1.0\nfeatures:\n  - yaml\n  - json\n`;
const J_SAMPLE = `{\n  "name": "BestMint",\n  "version": 1.0,\n  "features": ["yaml", "json"]\n}`;

export default function YamlJsonConverter() {
  const [mode, setMode] = useState<"y2j" | "j2y">("y2j");
  const [input, setInput] = useState(Y_SAMPLE);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true as const, output: "" };
    try {
      if (mode === "y2j") {
        const parsed = yaml.load(input);
        return { ok: true as const, output: JSON.stringify(parsed, null, 2) };
      }
      const parsed = JSON.parse(input);
      return { ok: true as const, output: yaml.dump(parsed, { indent: 2, lineWidth: 120 }) };
    } catch (e) {
      return { ok: false as const, output: e instanceof Error ? e.message : "Conversion error" };
    }
  }, [input, mode]);

  function swap(next: "y2j" | "j2y") {
    setMode(next);
    setInput(next === "y2j" ? Y_SAMPLE : J_SAMPLE);
  }

  return (
    <div className="space-y-4">
      <Panel title="Direction">
        <div className="flex gap-2 flex-wrap">
          <button className={mode === "y2j" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => swap("y2j")}>YAML → JSON</button>
          <button className={mode === "j2y" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => swap("j2y")}>JSON → YAML</button>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title={mode === "y2j" ? "YAML" : "JSON"}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[280px]")} spellCheck={false} />
        </Panel>
        <Panel
          title={mode === "y2j" ? "JSON" : "YAML"}
          action={<CopyButton value={result.output} />}
        >
          <pre className={`${textareaCls("min-h-[280px] whitespace-pre-wrap break-words")} ${result.ok ? "" : "text-red-400"}`}>
            {result.output}
          </pre>
        </Panel>
      </div>
    </div>
  );
}
