import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AUDIENCES = ["5-year-old", "teenager", "college-student", "expert"] as const;
type Audience = typeof AUDIENCES[number];

const HINTS: Record<Audience, string> = {
  "5-year-old": "Use very simple words a 5-year-old understands, short sentences, and a friendly analogy from everyday life.",
  teenager: "Use clear, casual language a teenager would relate to, with relatable examples and minimal jargon.",
  "college-student": "Use a clear academic-but-approachable tone, define key terms, and include one concrete example.",
  expert: "Assume an expert reader. Use precise terminology, skip basics, and focus on nuance, mechanisms, and edge cases.",
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { text, audience = "teenager" } = (await req.json()) as { text?: string; audience?: Audience };
    if (!text || text.trim().length < 3) {
      return NextResponse.json({ error: "Please provide a concept or text." }, { status: 400 });
    }
    if (text.length > 30_000) {
      return NextResponse.json({ error: "Input is too long (max 30,000 characters)." }, { status: 400 });
    }
    const safeAudience: Audience = (AUDIENCES as readonly string[]).includes(audience) ? (audience as Audience) : "teenager";
    const prompt = `Explain the following for a ${safeAudience} audience. ${HINTS[safeAudience]} Return only the explanation.\n\n---\n\n${text}`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
