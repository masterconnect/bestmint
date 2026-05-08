"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

export default function QrGenerator() {
  const [value, setValue] = useState("https://bestmint.com");
  const [size, setSize] = useState(320);
  const [ec, setEc] = useState<"L" | "M" | "Q" | "H">("M");
  const [dataUrl, setDataUrl] = useState("");
  const [svg, setSvg] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!value || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, { width: size, errorCorrectionLevel: ec, margin: 2 }, () => {
      if (canvasRef.current) setDataUrl(canvasRef.current.toDataURL("image/png"));
    });
    QRCode.toString(value, { type: "svg", errorCorrectionLevel: ec, margin: 2 }, (_err, str) => setSvg(str));
  }, [value, size, ec]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Content">
        <textarea value={value} onChange={(e) => setValue(e.target.value)} className={textareaCls("min-h-[120px]")} placeholder="URL, text, or vCard…" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Size (px)</span>
            <input type="number" min={64} max={1024} step={8} value={size} onChange={(e) => setSize(Number(e.target.value))} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Error correction</span>
            <select value={ec} onChange={(e) => setEc(e.target.value as typeof ec)} className={inputCls()}>
              <option value="L">L — Low (~7%)</option>
              <option value="M">M — Medium (~15%)</option>
              <option value="Q">Q — Quartile (~25%)</option>
              <option value="H">H — High (~30%)</option>
            </select>
          </label>
        </div>
      </Panel>
      <Panel
        title="QR code"
        action={
          <div className="flex gap-2">
            {dataUrl && <a href={dataUrl} download="qr.png" className={btnPrimary("text-xs px-2.5 py-1")}>PNG</a>}
            {svg && <a href={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} download="qr.svg" className={btnPrimary("text-xs px-2.5 py-1")}>SVG</a>}
          </div>
        }
      >
        <div className="rounded-lg bg-white p-4 inline-block">
          <canvas ref={canvasRef} />
        </div>
      </Panel>
    </div>
  );
}
