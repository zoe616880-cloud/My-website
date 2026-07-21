import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { isAdminAuthorized, writeProductsFile } from "@/lib/admin-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "密码不正确" });
  }

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "密码不正确" });
  }

  const body = await request.json();

  if (!Array.isArray(body.products)) {
    return NextResponse.json({ error: "products must be an array" }, { status: 400 });
  }

  await writeProductsFile(body.products);
  return NextResponse.json({ ok: true });
}
