"use client";
import { useEffect } from "react";
export default function ReferralCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (params.has("ref") && !ref) {
      localStorage.removeItem("sc_agent");
      localStorage.removeItem("sc_agent_expires");
    }
    if (ref && /^[a-zA-Z0-9_-]{2,40}$/.test(ref)) {
      localStorage.setItem("sc_agent", ref);
      localStorage.setItem(
        "sc_agent_expires",
        String(Date.now() + 30 * 86400000),
      );
    }
    if (Number(localStorage.getItem("sc_agent_expires")) < Date.now())
      localStorage.removeItem("sc_agent");
    if (!localStorage.getItem("sc_visitor"))
      localStorage.setItem("sc_visitor", crypto.randomUUID());
  }, []);
  return null;
}
