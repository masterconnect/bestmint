"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

export default function TextTruncator() {
  const [input, setInput] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
  const [max, setMax] = useState(50);
  const [unit, setUnit] = useState<"chars" | "words">("chars");
  const [ellipsisType, setEllipsisType] = useState<"three-dots" | "horizontal" | "custom">("three-dots");
  const [customEllipsis, setCustomEllipsis] = useState(" [more]");

  const ellipsis = ellipsisType === "three-dots" ? "..." : ellipsisType === "horizontal" ? "…" : customEllipsis;

  const output = useMemo(() => {
    if (unit === "chars") {
      if ([...input].length <= max) return input;
      return [...input].slice(0, Math.max(0, max - ellipsis.length)).join("") + ellipsis;
    }
    const words = input.split(/\s+/);
    if (words.length <= max) return input;
    return words.slice(0, max).join(" ") + ellipsis;
  }, [input, max, unit, ellipsis]);

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Options">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Max length</span>
            <input type="number" min={1} value={max} onChange={(e) => setMax(Math.max(1, Number(e.target.value) || 1))} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Unit</span>
            <select value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)} className={inputCls()}>
              <option value="chars">Characters</option>
              <option value="words">Words</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Ellipsis</span>
            <select value={ellipsisType} onChange={(e) => setEllipsisType(e.target.value as typeof ellipsisType)} className={inputCls()}>
              <option value="three-dots">"..." (three dots)</option>
              <option value="horizontal">"…" (single char)</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          {ellipsisType === "custom" && (
            <label className="block">
              <span className="block text-xs text-[var(--color-muted)] mb-1">Custom ellipsis</span>
              <input value={customEllipsis} onChange={(e) => setCustomEllipsis(e.target.value)} className={inputCls()} />
            </label>
          )}
        </div>
      </Panel>
      <Panel title="Truncated" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
        <div className="mt-2 text-xs text-[var(--color-muted)]">Original: {[...input].length} chars / {input.split(/\s+/).filter(Boolean).length} words → Output: {[...output].length} chars / {output.split(/\s+/).filter(Boolean).length} words</div>
      </Panel>
    </div>
  );
}
