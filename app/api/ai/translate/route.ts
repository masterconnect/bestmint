import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { text, target = "Spanish", source = "auto" } = (await req.json()) as {
      text?: string;
      target?: string;
      source?: string;
    };
    if (!text || text.trim().length < 1) {
      return NextResponse.json({ error: "Please provide text to translate." }, { status: 400 });
    }
    if (text.length > 30_000) {
      return NextResponse.json({ error: "Input is too long (max 30,000 characters)." }, { status: 400 });
    }
    const sourcePart = source && source !== "auto" ? ` from ${source}` : "";
    const prompt = `Translate the following text${sourcePart} into ${target}. Output only the translation — no preamble, no quotes around the result, preserve formatting (line breaks, lists).\n\n---\n\n${text}`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
