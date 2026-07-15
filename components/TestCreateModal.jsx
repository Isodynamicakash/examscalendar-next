"use client";
/**
 * TestCreateModal.jsx  (Phase 2 -- chapter entry point)
 *
 * A modal that builds a test from a given scope (chapter, or topic, or
 * subject). Flow:
 *   1. Pick a SOURCE filter -- All / Bookmarked / Unattempted / Incorrect
 *      (Mistakes == Incorrect for now). Each shows a live count.
 *   2. If the chosen source has 0 questions in this scope, show a popup
 *      ("You have no bookmarked questions in this chapter") -- don't proceed.
 *   3. Pick question count (any number up to available) + duration
 *      (auto = count x 2 min, editable).
 *   4. Generate -> creates tests + test_questions rows in Supabase, then
 *      navigates to /test?id={id}.
 *
 * Source filters are the user's progress layered on top of the scope's
 * questions:
 *   all         -> every question in scope
 *   bookmarked  -> scope ∩ user's bookmarks
 *   unattempted -> scope minus any question the user has ever attempted
 *   incorrect   -> scope where the user's LATEST attempt was wrong
 *
 * Scope questions come from the API; user history comes from Supabase, so
 * we intersect client-side (PostgREST can't join through the view).
 */
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const EXAM_SLUG_TO_ID = { "jee-main": 1, "jee-advanced": 2, neet: 3, "ssc-cgl": 6 };
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// JEE Advanced uses a flat +4/-1 for now; others use per-question marks.
function marksFor(examSlug, q) {
  if (examSlug === "jee-advanced") return { pos: 4, neg: 1 };
  return { pos: Number(q.marks_positive ?? 4), neg: Number(q.marks_negative ?? 1) };
}

const SOURCES = [
  { key: "all", label: "All Qs", icon: "📋", color: "accent" },
  { key: "incorrect", label: "Incorrect Qs", icon: "❌", color: "red" },
  { key: "unattempted", label: "Unattempted Qs", icon: "⭕", color: "amber" },
  { key: "bookmarked", label: "Bookmarked Qs", icon: "🔖", color: "purple" },
];

