import { NextResponse } from "next/server";

const cache = new Map<string, string>();

async function translate(text: string, target: "ru" | "es") {
  const key = `${target}:${text}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const params = new URLSearchParams({ client: "gtx", sl: "auto", tl: target, dt: "t", q: text });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`, {
    next: { revalidate: 86400 },
  });
  if (!response.ok) return text;
  const data = (await response.json()) as Array<Array<[string]>>;
  const result = data[0]?.map((part) => part[0]).join("") || text;
  cache.set(key, result);
  return result;
}

export async function POST(request: Request) {
  const body = await request.json() as { target?: string; texts?: unknown };
  if ((body.target !== "ru" && body.target !== "es") || !Array.isArray(body.texts)) {
    return NextResponse.json({ error: "Invalid translation request" }, { status: 400 });
  }
  const target = body.target;
  const texts = body.texts.filter((item): item is string => typeof item === "string" && item.length <= 1800).slice(0, 300);
  const translated = await Promise.all(texts.map((text) => translate(text, target)));
  return NextResponse.json({ translations: Object.fromEntries(texts.map((text, index) => [text, translated[index]])) });
}
