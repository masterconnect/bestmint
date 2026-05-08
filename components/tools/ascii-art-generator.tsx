"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

// Each font: char → array of 6 row strings.
type Font = Record<string, string[]>;

const STANDARD: Font = {
  A: [" ▄▀█ ", "█▀█▀█", "█▀▀▀█", "█   █", "█   █", "     "],
  B: ["█▀▀▄ ", "█▀▀▄ ", "█▄▄▀ ", "█  █ ", "█▄▄▀ ", "     "],
  C: [" ▄▀▀█", "█    ", "█    ", "█    ", " ▀▀▀█", "     "],
  D: ["█▀▀▄ ", "█  █ ", "█  █ ", "█  █ ", "█▄▄▀ ", "     "],
  E: ["█▀▀▀ ", "█    ", "█▀▀  ", "█    ", "█▄▄▄ ", "     "],
  F: ["█▀▀▀ ", "█    ", "█▀▀  ", "█    ", "█    ", "     "],
  G: [" ▄▀▀█", "█    ", "█  ▀█", "█  █ ", " ▀▀▀ ", "     "],
  H: ["█   █", "█   █", "█▀▀▀█", "█   █", "█   █", "     "],
  I: ["█████", "  █  ", "  █  ", "  █  ", "█████", "     "],
  J: ["█████", "   █ ", "   █ ", "█  █ ", " ▀▀  ", "     "],
  K: ["█  █ ", "█ █  ", "██   ", "█ █  ", "█  █ ", "     "],
  L: ["█    ", "█    ", "█    ", "█    ", "█▄▄▄ ", "     "],
  M: ["█▄ ▄█", "█▀█▀█", "█ █ █", "█   █", "█   █", "     "],
  N: ["█▄  █", "█▀█ █", "█ ▀██", "█  ▀█", "█   █", "     "],
  O: [" ▄▀▄ ", "█   █", "█   █", "█   █", " ▀▄▀ ", "     "],
  P: ["█▀▀▄ ", "█  █ ", "█▄▄▀ ", "█    ", "█    ", "     "],
  Q: [" ▄▀▄ ", "█   █", "█   █", "█  █ ", " ▀▄▀▄", "     "],
  R: ["█▀▀▄ ", "█  █ ", "█▄▄▀ ", "█  █ ", "█   █", "     "],
  S: [" ▄▀▀█", "█    ", " ▀▀█ ", "    █", "█▄▄▀ ", "     "],
  T: ["█████", "  █  ", "  █  ", "  █  ", "  █  ", "     "],
  U: ["█   █", "█   █", "█   █", "█   █", " ▀▄▀ ", "     "],
  V: ["█   █", "█   █", "█   █", " █ █ ", "  █  ", "     "],
  W: ["█   █", "█   █", "█ █ █", "█▀█▀█", "█▀ ▀█", "     "],
  X: ["█   █", " █ █ ", "  █  ", " █ █ ", "█   █", "     "],
  Y: ["█   █", " █ █ ", "  █  ", "  █  ", "  █  ", "     "],
  Z: ["█████", "   █ ", "  █  ", " █   ", "█████", "     "],
  "0": [" ▄▀▄ ", "█  ▀█", "█ █ █", "█▀  █", " ▀▄▀ ", "     "],
  "1": ["  █  ", " ██  ", "  █  ", "  █  ", "█████", "     "],
  "2": [" ▀▀▄ ", "    █", "  ▄▀ ", " ▄▀  ", "▀▀▀▀ ", "     "],
  "3": [" ▀▀▄ ", "    █", "  ▀▄ ", "    █", " ▀▀▄ ", "     "],
  "4": ["█  █ ", "█  █ ", "▀▀▀█▀", "   █ ", "   █ ", "     "],
  "5": ["▀▀▀▀ ", "█    ", "▀▀▀▄ ", "    █", " ▀▀▀ ", "     "],
  "6": [" ▄▀▀ ", "█    ", "█▀▀▄ ", "█  █ ", " ▀▀  ", "     "],
  "7": ["▀▀▀▀█", "    █", "   █ ", "  █  ", " █   ", "     "],
  "8": [" ▄▀▄ ", "█  █ ", " ▀▄▀ ", "█  █ ", " ▀▄▀ ", "     "],
  "9": [" ▄▀▄ ", "█  █ ", " ▀▀█ ", "    █", " ▄▀  ", "     "],
  " ": ["     ", "     ", "     ", "     ", "     ", "     "],
};

const BLOCK: Font = {};
const BANNER: Font = {};
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ".split("").forEach((ch) => {
  // Block: solid chunky filled blocks
  BLOCK[ch] = STANDARD[ch] ? STANDARD[ch].map((row) => row.replace(/[▀▄▌▐█]/g, "█").replace(/[▀▁]/g, "█")) : ["     ", "     ", "     ", "     ", "     ", "     "];
  // Banner: lighter shade
  BANNER[ch] = STANDARD[ch] ? STANDARD[ch].map((row) => row.replace(/█/g, "▓").replace(/[▀▄]/g, "▒")) : ["     ", "     ", "     ", "     ", "     ", "     "];
});

const FONTS: Record<string, Font> = { Standard: STANDARD, Block: BLOCK, Banner: BANNER };

function render(text: string, font: Font): string {
  const upper = text.toUpperCase();
  const rows: string[] = ["", "", "", "", "", ""];
  for (const ch of upper) {
    const glyph = font[ch] || font[" "];
    for (let i = 0; i < 6; i++) rows[i] += glyph[i] + " ";
  }
  return rows.join("\n");
}

export default function AsciiArtGenerator() {
  const [text, setText] = useState("BESTMINT");
  const [fontName, setFontName] = useState<keyof typeof FONTS>("Standard");

  const output = useMemo(() => render(text, FONTS[fontName]), [text, fontName]);

  return (
    <div className="space-y-4">
      <Panel title="Settings">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Text</span>
            <input value={text} onChange={(e) => setText(e.target.value.slice(0, 24))} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Font</span>
            <select value={fontName} onChange={(e) => setFontName(e.target.value as keyof typeof FONTS)} className={inputCls()}>
              {Object.keys(FONTS).map((f) => <option key={f}>{f}</option>)}
            </select>
          </label>
        </div>
      </Panel>
      <Panel title="ASCII output" action={<CopyButton value={output} />}>
        <pre className="font-mono text-xs whitespace-pre overflow-x-auto leading-tight">{output}</pre>
      </Panel>
    </div>
  );
}
