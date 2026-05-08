"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

const NATO: Record<string, string> = {
  A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo", F: "Foxtrot",
  G: "Golf", H: "Hotel", I: "India", J: "Juliett", K: "Kilo", L: "Lima",
  M: "Mike", N: "November", O: "Oscar", P: "Papa", Q: "Quebec", R: "Romeo",
  S: "Sierra", T: "Tango", U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray",
  Y: "Yankee", Z: "Zulu",
  "0": "Zero", "1": "One", "2": "Two", "3": "Three", "4": "Four",
  "5": "Five", "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine",
};

export default function NatoPhonetic() {
  const [input, setInput] = useState("BestMint 2026");

  const output = useMemo(() => {
    return [...input.toUpperCase()].map((ch) => {
      if (NATO[ch]) return NATO[ch];
      if (ch === " ") return "(space)";
      return ch;
    }).join(" ");
  }, [input]);

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[120px]")} placeholder="Type letters or digits to spell phonetically" />
      </Panel>
      <Panel title="NATO phonetic" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
      </Panel>
      <Panel title="Reference">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-mono">
          {Object.entries(NATO).map(([k, v]) => (
            <div key={k} className="rounded border border-[var(--color-border)] px-2 py-1"><span className="text-[var(--color-muted)]">{k}</span> {v}</div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
