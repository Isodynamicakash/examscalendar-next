"use client";
import { useRouter } from "next/navigation";

// Real browser-back behavior (preserves scroll position, filter state,
// etc.) rather than a hardcoded Link to a guessed parent URL.
export default function BackButton({ C, fallbackHref = "/", label = "Back" }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) router.back();
        else router.push(fallbackHref);
      }}
      style={{
        display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
        borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface,
        color: C.textMuted, fontSize: 13, fontWeight: 700, cursor: "pointer",
      }}
    >
      ← {label}
    </button>
  );
}
