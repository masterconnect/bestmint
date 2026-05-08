"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

export default function CanonicalTagGenerator() {
  const [url, setUrl] = useState("https://example.com/page");

  const valid = useMemo(() => {
    try { const u = new URL(url); return u.protocol === "http:" || u.protocol === "https:"; } catch { return false; }
  }, [url]);

  const out = `<link rel="canonical" href="${url}">`;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Panel title="Canonical URL">
        <label className="block"><span className="block text-xs text-[var(--color-muted)] mb-1">Full URL (including https://)</span>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls()} placeholder="https://example.com/page" />
        </label>
        {!valid && url && <p className="mt-2 text-xs text-amber-400">URL doesn&apos;t look valid — canonical tags must be absolute, with http(s) scheme.</p>}
        <p className="mt-3 text-xs text-[var(--color-muted)]">Use one canonical per page, pointing to the preferred URL — no trailing redirects.</p>
      </Panel>
      <Panel title="<head> snippet" action={<CopyButton value={out} />}>
        <pre className="font-mono text-xs whitespace-pre-wrap break-words rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3">{out}</pre>
      </Panel>
    </div>
  );
}
