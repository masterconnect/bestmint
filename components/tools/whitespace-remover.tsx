"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

type Mode = "all" | "tabs" | "newlines" | "collapse" | "replace";

export default function WhitespaceRemover() {
  const [input, setInput] = useState("Hello   world\n\nThis\tis\ta\ttest.\n\nDone.");
  const [mode, setMode] = useState<Mode>("collapse");
  const [replaceChar, setReplaceChar] = useState("-");

  const output = useMemo(() => {
    switch (mode) {
      case "all": return input.replace(/\s+/g, "");
      case "tabs": return input.replace(/\t+/g, "");
      case "newlines": return input.replace(/\r?\n/g, "");
      case "collapse": return input.replace(/\s+/g, " ").trim();
      case "replace": return input.replace(/\s+/g, replaceChar);
    }
  }, [input, mode, replaceChar]);

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Mode">
        <div className="space-y-2">
          {[
            ["all", "Remove all whitespace"],
            ["tabs", "Remove tabs only"],
            ["newlines", "Remove newlines only"],
            ["collapse", "Collapse multiple whitespace to single space"],
            ["replace", "Replace whitespace with custom character"],
          ].map(([v, label]) => (
            <label key={v} className="flex items-center gap-2 text-sm">
              <input type="radio" name="ws-mode" checked={mode === v} onChange={() => setMode(v as Mode)} className="accent-[var(--color-accent)]" />
              <span>{label}</span>
            </label>
          ))}
          {mode === "replace" && (
            <label className="block max-w-xs pt-1">
              <span className="block text-xs text-[var(--color-muted)] mb-1">Replacement character</span>
              <input value={replaceChar} onChange={(e) => setReplaceChar(e.target.value)} className={inputCls()} />
            </label>
          )}
        </div>
      </Panel>
      <Panel title="Output" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
      </Panel>
    </div>
  );
}
