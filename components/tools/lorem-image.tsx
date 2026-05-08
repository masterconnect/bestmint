"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, inputCls, Panel } from "@/components/ui/panel";

export default function LoremImage() {
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [seed, setSeed] = useState("bestmint");

  const url = useMemo(() => {
    const params: string[] = [];
    if (grayscale) params.push("grayscale");
    if (blur > 0) params.push(`blur=${blur}`);
    const q = params.length ? `?${params.join("&")}` : "";
    const seedPart = seed ? `seed/${encodeURIComponent(seed)}/` : "";
    return `https://picsum.photos/${seedPart}${w}/${h}${q}`;
  }, [w, h, grayscale, blur, seed]);

  const variants = [
    { label: "Square 600×600", v: `https://picsum.photos/seed/${encodeURIComponent(seed || "x")}/600/600` },
    { label: "Wide 1200×400", v: `https://picsum.photos/seed/${encodeURIComponent(seed || "x")}/1200/400` },
    { label: "Portrait 600×900", v: `https://picsum.photos/seed/${encodeURIComponent(seed || "x")}/600/900` },
  ];

  function newSeed() {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    setSeed(a[0].toString(36));
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Options">
        <div className="grid grid-cols-2 gap-3">
          <Lbl label="Width"><input type="number" min={1} max={5000} value={w} onChange={(e) => setW(Number(e.target.value) || 1)} className={inputCls()} /></Lbl>
          <Lbl label="Height"><input type="number" min={1} max={5000} value={h} onChange={(e) => setH(Number(e.target.value) || 1)} className={inputCls()} /></Lbl>
          <Lbl label="Seed"><input value={seed} onChange={(e) => setSeed(e.target.value)} className={inputCls()} placeholder="leave blank for random" /></Lbl>
          <div className="flex items-end"><button onClick={newSeed} className={btnGhost("w-full")}>Random seed</button></div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} className="accent-[var(--color-accent)]" />
            Grayscale
          </label>
          <label className="flex items-center gap-2 flex-1">
            <span className="text-[var(--color-muted)]">Blur</span>
            <input type="range" min={0} max={10} value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="flex-1 accent-[var(--color-accent)]" />
            <span className="font-mono w-6 text-right">{blur}</span>
          </label>
        </div>
      </Panel>
      <Panel title="URL" action={<CopyButton value={url} />}>
        <code className="block font-mono text-xs break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2">{url}</code>
        <div className="mt-3 rounded-md overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Lorem placeholder" className="w-full h-auto block" />
        </div>
        <div className="mt-3 space-y-2">
          {variants.map((v) => (
            <div key={v.label} className="flex items-center gap-2 text-xs">
              <span className="text-[var(--color-muted)] w-32 shrink-0">{v.label}</span>
              <code className="flex-1 break-all font-mono">{v.v}</code>
              <CopyButton value={v.v} />
            </div>
          ))}
        </div>
        <a href={url} target="_blank" rel="noreferrer" className={btnPrimary("mt-3 text-xs")}>Open in new tab</a>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>
      {children}
    </label>
  );
}
