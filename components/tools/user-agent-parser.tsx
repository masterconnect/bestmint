"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

const SAMPLE = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function parseUA(ua: string) {
  const result = {
    browser: "Unknown",
    browserVersion: "",
    engine: "Unknown",
    os: "Unknown",
    osVersion: "",
    device: "Desktop",
    bot: false,
  };

  // Bot
  if (/bot|crawler|spider|crawling/i.test(ua)) result.bot = true;

  // OS
  if (/Windows NT 10/i.test(ua)) { result.os = "Windows"; result.osVersion = "10/11"; }
  else if (/Windows NT 6\.3/i.test(ua)) { result.os = "Windows"; result.osVersion = "8.1"; }
  else if (/Windows NT 6\.2/i.test(ua)) { result.os = "Windows"; result.osVersion = "8"; }
  else if (/Windows NT 6\.1/i.test(ua)) { result.os = "Windows"; result.osVersion = "7"; }
  else if (/Windows/i.test(ua)) { result.os = "Windows"; }
  else if (/iPhone OS|iPad; CPU OS/i.test(ua)) {
    const m = ua.match(/OS (\d+[_\d]*)/);
    result.os = "iOS"; result.osVersion = m ? m[1].replace(/_/g, ".") : "";
  } else if (/Mac OS X/i.test(ua)) {
    const m = ua.match(/Mac OS X (\d+[_\d.]*)/);
    result.os = "macOS"; result.osVersion = m ? m[1].replace(/_/g, ".") : "";
  } else if (/Android/i.test(ua)) {
    const m = ua.match(/Android (\d+[\d.]*)/);
    result.os = "Android"; result.osVersion = m ? m[1] : "";
  } else if (/CrOS/i.test(ua)) result.os = "Chrome OS";
  else if (/Linux/i.test(ua)) result.os = "Linux";

  // Device
  if (/iPad/i.test(ua)) result.device = "Tablet";
  else if (/Mobile|iPhone|Android.*Mobile/i.test(ua)) result.device = "Mobile";
  else if (/Tablet/i.test(ua)) result.device = "Tablet";

  // Browser & engine (order matters)
  const tests: { re: RegExp; name: string; ver?: RegExp }[] = [
    { re: /Edg\//i, name: "Edge", ver: /Edg\/([\d.]+)/i },
    { re: /OPR\/|Opera/i, name: "Opera", ver: /(?:OPR|Opera)\/([\d.]+)/i },
    { re: /Firefox\//i, name: "Firefox", ver: /Firefox\/([\d.]+)/i },
    { re: /Chrome\//i, name: "Chrome", ver: /Chrome\/([\d.]+)/i },
    { re: /Safari\//i, name: "Safari", ver: /Version\/([\d.]+)/i },
    { re: /MSIE |Trident/i, name: "Internet Explorer", ver: /(?:MSIE |rv:)([\d.]+)/i },
  ];
  for (const t of tests) {
    if (t.re.test(ua)) {
      result.browser = t.name;
      if (t.ver) {
        const m = ua.match(t.ver);
        if (m) result.browserVersion = m[1];
      }
      break;
    }
  }

  // Engine
  if (/Gecko\/.*Firefox/i.test(ua)) result.engine = "Gecko";
  else if (/AppleWebKit/i.test(ua)) result.engine = /Chrome|CriOS|Edg/i.test(ua) ? "Blink" : "WebKit";
  else if (/Trident/i.test(ua)) result.engine = "Trident";

  return result;
}

export default function UserAgentParser() {
  const [ua, setUa] = useState(SAMPLE);
  const r = useMemo(() => parseUA(ua), [ua]);

  return (
    <div className="space-y-4">
      <Panel title="User Agent string">
        <textarea value={ua} onChange={(e) => setUa(e.target.value)} className={textareaCls("min-h-[100px]")} spellCheck={false} />
      </Panel>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          ["Browser", `${r.browser}${r.browserVersion ? ` ${r.browserVersion}` : ""}`],
          ["Engine", r.engine],
          ["OS", `${r.os}${r.osVersion ? ` ${r.osVersion}` : ""}`],
          ["Device", r.device],
          ["Is bot", r.bot ? "Yes" : "No"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-[var(--color-border)] p-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-[var(--color-muted)]">{k}</div>
              <div className="font-mono text-sm">{v}</div>
            </div>
            <CopyButton value={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
