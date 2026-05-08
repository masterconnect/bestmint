import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STYLES = ["curiosity", "listicle", "how-to", "urgency", "benefit"] as const;
type Style = typeof STYLES[number];

const STYLE_HINTS: Record<Style, string> = {
  curiosity: "Use intriguing, open-loop phrasing that makes readers curious without being clickbait.",
  listicle: "Use a numbered listicle format like '7 Ways to…' or '5 Things…'.",
  "how-to": "Use a 'How to …' instructional format.",
  urgency: "Create urgency with words like 'now', 'today', 'before it's too late'.",
  benefit: "Lead with a clear, concrete benefit the reader gets.",
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { topic, style = "curiosity" } = (await req.json()) as { topic?: string; style?: Style };
    if (!topic || topic.trim().length < 3) {
      return NextResponse.json({ error: "Please provide a topic." }, { status: 400 });
    }
    if (topic.length > 1_000) {
      return NextResponse.json({ error: "Input is too long." }, { status: 400 });
    }
    const safeStyle: Style = (STYLES as readonly string[]).includes(style) ? (style as Style) : "curiosity";
    const prompt = `Generate 5 catchy headlines about the topic below. ${STYLE_HINTS[safeStyle]} Return only a numbered list (1. 2. 3. 4. 5.) with no extra commentary.\n\nTopic: ${topic}`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
