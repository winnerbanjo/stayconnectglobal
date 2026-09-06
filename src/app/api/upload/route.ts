import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { localPreview } from "@/lib/platform/store";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    if (!(file instanceof File)) throw new Error("Choose an image to upload");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
      throw new Error("Use a JPEG, PNG or WebP image");
    if (file.size > 8 * 1024 * 1024 || file.size === 0)
      throw new Error("Each image must be between 1 byte and 8 MB");
    const buffer = Buffer.from(await file.arrayBuffer());
    const jpeg = buffer[0] === 0xff && buffer[1] === 0xd8;
    const png = buffer
      .subarray(0, 8)
      .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const webp =
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP";
    if (!(
      (file.type === "image/jpeg" && jpeg) ||
      (file.type === "image/png" && png) ||
      (file.type === "image/webp" && webp)
    ))
      throw new Error(
        "The file contents do not match a supported image format",
      );
    if (localPreview) {
      const filename = `${randomUUID()}.${jpeg ? "jpg" : png ? "png" : "webp"}`;
      const dir = path.join(process.cwd(), ".local-data/uploads");
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, filename), buffer);
      return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    }
    const result: any = await new Promise((resolve, reject) =>
      cloudinary.uploader
        .upload_stream(
          { folder: "stayconnect_hotels", resource_type: "image" },
          (error, value) => (error ? reject(error) : resolve(value)),
        )
        .end(buffer),
    );
    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Image upload failed" },
      { status: 400 },
    );
  }
}
