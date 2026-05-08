"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

export default function QrVcard() {
  const [first, setFirst] = useState("Ada");
  const [last, setLast] = useState("Lovelace");
  const [org, setOrg] = useState("Analytical Engines Ltd.");
  const [title, setTitle] = useState("Mathematician");
  const [phone, setPhone] = useState("+1 555 0100");
  const [email, setEmail] = useState("ada@example.com");
  const [website, setWebsite] = useState("https://example.com");
  const [address, setAddress] = useState("221B Baker Street, London, UK");
  const [size, setSize] = useState(320);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState("");

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${last};${first};;;`,
    `FN:${first} ${last}`.trim(),
    org && `ORG:${org}`,
    title && `TITLE:${title}`,
    phone && `TEL;TYPE=CELL:${phone}`,
    email && `EMAIL:${email}`,
    website && `URL:${website}`,
    address && `ADR;TYPE=WORK:;;${address};;;;`,
    "END:VCARD",
  ].filter(Boolean).join("\n");

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, vcard, { width: size, margin: 2, errorCorrectionLevel: "M" }, () => {
      if (canvasRef.current) setDataUrl(canvasRef.current.toDataURL("image/png"));
    });
  }, [vcard, size]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Contact">
        <div className="grid grid-cols-2 gap-3">
          <Lbl label="First name"><input value={first} onChange={(e) => setFirst(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Last name"><input value={last} onChange={(e) => setLast(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Organization"><input value={org} onChange={(e) => setOrg(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Title"><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Phone"><input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Email"><input value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Website"><input value={website} onChange={(e) => setWebsite(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Address"><input value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls()} /></Lbl>
        </div>
        <label className="block mt-3">
          <span className="block text-xs text-[var(--color-muted)] mb-1">QR size (px)</span>
          <input type="number" min={128} max={1024} step={8} value={size} onChange={(e) => setSize(Number(e.target.value) || 320)} className={inputCls("max-w-[160px]")} />
        </label>
      </Panel>
      <Panel
        title="QR vCard"
        action={
          <div className="flex gap-2">
            <CopyButton value={vcard} label="Copy vCard" />
            {dataUrl && <a href={dataUrl} download="vcard.png" className={btnPrimary("text-xs px-2.5 py-1")}>PNG</a>}
          </div>
        }
      >
        <div className="rounded-lg bg-white p-4 inline-block">
          <canvas ref={canvasRef} />
        </div>
        <pre className="mt-3 text-xs font-mono whitespace-pre-wrap break-all rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">{vcard}</pre>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>
      {children}
    </label>
  );
}
