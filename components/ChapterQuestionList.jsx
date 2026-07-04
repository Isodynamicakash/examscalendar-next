"use client";
/**
 * ChapterQuestionList.jsx -- Marks-style "All PYQs" page shown after
 * picking a chapter (or a topic).
 *
 * Deliberately does NOT include subject/chapter/topic filters -- those
 * were already committed by the URL that got us here. Only shows filters
 * that narrow WITHIN this chapter/topic: Years, Difficulty, and (for
 * logged-in users) Attempt Status.
 *
 * Question list shows ✓/✗ badges based on the user's LATEST attempt per
 * question (only for logged-in users -- logged-out users see no badges).
 */
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BackButton from "./BackButton";

const PAGE_SIZE = 10;
const EXAM_SLUG_TO_ID = { "jee-main": 1, "jee-advanced": 2, neet: 3, "ssc-cgl": 6 };
const SLUG_ALIAS = { "jee-mains": "jee-main", "jee-adv": "jee-advanced" };
function normalizeExamSlug(s) { const slug = (s || "").trim().toLowerCase(); return SLUG_ALIAS[slug] || slug; }

function questionPreview(text, maxLen = 160) {
  if (!text) return "";
  const t = text
    .replace(/\[IMAGE:[^\]]+\]/g, "")
    .replace(/\$\$?([^$]*)\$\$?/g, "$1")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}\\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return t.length > maxLen ? t.slice(0, maxLen).trim() + "…" : t;
}

function FilterModal({ open, onClose, C, availableYears, filters, setFilters, showAttemptStatus }) {
  if (!open) return null;
  const toggle = (key, val) => {
    setFilters((f) => {
      const arr = f[key] || [];
      const next = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
      return { ...f, [key]: next };
    });
  };
  const clearAll = () => setFilters({ years: [], difficulty: [], attemptStatus: [] });

  const Chip = ({ label, active, onClick, color }) => (
    <button onClick={onClick} style={{
      padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700,
      border: `1.5px solid ${active ? (color || C.accent) : C.border}`,
      background: active ? (color || C.accent) + "22" : "transparent",
      color: active ? (color || C.accent) : C.textMuted, cursor: "pointer",
    }}>{label}</button>
  );

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 520, background: C.bgCard, borderRadius: "18px 18px 0 0", padding: "18px 20px 20px", maxHeight: "82vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: C.text }}>Filter</span>
          <button onClick={clearAll} style={{ background: "none", border: "none", color: C.red, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Clear Filters</button>
        </div>

        {showAttemptStatus && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 10 }}>Attempt Status</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Chip label="✓ Correct" active={(filters.attemptStatus || []).includes("correct")} onClick={() => toggle("attemptStatus", "correct")} color={C.green} />
              <Chip label="✗ Incorrect" active={(filters.attemptStatus || []).includes("incorrect")} onClick={() => toggle("attemptStatus", "incorrect")} color={C.red} />
              <Chip label="○ Unattempted" active={(filters.attemptStatus || []).includes("unattempted")} onClick={() => toggle("attemptStatus", "unattempted")} color={C.textMuted} />
            </div>
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 10 }}>Difficulty</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Chip label="Easy" active={(filters.difficulty || []).includes("easy")} onClick={() => toggle("difficulty", "easy")} color={C.green} />
            <Chip label="Medium" active={(filters.difficulty || []).includes("medium")} onClick={() => toggle("difficulty", "medium")} color={C.amber} />
            <Chip label="Hard" active={(filters.difficulty || []).includes("hard")} onClick={() => toggle("difficulty", "hard")} color={C.red} />
          </div>
        </div>

        {availableYears.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 10 }}>Years</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {availableYears.map((y) => (
                <Chip key={y} label={String(y)} active={(filters.years || []).includes(y)} onClick={() => toggle("years", y)} />
              ))}
            </div>
          </div>
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "13px", borderRadius: 10, background: C.accent, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          Show Results
        </button>
      </div>
    </div>
  );
}

function AttemptBadge({ status, C }) {
  if (!status) return null;
  const map = {
    correct: { icon: "✓", color: C.green, bg: C.greenBg },
    incorrect: { icon: "✗", color: C.red, bg: C.redBg },
  };
  const s = map[status];
  if (!s) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", background: s.bg, color: s.color, fontWeight: 800, fontSize: 11, border: `1px solid ${s.color}55`, flexShrink: 0 }}>
      {s.icon}
    </span>
  );
}

