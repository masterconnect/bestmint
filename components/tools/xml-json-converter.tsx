"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const X_SAMPLE = `<book>\n  <title>BestMint Tools</title>\n  <author>Open Web</author>\n  <tags>\n    <tag>json</tag>\n    <tag>xml</tag>\n  </tags>\n</book>`;
const J_SAMPLE = `{\n  "book": {\n    "title": "BestMint Tools",\n    "author": "Open Web",\n    "tags": { "tag": ["json", "xml"] }\n  }\n}`;

function elementToObj(el: Element): unknown {
  const obj: Record<string, unknown> = {};
  if (el.attributes.length) {
    for (const attr of Array.from(el.attributes)) obj[`@${attr.name}`] = attr.value;
  }
  const children = Array.from(el.children);
  if (!children.length) {
    const text = (el.textContent || "").trim();
    if (Object.keys(obj).length === 0) return text;
    if (text) obj["#text"] = text;
    return obj;
  }
  for (const c of children) {
    const tag = c.tagName;
    const v = elementToObj(c);
    if (obj[tag] !== undefined) {
      if (!Array.isArray(obj[tag])) obj[tag] = [obj[tag]];
      (obj[tag] as unknown[]).push(v);
    } else {
      obj[tag] = v;
    }
  }
  return obj;
}

function escapeXml(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function objToXml(obj: unknown, name: string, depth = 0): string {
  const pad = "  ".repeat(depth);
  if (obj === null || obj === undefined) return `${pad}<${name}/>`;
  if (typeof obj !== "object") return `${pad}<${name}>${escapeXml(String(obj))}</${name}>`;
  if (Array.isArray(obj)) return obj.map((v) => objToXml(v, name, depth)).join("\n");
  const entries = Object.entries(obj as Record<string, unknown>);
  const attrs = entries.filter(([k]) => k.startsWith("@"));
  const text = (obj as Record<string, unknown>)["#text"];
  const others = entries.filter(([k]) => !k.startsWith("@") && k !== "#text");
  const attrStr = attrs.map(([k, v]) => ` ${k.slice(1)}="${escapeXml(String(v))}"`).join("");
  if (!others.length && text === undefined) return `${pad}<${name}${attrStr}/>`;
  if (!others.length && text !== undefined) {
    return `${pad}<${name}${attrStr}>${escapeXml(String(text))}</${name}>`;
  }
  const inner = others.map(([k, v]) => objToXml(v, k, depth + 1)).join("\n");
  return `${pad}<${name}${attrStr}>\n${inner}\n${pad}</${name}>`;
}

export default function XmlJsonConverter() {
  const [mode, setMode] = useState<"x2j" | "j2x">("x2j");
  const [input, setInput] = useState(X_SAMPLE);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true as const, output: "" };
    try {
      if (mode === "x2j") {
        const doc = new DOMParser().parseFromString(input, "application/xml");
        const err = doc.querySelector("parsererror");
        if (err) return { ok: false as const, output: err.textContent || "Invalid XML" };
        const root = doc.documentElement;
        const out = { [root.tagName]: elementToObj(root) };
        return { ok: true as const, output: JSON.stringify(out, null, 2) };
      }
      const parsed = JSON.parse(input);
      const keys = Object.keys(parsed);
      if (keys.length !== 1) return { ok: false as const, output: "JSON must have exactly one root key" };
      return { ok: true as const, output: objToXml(parsed[keys[0]], keys[0]) };
    } catch (e) {
      return { ok: false as const, output: e instanceof Error ? e.message : "Error" };
    }
  }, [input, mode]);

  function swap(next: "x2j" | "j2x") {
    setMode(next);
    setInput(next === "x2j" ? X_SAMPLE : J_SAMPLE);
  }

  return (
    <div className="space-y-4">
      <Panel title="Direction">
        <div className="flex gap-2 flex-wrap">
          <button className={mode === "x2j" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => swap("x2j")}>XML → JSON</button>
          <button className={mode === "j2x" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => swap("j2x")}>JSON → XML</button>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title={mode === "x2j" ? "XML" : "JSON"}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[280px]")} spellCheck={false} />
        </Panel>
        <Panel title={mode === "x2j" ? "JSON" : "XML"} action={<CopyButton value={result.output} />}>
          <pre className={`${textareaCls("min-h-[280px] whitespace-pre-wrap break-words")} ${result.ok ? "" : "text-red-400"}`}>
            {result.output}
          </pre>
        </Panel>
      </div>
    </div>
  );
}
