"use client";
// Bookmarks index page. Client component because it reads from Supabase
// directly (needs the browser session cookie for RLS to apply). If the
// user isn't logged in, RLS will simply return zero rows -- no explicit
// auth check needed for correctness, but we show a friendly prompt.
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { DARK } from "@/lib/questionTheme";

export default function BookmarksPage() {
  const T = DARK;
  const [state, setState] = useState({ status: "loading", user: null, rows: [] });

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess?.session?.user || null;
      if (!user) { setState({ status: "logged-out", user: null, rows: [] }); return; }

      // Step 1: fetch this user's bookmarks (RLS ensures we only get our own).
      const { data: bookmarks, error: bmError } = await supabase
        .from("bookmarks")
        .select("id, created_at, question_id")
        .order("created_at", { ascending: false });

      if (bmError) { setState({ status: "error", user, rows: [], error: bmError.message }); return; }
      if (!bookmarks || bookmarks.length === 0) { setState({ status: "ok", user, rows: [] }); return; }

      // Step 2: fetch the corresponding question rows from v_questions_full,
      // which already has all the joined fields (exam_slug/subject_slug/
      // chapter_slug/question_text). We can't do this as a nested select
      // because Supabase's PostgREST joins don't work through views -- so
      // we fetch separately and stitch together client-side.
      const questionIds = bookmarks.map((b) => b.question_id);
      const { data: questions, error: qError } = await supabase
        .from("v_questions_full")
        .select("id, slug, question_text, exam_slug, subject_slug, chapter_slug")
        .in("id", questionIds);

      if (qError) { setState({ status: "error", user, rows: [], error: qError.message }); return; }

      const byId = new Map((questions || []).map((q) => [q.id, q]));
      const rows = bookmarks
        .map((b) => ({ ...b, question: byId.get(b.question_id) }))
        .filter((r) => r.question); // drop bookmarks whose question was deleted upstream

      setState({ status: "ok", user, rows });
    })();
  }, []);

  const stripLatex = (s) => (s || "").replace(/\[IMAGE:[^\]]+\]/g, "").replace(/\$\$?([^$]*)\$\$?/g, "$1").replace(/\\[a-zA-Z]+/g, " ").replace(/[{}\\]/g, "").replace(/\s+/g, " ").trim();
  const preview = (s, n = 140) => { const t = stripLatex(s); return t.length > n ? t.slice(0, n) + "…" : t; };

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <nav style={{ padding: "16px 20px", fontSize: 13, color: T.textMuted }}>
        <Link href="/">← Home</Link>
      </nav>
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 60px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 6px" }}>My Bookmarks</h1>
        <p style={{ fontSize: 13, color: T.textMuted, margin: "0 0 24px" }}>Questions you've saved to revisit later.</p>

        {state.status === "loading" && <p style={{ color: T.textMuted }}>Loading…</p>}

        {state.status === "logged-out" && (
          <div style={{ padding: 24, borderRadius: 12, background: T.bgCard, border: `1px solid ${T.border}`, textAlign: "center" }}>
            <p style={{ fontSize: 14, color: T.textMuted, margin: "0 0 12px" }}>Sign in to see your saved questions.</p>
            <Link href="/login" style={{ display: "inline-block", padding: "10px 22px", borderRadius: 10, background: T.accent, color: "#fff", fontWeight: 700, fontSize: 13 }}>Sign in</Link>
          </div>
        )}

        {state.status === "error" && (
          <div style={{ padding: 16, borderRadius: 10, background: T.redBg, border: `1px solid ${T.red}44`, color: T.redText, fontSize: 13 }}>
            Couldn't load bookmarks: {state.error}
          </div>
        )}

        {state.status === "ok" && state.rows.length === 0 && (
          <div style={{ padding: 24, borderRadius: 12, background: T.bgCard, border: `1px solid ${T.border}`, textAlign: "center" }}>
            <p style={{ fontSize: 14, color: T.textMuted, margin: 0 }}>No bookmarks yet. Tap the 🔖 icon on any question to save it here.</p>
          </div>
        )}

        {state.status === "ok" && state.rows.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {state.rows.map((row) => {
              const q = row.question;
              const href = q.exam_slug && q.subject_slug && q.chapter_slug ? `/pyq/${q.exam_slug}/${q.subject_slug}/${q.chapter_slug}/${q.slug}` : null;
              return (
                <div key={row.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontSize: 14, color: T.text, marginBottom: 6 }}>{preview(q.question_text)}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: T.textDim }}>Saved {new Date(row.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    {href && <Link href={href} style={{ fontSize: 12, fontWeight: 700, color: T.accentLight }}>Open →</Link>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
              }
