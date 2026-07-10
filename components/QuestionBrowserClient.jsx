"use client";
/**
 * QuestionBrowserClient.jsx
 *
 * Full 1:1 port of your existing QuestionBrowser.jsx -- same navbar,
 * same sidebar (Subject/Chapter/Topic static from EXAM_TAXONOMY,
 * Year/Shift/Date live from DB), same SearchBar, same pill filters,
 * same mobile drawer, same pagination, same theme toggle. Behaves
 * identically to the current app.
 *
 * NEW: accepts optional initialActive / initialQuestions / initialTotal
 * props. When this component is mounted from a server-rendered chapter
 * page (e.g. /pyq/jee-main/physics/laws-of-motion), those props seed
 * the state so the first paint already has real content in the HTML --
 * that's what makes the page crawlable AND fully interactive after
 * hydration, with zero behavior difference from clicking through
 * manually.
 */
import AuthNavButton from "./AuthNavButton";
import NavRail from "./NavRail";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { MathJaxContext } from "better-react-mathjax";
import { EXAM_TAXONOMY, EXAM_LABEL } from "@/lib/taxonomy";
import { getChaptersWithUnits } from "@/lib/units";
import ChapterBrowsePage from "./ChapterBrowsePage";
import ChapterOverview from "./ChapterOverview";
import Link from "next/link";

// Exams that use the Marks-style single-question solver page. For these,
// list items link out to their own page instead of expanding inline.
// SSC CGL keeps the original inline-reveal QuestionCard behavior.
const SOLVER_EXAMS = new Set(["jee-main", "jee-advanced", "neet"]);

function questionPreview(text, maxLen = 150) {
  if (!text) return "";
  let t = text
    .replace(/\[IMAGE:[^\]]+\]/g, "")
    .replace(/\$\$?([^$]*)\$\$?/g, "$1")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}\\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return t.length > maxLen ? t.slice(0, maxLen).trim() + "…" : t;
}

function QuestionListLink({ q, index, C, examSlug, active }) {
  const TYPE_C = { MCQ: C.blue, MSQ: C.purple, NUMERICAL: C.orange };
  const DIFF_C = { easy: C.green, medium: C.amber, hard: C.red };

  // Carry the current filter context into the question page so
  // Previous/Next there stays within this same filtered set.
  const qs = new URLSearchParams();
  if (active?.topic) qs.set("topic", active.topic);
  if (active?.year?.[0]) qs.set("year", active.year[0]);
  if (active?.shift?.[0]) qs.set("shift", active.shift[0]);
  if (active?.difficulty?.[0]) qs.set("difficulty", active.difficulty[0]);
  if (active?.question_type?.[0]) qs.set("question_type", active.question_type[0]);
  const queryStr = qs.toString();
  const href = `/pyq/${examSlug}/${q.subject_slug}/${q.chapter_slug}/${q.slug}${queryStr ? `?${queryStr}` : ""}`;

  return (
    <Link
      href={href}
      style={{ display: "block", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", color: C.text }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 6, padding: "1px 8px" }}>Q{index + 1}</span>
        {q.question_type && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, background: (TYPE_C[q.question_type] || C.blue) + "18", color: TYPE_C[q.question_type] || C.blue, border: `1px solid ${TYPE_C[q.question_type] || C.blue}44` }}>{q.question_type}</span>}
        {q.difficulty && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, background: (DIFF_C[q.difficulty] || C.amber) + "18", color: DIFF_C[q.difficulty] || C.amber, border: `1px solid ${DIFF_C[q.difficulty] || C.amber}44`, textTransform: "capitalize" }}>{q.difficulty}</span>}
        {q.year && <span style={{ fontSize: 11, fontWeight: 700, color: C.isDark ? "#a78bfa" : "#7c3aed", marginLeft: "auto" }}>{q.year}{q.shift ? ` · ${q.shift}` : ""}</span>}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.6, color: C.text }}>{questionPreview(q.question_text)}</div>
      <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: C.accentLight }}>Solve this question →</div>
    </Link>
  );
}
import SearchBar from "./SearchBar";
import QuestionCard from "./QuestionCard";
import { DARK, LIGHT } from "@/lib/questionTheme";

