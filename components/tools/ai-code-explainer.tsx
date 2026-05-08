"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

export default function AiCodeExplainer() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/code-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Request failed");
      setOut(data.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <Panel title="Code to explain">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">Language (optional)</label>
            <input value={language} onChange={(e) => setLanguage(e.target.value)} className={inputCls()} placeholder="e.g. python, typescript, rust" />
          </div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} className={textareaCls("min-h-[220px]")} placeholder="Paste a code snippet…" />
          <div className="flex justify-end">
            <button className={btnPrimary()} onClick={run} disabled={busy || !code.trim()}>
              {busy ? "Explaining…" : "Explain code"}
            </button>
          </div>
        </div>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title="Plain-English explanation" action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
