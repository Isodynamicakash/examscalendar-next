"use client";
import { useRouter } from "next/navigation";

// router.push + router.refresh(): fast client-side transition (no full
// page reload), but forces Next.js to discard any cached data for the
// destination and refetch fresh -- fixes the "URL changes, content
// doesn't" bug without the slowness of a hard reload.
//
// EXCEPTION: when the destination is "/" (the true landing page), we
// use a hard window.location.assign so the user *always* lands on the
// LandingPageClient view (which is a fully separate route) regardless
// of any client-router quirks. It's a deliberate route boundary.
export default function BackButton({ C, fallbackHref = "/", label = "Back" }) {
  const router = useRouter();

  const go = () => {
    if (fallbackHref === "/" && typeof window !== "undefined") {
      window.location.assign("/");
      return;
    }
    router.push(fallbackHref);
    router.refresh();
  };

  return (
    <button
      onClick={go}
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
