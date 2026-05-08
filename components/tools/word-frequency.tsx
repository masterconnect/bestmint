"use client";
import { useMemo, useState } from "react";
import { Panel, textareaCls } from "@/components/ui/panel";

const STOPWORDS = new Set(["a","an","the","and","or","but","so","yet","for","nor","of","in","on","at","to","from","with","by","as","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","must","can","this","that","these","those","i","you","he","she","it","we","they","them","us","him","her","my","your","his","its","our","their","me","mine","yours","hers","ours","theirs","what","which","who","whom","whose","when","where","why","how","not","no","if","then","than","too","very","just","also","into","over","under","up","down","out","off","about","through"]);

export default function WordFrequency() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. The dog barks. The fox runs and the dog chases.");
  const [filterStop, setFilterStop] = useState(true);

  const rows = useMemo(() => {
    const words = (text.toLowerCase().match(/[a-z']+/g) || []).filter((w) => !filterStop || !STOPWORDS.has(w));
    const total = words.length;
    const map = new Map<string, number>();
    for (const w of words) map.set(w, (map.get(w) || 0) + 1);
    const arr = Array.from(map.entries()).map(([w, c]) => ({ word: w, count: c, density: total ? (c / total) * 100 : 0 }));
    arr.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
    return arr;
  }, [text, filterStop]);

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Options">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={filterStop} onChange={(e) => setFilterStop(e.target.checked)} className="accent-[var(--color-accent)]" />
          Filter common stopwords
        </label>
      </Panel>
      <Panel title={`Frequencies (${rows.length} unique)`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-muted)] border-b border-[var(--color-border)]">
                <th className="py-2 pr-4">Word</th>
                <th className="py-2 pr-4 text-right">Count</th>
                <th className="py-2 pr-4 text-right">Density</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 200).map((r) => (
                <tr key={r.word} className="border-b border-[var(--color-border)]/50">
                  <td className="py-1.5 pr-4 font-mono">{r.word}</td>
                  <td className="py-1.5 pr-4 text-right tabular-nums">{r.count}</td>
                  <td className="py-1.5 pr-4 text-right tabular-nums">{r.density.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > 200 && <p className="mt-2 text-xs text-[var(--color-muted)]">Showing first 200 of {rows.length} unique words.</p>}
        </div>
      </Panel>
    </div>
  );
}
