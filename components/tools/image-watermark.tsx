"use client";
import { useEffect, useState } from "react";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const POSITIONS = [
  ["TL", "Top Left"], ["TC", "Top Center"], ["TR", "Top Right"],
  ["ML", "Middle Left"], ["MC", "Middle Center"], ["MR", "Middle Right"],
  ["BL", "Bottom Left"], ["BC", "Bottom Center"], ["BR", "Bottom Right"],
] as const;

export default function ImageWatermark() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [text, setText] = useState("© BestMint");
  const [pos, setPos] = useState<typeof POSITIONS[number][0]>("BR");
  const [opacity, setOpacity] = useState(0.6);
  const [size, setSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [outUrl, setOutUrl] = useState<string | null>(null);

  function load(file: File) {
    if (!file.type.startsWith("image/")) return;
    setName(file.name.replace(/\.[^.]+$/, ""));
    const r = new FileReader();
    r.onload = () => setSrc(r.result as string);
    r.readAsDataURL(file);
  }

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    (async () => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = `bold ${size}px system-ui, sans-serif`;
      const m = ctx.measureText(text);
      const tw = m.width;
      const th = size;
      const margin = Math.max(16, size * 0.4);
      let x = margin, y = margin + th * 0.85;
      if (pos[0] === "M") y = canvas.height / 2 + th * 0.3;
      if (pos[0] === "B") y = canvas.height - margin;
      if (pos[1] === "C") x = (canvas.width - tw) / 2;
      if (pos[1] === "R") x = canvas.width - tw - margin;
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 6;
      ctx.fillText(text, x, y);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(blob); });
      }, "image/png");
    })();
    return () => { cancelled = true; };
  }, [src, text, pos, opacity, size, color]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Watermark">
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="block text-xs text-[var(--color-muted)] mb-1">Text</span>
                <input value={text} onChange={(e) => setText(e.target.value)} className={inputCls()} />
              </label>
              <label className="block">
                <span className="block text-xs text-[var(--color-muted)] mb-1">Color</span>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] cursor-pointer" />
              </label>
              <label className="block">
                <span className="block text-xs text-[var(--color-muted)] mb-1">Font size ({size}px)</span>
                <input type="range" min={12} max={200} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
              </label>
              <label className="block">
                <span className="block text-xs text-[var(--color-muted)] mb-1">Opacity ({Math.round(opacity * 100)}%)</span>
                <input type="range" min={0.05} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
              </label>
            </div>
            <div className="mt-3">
              <span className="block text-xs text-[var(--color-muted)] mb-1">Position</span>
              <div className="grid grid-cols-3 gap-1 max-w-xs">
                {POSITIONS.map(([k, label]) => (
                  <button key={k} onClick={() => setPos(k)} title={label}
                    className={`px-2 py-2 text-xs rounded-md border transition ${pos === k ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15" : "border-[var(--color-border)] bg-[var(--color-background)] hover:border-[var(--color-accent)]"}`}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
          </Panel>
          <Panel title="Preview" action={outUrl && <a href={outUrl} download={`${name}-watermarked.png`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
            {outUrl && <img src={outUrl} alt="Watermarked" className="w-full rounded-md max-h-[600px] object-contain" />}
          </Panel>
        </>
      )}
    </div>
  );
}
