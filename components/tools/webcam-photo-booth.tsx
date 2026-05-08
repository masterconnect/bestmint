"use client";
import { useEffect, useRef, useState } from "react";
import { btnPrimary, btnGhost, Panel } from "@/components/ui/panel";

type Filter = "none" | "grayscale" | "sepia" | "invert";

const FILTERS: Record<Filter, string> = {
  none: "none",
  grayscale: "grayscale(1)",
  sepia: "sepia(1)",
  invert: "invert(1)",
};

export default function WebcamPhotoBooth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [filter, setFilter] = useState<Filter>("none");
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<{ url: string; t: number }[]>([]);

  async function start() {
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Camera access denied.");
    }
  }

  function stop() {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  }

  useEffect(() => () => { stream?.getTracks().forEach((t) => t.stop()); }, [stream]);

  function snap() {
    const v = videoRef.current;
    if (!v) return;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = FILTERS[filter];
    ctx.drawImage(v, 0, 0);
    canvas.toBlob((b) => {
      if (!b) return;
      const url = URL.createObjectURL(b);
      setPhotos((p) => [{ url, t: Date.now() }, ...p].slice(0, 12));
    }, "image/png");
  }

  return (
    <div className="space-y-4">
      <Panel title="Camera"
        action={
          stream
            ? <button onClick={stop} className={btnGhost("text-xs px-2.5 py-1")}>Stop</button>
            : <button onClick={start} className={btnPrimary("text-xs px-2.5 py-1")}>Enable camera</button>
        }
      >
        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
        <video ref={videoRef} playsInline muted className="w-full rounded-md bg-black aspect-video object-cover" style={{ filter: FILTERS[filter] }} />
      </Panel>
      <Panel title="Filter">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(FILTERS) as Filter[]).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm rounded-md border transition capitalize ${filter === f ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15 text-[var(--color-accent)]" : "border-[var(--color-border)] bg-[var(--color-background)] hover:border-[var(--color-accent)]"}`}>
              {f}
            </button>
          ))}
          <button onClick={snap} disabled={!stream} className={btnPrimary("ml-auto")}>📸 Capture</button>
        </div>
      </Panel>
      {photos.length > 0 && (
        <Panel title={`Photos (${photos.length})`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((p) => (
              <a key={p.t} href={p.url} download={`photo-${p.t}.png`}
                className="rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] overflow-hidden transition flex flex-col">
                <img src={p.url} alt="" className="w-full block" />
                <span className="text-center text-xs text-[var(--color-muted)] py-1.5">Download</span>
              </a>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}
