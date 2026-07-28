import { NextResponse } from "next/server";

const cache = new Map<string, string>();

async function translate(text: string, target: "ru" | "es") {
  const key = `${target}:${text}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const params = new URLSearchParams({ client: "gtx", sl: "auto", tl: target, dt: "t", q: text });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`, { next: { revalidate: 86400 } });
  if (!response.ok) return text;
  const data = (await response.json()) as Array<Array<[string]>>;
  const translated = data[0]?.map((part) => part[0]).join("") || text;
  cache.set(key, translated);
  return translated;
}

export async function POST(request: Request) {
  const body = (await request.json()) as { target?: "ru" | "es"; texts?: unknown };
  const target = body.target === "ru" || body.target === "es" ? body.target : null;
  const texts = Array.isArray(body.texts) ? body.texts.filter((item): item is string => typeof item === "string" && item.length <= 1800).slice(0, 300) : [];
  if (!target) return NextResponse.json({ error: "Invalid target language" }, { status: 400 });
  const translations = Object.fromEntries(await Promise.all(texts.map(async (text) => [text, await translate(text, target)])));
  return NextResponse.json({ translations });
}
