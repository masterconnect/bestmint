import { NextResponse } from "next/server";
import { geminiText, rateLimit } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const { code, language } = (await req.json()) as { code?: string; language?: string };
    if (!code || code.trim().length < 5) {
      return NextResponse.json({ error: "Please provide a code snippet." }, { status: 400 });
    }
    if (code.length > 30_000) {
      return NextResponse.json({ error: "Input is too long (max 30,000 characters)." }, { status: 400 });
    }
    const langLine = language && language.trim() ? `Language: ${language.trim()}.` : "";
    const lineByLine =
      code.split(/\r?\n/).filter((l) => l.trim().length > 0).length <= 30
        ? " Since the snippet is short, walk through it line by line."
        : " Summarize the high-level flow first, then call out the most important parts. Skip line-by-line for routine code.";
    const prompt = `Explain in plain English what the following code does.${langLine ? " " + langLine : ""}${lineByLine} Return only the explanation.\n\n---\n\n${code}`;
    const out = await geminiText(prompt);
    return NextResponse.json({ result: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server error" }, { status: 500 });
  }
}
