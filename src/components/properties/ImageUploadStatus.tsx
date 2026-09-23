import { Loader2, CheckCircle2 } from "lucide-react";
import type { ImageUploadProgress } from "@/lib/upload-images";

export default function ImageUploadStatus({ progress, uploading }: { progress: ImageUploadProgress | null; uploading: boolean }) {
  if (!progress) return null;
  const complete = progress.completed === progress.total;
  return <div role="status" aria-live="polite" className="rounded-lg border border-[#00AEEF]/40 p-3 space-y-2 text-xs">
    <div className="flex items-center gap-2">
      {uploading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" /> : complete ? <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" /> : null}
      <span>{uploading ? `${progress.stage === "preparing" ? "Preparing" : "Uploading"} photo ${Math.min(progress.completed + 1, progress.total)} of ${progress.total}…` : complete ? `${progress.total} ${progress.total === 1 ? "photo uploaded" : "photos uploaded"}` : `Upload stopped. ${progress.completed} of ${progress.total} photos uploaded.`}</span>
    </div>
    {uploading && <p className="break-all">{progress.fileName} — please wait until the upload finishes.</p>}
    <progress aria-label="Photos uploaded" value={progress.completed} max={progress.total} className="block w-full h-2 accent-[#0077B6]" />
  </div>;
}
