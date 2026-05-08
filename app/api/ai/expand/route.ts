import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { text } = (await req.json()) as { text?: string };
    if (!text || text.trim().length < 5) {
      return NextResponse.json({ error: "Please provide an outline or bullets." }, { status: 400 });
    }
    if (text.length > 30_000) {
      return NextResponse.json({ error: "Input is too long (max 30,000 characters)." }, { status: 400 });
    }
    const prompt = `Expand the outline or bullet points below into well-structured prose paragraphs. Aim for roughly 2x to 3x the original length, preserving the order and intent of every point. Use natural transitions and avoid filler. Return only the expanded prose.\n\n---\n\n${text}`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
