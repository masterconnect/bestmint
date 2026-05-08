import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = ["formal", "casual", "friendly", "professional", "playful", "persuasive"] as const;
type Tone = typeof ALLOWED[number];

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { text, tone = "formal" } = (await req.json()) as { text?: string; tone?: Tone };
    if (!text || text.trim().length < 5) {
      return NextResponse.json({ error: "Please provide some text." }, { status: 400 });
    }
    if (text.length > 30_000) {
      return NextResponse.json({ error: "Input is too long (max 30,000 characters)." }, { status: 400 });
    }
    const safeTone: Tone = (ALLOWED as readonly string[]).includes(tone) ? (tone as Tone) : "formal";
    const prompt = `Rewrite the following text in a ${safeTone} tone. Preserve meaning. Return only the rewritten text.\n\n---\n\n${text}`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
