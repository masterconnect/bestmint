"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

function encode(s: string, urlSafe: boolean) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  let out = btoa(bin);
  if (urlSafe) out = out.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return out;
}

function decode(s: string) {
  let str = s.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export default function Base64() {
  const [mode, setMode] = useState<"enc" | "dec">("enc");
  const [urlSafe, setUrlSafe] = useState(false);
  const [input, setInput] = useState("Hello, BestMint! 👋");
  const [error, setError] = useState("");

  let output = "";
  try {
    output = mode === "enc" ? encode(input, urlSafe) : decode(input);
    if (error) setError("");
  } catch (e) {
    if (!error) setError(e instanceof Error ? e.message : "Decode error");
  }

  return (
    <div className="space-y-4">
      <Panel title="Mode">
        <div className="flex gap-2 items-center flex-wrap">
          <button className={mode === "enc" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("enc")}>Encode</button>
          <button className={mode === "dec" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("dec")}>Decode</button>
          <label className="flex items-center gap-2 text-sm ml-2">
            <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} className="accent-[var(--color-accent)]" />
            URL-safe
          </label>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title={mode === "enc" ? "Plain text" : "Base64"}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
        </Panel>
        <Panel title={mode === "enc" ? "Base64" : "Plain text"} action={<CopyButton value={output} />}>
          <textarea readOnly value={mode === "dec" && error ? error : output} className={textareaCls(mode === "dec" && error ? "text-red-400" : "")} />
        </Panel>
      </div>
    </div>
  );
}