const MATHJAX_CONFIG = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: { inlineMath: [["$", "$"]], displayMath: [["$$", "$$"]], packages: { "[+]": ["ams", "array"] } },
};

const SLUG_ALIAS = { "jee-mains": "jee-main", "jee-adv": "jee-advanced" };
function normalizeExamSlug(s) {
  const slug = (s || "").trim().toLowerCase();
  return SLUG_ALIAS[slug] || slug;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const PAGE_SIZE = 10;
const NAV_H = 54;

const EXAM_SLUG_TO_ID = { "jee-main": 1, "jee-advanced": 2, neet: 3, "ssc-cgl": 6 };

function subjColor(name, isDark) {
  const SUBJ_PALETTES = [
    { d: "#1a1d3a", dt: "#7c8dff", l: "#eef0ff", lt: "#4f5fd4" },
    { d: "#0d2818", dt: "#4ade80", l: "#dcfce7", lt: "#16a34a" },
    { d: "#2d1500", dt: "#fb923c", l: "#ffedd5", lt: "#ea580c" },
    { d: "#1e0f38", dt: "#c084fc", l: "#f3e8ff", lt: "#9333ea" },
    { d: "#0f1f3d", dt: "#60a5fa", l: "#dbeafe", lt: "#2563eb" },
  ];
  const i = Math.abs([...name].reduce((a, c) => a + c.charCodeAt(0), 0)) % SUBJ_PALETTES.length;
  const p = SUBJ_PALETTES[i];
  return isDark ? { bg: p.d, text: p.dt } : { bg: p.l, text: p.lt };
}

// ── Sidebar UI helpers ──────────────────────────────────────────────────────
function FilterSection({ title, children, C, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "none", border: "none", color: C.text, cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: .8, textTransform: "uppercase" }}>
        {title}
        <span style={{ fontSize: 9, display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform .18s", color: C.textDim }}>&#9662;</span>
      </button>
      {open && <div style={{ padding: "0 12px 10px" }}>{children}</div>}
    </div>
  );
}
function SItem({ label, active, onClick, accent, C, count }) {
  return (
    <button onClick={onClick} style={{ width: "100%", textAlign: "left", padding: "7px 10px", marginBottom: 3, background: active ? (accent || C.accent) + "18" : "transparent", border: `1px solid ${active ? (accent || C.accent) + "55" : "transparent"}`, borderLeft: active ? `3px solid ${accent || C.accent}` : "3px solid transparent", borderRadius: 8, color: active ? (accent || C.accent) : C.textMuted, fontSize: 13, fontWeight: active ? 700 : 400, cursor: "pointer", lineHeight: 1.4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{label}</span>
      {count != null && <span style={{ fontSize: 10, color: C.textDim, background: C.surface, borderRadius: 10, padding: "1px 6px" }}>{count}</span>}
    </button>
  );
}
function ChipGroup({ items, active, onToggle, colorFn, C }) {
  const activeArr = Array.isArray(active) ? active.map(x => String(x)) : (active ? [String(active)] : []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {items.map(item => {
        const val = typeof item === "object" ? item.value : item;
        const label = typeof item === "object" ? item.label : item;
        const on = activeArr.includes(String(val));
        const col = colorFn ? colorFn(val) : C.accent;
        return (
          <button key={val} onClick={() => onToggle(val)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, border: `1.5px solid ${on ? col : C.border}`, background: on ? col + "22" : C.surface, color: on ? col : C.textMuted, cursor: "pointer", minHeight: 34, transition: "all .12s", boxShadow: on ? `0 0 0 1px ${col}44` : "none" }}>{label}</button>
        );
      })}
    </div>
  );
}

function Sidebar({ examSlug, active, onSelect, liveFilters, C, isMobile, open, onClose }) {
  const [classFilter, setClassFilter] = useState("all"); // "all" | "11" | "12"
  const [unitFilter, setUnitFilter] = useState(null);    // unit name or null

  const handleSearchSelect = ({ subject, chapter, topic }) => {
    onSelect({ ...active, subject, chapter, topic });
  };

  const examData = EXAM_TAXONOMY[normalizeExamSlug(examSlug)] || { subjects: [] };
  const { years = [], shifts = [], dates = [], question_types = [] } = liveFilters || {};

  const selectedSubj = examData.subjects.find(s => s.slug === active.subject) || null;
  const selectedChap = selectedSubj?.chapters.find(c => c.slug === active.chapter) || null;

  // Re-annotate this subject's chapters with class (11/12) and unit info,
  // then narrow down by whichever class/unit filter is currently active.
  const { chapters: annotatedChapters, units: unitList } = selectedSubj
    ? getChaptersWithUnits(selectedSubj.slug, selectedSubj.chapters)
    : { chapters: [], units: [] };
  const visibleChapters = annotatedChapters.filter(
    (ch) => (classFilter === "all" || ch.class === classFilter) && (!unitFilter || ch.unit === unitFilter)
  );

  const diffColor = v => ({ easy: C.green, medium: C.amber, hard: C.red }[v] || C.accent);
  const typeColor = v => ({ MCQ: C.blue, MSQ: C.purple, NUMERICAL: C.orange }[v] || C.accent);

  const activeCount = [
    active.subject, active.chapter, active.topic,
    ...(active.year || []), ...(active.shift || []),
    ...(active.difficulty || []), ...(active.question_type || []),
    ...(active.exam_date || []),
  ].filter(Boolean).length;

  const EMPTY = { subject: null, chapter: null, topic: null, year: [], shift: [], difficulty: [], question_type: [], exam_date: [] };

  const toggleArr = (k, v) => {
    const arr = active[k] || [];
    const next = arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
    onSelect({ ...active, [k]: next });
  };

  const content = (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 10px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: C.text, display: "flex", alignItems: "center", gap: 6 }}>
          Filters
          {activeCount > 0 && <span style={{ background: C.accent, color: "#fff", borderRadius: 20, padding: "0px 7px", fontSize: 10, fontWeight: 800 }}>{activeCount}</span>}
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {activeCount > 0 && <button onClick={() => onSelect(EMPTY)} style={{ fontSize: 11, color: C.red, background: C.redBg, border: `1px solid ${C.red}33`, borderRadius: 20, padding: "3px 10px", cursor: "pointer", fontWeight: 700 }}>Clear</button>}
          {isMobile && <button onClick={onClose} style={{ fontSize: 11, color: C.accent, background: C.accentBg, border: `1px solid ${C.accent}33`, borderRadius: 20, padding: "3px 12px", cursor: "pointer", fontWeight: 700 }}>Done</button>}
        </div>
      </div>

      <SearchBar examSlug={examSlug} onSelect={handleSearchSelect} C={C} />

      <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
        <FilterSection title="Subject" C={C}>
          {examData.subjects.map(s => {
            const sc = subjColor(s.name, C.isDark);
            return <SItem key={s.slug} label={s.name} active={active.subject === s.slug} accent={sc.text} onClick={() => onSelect({ ...EMPTY, subject: s.slug })} C={C} />;
          })}
        </FilterSection>

        <FilterSection title="Chapter" C={C} defaultOpen={!!active.subject}>
          {!selectedSubj
            ? <p style={{ fontSize: 12, color: C.textDim, margin: 0 }}>Select a subject first</p>
            : <>
                {/* Class filter */}
                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                  {[["all", "All Classes"], ["11", "Class 11"], ["12", "Class 12"]].map(([val, label]) => (
                    <button key={val} onClick={() => setClassFilter(val)} style={{
                      flex: 1, padding: "6px 4px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                      border: `1.5px solid ${classFilter === val ? C.accent : C.border}`,
                      background: classFilter === val ? C.accentBg : "transparent",
                      color: classFilter === val ? C.accentLight : C.textMuted, cursor: "pointer",
                    }}>{label}</button>
                  ))}
                </div>

                {/* Unit filter (only shown when this subject has unit mapping) */}
                {unitList.length > 0 && (
                  <div style={{ marginBottom: 10 }}>
                    <SItem label="All Units" active={!unitFilter} onClick={() => setUnitFilter(null)} C={C} />
                    {unitList.map((u) => (
                      <SItem key={u} label={u} active={unitFilter === u} onClick={() => setUnitFilter(unitFilter === u ? null : u)} C={C} count={annotatedChapters.filter(c => c.unit === u).length} />
                    ))}
                    <div style={{ borderBottom: `1px solid ${C.border}`, margin: "8px 0" }} />
                  </div>
                )}

                <div style={{ maxHeight: 220, overflowY: "auto" }}>
                  {visibleChapters.map(ch => (
                    <SItem key={ch.slug} label={ch.name} active={active.chapter === ch.slug}
                      onClick={() => onSelect({ ...active, chapter: active.chapter === ch.slug ? null : ch.slug, topic: null })}
                      C={C} />
                  ))}
                  {visibleChapters.length === 0 && <p style={{ fontSize: 12, color: C.textDim, margin: 0 }}>No chapters match this filter</p>}
                </div>
              </>}
        </FilterSection>

        {selectedChap && selectedChap.topics.length > 0 && (
          <FilterSection title="Topic" C={C} defaultOpen>
            <div style={{ maxHeight: 160, overflowY: "auto" }}>
              {selectedChap.topics.map(tp => (
                <SItem key={tp.slug} label={tp.name} active={active.topic === tp.slug}
                  onClick={() => onSelect({ ...active, topic: active.topic === tp.slug ? null : tp.slug })}
                  C={C} />
              ))}
            </div>
          </FilterSection>
        )}

        <FilterSection title="Year" C={C}>
          <ChipGroup items={years.map(y => ({ value: y, label: String(y) }))} active={active.year || []} onToggle={v => toggleArr("year", v)} C={C} />
        </FilterSection>

        {dates.length > 0 && (
          <FilterSection title="Exam Date" C={C} defaultOpen={false}>
            <div style={{ maxHeight: 180, overflowY: "auto" }}>
              <ChipGroup
                items={dates.map(d => {
                  const label = d.exam_date
                    ? new Date(d.exam_date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) + (d.shift ? " \u00B7 " + d.shift : "")
                    : String(d.year) + (d.shift ? " \u00B7 " + d.shift : "");
                  const value = d.exam_date ? d.exam_date : d.shift ? `${d.year}|${d.shift}` : String(d.year);
                  return { value, label };
                })}
                active={active.exam_date || []} onToggle={v => toggleArr("exam_date", v)}
                colorFn={() => C.purple} C={C} />
            </div>
          </FilterSection>
        )}

        <FilterSection title="Shift" C={C}>
          <ChipGroup items={shifts.map(s => ({ value: s, label: s }))} active={active.shift || []} onToggle={v => toggleArr("shift", v)} colorFn={() => C.blue} C={C} />
        </FilterSection>

        <FilterSection title="Difficulty" C={C}>
          <ChipGroup items={["easy", "medium", "hard"].map(d => ({ value: d, label: d[0].toUpperCase() + d.slice(1) }))} active={active.difficulty || []} onToggle={v => toggleArr("difficulty", v)} colorFn={diffColor} C={C} />
        </FilterSection>

        <FilterSection title="Question Type" C={C}>
          <ChipGroup items={(question_types.length ? question_types : ["MCQ", "MSQ", "NUMERICAL"]).map(qt => ({ value: qt, label: qt }))} active={active.question_type || []} onToggle={v => toggleArr("question_type", v)} colorFn={typeColor} C={C} />
        </FilterSection>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 499, background: "rgba(0,0,0,0.55)" }} />}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500, background: C.bgCard, borderRadius: "20px 20px 0 0", maxHeight: "82vh", display: "flex", flexDirection: "column", boxShadow: "0 -8px 40px rgba(0,0,0,0.4)", transform: open ? "translateY(0)" : "translateY(100%)", transition: "transform .3s cubic-bezier(.4,0,.2,1)", paddingBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px", flexShrink: 0 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: C.border }} />
          </div>
          {content}
        </div>
      </>
    );
  }
  return (
    <div style={{ width: 252, flexShrink: 0, background: C.bgCard, borderRight: `1px solid ${C.border}`, position: "sticky", top: NAV_H, height: `calc(100vh - ${NAV_H}px)`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {content}
    </div>
  );
}

function Pagination({ page, totalPages, total, onPage, C }) {
  if (totalPages <= 1) return null;
  const from = (page - 1) * PAGE_SIZE + 1, to = Math.min(page * PAGE_SIZE, total);
  const pages = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) pages.push(p);
    else if (Math.abs(p - page) === 2) pages.push("\u2026" + p);
  }
  const deduped = []; let lastEll = false;
  for (const p of pages) { if (String(p).startsWith("\u2026")) { if (!lastEll) deduped.push(p); lastEll = true; } else { deduped.push(p); lastEll = false; } }
  const Btn = (active, disabled = false) => ({ padding: "8px 14px", borderRadius: 9, fontSize: 13, fontWeight: 700, border: `1.5px solid ${active ? C.accent : C.border}`, background: active ? C.accentBg : "transparent", color: disabled ? C.textDim : active ? C.accentLight : C.textMuted, cursor: disabled ? "default" : "pointer", minWidth: 38, minHeight: 38, opacity: disabled ? .45 : 1 });
  return (
    <div style={{ marginTop: 24, padding: "16px 0", borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <span style={{ fontSize: 13, color: C.textMuted }}>Showing <strong style={{ color: C.text }}>{from}&ndash;{to}</strong> of <strong style={{ color: C.text }}>{total.toLocaleString()}</strong> questions</span>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => onPage(1)} disabled={page === 1} style={Btn(false, page === 1)}>&laquo;</button>
        <button onClick={() => onPage(page - 1)} disabled={page === 1} style={Btn(false, page === 1)}>&lsaquo; Prev</button>
        {deduped.map((p, i) => {
          if (String(p).startsWith("\u2026")) { const num = parseInt(p.slice(1)); return <button key={i} onClick={() => onPage(num)} style={Btn(false)}>&hellip;</button>; }
          return <button key={p} onClick={() => onPage(p)} style={Btn(p === page)}>{p}</button>;
        })}
        <button onClick={() => onPage(page + 1)} disabled={page === totalPages} style={Btn(false, page === totalPages)}>Next &rsaquo;</button>
        <button onClick={() => onPage(totalPages)} disabled={page === totalPages} style={Btn(false, page === totalPages)}>&raquo;</button>
      </div>
    </div>
  );
}

