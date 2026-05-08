"use client";
import { useMemo, useState } from "react";
import { Panel, textareaCls } from "@/components/ui/panel";
import { CopyButton } from "@/components/ui/copy-button";

const DEFAULTS: Record<string, string> = {
  "fill-opacity": "1",
  "stroke-opacity": "1",
  "stroke-width": "1",
  "stroke-linecap": "butt",
  "stroke-linejoin": "miter",
  "fill-rule": "nonzero",
  "opacity": "1",
};

function optimize(input: string) {
  let s = input;
  s = s.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<\?xml[\s\S]*?\?>/g, "");
  s = s.replace(/<!DOCTYPE[\s\S]*?>/gi, "");
  s = s.replace(/>\s+</g, "><");
  s = s.replace(/\s+/g, " ");
  s = s.replace(/(\d+\.\d{3,})/g, (m) => Number(m).toFixed(2));
  s = s.replace(/(-?\d*\.?\d+)e[+-]?\d+/gi, (m) => Number(m).toString());
  for (const [k, v] of Object.entries(DEFAULTS)) {
    s = s.replace(new RegExp(`\\s${k}="${v}"`, "g"), "");
  }
  s = s.replace(/\s+\/>/g, "/>");
  s = s.replace(/<g\s*>([\s\S]*?)<\/g>/g, "$1");
  return s.trim();
}

export default function SvgOptimizer() {
  const [input, setInput] = useState("");
  const out = useMemo(() => (input ? optimize(input) : ""), [input]);
  const orig = new Blob([input]).size;
  const optSize = new Blob([out]).size;

  return (
    <div className="space-y-4">
      <Panel title="Input SVG">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<svg>...</svg>" className={textareaCls()} />
      </Panel>
      {out && (
        <>
          <Panel title="Stats">
            <div className="text-sm flex flex-wrap gap-4">
              <span>Original: <span className="font-mono">{orig} B</span></span>
              <span>Optimized: <span className="font-mono">{optSize} B</span></span>
              {orig > 0 && (
                <span className="text-emerald-400">{Math.round((1 - optSize / orig) * 100)}% smaller</span>
              )}
            </div>
          </Panel>
          <Panel title="Optimized SVG" action={<CopyButton value={out} />}>
            <textarea readOnly value={out} className={textareaCls()} />
          </Panel>
          <Panel title="Preview">
            <div dangerouslySetInnerHTML={{ __html: out }} className="rounded-md border border-[var(--color-border)] p-4 bg-[var(--color-background)] flex items-center justify-center max-h-96 overflow-auto" />
          </Panel>
        </>
      )}
    </div>
  );
}
