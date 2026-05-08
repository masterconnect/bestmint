"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, Panel, textareaCls } from "@/components/ui/panel";

const SAMPLE = `<div class="card"><h2>Hello</h2><p>This is <strong>BestMint</strong>.</p><ul><li>One</li><li>Two</li></ul></div>`;

const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
  "param", "source", "track", "wbr",
]);

function escapeAttr(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatHtml(input: string, indent = 2): { ok: boolean; output: string } {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, output: "" };
  const wrapped = `<root>${trimmed}</root>`;
  const doc = new DOMParser().parseFromString(wrapped, "text/html");
  const root = doc.body.querySelector("root");
  if (!root) return { ok: false, output: "Could not parse HTML" };
  const pad = " ".repeat(indent);
  const lines: string[] = [];
  function walk(node: Node, depth: number) {
    const prefix = pad.repeat(depth);
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      const attrs = Array.from(el.attributes).map((a) => ` ${a.name}="${escapeAttr(a.value)}"`).join("");
      if (VOID.has(tag)) {
        lines.push(`${prefix}<${tag}${attrs}>`);
        return;
      }
      const children = Array.from(el.childNodes).filter(
        (n) => n.nodeType !== Node.TEXT_NODE || (n.textContent && n.textContent.trim())
      );
      if (children.length === 0) {
        lines.push(`${prefix}<${tag}${attrs}></${tag}>`);
        return;
      }
      const onlyText = children.length === 1 && children[0].nodeType === Node.TEXT_NODE;
      if (onlyText) {
        const text = (children[0].textContent || "").trim();
        lines.push(`${prefix}<${tag}${attrs}>${text}</${tag}>`);
        return;
      }
      lines.push(`${prefix}<${tag}${attrs}>`);
      for (const c of children) walk(c, depth + 1);
      lines.push(`${prefix}</${tag}>`);
    } else if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent || "").trim();
      if (t) lines.push(`${prefix}${t}`);
    } else if (node.nodeType === Node.COMMENT_NODE) {
      lines.push(`${prefix}<!--${node.textContent}-->`);
    }
  }
  for (const c of Array.from(root.childNodes)) walk(c, 0);
  return { ok: true, output: lines.join("\n") };
}

export default function HtmlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);
  const result = useMemo(() => formatHtml(input, indent), [input, indent]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Input HTML" action={<button onClick={() => setInput("")} className={btnGhost("text-xs px-2 py-1")}>Clear</button>}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[320px]")} spellCheck={false} />
      </Panel>
      <Panel
        title="Formatted"
        action={
          <div className="flex items-center gap-2">
            <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="text-xs rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1">
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
            <CopyButton value={result.output} />
          </div>
        }
      >
        <pre className={`${textareaCls("min-h-[320px] whitespace-pre-wrap break-words")} ${result.ok ? "" : "text-red-400"}`}>{result.output}</pre>
      </Panel>
    </div>
  );
}
