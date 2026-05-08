"use client";
import { useState } from "react";
import { btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

export default function SvgToPng() {
  const [svg, setSvg] = useState("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='#3b82f6'/></svg>");
  const [w, setW] = useState(512);
  const [h, setH] = useState(512);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function convert() {
    setError(null);
    try {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => {
        if (!b) { setError("Failed to create PNG."); return; }
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(b); });
      }, "image/png");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="SVG markup">
        <textarea value={svg} onChange={(e) => setSvg(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Output size">
        <div className="flex flex-wrap gap-3 items-end">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Width</span>
            <input type="number" min={1} value={w} onChange={(e) => setW(Number(e.target.value))} className={inputCls("w-32")} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Height</span>
            <input type="number" min={1} value={h} onChange={(e) => setH(Number(e.target.value))} className={inputCls("w-32")} />
          </label>
          <button onClick={convert} className={btnPrimary()}>Convert</button>
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </Panel>
      {outUrl && (
        <Panel title="PNG" action={<a href={outUrl} download="svg.png" className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
          <img src={outUrl} alt="PNG output" className="max-w-full rounded-md mx-auto" />
        </Panel>
      )}
    </div>
  );
}
