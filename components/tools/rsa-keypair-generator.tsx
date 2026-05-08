"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

function bufToBase64(buf: ArrayBuffer): string {
  let bin = "";
  const arr = new Uint8Array(buf);
  for (const b of arr) bin += String.fromCharCode(b);
  return btoa(bin);
}

function pem(label: string, b64: string): string {
  const lines = b64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${label}-----\n${lines.join("\n")}\n-----END ${label}-----`;
}

export default function RsaKeypairGenerator() {
  const [size, setSize] = useState(2048);
  const [pub, setPub] = useState("");
  const [priv, setPriv] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function generate() {
    setErr(""); setBusy(true); setPub(""); setPriv("");
    try {
      const kp = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: size,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );
      const spki = await crypto.subtle.exportKey("spki", kp.publicKey);
      const pkcs8 = await crypto.subtle.exportKey("pkcs8", kp.privateKey);
      setPub(pem("PUBLIC KEY", bufToBase64(spki)));
      setPriv(pem("PRIVATE KEY", bufToBase64(pkcs8)));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Generate error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="Key size">
        <div className="flex items-center gap-3">
          <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="text-sm rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
            <option value={2048}>2048 bits (recommended)</option>
            <option value={3072}>3072 bits</option>
            <option value={4096}>4096 bits (slow)</option>
          </select>
          <button onClick={generate} disabled={busy} className={btnPrimary("text-sm")}>{busy ? "Generating…" : "Generate keypair"}</button>
        </div>
      </Panel>
      {err && <p className="text-red-400 text-sm">{err}</p>}
      {pub && (
        <div className="grid lg:grid-cols-2 gap-4">
          <Panel title="Public key (SPKI/PEM)" action={<CopyButton value={pub} />}>
            <textarea readOnly value={pub} className={textareaCls("min-h-[260px] text-xs")} />
          </Panel>
          <Panel title="Private key (PKCS#8/PEM)" action={<CopyButton value={priv} />}>
            <textarea readOnly value={priv} className={textareaCls("min-h-[260px] text-xs")} />
          </Panel>
        </div>
      )}
      <p className="text-xs text-[var(--color-muted)]">Keys are generated locally in your browser using Web Crypto and never sent anywhere. Use RSA-OAEP for encryption; for signing, regenerate as RSASSA-PKCS1-v1_5 or use a different tool.</p>
    </div>
  );
}
