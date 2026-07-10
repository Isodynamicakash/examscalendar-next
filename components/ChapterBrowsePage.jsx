"use client";
/**
 * ChapterBrowsePage.jsx
 *
 * "Choose a chapter" screen (Marks-style): subject tabs on the left,
 * filter bar up top, chapter cards below. Now enriched with:
 *   - colorful per-chapter icons (auto-assigned)
 *   - per-chapter stats: recent-year counts + your attempted/total
 *     (totals + year counts come from ONE /api/chapter-stats call)
 *   - "Not Started" filter (chapters where you've attempted 0 questions)
 *   - "Analysis" button -> /analysis
 *   - "Continue Solving" banner (last practiced chapter, localStorage)
 *
 * Stats gracefully degrade: if the stats endpoint or attempts aren't
 * available, the page still renders the chapter list without numbers.
 */
import { useState, useMemo, useEffect } from "react";
import { EXAM_TAXONOMY } from "@/lib/taxonomy";
import { getChaptersWithUnits } from "@/lib/units";
import BackButton from "./BackButton";
import { supabase } from "@/lib/supabase";

const SLUG_ALIAS = { "jee-mains": "jee-main", "jee-adv": "jee-advanced" };
function normalizeExamSlug(s) {
  const slug = (s || "").trim().toLowerCase();
  return SLUG_ALIAS[slug] || slug;
}
const EXAM_SLUG_TO_ID = { "jee-main": 1, "jee-advanced": 2, neet: 3, "ssc-cgl": 6 };
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// A small palette of colorful chapter icons (emoji-based -- no asset
// pipeline needed, renders everywhere). Assigned by chapter index so
// each chapter gets a stable, varied look.
const CHAPTER_ICONS = ["📐", "📏", "➡️", "🎯", "⚙️", "💡", "🔋", "🧲", "🌊", "🔬", "⚛️", "🧪", "🌡️", "🔭", "📊", "🧮", "✨", "🌀", "🔆", "💫"];
const ICON_BGS = (C) => [C.blueBg, C.greenBg, C.purpleBg, C.orangeBg, C.accentBg, C.amberBg];
const ICON_COLORS = (C) => [C.blue, C.green, C.purple, C.orange, C.accent, C.amber];

