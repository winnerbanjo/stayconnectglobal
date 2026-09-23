import { MAX_IMAGE_SOURCE_BYTES, MAX_IMAGE_UPLOAD_BYTES } from "./image-upload-limits";
import { prepareUploadImage } from "./prepare-upload-image";
import { imageUrl } from "@/lib/platform/validation";

export interface ImageUploadProgress {
  completed: number;
  total: number;
  fileName: string;
  stage?: "preparing" | "uploading";
}
interface UploadOptions {
  onProgress?: (progress: ImageUploadProgress) => void;
  onUploaded?: (url: string) => void;
}

export async function uploadImages(
  files: FileList | File[],
  options: UploadOptions = {},
): Promise<string[]> {
  const selected = Array.from(files);
  if (!selected.length) return [];
  if (selected.some(f => !["image/jpeg", "image/png", "image/webp"].includes(f.type) || f.size === 0 || f.size > MAX_IMAGE_SOURCE_BYTES))
    throw new Error("Choose non-empty JPEG, PNG or WebP images up to 25 MB each.");
  const urls: string[] = [];
  for (const file of selected) {
    options.onProgress?.({ completed: urls.length, total: selected.length, fileName: file.name, stage: file.size > MAX_IMAGE_UPLOAD_BYTES ? "preparing" : "uploading" });
    const prepared = await prepareUploadImage(file);
    options.onProgress?.({ completed: urls.length, total: selected.length, fileName: file.name, stage: "uploading" });
    const body = new FormData();
    body.append("file", prepared);
    let res: Response;
    try { res = await fetch("/api/upload", { method: "POST", body }); }
    catch { throw new Error(`Could not upload ${file.name}. Check your connection and select the file again. Completed photos have been kept.`); }
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.success || !imageUrl.safeParse(json.url).success)
      throw new Error(res.status === 413
        ? `${file.name} could not pass the upload gateway. Refresh the page and try again.`
        : `${file.name}: ${json?.error || "Upload failed. Select this file again to retry."}`);
    urls.push(json.url);
    options.onUploaded?.(json.url);
    options.onProgress?.({ completed: urls.length, total: selected.length, fileName: file.name });
  }
  return urls;
}
