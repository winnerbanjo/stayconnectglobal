import fs from 'node:fs/promises';
import path from 'node:path';
import { localPreview } from '@/lib/platform/store';
export const dynamic = 'force-dynamic';
// Serve local uploads created after `next build`; public's build-time file list cannot do that.
export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!localPreview || !/^[a-f0-9-]+\.(jpg|png|webp)$/.test(filename)) return new Response('Not found', { status: 404 });
  try {
    const bytes = await fs.readFile(path.join(process.cwd(), '.local-data/uploads', filename));
    const type = filename.endsWith('.jpg') ? 'image/jpeg' : filename.endsWith('.png') ? 'image/png' : 'image/webp';
    return new Response(bytes, { headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' } });
  } catch { return new Response('Not found', { status: 404 }); }
}
