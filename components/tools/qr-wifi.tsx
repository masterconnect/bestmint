"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

function escWifi(s: string) {
  return s.replace(/([\\;,":])/g, "\\$1");
}

export default function QrWifi() {
  const [ssid, setSsid] = useState("My-Network");
  const [password, setPassword] = useState("hunter22!");
  const [enc, setEnc] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [hidden, setHidden] = useState(false);
  const [size, setSize] = useState(320);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState("");

  const wifiStr = `WIFI:T:${enc};S:${escWifi(ssid)};${enc !== "nopass" ? `P:${escWifi(password)};` : ""}${hidden ? "H:true;" : ""};`;

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, wifiStr, { width: size, margin: 2, errorCorrectionLevel: "M" }, () => {
      if (canvasRef.current) setDataUrl(canvasRef.current.toDataURL("image/png"));
    });
  }, [wifiStr, size]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Network">
        <div className="space-y-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">SSID (network name)</span>
            <input value={ssid} onChange={(e) => setSsid(e.target.value)} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Encryption</span>
            <select value={enc} onChange={(e) => setEnc(e.target.value as typeof enc)} className={inputCls()}>
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No password (open)</option>
            </select>
          </label>
          {enc !== "nopass" && (
            <label className="block">
              <span className="block text-xs text-[var(--color-muted)] mb-1">Password</span>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls()} />
            </label>
          )}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="accent-[var(--color-accent)]" />
            Hidden network
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">QR size (px)</span>
            <input type="number" min={64} max={1024} step={8} value={size} onChange={(e) => setSize(Number(e.target.value) || 320)} className={inputCls()} />
          </label>
        </div>
        <div className="mt-3 text-xs">
          <span className="text-[var(--color-muted)]">WiFi string: </span>
          <code className="break-all">{wifiStr}</code>
          <span className="ml-2"><CopyButton value={wifiStr} /></span>
        </div>
      </Panel>
      <Panel title="QR code" action={dataUrl && <a href={dataUrl} download="wifi-qr.png" className={btnPrimary("text-xs px-2.5 py-1")}>PNG</a>}>
        <div className="rounded-lg bg-white p-4 inline-block">
          <canvas ref={canvasRef} />
        </div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">Most modern phones (iOS 11+, Android 10+) auto-join a network when they scan this code.</p>
      </Panel>
    </div>
  );
}
