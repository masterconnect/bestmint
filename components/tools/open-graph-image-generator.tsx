"use client";
import { useEffect, useRef, useState } from "react";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

type Theme = "light" | "dark" | "gradient" | "brand";

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? cur + " " + w : w;
    if (ctx.measureText(next).width > maxW && cur) { lines.push(cur); cur = w; }
    else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

export default function OpenGraphImageGenerator() {
  const [title, setTitle] = useState("Build faster. Ship calmer.");
  const [subtitle, setSubtitle] = useState("BestMint — free online tools for builders");
  const [theme, setTheme] = useState<Theme>("gradient");
  const [accent, setAccent] = useState("#5b8def");
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const W = 1200, H = 630;
    c.width = W; c.height = H;

    if (theme === "light") {
      ctx.fillStyle = "#fafafa"; ctx.fillRect(0, 0, W, H);
    } else if (theme === "dark") {
      ctx.fillStyle = "#0b0b0d"; ctx.fillRect(0, 0, W, H);
    } else if (theme === "brand") {
      ctx.fillStyle = accent; ctx.fillRect(0, 0, W, H);
    } else {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, accent); g.addColorStop(1, "#0b0b0d");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }

    const isDark = theme === "dark" || theme === "gradient" || theme === "brand";
    const fg = isDark ? "#ffffff" : "#0b0b0d";
    const sub = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";

    ctx.fillStyle = accent;
    ctx.fillRect(80, 80, 12, 80);

    ctx.fillStyle = fg;
    ctx.font = "bold 78px ui-sans-serif, system-ui, -apple-system, Inter, Segoe UI, Roboto, Helvetica, Arial";
    ctx.textBaseline = "top";
    const titleLines = wrap(ctx, title, W - 160).slice(0, 4);
    let y = 200;
    for (const l of titleLines) { ctx.fillText(l, 80, y); y += 92; }

    ctx.fillStyle = sub;
    ctx.font = "400 34px ui-sans-serif, system-ui, -apple-system, Inter";
    const subLines = wrap(ctx, subtitle, W - 160).slice(0, 2);
    y += 20;
    for (const l of subLines) { ctx.fillText(l, 80, y); y += 44; }
  }, [title, subtitle, theme, accent]);

  function download() {
    const c = ref.current; if (!c) return;
    const url = c.toDataURL("image/png");
    const a = document.createElement("a"); a.href = url; a.download = "og.png"; a.click();
  }

  return (
    <div className="space-y-4">
      <Panel title="Settings">
        <div className="grid sm:grid-cols-2 gap-3">
          <Lbl label="Title"><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Subtitle"><input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={inputCls()} /></Lbl>
          <Lbl label="Theme">
            <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)} className={inputCls()}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="gradient">Gradient</option>
              <option value="brand">Brand</option>
            </select>
          </Lbl>
          <Lbl label="Accent color"><input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className={`${inputCls("h-10")}`} /></Lbl>
        </div>
        <button onClick={download} className={btnPrimary("mt-4")}>Download PNG (1200×630)</button>
      </Panel>
      <Panel title="Preview">
        <div className="rounded-md border border-[var(--color-border)] overflow-hidden">
          <canvas ref={ref} className="w-full h-auto block" />
        </div>
      </Panel>
    </div>
  );
}

function Lbl({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs text-[var(--color-muted)] mb-1">{label}</span>{children}</label>;
}
