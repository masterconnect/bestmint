"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

const SAMPLE = "https://user:pass@bestmint.com:8443/tools/developer/url-parser?q=hello+world&lang=en&page=2#results";

export default function UrlParser() {
  const [input, setInput] = useState(SAMPLE);

  const result = useMemo(() => {
    if (!input.trim()) return { ok: true as const, parts: null };
    try {
      const u = new URL(input.trim());
      const params: { key: string; value: string }[] = [];
      u.searchParams.forEach((v, k) => params.push({ key: k, value: v }));
      return {
        ok: true as const,
        parts: {
          href: u.href,
          scheme: u.protocol.replace(":", ""),
          username: u.username,
          password: u.password,
          host: u.host,
          hostname: u.hostname,
          port: u.port,
          pathname: u.pathname,
          search: u.search,
          hash: u.hash,
          origin: u.origin,
          params,
        },
      };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Invalid URL" };
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <Panel title="URL">
        <input value={input} onChange={(e) => setInput(e.target.value)} className={inputCls("font-mono")} placeholder="https://example.com/path?q=1" />
        {!result.ok && <p className="mt-2 text-sm text-red-400">{result.error}</p>}
      </Panel>
      {result.ok && result.parts && (
        <>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              ["Scheme", result.parts.scheme],
              ["Username", result.parts.username],
              ["Password", result.parts.password],
              ["Hostname", result.parts.hostname],
              ["Port", result.parts.port || "(default)"],
              ["Path", result.parts.pathname],
              ["Hash", result.parts.hash],
              ["Origin", result.parts.origin],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md border border-[var(--color-border)] p-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-xs text-[var(--color-muted)]">{k}</div>
                  <div className="font-mono text-sm break-all">{v || "(empty)"}</div>
                </div>
                <CopyButton value={v as string} />
              </div>
            ))}
          </div>
          <Panel title={`Query parameters (${result.parts.params.length})`}>
            {result.parts.params.length === 0 ? (
              <p className="text-[var(--color-muted)] text-sm">No query parameters.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-xs text-[var(--color-muted)] border-b border-[var(--color-border)]">
                  <tr>
                    <th className="text-left p-2">Key</th>
                    <th className="text-left p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {result.parts.params.map((p, i) => (
                    <tr key={i} className="border-b border-[var(--color-border)]/50">
                      <td className="p-2 font-mono">{p.key}</td>
                      <td className="p-2 font-mono break-all">{p.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Panel>
        </>
      )}
    </div>
  );
}
