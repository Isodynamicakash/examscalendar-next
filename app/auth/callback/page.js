"use client";
/**
 * OAuth callback landing. Google redirects here after login. Supabase's
 * client library automatically parses the session from the URL hash on
 * load (detectSessionInUrl), so by the time this component mounts the
 * session is usually already set. We then bounce the user to their
 * intended destination (post_login_next stashed before the redirect),
 * falling back to Home.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DARK } from "@/lib/questionTheme";

export default function AuthCallbackPage() {
  const T = DARK;
  const [msg, setMsg] = useState("Signing you in…");

  useEffect(() => {
    let done = false;
    const finish = (dest) => {
      if (done) return;
      done = true;
      if (typeof window !== "undefined") window.location.assign(dest || "/");
    };

    (async () => {
      // Give supabase-js a tick to process the session from the URL.
      const dest = (typeof window !== "undefined" && sessionStorage.getItem("post_login_next")) || "/";

      // Poll briefly for the session to be established.
      for (let i = 0; i < 20; i++) {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          if (typeof window !== "undefined") sessionStorage.removeItem("post_login_next");
          finish(dest);
          return;
        }
        await new Promise((r) => setTimeout(r, 150));
      }

      // If we never got a session, something went wrong -- send to login.
      setMsg("Sign-in didn't complete. Redirecting…");
      finish("/login");
    })();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <div style={{ textAlign: "center", color: T.textMuted }}>
        <div style={{ width: 40, height: 40, border: `3px solid ${T.border}`, borderTopColor: T.accent, borderRadius: "50%", margin: "0 auto 16px", animation: "ecspin 0.8s linear infinite" }} />
        <p style={{ fontSize: 14 }}>{msg}</p>
        <style>{`@keyframes ecspin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
