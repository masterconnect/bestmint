"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel } from "@/components/ui/panel";

export default function BorderRadiusGenerator() {
  const [tl, setTl] = useState(20);
  const [tr, setTr] = useState(20);
  const [br, setBr] = useState(20);
  const [bl, setBl] = useState(20);

  // elliptical second axes
  const [elliptical, setElliptical] = useState(false);
  const [tl2, setTl2] = useState(20);
  const [tr2, setTr2] = useState(20);
  const [br2, setBr2] = useState(20);
  const [bl2, setBl2] = useState(20);

  const radius = elliptical
    ? `${tl}px ${tr}px ${br}px ${bl}px / ${tl2}px ${tr2}px ${br2}px ${bl2}px`
    : `${tl}px ${tr}px ${br}px ${bl}px`;
  const css = `border-radius: ${radius};`;

  return (
    <div className="space-y-4">
      <Panel title="Preview" action={<CopyButton value={css} />}>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-10 flex items-center justify-center">
          <div
            className="h-48 w-72 bg-[var(--color-accent)]"
            style={{ borderRadius: radius }}
          />
        </div>
        <code className="block mt-3 text-xs font-mono break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2">{css}</code>
      </Panel>
      <Panel title="Corners">
        <label className="flex items-center gap-2 text-sm mb-4">
          <input type="checkbox" checked={elliptical} onChange={(e) => setElliptical(e.target.checked)} className="accent-[var(--color-accent)]" />
          Elliptical (separate horizontal & vertical radii)
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Top-left", val: tl, set: setTl, val2: tl2, set2: setTl2 },
            { label: "Top-right", val: tr, set: setTr, val2: tr2, set2: setTr2 },
            { label: "Bottom-right", val: br, set: setBr, val2: br2, set2: setBr2 },
            { label: "Bottom-left", val: bl, set: setBl, val2: bl2, set2: setBl2 },
          ].map((c) => (
            <div key={c.label} className="rounded-md border border-[var(--color-border)] p-3">
              <div className="text-xs font-medium mb-2">{c.label}</div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span>{elliptical ? "Horizontal" : "Radius"}</span><span className="font-mono text-[var(--color-muted)]">{c.val}px</span></div>
                <input type="range" min={0} max={200} value={c.val} onChange={(e) => c.set(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
              </div>
              {elliptical && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1"><span>Vertical</span><span className="font-mono text-[var(--color-muted)]">{c.val2}px</span></div>
                  <input type="range" min={0} max={200} value={c.val2} onChange={(e) => c.set2(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
