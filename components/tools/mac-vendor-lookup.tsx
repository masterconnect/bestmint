"use client";
import { useMemo, useState } from "react";
import { inputCls, Panel } from "@/components/ui/panel";

const OUI: Record<string, string> = {
  "00:00:0C": "Cisco Systems",
  "00:1B:63": "Apple",
  "00:1E:C2": "Apple",
  "00:23:DF": "Apple",
  "00:25:00": "Apple",
  "00:26:08": "Apple",
  "00:26:B0": "Apple",
  "00:26:BB": "Apple",
  "00:1A:11": "Google",
  "F4:F5:E8": "Google",
  "00:1D:0F": "TP-Link",
  "00:25:9C": "Cisco-Linksys",
  "00:0F:66": "Cisco-Linksys",
  "00:13:10": "Linksys",
  "00:14:6C": "Netgear",
  "00:09:5B": "Netgear",
  "00:1F:33": "Netgear",
  "00:18:39": "Cisco",
  "00:1A:A1": "Cisco",
  "00:24:A8": "Cisco",
  "00:1C:F0": "D-Link",
  "00:21:91": "D-Link",
  "00:13:46": "D-Link",
  "00:50:F2": "Microsoft",
  "00:03:FF": "Microsoft",
  "0C:8B:FD": "Intel",
  "00:1B:21": "Intel",
  "00:15:17": "Intel",
  "00:1C:42": "Parallels",
  "00:50:56": "VMware",
  "00:0C:29": "VMware",
  "00:05:69": "VMware",
  "08:00:27": "Oracle VirtualBox",
  "00:16:3E": "Xensource (Xen)",
  "00:15:5D": "Microsoft Hyper-V",
  "B8:27:EB": "Raspberry Pi Foundation",
  "DC:A6:32": "Raspberry Pi Trading",
  "E4:5F:01": "Raspberry Pi Trading",
  "00:24:36": "Apple",
  "3C:07:54": "Apple",
  "F0:18:98": "Apple",
  "F0:DB:E2": "Apple",
  "00:1E:8C": "ASUS",
  "00:24:8C": "ASUS",
  "BC:AE:C5": "ASUS",
  "00:0E:35": "Intel",
  "B0:48:7A": "TP-Link",
  "00:1F:5B": "Apple",
  "C8:BC:C8": "Apple",
  "00:24:E8": "Dell",
  "00:14:22": "Dell",
  "B8:CA:3A": "Dell",
  "00:30:48": "Supermicro",
  "00:08:74": "Dell",
  "00:1A:A0": "Dell",
  "00:1E:4F": "Dell",
  "B0:83:FE": "Dell",
  "00:1B:78": "HP (Hewlett Packard)",
  "00:25:B3": "HP",
  "00:21:5A": "HP",
  "00:30:6E": "HP",
  "70:5A:0F": "HP",
  "F4:CE:46": "HP",
  "00:0E:7F": "HP",
  "00:1C:C4": "HP",
  "00:1A:4B": "HP",
  "00:0D:9D": "HP",
  "08:00:20": "Sun Microsystems",
  "00:14:4F": "Sun Microsystems",
  "00:03:BA": "Sun Microsystems",
  "00:1B:24": "Quanta Computer",
  "00:1F:16": "Wistron",
  "00:14:51": "Apple",
  "00:1C:B3": "Apple",
  "00:23:32": "Apple",
  "00:23:6C": "Apple",
  "00:25:4B": "Apple",
  "00:26:4A": "Apple",
  "00:0C:42": "Routerboard.com (MikroTik)",
  "4C:5E:0C": "MikroTik",
  "E4:8D:8C": "Routerboard (MikroTik)",
  "00:1F:3F": "AVM (Fritz!Box)",
  "00:0A:95": "Apple",
  "00:0D:93": "Apple",
  "00:11:24": "Apple",
  "00:16:CB": "Apple",
  "00:17:F2": "Apple",
  "F0:25:B7": "Samsung",
  "00:12:FB": "Samsung",
  "00:23:39": "Samsung",
  "00:26:37": "Samsung",
  "BC:F5:AC": "Samsung",
  "00:1D:25": "Samsung",
  "00:21:19": "Samsung",
  "B0:DF:3A": "Samsung",
  "00:18:60": "Sony",
  "00:24:8D": "Sony",
  "00:13:A9": "Sony",
  "00:1A:80": "Sony",
  "00:0C:76": "MSI",
  "00:0D:88": "D-Link",
  "00:E0:4C": "Realtek",
  "00:21:E9": "Apple",
};

function normalize(mac: string): string | null {
  const cleaned = mac.replace(/[^0-9a-fA-F]/g, "").toUpperCase();
  if (cleaned.length < 6) return null;
  return cleaned.slice(0, 6).match(/.{2}/g)!.join(":");
}

export default function MacVendorLookup() {
  const [input, setInput] = useState("00:1B:63:84:45:E6");
  const result = useMemo(() => {
    const oui = normalize(input);
    if (!oui) return { ok: false as const, error: "Enter at least 3 bytes (OUI)" };
    return { ok: true as const, oui, vendor: OUI[oui] || "Unknown (not in our local database)" };
  }, [input]);

  return (
    <div className="space-y-4">
      <Panel title="MAC address (any format)">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="00:1B:63:84:45:E6" className={inputCls("font-mono")} />
        {!result.ok && <p className="mt-2 text-sm text-red-400">{result.error}</p>}
      </Panel>
      {result.ok && (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
          <div className="text-xs text-[var(--color-muted)]">OUI</div>
          <div className="text-2xl font-mono">{result.oui}</div>
          <div className="text-xs text-[var(--color-muted)] mt-3">Vendor</div>
          <div className="text-xl">{result.vendor}</div>
        </div>
      )}
      <p className="text-xs text-[var(--color-muted)]">Lookup uses a built-in mini OUI table (~100 popular vendors). For the full IEEE OUI registry, see https://standards-oui.ieee.org/</p>
    </div>
  );
}
