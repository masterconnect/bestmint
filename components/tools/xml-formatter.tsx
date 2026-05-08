"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, Panel, textareaCls } from "@/components/ui/panel";

const SAMPLE = `<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>`;

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatXml(input: string, indent = 2): { ok: boolean; output: string } {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, output: "" };
  const parser = new DOMParser();
  const doc = parser.parseFromString(trimmed, "application/xml");
  const err = doc.querySelector("parsererror");
  if (err) {
    return { ok: false, output: err.textContent || "Invalid XML" };
  }
  const pad = " ".repeat(indent);
  const lines: string[] = [];
  function walk(node: Node, depth: number) {
    const prefix = pad.repeat(depth);
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const attrs = Array.from(el.attributes)
        .map((a) => ` ${a.name}="${escapeXml(a.value)}"`)
        .join("");
      const children = Array.from(el.childNodes).filter(
        (n) => n.nodeType !== Node.TEXT_NODE || (n.textContent && n.textContent.trim())
      );
      if (children.length === 0) {
        lines.push(`${prefix}<${el.tagName}${attrs}/>`);
        return;
      }
      const onlyText =
        children.length === 1 && children[0].nodeType === Node.TEXT_NODE;
      if (onlyText) {
        lines.push(
          `${prefix}<${el.tagName}${attrs}>${escapeXml(
            (children[0].textContent || "").trim()
          )}</${el.tagName}>`
        );
        return;
      }
      lines.push(`${prefix}<${el.tagName}${attrs}>`);
      for (const c of children) walk(c, depth + 1);
      lines.push(`${prefix}</${el.tagName}>`);
    } else if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent || "").trim();
      if (t) lines.push(`${prefix}${escapeXml(t)}`);
    } else if (node.nodeType === Node.COMMENT_NODE) {
      lines.push(`${prefix}<!--${node.textContent}-->`);
    } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
      lines.push(`${prefix}<![CDATA[${node.textContent}]]>`);
    }
  }
  if (doc.documentElement) walk(doc.documentElement, 0);
  return { ok: true, output: lines.join("\n") };
}

export default function XmlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);

  const result = useMemo(() => formatXml(input, indent), [input, indent]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel
        title="Input XML"
        action={<button onClick={() => setInput("")} className={btnGhost("text-xs px-2 py-1")}>Clear</button>}
      >
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[320px]")} spellCheck={false} />
      </Panel>
      <Panel
        title={
          <span className="flex items-center gap-2">
            Output
            {result.ok ? (
              <span className="text-emerald-400 text-xs">valid</span>
            ) : (
              <span className="text-red-400 text-xs">invalid</span>
            )}
          </span>
        }
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
        <pre className={`${textareaCls("min-h-[320px] whitespace-pre-wrap break-words")} ${result.ok ? "" : "text-red-400"}`}>
          {result.output || (result.ok ? "Output will appear here…" : "")}
        </pre>
      </Panel>
    </div>
  );
}
