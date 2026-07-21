import { NextResponse } from "next/server";
import { isAdminAuthorized, writeHomePageFile } from "@/lib/admin-content";
import { readHomePageConfig } from "@/lib/home-page-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "密码不正确" });
  }

  const homePage = await readHomePageConfig();
  return NextResponse.json({ homePage });
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "密码不正确" });
  }

  const body = await request.json();

  if (!body.homePage || !Array.isArray(body.homePage.sections)) {
    return NextResponse.json({ error: "homePage.sections must be an array" }, { status: 400 });
  }

  await writeHomePageFile(body.homePage);
  return NextResponse.json({ ok: true });
}
