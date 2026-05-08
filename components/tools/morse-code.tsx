"use client";
import { useMemo, useRef, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", "$": "...-..-", "@": ".--.-.",
};
const REV: Record<string, string> = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

export default function MorseCode() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello world");
  const audioCtx = useRef<AudioContext | null>(null);

  const output = useMemo(() => {
    if (mode === "encode") {
      return input.toUpperCase().split("").map((ch) => {
        if (ch === " ") return "/";
        return MORSE[ch] || "";
      }).filter(Boolean).join(" ");
    }
    return input.split(/\s+/).map((tok) => {
      if (tok === "/" || tok === "|") return " ";
      return REV[tok] || "";
    }).join("");
  }, [input, mode]);

  const play = async () => {
    const morse = mode === "encode" ? output : input;
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtx.current;
    const dot = 0.08;
    const dash = 0.24;
    const gap = 0.08;
    let t = ctx.currentTime + 0.05;
    for (const ch of morse) {
      if (ch === "." || ch === "-") {
        const dur = ch === "." ? dot : dash;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 600;
        osc.type = "sine";
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.3, t + 0.005);
        gain.gain.linearRampToValueAtTime(0.3, t + dur - 0.005);
        gain.gain.linearRampToValueAtTime(0, t + dur);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur);
        t += dur + gap;
      } else if (ch === " ") t += gap * 2;
      else if (ch === "/") t += gap * 6;
    }
  };

  return (
    <div className="space-y-4">
      <Panel title="Mode">
        <div className="flex gap-2">
          <button onClick={() => setMode("encode")} className={mode === "encode" ? btnPrimary() : btnGhost()}>Text → Morse</button>
          <button onClick={() => setMode("decode")} className={mode === "decode" ? btnPrimary() : btnGhost()}>Morse → Text</button>
        </div>
      </Panel>
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} placeholder={mode === "encode" ? "Enter text" : "Enter morse: dots, dashes, / for space"} />
      </Panel>
      <Panel title="Output" action={<div className="flex gap-2"><button onClick={play} className="px-2.5 py-1 rounded-md border border-[var(--color-border)] text-xs hover:border-[var(--color-accent)]">▶ Play</button><CopyButton value={output} /></div>}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
      </Panel>
    </div>
  );
}
