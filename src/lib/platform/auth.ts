import { cookies } from "next/headers";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { localPreview } from "./store";
const key = () =>
  process.env.ADMIN_SESSION_SECRET ||
  (localPreview ? "local-preview-session-only" : "");
export function sign(value: string) {
  if (!key()) throw new Error("Admin session secret is not configured");
  return createHmac("sha256", key()).update(value).digest("hex");
}
export function matches(a: string, b: string) {
  return (
    Buffer.byteLength(a) === Buffer.byteLength(b) && timingSafeEqual(Buffer.from(a), Buffer.from(b))
  );
}
export async function isAdmin() {
  const token = (await cookies()).get("sc_admin")?.value || "";
  const [expires, signature] = token.split(".");
  return (
    !!key() &&
    Number(expires) > Date.now() &&
    !!signature &&
    matches(signature, sign(expires))
  );
}
export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Administrator sign-in required");
}
export const newToken = () => randomBytes(32).toString("hex");
