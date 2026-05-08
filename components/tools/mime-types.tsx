"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { inputCls, Panel } from "@/components/ui/panel";

const MIME: Record<string, string> = {
  txt: "text/plain", csv: "text/csv", html: "text/html", htm: "text/html", css: "text/css",
  js: "text/javascript", mjs: "text/javascript", json: "application/json", xml: "application/xml",
  yaml: "application/yaml", yml: "application/yaml", md: "text/markdown",
  pdf: "application/pdf", rtf: "application/rtf",
  doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel", xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint", pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  odt: "application/vnd.oasis.opendocument.text", ods: "application/vnd.oasis.opendocument.spreadsheet",
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp",
  svg: "image/svg+xml", bmp: "image/bmp", ico: "image/vnd.microsoft.icon", tif: "image/tiff",
  tiff: "image/tiff", avif: "image/avif", heic: "image/heic", heif: "image/heif",
  mp3: "audio/mpeg", wav: "audio/wav", ogg: "audio/ogg", oga: "audio/ogg", flac: "audio/flac",
  aac: "audio/aac", m4a: "audio/mp4", weba: "audio/webm",
  mp4: "video/mp4", m4v: "video/mp4", webm: "video/webm", ogv: "video/ogg",
  mov: "video/quicktime", avi: "video/x-msvideo", mkv: "video/x-matroska",
  zip: "application/zip", "7z": "application/x-7z-compressed", rar: "application/vnd.rar",
  tar: "application/x-tar", gz: "application/gzip", bz2: "application/x-bzip2",
  woff: "font/woff", woff2: "font/woff2", ttf: "font/ttf", otf: "font/otf", eot: "application/vnd.ms-fontobject",
  exe: "application/octet-stream", dmg: "application/x-apple-diskimage", iso: "application/x-iso9660-image",
  apk: "application/vnd.android.package-archive", deb: "application/vnd.debian.binary-package",
  jar: "application/java-archive", war: "application/java-archive",
  sh: "application/x-sh", py: "text/x-python", rb: "text/x-ruby", go: "text/x-go",
  c: "text/x-c", h: "text/x-c", cpp: "text/x-c++", java: "text/x-java", php: "application/x-php",
  ts: "text/x-typescript", tsx: "text/x-typescript", jsx: "text/x-jsx",
  swift: "text/x-swift", rs: "text/x-rust", kt: "text/x-kotlin", scala: "text/x-scala",
  sql: "application/sql",
  ics: "text/calendar", vcf: "text/vcard",
  epub: "application/epub+zip", mobi: "application/x-mobipocket-ebook",
  rss: "application/rss+xml", atom: "application/atom+xml",
  wasm: "application/wasm", bin: "application/octet-stream",
  ai: "application/postscript", eps: "application/postscript", ps: "application/postscript",
  psd: "image/vnd.adobe.photoshop",
};

const REVERSE: Record<string, string[]> = {};
for (const [ext, m] of Object.entries(MIME)) {
  if (!REVERSE[m]) REVERSE[m] = [];
  REVERSE[m].push(ext);
}

export default function MimeTypes() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const all = Object.entries(MIME).map(([ext, mime]) => ({ ext, mime }));
    if (!q.trim()) return all.sort((a, b) => a.ext.localeCompare(b.ext));
    const needle = q.toLowerCase().replace(/^\./, "");
    return all
      .filter(({ ext, mime }) => ext.includes(needle) || mime.toLowerCase().includes(needle))
      .sort((a, b) => a.ext.localeCompare(b.ext));
  }, [q]);

  return (
    <div className="space-y-4">
      <Panel title="Search">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try: pdf, image/png, json…" className={inputCls()} />
      </Panel>
      <Panel title={`${list.length} results`}>
        <div className="grid sm:grid-cols-2 gap-2">
          {list.map(({ ext, mime }) => (
            <div key={ext} className="rounded-md border border-[var(--color-border)] p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm font-mono">.{ext}</div>
                <div className="text-xs text-[var(--color-muted)] break-all">{mime}</div>
              </div>
              <CopyButton value={mime} label="Copy" />
            </div>
          ))}
          {list.length === 0 && <p className="text-[var(--color-muted)] text-sm col-span-2">No matches.</p>}
        </div>
      </Panel>
    </div>
  );
}
