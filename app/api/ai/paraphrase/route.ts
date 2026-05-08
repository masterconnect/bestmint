import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TONE_PROMPTS: Record<string, string> = {
  formal: "Rewrite the text in formal, professional English. Preserve meaning. No preamble.",
  casual: "Rewrite the text in a casual, conversational tone. Preserve meaning. No preamble.",
  concise: "Rewrite the text in the most concise way possible without losing key information. No preamble.",
  friendly: "Rewrite the text in a warm, friendly tone. Preserve meaning. No preamble.",
  playful: "Rewrite the text in a playful, energetic tone with a bit of personality. Preserve meaning. No preamble.",
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { text, tone = "formal" } = (await req.json()) as { text?: string; tone?: keyof typeof TONE_PROMPTS };
    if (!text || text.trim().length < 5) {
      return NextResponse.json({ error: "Please provide some text." }, { status: 400 });
    }
    if (text.length > 30_000) {
      return NextResponse.json({ error: "Input is too long (max 30,000 characters)." }, { status: 400 });
    }
    const instruction = TONE_PROMPTS[tone] ?? TONE_PROMPTS.formal;
    const out = await geminiText(`${instruction}\n\n---\n\n${text}`);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
