"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

const STOP = new Set(["a", "an", "the", "of", "in", "on", "at", "to", "for", "and", "or"]);

export default function AcronymGenerator() {
  const [phrase, setPhrase] = useState("Hypertext Markup Language");
  const [skipStop, setSkipStop] = useState(true);
  const [withPeriods, setWithPeriods] = useState(false);
  const [lowercase, setLowercase] = useState(false);

  const acronym = useMemo(() => {
    const words = phrase.split(/\s+/).filter(Boolean);
    const filtered = skipStop ? words.filter((w) => !STOP.has(w.toLowerCase())) : words;
    let letters = filtered.map((w) => w[0] || "").join(withPeriods ? "." : "");
    if (withPeriods && letters) letters += ".";
    return lowercase ? letters.toLowerCase() : letters.toUpperCase();
  }, [phrase, skipStop, withPeriods, lowercase]);

  return (
    <div className="space-y-4">
      <Panel title="Phrase">
        <textarea value={phrase} onChange={(e) => setPhrase(e.target.value)} className={textareaCls("min-h-[100px]")} />
      </Panel>
      <Panel title="Options">
        <div className="grid sm:grid-cols-3 gap-2">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={skipStop} onChange={(e) => setSkipStop(e.target.checked)} className="accent-[var(--color-accent)]" />Skip stopwords (a, an, the…)</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={withPeriods} onChange={(e) => setWithPeriods(e.target.checked)} className="accent-[var(--color-accent)]" />Insert periods (U.S.A.)</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="accent-[var(--color-accent)]" />Lowercase</label>
        </div>
      </Panel>
      <Panel title="Acronym" action={<CopyButton value={acronym} />}>
        <div className="text-3xl font-bold tracking-wide">{acronym}</div>
      </Panel>
    </div>
  );
}
