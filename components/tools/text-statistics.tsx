"use client";
import { useMemo, useState } from "react";
import { Panel, textareaCls } from "@/components/ui/panel";

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  let cleaned = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  cleaned = cleaned.replace(/^y/, "");
  const matches = cleaned.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function countComplex(word: string): boolean {
  return countSyllables(word) >= 3 && !/^[A-Z]/.test(word);
}

export default function TextStatistics() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const wordsArr = trimmed ? trimmed.split(/\s+/) : [];
    const words = wordsArr.length;
    const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+/g) || [trimmed]).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const syllables = wordsArr.reduce((sum, w) => sum + countSyllables(w), 0);
    const complexWords = wordsArr.filter(countComplex).length;
    const unique = new Set(wordsArr.map((w) => w.toLowerCase().replace(/[^a-z]/g, "")).filter(Boolean)).size;

    const avgWordLen = words ? charsNoSpaces / words : 0;
    const avgSentenceLen = sentences ? words / sentences : 0;
    const lexicalDiversity = words ? unique / words : 0;

    const flesch = sentences && words ? 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words) : 0;
    const fkGrade = sentences && words ? 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59 : 0;
    const gunningFog = sentences && words ? 0.4 * ((words / sentences) + 100 * (complexWords / words)) : 0;
    const ari = sentences && words ? 4.71 * (charsNoSpaces / words) + 0.5 * (words / sentences) - 21.43 : 0;

    return {
      words, sentences, syllables, complexWords, unique,
      avgWordLen, avgSentenceLen, lexicalDiversity,
      flesch, fkGrade, gunningFog, ari,
    };
  }, [text]);

  const cell = (label: string, value: string | number) => (
    <div className="rounded-md border border-[var(--color-border)] p-3">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)]">{label}</div>
      <div className="mt-1 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );

  const fmt = (n: number, d = 2) => (Number.isFinite(n) ? n.toFixed(d) : "0");

  return (
    <div className="space-y-4">
      <Panel title="Text">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls("min-h-[180px]")} />
      </Panel>
      <Panel title="Counts">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cell("Words", stats.words)}
          {cell("Sentences", stats.sentences)}
          {cell("Syllables", stats.syllables)}
          {cell("Unique words", stats.unique)}
          {cell("Avg sentence length", fmt(stats.avgSentenceLen, 1))}
          {cell("Avg word length", fmt(stats.avgWordLen, 1))}
          {cell("Complex words", stats.complexWords)}
          {cell("Lexical diversity", fmt(stats.lexicalDiversity, 3))}
        </div>
      </Panel>
      <Panel title="Readability">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cell("Flesch Reading Ease", fmt(stats.flesch, 1))}
          {cell("Flesch-Kincaid Grade", fmt(stats.fkGrade, 1))}
          {cell("Gunning Fog Index", fmt(stats.gunningFog, 1))}
          {cell("Automated Readability Index", fmt(stats.ari, 1))}
        </div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">Flesch Reading Ease: 90-100 very easy, 60-70 plain English, 0-30 very difficult. Higher grade-level numbers mean more years of schooling needed.</p>
      </Panel>
    </div>
  );
}
