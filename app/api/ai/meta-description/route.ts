import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { topic, keyword } = (await req.json()) as { topic?: string; keyword?: string };
    if (!topic || topic.trim().length < 3 || !keyword || keyword.trim().length < 2) {
      return NextResponse.json({ error: "Please provide a topic and primary keyword." }, { status: 400 });
    }
    if (topic.length > 1_000 || keyword.length > 200) {
      return NextResponse.json({ error: "Input is too long." }, { status: 400 });
    }
    const prompt = `Write 3 SEO meta descriptions for a page about "${topic}". Naturally include the primary keyword "${keyword}" once in each description. Each description must be between 140 and 160 characters and end with a soft call to action. Return them as a numbered list (1. 2. 3.) with no extra commentary.`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
