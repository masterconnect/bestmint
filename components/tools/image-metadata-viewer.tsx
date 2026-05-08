"use client";
import { useState } from "react";
import { Panel } from "@/components/ui/panel";

const TAGS: Record<number, string> = {
  0x010f: "Make",
  0x0110: "Model",
  0x0112: "Orientation",
  0x011a: "XResolution",
  0x011b: "YResolution",
  0x0131: "Software",
  0x0132: "DateTime",
  0x9003: "DateTimeOriginal",
  0x9004: "DateTimeDigitized",
  0x829a: "ExposureTime",
  0x829d: "FNumber",
  0x8827: "ISO",
  0x920a: "FocalLength",
  0x9209: "Flash",
  0xa002: "PixelXDimension",
  0xa003: "PixelYDimension",
  0x8825: "GPSInfoIFD",
};

const TYPE_SIZES: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };

function readVal(dv: DataView, offset: number, type: number, count: number, le: boolean): unknown {
  const sz = TYPE_SIZES[type] || 1;
  const total = sz * count;
  if (type === 2) {
    let s = "";
    for (let i = 0; i < count; i++) {
      const c = dv.getUint8(offset + i);
      if (c === 0) break;
      s += String.fromCharCode(c);
    }
    return s.trim();
  }
  if (type === 3) return dv.getUint16(offset, le);
  if (type === 4) return dv.getUint32(offset, le);
  if (type === 5) {
    const n = dv.getUint32(offset, le);
    const d = dv.getUint32(offset + 4, le);
    return d === 0 ? n : `${n}/${d} (${(n / d).toFixed(3)})`;
  }
  if (type === 10) {
    const n = dv.getInt32(offset, le);
    const d = dv.getInt32(offset + 4, le);
    return d === 0 ? n : `${n}/${d} (${(n / d).toFixed(3)})`;
  }
  return `[${type}:${count}:${total}B]`;
}

function parseExif(buf: ArrayBuffer): Record<string, unknown> | null {
  const dv = new DataView(buf);
  if (dv.getUint16(0) !== 0xffd8) return null;
  let offset = 2;
  while (offset < dv.byteLength - 4) {
    const marker = dv.getUint16(offset);
    if (marker === 0xffe1) {
      const len = dv.getUint16(offset + 2);
      // "Exif\0\0"
      if (dv.getUint32(offset + 4) === 0x45786966) {
        const tiffStart = offset + 10;
        const byteOrder = dv.getUint16(tiffStart);
        const le = byteOrder === 0x4949;
        const ifdOffset = dv.getUint32(tiffStart + 4, le);
        const ifd = tiffStart + ifdOffset;
        const entries = dv.getUint16(ifd, le);
        const out: Record<string, unknown> = {};
        for (let i = 0; i < entries; i++) {
          const e = ifd + 2 + i * 12;
          const tag = dv.getUint16(e, le);
          const type = dv.getUint16(e + 2, le);
          const count = dv.getUint32(e + 4, le);
          const sz = (TYPE_SIZES[type] || 1) * count;
          const valOffset = sz <= 4 ? e + 8 : tiffStart + dv.getUint32(e + 8, le);
          const name = TAGS[tag];
          if (name) {
            try { out[name] = readVal(dv, valOffset, type, count, le); } catch { /* skip */ }
          }
        }
        return out;
      }
      offset += 2 + len;
    } else if ((marker & 0xff00) === 0xff00) {
      const len = dv.getUint16(offset + 2);
      offset += 2 + len;
    } else break;
  }
  return null;
}

export default function ImageMetadataViewer() {
  const [info, setInfo] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  async function load(file: File) {
    setError(null); setInfo(null);
    setName(file.name);
    if (!file.type.startsWith("image/")) { setError("Please upload an image (JPEG works best for EXIF)."); return; }
    const buf = await file.arrayBuffer();
    const data = parseExif(buf);
    if (!data || Object.keys(data).length === 0) {
      setError("No EXIF metadata found. PNG/WebP/GIF generally do not embed EXIF; try a JPEG straight from a camera.");
    } else {
      setInfo(data);
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="Source (JPEG with EXIF)">
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer cursor-pointer" />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </Panel>
      {info && (
        <Panel title={`EXIF tags · ${name}`}>
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(info).map(([k, v]) => (
                <tr key={k} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="py-1.5 pr-4 font-medium">{k}</td>
                  <td className="py-1.5 font-mono text-xs">{String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </div>
  );
}
