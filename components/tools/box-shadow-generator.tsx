"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, inputCls, Panel } from "@/components/ui/panel";

interface Shadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  alpha: number;
  inset: boolean;
}

function hexToRgba(hex: string, alpha: number) {
  const m = hex.replace("#", "").match(/^([\da-f]{6}|[\da-f]{3})$/i);
  if (!m) return `rgba(0,0,0,${alpha})`;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function shadowCss(s: Shadow) {
  return `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${hexToRgba(s.color, s.alpha)}`;
}

const initial: Shadow = { x: 0, y: 10, blur: 30, spread: 0, color: "#000000", alpha: 0.25, inset: false };

export default function BoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([initial]);
  const [active, setActive] = useState(0);

  const css = shadows.map(shadowCss).join(", ");
  const fullCss = `box-shadow: ${css};`;

  const update = (patch: Partial<Shadow>) => {
    setShadows((arr) => arr.map((s, i) => (i === active ? { ...s, ...patch } : s)));
  };

  const cur = shadows[active];

  return (
    <div className="space-y-4">
      <Panel title="Preview" action={<CopyButton value={fullCss} />}>
        <div className="flex items-center justify-center py-12 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
          <div
            className="h-32 w-48 rounded-xl bg-[var(--color-surface)]"
            style={{ boxShadow: css }}
          />
        </div>
        <code className="block mt-3 text-xs font-mono break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2">{fullCss}</code>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Shadow layers">
          <div className="space-y-2">
            {shadows.map((s, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer ${i === active ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5" : "border-[var(--color-border)]"}`}
              >
                <div className="h-6 w-6 rounded border border-[var(--color-border)]" style={{ background: hexToRgba(s.color, s.alpha) }} />
                <code className="flex-1 text-xs font-mono truncate">{shadowCss(s)}</code>
                {shadows.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = shadows.filter((_, idx) => idx !== i);
                      setShadows(next);
                      setActive(Math.max(0, Math.min(active, next.length - 1)));
                    }}
                    className="text-[var(--color-muted)] hover:text-red-400 px-1"
                    aria-label="Remove"
                  >×</button>
                )}
              </div>
            ))}
          </div>
          <button className={btnGhost("text-xs mt-3")} onClick={() => { setShadows([...shadows, { ...initial }]); setActive(shadows.length); }}>
            + Add shadow
          </button>
        </Panel>
        <Panel title={`Edit shadow ${active + 1}`}>
          <div className="space-y-3">
            {[
              { k: "x" as const, label: "Offset X", min: -100, max: 100, unit: "px" },
              { k: "y" as const, label: "Offset Y", min: -100, max: 100, unit: "px" },
              { k: "blur" as const, label: "Blur", min: 0, max: 200, unit: "px" },
              { k: "spread" as const, label: "Spread", min: -100, max: 100, unit: "px" },
            ].map((f) => (
              <div key={f.k}>
                <div className="flex justify-between text-xs mb-1"><span>{f.label}</span><span className="font-mono text-[var(--color-muted)]">{cur[f.k]}{f.unit}</span></div>
                <input type="range" min={f.min} max={f.max} value={cur[f.k]} onChange={(e) => update({ [f.k]: Number(e.target.value) } as Partial<Shadow>)} className="w-full accent-[var(--color-accent)]" />
              </div>
            ))}
            <div>
              <div className="text-xs mb-1">Color</div>
              <div className="flex items-center gap-2">
                <input type="color" value={cur.color} onChange={(e) => update({ color: e.target.value })} className="h-10 w-12 rounded cursor-pointer" />
                <input value={cur.color} onChange={(e) => update({ color: e.target.value })} className={inputCls("font-mono")} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Alpha</span><span className="font-mono text-[var(--color-muted)]">{cur.alpha.toFixed(2)}</span></div>
              <input type="range" min={0} max={1} step={0.01} value={cur.alpha} onChange={(e) => update({ alpha: Number(e.target.value) })} className="w-full accent-[var(--color-accent)]" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={cur.inset} onChange={(e) => update({ inset: e.target.checked })} className="accent-[var(--color-accent)]" />
              Inset
            </label>
          </div>
        </Panel>
      </div>
    </div>
  );
}
