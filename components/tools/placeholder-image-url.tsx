"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

type Service = "placehold" | "picsum" | "dummy";

export default function PlaceholderImageUrl() {
  const [service, setService] = useState<Service>("placehold");
  const [w, setW] = useState(600);
  const [h, setH] = useState(400);
  const [bg, setBg] = useState("6366f1");
  const [fg, setFg] = useState("ffffff");
  const [text, setText] = useState("BestMint");

  const url = useMemo(() => {
    if (service === "placehold") {
      const t = encodeURIComponent(text || "");
      return `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${t}`;
    }
    if (service === "picsum") {
      return `https://picsum.photos/${w}/${h}`;
    }
    const t = encodeURIComponent(text || "");
    return `https://dummyimage.com/${w}x${h}/${bg}/${fg}.png&text=${t}`;
  }, [service, w, h, bg, fg, text]);

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="flex flex-col gap-1 sm:col-span-3">
            <span className="text-xs text-[var(--color-muted)]">Service</span>
            <select value={service} onChange={(e) => setService(e.target.value as Service)} className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm">
              <option value="placehold">placehold.co</option>
              <option value="picsum">picsum.photos (random photo)</option>
              <option value="dummy">dummyimage.com</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Width</span>
            <input type="number" value={w} onChange={(e) => setW(Math.max(1, Number(e.target.value) || 1))} className={inputCls()} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Height</span>
            <input type="number" value={h} onChange={(e) => setH(Math.max(1, Number(e.target.value) || 1))} className={inputCls()} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Text</span>
            <input value={text} onChange={(e) => setText(e.target.value)} className={inputCls()} disabled={service === "picsum"} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Background hex</span>
            <input value={bg} onChange={(e) => setBg(e.target.value.replace(/^#/, ""))} className={inputCls("font-mono")} disabled={service === "picsum"} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Text hex</span>
            <input value={fg} onChange={(e) => setFg(e.target.value.replace(/^#/, ""))} className={inputCls("font-mono")} disabled={service === "picsum"} />
          </label>
        </div>
      </Panel>
      <Panel title="URL" action={<CopyButton value={url} />}>
        <code className="block font-mono text-sm break-all py-2">{url}</code>
      </Panel>
      <Panel title="Preview">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="preview" className="max-w-full rounded border border-[var(--color-border)]" />
      </Panel>
    </div>
  );
}
