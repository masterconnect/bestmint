"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

export default function TextShadowGenerator() {
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [blur, setBlur] = useState(8);
  const [color, setColor] = useState("#000000");
  const [alpha, setAlpha] = useState(0.5);
  const [textColor, setTextColor] = useState("#ffffff");
  const [text, setText] = useState("Hello world");

  function rgba(hex: string, a: number) {
    const m = hex.replace("#", "").match(/^([\da-f]{6})$/i);
    if (!m) return `rgba(0,0,0,${a})`;
    const h = m[1];
    return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${a})`;
  }

  const shadow = `${x}px ${y}px ${blur}px ${rgba(color, alpha)}`;
  const css = `text-shadow: ${shadow};`;

  return (
    <div className="space-y-4">
      <Panel title="Preview" action={<CopyButton value={css} />}>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-10 flex items-center justify-center">
          <span style={{ color: textColor, textShadow: shadow, fontSize: 64, fontWeight: 700 }}>{text || "Preview"}</span>
        </div>
        <code className="block mt-3 text-xs font-mono break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2">{css}</code>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Shadow">
          <div className="space-y-3">
            {[
              { k: "x", label: "Offset X", min: -50, max: 50, val: x, set: setX },
              { k: "y", label: "Offset Y", min: -50, max: 50, val: y, set: setY },
              { k: "blur", label: "Blur", min: 0, max: 50, val: blur, set: setBlur },
            ].map((f) => (
              <div key={f.k}>
                <div className="flex justify-between text-xs mb-1"><span>{f.label}</span><span className="font-mono text-[var(--color-muted)]">{f.val}px</span></div>
                <input type="range" min={f.min} max={f.max} value={f.val} onChange={(e) => f.set(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
              </div>
            ))}
            <div>
              <div className="text-xs mb-1">Shadow color</div>
              <div className="flex items-center gap-2">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-12 rounded cursor-pointer" />
                <input value={color} onChange={(e) => setColor(e.target.value)} className={inputCls("font-mono")} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Alpha</span><span className="font-mono text-[var(--color-muted)]">{alpha.toFixed(2)}</span></div>
              <input type="range" min={0} max={1} step={0.01} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
            </div>
          </div>
        </Panel>
        <Panel title="Text">
          <div className="space-y-3">
            <div>
              <div className="text-xs mb-1">Sample text</div>
              <input value={text} onChange={(e) => setText(e.target.value)} className={inputCls("")} />
            </div>
            <div>
              <div className="text-xs mb-1">Text color</div>
              <div className="flex items-center gap-2">
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-10 w-12 rounded cursor-pointer" />
                <input value={textColor} onChange={(e) => setTextColor(e.target.value)} className={inputCls("font-mono")} />
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
