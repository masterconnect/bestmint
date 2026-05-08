"use client";
import { useEffect, useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

export default function ImageNoise() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [intensity, setIntensity] = useState(30);
  const [mono, setMono] = useState(false);
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
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0);
      const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = id.data;
      const amp = intensity;
      for (let i = 0; i < d.length; i += 4) {
        if (mono) {
          const n = (Math.random() - 0.5) * 2 * amp;
          d[i] = Math.max(0, Math.min(255, d[i] + n));
          d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
          d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
        } else {
          d[i] = Math.max(0, Math.min(255, d[i] + (Math.random() - 0.5) * 2 * amp));
          d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + (Math.random() - 0.5) * 2 * amp));
          d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + (Math.random() - 0.5) * 2 * amp));
        }
      }
      ctx.putImageData(id, 0, 0);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(blob); });
      }, "image/png");
    })();
    return () => { cancelled = true; };
  }, [src, intensity, mono]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Noise">
            <label className="block">
              <span className="block text-xs text-[var(--color-muted)] mb-1">Intensity ({intensity})</span>
              <input type="range" min={0} max={120} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
            </label>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={mono} onChange={(e) => setMono(e.target.checked)} className="accent-[var(--color-accent)]" />
              Monochrome (film-grain look)
            </label>
          </Panel>
          <Panel title="Result" action={outUrl && <a href={outUrl} download={`${name}-noise.png`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
            {outUrl && <img src={outUrl} alt="Noisy" className="w-full rounded-md max-h-[600px] object-contain" />}
          </Panel>
        </>
      )}
    </div>
  );
}
