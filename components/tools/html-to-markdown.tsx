"use client";
import { useMemo, useState } from "react";
import TurndownService from "turndown";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

export default function HtmlToMarkdown() {
  const [html, setHtml] = useState(`<h1>Hello</h1>\n<p>This is <strong>HTML</strong> with a <a href="https://bestmint.com">link</a>.</p>\n<ul><li>One</li><li>Two</li></ul>\n<pre><code>console.log("hi");</code></pre>`);

  const md = useMemo(() => {
    try {
      const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
      return td.turndown(html);
    } catch (e) {
      return `Error: ${(e as Error).message}`;
    }
  }, [html]);

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="HTML input">
          <textarea value={html} onChange={(e) => setHtml(e.target.value)} className={textareaCls("min-h-[360px]")} />
        </Panel>
        <Panel title="Markdown output" action={<CopyButton value={md} />}>
          <textarea readOnly value={md} className={textareaCls("min-h-[360px]")} />
        </Panel>
      </div>
    </div>
  );
}
