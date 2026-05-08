"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

function minifyCss(s: string) {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}
function minifyHtml(s: string) {
  return s
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
}
function minifyJs(s: string) {
  // Conservative: strip /* */ and // comments and collapse whitespace.
  // Doesn't handle strings/regex containing comments perfectly; for production use a real minifier.
  return s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:\\])\/\/.*$/gm, "$1")
    .replace(/\s*([=+\-*/{}();,<>!?:|&%\[\]])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export default function Minifier() {
  const [lang, setLang] = useState<"html" | "css" | "js">("css");
  const [input, setInput] = useState(`/* example */\n.btn {\n  background: #6366f1;\n  color: white;\n  padding: 12px 16px;\n}`);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    if (lang === "html") return minifyHtml(input);
    if (lang === "css") return minifyCss(input);
    return minifyJs(input);
  }, [lang, input]);

  const ratio = input.length ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div className="space-y-4">
      <Panel title="Language">
        <div className="flex gap-2">
          {(["html", "css", "js"] as const).map((l) => (
            <button key={l} className={lang === l ? btnPrimary("text-xs uppercase") : btnGhost("text-xs uppercase")} onClick={() => setLang(l)}>
              {l}
            </button>
          ))}
          <div className="flex-1 text-right text-xs text-[var(--color-muted)]">
            {input.length} → {output.length} chars ({ratio}% smaller)
          </div>
        </div>
      </Panel>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Input">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
        </Panel>
        <Panel title="Minified" action={<CopyButton value={output} />}>
          <textarea readOnly value={output} className={textareaCls()} />
        </Panel>
      </div>
    </div>
  );
}
