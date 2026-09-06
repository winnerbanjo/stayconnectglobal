export async function uploadImages(
  files: FileList | File[],
): Promise<string[]> {
  const selected = Array.from(files);
  if (
    selected.some(
      (f) =>
        !["image/jpeg", "image/png", "image/webp"].includes(f.type) ||
        f.size > 8 * 1024 * 1024,
    )
  )
    throw new Error("Use JPEG, PNG or WebP images up to 8 MB each.");
  const urls: string[] = [];
  for (const file of selected) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body });
    const json = await res.json();
    if (!res.ok || !json.success)
      throw new Error(json.error || "Upload failed. Please try again.");
    urls.push(json.url);
  }
  return urls;
}
