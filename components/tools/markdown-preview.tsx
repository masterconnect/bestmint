"use client";
import { useMemo, useState } from "react";
import { marked } from "marked";
import { Panel, textareaCls } from "@/components/ui/panel";

export default function MarkdownPreview() {
  const [md, setMd] = useState(`# Hello, BestMint!\n\n**Markdown** preview with _live_ rendering.\n\n- Lists work\n- [Links](https://bestmint.com)\n- \`inline code\`\n\n\`\`\`js\nconsole.log("hello");\n\`\`\`\n\n> Blockquotes too.`);
  const [gfm, setGfm] = useState(true);

  const html = useMemo(() => {
    try {
      marked.setOptions({ gfm, breaks: gfm });
      return marked.parse(md, { async: false }) as string;
    } catch (e) {
      return `<p style="color:#f87171">${(e as Error).message}</p>`;
    }
  }, [md, gfm]);

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={gfm} onChange={(e) => setGfm(e.target.checked)} className="accent-[var(--color-accent)]" />
          GitHub Flavored Markdown (tables, line breaks, task lists)
        </label>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Markdown">
          <textarea value={md} onChange={(e) => setMd(e.target.value)} className={textareaCls("min-h-[420px]")} />
        </Panel>
        <Panel title="Preview">
          <div
            className="prose prose-invert max-w-none min-h-[420px] text-sm prose-headings:text-[var(--color-foreground)] prose-a:text-[var(--color-accent)]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Panel>
      </div>
    </div>
  );
}
