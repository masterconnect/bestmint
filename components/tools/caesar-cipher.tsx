"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

function caesar(s: string, shift: number): string {
  const k = ((shift % 26) + 26) % 26;
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + k) % 26) + base);
  });
}

export default function CaesarCipher() {
  const [input, setInput] = useState("Hello, BestMint!");
  const [shift, setShift] = useState(3);
  const [decode, setDecode] = useState(false);

  const output = useMemo(() => caesar(input, decode ? -shift : shift), [input, shift, decode]);

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Settings">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Shift ({shift})</span>
            <input type="range" min={-25} max={25} value={shift} onChange={(e) => setShift(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
            <input type="number" min={-25} max={25} value={shift} onChange={(e) => setShift(Math.max(-25, Math.min(25, Number(e.target.value) || 0)))} className={inputCls("mt-2")} />
          </label>
          <label className="flex items-end gap-2 pb-1">
            <input type="checkbox" checked={decode} onChange={(e) => setDecode(e.target.checked)} className="accent-[var(--color-accent)]" />
            <span className="text-sm">Decode (reverse shift)</span>
          </label>
        </div>
      </Panel>
      <Panel title="Output" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
      </Panel>
    </div>
  );
}
