"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

function words(s: string) {
  return s
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
}

const transforms: { label: string; fn: (s: string) => string }[] = [
  { label: "UPPERCASE", fn: (s) => s.toUpperCase() },
  { label: "lowercase", fn: (s) => s.toLowerCase() },
  { label: "Title Case", fn: (s) => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()) },
  { label: "Sentence case", fn: (s) => s.toLowerCase().replace(/(^|\.\s+|\?\s+|!\s+)([a-z])/g, (_, p, c) => p + c.toUpperCase()) },
  { label: "camelCase", fn: (s) => words(s).map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join("") },
  { label: "PascalCase", fn: (s) => words(s).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join("") },
  { label: "snake_case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("_") },
  { label: "CONSTANT_CASE", fn: (s) => words(s).map((w) => w.toUpperCase()).join("_") },
  { label: "kebab-case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("-") },
];

export default function CaseConverter() {
  const [input, setInput] = useState("Hello World — case converter for the modern web!");
  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[120px]")} />
      </Panel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {transforms.map((t) => {
          const out = t.fn(input);
          return (
            <div key={t.label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--color-muted)]">{t.label}</span>
                <CopyButton value={out} />
              </div>
              <div className="mt-2 font-mono text-sm break-all">{out}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
