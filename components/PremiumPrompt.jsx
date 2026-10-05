"use client";
/**
 * PremiumPrompt -- shown when a free user taps a Premium feature.
 * Points them to /refer (invite friends -> coins -> Premium) since
 * payments aren't live yet.
 *
 *   const [prompt, setPrompt] = useState(null);
 *   ...
 *   setPrompt("Difficulty filters are a Premium feature.");
 *   ...
 *   <PremiumPrompt C={C} message={prompt} onClose={() => setPrompt(null)} />
 */
import { useRouter } from "next/navigation";

export default function PremiumPrompt({ C, message, onClose }) {
  const router = useRouter();
  if (!message) return null;

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9500, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{ background: C.bgCard, border: `2px solid ${C.amber}`, borderRadius: 16, padding: "24px 22px", maxWidth: 360, width: "100%", textAlign: "center", boxShadow: C.dropShadow }}
      >
        <div style={{ fontSize: 30, marginBottom: 8 }}>🔒</div>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: "0 0 8px" }}>Premium feature</h2>
        <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 6px", lineHeight: 1.5 }}>{message}</p>
        <p style={{ fontSize: 13, color: C.textMuted, margin: "0 0 18px", lineHeight: 1.5 }}>
          Invite 5 friends to get 1 month of Premium free.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={() => { onClose?.(); router.push("/refer"); }}
            style={{ padding: "11px 18px", borderRadius: 10, background: C.amber, color: "#1a1a1a", border: "none", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
          >
            Invite friends
          </button>
          <button
            onClick={onClose}
            style={{ padding: "10px 18px", borderRadius: 10, background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
