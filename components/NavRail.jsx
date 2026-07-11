"use client";
/**
 * NavRail.jsx -- persistent left icon rail (Marks-style).
 *
 * Shown on: exam browse, chapter overview, chapter list, bookmarks,
 * profile. NOT on: homepage, individual question solver, login.
 *
 * Gating rule: personalized items (Bookmarks, Profile) are always
 * visible so users discover them, but clicking while logged out routes
 * to /login. Theme toggle needs no auth. Bottom button flips between
 * Sign out (logged in) and Sign in (logged out).
 *
 * Desktop: vertical rail on the left. Mobile: bottom tab bar.
 */
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Minimal inline SVG icons -- no icon-library dependency.
const Icon = {
  home: (c) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>),
  bookmark: (c) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>),
  profile: (c) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>),
  analysis: (c) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="4" width="3" height="14"/></svg>),
  test: (c) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6a1 1 0 0 1 1 1v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4a1 1 0 0 1 1-1z"/><path d="M9 13l2 2 4-4"/></svg>),
  sun: (c) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>),
  moon: (c) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>),
  signout: (c) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>),
  signin: (c) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>),
};

export default function NavRail({ C, isDark, onToggleTheme }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data?.session?.user || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user || null));
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Send to login, remembering the current page so we come back here
  // after a successful Google sign-in (post-login landing = where you were).
  const goLogin = () => {
    const here = pathname || "/";
    router.push(`/login?next=${encodeURIComponent(here)}`);
  };

  // Personalized routes require login; route to /login if logged out.
  const goGated = (href) => {
    if (!user) { goLogin(); return; }
    router.push(href);
    router.refresh();
  };
  const goHome = () => { if (typeof window !== "undefined") window.location.assign("/"); };

  const signOut = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") window.location.assign("/");
  };

  const isActive = (href) => pathname === href;

  const items = [
    { key: "home", label: "Home", icon: Icon.home, onClick: goHome, active: false },
    { key: "bookmarks", label: "Saved", icon: Icon.bookmark, onClick: () => goGated("/bookmarks"), active: isActive("/bookmarks") },
    { key: "analysis", label: "Analysis", icon: Icon.analysis, onClick: () => goGated("/analysis"), active: isActive("/analysis") },
    { key: "test", label: "Test", icon: Icon.test, onClick: () => goGated("/create-test"), active: isActive("/create-test") },
    { key: "profile", label: "Profile", icon: Icon.profile, onClick: () => goGated("/profile"), active: isActive("/profile") },
  ];

  // ---- Mobile: bottom tab bar ----
  if (isMobile) {
    return (
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500, background: C.nav, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", alignItems: "center", height: 58, paddingBottom: 2 }}>
        {items.map((it) => (
          <button key={it.key} onClick={it.onClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", color: it.active ? C.accent : C.textMuted, flex: 1, padding: "6px 0" }}>
            {it.icon(it.active ? C.accent : C.textMuted)}
            <span style={{ fontSize: 10, fontWeight: 700 }}>{it.label}</span>
          </button>
        ))}
        <button onClick={onToggleTheme} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", color: C.textMuted, flex: 1, padding: "6px 0" }}>
          {isDark ? Icon.sun(C.textMuted) : Icon.moon(C.textMuted)}
          <span style={{ fontSize: 10, fontWeight: 700 }}>Theme</span>
        </button>
        <button onClick={user ? signOut : goLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", color: C.textMuted, flex: 1, padding: "6px 0" }}>
          {user ? Icon.signout(C.textMuted) : Icon.signin(C.textMuted)}
          <span style={{ fontSize: 10, fontWeight: 700 }}>{user ? "Out" : "In"}</span>
        </button>
      </nav>
    );
  }

  // ---- Desktop: vertical rail ----
  const RailBtn = ({ it }) => (
    <button
      onClick={it.onClick}
      title={it.label}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        width: "100%", padding: "12px 0", background: it.active ? C.accentBg : "transparent",
        border: "none", borderLeft: it.active ? `3px solid ${C.accent}` : "3px solid transparent",
        cursor: "pointer", color: it.active ? C.accent : C.textMuted,
      }}
      onMouseEnter={(e) => { if (!it.active) e.currentTarget.style.background = C.surface; }}
      onMouseLeave={(e) => { if (!it.active) e.currentTarget.style.background = "transparent"; }}
    >
      {it.icon(it.active ? C.accent : C.textMuted)}
      <span style={{ fontSize: 10, fontWeight: 700 }}>{it.label}</span>
    </button>
  );

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 500, width: 72, background: C.nav, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16 }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg,${C.accent},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff", marginBottom: 20, flexShrink: 0 }}>EC</div>

      <div style={{ display: "flex", flexDirection: "column", width: "100%", flex: 1 }}>
        {items.map((it) => <RailBtn key={it.key} it={it} />)}
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", paddingBottom: 14 }}>
        <button onClick={onToggleTheme} title={isDark ? "Light mode" : "Dark mode"} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "100%", padding: "12px 0", background: "transparent", border: "none", cursor: "pointer", color: C.textMuted }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.surface)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
          {isDark ? Icon.sun(C.textMuted) : Icon.moon(C.textMuted)}
          <span style={{ fontSize: 10, fontWeight: 700 }}>Theme</span>
        </button>
        <button onClick={user ? signOut : goLogin} title={user ? "Sign out" : "Sign in"} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "100%", padding: "12px 0", background: "transparent", border: "none", cursor: "pointer", color: user ? C.red : C.accent }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.surface)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
          {user ? Icon.signout(C.red) : Icon.signin(C.accent)}
          <span style={{ fontSize: 10, fontWeight: 700 }}>{user ? "Sign out" : "Sign in"}</span>
        </button>
      </div>
    </nav>
  );
}
