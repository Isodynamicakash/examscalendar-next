"use client";
import { useRouter } from "next/navigation";

// router.push + router.refresh(): fast client-side transition (no full
// page reload), but forces Next.js to discard any cached data for the
// destination and refetch fresh -- fixes the "URL changes, content
// doesn't" bug without the slowness of a hard reload.
export default function BackButton({ C, fallbackHref = "/", label = "Back" }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(fallbackHref);
        router.refresh();
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
