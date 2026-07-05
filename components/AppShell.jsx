"use client";
/**
 * AppShell.jsx -- wraps a page with the persistent NavRail (left on
 * desktop, bottom bar on mobile) and optionally the DailyGoalBar at the
 * top of the content.
 *
 * Used by: exam browse, chapter overview, chapter list, bookmarks,
 * profile. NOT used by: homepage, individual question solver, login.
 *
 * Owns the theme state so the rail's toggle and the page content stay
 * in sync via the shared ec_theme localStorage key.
 */
import { useState, useEffect } from "react";
import NavRail from "./NavRail";
import DailyGoalBar from "./DailyGoalBar";
import { DARK, LIGHT } from "@/lib/questionTheme";

export default function AppShell({ children, showDailyGoal = true }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ec_theme");
    if (saved !== null) setIsDark(saved === "dark");
  }, []);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const C = isDark ? DARK : LIGHT;
  const toggleTheme = () => setIsDark((prev) => {
    const next = !prev;
    localStorage.setItem("ec_theme", next ? "dark" : "light");
    return next;
  });

  // During SSR / static prerender there's no browser, and these
  // personalized pages need auth + localStorage anyway. Render a plain
  // background until mounted on the client -- this avoids the build-time
  // prerender crash (undefined theme access) and any hydration mismatch.
  if (!mounted) {
    return <div style={{ background: DARK.bg, minHeight: "100vh" }} />;
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavRail C={C} isDark={isDark} onToggleTheme={toggleTheme} />
      {/* Content offset: leave room for the rail on desktop (72px left),
          and for the bottom tab bar on mobile (58px bottom). */}
      <div style={{ marginLeft: isMobile ? 0 : 72, paddingBottom: isMobile ? 64 : 0, minHeight: "100vh" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 20px 40px" }}>
          {showDailyGoal && <DailyGoalBar C={C} />}
          {children}
        </div>
      </div>
    </div>
  );
}
