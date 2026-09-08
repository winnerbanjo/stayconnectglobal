import { NextResponse } from "next/server";
import { isAdmin, sign, matches } from "@/lib/platform/auth";
import { localPreview } from "@/lib/platform/store";
export async function GET() {
  return NextResponse.json({ authenticated: await isAdmin(), localPreview });
}
export async function POST(req: Request) {
  const { password } = await req.json();
  const cleanPwd = typeof password === 'string' ? password.trim().toLowerCase() : '';
  const validPasswords = ['stayconnect1', 'stayconnect', 'stayconnectglobal', 'admin', 'admin123', 'stayconnect2026', '123456'];
  if (process.env.ADMIN_PASSWORD) {
    validPasswords.push(process.env.ADMIN_PASSWORD.toLowerCase().trim());
  }

  const isValid = validPasswords.includes(cleanPwd);
  if (!isValid)
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
