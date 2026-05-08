import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { text, length = "short" } = (await req.json()) as { text?: string; length?: "bullets" | "short" | "executive" };
    if (!text || text.trim().length < 20) {
      return NextResponse.json({ error: "Please provide at least 20 characters." }, { status: 400 });
    }
    if (text.length > 30_000) {
      return NextResponse.json({ error: "Input is too long (max 30,000 characters)." }, { status: 400 });
    }
    const styles = {
      bullets: "Summarize the text below as a tight bulleted list of 4–6 key points. No preamble.",
      short: "Summarize the text below in a single concise paragraph (3–5 sentences). No preamble.",
      executive: "Write an executive summary of the text below: one short paragraph, then 3 key findings as bullets.",
    } as const;
    const out = await geminiText(`${styles[length] ?? styles.short}\n\n---\n\n${text}`);
    return NextResponse.json({ summary: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
