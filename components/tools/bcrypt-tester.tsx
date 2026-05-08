"use client";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, inputCls, Panel } from "@/components/ui/panel";

export default function BcryptTester() {
  const [mode, setMode] = useState<"hash" | "verify">("hash");
  const [pw, setPw] = useState("hello-world");
  const [rounds, setRounds] = useState(10);
  const [hash, setHash] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<null | boolean>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function doHash() {
    setErr("");
    setBusy(true);
    try {
      const salt = await bcrypt.genSalt(rounds);
      const h = await bcrypt.hash(pw, salt);
      setHash(h);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Hash error");
    } finally {
      setBusy(false);
    }
  }

  async function doVerify() {
    setErr("");
    setBusy(true);
    setVerifyResult(null);
    try {
      const ok = await bcrypt.compare(pw, verifyHash);
      setVerifyResult(ok);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Verify error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="Mode">
        <div className="flex gap-2">
          <button className={mode === "hash" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("hash")}>Hash</button>
          <button className={mode === "verify" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setMode("verify")}>Verify</button>
        </div>
      </Panel>
      <Panel title="Password">
        <input value={pw} onChange={(e) => setPw(e.target.value)} className={inputCls("font-mono")} />
      </Panel>
      {mode === "hash" ? (
        <>
          <Panel title="Cost rounds (4-12, higher = slower & stronger)">
            <input type="range" min={4} max={12} value={rounds} onChange={(e) => setRounds(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
            <div className="text-sm text-[var(--color-muted)] mt-1">{rounds} rounds (~{2 ** (rounds - 10)}× cost vs default)</div>
          </Panel>
          <button onClick={doHash} disabled={busy} className={btnPrimary("")}>{busy ? "Hashing…" : "Generate hash"}</button>
          {hash && (
            <Panel title="bcrypt hash" action={<CopyButton value={hash} />}>
              <code className="block font-mono text-xs break-all py-2">{hash}</code>
            </Panel>
          )}
        </>
      ) : (
        <>
          <Panel title="Hash to verify against">
            <input value={verifyHash} onChange={(e) => setVerifyHash(e.target.value)} className={inputCls("font-mono")} placeholder="$2a$10$…" />
          </Panel>
          <button onClick={doVerify} disabled={busy} className={btnPrimary("")}>{busy ? "Verifying…" : "Check match"}</button>
          {verifyResult !== null && (
            <div className={`rounded-md border border-[var(--color-border)] p-4 text-center ${verifyResult ? "text-emerald-400" : "text-red-400"}`}>
              {verifyResult ? "Match — password is correct" : "No match"}
            </div>
          )}
        </>
      )}
      {err && <p className="text-red-400 text-sm">{err}</p>}
    </div>
  );
}
