"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

export default function TextDeduplicator() {
  const [input, setInput] = useState("apple\nBanana\napple\ncherry\nbanana\napple");
  const [ci, setCi] = useState(true);
  const [trim, setTrim] = useState(true);
  const [showCounts, setShowCounts] = useState(false);

  const { output, removed, counts } = useMemo(() => {
    const lines = input.split(/\r?\n/);
    const map = new Map<string, { first: string; count: number }>();
    for (const line of lines) {
      const ln = trim ? line.trim() : line;
      const key = ci ? ln.toLowerCase() : ln;
      const existing = map.get(key);
      if (existing) existing.count++;
      else map.set(key, { first: ln, count: 1 });
    }
    const uniqueLines = Array.from(map.values()).map((v) => v.first);
    const dupCount = lines.length - uniqueLines.length;
    const out = showCounts
      ? Array.from(map.values()).map((v) => `${v.count}\t${v.first}`).join("\n")
      : uniqueLines.join("\n");
    return { output: out, removed: dupCount, counts: map };
  }, [input, ci, trim, showCounts]);

  return (
    <div className="space-y-4">
      <Panel title="Input lines">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Options">
        <div className="grid sm:grid-cols-3 gap-2">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ci} onChange={(e) => setCi(e.target.checked)} className="accent-[var(--color-accent)]" />Case-insensitive</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} className="accent-[var(--color-accent)]" />Trim each line</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showCounts} onChange={(e) => setShowCounts(e.target.checked)} className="accent-[var(--color-accent)]" />Show occurrence counts</label>
        </div>
        <div className="mt-3 text-sm text-[var(--color-muted)]">
          <span className="text-[var(--color-foreground)] font-medium">{removed}</span> duplicate line{removed === 1 ? "" : "s"} removed · <span className="text-[var(--color-foreground)] font-medium">{counts.size}</span> unique
        </div>
      </Panel>
      <Panel title="Unique output" action={<CopyButton value={output} />}>
        <textarea readOnly value={output} className={textareaCls()} />
      </Panel>
    </div>
  );
}
