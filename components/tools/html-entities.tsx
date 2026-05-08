"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escape(s: string) { return s.replace(/[&<>"']/g, (c) => ESCAPES[c]); }
function unescape(s: string) {
  const named: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&nbsp;": " " };
  return s
    .replace(/&[a-zA-Z]+;/g, (m) => named[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

export default function HtmlEntities() {
  const [mode, setMode] = useState<"enc" | "dec">("enc");
  const [input, setInput] = useState('<a href="/?x=1&y=2">"Hello" & welcome</a>');
  const output = mode === "enc" ? escape(input) : unescape(input);
  return (
    <div className="space-y-4">
      <Panel title="Mode">
        <div className="flex gap-2">
          <button className={mode === "enc" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("enc")}>Escape</button>
          <button className={mode === "dec" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("dec")}>Unescape</button>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Input"><textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} /></Panel>
        <Panel title="Output" action={<CopyButton value={output} />}><textarea readOnly value={output} className={textareaCls()} /></Panel>
      </div>
    </div>
  );
}
