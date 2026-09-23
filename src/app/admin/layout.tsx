import type { CSSProperties, ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white text-slate-900" style={{
    colorScheme: "light",
    "--editor-input": "#ffffff",
    "--editor-panel": "#f8fafc",
    "--editor-text": "#0f172a",
    "--editor-muted": "#475569",
    "--editor-border": "#cbd5e1",
    "--editor-error": "#be123c",
  } as CSSProperties}>{children}</div>;
}
