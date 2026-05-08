import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TONES = ["formal", "casual", "friendly"] as const;
const TYPES = ["request", "follow-up", "thank-you", "intro", "complaint"] as const;
type Tone = typeof TONES[number];
type EmailType = typeof TYPES[number];

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { brief, tone = "formal", type = "request" } = (await req.json()) as {
      brief?: string;
      tone?: Tone;
      type?: EmailType;
    };
    if (!brief || brief.trim().length < 5) {
      return NextResponse.json({ error: "Please provide a brief." }, { status: 400 });
    }
    if (brief.length > 30_000) {
      return NextResponse.json({ error: "Input is too long (max 30,000 characters)." }, { status: 400 });
    }
    const safeTone: Tone = (TONES as readonly string[]).includes(tone) ? (tone as Tone) : "formal";
    const safeType: EmailType = (TYPES as readonly string[]).includes(type) ? (type as EmailType) : "request";
    const prompt = `Write a complete ${safeType} email in a ${safeTone} tone based on the brief below. Include a clear subject line on the first line as "Subject: ...", then a blank line, then the email body with greeting, body and sign-off. Return only the email.\n\n---\n\n${brief}`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
