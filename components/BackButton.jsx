"use client";

// We tried router.back() first, but it repeatedly hit a Next.js
// client-router cache bug: the URL updates correctly, but the page
// content stays stale (this is what you saw -- address bar showing
// /pyq/jee-main while the question page was still visibly on screen).
// A hard navigation sidesteps that entirely -- slightly less fancy
// (no scroll-position restore) but the content will ALWAYS match the
// URL, every single time. Reliability wins here.
export default function BackButton({ C, fallbackHref = "/", label = "Back" }) {
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined") window.location.assign(fallbackHref);
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
