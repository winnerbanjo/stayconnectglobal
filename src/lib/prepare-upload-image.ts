import { MAX_IMAGE_UPLOAD_BYTES } from "./image-upload-limits";

/** Optimize oversized camera photos in the browser before they reach the host. */
export async function prepareUploadImage(file: File): Promise<File> {
  if (file.size <= MAX_IMAGE_UPLOAD_BYTES) return file;
  let bitmap: ImageBitmap;
  try { bitmap = await createImageBitmap(file); }
  catch { throw new Error(`${file.name} could not be read. Export it as a JPEG, PNG or WebP image and try again.`); }
  const canvas = document.createElement("canvas");
  try {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("This browser cannot prepare large photos. Try a different browser.");
    const scale = Math.min(1, 4096 / Math.max(bitmap.width, bitmap.height));
    let width = Math.max(1, Math.round(bitmap.width * scale));
    let height = Math.max(1, Math.round(bitmap.height * scale));
    for (let attempt = 0; attempt < 12; attempt++) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(bitmap, 0, 0, width, height);
      // JPEG gives predictable compression for camera and screenshot files. It is
      // used only for oversized input; smaller PNG and WebP assets stay unchanged.
      const quality = Math.max(0.55, 0.88 - attempt * 0.05);
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
      if (!blob) throw new Error(`Could not prepare ${file.name}. Try exporting the photo again.`);
      if (blob.size <= MAX_IMAGE_UPLOAD_BYTES) {
        return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg", lastModified: file.lastModified });
      }
      width = Math.max(1, Math.floor(width * 0.8));
      height = Math.max(1, Math.floor(height * 0.8));
    }
    throw new Error(`${file.name} could not be optimized. Try exporting it as JPEG.`);
  } finally {
    bitmap.close();
    canvas.width = 0;
    canvas.height = 0;
  }
}
