"use client";

/**
 * Login page -- Handles both Web and Native Android/iOS via Capacitor.
 * - On Native: Uses @capgo/capacitor-social-login for seamless, browser-less sign-in.
 * - On Web: Uses standard Supabase OAuth redirect flow.
 */

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { DARK } from "@/lib/questionTheme";
import { Capacitor } from "@capacitor/core";
import { SocialLogin } from "@capgo/capacitor-social-login";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.5l-6.6-5.6C29.6 34.6 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.6 5.6C41.4 36.3 44 30.6 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function LoginInner() {
  const T = DARK;
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadyIn, setAlreadyIn] = useState(false);

  // Where to send the user after login. The sign-in buttons pass ?next=
  // (a path). We stash it so the callback page can read it.
  const next = searchParams.get("next") || "/";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) setAlreadyIn(true);
    });

    // Initialize native plugin safely if running inside Capacitor Android/iOS app
    if (Capacitor.isNativePlatform()) {
      SocialLogin.initialize({
        google: {
          webClientId: process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID|| "",
        },
      }).catch((err) => console.error("SocialLogin init error:", err));
    }
  }, []);

  const goNext = () => {
    if (typeof window !== "undefined") window.location.assign(next);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. NATIVE MOBILE APP FLOW (Android / iOS)
      if (Capacitor.isNativePlatform()) {
        const result = await SocialLogin.login({
          provider: "google",
          options: { scopes: ["email", "profile"] },
        });

        const googleResult = result.result;

        if (googleResult?.responseType === "online" && googleResult.idToken) {
          const { error: supabaseError } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: googleResult.idToken,
          });

          if (supabaseError) throw supabaseError;

          // Native login succeeded! Navigate to target route
          goNext();
          return;
        } else {
          throw new Error("Failed to get ID token from Google.");
        }
      } 
      
      // 2. STANDARD WEB BROWSER FLOW
      else {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("post_login_next", next);
        }
        const redirectTo = `${window.location.origin}/auth/callback`;
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo },
        });

        if (error) throw error;
        // Browser redirects to Google now; nothing else to do here.
      }
    } catch (e: any) {
      console.error("Google sign-in failed:", e);
      setError(e?.message || "Couldn't start Google sign-in. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 400, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 18, padding: "36px 30px", textAlign: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: 13, background: `linear-gradient(135deg,${T.accent},${T.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: "#fff", margin: "0 auto 18px" }}>EC</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 6px" }}>Sign in to ExamsCalendar</h1>
        <p style={{ fontSize: 13, color: T.textMuted, margin: "0 0 26px" }}>Track your practice, save questions, and set daily goals.</p>

        {alreadyIn ? (
          <div>
            <p style={{ fontSize: 13, color: T.greenText, marginBottom: 14 }}>You're already signed in.</p>
            <button onClick={goNext} style={{ width: "100%", padding: "13px", borderRadius: 11, background: T.accent, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Continue →</button>
          </div>
        ) : (
          <>
            <button
              onClick={signInWithGoogle}
              disabled={loading}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px", borderRadius: 11, background: "#fff", color: "#1f2937", border: "none", fontWeight: 700, fontSize: 14, cursor: loading ? "wait" : "pointer" }}
            >
              <GoogleIcon />
              {loading ? "Redirecting…" : "Continue with Google"}
            </button>
            {error && <p style={{ fontSize: 12, color: T.redText, marginTop: 14 }}>{error}</p>}
          </>
        )}

        <p style={{ fontSize: 11, color: T.textDim, marginTop: 24, lineHeight: 1.5 }}>
          By continuing you agree to our terms. We only use your Google account to sign you in.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: DARK.bg }} />}>
      <LoginInner />
    </Suspense>
  );
}
