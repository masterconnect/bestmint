"use client";
import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const FORMATS = ["CODE128", "EAN13", "EAN8", "UPC", "CODE39", "ITF14", "ITF", "MSI", "pharmacode", "codabar"];

export default function BarcodeGenerator() {
  const [value, setValue] = useState("BESTMINT-2026");
  const [format, setFormat] = useState("CODE128");
  const [error, setError] = useState("");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(80);
  const [showText, setShowText] = useState(true);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      JsBarcode(ref.current, value || " ", { format, width, height, displayValue: showText, background: "#ffffff", lineColor: "#000000", margin: 10 });
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid value for selected format");
    }
  }, [value, format, width, height, showText]);

  function download() {
    if (!ref.current) return;
    const svg = new XMLSerializer().serializeToString(ref.current);
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "barcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Content">
        <input value={value} onChange={(e) => setValue(e.target.value)} className={inputCls()} placeholder="value to encode" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Format</span>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className={inputCls()}>
              {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Bar width</span>
            <input type="number" min={1} max={6} value={width} onChange={(e) => setWidth(Number(e.target.value) || 2)} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Height</span>
            <input type="number" min={20} max={300} value={height} onChange={(e) => setHeight(Number(e.target.value) || 80)} className={inputCls()} />
          </label>
          <label className="flex items-center gap-2 mt-6 text-sm">
            <input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} className="accent-[var(--color-accent)]" />
            Show text
          </label>
        </div>
      </Panel>
      <Panel title="Barcode" action={<button onClick={download} className={btnPrimary("text-xs px-2.5 py-1")}>Download SVG</button>}>
        {error ? (
          <div className="text-sm text-red-400 p-3 rounded-md border border-red-400/40">{error}</div>
        ) : (
          <div className="rounded-md bg-white p-4 inline-block">
            <svg ref={ref} />
          </div>
        )}
      </Panel>
    </div>
  );
}