export default function ChapterQuestionList({
  examSlug, examLabel, chapterName, topicName,
  subjectSlug, chapterSlug, topicSlug,
  apiBase, C,
}) {
  const router = useRouter();
  const normSlug = normalizeExamSlug(examSlug);
  const examId = EXAM_SLUG_TO_ID[normSlug];

  const [filters, setFilters] = useState({ years: [], difficulty: [], attemptStatus: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [availableYears, setAvailableYears] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [attemptMap, setAttemptMap] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data?.session?.user || null));
  }, []);

  useEffect(() => {
    if (!examId) return;
    const qs = new URLSearchParams({ exam_id: String(examId) });
    if (subjectSlug) qs.append("subject", subjectSlug);
    if (chapterSlug) qs.append("chapter", chapterSlug);
    if (topicSlug) qs.append("topic", topicSlug);
    fetch(`${apiBase}/api/questions?${qs.toString()}&limit=100&offset=0`)
      .then((r) => r.json())
      .then((data) => {
        const years = Array.from(new Set((data?.questions || []).map((q) => q.year).filter(Boolean))).sort((a, b) => b - a);
        setAvailableYears(years);
      })
      .catch(console.error);
  }, [examId, subjectSlug, chapterSlug, topicSlug, apiBase]);

  useEffect(() => {
    if (!examId) return;
    setLoading(true);
    const qs = new URLSearchParams({ exam_id: String(examId) });
    if (subjectSlug) qs.append("subject", subjectSlug);
    if (chapterSlug) qs.append("chapter", chapterSlug);
    if (topicSlug) qs.append("topic", topicSlug);
    (filters.years || []).forEach((y) => qs.append("year", String(y)));
    (filters.difficulty || []).forEach((d) => qs.append("difficulty", d));
    qs.set("limit", String(PAGE_SIZE));
    qs.set("offset", String((page - 1) * PAGE_SIZE));

    fetch(`${apiBase}/api/questions?${qs.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data?.questions || []);
        setTotal(data?.total || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [examId, subjectSlug, chapterSlug, topicSlug, filters.years, filters.difficulty, page, apiBase]);

  useEffect(() => { setPage(1); }, [filters.years, filters.difficulty, filters.attemptStatus]);

  useEffect(() => {
    if (!user || questions.length === 0) { setAttemptMap({}); return; }
    const qIds = questions.map((q) => q.id);
    supabase
      .from("user_attempts")
      .select("question_id, is_correct, attempted_at")
      .in("question_id", qIds)
      .order("attempted_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) { console.error("Attempts fetch failed:", error); return; }
        const seen = new Map();
        (data || []).forEach((row) => {
          if (!seen.has(row.question_id)) seen.set(row.question_id, row.is_correct ? "correct" : "incorrect");
        });
        setAttemptMap(Object.fromEntries(seen));
      });
  }, [user, questions]);

  const visibleQuestions = useMemo(() => {
    if (!user || (filters.attemptStatus || []).length === 0) return questions;
    return questions.filter((q) => {
      const status = attemptMap[q.id] || "unattempted";
      return filters.attemptStatus.includes(status);
    });
  }, [questions, attemptMap, filters.attemptStatus, user]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const activeFilterCount = (filters.years?.length || 0) + (filters.difficulty?.length || 0) + (filters.attemptStatus?.length || 0);

  const buildQuestionHref = useCallback((q) => {
    const parts = new URLSearchParams();
    if (topicSlug) parts.set("topic", topicSlug);
    (filters.years || []).forEach((y) => parts.append("year", String(y)));
    (filters.difficulty || []).forEach((d) => parts.append("difficulty", d));
    const qs = parts.toString();
    return `/pyq/${normSlug}/${subjectSlug}/${chapterSlug}/${q.slug}${qs ? `?${qs}` : ""}`;
  }, [topicSlug, filters.years, filters.difficulty, normSlug, subjectSlug, chapterSlug]);

  const goPage = (p) => { if (p >= 1 && p <= totalPages) { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); } };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 20px 60px" }}>
        <div style={{ marginBottom: 16 }}>
          <BackButton C={C} fallbackHref={`/pyq/${normSlug}/${subjectSlug}/${chapterSlug}`} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>{examLabel}{topicName ? ` › ${chapterName}` : ""}</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: 0 }}>
            {topicName || chapterName}
          </h1>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>
            {total.toLocaleString()} {topicName ? "Topic PYQs" : "PYQs"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={() => setModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 20, border: `1px solid ${activeFilterCount > 0 ? C.accent : C.border}`, background: activeFilterCount > 0 ? C.accentBg : C.surface, color: activeFilterCount > 0 ? C.accentLight : C.text, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            ⚙ Filter{activeFilterCount > 0 && <span style={{ background: C.accent, color: "#fff", borderRadius: 20, fontSize: 10, fontWeight: 800, padding: "1px 6px" }}>{activeFilterCount}</span>}
          </button>
          {!user && (
            <span style={{ fontSize: 11, color: C.textDim, marginLeft: "auto" }}>
              <Link href="/login" style={{ color: C.accentLight }}>Sign in</Link> to track your progress
            </span>
          )}
        </div>

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 2, 3].map((i) => (<div key={i} style={{ height: 100, borderRadius: 12, background: C.bgCard, border: `1px solid ${C.border}` }} />))}
          </div>
        )}

        {!loading && visibleQuestions.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.textMuted }}>No questions match these filters</div>
          </div>
        )}

        {!loading && visibleQuestions.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {visibleQuestions.map((q, i) => {
              const status = user ? (attemptMap[q.id] || null) : null;
              const number = (page - 1) * PAGE_SIZE + i + 1;
              return (
                <Link key={q.slug || q.id} href={buildQuestionHref(q)} style={{ display: "flex", gap: 14, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", color: C.text, textDecoration: "none" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, minWidth: 26 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.textMuted }}>{number}</span>
                    <AttemptBadge status={status} C={C} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, lineHeight: 1.55, color: C.text, marginBottom: 6 }}>{questionPreview(q.question_text)}</div>
                    <div style={{ fontSize: 11, color: C.textDim }}>
                      {examLabel} {q.year} {q.exam_date ? `(${new Date(q.exam_date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}${q.shift ? " " + q.shift : ""})` : q.shift ? `(${q.shift})` : ""}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={() => goPage(page - 1)} disabled={page === 1} style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: page === 1 ? C.textDim : C.text, cursor: page === 1 ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 13 }}>‹ Prev</button>
            <span style={{ fontSize: 13, color: C.textMuted }}>Page <strong style={{ color: C.text }}>{page}</strong> of {totalPages}</span>
            <button onClick={() => goPage(page + 1)} disabled={page === totalPages} style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: page === totalPages ? C.textDim : C.text, cursor: page === totalPages ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 13 }}>Next ›</button>
          </div>
        )}
      </div>

      <FilterModal open={modalOpen} onClose={() => setModalOpen(false)} C={C} availableYears={availableYears} filters={filters} setFilters={setFilters} showAttemptStatus={!!user} />
    </div>
  );
            }
