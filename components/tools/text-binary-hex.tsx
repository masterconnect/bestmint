"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

type Tab = "binary" | "hex" | "octal";

function textToBytes(s: string): number[] {
  return Array.from(new TextEncoder().encode(s));
}
function bytesToText(bytes: number[]): string {
  return new TextDecoder().decode(new Uint8Array(bytes));
}

function textTo(tab: Tab, s: string): string {
  const bytes = textToBytes(s);
  if (tab === "binary") return bytes.map((b) => b.toString(2).padStart(8, "0")).join(" ");
  if (tab === "hex") return bytes.map((b) => b.toString(16).padStart(2, "0")).join(" ");
  return bytes.map((b) => b.toString(8).padStart(3, "0")).join(" ");
}

function fromText(tab: Tab, s: string): string {
  const cleaned = s.replace(/[^0-9a-fA-F]/g, tab === "hex" ? "" : " ").trim();
  let bytes: number[] = [];
  if (tab === "binary") {
    const tokens = s.split(/\s+/).filter(Boolean);
    bytes = tokens.map((t) => parseInt(t, 2));
  } else if (tab === "octal") {
    const tokens = s.split(/\s+/).filter(Boolean);
    bytes = tokens.map((t) => parseInt(t, 8));
  } else {
    const hex = cleaned;
    for (let i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  if (bytes.some((b) => Number.isNaN(b) || b < 0 || b > 255)) throw new Error("Invalid bytes");
  return bytesToText(bytes);
}

export default function TextBinaryHex() {
  const [tab, setTab] = useState<Tab>("binary");
  const [mode, setMode] = useState<"to" | "from">("to");
  const [input, setInput] = useState("Hello");

  const output = useMemo(() => {
    if (!input) return "";
    try {
      return mode === "to" ? textTo(tab, input) : fromText(tab, input);
    } catch (e) {
      return e instanceof Error ? e.message : "Error";
    }
  }, [tab, mode, input]);

  return (
    <div className="space-y-4">
      <Panel title="Format">
        <div className="flex gap-2 flex-wrap">
          {(["binary", "hex", "octal"] as Tab[]).map((t) => (
            <button key={t} className={tab === t ? btnPrimary("text-xs uppercase") : btnGhost("text-xs uppercase")} onClick={() => setTab(t)}>{t}</button>
          ))}
          <div className="flex-1" />
          <button className={mode === "to" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("to")}>Text → {tab}</button>
          <button className={mode === "from" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("from")}>{tab} → Text</button>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title={mode === "to" ? "Text" : tab}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} spellCheck={false} />
        </Panel>
        <Panel title={mode === "to" ? tab : "Text"} action={<CopyButton value={output} />}>
          <textarea readOnly value={output} className={textareaCls()} />
        </Panel>
      </div>
    </div>
  );
}
