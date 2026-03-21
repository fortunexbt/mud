import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

import { saveMediaAsset } from "@/lib/media-db";

const UPLOAD_DIR = join(process.cwd(), "public/uploads");

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const altText = String(formData.get("altText") || "").trim();
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    await mkdir(UPLOAD_DIR, { recursive: true });
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const path = join(UPLOAD_DIR, filename);
    
    await writeFile(path, buffer);
    let registered = true;

    try {
      await saveMediaAsset({
        fileKey: filename,
        fileUrl: `/uploads/${filename}`,
        altText: altText || file.name.replace(/\.[^.]+$/, ""),
        mimeType: file.type,
      });
    } catch (registrationError) {
      registered = false;
      console.error("Media registration error:", registrationError);
    }

    revalidatePath("/admin/content/media");

    return NextResponse.json({
      url: `/uploads/${filename}`,
      key: filename,
      registered,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}
