"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { DARK } from "@/lib/questionTheme";

export default function LoginPage() {
  const router = useRouter();
  const T = DARK;

  // "signin" or "signup" -- one form, two modes, toggle between them.
  // Simpler than two separate pages and keeps the styling identical.
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  // If already logged in, don't sit on the login screen -- push straight home.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) router.push("/");
    });
  }, [router]);

  const submit = async (e) => {
    e.preventDefault();
    setError(null); setInfo(null); setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setInfo("Account created. You're signed in.");
        setTimeout(() => router.push("/"), 800);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 400, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "32px 28px" }}>
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <Link href="/" style={{ fontSize: 12, color: T.textMuted }}>← Back to home</Link>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "12px 0 4px" }}>
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>
            {mode === "signin" ? "Welcome back to ExamsCalendar" : "Track your progress across every PYQ you solve"}
          </p>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: T.textMuted }}>
            Email
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ display: "block", width: "100%", marginTop: 6, padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
          </label>

          <label style={{ fontSize: 12, fontWeight: 700, color: T.textMuted }}>
            Password
            <input
              type="password" required minLength={6} value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "signup" ? "At least 6 characters" : ""}
              style={{ display: "block", width: "100%", marginTop: 6, padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
          </label>

          {error && (
            <div style={{ padding: "10px 12px", borderRadius: 8, background: T.redBg, border: `1px solid ${T.red}44`, color: T.redText, fontSize: 13 }}>
              {error}
            </div>
          )}
          {info && (
            <div style={{ padding: "10px 12px", borderRadius: 8, background: T.greenBg, border: `1px solid ${T.green}44`, color: T.greenText, fontSize: 13 }}>
              {info}
            </div>
          )}

          <button
            type="submit" disabled={busy}
            style={{ marginTop: 4, padding: "12px", borderRadius: 10, border: "none", background: busy ? T.surfaceHigh : T.accent, color: busy ? T.textDim : "#fff", fontWeight: 700, fontSize: 14, cursor: busy ? "not-allowed" : "pointer" }}
          >
            {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: T.textMuted }}>
          {mode === "signin" ? (
            <>New here?{" "}
              <button onClick={() => { setMode("signup"); setError(null); setInfo(null); }} style={{ background: "none", border: "none", color: T.accentLight, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                Create an account
              </button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button onClick={() => { setMode("signin"); setError(null); setInfo(null); }} style={{ background: "none", border: "none", color: T.accentLight, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
  }
