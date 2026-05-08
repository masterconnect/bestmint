"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, inputCls, Panel } from "@/components/ui/panel";

const PRESETS: Record<string, string> = {
  "circle": "circle(50% at 50% 50%)",
  "ellipse": "ellipse(40% 50% at 50% 50%)",
  "triangle": "polygon(50% 0%, 0% 100%, 100% 100%)",
  "arrow": "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
  "rhombus": "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  "pentagon": "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  "hexagon": "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  "star": "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
};

export default function ClipPathGenerator() {
  const [preset, setPreset] = useState("hexagon");
  const [custom, setCustom] = useState(false);
  const [customClip, setCustomClip] = useState("polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)");

  const clip = useMemo(() => (custom ? customClip : PRESETS[preset]), [custom, customClip, preset]);
  const css = `clip-path: ${clip};`;

  return (
    <div className="space-y-4">
      <Panel title="Preview" action={<CopyButton value={css} />}>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-10 flex items-center justify-center">
          <div
            className="h-56 w-56 bg-gradient-to-br from-[var(--color-accent)] to-pink-500"
            style={{ clipPath: clip }}
          />
        </div>
        <code className="block mt-3 text-xs font-mono break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2">{css}</code>
      </Panel>
      <Panel title="Shape">
        <div className="flex flex-wrap gap-2 mb-3">
          {Object.keys(PRESETS).map((k) => (
            <button
              key={k}
              onClick={() => { setPreset(k); setCustom(false); }}
              className={btnGhost(`text-xs capitalize ${!custom && preset === k ? "ring-2 ring-[var(--color-accent)]" : ""}`)}
            >
              {k}
            </button>
          ))}
          <button
            onClick={() => setCustom(true)}
            className={btnGhost(`text-xs ${custom ? "ring-2 ring-[var(--color-accent)]" : ""}`)}
          >
            custom
          </button>
        </div>
        {custom && (
          <div>
            <div className="text-xs text-[var(--color-muted)] mb-1">Edit clip-path value:</div>
            <input value={customClip} onChange={(e) => setCustomClip(e.target.value)} className={inputCls("font-mono")} />
            <p className="mt-2 text-xs text-[var(--color-muted)]">Try <code>polygon(...)</code>, <code>circle(...)</code>, <code>ellipse(...)</code> or <code>inset(...)</code>.</p>
          </div>
        )}
      </Panel>
    </div>
  );
}
