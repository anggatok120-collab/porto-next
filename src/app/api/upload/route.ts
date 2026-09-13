import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  if (!(await auth())?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ message: "Image storage is not configured." }, { status: 503 });
  const input = await request.formData();
  const file = input.get("file");
  const requestedFolder = String(input.get("folder") ?? "portfolio");
  const folder = ["portfolio", "projects", "certificates", "blog", "profile"].includes(requestedFolder) ? requestedFolder : "portfolio";
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size > 5 * 1024 * 1024) return NextResponse.json({ message: "Use a JPG, PNG, or WebP image up to 5 MB." }, { status: 400 });
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  const body = new FormData(); body.set("file", file); body.set("folder", folder); body.set("timestamp", String(timestamp)); body.set("api_key", apiKey); body.set("signature", signature);
  try { const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body }); const result = await response.json(); if (!response.ok) throw new Error("Upload rejected"); return NextResponse.json({ url: result.secure_url, width: result.width, height: result.height }); }
  catch { return NextResponse.json({ message: "Unable to upload the image." }, { status: 502 }); }
}
