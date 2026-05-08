"use client";
import { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const ADJ = ["happy", "swift", "brave", "calm", "clever", "cool", "daring", "eager", "epic", "fancy", "fierce", "friendly", "funny", "gentle", "giant", "glad", "golden", "great", "grand", "kind", "lucky", "magic", "mighty", "noble", "polite", "proud", "quick", "quiet", "rapid", "royal", "sharp", "shiny", "silent", "silly", "smart", "snappy", "spicy", "sunny", "super", "vivid", "wild", "wise", "witty", "young", "zesty", "bold", "bright", "chill", "crisp", "dapper", "elite", "fluffy", "frosty", "fuzzy", "gleaming", "groovy", "humble", "icy", "jolly", "jumpy", "lively", "mellow", "merry", "nimble", "peppy", "plucky", "quirky", "radiant", "rugged", "savvy", "sleek", "smooth", "spry", "sturdy", "swirly", "tame", "tender", "tidy", "trusty", "upbeat", "vivid", "wavy", "whirly", "zen", "lush", "stellar", "cosmic", "lunar", "solar", "wandering", "playful", "curious", "bouncy", "feisty", "snazzy", "vibrant", "graceful", "soaring", "twinkly", "spirited", "regal"];
const NOUN = ["panda", "tiger", "fox", "wolf", "bear", "eagle", "hawk", "owl", "lion", "otter", "raven", "shark", "whale", "dolphin", "lynx", "jaguar", "puma", "falcon", "viper", "cobra", "phoenix", "dragon", "yeti", "ninja", "wizard", "ranger", "knight", "pirate", "ghost", "robot", "rocket", "comet", "planet", "star", "moon", "river", "ocean", "mountain", "forest", "valley", "canyon", "meadow", "garden", "harbor", "island", "summit", "ember", "frost", "shadow", "thunder", "blossom", "willow", "maple", "cedar", "pebble", "boulder", "cactus", "lotus", "ivy", "fern", "berry", "apple", "mango", "lemon", "peach", "ginger", "coffee", "muffin", "cookie", "biscuit", "noodle", "pretzel", "pickle", "pancake", "waffle", "donut", "cupcake", "puzzle", "compass", "lantern", "anchor", "ladder", "telescope", "kettle", "feather", "marble", "ribbon", "kite", "beacon", "hammer", "compass", "satellite", "atlas", "engine", "guitar", "trumpet", "piano", "violin", "drum", "lighthouse", "harbor", "voyager"];

function rd(n: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
function pick<T>(arr: T[]) { return arr[rd(arr.length)]; }

function gen(sep: string, addNum: boolean, capitalize: boolean) {
  const a = pick(ADJ);
  const n = pick(NOUN);
  const formatted = capitalize ? `${a[0].toUpperCase()}${a.slice(1)}${sep}${n[0].toUpperCase()}${n.slice(1)}` : `${a}${sep}${n}`;
  return addNum ? `${formatted}${rd(100)}` : formatted;
}

export default function UsernameGenerator() {
  const [count, setCount] = useState(12);
  const [sep, setSep] = useState("");
  const [addNum, setAddNum] = useState(false);
  const [cap, setCap] = useState(false);
  const [list, setList] = useState<string[]>(() => Array.from({ length: 12 }, () => gen("", false, false)));

  function regen() { setList(Array.from({ length: count }, () => gen(sep, addNum, cap))); }

  return (
    <div className="space-y-4">
      <Panel title="Options">
        <div className="grid sm:grid-cols-4 gap-3">
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Count</span>
            <input type="number" min={1} max={500} value={count} onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} className={inputCls()} />
          </label>
          <label className="block">
            <span className="block text-xs text-[var(--color-muted)] mb-1">Separator</span>
            <select value={sep} onChange={(e) => setSep(e.target.value)} className={inputCls()}>
              <option value="">none</option>
              <option value="-">-</option>
              <option value="_">_</option>
              <option value=".">.</option>
            </select>
          </label>
          <label className="flex items-center gap-2 mt-6 text-sm">
            <input type="checkbox" checked={addNum} onChange={(e) => setAddNum(e.target.checked)} className="accent-[var(--color-accent)]" />
            Append number
          </label>
          <label className="flex items-center gap-2 mt-6 text-sm">
            <input type="checkbox" checked={cap} onChange={(e) => setCap(e.target.checked)} className="accent-[var(--color-accent)]" />
            CamelCase
          </label>
        </div>
        <div className="mt-3"><button onClick={regen} className={btnPrimary()}>Generate</button></div>
      </Panel>
      <Panel title={`Usernames (${list.length})`} action={<CopyButton value={list.join("\n")} label="Copy all" />}>
        <div className="font-mono text-sm grid grid-cols-2 sm:grid-cols-3 gap-2">
          {list.map((u, i) => (
            <div key={i} className="rounded border border-[var(--color-border)] px-2 py-1.5 flex items-center justify-between gap-2">
              <span className="truncate">{u}</span>
              <CopyButton value={u} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
