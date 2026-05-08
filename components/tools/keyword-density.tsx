"use client";
import { useMemo, useState } from "react";
import { btnGhost, Panel, textareaCls } from "@/components/ui/panel";

const STOPWORDS = new Set([
  "a","an","and","are","as","at","be","but","by","for","from","has","have","he","her","his","i","if","in","is","it","its","of","on","or","our","she","so","that","the","their","them","then","there","they","this","to","was","we","were","what","when","which","who","will","with","you","your","yours","me","my","mine","us","do","does","did","not","no","yes","can","could","should","would","may","might","must","shall","also","just","than","too","very","up","down","out","over","under","again","once","here","how","why","all","any","each","few","more","most","other","some","such","only","own","same","s","t","don","now"
]);

interface Row { term: string; count: number; density: number; }

function tokenize(text: string, removeStop: boolean): string[] {
  const words = (text.toLowerCase().match(/[a-z0-9'"]+/g) || []).map((w) => w.replace(/^['"]+|['"]+$/g, ""));
  return removeStop ? words.filter((w) => w && !STOPWORDS.has(w)) : words.filter(Boolean);
}

function ngrams(words: string[], n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i + n <= words.length; i++) out.push(words.slice(i, i + n).join(" "));
  return out;
}

function tally(arr: string[]): Row[] {
  const m = new Map<string, number>();
  for (const t of arr) m.set(t, (m.get(t) || 0) + 1);
  const total = arr.length || 1;
  return Array.from(m, ([term, count]) => ({ term, count, density: (count / total) * 100 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);
}

export default function KeywordDensity() {
  const [text, setText] = useState("");
  const [tab, setTab] = useState<"1" | "2" | "3">("1");
  const [removeStop, setRemoveStop] = useState(true);

  const rows = useMemo(() => {
    const words = tokenize(text, removeStop);
    if (tab === "1") return tally(words);
    if (tab === "2") return tally(ngrams(words, 2));
    return tally(ngrams(words, 3));
  }, [text, tab, removeStop]);

  const totalWords = useMemo(() => tokenize(text, false).length, [text]);

  return (
    <div className="space-y-4">
      <Panel title="Text">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste an article, page copy or essay…" className={textareaCls("min-h-[160px]")} />
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <div className="text-[var(--color-muted)]">{totalWords.toLocaleString()} words</div>
          <label className="inline-flex items-center gap-2 text-xs">
            <input type="checkbox" checked={removeStop} onChange={(e) => setRemoveStop(e.target.checked)} />
            Filter stopwords
          </label>
        </div>
      </Panel>
      <Panel title="Frequencies (top 50)">
        <div className="flex gap-2 mb-3">
          {(["1","2","3"] as const).map((k) => (
            <button key={k} onClick={() => setTab(k)} className={btnGhost(`text-xs ${tab === k ? "border-[var(--color-accent)] text-[var(--color-accent)]" : ""}`)}>{k === "1" ? "Single words" : k === "2" ? "2-grams" : "3-grams"}</button>
          ))}
        </div>
        {rows.length === 0 ? (
          <div className="text-sm text-[var(--color-muted)]">Paste some text above to see keyword frequencies.</div>
        ) : (
          <div className="overflow-auto rounded-md border border-[var(--color-border)]">
            <table className="w-full text-sm font-mono">
              <thead className="bg-[var(--color-background)] text-[var(--color-muted)]">
                <tr>
                  <th className="text-left px-3 py-2">#</th>
                  <th className="text-left px-3 py-2">Term</th>
                  <th className="text-right px-3 py-2">Count</th>
                  <th className="text-right px-3 py-2">Density</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.term} className="border-t border-[var(--color-border)]">
                    <td className="px-3 py-1.5 text-[var(--color-muted)]">{i + 1}</td>
                    <td className="px-3 py-1.5">{r.term}</td>
                    <td className="px-3 py-1.5 text-right">{r.count}</td>
                    <td className="px-3 py-1.5 text-right">{r.density.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
