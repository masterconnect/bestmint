"use client";
import { useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

function hexToRgb(hex: string) {
  const m = hex.replace("#", "").match(/^([\da-f]{6}|[\da-f]{3})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)] as const;
}

function relLum([r, g, b]: readonly [number, number, number]) {
  const c = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function ratio(a: string, b: string) {
  const ra = hexToRgb(a), rb = hexToRgb(b);
  if (!ra || !rb) return 0;
  const la = relLum(ra), lb = relLum(rb);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export default function ContrastChecker() {
  const [fg, setFg] = useState("#ededee");
  const [bg, setBg] = useState("#0a0a0b");
  const r = ratio(fg, bg);
  const passes = {
    aaNormal: r >= 4.5,
    aaLarge: r >= 3,
    aaaNormal: r >= 7,
    aaaLarge: r >= 4.5,
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Colors">
        <div className="space-y-3">
          <Field label="Foreground" value={fg} onChange={setFg} />
          <Field label="Background" value={bg} onChange={setBg} />
        </div>
        <div className="mt-6 rounded-lg border border-[var(--color-border)] p-6 text-center" style={{ background: bg, color: fg }}>
          <p className="text-2xl font-semibold">Large text 24px</p>
          <p className="text-base mt-2">Body text 16px — quick brown fox jumps.</p>
        </div>
      </Panel>
      <Panel title="Result">
        <div className="text-center">
          <div className="text-6xl font-bold tabular-nums">{r.toFixed(2)}</div>
          <p className="text-sm text-[var(--color-muted)] mt-1">contrast ratio</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Badge label="AA — normal" pass={passes.aaNormal} required="4.5:1" />
          <Badge label="AA — large" pass={passes.aaLarge} required="3:1" />
          <Badge label="AAA — normal" pass={passes.aaaNormal} required="7:1" />
          <Badge label="AAA — large" pass={passes.aaaLarge} required="4.5:1" />
        </div>
      </Panel>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>
      <div className="flex gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-12 rounded cursor-pointer" />
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls("font-mono")} />
      </div>
    </label>
  );
}

function Badge({ label, pass, required }: { label: string; pass: boolean; required: string }) {
  return (
    <div className={`rounded-lg border p-3 text-sm ${pass ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-red-500/40 bg-red-500/10 text-red-300"}`}>
      <div className="font-medium">{label}</div>
      <div className="text-xs opacity-80">{pass ? "Pass" : "Fail"} · ≥ {required}</div>
    </div>
  );
}
