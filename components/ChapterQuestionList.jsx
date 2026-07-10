"use client";
/**
 * ChapterQuestionList.jsx -- Marks-style "All PYQs" page.
 *
 * Two behavior contracts worth remembering:
 *
 * 1) Staged filter mode (like Marks). Clicking a chip only updates
 *    "pending" local state. Nothing refetches until "Show Results" is
 *    clicked. "Cancel" reverts pending back to committed. If no changes
 *    are pending, neither button is shown. On very first load, questions
 *    show immediately for the initial (URL-provided) filter state; no
 *    Show Results click is needed to see them.
 *
 * 2) Entry-locked filters. If the user arrived here from a bucket on
 *    the Chapter Overview page (e.g. clicked "Easy", "Numerical", or
 *    a specific topic), that filter is considered COMMITTED and its
 *    filter section is hidden from the sidebar -- you can't undo it
 *    without going back. Only the other filters remain adjustable.
 *    "All PYQs" arrival shows all filter sections.
 */
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
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

// Which filter sections should be visible given the "entry lock".
// If the user arrived by picking Difficulty=easy, we hide the whole
// difficulty section (they can't change it here, they'd have to go
// back). Same logic for questionType and topic. attemptStatus and
// years are always adjustable when logged in / available.
function computeVisibleSections(lockedKeys) {
  return {
    difficulty: !lockedKeys.includes("difficulty"),
    questionType: !lockedKeys.includes("questionType"),
    topic: !lockedKeys.includes("topic"),
    years: true,
    attemptStatus: true,
    sortBy: true,
  };
}

