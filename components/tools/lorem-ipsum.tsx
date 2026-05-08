"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

const WORDS = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum"
).split(" ");

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function makeSentence(min = 6, max = 14) {
  const len = min + Math.floor(Math.random() * (max - min));
  const words = Array.from({ length: len }, pickWord);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function makeParagraph(sentenceCount = 5) {
  return Array.from({ length: sentenceCount }, () => makeSentence()).join(" ");
}

export default function LoremIpsum() {
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [classic, setClassic] = useState(true);
  const [seed, setSeed] = useState(0);

  const output = useMemo(() => {
    void seed;
    if (unit === "words") {
      return Array.from({ length: count }, pickWord).join(" ") + ".";
    }
    if (unit === "sentences") {
      return Array.from({ length: count }, () => makeSentence()).join(" ");
    }
    const paragraphs = Array.from({ length: count }, (_, i) =>
      classic && i === 0
        ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + makeParagraph(4)
        : makeParagraph(5),
    );
    return paragraphs.join("\n\n");
  }, [unit, count, classic, seed]);

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Unit</span>
            <select value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)} className={inputCls()}>
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">How many</span>
            <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
          <label className="flex items-end gap-2 pb-1">
            <input type="checkbox" checked={classic} onChange={(e) => setClassic(e.target.checked)} className="accent-[var(--color-accent)]" />
            <span className="text-sm">Start with “Lorem ipsum…”</span>
          </label>
        </div>
        <div className="mt-3 flex gap-2">
          <button className={btnPrimary()} onClick={() => setSeed((s) => s + 1)}>Generate</button>
          <CopyButton value={output} className="px-3 py-2" />
        </div>
      </Panel>
      <Panel title="Output">
        <textarea readOnly value={output} className={textareaCls("min-h-[260px]")} />
      </Panel>
    </div>
  );
}
