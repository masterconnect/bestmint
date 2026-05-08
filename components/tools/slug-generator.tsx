"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

function slugify(s: string, sep: string) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, sep)
    .replace(new RegExp(`^${sep}+|${sep}+$`, "g"), "")
    .replace(new RegExp(`${sep}+`, "g"), sep);
}

export default function SlugGenerator() {
  const [input, setInput] = useState("How to Build a Comprehensive Online Tools Website (in 2026!)");
  const [sep, setSep] = useState("-");
  const slug = slugify(input, sep);
  return (
    <div className="space-y-4">
      <Panel title="Title">
        <input value={input} onChange={(e) => setInput(e.target.value)} className={inputCls()} />
        <div className="mt-3 flex items-center gap-3 text-sm">
          <span className="text-[var(--color-muted)]">Separator</span>
          {["-", "_"].map((s) => (
            <label key={s} className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" checked={sep === s} onChange={() => setSep(s)} className="accent-[var(--color-accent)]" />
              <code>{s}</code>
            </label>
          ))}
        </div>
      </Panel>
      <Panel title="Slug" action={<CopyButton value={slug} />}>
        <code className="block font-mono text-lg break-all">{slug}</code>
      </Panel>
    </div>
  );
}
