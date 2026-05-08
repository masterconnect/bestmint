"use client";
import { useEffect, useRef, useState } from "react";
import { btnPrimary, btnGhost, Panel } from "@/components/ui/panel";

type Rect = { x: number; y: number; w: number; h: number };

export default function ImageCropper() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [imgSize, setImgSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [rect, setRect] = useState<Rect>({ x: 50, y: 50, w: 200, h: 200 });
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<"image/png" | "image/jpeg">("image/png");
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ mode: string; sx: number; sy: number; sr: Rect } | null>(null);

  function load(file: File) {
    if (!file.type.startsWith("image/")) return;
    setName(file.name.replace(/\.[^.]+$/, ""));
    const r = new FileReader();
    r.onload = async () => {
      const dataUrl = r.result as string;
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
      setRect({
        x: Math.round(img.naturalWidth * 0.1),
        y: Math.round(img.naturalHeight * 0.1),
        w: Math.round(img.naturalWidth * 0.8),
        h: Math.round(img.naturalHeight * 0.8),
      });
      setSrc(dataUrl);
      setOutUrl(null);
    };
    r.readAsDataURL(file);
  }

  function getScale() {
    const el = containerRef.current;
    if (!el || !imgSize.w) return 1;
    return el.clientWidth / imgSize.w;
  }

  function startDrag(e: React.MouseEvent, mode: string) {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = { mode, sx: e.clientX, sy: e.clientY, sr: { ...rect } };
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragRef.current) return;
      const scale = getScale();
      const dx = (e.clientX - dragRef.current.sx) / scale;
      const dy = (e.clientY - dragRef.current.sy) / scale;
      const sr = dragRef.current.sr;
      let nr = { ...sr };
      const m = dragRef.current.mode;
      if (m === "move") {
        nr.x = Math.max(0, Math.min(imgSize.w - sr.w, sr.x + dx));
        nr.y = Math.max(0, Math.min(imgSize.h - sr.h, sr.y + dy));
      } else {
        if (m.includes("e")) nr.w = Math.max(10, Math.min(imgSize.w - sr.x, sr.w + dx));
        if (m.includes("s")) nr.h = Math.max(10, Math.min(imgSize.h - sr.y, sr.h + dy));
        if (m.includes("w")) {
          const nx = Math.max(0, Math.min(sr.x + sr.w - 10, sr.x + dx));
          nr.w = sr.w + (sr.x - nx);
          nr.x = nx;
        }
        if (m.includes("n")) {
          const ny = Math.max(0, Math.min(sr.y + sr.h - 10, sr.y + dy));
          nr.h = sr.h + (sr.y - ny);
          nr.y = ny;
        }
      }
      setRect(nr);
    }
    function onUp() { dragRef.current = null; }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [imgSize.w, imgSize.h]);

  async function crop() {
    if (!src) return;
    const img = new Image();
    img.src = src;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(rect.w);
    canvas.height = Math.round(rect.h);
    const ctx = canvas.getContext("2d")!;
    if (format === "image/jpeg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h, 0, 0, rect.w, rect.h);
    canvas.toBlob((blob) => {
      if (!blob) return;
      setOutUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob); });
    }, format, 0.92);
  }

  const scale = imgSize.w ? 1 : 1; // visual handles scale via percentage
  const handles = [
    ["nw", "top-0 left-0 cursor-nwse-resize"],
    ["ne", "top-0 right-0 cursor-nesw-resize"],
    ["sw", "bottom-0 left-0 cursor-nesw-resize"],
    ["se", "bottom-0 right-0 cursor-nwse-resize"],
    ["n", "top-0 left-1/2 -translate-x-1/2 cursor-ns-resize"],
    ["s", "bottom-0 left-1/2 -translate-x-1/2 cursor-ns-resize"],
    ["w", "top-1/2 left-0 -translate-y-1/2 cursor-ew-resize"],
    ["e", "top-1/2 right-0 -translate-y-1/2 cursor-ew-resize"],
  ] as const;

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
      </Panel>
      {src && (
        <>
          <Panel title="Drag to crop">
            <div ref={containerRef} className="relative w-full select-none" style={{ touchAction: "none" }}>
              <img src={src} alt="Source" className="w-full block rounded-md pointer-events-none" />
              <div
                onMouseDown={(e) => startDrag(e, "move")}
                className="absolute border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/15 cursor-move"
                style={{
                  left: `${(rect.x / imgSize.w) * 100}%`,
                  top: `${(rect.y / imgSize.h) * 100}%`,
                  width: `${(rect.w / imgSize.w) * 100}%`,
                  height: `${(rect.h / imgSize.h) * 100}%`,
                }}
              >
                {handles.map(([m, cls]) => (
                  <div
                    key={m}
                    onMouseDown={(e) => startDrag(e, m)}
                    className={`absolute w-3 h-3 -m-1.5 bg-[var(--color-accent)] border border-white ${cls}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <select value={format} onChange={(e) => setFormat(e.target.value as typeof format)} className="text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5">
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
              </select>
              <button onClick={crop} className={btnPrimary()}>Crop</button>
              <button onClick={() => setRect({ x: 0, y: 0, w: imgSize.w, h: imgSize.h })} className={btnGhost()}>Reset</button>
              <span className="text-xs text-[var(--color-muted)]">
                {Math.round(rect.w)} × {Math.round(rect.h)} from {imgSize.w} × {imgSize.h}
              </span>
            </div>
          </Panel>
          {outUrl && (
            <Panel title="Cropped" action={<a href={outUrl} download={`${name}-cropped.${format === "image/png" ? "png" : "jpg"}`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>}>
              <img src={outUrl} alt="Cropped" className="max-w-full rounded-md" />
            </Panel>
          )}
        </>
      )}
    </div>
  );
}
