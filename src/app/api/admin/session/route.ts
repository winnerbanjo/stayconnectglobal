import { NextResponse } from "next/server";
import { isAdmin, sign, matches, adminPassword, adminConfigured } from "@/lib/platform/auth";
import { localPreview } from "@/lib/platform/store";
export async function GET() {
  return NextResponse.json({ authenticated: await isAdmin(), localPreview });
}
export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Administrator access is not configured on the server. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the hosting environment, then redeploy." },
      { status: 503 },
    );
  }
  let body;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Enter your administrator password." }, { status: 400 }); }
  const password = body?.password;
  if (typeof password !== "string" || !matches(password, adminPassword()))
    return NextResponse.json(
      { error: "Invalid administrator password" },
      { status: 401 },
    );
  const expires = String(Date.now() + 8 * 60 * 60 * 1000);
  const response = NextResponse.json({ success: true });
  response.cookies.set("sc_admin", `${expires}.${sign(expires)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: !localPreview && process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 28800,
  });
  return response;
}
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("sc_admin");
  return response;
}
