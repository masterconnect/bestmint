"use client";
import { useEffect, useState } from "react";
import { btnPrimary, Panel } from "@/components/ui/panel";

type Effect = "grayscale" | "sepia" | "invert" | "saturate";

export default function ImageGrayscale() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [effect, setEffect] = useState<Effect>("grayscale");
  const [sat, setSat] = useState(1);
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
      let filter = "none";
      if (effect === "grayscale") filter = "grayscale(1)";
      else if (effect === "sepia") filter = "sepia(1)";
      else if (effect === "invert") filter = "invert(1)";
      else if (effect === "saturate") filter = `saturate(${sat})`;
      ctx.filter = filter;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        setOutUrl((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(blob); });
      }, "image/png");
    })();
    return () => { cancelled = true; };
  }, [src, effect, sat]);

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Effect">
            <div className="flex flex-wrap gap-2">
              {(["grayscale", "sepia", "invert", "saturate"] as Effect[]).map((e) => (
                <button key={e} onClick={() => setEffect(e)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition capitalize ${effect === e ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15 text-[var(--color-accent)]" : "border-[var(--color-border)] bg-[var(--color-background)] hover:border-[var(--color-accent)]"}`}>
                  {e}
                </button>
              ))}
            </div>
            {effect === "saturate" && (
              <label className="block mt-3">
                <span className="block text-xs text-[var(--color-muted)] mb-1">Saturation ({sat.toFixed(2)}×)</span>
                <input type="range" min={0} max={2} step={0.05} value={sat} onChange={(e) => setSat(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
              </label>
            )}
          </Panel>
          <Panel title="Result" action={outUrl && <a href={outUrl} download={`${name}-${effect}.png`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
            {outUrl && <img src={outUrl} alt="Filtered" className="w-full rounded-md max-h-[600px] object-contain" />}
          </Panel>
        </>
      )}
    </div>
  );
}
