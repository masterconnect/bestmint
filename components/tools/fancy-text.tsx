"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

const A = 65, Z = 90, a = 97, z = 122, ZERO = 48, NINE = 57;

function map(s: string, upperBase: number, lowerBase: number, digitBase: number | null): string {
  return [...s].map((c) => {
    const cp = c.codePointAt(0)!;
    if (cp >= A && cp <= Z) return String.fromCodePoint(upperBase + (cp - A));
    if (cp >= a && cp <= z) return String.fromCodePoint(lowerBase + (cp - a));
    if (digitBase !== null && cp >= ZERO && cp <= NINE) return String.fromCodePoint(digitBase + (cp - ZERO));
    return c;
  }).join("");
}

function strike(s: string): string {
  return [...s].map((c) => c + "̶").join("");
}
function underline(s: string): string {
  return [...s].map((c) => c + "̲").join("");
}
function smallCaps(s: string): string {
  const map: Record<string, string> = { a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" };
  return s.toLowerCase().split("").map((c) => map[c] || c).join("");
}

const VARIANTS: { name: string; fn: (s: string) => string }[] = [
  { name: "Bold", fn: (s) => map(s, 0x1D400, 0x1D41A, 0x1D7CE) },
  { name: "Italic", fn: (s) => map(s, 0x1D434, 0x1D44E, null) },
  { name: "Bold Italic", fn: (s) => map(s, 0x1D468, 0x1D482, null) },
  { name: "Script", fn: (s) => map(s, 0x1D49C, 0x1D4B6, null) },
  { name: "Bold Script", fn: (s) => map(s, 0x1D4D0, 0x1D4EA, null) },
  { name: "Fraktur", fn: (s) => map(s, 0x1D504, 0x1D51E, null) },
  { name: "Double-struck", fn: (s) => map(s, 0x1D538, 0x1D552, 0x1D7D8) },
  { name: "Sans-serif", fn: (s) => map(s, 0x1D5A0, 0x1D5BA, 0x1D7E2) },
  { name: "Sans Bold", fn: (s) => map(s, 0x1D5D4, 0x1D5EE, 0x1D7EC) },
  { name: "Sans Italic", fn: (s) => map(s, 0x1D608, 0x1D622, null) },
  { name: "Monospace", fn: (s) => map(s, 0x1D670, 0x1D68A, 0x1D7F6) },
  { name: "Circled", fn: (s) => {
    const upper = (cp: number) => cp - A + 0x24B6;
    const lower = (cp: number) => cp - a + 0x24D0;
    const digit = (cp: number) => cp === ZERO ? 0x24EA : (cp - 49 + 0x2460);
    return [...s].map((c) => {
      const cp = c.codePointAt(0)!;
      if (cp >= A && cp <= Z) return String.fromCodePoint(upper(cp));
      if (cp >= a && cp <= z) return String.fromCodePoint(lower(cp));
      if (cp >= ZERO && cp <= NINE) return String.fromCodePoint(digit(cp));
      return c;
    }).join("");
  } },
  { name: "Negative Circled", fn: (s) => map(s.toUpperCase(), 0x1F150, 0x1F150, null) },
  { name: "Squared", fn: (s) => map(s.toUpperCase(), 0x1F130, 0x1F130, null) },
  { name: "Strikethrough", fn: (s) => strike(s) },
  { name: "Underline", fn: (s) => underline(s) },
  { name: "Small Caps", fn: smallCaps },
];

export default function FancyText() {
  const [input, setInput] = useState("Hello BestMint");
  const variants = useMemo(() => VARIANTS.map((v) => ({ name: v.name, value: v.fn(input) })), [input]);

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[100px]")} />
      </Panel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {variants.map((v) => (
          <div key={v.name} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-muted)]">{v.name}</span>
              <CopyButton value={v.value} />
            </div>
            <div className="mt-2 text-base break-all">{v.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
