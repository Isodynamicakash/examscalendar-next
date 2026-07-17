"use client";
/**
 * QuestionPageShell.jsx -- client-side theme wrapper for the individual
 * question page. Kept intentionally thin: it only owns the isDark state
 * (read from localStorage, same key as AppShell/QuestionSolver) and
 * paints the outer page background + text color. All content, links,
 * math rendering, etc. are passed in as children by the server page.
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import { DARK, LIGHT } from "@/lib/questionTheme";
import BackButton from "./BackButton";

export default function QuestionPageShell({
  exam, examLabel, subjectData, chapterData, chapterHref,
  children,
}) {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("ec_theme") : null;
    if (saved !== null) setIsDark(saved === "dark");
  }, []);
  const T = isDark ? DARK : LIGHT;

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <div style={{ padding: "16px 20px 0" }}>
        <BackButton C={T} fallbackHref={chapterHref || `/pyq/${exam}`} />
      </div>

      <nav style={{ padding: "12px 20px", fontSize: 13, color: T.textMuted, display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Link href="/" style={{ color: T.textMuted }}>Home</Link> ›
        <Link href={`/pyq/${exam}`} style={{ color: T.textMuted }}>{examLabel}</Link> ›
        {subjectData && <span style={{ color: T.textDim }}>{subjectData.name}</span>} ›
        {chapterData && <Link href={chapterHref} style={{ color: T.textMuted }}>{chapterData.name}</Link>}
      </nav>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 60px" }}>
        {children}
      </main>
    </div>
  );
}
