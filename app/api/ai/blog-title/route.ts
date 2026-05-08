import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { topic, audience } = (await req.json()) as { topic?: string; audience?: string };
    if (!topic || topic.trim().length < 3) {
      return NextResponse.json({ error: "Please provide a topic." }, { status: 400 });
    }
    if (topic.length > 1_000 || (audience && audience.length > 500)) {
      return NextResponse.json({ error: "Input is too long." }, { status: 400 });
    }
    const audienceLine = audience && audience.trim() ? ` for the audience: ${audience.trim()}` : "";
    const prompt = `Generate 5 catchy, click-worthy blog post titles about the topic below${audienceLine}. Use a numbered list (1. 2. 3. 4. 5.). Mix angles like how-to, listicle, and benefit-driven. Return only the numbered list.\n\nTopic: ${topic}`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
