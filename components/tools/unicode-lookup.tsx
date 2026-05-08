"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

const COMMON_NAMES: Record<number, string> = {
  0x20: "SPACE", 0x21: "EXCLAMATION MARK", 0x22: "QUOTATION MARK", 0x23: "NUMBER SIGN",
  0x24: "DOLLAR SIGN", 0x25: "PERCENT SIGN", 0x26: "AMPERSAND", 0x27: "APOSTROPHE",
  0x28: "LEFT PARENTHESIS", 0x29: "RIGHT PARENTHESIS", 0x2A: "ASTERISK", 0x2B: "PLUS SIGN",
  0x2C: "COMMA", 0x2D: "HYPHEN-MINUS", 0x2E: "FULL STOP", 0x2F: "SOLIDUS",
  0x3A: "COLON", 0x3B: "SEMICOLON", 0x3F: "QUESTION MARK", 0x40: "COMMERCIAL AT",
  0x5B: "LEFT SQUARE BRACKET", 0x5C: "REVERSE SOLIDUS", 0x5D: "RIGHT SQUARE BRACKET",
  0x5E: "CIRCUMFLEX ACCENT", 0x5F: "LOW LINE", 0x60: "GRAVE ACCENT",
  0x7B: "LEFT CURLY BRACKET", 0x7C: "VERTICAL LINE", 0x7D: "RIGHT CURLY BRACKET", 0x7E: "TILDE",
  0xA0: "NO-BREAK SPACE", 0xA9: "COPYRIGHT SIGN", 0xAE: "REGISTERED SIGN", 0xB0: "DEGREE SIGN",
  0x2014: "EM DASH", 0x2013: "EN DASH", 0x2018: "LEFT SINGLE QUOTATION MARK",
  0x2019: "RIGHT SINGLE QUOTATION MARK", 0x201C: "LEFT DOUBLE QUOTATION MARK",
  0x201D: "RIGHT DOUBLE QUOTATION MARK", 0x2026: "HORIZONTAL ELLIPSIS",
  0x20AC: "EURO SIGN", 0x2122: "TRADE MARK SIGN",
};

function blockName(cp: number): string {
  if (cp >= 0x0000 && cp <= 0x007F) return "Basic Latin (ASCII)";
  if (cp >= 0x0080 && cp <= 0x00FF) return "Latin-1 Supplement";
  if (cp >= 0x0100 && cp <= 0x017F) return "Latin Extended-A";
  if (cp >= 0x0180 && cp <= 0x024F) return "Latin Extended-B";
  if (cp >= 0x0370 && cp <= 0x03FF) return "Greek and Coptic";
  if (cp >= 0x0400 && cp <= 0x04FF) return "Cyrillic";
  if (cp >= 0x0590 && cp <= 0x05FF) return "Hebrew";
  if (cp >= 0x0600 && cp <= 0x06FF) return "Arabic";
  if (cp >= 0x0900 && cp <= 0x097F) return "Devanagari";
  if (cp >= 0x2000 && cp <= 0x206F) return "General Punctuation";
  if (cp >= 0x20A0 && cp <= 0x20CF) return "Currency Symbols";
  if (cp >= 0x2100 && cp <= 0x214F) return "Letterlike Symbols";
  if (cp >= 0x2190 && cp <= 0x21FF) return "Arrows";
  if (cp >= 0x2200 && cp <= 0x22FF) return "Mathematical Operators";
  if (cp >= 0x2500 && cp <= 0x257F) return "Box Drawing";
  if (cp >= 0x2600 && cp <= 0x26FF) return "Miscellaneous Symbols";
  if (cp >= 0x2700 && cp <= 0x27BF) return "Dingbats";
  if (cp >= 0x3040 && cp <= 0x309F) return "Hiragana";
  if (cp >= 0x30A0 && cp <= 0x30FF) return "Katakana";
  if (cp >= 0x4E00 && cp <= 0x9FFF) return "CJK Unified Ideographs";
  if (cp >= 0xAC00 && cp <= 0xD7AF) return "Hangul Syllables";
  if (cp >= 0x1F300 && cp <= 0x1F5FF) return "Miscellaneous Symbols and Pictographs";
  if (cp >= 0x1F600 && cp <= 0x1F64F) return "Emoticons";
  if (cp >= 0x1F680 && cp <= 0x1F6FF) return "Transport and Map Symbols";
  return "Other";
}

function parseCodepoint(input: string): number | null {
  const t = input.trim();
  if (!t) return null;
  if (t.match(/^U\+[0-9a-fA-F]+$/)) return parseInt(t.slice(2), 16);
  if (t.match(/^0x[0-9a-fA-F]+$/)) return parseInt(t.slice(2), 16);
  if (t.match(/^\\u[0-9a-fA-F]{4}$/)) return parseInt(t.slice(2), 16);
  if (t.match(/^[0-9]+$/)) return parseInt(t, 10);
  // Otherwise treat first character as the input
  return t.codePointAt(0) ?? null;
}

export default function UnicodeLookup() {
  const [input, setInput] = useState("€");
  const data = useMemo(() => {
    const cp = parseCodepoint(input);
    if (cp === null || Number.isNaN(cp) || cp < 0 || cp > 0x10FFFF) return null;
    const ch = String.fromCodePoint(cp);
    return {
      char: ch,
      cp,
      hex: cp.toString(16).toUpperCase().padStart(4, "0"),
      htmlDec: `&#${cp};`,
      htmlHex: `&#x${cp.toString(16).toUpperCase()};`,
      jsEscape: cp <= 0xFFFF ? `\\u${cp.toString(16).toUpperCase().padStart(4, "0")}` : `\\u{${cp.toString(16).toUpperCase()}}`,
      url: encodeURIComponent(ch),
      name: COMMON_NAMES[cp] || "(name unknown)",
      block: blockName(cp),
      utf8: Array.from(new TextEncoder().encode(ch)).map((b) => b.toString(16).toUpperCase().padStart(2, "0")).join(" "),
    };
  }, [input]);

  return (
    <div className="space-y-4">
      <Panel title="Character or codepoint">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a character, paste U+20AC, or 8364" className={inputCls()} />
      </Panel>
      {!data ? (
        <p className="text-red-400 text-sm">Invalid input.</p>
      ) : (
        <div className="space-y-2">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
            <div className="text-6xl">{data.char}</div>
            <div className="text-sm text-[var(--color-muted)] mt-2">{data.name} · {data.block}</div>
          </div>
          {[
            ["Codepoint", `U+${data.hex}`],
            ["Decimal", String(data.cp)],
            ["HTML decimal entity", data.htmlDec],
            ["HTML hex entity", data.htmlHex],
            ["JS escape", data.jsEscape],
            ["URL encoded", data.url],
            ["UTF-8 bytes", data.utf8],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-[var(--color-border)] p-3 flex items-center justify-between gap-4">
              <span className="text-xs text-[var(--color-muted)] w-40">{label}</span>
              <span className="font-mono text-sm flex-1 break-all">{value}</span>
              <CopyButton value={value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
