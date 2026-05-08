"use client";
import { useMemo, useState } from "react";
import { marked } from "marked";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

export default function MarkdownToHtml() {
  const [md, setMd] = useState(`# Heading\n\nA short paragraph with **bold** and *italic*.\n\n- Item one\n- Item two\n\n[Link](https://bestmint.com)`);
  const [gfm, setGfm] = useState(true);

  const html = useMemo(() => {
    try {
      marked.setOptions({ gfm, breaks: gfm });
      return marked.parse(md, { async: false }) as string;
    } catch (e) {
      return `Error: ${(e as Error).message}`;
    }
  }, [md, gfm]);

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={gfm} onChange={(e) => setGfm(e.target.checked)} className="accent-[var(--color-accent)]" />
          GitHub Flavored Markdown
        </label>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Markdown">
          <textarea value={md} onChange={(e) => setMd(e.target.value)} className={textareaCls("min-h-[360px]")} />
        </Panel>
        <Panel title="HTML output" action={<CopyButton value={html} />}>
          <textarea readOnly value={html} className={textareaCls("min-h-[360px]")} />
        </Panel>
      </div>
    </div>
  );
}
