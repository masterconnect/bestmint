"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

function ipToInt(ip: string): number {
  const parts = ip.split(".").map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) throw new Error("Invalid IPv4 address");
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}
function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}
function intToBin(n: number): string {
  return n.toString(2).padStart(32, "0").match(/.{8}/g)!.join(".");
}

function calc(cidr: string) {
  const [ip, prefStr] = cidr.split("/");
  const prefix = parseInt(prefStr, 10);
  if (Number.isNaN(prefix) || prefix < 0 || prefix > 32) throw new Error("Prefix must be 0-32");
  const ipInt = ipToInt(ip);
  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = 2 ** (32 - prefix);
  const usable = prefix >= 31 ? total : total - 2;
  const first = prefix >= 31 ? network : (network + 1) >>> 0;
  const last = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;
  return {
    address: ip,
    prefix,
    netmask: intToIp(mask),
    wildcard: intToIp((~mask) >>> 0),
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    firstHost: intToIp(first),
    lastHost: intToIp(last),
    totalAddresses: total,
    usableHosts: usable,
    binaryMask: intToBin(mask),
    networkBinary: intToBin(network),
  };
}

export default function IpSubnetCalculator() {
  const [cidr, setCidr] = useState("192.168.1.10/24");
  const result = useMemo(() => {
    try { return { ok: true as const, data: calc(cidr.trim()) }; }
    catch (e) { return { ok: false as const, error: e instanceof Error ? e.message : "Invalid CIDR" }; }
  }, [cidr]);

  return (
    <div className="space-y-4">
      <Panel title="CIDR">
        <input value={cidr} onChange={(e) => setCidr(e.target.value)} placeholder="192.168.1.0/24" className={inputCls("font-mono")} />
        {!result.ok && <p className="mt-2 text-sm text-red-400">{result.error}</p>}
      </Panel>
      {result.ok && (
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            ["Network address", result.data.network],
            ["Broadcast address", result.data.broadcast],
            ["Subnet mask", result.data.netmask],
            ["Wildcard mask", result.data.wildcard],
            ["First host", result.data.firstHost],
            ["Last host", result.data.lastHost],
            ["Usable hosts", result.data.usableHosts.toLocaleString()],
            ["Total addresses", result.data.totalAddresses.toLocaleString()],
            ["Binary mask", result.data.binaryMask],
            ["Binary network", result.data.networkBinary],
          ].map(([k, v]) => (
            <div key={k} className="rounded-md border border-[var(--color-border)] p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs text-[var(--color-muted)]">{k}</div>
                <div className="font-mono text-sm break-all">{v}</div>
              </div>
              <CopyButton value={v as string} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
