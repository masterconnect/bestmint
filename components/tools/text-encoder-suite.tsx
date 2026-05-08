"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Encode(bytes: Uint8Array): string {
  let out = "", bits = 0, value = 0;
  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;
    while (bits >= 5) {
      out += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  while (out.length % 8 !== 0) out += "=";
  return out;
}

function base32Decode(str: string): Uint8Array {
  const cleaned = str.toUpperCase().replace(/=+$/, "").replace(/\s/g, "");
  let bits = 0, value = 0;
  const out: number[] = [];
  for (const ch of cleaned) {
    const idx = BASE32_ALPHABET.indexOf(ch);
    if (idx < 0) throw new Error(`Invalid base32 char: ${ch}`);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

type Format = "base32" | "hex" | "octal" | "binary";

export default function TextEncoderSuite() {
  const [input, setInput] = useState("Hello, BestMint!");
  const [format, setFormat] = useState<Format>("hex");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const output = useMemo(() => {
    try {
      if (mode === "encode") {
        const bytes = new TextEncoder().encode(input);
        switch (format) {
          case "base32": return base32Encode(bytes);
          case "hex": return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
          case "octal": return Array.from(bytes).map((b) => b.toString(8).padStart(3, "0")).join(" ");
          case "binary": return Array.from(bytes).map((b) => b.toString(2).padStart(8, "0")).join(" ");
        }
      } else {
        let bytes: Uint8Array;
        switch (format) {
          case "base32": bytes = base32Decode(input); break;
          case "hex": {
            const cleaned = input.replace(/\s/g, "");
            if (cleaned.length % 2 !== 0) throw new Error("Hex string must have even length");
            const arr = new Uint8Array(cleaned.length / 2);
            for (let i = 0; i < arr.length; i++) arr[i] = parseInt(cleaned.substr(i * 2, 2), 16);
            bytes = arr;
            break;
          }
          case "octal": {
            const groups = input.trim().split(/\s+/);
            bytes = new Uint8Array(groups.map((g) => parseInt(g, 8)));
            break;
          }
          case "binary": {
            const groups = input.trim().split(/\s+/);
            bytes = new Uint8Array(groups.map((g) => parseInt(g, 2)));
            break;
          }
        }
        return new TextDecoder().decode(bytes);
      }
    } catch (e) {
      return `Error: ${(e as Error).message}`;
    }
  }, [input, format, mode]);

  return (
    <div className="space-y-4">
      <Panel title="Settings">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Format</span>
            <select value={format} onChange={(e) => setFormat(e.target.value as Format)} className={inputCls()}>
              <option value="hex">Base16 / Hex</option>
              <option value="base32">Base32</option>
              <option value="octal">Octal</option>
              <option value="binary">Binary</option>
            </select>
          </label>
          <div className="flex items-end gap-2">
            <button onClick={() => setMode("encode")} className={mode === "encode" ? btnPrimary() : btnGhost()}>Encode</button>
            <button onClick={() => setMode("decode")} className={mode === "decode" ? btnPrimary() : btnGhost()}>Decode</button>
          </div>
        </div>
      </Panel>
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Output" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>
      </Panel>
    </div>
  );
}
