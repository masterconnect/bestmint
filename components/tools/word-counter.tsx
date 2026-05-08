"use client";
import { useMemo, useState } from "react";
import { Panel, textareaCls } from "@/components/ui/panel";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = [...text].length;
    const charsNoSpaces = [...text.replace(/\s/g, "")].length;
    const sentences = trimmed ? trimmed.split(/[.!?]+(?:\s|$)/).filter(Boolean).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim()).length : 0;
    const lines = text.split(/\r?\n/).length;
    const minutes = words / 225;
    const readingTime = minutes < 1 ? `${Math.ceil(minutes * 60)} sec` : `${Math.ceil(minutes)} min`;
    return { words, chars, charsNoSpaces, sentences, paragraphs, lines, readingTime };
  }, [text]);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Panel title="Text">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={textareaCls("min-h-[300px]")}
            placeholder="Start typing or paste your text here…"
          />
        </Panel>
      </div>
      <div>
        <Panel title="Statistics">
          <dl className="grid grid-cols-2 gap-3">
            {[
              ["Words", stats.words],
              ["Characters", stats.chars],
              ["No spaces", stats.charsNoSpaces],
              ["Sentences", stats.sentences],
              ["Paragraphs", stats.paragraphs],
              ["Lines", stats.lines],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border border-[var(--color-border)] p-3">
                <dt className="text-[11px] uppercase tracking-wider text-[var(--color-muted)]">{k}</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 rounded-md border border-[var(--color-border)] p-3 bg-[var(--color-background)]">
            <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)]">Reading time</div>
            <div className="mt-1 text-xl font-semibold">{stats.readingTime}</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
