"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

function reverseChars(s: string) { return [...s].reverse().join(""); }
function reverseWords(s: string) { return s.split(/\s+/).reverse().join(" "); }
function reverseLines(s: string) { return s.split(/\r?\n/).reverse().join("\n"); }

export default function TextReverser() {
  const [input, setInput] = useState("BestMint makes online tools simple.");
  const out = {
    chars: reverseChars(input),
    words: reverseWords(input),
    lines: reverseLines(input),
  };
  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      {(["chars", "words", "lines"] as const).map((mode) => (
        <Panel
          key={mode}
          title={mode === "chars" ? "Reversed characters" : mode === "words" ? "Reversed words" : "Reversed lines"}
          action={<CopyButton value={out[mode]} />}
        >
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out[mode]}</pre>
        </Panel>
      ))}
    </div>
  );
}
