"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

const SHEET: { group: string; rows: { token: string; meaning: string }[] }[] = [
  {
    group: "Anchors",
    rows: [
      { token: "^", meaning: "Start of string / line (with m flag)" },
      { token: "$", meaning: "End of string / line (with m flag)" },
      { token: "\\b", meaning: "Word boundary" },
      { token: "\\B", meaning: "Non-word boundary" },
    ],
  },
  {
    group: "Character classes",
    rows: [
      { token: ".", meaning: "Any character except newline" },
      { token: "\\d", meaning: "Digit (0-9)" },
      { token: "\\D", meaning: "Non-digit" },
      { token: "\\w", meaning: "Word char (a-z A-Z 0-9 _)" },
      { token: "\\W", meaning: "Non-word char" },
      { token: "\\s", meaning: "Whitespace" },
      { token: "\\S", meaning: "Non-whitespace" },
      { token: "[abc]", meaning: "Any of a, b, c" },
      { token: "[^abc]", meaning: "Anything except a, b, c" },
      { token: "[a-z]", meaning: "Range" },
    ],
  },
  {
    group: "Quantifiers",
    rows: [
      { token: "*", meaning: "0 or more" },
      { token: "+", meaning: "1 or more" },
      { token: "?", meaning: "0 or 1" },
      { token: "{n}", meaning: "Exactly n" },
      { token: "{n,}", meaning: "n or more" },
      { token: "{n,m}", meaning: "n to m" },
      { token: "*?", meaning: "Lazy 0 or more" },
    ],
  },
  {
    group: "Groups & alternation",
    rows: [
      { token: "(abc)", meaning: "Capturing group" },
      { token: "(?:abc)", meaning: "Non-capturing group" },
      { token: "(?<name>abc)", meaning: "Named capturing group" },
      { token: "a|b", meaning: "Alternation: a or b" },
      { token: "\\1", meaning: "Backreference to group 1" },
    ],
  },
  {
    group: "Assertions",
    rows: [
      { token: "(?=…)", meaning: "Positive lookahead" },
      { token: "(?!…)", meaning: "Negative lookahead" },
      { token: "(?<=…)", meaning: "Positive lookbehind" },
      { token: "(?<!…)", meaning: "Negative lookbehind" },
    ],
  },
  {
    group: "Flags",
    rows: [
      { token: "g", meaning: "Global — find all matches" },
      { token: "i", meaning: "Case-insensitive" },
      { token: "m", meaning: "Multiline — ^ and $ per line" },
      { token: "s", meaning: "Dotall — . matches newline" },
      { token: "u", meaning: "Unicode" },
      { token: "y", meaning: "Sticky — match at lastIndex" },
    ],
  },
];

export default function RegexCheatsheetTool() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Email me at hello@bestmint.com or admin@example.com.");

  const result = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const matches: { match: string; index: number }[] = [];
      if (flags.includes("g")) {
        for (const m of text.matchAll(re)) matches.push({ match: m[0], index: m.index ?? 0 });
      } else {
        const m = text.match(re);
        if (m) matches.push({ match: m[0], index: m.index ?? 0 });
      }
      return { ok: true as const, matches };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (!result.ok || !result.matches.length) return text;
    const parts: { text: string; hit: boolean }[] = [];
    let cursor = 0;
    for (const m of result.matches) {
      if (m.index > cursor) parts.push({ text: text.slice(cursor, m.index), hit: false });
      parts.push({ text: text.slice(m.index, m.index + m.match.length), hit: true });
      cursor = m.index + m.match.length;
      if (m.match.length === 0) cursor++;
    }
    if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false });
    return parts;
  }, [text, result]);

  return (
    <div className="space-y-4">
      <Panel title="Live tester">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[var(--color-muted)]">/</span>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)} className={inputCls("font-mono")} />
          <span className="text-[var(--color-muted)]">/</span>
          <input value={flags} onChange={(e) => setFlags(e.target.value)} className={inputCls("w-24 font-mono")} placeholder="gimsuy" />
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls("min-h-[100px]")} />
        <div className="mt-2 font-mono text-sm whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">
          {!result.ok ? <span className="text-red-400">{result.error}</span> :
            typeof highlighted === "string" ? highlighted : highlighted.map((p, i) => p.hit ? (
              <mark key={i} className="bg-[var(--color-accent)]/40 text-[var(--color-foreground)] rounded px-0.5">{p.text}</mark>
            ) : <span key={i}>{p.text}</span>)}
        </div>
      </Panel>
      {SHEET.map((g) => (
        <Panel key={g.group} title={g.group}>
          <table className="w-full text-sm">
            <tbody>
              {g.rows.map((r, i) => (
                <tr key={i} className="border-b border-[var(--color-border)]/50 last:border-b-0">
                  <td className="p-2 font-mono text-[var(--color-accent)] w-1/3">{r.token}</td>
                  <td className="p-2 text-[var(--color-muted)]">{r.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      ))}
    </div>
  );
}
