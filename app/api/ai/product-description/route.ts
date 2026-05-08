import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TONES = ["formal", "casual", "friendly", "professional", "playful", "persuasive"] as const;
type Tone = typeof TONES[number];

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { name, features, tone = "persuasive" } = (await req.json()) as {
      name?: string;
      features?: string;
      tone?: Tone;
    };
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide a product name." }, { status: 400 });
    }
    if (!features || features.trim().length < 5) {
      return NextResponse.json({ error: "Please provide at least one feature." }, { status: 400 });
    }
    if (name.length > 500 || features.length > 30_000) {
      return NextResponse.json({ error: "Input is too long." }, { status: 400 });
    }
    const safeTone: Tone = (TONES as readonly string[]).includes(tone) ? (tone as Tone) : "persuasive";
    const prompt = `Write an e-commerce product description for "${name}" in a ${safeTone} tone. Use 2 to 3 short paragraphs that lead with a hook, weave in the key features as benefits, and end with a buying nudge. Return only the description.\n\nKey features:\n${features}`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
