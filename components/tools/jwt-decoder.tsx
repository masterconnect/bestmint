"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

function b64urlDecode(s: string) {
  let str = s.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

const SAMPLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNzMwODAwMDAwLCJleHAiOjE5MDAwMDAwMDB9.dummy_signature";

export default function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE);
  const decoded = useMemo(() => {
    const parts = token.trim().split(".");
    if (parts.length < 2) return { error: "Token must have at least 2 parts (header.payload)" };
    try {
      const header = JSON.parse(b64urlDecode(parts[0]));
      const payload = JSON.parse(b64urlDecode(parts[1]));
      return { header, payload, signature: parts[2] ?? "" };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Decode error" };
    }
  }, [token]);

  const claimNote = (k: string, v: unknown) => {
    if ((k === "exp" || k === "iat" || k === "nbf") && typeof v === "number") {
      return new Date(v * 1000).toUTCString();
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <Panel title="JWT" action={<button className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)]" onClick={() => setToken(SAMPLE)}>Use sample</button>}>
        <textarea value={token} onChange={(e) => setToken(e.target.value)} className={textareaCls("font-mono break-all min-h-[120px]")} />
      </Panel>
      {"error" in decoded ? (
        <p className="text-red-400 text-sm">{decoded.error}</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          <Panel title="Header" action={<CopyButton value={JSON.stringify(decoded.header, null, 2)} />}>
            <pre className="font-mono text-sm whitespace-pre-wrap break-words">{JSON.stringify(decoded.header, null, 2)}</pre>
          </Panel>
          <Panel title="Payload" action={<CopyButton value={JSON.stringify(decoded.payload, null, 2)} />}>
            <pre className="font-mono text-sm whitespace-pre-wrap break-words">{JSON.stringify(decoded.payload, null, 2)}</pre>
            <div className="mt-3 text-xs text-[var(--color-muted)] space-y-1">
              {Object.entries(decoded.payload as Record<string, unknown>).map(([k, v]) => {
                const n = claimNote(k, v);
                return n ? <div key={k}><strong>{k}</strong>: {n}</div> : null;
              })}
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
