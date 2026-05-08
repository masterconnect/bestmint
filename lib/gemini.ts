import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export const LLM_MODEL = "gemma-4-31b-it";

let client: GoogleGenerativeAI | null = null;
function getClient() {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");
  if (!client) client = new GoogleGenerativeAI(apiKey);
  return client;
}

/**
 * Run a single-turn completion. Gemma instruct models served via the Gemini API
 * don't accept `systemInstruction`, so any system message is folded into the prompt.
 */
export async function geminiText(prompt: string, system?: string): Promise<string> {
  const model = getClient().getGenerativeModel({ model: LLM_MODEL });
  const fullPrompt = system ? `${system}\n\n${prompt}` : prompt;
  const result = await model.generateContent(fullPrompt);
  return result.response.text();
}

const buckets = new Map<string, { count: number; resetAt: number }>();
/** Trivial in-memory per-IP rate limit. Resets every windowMs. */
export function rateLimit(key: string, max = 20, windowMs = 60_000) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= max) return false;
  b.count++;
  return true;
}