function EmptyState({ hasFilters, C }) {
  return (
    <div style={{ textAlign: "center", padding: "64px 24px" }}>
      <div style={{ fontSize: 48, marginBottom: 14 }}>{hasFilters ? "\uD83D\uDD0D" : "\uD83D\uDCD6"}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.textMuted, marginBottom: 8 }}>{hasFilters ? "No questions match" : "Select a subject to begin"}</div>
      <div style={{ fontSize: 13, color: C.textDim }}>{hasFilters ? "Try clearing some filters" : "Pick a subject \u2192 chapter from the sidebar"}</div>
    </div>
  );
}

const EMPTY_ACTIVE = { subject: null, chapter: null, topic: null, year: [], shift: [], difficulty: [], question_type: [], exam_date: [] };

export default function QuestionBrowserClient({
  examId,
  apiBase,
  initialActive,
  initialSubject,
  initialView,
  initialQuestions = [],
  initialTotal = 0,
}) {
  const API_URL = apiBase || API;
  const router = useRouter();

  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ec_theme");
    if (saved !== null) setIsDark(saved === "dark");
    setIsMobile(window.innerWidth < 768);
    setHydrated(true);
  }, []);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const examNumericId = EXAM_SLUG_TO_ID[normalizeExamSlug(examId)] || null;

  // Remember the exam the user is currently browsing, so the Back
  // buttons on Profile / Bookmarks can return them to the right exam
  // page (e.g. /pyq/neet if they came from NEET). Read there via the
  // "last_exam" localStorage key.
  useEffect(() => {
    if (examId && typeof window !== "undefined") {
      localStorage.setItem("last_exam", normalizeExamSlug(examId));
    }
  }, [examId]);

  const [liveFilters, setLiveFilters] = useState({ years: [], shifts: [], dates: [], question_types: ["MCQ", "MSQ", "NUMERICAL"] });
  const [active, setActive] = useState(
    initialActive || (initialSubject ? { ...EMPTY_ACTIVE, subject: initialSubject } : EMPTY_ACTIVE)
  );
  // "overview" -> Marks-style chapter landing (All PYQs / Topics / Difficulty buckets)
  // "list" -> the flat filtered question list
  // Server-seeded chapter pages (SEO deep links) skip straight to "list" since
  // that's the crawlable content that page was built to show.
  const [chapterView, setChapterView] = useState(
    initialView === "overview" ? "overview" : initialView === "list" ? "list" : initialQuestions.length > 0 ? "list" : "overview"
  );
  const prevChapterRef = useRef(active.chapter);
  const [questions, setQuestions] = useState(initialQuestions);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const isFirstRun = useRef(true);

  const C = isDark ? DARK : LIGHT;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem("ec_theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    if (prevChapterRef.current !== active.chapter) {
      setChapterView(active.chapter ? "overview" : "overview");
      prevChapterRef.current = active.chapter;
    }
  }, [active.chapter]);

  // Live filters (years/shifts/dates)
  useEffect(() => {
    const param = examNumericId ? `?exam_id=${examNumericId}` : "";
    fetch(`${API_URL}/api/questions/filters${param}`)
      .then(r => r.json())
      .then(setLiveFilters)
      .catch(console.error);
  }, [examNumericId, API_URL]);

  const buildQuery = useCallback((p) => {
    const qs = new URLSearchParams();
    if (examNumericId) qs.set("exam_id", examNumericId);
    if (active.subject) qs.append("subject", active.subject);
    if (active.chapter) qs.append("chapter", active.chapter);
    if (active.topic) qs.append("topic", active.topic);
    (active.year || []).forEach(v => qs.append("year", v));
    (active.shift || []).forEach(v => qs.append("shift", v));
    (active.difficulty || []).forEach(v => qs.append("difficulty", v));
    (active.question_type || []).forEach(v => qs.append("question_type", v));
    (active.exam_date || []).forEach(v => qs.append("exam_date", v));
    qs.set("limit", PAGE_SIZE);
    qs.set("offset", (p - 1) * PAGE_SIZE);
    return qs.toString();
  }, [active, examNumericId]);

  // Re-fetch whenever filters change -- skips the very first run if we
  // were seeded with initialQuestions from the server (avoids a
  // redundant fetch right after hydration).
  useEffect(() => {
    if (isFirstRun.current && initialQuestions.length > 0) {
      isFirstRun.current = false;
      return;
    }
    isFirstRun.current = false;

    if (!active.chapter && !active.subject) { setQuestions([]); setTotal(0); setPage(1); return; }
    setLoading(true); setPage(1); setQuestions([]);
    fetch(`${API_URL}/api/questions?${buildQuery(1)}`)
      .then(r => r.json())
      .then(data => { setQuestions(data.questions || []); setTotal(data.total || 0); })
      .catch(console.error)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, examNumericId]);

  const goToPage = useCallback((p) => {
    if (p < 1 || p > totalPages) return;
    setLoading(true); setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetch(`${API_URL}/api/questions?${buildQuery(p)}`)
      .then(r => r.json())
      .then(data => { setQuestions(data.questions || []); setTotal(data.total || 0); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [buildQuery, totalPages]);

  const activeCount = [
    active.subject, active.chapter, active.topic,
    ...(active.year || []), ...(active.shift || []),
    ...(active.difficulty || []), ...(active.question_type || []),
    ...(active.exam_date || []),
  ].filter(Boolean).length;

  const hasAny = !!(active.chapter || active.subject);

  const examData = EXAM_TAXONOMY[normalizeExamSlug(examId)] || { subjects: [] };
  const pillLabel = (k, v) => {
    if (k === "subject") { return examData.subjects.find(s => s.slug === v)?.name || v; }
    if (k === "chapter") {
      for (const s of examData.subjects) { const c = s.chapters.find(c => c.slug === v); if (c) return c.name; }
      return v;
    }
    if (k === "topic") {
      for (const s of examData.subjects) { for (const c of s.chapters) { const t = c.topics.find(t => t.slug === v); if (t) return t.name; } }
      return v;
    }
    return String(v);
  };
  const removeFilter = (k, v) => {
    if (k === "subject") setActive(a => ({ ...a, subject: null, chapter: null, topic: null }));
    else if (k === "chapter") setActive(a => ({ ...a, chapter: null, topic: null }));
    else if (k === "topic") setActive(a => ({ ...a, topic: null }));
    else setActive(a => ({ ...a, [k]: (a[k] || []).filter(x => x !== v) }));
  };

  const pillEntries = [
    ...(active.subject ? [["subject", active.subject]] : []),
    ...(active.chapter ? [["chapter", active.chapter]] : []),
    ...(active.topic ? [["topic", active.topic]] : []),
    ...(active.year || []).map(v => ["year", v]),
    ...(active.shift || []).map(v => ["shift", v]),
    ...(active.difficulty || []).map(v => ["difficulty", v]),
    ...(active.question_type || []).map(v => ["question_type", v]),
    ...(active.exam_date || []).map(v => ["exam_date", v]),
  ];

  return (
    <MathJaxContext config={MATHJAX_CONFIG}>
    <div style={{ fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      <NavRail C={C} isDark={isDark} onToggleTheme={toggleTheme} />
      <div style={{ marginLeft: isMobile ? 0 : 72, paddingBottom: isMobile ? 62 : 0 }}>
      <div style={{ position: "sticky", top: 0, zIndex: 400, background: C.nav, borderBottom: `1px solid ${C.border}`, height: NAV_H, display: "flex", alignItems: "center", padding: "0 14px", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: `linear-gradient(135deg,${C.accent},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#fff", letterSpacing: -.5 }}>EC</div>
          <span style={{ fontSize: isMobile ? 13 : 15, fontWeight: 800, color: C.text, letterSpacing: -.3 }}>
            ExamsCalendar.PYQ
            {examId && <span style={{ fontWeight: 600, color: C.textMuted }}> &middot; {EXAM_LABEL[normalizeExamSlug(examId)] || examId}</span>}
          </span>
        </div>

        {!isMobile && pillEntries.length > 0 && (
          <div style={{ flex: 1, display: "flex", gap: 5, alignItems: "center", overflow: "hidden" }}>
            {pillEntries.map(([k, v]) => (
              <span key={k + v} onClick={() => removeFilter(k, v)} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: C.accentBg, color: C.accentLight, border: `1px solid ${C.accent}44`, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                {pillLabel(k, v)} <span style={{ fontSize: 10, opacity: .6 }}>&times;</span>
              </span>
            ))}
            <span style={{ fontSize: 11, color: C.textDim, whiteSpace: "nowrap" }}>{total.toLocaleString()} Q</span>
          </div>
        )}
        <div style={{ flex: 1 }} />

        {isMobile && (
          <button onClick={() => setDrawerOpen(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 10, cursor: "pointer", border: `1.5px solid ${activeCount > 0 ? C.accent : C.border}`, background: activeCount > 0 ? C.accentBg : "transparent", color: activeCount > 0 ? C.accentLight : C.textMuted, fontSize: 13, fontWeight: 700, minHeight: 36 }}>
            Filters{activeCount > 0 && <span style={{ background: C.accent, color: "#fff", borderRadius: "50%", width: 17, height: 17, fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{activeCount}</span>}
          </button>
        )}
        <button onClick={toggleTheme} style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 20, padding: "6px 12px", fontSize: 14, cursor: "pointer", color: C.textMuted, minHeight: 36 }}>{isDark ? "\u2600\uFE0F" : "\uD83C\uDF19"}</button>
      </div>

      {!active.chapter ? (
        <div style={{ padding: isMobile ? "16px 0 60px" : "24px 0 60px" }}>
          <ChapterBrowsePage
            examSlug={examId}
            examLabel={EXAM_LABEL[normalizeExamSlug(examId)] || examId}
            activeSubject={active.subject}
            onSelectSubject={(subj) => setActive((a) => ({ ...a, subject: subj, chapter: null, topic: null }))}
            onSelectChapter={(chap) => { router.push(`/pyq/${normalizeExamSlug(examId)}/${active.subject}/${chap}?view=overview`); router.refresh(); }}
            C={C}
          />
        </div>
      ) : chapterView === "overview" ? (
        <div style={{ padding: isMobile ? "16px 0 60px" : "24px 0 60px" }}>
          <ChapterOverview
            examSlug={examId}
            examLabel={EXAM_LABEL[normalizeExamSlug(examId)] || examId}
            subject={examData.subjects.find((s) => s.slug === active.subject)}
            chapter={examData.subjects.find((s) => s.slug === active.subject)?.chapters.find((c) => c.slug === active.chapter)}
            apiBase={API_URL}
            C={C}
            onViewAll={() => setChapterView("list")}
            onSelectTopic={(topicSlug) => { router.push(`/pyq/${normalizeExamSlug(examId)}/${active.subject}/${active.chapter}?topic=${topicSlug}&view=list`); router.refresh(); }}
            onSelectDifficulty={(d) => { setActive((a) => ({ ...a, difficulty: [d] })); setChapterView("list"); }}
            onSelectType={(t) => { setActive((a) => ({ ...a, question_type: [t] })); setChapterView("list"); }}
          />
        </div>
      ) : (
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {!isMobile && <Sidebar examSlug={examId} active={active} onSelect={setActive} liveFilters={liveFilters} C={C} isMobile={false} open={true} onClose={() => {}} />}

        <div style={{ flex: 1, minWidth: 0, padding: isMobile ? "12px 12px 80px" : "20px 24px 48px" }}>
          {isMobile && pillEntries.length > 0 && (
            <div style={{ display: "flex", gap: 5, flexWrap: "nowrap", overflowX: "auto", marginBottom: 12, paddingBottom: 4 }}>
              {pillEntries.map(([k, v]) => (
                <button key={k + v} onClick={() => removeFilter(k, v)} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: C.accentBg, color: C.accentLight, border: `1px solid ${C.accent}44`, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, minHeight: 30 }}>
                  {pillLabel(k, v)} <span style={{ fontSize: 10, opacity: .6 }}>&times;</span>
                </button>
              ))}
            </div>
          )}

          {hasAny && !loading && questions.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 13, color: C.textMuted }}>Page <strong style={{ color: C.text }}>{page}</strong> of <strong style={{ color: C.text }}>{totalPages}</strong> &middot; <strong style={{ color: C.text }}>{total.toLocaleString()}</strong> total questions</span>
            </div>
          )}

          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ height: 150, borderRadius: 12, overflow: "hidden", background: C.bgCard, border: `1px solid ${C.border}` }} />
              ))}
            </div>
          )}

          {!loading && !hasAny && <EmptyState hasFilters={false} C={C} />}
          {!loading && hasAny && questions.length === 0 && <EmptyState hasFilters={true} C={C} />}

          {!loading && questions.length > 0 && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 12 }}>
                {questions.map((q, i) =>
                  SOLVER_EXAMS.has(normalizeExamSlug(examId)) ? (
                    <QuestionListLink key={q.slug || q.id} q={q} index={(page - 1) * PAGE_SIZE + i} C={C} examSlug={normalizeExamSlug(examId)} active={active} />
                  ) : (
                    <QuestionCard key={q.slug || q.id} q={q} index={(page - 1) * PAGE_SIZE + i} C={C} isMobile={isMobile} apiBase={API_URL} />
                  )
                )}
              </div>
              <Pagination page={page} totalPages={totalPages} total={total} onPage={goToPage} C={C} />
            </>
          )}
        </div>
      </div>
      )}

      {isMobile && <Sidebar examSlug={examId} active={active} onSelect={setActive} liveFilters={liveFilters} C={C} isMobile={true} open={drawerOpen} onClose={() => setDrawerOpen(false)} />}
      </div>
    </div>
    </MathJaxContext>
  );
                                                             }
