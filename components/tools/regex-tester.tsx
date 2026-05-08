"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b(\\w+)@(\\w+\\.\\w+)\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Email me at hello@bestmint.com or admin@example.com.");

  const result = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups: string[] }[] = [];
      if (flags.includes("g")) {
        for (const m of text.matchAll(re)) matches.push({ match: m[0], index: m.index ?? 0, groups: m.slice(1) });
      } else {
        const m = text.match(re);
        if (m) matches.push({ match: m[0], index: m.index ?? 0, groups: m.slice(1) });
      }
      return { ok: true as const, matches, re };
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
      <Panel title="Regular expression">
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-muted)]">/</span>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)} className={inputCls("font-mono")} />
          <span className="text-[var(--color-muted)]">/</span>
          <input value={flags} onChange={(e) => setFlags(e.target.value)} className={inputCls("w-24 font-mono")} placeholder="gimsuy" />
        </div>
        {!result.ok && <p className="mt-2 text-sm text-red-400">{result.error}</p>}
      </Panel>
      <Panel title="Test string">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title={`Matches${result.ok ? ` (${result.matches.length})` : ""}`}>
        <div className="font-mono text-sm whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">
          {typeof highlighted === "string" ? highlighted : highlighted.map((p, i) => p.hit ? (
            <mark key={i} className="bg-[var(--color-accent)]/40 text-[var(--color-foreground)] rounded px-0.5">{p.text}</mark>
          ) : <span key={i}>{p.text}</span>)}
        </div>
        {result.ok && result.matches.length > 0 && (
          <ul className="mt-3 space-y-1 text-xs font-mono">
            {result.matches.map((m, i) => (
              <li key={i} className="flex flex-wrap items-center gap-2 rounded border border-[var(--color-border)] px-2 py-1">
                <span className="text-[var(--color-muted)]">@{m.index}</span>
                <span>{m.match}</span>
                {m.groups.map((g, gi) => <span key={gi} className="text-[var(--color-accent)]">${gi + 1}={g}</span>)}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