export default function TestCreateModal({
  open, onClose, C,
  examSlug, subjectSlug, chapterSlug, topicSlug, // scope (chapter given; topic optional)
  scopeLabel, // e.g. "Laws of Motion"
}) {
  const router = useRouter();
  const examId = EXAM_SLUG_TO_ID[examSlug];

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scopeQuestions, setScopeQuestions] = useState([]); // all questions in scope (from API)
  const [bookmarkIds, setBookmarkIds] = useState(new Set());
  const [attemptedIds, setAttemptedIds] = useState(new Set());
  const [incorrectIds, setIncorrectIds] = useState(new Set());

  const [source, setSource] = useState("all");
  const [count, setCount] = useState(10);
  const [durationMin, setDurationMin] = useState(20);
  const [durationEdited, setDurationEdited] = useState(false);
  const [popup, setPopup] = useState(null);       // empty-state message
  const [generating, setGenerating] = useState(false);

  // Load everything when opened.
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const u = sess?.session?.user || null;
      setUser(u);

      // Scope questions from the API (paginate to gather all ids -- limit=100).
      const params = new URLSearchParams();
      params.set("exam_id", String(examId));
      if (subjectSlug) params.set("subject", subjectSlug);
      if (chapterSlug) params.set("chapter", chapterSlug);
      if (topicSlug) params.set("topic", topicSlug);
      params.set("limit", "100");

      let all = [];
      let offset = 0;
      // Grab up to ~500 questions (5 pages) -- plenty for a test pool.
      for (let i = 0; i < 5; i++) {
        params.set("offset", String(offset));
        const res = await fetch(`${API_URL}/api/questions?${params.toString()}`).then((r) => r.json()).catch(() => null);
        if (!res?.questions?.length) break;
        all = all.concat(res.questions);
        if (all.length >= (res.total || 0)) break;
        offset += 100;
      }
      setScopeQuestions(all);

      // User history from Supabase (only if logged in).
      if (u) {
        const scopeIds = new Set(all.map((q) => q.id));

        const { data: bms } = await supabase.from("bookmarks").select("question_id");
        setBookmarkIds(new Set((bms || []).map((b) => b.question_id).filter((id) => scopeIds.has(id))));

        const { data: atts } = await supabase
          .from("user_attempts")
          .select("question_id, is_correct, attempted_at")
          .order("attempted_at", { ascending: true });
        const attempted = new Set();
        const latestCorrect = new Map(); // question_id -> is_correct (latest)
        (atts || []).forEach((a) => {
          if (!scopeIds.has(a.question_id)) return;
          attempted.add(a.question_id);
          latestCorrect.set(a.question_id, a.is_correct);
        });
        setAttemptedIds(attempted);
        const incorrect = new Set();
        latestCorrect.forEach((ok, qid) => { if (!ok) incorrect.add(qid); });
        setIncorrectIds(incorrect);
      } else {
        setBookmarkIds(new Set()); setAttemptedIds(new Set()); setIncorrectIds(new Set());
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, examId, subjectSlug, chapterSlug, topicSlug]);

  // Resolve the id pool for the currently-selected source.
  const pool = useMemo(() => {
    const allQ = scopeQuestions;
    if (source === "all") return allQ;
    if (source === "bookmarked") return allQ.filter((q) => bookmarkIds.has(q.id));
    if (source === "unattempted") return allQ.filter((q) => !attemptedIds.has(q.id));
    if (source === "incorrect") return allQ.filter((q) => incorrectIds.has(q.id));
    return allQ;
  }, [source, scopeQuestions, bookmarkIds, attemptedIds, incorrectIds]);

  const counts = useMemo(() => ({
    all: scopeQuestions.length,
    bookmarked: scopeQuestions.filter((q) => bookmarkIds.has(q.id)).length,
    unattempted: scopeQuestions.filter((q) => !attemptedIds.has(q.id)).length,
    incorrect: scopeQuestions.filter((q) => incorrectIds.has(q.id)).length,
  }), [scopeQuestions, bookmarkIds, attemptedIds, incorrectIds]);

  // Keep count within pool size; auto-set duration unless user edited it.
  useEffect(() => {
    const max = pool.length;
    setCount((c) => Math.min(Math.max(1, c), Math.max(1, max)));
  }, [pool.length]);
  useEffect(() => {
    if (!durationEdited) setDurationMin(Math.max(1, count * 2));
  }, [count, durationEdited]);

  if (!open) return null;

  const pickSource = (key) => {
    // Empty-state guard.
    if (key !== "all" && !user) {
      setPopup("Sign in to use this filter and track your progress.");
      return;
    }
    const c = counts[key] ?? 0;
    if (c === 0) {
      const noun = key === "bookmarked" ? "bookmarked" : key === "incorrect" ? "incorrect" : "unattempted";
      const scope = topicSlug ? "topic" : chapterSlug ? "chapter" : "subject";
      setPopup(`You have no ${noun} questions in this ${scope}.`);
      return;
    }
    setSource(key);
  };

  const generate = async () => {
    if (!user) { router.push(`/login?next=${encodeURIComponent(window.location.pathname)}`); return; }
    if (pool.length === 0) { setPopup("No questions available for this selection."); return; }
    setGenerating(true);
    try {
      // Shuffle the pool and take `count`.
      const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);

      // Create the test row.
      const { data: test, error: tErr } = await supabase.from("tests").insert({
        user_id: user.id,
        exam_slug: examSlug,
        subject_slug: subjectSlug || null,
        chapter_slug: chapterSlug || null,
        topic_slug: topicSlug || null,
        source,
        total_questions: shuffled.length,
        duration_secs: durationMin * 60,
        status: "in_progress",
      }).select().single();
      if (tErr) throw tErr;

      // Insert the question snapshot.
      const rows = shuffled.map((q, i) => {
        const m = marksFor(examSlug, q);
        return { test_id: test.id, question_id: q.id, position: i + 1, marks_positive: m.pos, marks_negative: m.neg };
      });
      const { error: qErr } = await supabase.from("test_questions").insert(rows);
      if (qErr) throw qErr;

      onClose?.();
      router.push(`/test?id=${test.id}`);
    } catch (e) {
      console.error("Test generation failed:", e);
      setPopup("Something went wrong creating the test. Please try again.");
      setGenerating(false);
    }
  };

  const colorOf = (name) => ({ accent: C.accent, red: C.red, amber: C.amber, purple: C.purple }[name] || C.accent);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 460, maxHeight: "90vh", overflowY: "auto", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 18, padding: "22px 22px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: 0 }}>Create Test</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <p style={{ fontSize: 13, color: C.textMuted, margin: "0 0 18px" }}>{scopeLabel}</p>

        {loading ? (
          <div style={{ padding: 30, textAlign: "center", color: C.textMuted, fontSize: 14 }}>Loading questions…</div>
        ) : (
          <>
            {/* Source filter cards */}
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 8 }}>Create Test From</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
              {SOURCES.map((s) => {
                const on = source === s.key;
                const c = counts[s.key] ?? 0;
                return (
                  <button key={s.key} onClick={() => pickSource(s.key)} style={{ textAlign: "left", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${on ? colorOf(s.color) : C.border}`, background: on ? C.accentBg : C.surface, cursor: "pointer" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 18 }}>{s.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: on ? C.accentLight : C.textMuted }}>{c} Qs</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: on ? C.accentLight : C.text, marginTop: 6 }}>{s.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Count */}
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 6 }}>Number of Questions</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>Available: {pool.length} Qs</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {[5, 10, 15, 20, 25, 30].filter((n) => n <= pool.length).map((n) => (
                <button key={n} onClick={() => setCount(n)} style={{ padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, border: `1.5px solid ${count === n ? C.accent : C.border}`, background: count === n ? C.accentBg : C.surface, color: count === n ? C.accentLight : C.textMuted, cursor: "pointer" }}>{n} Qs</button>
              ))}
            </div>
            <input type="number" min={1} max={pool.length} value={count}
              onChange={(e) => setCount(Math.min(pool.length, Math.max(1, parseInt(e.target.value || "1", 10))))}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 18 }} />

            {/* Duration */}
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 6 }}>Duration</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>Recommended: {count * 2} min</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <button onClick={() => { setDurationEdited(true); setDurationMin((d) => Math.max(1, d - 5)); }} style={{ padding: "8px 16px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontWeight: 800, cursor: "pointer" }}>− 5m</button>
              <div style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 800, color: C.text }}>{durationMin} min</div>
              <button onClick={() => { setDurationEdited(true); setDurationMin((d) => d + 5); }} style={{ padding: "8px 16px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontWeight: 800, cursor: "pointer" }}>+ 5m</button>
            </div>

            <button onClick={generate} disabled={generating || pool.length === 0} style={{ width: "100%", padding: "14px", borderRadius: 11, background: generating ? C.surfaceHigh : C.accent, color: generating ? C.textDim : "#fff", border: "none", fontWeight: 800, fontSize: 15, cursor: generating ? "wait" : "pointer" }}>
              {generating ? "Generating…" : `Generate Test (${count} Qs · ${durationMin} min)`}
            </button>
          </>
        )}
      </div>

      {/* Empty-state / info popup */}
      {popup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9100, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setPopup(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 22px", maxWidth: 340, textAlign: "center" }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>📭</div>
            <p style={{ fontSize: 14, color: C.text, margin: "0 0 18px", lineHeight: 1.5 }}>{popup}</p>
            <button onClick={() => setPopup(null)} style={{ padding: "10px 26px", borderRadius: 10, background: C.accent, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
                         }
