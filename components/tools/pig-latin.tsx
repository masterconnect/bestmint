"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

function isVowel(c: string) { return /[aeiouAEIOU]/.test(c); }

function toPigLatin(word: string): string {
  if (!word) return word;
  if (isVowel(word[0])) return word + "way";
  let i = 0;
  while (i < word.length && !isVowel(word[i])) i++;
  if (i === word.length) return word + "ay";
  const cluster = word.slice(0, i);
  const rest = word.slice(i);
  // Preserve original capitalisation: if first letter was upper, capitalise rest
  if (word[0] === word[0].toUpperCase() && /[a-zA-Z]/.test(word[0])) {
    return rest[0].toUpperCase() + rest.slice(1) + cluster.toLowerCase() + "ay";
  }
  return rest + cluster + "ay";
}

function fromPigLatin(word: string): string {
  if (!word) return word;
  if (word.endsWith("way")) return word.slice(0, -3);
  if (word.endsWith("ay")) {
    const stem = word.slice(0, -2);
    // Last consonant cluster moved to end before "ay" → can't perfectly recover length; assume single consonant
    let i = stem.length - 1;
    while (i > 0 && !isVowel(stem[i])) i--;
    const moved = stem.slice(i + 1);
    const rest = stem.slice(0, i + 1);
    return moved + rest;
  }
  return word;
}

function transform(text: string, mode: "encode" | "decode"): string {
  return text.replace(/[a-zA-Z]+/g, (w) => mode === "encode" ? toPigLatin(w) : fromPigLatin(w));
}

export default function PigLatin() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("The quick brown fox jumps over the lazy dog.");

  const output = useMemo(() => transform(input, mode), [input, mode]);

  return (
    <div className="space-y-4">
      <Panel title="Mode">
        <div className="flex gap-2">
          <button onClick={() => setMode("encode")} className={mode === "encode" ? btnPrimary() : btnGhost()}>English → Pig Latin</button>
          <button onClick={() => setMode("decode")} className={mode === "decode" ? btnPrimary() : btnGhost()}>Pig Latin → English</button>
        </div>
      </Panel>
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Output" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
        <p className="mt-2 text-xs text-[var(--color-muted)]">Decoding is heuristic — Pig Latin loses information about consonant cluster length.</p>
      </Panel>
    </div>
  );
}
