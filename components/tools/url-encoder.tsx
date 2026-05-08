"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

export default function UrlEncoder() {
  const [mode, setMode] = useState<"enc" | "dec">("enc");
  const [scope, setScope] = useState<"component" | "uri">("component");
  const [input, setInput] = useState("https://bestmint.com/search?q=hello world&lang=en");

  let output = "";
  let error = "";
  try {
    if (mode === "enc") output = scope === "uri" ? encodeURI(input) : encodeURIComponent(input);
    else output = scope === "uri" ? decodeURI(input) : decodeURIComponent(input);
  } catch (e) {
    error = e instanceof Error ? e.message : "Decode error";
  }

  return (
    <div className="space-y-4">
      <Panel title="Mode">
        <div className="flex gap-2 flex-wrap">
          <button className={mode === "enc" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("enc")}>Encode</button>
          <button className={mode === "dec" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("dec")}>Decode</button>
          <div className="flex-1" />
          <select value={scope} onChange={(e) => setScope(e.target.value as typeof scope)} className="text-xs rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
            <option value="component">Component (encodeURIComponent)</option>
            <option value="uri">Full URI (encodeURI)</option>
          </select>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Input">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
        </Panel>
        <Panel title="Output" action={<CopyButton value={output} />}>
          <textarea readOnly value={error || output} className={textareaCls(error ? "text-red-400" : "")} />
        </Panel>
      </div>
    </div>
  );
}
