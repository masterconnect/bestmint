"use client";
import { useRef, useState } from "react";
import { btnGhost, btnPrimary, Panel } from "@/components/ui/panel";

export default function ImageConverter() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [format, setFormat] = useState<"image/png" | "image/jpeg" | "image/webp">("image/webp");
  const [quality, setQuality] = useState(0.9);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [origSize, setOrigSize] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function loadFile(file: File) {
    setOrigSize(file.size);
    const ext = file.name.split(".").pop() || "";
    setName(file.name.replace(new RegExp("\\." + ext + "$"), ""));
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result as string);
    reader.readAsDataURL(file);
    setOutUrl(null);
  }

  async function convert() {
    if (!src) return;
    const img = new Image();
    img.src = src;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    if (format === "image/jpeg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      setOutSize(blob.size);
      setOutUrl(URL.createObjectURL(blob));
    }, format, quality);
  }

  const ext = format.split("/")[1];

  return (
    <div className="space-y-4">
      <Panel title="Source">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer"
        />
      </Panel>

      {src && (
        <>
          <Panel title="Settings">
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="block">
                <span className="block text-xs text-[var(--color-muted)] mb-1">Output format</span>
                <select value={format} onChange={(e) => setFormat(e.target.value as typeof format)} className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm">
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/webp">WEBP</option>
                </select>
              </label>
              {format !== "image/png" && (
                <label className="block">
                  <span className="block text-xs text-[var(--color-muted)] mb-1">Quality ({Math.round(quality * 100)})</span>
                  <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
                </label>
              )}
              <div className="flex items-end">
                <button onClick={convert} className={btnPrimary()}>Convert</button>
              </div>
            </div>
          </Panel>
          <div className="grid lg:grid-cols-2 gap-4">
            <Panel title={`Original (${(origSize / 1024).toFixed(1)} KB)`}>
              <img src={src} alt="Original" className="w-full rounded-md max-h-96 object-contain bg-checker" />
            </Panel>
            <Panel
              title={outUrl ? `Converted (${(outSize / 1024).toFixed(1)} KB)` : "Converted"}
              action={
                outUrl && (
                  <a href={outUrl} download={`${name}.${ext}`} className={btnPrimary("text-xs px-2.5 py-1")}>Download</a>
                )
              }
            >
              {outUrl ? (
                <img src={outUrl} alt="Converted" className="w-full rounded-md max-h-96 object-contain" />
              ) : (
                <p className="text-sm text-[var(--color-muted)]">Convert to preview the result.</p>
              )}
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}
