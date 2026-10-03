"use client";
/**
 * Referral link landing: examscalendar.com/r/AB7K9QX
 * Saves the code in localStorage (it survives the Google redirect) and
 * sends the visitor on. The code is claimed after sign-in by
 * claimPendingReferral() in the auth callback / native login.
 */
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { saveReferralCode } from "@/lib/referral";
import { supabase } from "@/lib/supabase";
import { DARK } from "@/lib/questionTheme";

// New visitors go straight to sign-in; change to "/" to show the homepage first.
const NEW_VISITOR_DEST = "/login";

export default function ReferralLandingPage() {
  const T = DARK;
  const { code } = useParams();

  useEffect(() => {
    saveReferralCode(code);
    supabase.auth.getSession().then(({ data }) => {
      // Already signed in: referral can't apply to an existing account.
      window.location.replace(data?.session?.user ? "/" : NEW_VISITOR_DEST);
    });
  }, [code]);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <div style={{ textAlign: "center", color: T.textMuted }}>
        <div style={{ width: 40, height: 40, border: `3px solid ${T.border}`, borderTopColor: T.accent, borderRadius: "50%", margin: "0 auto 16px", animation: "ecspin 0.8s linear infinite" }} />
        <p style={{ fontSize: 14 }}>Opening ExamsCalendar…</p>
        <style>{`@keyframes ecspin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
