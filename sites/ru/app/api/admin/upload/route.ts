import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanFileName(name: string) {
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, ext).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base || "upload"}-${Date.now()}${ext}`;
}

function cleanUploadTarget(value: FormDataEntryValue | null) {
  return value === "product" ? "products" : value === "blog" ? "blogs" : value === "home" ? "home" : "";
}

export async function POST(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "密码不正确" });
  }

  const form = await request.formData();
  const file = form.get("file");
  const targetDir = cleanUploadTarget(form.get("target"));

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "请选择要上传的图片" });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "只能上传图片文件" });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", targetDir);
  await fs.mkdir(uploadsDir, { recursive: true });

  const fileName = cleanFileName(file.name);
  const filePath = path.join(uploadsDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return NextResponse.json({ path: `/uploads/${targetDir ? `${targetDir}/` : ""}${fileName}` });
}
