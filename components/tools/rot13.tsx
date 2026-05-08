"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

function rot13(s: string, preserveCase: boolean): string {
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    const code = c.charCodeAt(0) - base;
    const out = String.fromCharCode(((code + 13) % 26) + base);
    return preserveCase ? out : out.toLowerCase();
  });
}

export default function Rot13() {
  const [input, setInput] = useState("Hello, BestMint!");
  const [preserveCase, setPreserveCase] = useState(true);
  const output = useMemo(() => rot13(input, preserveCase), [input, preserveCase]);

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Options">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={preserveCase} onChange={(e) => setPreserveCase(e.target.checked)} className="accent-[var(--color-accent)]" />
          Preserve original case
        </label>
        <p className="mt-2 text-xs text-[var(--color-muted)]">ROT13 is symmetric: encoding and decoding use the same operation.</p>
      </Panel>
      <Panel title="ROT13 output" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
      </Panel>
    </div>
  );
}
