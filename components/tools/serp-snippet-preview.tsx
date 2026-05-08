"use client";
import { useState } from "react";
import { inputCls, Panel, textareaCls } from "@/components/ui/panel";

const TITLE_OPT = [50, 60];
const DESC_OPT = [140, 160];

function badge(len: number, [lo, hi]: number[]) {
  if (len === 0) return { color: "text-[var(--color-muted)]", note: "empty" };
  if (len < lo) return { color: "text-amber-400", note: "short" };
  if (len > hi) return { color: "text-red-400", note: "may truncate" };
  return { color: "text-emerald-400", note: "ideal" };
}

export default function SerpSnippetPreview() {
  const [title, setTitle] = useState("Free Online Tools — BestMint");
  const [url, setUrl] = useState("https://bestmint.com/tools");
  const [desc, setDesc] = useState("Free, fast, privacy-friendly online utilities for text, dev, color, dates, and more. Runs entirely in your browser.");

  const tBadge = badge(title.length, TITLE_OPT);
  const dBadge = badge(desc.length, DESC_OPT);

  let host = url;
  try { host = new URL(url).hostname.replace(/^www\./, "") + new URL(url).pathname.replace(/\/$/, ""); } catch { /* ignore */ }

  return (
    <div className="space-y-4">
      <Panel title="Inputs">
        <div className="grid sm:grid-cols-2 gap-3">
          <Lbl label={`Title (${title.length} / 50–60)`} hint={tBadge}><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="URL"><input value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label={`Meta description (${desc.length} / 140–160)`} hint={dBadge}><textarea value={desc} onChange={(e) => setDesc(e.target.value)} className={textareaCls("min-h-[80px]")} /></Lbl>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Google — light">
          <div className="rounded-lg p-4 bg-white text-black">
            <div className="text-[12px] text-[#202124]">{host}</div>
            <div className="text-[20px] leading-snug text-[#1a0dab] hover:underline cursor-pointer line-clamp-1 mt-1">{title}</div>
            <div className="text-[14px] text-[#4d5156] mt-1 line-clamp-2">{desc}</div>
          </div>
        </Panel>
        <Panel title="Google — dark">
          <div className="rounded-lg p-4 bg-[#202124] text-[#bdc1c6]">
            <div className="text-[12px]">{host}</div>
            <div className="text-[20px] leading-snug text-[#8ab4f8] hover:underline cursor-pointer line-clamp-1 mt-1">{title}</div>
            <div className="text-[14px] text-[#bdc1c6] mt-1 line-clamp-2">{desc}</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Lbl({ label, children, hint }: { label: string; children: React.ReactNode; hint?: { color: string; note: string } }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-1">
        <span>{label}</span>
        {hint && <span className={`font-mono ${hint.color}`}>{hint.note}</span>}
      </span>
      {children}
    </label>
  );
}
