"use client";
import { useEffect, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { Panel, textareaCls } from "@/components/ui/panel";

// Pure-JS MD5 (small, well-known) — used because Web Crypto doesn't expose MD5.
// Adapted from public-domain implementations.
function md5(input: string): string {
  function rotl(x: number, n: number) { return (x << n) | (x >>> (32 - n)); }
  function add32(a: number, b: number) { return (a + b) & 0xffffffff; }
  function f(x: number, y: number, z: number) { return (x & y) | (~x & z); }
  function g(x: number, y: number, z: number) { return (x & z) | (y & ~z); }
  function h(x: number, y: number, z: number) { return x ^ y ^ z; }
  function ii(x: number, y: number, z: number) { return y ^ (x | ~z); }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return add32(rotl(add32(add32(a, f(b, c, d)), add32(x, t)), s), b); }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return add32(rotl(add32(add32(a, g(b, c, d)), add32(x, t)), s), b); }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return add32(rotl(add32(add32(a, h(b, c, d)), add32(x, t)), s), b); }
  function ii_(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return add32(rotl(add32(add32(a, ii(b, c, d)), add32(x, t)), s), b); }

  const bytes = new TextEncoder().encode(input);
  const len = bytes.length;
  const numBlocks = ((len + 8) >> 6) + 1;
  const blocks: number[] = new Array(numBlocks * 16).fill(0);
  for (let i = 0; i < len; i++) blocks[i >> 2] |= bytes[i] << ((i & 3) * 8);
  blocks[len >> 2] |= 0x80 << ((len & 3) * 8);
  blocks[numBlocks * 16 - 2] = len * 8;

  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  for (let i = 0; i < blocks.length; i += 16) {
    const oa = a, ob = b, oc = c, od = d;
    a = ff(a, b, c, d, blocks[i + 0], 7, 0xd76aa478); d = ff(d, a, b, c, blocks[i + 1], 12, 0xe8c7b756);
    c = ff(c, d, a, b, blocks[i + 2], 17, 0x242070db); b = ff(b, c, d, a, blocks[i + 3], 22, 0xc1bdceee);
    a = ff(a, b, c, d, blocks[i + 4], 7, 0xf57c0faf); d = ff(d, a, b, c, blocks[i + 5], 12, 0x4787c62a);
    c = ff(c, d, a, b, blocks[i + 6], 17, 0xa8304613); b = ff(b, c, d, a, blocks[i + 7], 22, 0xfd469501);
    a = ff(a, b, c, d, blocks[i + 8], 7, 0x698098d8); d = ff(d, a, b, c, blocks[i + 9], 12, 0x8b44f7af);
    c = ff(c, d, a, b, blocks[i + 10], 17, 0xffff5bb1); b = ff(b, c, d, a, blocks[i + 11], 22, 0x895cd7be);
    a = ff(a, b, c, d, blocks[i + 12], 7, 0x6b901122); d = ff(d, a, b, c, blocks[i + 13], 12, 0xfd987193);
    c = ff(c, d, a, b, blocks[i + 14], 17, 0xa679438e); b = ff(b, c, d, a, blocks[i + 15], 22, 0x49b40821);

    a = gg(a, b, c, d, blocks[i + 1], 5, 0xf61e2562); d = gg(d, a, b, c, blocks[i + 6], 9, 0xc040b340);
    c = gg(c, d, a, b, blocks[i + 11], 14, 0x265e5a51); b = gg(b, c, d, a, blocks[i + 0], 20, 0xe9b6c7aa);
    a = gg(a, b, c, d, blocks[i + 5], 5, 0xd62f105d); d = gg(d, a, b, c, blocks[i + 10], 9, 0x02441453);
    c = gg(c, d, a, b, blocks[i + 15], 14, 0xd8a1e681); b = gg(b, c, d, a, blocks[i + 4], 20, 0xe7d3fbc8);
    a = gg(a, b, c, d, blocks[i + 9], 5, 0x21e1cde6); d = gg(d, a, b, c, blocks[i + 14], 9, 0xc33707d6);
    c = gg(c, d, a, b, blocks[i + 3], 14, 0xf4d50d87); b = gg(b, c, d, a, blocks[i + 8], 20, 0x455a14ed);
    a = gg(a, b, c, d, blocks[i + 13], 5, 0xa9e3e905); d = gg(d, a, b, c, blocks[i + 2], 9, 0xfcefa3f8);
    c = gg(c, d, a, b, blocks[i + 7], 14, 0x676f02d9); b = gg(b, c, d, a, blocks[i + 12], 20, 0x8d2a4c8a);

    a = hh(a, b, c, d, blocks[i + 5], 4, 0xfffa3942); d = hh(d, a, b, c, blocks[i + 8], 11, 0x8771f681);
    c = hh(c, d, a, b, blocks[i + 11], 16, 0x6d9d6122); b = hh(b, c, d, a, blocks[i + 14], 23, 0xfde5380c);
    a = hh(a, b, c, d, blocks[i + 1], 4, 0xa4beea44); d = hh(d, a, b, c, blocks[i + 4], 11, 0x4bdecfa9);
    c = hh(c, d, a, b, blocks[i + 7], 16, 0xf6bb4b60); b = hh(b, c, d, a, blocks[i + 10], 23, 0xbebfbc70);
    a = hh(a, b, c, d, blocks[i + 13], 4, 0x289b7ec6); d = hh(d, a, b, c, blocks[i + 0], 11, 0xeaa127fa);
    c = hh(c, d, a, b, blocks[i + 3], 16, 0xd4ef3085); b = hh(b, c, d, a, blocks[i + 6], 23, 0x04881d05);
    a = hh(a, b, c, d, blocks[i + 9], 4, 0xd9d4d039); d = hh(d, a, b, c, blocks[i + 12], 11, 0xe6db99e5);
    c = hh(c, d, a, b, blocks[i + 15], 16, 0x1fa27cf8); b = hh(b, c, d, a, blocks[i + 2], 23, 0xc4ac5665);

    a = ii_(a, b, c, d, blocks[i + 0], 6, 0xf4292244); d = ii_(d, a, b, c, blocks[i + 7], 10, 0x432aff97);
    c = ii_(c, d, a, b, blocks[i + 14], 15, 0xab9423a7); b = ii_(b, c, d, a, blocks[i + 5], 21, 0xfc93a039);
    a = ii_(a, b, c, d, blocks[i + 12], 6, 0x655b59c3); d = ii_(d, a, b, c, blocks[i + 3], 10, 0x8f0ccc92);
    c = ii_(c, d, a, b, blocks[i + 10], 15, 0xffeff47d); b = ii_(b, c, d, a, blocks[i + 1], 21, 0x85845dd1);
    a = ii_(a, b, c, d, blocks[i + 8], 6, 0x6fa87e4f); d = ii_(d, a, b, c, blocks[i + 15], 10, 0xfe2ce6e0);
    c = ii_(c, d, a, b, blocks[i + 6], 15, 0xa3014314); b = ii_(b, c, d, a, blocks[i + 13], 21, 0x4e0811a1);
    a = ii_(a, b, c, d, blocks[i + 4], 6, 0xf7537e82); d = ii_(d, a, b, c, blocks[i + 11], 10, 0xbd3af235);
    c = ii_(c, d, a, b, blocks[i + 2], 15, 0x2ad7d2bb); b = ii_(b, c, d, a, blocks[i + 9], 21, 0xeb86d391);

    a = add32(a, oa); b = add32(b, ob); c = add32(c, oc); d = add32(d, od);
  }
  function toHex(n: number) {
    let s = "";
    for (let i = 0; i < 4; i++) s += ((n >> (i * 8)) & 0xff).toString(16).padStart(2, "0");
    return s;
  }
  return toHex(a) + toHex(b) + toHex(c) + toHex(d);
}

async function sha(algo: "SHA-1" | "SHA-256" | "SHA-512", input: string) {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("Hello, BestMint!");
  const [hashes, setHashes] = useState<{ algo: string; value: string }[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const out = [
        { algo: "MD5", value: md5(input) },
        { algo: "SHA-1", value: await sha("SHA-1", input) },
        { algo: "SHA-256", value: await sha("SHA-256", input) },
        { algo: "SHA-512", value: await sha("SHA-512", input) },
      ];
      if (!cancelled) setHashes(out);
    })();
    return () => { cancelled = true; };
  }, [input]);

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls("min-h-[120px]")} />
      </Panel>
      <div className="space-y-2">
        {hashes.map((h) => (
          <div key={h.algo} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--color-muted)]">{h.algo}</span>
              <CopyButton value={h.value} />
            </div>
            <div className="mt-2 font-mono text-xs break-all">{h.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
