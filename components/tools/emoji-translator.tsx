"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { btnGhost, btnPrimary, Panel, textareaCls } from "@/components/ui/panel";

const MAP: Record<string, string> = {
  cat: "🐈", dog: "🐕", heart: "❤️", love: "❤️", star: "⭐", fire: "🔥", sun: "☀️",
  moon: "🌙", rain: "🌧️", snow: "❄️", tree: "🌳", flower: "🌸", rose: "🌹",
  apple: "🍎", banana: "🍌", pizza: "🍕", burger: "🍔", coffee: "☕", tea: "🍵",
  beer: "🍺", wine: "🍷", cake: "🎂", music: "🎵", song: "🎶", phone: "📱",
  computer: "💻", laptop: "💻", car: "🚗", bus: "🚌", plane: "✈️", train: "🚆",
  rocket: "🚀", ship: "🚢", boat: "⛵", bike: "🚲", house: "🏠", home: "🏠",
  school: "🏫", work: "💼", money: "💰", cash: "💵", gift: "🎁", party: "🎉",
  baby: "👶", boy: "👦", girl: "👧", man: "👨", woman: "👩", king: "🤴",
  queen: "👸", happy: "😀", smile: "😊", laugh: "😂", cry: "😢", sad: "😢",
  angry: "😠", cool: "😎", sleepy: "😴", sick: "🤒", kiss: "😘",
  thumbs: "👍", up: "👍", down: "👎", clap: "👏", wave: "👋", ok: "👌",
  pray: "🙏", muscle: "💪", brain: "🧠", eye: "👁️", ear: "👂", mouth: "👄",
  book: "📚", pencil: "✏️", pen: "🖊️", note: "📝", letter: "✉️", mail: "📧",
  clock: "🕐", time: "⏰", calendar: "📅", camera: "📷", picture: "🖼️", art: "🎨",
  game: "🎮", sport: "⚽", football: "🏈", basketball: "🏀", baseball: "⚾",
  trophy: "🏆", medal: "🏅", crown: "👑", diamond: "💎", key: "🔑", lock: "🔒",
  bell: "🔔", magnet: "🧲", bomb: "💣", check: "✅", cross: "❌", warning: "⚠️",
  question: "❓", exclamation: "❗", arrow: "➡️", left: "⬅️", right: "➡️",
  hot: "🔥", cold: "🥶", water: "💧", fish: "🐟", bird: "🐦", cow: "🐄",
  pig: "🐖", lion: "🦁", tiger: "🐅", bear: "🐻", monkey: "🐒", elephant: "🐘",
  earth: "🌍", world: "🌎", globe: "🌐",
};

export default function EmojiTranslator() {
  const [input, setInput] = useState("I love pizza and coffee in the morning.");
  const [mode, setMode] = useState<"add" | "replace">("replace");

  const output = useMemo(() => {
    return input.replace(/\b([a-zA-Z]+)\b/g, (word) => {
      const lower = word.toLowerCase();
      const emoji = MAP[lower];
      if (!emoji) return word;
      return mode === "replace" ? emoji : `${word} ${emoji}`;
    });
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <Panel title="Mode">
        <div className="flex gap-2">
          <button onClick={() => setMode("replace")} className={mode === "replace" ? btnPrimary() : btnGhost()}>Replace words</button>
          <button onClick={() => setMode("add")} className={mode === "add" ? btnPrimary() : btnGhost()}>Add emoji after</button>
        </div>
      </Panel>
      <Panel title="Input">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className={textareaCls()} />
      </Panel>
      <Panel title="Emoji output" action={<CopyButton value={output} />}>
        <div className="text-base whitespace-pre-wrap break-words">{output}</div>
      </Panel>
      <Panel title={`Dictionary (${Object.keys(MAP).length} words)`}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-mono max-h-48 overflow-y-auto">
          {Object.entries(MAP).map(([k, v]) => (
            <div key={k} className="rounded border border-[var(--color-border)] px-2 py-1"><span className="text-[var(--color-muted)]">{k}</span> {v}</div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