function FilterModal({ open, onClose, sortBy, setSortBy, C }) {
  if (!open) return null;
  const options = [
    ["default", "Default"],
    ["az", "Alphabetical Order (A - Z)"],
    ["za", "Alphabetical Order (Z - A)"],
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 480, margin: "0 auto", background: C.bgCard, borderRadius: "18px 18px 0 0", padding: "20px 20px 24px", maxHeight: "70vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: C.text }}>Sort By</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
        {options.map(([val, label]) => (
          <button key={val} onClick={() => setSortBy(val)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "12px 4px", background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: 14 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${sortBy === val ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {sortBy === val && <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.accent }} />}
            </span>
            {label}
          </button>
        ))}
        <button onClick={onClose} style={{ marginTop: 16, width: "100%", padding: "13px", borderRadius: 10, border: "none", background: C.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          Show Results
        </button>
      </div>
    </div>
  );
}

function Dropdown({ label, value, options, onChange, C }) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
        {current?.label || label} ▾
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "110%", left: 0, zIndex: 50, minWidth: 180, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", boxShadow: C.shadow }}>
            {options.map((o) => (
              <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", background: o.value === value ? C.accentBg : "transparent", border: "none", color: o.value === value ? C.accentLight : C.text, fontSize: 13, cursor: "pointer" }}>
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ChapterBrowsePage({ examSlug, examLabel, activeSubject, onSelectSubject, onSelectChapter, C }) {
  const [classFilter, setClassFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [modalOpen, setModalOpen] = useState(false);
  const [progressFilter, setProgressFilter] = useState("all"); // all | not-started

  const examData = EXAM_TAXONOMY[normalizeExamSlug(examSlug)] || { subjects: [] };
  const subject = examData.subjects.find((s) => s.slug === activeSubject) || examData.subjects[0];
  const normSlug = normalizeExamSlug(examSlug);
  const examId = EXAM_SLUG_TO_ID[normSlug];

  useEffect(() => {
    if (!activeSubject && subject) onSelectSubject(subject.slug);
  }, [activeSubject, subject, onSelectSubject]);

  const { chapters: annotated, units: unitList } = useMemo(
    () => (subject ? getChaptersWithUnits(subject.slug, subject.chapters) : { chapters: [], units: [] }),
    [subject]
  );

  // ── Chapter stats (totals + per-year counts) from the backend ────────────
  const [statsBySlug, setStatsBySlug] = useState({});
  const [statsLoaded, setStatsLoaded] = useState(false);
  useEffect(() => {
    if (!examId || !subject?.slug) return;
    setStatsLoaded(false);
    fetch(`${API_URL}/api/chapter-stats?exam_id=${examId}&subject=${subject.slug}`)
      .then((r) => r.json())
      .then((data) => {
        const map = {};
        (data?.chapters || []).forEach((c) => { map[c.chapter_slug] = c; });
        setStatsBySlug(map);
      })
      .catch((e) => console.error("chapter-stats failed:", e))
      .finally(() => setStatsLoaded(true));
  }, [examId, subject?.slug]);

  // ── User's attempted counts per chapter (Supabase) ───────────────────────
  const [attemptedBySlug, setAttemptedBySlug] = useState({});
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const u = sess?.session?.user || null;
      setUser(u);
      if (!u || !subject?.slug) { setAttemptedBySlug({}); return; }

      // Attempts -> question_ids -> chapter_slug via v_questions_full,
      // counting DISTINCT attempted questions per chapter.
      const { data: attempts } = await supabase.from("user_attempts").select("question_id");
      const qIds = Array.from(new Set((attempts || []).map((a) => a.question_id)));
      if (qIds.length === 0) { setAttemptedBySlug({}); return; }
      const { data: qs } = await supabase
        .from("v_questions_full")
        .select("id, chapter_slug, subject_slug, exam_slug")
        .in("id", qIds);
      const perChapter = {};
      (qs || []).forEach((q) => {
        if (q.exam_slug !== normSlug || q.subject_slug !== subject.slug) return;
        perChapter[q.chapter_slug] = (perChapter[q.chapter_slug] || 0) + 1;
      });
      setAttemptedBySlug(perChapter);
    })();
  }, [subject?.slug, normSlug]);

  // ── Continue Solving (last practiced chapter, from localStorage) ──────────
  const [lastPracticed, setLastPracticed] = useState(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("last_practiced");
      if (raw) {
        const p = JSON.parse(raw);
        if (p?.examSlug === normSlug) setLastPracticed(p);
      }
    } catch {}
  }, [normSlug]);

  const filtered = useMemo(() => {
    let list = annotated.filter(
      (ch) => (classFilter === "all" || ch.class === classFilter) && (unitFilter === "all" || ch.unit === unitFilter)
    );
    if (progressFilter === "not-started") {
      list = list.filter((ch) => !(attemptedBySlug[ch.slug] > 0));
    }
    if (sortBy === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "za") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [annotated, classFilter, unitFilter, sortBy, progressFilter, attemptedBySlug]);

  const classOptions = [{ value: "all", label: "All Classes" }, { value: "11", label: "Class 11" }, { value: "12", label: "Class 12" }];
  const unitOptions = [{ value: "all", label: "All Units" }, ...unitList.map((u) => ({ value: u, label: u }))];

  const iconBgs = ICON_BGS(C);
  const iconColors = ICON_COLORS(C);

  // Recent two years present across this subject's stats, for the
  // "2026: X · 2025: Y" mini-labels.
  const recentYears = useMemo(() => {
    const yset = new Set();
    Object.values(statsBySlug).forEach((c) => Object.keys(c.by_year || {}).forEach((y) => yset.add(parseInt(y, 10))));
    return Array.from(yset).sort((a, b) => b - a).slice(0, 2);
  }, [statsBySlug]);

  const goAnalysis = () => { if (typeof window !== "undefined") window.location.assign("/analysis"); };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px 60px" }}>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <BackButton C={C} fallbackHref="/" />
        <button onClick={goAnalysis} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, border: `1px solid ${C.accent}`, background: C.accentBg, color: C.accentLight, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          📊 Analysis
        </button>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Subject tabs */}
        <div style={{ width: 180, flexShrink: 0, display: "flex", flexDirection: "column", gap: 6, position: "sticky", top: 70 }}>
          {examData.subjects.map((s) => (
            <button key={s.slug} onClick={() => onSelectSubject(s.slug)} style={{ textAlign: "left", padding: "12px 14px", borderRadius: 10, fontSize: 14, fontWeight: 700, border: `1px solid ${s.slug === subject?.slug ? C.accent : C.border}`, background: s.slug === subject?.slug ? C.accentBg : "transparent", color: s.slug === subject?.slug ? C.accentLight : C.text, cursor: "pointer" }}>
              {s.name}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>{subject?.name} PYQs</h1>
            <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>Chapter-wise Collection of {subject?.name} PYQs</p>
          </div>

          {/* Continue Solving banner */}
          {lastPracticed && lastPracticed.subjectSlug === subject?.slug && (
            <button
              onClick={() => onSelectChapter(lastPracticed.chapterSlug)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", padding: "14px 18px", borderRadius: 12, border: `1px solid ${C.accent}`, background: C.accentBg, cursor: "pointer", marginBottom: 16 }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.accentLight }}>{lastPracticed.chapterName}</div>
                <div style={{ fontSize: 12, color: C.accentLight, opacity: 0.85 }}>Continue Solving →</div>
              </div>
              <span style={{ fontSize: 20 }}>▶️</span>
            </button>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <button onClick={() => setModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              ⚙ Filter
            </button>
            <Dropdown label="All Classes" value={classFilter} options={classOptions} onChange={setClassFilter} C={C} />
            {unitList.length > 0 && <Dropdown label="All Units" value={unitFilter} options={unitOptions} onChange={setUnitFilter} C={C} />}
            <button
              onClick={() => setProgressFilter((p) => (p === "not-started" ? "all" : "not-started"))}
              title={user ? "" : "Sign in to track progress"}
              style={{ padding: "9px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: `1px solid ${progressFilter === "not-started" ? C.accent : C.border}`, background: progressFilter === "not-started" ? C.accentBg : C.surface, color: progressFilter === "not-started" ? C.accentLight : C.textMuted, cursor: "pointer" }}
            >
              Not Started
            </button>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 12, color: C.textMuted }}>Showing {filtered.length} chapters</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((ch, i) => {
              const stat = statsBySlug[ch.slug];
              const total = stat?.total ?? null;
              const attempted = attemptedBySlug[ch.slug] || 0;
              const icon = CHAPTER_ICONS[i % CHAPTER_ICONS.length];
              const bg = iconBgs[i % iconBgs.length];
              const color = iconColors[i % iconColors.length];
              return (
                <button
                  key={ch.slug}
                  onClick={() => onSelectChapter(ch.slug)}
                  style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", padding: "14px 16px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bgCard, cursor: "pointer" }}
                >
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{ch.name}</div>
                    <div style={{ fontSize: 11, color: C.textDim, marginTop: 3 }}>{ch.unit} &middot; Class {ch.class}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    {recentYears.length > 0 && stat && (
                      <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 3 }}>
                        {recentYears.map((y) => (
                          <span key={y} style={{ marginLeft: 8 }}>{y}: <strong style={{ color: C.text }}>{stat.by_year?.[String(y)] || 0}</strong></span>
                        ))}
                      </div>
                    )}
                    {total != null && (
                      <div style={{ fontSize: 12, fontWeight: 700, color: attempted > 0 ? C.green : C.textDim }}>
                        {attempted}/{total} Qs
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 0", color: C.textDim, fontSize: 13 }}>
                {progressFilter === "not-started" ? "You've started every chapter here. 🎉" : "No chapters match this filter"}
              </div>
            )}
          </div>
        </div>
      </div>

      <FilterModal open={modalOpen} onClose={() => setModalOpen(false)} sortBy={sortBy} setSortBy={setSortBy} C={C} />
    </div>
  );
}
