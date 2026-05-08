"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";


export default function BinaryText() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hi!");

  const output = useMemo(() => {
    try {
      if (mode === "encode") {
        const bytes = new TextEncoder().encode(input);
        return Array.from(bytes).map((b) => b.toString(2).padStart(8, "0")).join(" ");
      }
      const groups = input.replace(/[^01]/g, " ").trim().split(/\s+/).filter(Boolean);
      const bytes = new Uint8Array(groups.length);
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].length !== 8) return `Error: group ${i + 1} is ${groups[i].length} bits, expected 8`;
        bytes[i] = parseInt(groups[i], 2);
      }
      return new TextDecoder().decode(bytes);
    } catch (e) {
      return `Error: ${(e as Error).message}`;
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <Panel title="Mode">
        <div className="flex gap-2">
          <button onClick={() => setMode("encode")} className={mode === "encode" ? btnPrimary() : btnGhost()}>Text → Binary</button>
          <button onClick={() => setMode("decode")} className={mode === "decode" ? btnPrimary() : btnGhost()}>Binary → Text</button>
        </div>
      </Panel>
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} placeholder={mode === "encode" ? "Enter text" : "Enter binary: 8-bit groups separated by spaces"} />
      </Panel>
      <Panel title="Output" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
      </Panel>
    </div>
  );
}
