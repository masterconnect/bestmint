"use client";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

async function sha1Base64(s: string) {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(s));
  let bin = "";
  const arr = new Uint8Array(buf);
  for (const b of arr) bin += String.fromCharCode(b);
  return btoa(bin);
}

export default function HtpasswdGenerator() {
  const [user, setUser] = useState("admin");
  const [pw, setPw] = useState("changeme");
  const [algo, setAlgo] = useState<"bcrypt" | "sha">("bcrypt");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function generate() {
    setErr(""); setBusy(true);
    try {
      let line = "";
      if (algo === "bcrypt") {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pw, salt);
        line = `${user}:${hash}`;
      } else {
        const h = await sha1Base64(pw);
        line = `${user}:{SHA}${h}`;
      }
      setOut(line);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="Credentials">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Username</span>
            <input value={user} onChange={(e) => setUser(e.target.value)} className={inputCls("font-mono")} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-muted)]">Password</span>
            <input value={pw} onChange={(e) => setPw(e.target.value)} className={inputCls("font-mono")} />
          </label>
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs text-[var(--color-muted)]">Algorithm</span>
            <select value={algo} onChange={(e) => setAlgo(e.target.value as "bcrypt" | "sha")} className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm">
              <option value="bcrypt">bcrypt (recommended)</option>
              <option value="sha">SHA-1 (legacy, not recommended)</option>
            </select>
          </label>
        </div>
        <button onClick={generate} disabled={busy} className={btnPrimary("text-sm mt-3")}>{busy ? "Generating…" : "Generate"}</button>
      </Panel>
      {err && <p className="text-red-400 text-sm">{err}</p>}
      {out && (
        <Panel title=".htpasswd line" action={<CopyButton value={out} />}>
          <code className="block font-mono text-xs break-all py-2">{out}</code>
        </Panel>
      )}
    </div>
  );
}
