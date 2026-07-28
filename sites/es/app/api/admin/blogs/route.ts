import { NextResponse } from "next/server";
import { blogPosts } from "@/data/blog-posts";
import { isAdminAuthorized, writeBlogsFile } from "@/lib/admin-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "密码不正确" });
  }

  return NextResponse.json({ blogPosts });
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "密码不正确" });
  }

  const body = await request.json();

  if (!Array.isArray(body.blogPosts)) {
    return NextResponse.json({ error: "blogPosts must be an array" }, { status: 400 });
  }

  await writeBlogsFile(body.blogPosts);
  return NextResponse.json({ ok: true });
}
