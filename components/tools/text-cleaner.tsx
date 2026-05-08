"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

export default function TextCleaner() {
  const [input, setInput] = useState("Hello   world\r\n\n  This is   a    test.\n\n\nDone. “Smart” quotes—and ‘others’.");
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeBlank, setRemoveBlank] = useState(true);
  const [normalizeNewlines, setNormalizeNewlines] = useState(true);
  const [smartQuotes, setSmartQuotes] = useState(true);
  const [stripNonPrintable, setStripNonPrintable] = useState(true);

  const output = useMemo(() => {
    let s = input;
    if (normalizeNewlines) s = s.replace(/\r\n?/g, "\n");
    if (smartQuotes) {
      s = s
        .replace(/[‘’‚‛]/g, "'")
        .replace(/[“”„‟]/g, '"')
        .replace(/[–—]/g, "-")
        .replace(/…/g, "...");
    }
    if (stripNonPrintable) s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
    if (collapseSpaces) s = s.split("\n").map((ln) => ln.replace(/[ \t]+/g, " ")).join("\n");
    if (trimLines) s = s.split("\n").map((ln) => ln.trim()).join("\n");
    if (removeBlank) s = s.split("\n").filter((ln) => ln.trim().length > 0).join("\n");
    return s;
  }, [input, collapseSpaces, trimLines, removeBlank, normalizeNewlines, smartQuotes, stripNonPrintable]);

  const cb = (label: string, v: boolean, set: (b: boolean) => void) => (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={v} onChange={(e) => set(e.target.checked)} className="accent-[var(--color-accent)]" />
      <span>{label}</span>
    </label>
  );

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[160px]")} />
      </Panel>
      <Panel title="Options">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {cb("Collapse multiple spaces", collapseSpaces, setCollapseSpaces)}
          {cb("Trim lines", trimLines, setTrimLines)}
          {cb("Remove blank lines", removeBlank, setRemoveBlank)}
          {cb("Normalize newlines (CRLF→LF)", normalizeNewlines, setNormalizeNewlines)}
          {cb("Smart → regular quotes", smartQuotes, setSmartQuotes)}
          {cb("Strip non-printable characters", stripNonPrintable, setStripNonPrintable)}
        </div>
      </Panel>
      <Panel title="Cleaned" action={<CopyButton value={output} />}>
        <textarea readOnly value={output} className={textareaCls("min-h-[160px]")} />
      </Panel>
    </div>
  );
}
