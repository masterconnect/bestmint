"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

function vigenere(text: string, key: string, encrypt: boolean): string {
  const k = key.toUpperCase().replace(/[^A-Z]/g, "");
  if (!k) return text;
  let ki = 0;
  return text.replace(/[a-zA-Z]/g, (c) => {
    const isUpper = c <= "Z";
    const base = isUpper ? 65 : 97;
    const shift = k.charCodeAt(ki % k.length) - 65;
    const code = c.charCodeAt(0) - base;
    const out = encrypt ? (code + shift) % 26 : (code - shift + 26) % 26;
    ki++;
    return String.fromCharCode(out + base);
  });
}

export default function VigenereCipher() {
  const [input, setInput] = useState("Attack at dawn");
  const [key, setKey] = useState("LEMON");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const output = useMemo(() => vigenere(input, key, mode === "encrypt"), [input, key, mode]);

  return (
    <div className="space-y-4">
      <Panel title="Mode">
        <div className="flex gap-2">
          <button onClick={() => setMode("encrypt")} className={mode === "encrypt" ? btnPrimary() : btnGhost()}>Encrypt</button>
          <button onClick={() => setMode("decrypt")} className={mode === "decrypt" ? btnPrimary() : btnGhost()}>Decrypt</button>
        </div>
      </Panel>
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Keyword">
        <input value={key} onChange={(e) => setKey(e.target.value)} className={inputCls()} placeholder="A keyword (letters only)" />
      </Panel>
      <Panel title="Output" action={<CopyButton value={output} />}>
        <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
      </Panel>
    </div>
  );
}
