"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel, textareaCls } from "@/components/ui/panel";

function b64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function strToB64url(s: string): string {
  return b64url(new TextEncoder().encode(s));
}

async function signHmac(algo: "SHA-256" | "SHA-384" | "SHA-512", secret: string, data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: { name: algo } },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return b64url(new Uint8Array(sig));
}

const ALGOS: Record<string, "SHA-256" | "SHA-384" | "SHA-512"> = {
  HS256: "SHA-256",
  HS384: "SHA-384",
  HS512: "SHA-512",
};

export default function JwtBuilder() {
  const [header, setHeader] = useState(`{\n  "alg": "HS256",\n  "typ": "JWT"\n}`);
  const [payload, setPayload] = useState(`{\n  "sub": "1234567890",\n  "name": "Jane Doe",\n  "iat": ${Math.floor(Date.now() / 1000)}\n}`);
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [token, setToken] = useState("");
  const [err, setErr] = useState("");

  async function build() {
    setErr(""); setToken("");
    try {
      const h = JSON.parse(header);
      JSON.parse(payload); // validate
      const algName = (h.alg as string) || "HS256";
      const algo = ALGOS[algName];
      if (!algo) throw new Error(`Unsupported alg "${algName}". Use HS256, HS384, or HS512.`);
      const headB64 = strToB64url(JSON.stringify(h));
      const payloadB64 = strToB64url(payload.trim());
      const signing = `${headB64}.${payloadB64}`;
      const sig = await signHmac(algo, secret, signing);
      setToken(`${signing}.${sig}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Build error");
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Header (JSON)">
          <textarea value={header} onChange={(e) => setHeader(e.target.value)} className={textareaCls("min-h-[140px]")} spellCheck={false} />
        </Panel>
        <Panel title="Payload (JSON)">
          <textarea value={payload} onChange={(e) => setPayload(e.target.value)} className={textareaCls("min-h-[140px]")} spellCheck={false} />
        </Panel>
      </div>
      <Panel title="Secret (HMAC)">
        <input value={secret} onChange={(e) => setSecret(e.target.value)} className={inputCls("font-mono")} />
      </Panel>
      <button onClick={build} className={btnPrimary("text-sm")}>Sign JWT</button>
      {err && <p className="text-red-400 text-sm">{err}</p>}
      {token && (
        <Panel title="JWT" action={<CopyButton value={token} />}>
          <code className="block font-mono text-xs break-all py-2">{token}</code>
        </Panel>
      )}
    </div>
  );
}
