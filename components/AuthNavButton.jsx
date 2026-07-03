"use client";
// Small nav-corner control: shows "Sign in" when logged out, and the
// user's email + a Sign out button when logged in. Deliberately kept
// as its own component so it can be dropped into any page's nav
// without threading auth state through everything.
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthNavButton({ C }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    // Hard reload so any user-scoped data on other pages clears cleanly
    // instead of relying on every component to react to auth state.
    if (typeof window !== "undefined") window.location.assign("/");
  };

  if (loading) {
    return <div style={{ width: 68, height: 28 }} />; // reserved space, no flicker
  }

  if (!user) {
    return (
      <Link href="/login" style={{ padding: "6px 14px", borderRadius: 20, background: C.accentBg, color: C.accentLight, border: `1px solid ${C.accent}44`, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
        Sign in
      </Link>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span title={user.email} style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {user.email}
      </span>
      <button onClick={signOut} style={{ padding: "5px 12px", borderRadius: 20, background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
        Sign out
      </button>
    </div>
  );
}
