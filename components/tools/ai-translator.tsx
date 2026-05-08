"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const LANGS = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", "Dutch",
  "Russian", "Polish", "Turkish", "Arabic", "Hebrew", "Persian",
  "Hindi", "Bengali", "Urdu", "Tamil", "Thai", "Vietnamese", "Indonesian",
  "Chinese (Simplified)", "Chinese (Traditional)", "Japanese", "Korean",
  "Greek", "Czech", "Swedish", "Norwegian", "Finnish", "Danish",
];

export default function AiTranslator() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("auto");
  const [target, setTarget] = useState("Spanish");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setError(""); setOut("");
    try {
      const r = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source, target }),
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
      <Panel title="Translate">
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">From</span>
            <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm">
              <option value="auto">Auto-detect</option>
              {LANGS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">To</span>
            <select value={target} onChange={(e) => setTarget(e.target.value)} className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm">
              {LANGS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </label>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls("min-h-[160px]")} placeholder="Type or paste text to translate…" />
        <button className={btnPrimary("mt-3")} onClick={run} disabled={busy || !text.trim()}>
          {busy ? "Translating…" : "Translate"}
        </button>
      </Panel>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {out && (
        <Panel title={`Translation — ${target}`} action={<CopyButton value={out} />}>
          <pre className="font-mono text-sm whitespace-pre-wrap break-words">{out}</pre>
        </Panel>
      )}
    </div>
  );
}