function FilterGroups({
  C, pending, setPending,
  availableYears, datesByYear,
  examLabel, showAttemptStatus, currentYear,
  visibleSections,
}) {
  const toggle = (key, val) => {
    setPending((f) => {
      const arr = f[key] || [];
      const next = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
      return { ...f, [key]: next };
    });
  };

  const applyQuickYears = (n) => {
    const cutoff = currentYear - n + 1;
    const range = availableYears.filter((y) => y >= cutoff);
    setPending((f) => ({ ...f, years: range, dates: [] }));
  };
  const clearYears = () => setPending((f) => ({ ...f, years: [], dates: [] }));

  const [expandedYear, setExpandedYear] = useState(null);

  const Chip = ({ label, active, onClick, color, disabled }) => (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
        border: `1.5px solid ${active ? (color || C.accent) : C.border}`,
        background: disabled ? "transparent" : active ? (color || C.accent) + "22" : C.surface,
        color: disabled ? C.textDim : active ? (color || C.accent) : C.textMuted,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >{label}</button>
  );

  const SectionTitle = ({ children, extra }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
      <span style={{ fontSize: 10, fontWeight: 800, color: C.textMuted, letterSpacing: 0.8, textTransform: "uppercase" }}>{children}</span>
      {extra}
    </div>
  );

  const yearActive = (y) => (pending.years || []).includes(y);
  const dateActive = (dateKey) => (pending.dates || []).includes(dateKey);
  const yearHasSomeDates = (y) => (pending.dates || []).some((d) => d.startsWith(`${y}:`));

  return (
    <div>
      {visibleSections.sortBy && (
        <div style={{ marginBottom: 22 }}>
          <SectionTitle>Sort By</SectionTitle>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Chip label="Default" active disabled onClick={() => {}} />
            <Chip label="Year New→Old" disabled onClick={() => {}} />
            <Chip label="Last Practiced" disabled onClick={() => {}} />
          </div>
          <div style={{ fontSize: 10, color: C.textDim, marginTop: 6 }}>Coming soon</div>
        </div>
      )}

      {visibleSections.attemptStatus && showAttemptStatus && (
        <div style={{ marginBottom: 22 }}>
          <SectionTitle>
            Attempt Status
            {(pending.attemptStatus || []).length > 0 && (
              <button onClick={() => setPending((f) => ({ ...f, attemptStatus: [] }))} style={{ background: "none", border: "none", color: C.red, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Clear</button>
            )}
          </SectionTitle>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Chip label="✓ Correct" active={(pending.attemptStatus || []).includes("correct")} onClick={() => toggle("attemptStatus", "correct")} color={C.green} />
            <Chip label="✗ Incorrect" active={(pending.attemptStatus || []).includes("incorrect")} onClick={() => toggle("attemptStatus", "incorrect")} color={C.red} />
            <Chip label="○ Unattempted" active={(pending.attemptStatus || []).includes("unattempted")} onClick={() => toggle("attemptStatus", "unattempted")} />
          </div>
        </div>
      )}

      {visibleSections.difficulty && (
        <div style={{ marginBottom: 22 }}>
          <SectionTitle>
            Difficulty
            {(pending.difficulty || []).length > 0 && (
              <button onClick={() => setPending((f) => ({ ...f, difficulty: [] }))} style={{ background: "none", border: "none", color: C.red, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Clear</button>
            )}
          </SectionTitle>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Chip label="Easy" active={(pending.difficulty || []).includes("easy")} onClick={() => toggle("difficulty", "easy")} color={C.green} />
            <Chip label="Medium" active={(pending.difficulty || []).includes("medium")} onClick={() => toggle("difficulty", "medium")} color={C.amber} />
            <Chip label="Hard" active={(pending.difficulty || []).includes("hard")} onClick={() => toggle("difficulty", "hard")} color={C.red} />
          </div>
        </div>
      )}

      {visibleSections.questionType && (
        <div style={{ marginBottom: 22 }}>
          <SectionTitle>
            Question Type
            {(pending.questionType || []).length > 0 && (
              <button onClick={() => setPending((f) => ({ ...f, questionType: [] }))} style={{ background: "none", border: "none", color: C.red, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Clear</button>
            )}
          </SectionTitle>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Chip label="MCQ" active={(pending.questionType || []).includes("MCQ")} onClick={() => toggle("questionType", "MCQ")} color={C.blue} />
            <Chip label="MSQ" active={(pending.questionType || []).includes("MSQ")} onClick={() => toggle("questionType", "MSQ")} color={C.purple} />
            <Chip label="Numerical" active={(pending.questionType || []).includes("NUMERICAL")} onClick={() => toggle("questionType", "NUMERICAL")} color={C.orange} />
          </div>
        </div>
      )}

      {visibleSections.years && availableYears.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <SectionTitle>
            Years
            {((pending.years || []).length > 0 || (pending.dates || []).length > 0) && (
              <button onClick={clearYears} style={{ background: "none", border: "none", color: C.red, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Clear</button>
            )}
          </SectionTitle>
          <div style={{ fontSize: 10, color: C.textDim, marginBottom: 8 }}>Quick Filters</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            <Chip label="Last Year" onClick={() => applyQuickYears(1)} />
            <Chip label="Last 3 Years" onClick={() => applyQuickYears(3)} />
            <Chip label="Last 5 Years" onClick={() => applyQuickYears(5)} />
            <Chip label="Last 10 Years" onClick={() => applyQuickYears(10)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {availableYears.map((y) => {
              const dates = datesByYear[y] || [];
              const isExpanded = expandedYear === y;
              const anyDatePicked = yearHasSomeDates(y);
              const boxActive = yearActive(y) || anyDatePicked;
              return (
                <div key={y} style={{ border: `1px solid ${boxActive ? C.accent : C.border}`, borderRadius: 10, background: boxActive ? C.accentBg : C.surface, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", padding: "8px 12px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, cursor: "pointer", fontSize: 13, fontWeight: 700, color: boxActive ? C.accentLight : C.text }}>
                      <input type="checkbox" checked={yearActive(y)} onChange={() => toggle("years", y)} style={{ accentColor: C.accent, cursor: "pointer" }} />
                      {examLabel} {y}
                    </label>
                    {dates.length > 0 && (
                      <button onClick={() => setExpandedYear(isExpanded ? null : y)} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 10, padding: 4, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform .15s" }}>▼</button>
                    )}
                  </div>
                  {isExpanded && dates.length > 0 && (
                    <div style={{ padding: "0 12px 12px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 6 }}>
                      {dates.map((d) => {
                        const key = `${y}:${d.date || ""}:${d.shift || ""}`;
                        const label = d.date
                          ? `${new Date(d.date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}${d.shift ? " " + d.shift : ""}`
                          : d.shift || "—";
                        const active = dateActive(key);
                        return (
                          <button key={key} onClick={() => toggle("dates", key)} style={{ padding: "8px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, border: `1.5px solid ${active ? C.accent : C.border}`, background: active ? C.accent + "22" : C.bgCard, color: active ? C.accentLight : C.textMuted, cursor: "pointer", lineHeight: 1.3 }}>
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
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

// Deep-equals for the filter shape we use. Enough to compare pending
// vs committed without needing a dependency.
function filtersEqual(a, b) {
  const keys = ["years", "dates", "difficulty", "questionType", "attemptStatus"];
  for (const k of keys) {
    const av = a[k] || [];
    const bv = b[k] || [];
    if (av.length !== bv.length) return false;
    const sa = [...av].sort().join("|");
    const sb = [...bv].sort().join("|");
    if (sa !== sb) return false;
  }
  return true;
}

export default function ChapterQuestionList({
  examSlug, examLabel, chapterName, topicName,
  subjectSlug, chapterSlug, topicSlug,
  // Initial filters seeded from the URL. These represent the user's
  // "entry point" -- e.g. if they arrived via the Easy bucket, this
  // will have difficulty=["easy"]. That's what gets locked in.
  initialFilters = {},
  apiBase, C,
}) {
  const normSlug = normalizeExamSlug(examSlug);
  const examId = EXAM_SLUG_TO_ID[normSlug];
  const currentYear = new Date().getFullYear();

  // Which filter categories are "entry-locked" -- i.e. arrived via URL
  // and can't be changed here.
  const lockedKeys = useMemo(() => {
    const locks = [];
    if ((initialFilters.difficulty || []).length > 0) locks.push("difficulty");
    if ((initialFilters.questionType || []).length > 0) locks.push("questionType");
    if (topicSlug) locks.push("topic");
    return locks;
  }, [initialFilters, topicSlug]);
  const visibleSections = useMemo(() => computeVisibleSections(lockedKeys), [lockedKeys]);

  // Build the starting filter object from the URL-provided initial
  // filters. IMPORTANT: this is used with useState's LAZY initializer
  // form (useState(() => ...)) so it runs exactly once at mount and
  // reads initialFilters as-passed. The earlier version used
  // useState(defaultFilters) which could capture a stale/empty object
  // if the parent re-rendered (it passes a fresh initialFilters object
  // literal every render) -- that was the bug causing difficulty=easy
  // to be dropped and all 107 questions to show.
  const makeInitial = () => ({
    years: initialFilters.years || [],
    dates: initialFilters.dates || [],
    difficulty: initialFilters.difficulty || [],
    questionType: initialFilters.questionType || [],
    attemptStatus: initialFilters.attemptStatus || [],
  });

  // "committed" = what the question list is currently filtered by,
  // what's in the URL / actually runs a fetch.
  // "pending"   = what the sidebar chips currently show; local UI only
  //               until user hits "Show Results".
  const [committed, setCommitted] = useState(makeInitial);
  const [pending, setPending] = useState(makeInitial);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [availableYears, setAvailableYears] = useState([]);
  const [datesByYear, setDatesByYear] = useState({});

  const [questions, setQuestions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [attemptMap, setAttemptMap] = useState({});
  const [bookmarkSet, setBookmarkSet] = useState(new Set());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data?.session?.user || null));
  }, []);

  // Fetch year/date facets ONCE for this chapter/topic. Unaffected by
  // difficulty/questionType because year is a paper-scope filter.
  useEffect(() => {
    if (!examId) return;
    const qs = new URLSearchParams({ exam_id: String(examId) });
    if (subjectSlug) qs.append("subject", subjectSlug);
    if (chapterSlug) qs.append("chapter", chapterSlug);
    if (topicSlug) qs.append("topic", topicSlug);
    fetch(`${apiBase}/api/questions?${qs.toString()}&limit=100&offset=0`)
      .then((r) => r.json())
      .then((data) => {
        const rows = data?.questions || [];
        const yearSet = new Set();
        const dateBuckets = {};
        rows.forEach((q) => {
          if (!q.year) return;
          yearSet.add(q.year);
          if (!dateBuckets[q.year]) dateBuckets[q.year] = new Map();
          const key = `${q.exam_date || ""}|${q.shift || ""}`;
          if (!dateBuckets[q.year].has(key)) dateBuckets[q.year].set(key, { date: q.exam_date, shift: q.shift });
        });
        const yearsSorted = Array.from(yearSet).sort((a, b) => b - a);
        const dbyYear = {};
        yearsSorted.forEach((y) => {
          const dr = Array.from(dateBuckets[y].values());
          dr.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
          dbyYear[y] = dr;
        });
        setAvailableYears(yearsSorted);
        setDatesByYear(dbyYear);
      })
      .catch(console.error);
  }, [examId, subjectSlug, chapterSlug, topicSlug, apiBase]);

  // Main question fetch keyed off COMMITTED filters, never pending.
  // This is what enforces staged behavior.
  useEffect(() => {
    if (!examId) return;
    setLoading(true);
    const qs = new URLSearchParams({ exam_id: String(examId) });
    if (subjectSlug) qs.append("subject", subjectSlug);
    if (chapterSlug) qs.append("chapter", chapterSlug);
    if (topicSlug) qs.append("topic", topicSlug);
    (committed.years || []).forEach((y) => qs.append("year", String(y)));
    (committed.difficulty || []).forEach((d) => qs.append("difficulty", d));
    (committed.questionType || []).forEach((qt) => qs.append("question_type", qt));
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
  }, [examId, subjectSlug, chapterSlug, topicSlug, committed, page, apiBase]);

  // Reset page when committed changes (not pending).
  useEffect(() => { setPage(1); }, [committed]);

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

  // Bookmarks for this question set (only needed for the bookmarkedOnly view).
  useEffect(() => {
    if (!user || !initialFilters.bookmarkedOnly || questions.length === 0) { setBookmarkSet(new Set()); return; }
    const qIds = questions.map((q) => q.id);
    supabase.from("bookmarks").select("question_id").in("question_id", qIds)
      .then(({ data }) => setBookmarkSet(new Set((data || []).map((b) => b.question_id))));
  }, [user, questions, initialFilters.bookmarkedOnly]);

  const visibleQuestions = useMemo(() => {
    let list = questions;
    if ((committed.dates || []).length > 0) {
      const dateSet = new Set(committed.dates);
      list = list.filter((q) => dateSet.has(`${q.year}:${q.exam_date || ""}:${q.shift || ""}`));
    }
    if (user && (committed.attemptStatus || []).length > 0) {
      list = list.filter((q) => committed.attemptStatus.includes(attemptMap[q.id] || "unattempted"));
    }
    if (user && initialFilters.bookmarkedOnly) {
      list = list.filter((q) => bookmarkSet.has(q.id));
    }
    return list;
  }, [questions, committed.dates, committed.attemptStatus, attemptMap, user, bookmarkSet, initialFilters.bookmarkedOnly]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const activeCommittedCount =
    (committed.years?.length || 0) +
    (committed.dates?.length || 0) +
    (committed.difficulty?.length || 0) +
    (committed.questionType?.length || 0) +
    (committed.attemptStatus?.length || 0);

  const hasPendingChanges = !filtersEqual(pending, committed);

  const applyPending = () => setCommitted(pending);
  const cancelPending = () => setPending(committed);
  const clearAllCommitted = () => {
    const empty = { years: [], dates: [], difficulty: initialFilters.difficulty || [], questionType: initialFilters.questionType || [], attemptStatus: [] };
    setCommitted(empty);
    setPending(empty);
  };

  const buildQuestionHref = useCallback((q) => {
    const parts = new URLSearchParams();
    if (topicSlug) parts.set("topic", topicSlug);
    (committed.years || []).forEach((y) => parts.append("year", String(y)));
    (committed.difficulty || []).forEach((d) => parts.append("difficulty", d));
    (committed.questionType || []).forEach((qt) => parts.append("question_type", qt));
    const qs = parts.toString();
    return `/pyq/${normSlug}/${subjectSlug}/${chapterSlug}/${q.slug}${qs ? `?${qs}` : ""}`;
  }, [topicSlug, committed.years, committed.difficulty, committed.questionType, normSlug, subjectSlug, chapterSlug]);

  const goPage = (p) => { if (p >= 1 && p <= totalPages) { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); } };

  const filterGroupProps = {
    C, pending, setPending,
    availableYears, datesByYear,
    examLabel, showAttemptStatus: !!user,
    currentYear, visibleSections,
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "16px 20px 100px", display: "flex", gap: 24, alignItems: "flex-start" }}>

        {!isMobile && (
          <aside style={{ width: 280, flexShrink: 0, position: "sticky", top: 16, maxHeight: "calc(100vh - 32px)", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 16px 12px", flexShrink: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: C.text, display: "flex", alignItems: "center", gap: 6 }}>
                Filter & Sort
                {activeCommittedCount > 0 && <span style={{ background: C.accent, color: "#fff", borderRadius: 20, padding: "1px 8px", fontSize: 10, fontWeight: 800 }}>{activeCommittedCount}</span>}
              </span>
              {activeCommittedCount > 0 && (
                <button onClick={clearAllCommitted} style={{ background: "none", border: "none", color: C.red, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Clear all</button>
              )}
            </div>
            {/* Scrollable filter body -- scrolls independently so the
                footer buttons never overlap the year list. */}
            <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 16px" }}>
              <FilterGroups {...filterGroupProps} />
            </div>
            {/* Pinned footer -- solid background, flex-shrink 0, so it
                always sits below the scroll area, never floating over it. */}
            {hasPendingChanges && (
              <div style={{ display: "flex", gap: 8, padding: "12px 16px", borderTop: `1px solid ${C.border}`, background: C.bgCard, flexShrink: 0 }}>
                <button onClick={cancelPending} style={{ flex: 1, padding: "11px", borderRadius: 10, background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Cancel</button>
                <button onClick={applyPending} style={{ flex: 2, padding: "11px", borderRadius: 10, background: C.accent, color: "#fff", border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Show Results</button>
              </div>
            )}
          </aside>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 16 }}>
            <BackButton C={C} fallbackHref={`/pyq/${normSlug}/${subjectSlug}/${chapterSlug}?view=overview`} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>
              {examLabel}{topicName ? ` › ${chapterName}` : ""}
              {lockedKeys.length > 0 && (
                <span style={{ marginLeft: 8, color: C.accentLight }}>
                  ·{" "}
                  {[
                    (committed.difficulty || []).length > 0 ? (committed.difficulty || []).map((d) => d[0].toUpperCase() + d.slice(1)).join(", ") : null,
                    (committed.questionType || []).length > 0 ? (committed.questionType || []).join(", ") : null,
                  ].filter(Boolean).join(" · ")}
                </span>
              )}
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: 0 }}>
              {topicName || chapterName}
            </h1>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>
              {total.toLocaleString()} {topicName ? "Topic PYQs" : "PYQs"}
              {!user && <> · <Link href="/login" style={{ color: C.accentLight }}>Sign in</Link> to track progress</>}
            </div>
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
              {activeCommittedCount > 0 && (
                <button onClick={clearAllCommitted} style={{ marginTop: 12, padding: "8px 18px", borderRadius: 8, border: `1px solid ${C.accent}`, background: "transparent", color: C.accentLight, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Clear filters</button>
              )}
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
      </div>

      {isMobile && (
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
            zIndex: 400, padding: "12px 22px", borderRadius: 30,
            background: C.accent, color: "#fff", border: "none",
            fontSize: 14, fontWeight: 800, cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          ⚙ Filter
          {activeCommittedCount > 0 && (
            <span style={{ background: "#fff", color: C.accent, borderRadius: 20, padding: "1px 8px", fontSize: 11, fontWeight: 800 }}>{activeCommittedCount}</span>
          )}
        </button>
      )}

      {isMobile && mobileOpen && (
        <div onClick={() => { cancelPending(); setMobileOpen(false); }} style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", background: C.bgCard, borderRadius: "18px 18px 0 0", padding: "18px 20px 20px", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: C.text }}>Filter & Sort {activeCommittedCount > 0 && <span style={{ background: C.accent, color: "#fff", borderRadius: 20, padding: "1px 8px", fontSize: 10, marginLeft: 4 }}>{activeCommittedCount}</span>}</span>
              <button onClick={() => { cancelPending(); setMobileOpen(false); }} style={{ background: "none", border: "none", color: C.textMuted, fontSize: 20, cursor: "pointer" }}>×</button>
            </div>
            <FilterGroups {...filterGroupProps} />
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button onClick={() => { cancelPending(); setMobileOpen(false); }} style={{ flex: 1, padding: "13px", borderRadius: 10, background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { applyPending(); setMobileOpen(false); }} style={{ flex: 2, padding: "13px", borderRadius: 10, background: C.accent, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Show Results</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                          }
