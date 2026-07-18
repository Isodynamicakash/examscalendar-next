"use client";
/**
 * Full test-creation wizard (Phase 5a -- selection UI).  /create-test
 *
 * The "from scratch" entry point reached from the nav rail. Steps:
 *   1. Exam        -- pick one (all except SSC).
 *   2. Subjects    -- pick one or more.
 *   3. Chapters    -- for each picked subject, pick >=1 chapter. Each
 *                     chapter has a topic dropdown (all topics selected by
 *                     default; deselect to narrow).
 *   (Step 4 config + generation lands in Phase 5b.)
 *
 * Rule enforced: a selected subject must contribute at least one chapter,
 * otherwise Continue is blocked with a message.
 *
 * Selection state shape:
 *   exam:      "jee-main"
 *   subjects:  Set(subjectSlug)
 *   chapters:  Set(`${subjectSlug}:${chapterSlug}`)
 *   topics:    { `${subjectSlug}:${chapterSlug}`: Set(topicSlug) | "ALL" }
 *             (a chapter maps to "ALL" by default; a Set once user deselects)
 */
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { DARK, LIGHT } from "@/lib/questionTheme";
import { EXAM_TAXONOMY, EXAM_LABEL } from "@/lib/taxonomy";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

const EXAM_SLUG_TO_ID = { "jee-main": 1, "jee-advanced": 2, neet: 3 };
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const CURRENT_YEAR = new Date().getFullYear();

// JEE Advanced uses flat +4/-1 for now; others use per-question marks.
function marksFor(examSlug, q) {
  if (examSlug === "jee-advanced") return { pos: 4, neg: 1 };
  return { pos: Number(q.marks_positive ?? 4), neg: Number(q.marks_negative ?? 1) };
}

// Exams available for full custom tests (SSC excluded).
const TEST_EXAMS = ["jee-main", "jee-advanced", "neet"];

const SUBJECT_EMOJI = { physics: "⚛️", chemistry: "🧪", mathematics: "📐", biology: "🧬" };

export default function CreateTestPage() {
  return (
    <AppShell showDailyGoal={false}>
      <CreateTestInner />
    </AppShell>
  );
}

function CreateTestInner() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  useEffect(() => { const s = localStorage.getItem("ec_theme"); if (s !== null) setIsDark(s === "dark"); }, []);
  const C = isDark ? DARK : LIGHT;

  const [exam, setExam] = useState(null);
  const [subjects, setSubjects] = useState(new Set());
  const [chapters, setChapters] = useState(new Set());     // "subj:chap"
  const [topics, setTopics] = useState({});                // "subj:chap" -> Set | "ALL"
  const [openDropdown, setOpenDropdown] = useState(null);  // "subj:chap" whose topic list is open
  const [error, setError] = useState("");

  // Step 4 (config) state
  const [step, setStep] = useState("select");   // "select" | "config"
  const [source, setSource] = useState("all");  // all | bookmarked | incorrect
  const [yearFilter, setYearFilter] = useState("all"); // all | last1 | last3 | last5 | last10
  const [count, setCount] = useState(20);
  const [durationMin, setDurationMin] = useState(40);
  const [durationEdited, setDurationEdited] = useState(false);
  const [pool, setPool] = useState(null);       // resolved question pool for current selection+filters
  const [poolLoading, setPoolLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!durationEdited) setDurationMin(Math.max(1, count * 2));
  }, [count, durationEdited]);

  const examData = exam ? EXAM_TAXONOMY[exam] : null;

  // --- selection helpers ---------------------------------------------------
  const toggleSubject = (slug) => {
    setError("");
    setSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
        // remove that subject's chapters + topics
        setChapters((cs) => new Set([...cs].filter((k) => !k.startsWith(`${slug}:`))));
        setTopics((ts) => { const n = { ...ts }; Object.keys(n).forEach((k) => { if (k.startsWith(`${slug}:`)) delete n[k]; }); return n; });
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const toggleChapter = (subjSlug, chapSlug) => {
    setError("");
    const key = `${subjSlug}:${chapSlug}`;
    setChapters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        setTopics((ts) => { const n = { ...ts }; delete n[key]; return n; });
      } else {
        next.add(key);
        setTopics((ts) => ({ ...ts, [key]: "ALL" })); // all topics by default
      }
      return next;
    });
  };

  const toggleTopic = (subjSlug, chapSlug, topicSlug, allTopics) => {
    const key = `${subjSlug}:${chapSlug}`;
    setTopics((prev) => {
      const cur = prev[key];
      // Expand "ALL" into a concrete Set the first time a topic is deselected.
      let set = cur === "ALL" || cur == null ? new Set(allTopics.map((t) => t.slug)) : new Set(cur);
      if (set.has(topicSlug)) set.delete(topicSlug); else set.add(topicSlug);
      // If everything is re-selected, collapse back to "ALL".
      if (set.size === allTopics.length) return { ...prev, [key]: "ALL" };
      return { ...prev, [key]: set };
    });
  };

  const isTopicOn = (key, topicSlug) => {
    const cur = topics[key];
    if (cur === "ALL" || cur == null) return true;
    return cur.has(topicSlug);
  };

  const topicCountLabel = (key, allTopics) => {
    const cur = topics[key];
    if (cur === "ALL" || cur == null) return `All ${allTopics.length} topics`;
    return `${cur.size} / ${allTopics.length} topics`;
  };

  // --- validation ----------------------------------------------------------
  const validate = () => {
    if (!exam) { setError("Pick an exam first."); return false; }
    if (subjects.size === 0) { setError("Select at least one subject."); return false; }
    // Every selected subject must contribute >=1 chapter.
    for (const s of subjects) {
      const hasChapter = [...chapters].some((k) => k.startsWith(`${s}:`));
      if (!hasChapter) {
        const name = examData.subjects.find((x) => x.slug === s)?.name || s;
        setError(`Add at least one chapter from ${name}.`);
        return false;
      }
    }
    // Each selected chapter must have >=1 topic.
    for (const key of chapters) {
      const cur = topics[key];
      if (cur !== "ALL" && cur != null && cur.size === 0) {
        setError("Each selected chapter needs at least one topic.");
        return false;
      }
    }
    return true;
  };

  // Build the list of {subjectSlug, chapterSlug, topics} selections.
  const buildSelections = () =>
    [...chapters].map((key) => {
      const [subjectSlug, chapterSlug] = key.split(":");
      const cur = topics[key];
      return { subjectSlug, chapterSlug, topics: cur === "ALL" || cur == null ? "ALL" : [...cur] };
    });

  // Year filter -> min year (inclusive). null = all years.
  const minYearFor = (yf) => {
    if (yf === "last1") return CURRENT_YEAR;
    if (yf === "last3") return CURRENT_YEAR - 2;
    if (yf === "last5") return CURRENT_YEAR - 4;
    if (yf === "last10") return CURRENT_YEAR - 9;
    return null;
  };

  const onContinue = async () => {
    if (!validate()) return;
    setError("");
    setStep("config");
    // Load the base pool (all questions across selected chapters/topics),
    // plus the user's bookmark/attempt sets for source filtering.
    setPoolLoading(true);
    const { data: sess } = await supabase.auth.getSession();
    const u = sess?.session?.user || null;
    setUser(u);

    const examId = EXAM_SLUG_TO_ID[exam];
    const selections = buildSelections();

    // Fetch questions per chapter (the API filters by chapter; topic
    // filtering is applied client-side against the returned rows).
    let all = [];
    for (const sel of selections) {
      let offset = 0;
      for (let i = 0; i < 5; i++) {
        const params = new URLSearchParams({ exam_id: String(examId), subject: sel.subjectSlug, chapter: sel.chapterSlug, limit: "100", offset: String(offset) });
        const res = await fetch(`${API_URL}/api/questions?${params}`).then((r) => r.json()).catch(() => null);
        if (!res?.questions?.length) break;
        // Topic filter (if not ALL).
        const rows = sel.topics === "ALL" ? res.questions : res.questions.filter((q) => sel.topics.includes(q.topic_slug));
        all = all.concat(rows);
        if ((offset + 100) >= (res.total || 0)) break;
        offset += 100;
      }
    }

    // User history for source filtering.
    let bookmarkIds = new Set(), incorrectIds = new Set();
    if (u) {
      const idSet = new Set(all.map((q) => q.id));
      const { data: bms } = await supabase.from("bookmarks").select("question_id");
      bookmarkIds = new Set((bms || []).map((b) => b.question_id).filter((id) => idSet.has(id)));
      const { data: atts } = await supabase.from("user_attempts").select("question_id, is_correct, attempted_at").order("attempted_at", { ascending: true });
      const latest = new Map();
      (atts || []).forEach((a) => { if (idSet.has(a.question_id)) latest.set(a.question_id, a.is_correct); });
      latest.forEach((ok, qid) => { if (!ok) incorrectIds.add(qid); });
    }

    setPool({ all, bookmarkIds, incorrectIds });
    setPoolLoading(false);
  };

  // Apply source + year filters to the base pool.
  const filteredPool = useMemo(() => {
    if (!pool) return [];
    let list = pool.all;
    const minYear = minYearFor(yearFilter);
    if (minYear) list = list.filter((q) => Number(q.year) >= minYear);
    if (source === "bookmarked") list = list.filter((q) => pool.bookmarkIds.has(q.id));
    else if (source === "incorrect") list = list.filter((q) => pool.incorrectIds.has(q.id));
    return list;
  }, [pool, source, yearFilter]);

  useEffect(() => {
    const max = filteredPool.length;
    if (max > 0) setCount((c) => Math.min(Math.max(1, c), max));
  }, [filteredPool.length]);

  const generate = async () => {
    if (!user) { router.push(`/login?next=/create-test`); return; }
    if (filteredPool.length === 0) { setError("No questions match these filters. Try changing source or year."); return; }
    setGenerating(true);
    try {
      const shuffled = [...filteredPool].sort(() => Math.random() - 0.5).slice(0, count);
      const firstSel = buildSelections()[0];
      const { data: test, error: tErr } = await supabase.from("tests").insert({
        user_id: user.id,
        exam_slug: exam,
        subject_slug: firstSel?.subjectSlug || null,
        chapter_slug: null,       // multi-chapter test
        topic_slug: null,
        source,
        year_filter: yearFilter === "all" ? null : yearFilter,
        total_questions: shuffled.length,
        duration_secs: durationMin * 60,
        status: "in_progress",
      }).select().single();
      if (tErr) throw tErr;

      const rows = shuffled.map((q, i) => {
        const m = marksFor(exam, q);
        return { test_id: test.id, question_id: q.id, position: i + 1, marks_positive: m.pos, marks_negative: m.neg };
      });
      const { error: qErr } = await supabase.from("test_questions").insert(rows);
      if (qErr) throw qErr;

      router.push(`/test?id=${test.id}`);
    } catch (e) {
      console.error("Generate failed:", e);
      setError("Something went wrong creating the test. Please try again.");
      setGenerating(false);
    }
  };

  // --- counts for the summary ---------------------------------------------
  const chapterCount = chapters.size;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "16px 16px 80px", color: C.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Create a Test</h1>
      <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 24px" }}>Pick an exam, subjects, and chapters. Then choose how many questions and which years.</p>

      {step === "select" && (<>
      {/* Step 1 -- Exam */}
      <Section n={1} title="Choose your exam" C={C}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
          {TEST_EXAMS.map((slug) => {
            const on = exam === slug;
            return (
              <button key={slug} onClick={() => { setExam(slug); setSubjects(new Set()); setChapters(new Set()); setTopics({}); setError(""); }}
                style={{ padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${on ? C.accent : C.border}`, background: on ? C.accentBg : C.bgCard, color: on ? C.accentLight : C.text, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
                {EXAM_LABEL[slug] || slug}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Step 2 -- Subjects */}
      {examData && (
        <Section n={2} title="Select subjects" C={C}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
            {examData.subjects.map((s) => {
              const on = subjects.has(s.slug);
              return (
                <button key={s.slug} onClick={() => toggleSubject(s.slug)}
                  style={{ padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${on ? C.accent : C.border}`, background: on ? C.accentBg : C.bgCard, color: on ? C.accentLight : C.text, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{SUBJECT_EMOJI[s.slug] || "📘"}</span>
                  {s.name}
                </button>
              );
            })}
          </div>
        </Section>
      )}

      {/* Step 3 -- Chapters (grouped by selected subject) with topic dropdowns */}
      {examData && subjects.size > 0 && (
        <Section n={3} title="Select chapters" C={C}>
          {examData.subjects.filter((s) => subjects.has(s.slug)).map((s) => (
            <div key={s.slug} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{SUBJECT_EMOJI[s.slug] || "📘"}</span> {s.name}
                <span style={{ fontSize: 12, fontWeight: 600, color: C.textMuted }}>
                  ({[...chapters].filter((k) => k.startsWith(`${s.slug}:`)).length} selected)
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.chapters.map((ch) => {
                  const key = `${s.slug}:${ch.slug}`;
                  const on = chapters.has(key);
                  const hasTopics = (ch.topics || []).length > 0;
                  const isOpen = openDropdown === key;
                  return (
                    <div key={ch.slug} style={{ border: `1px solid ${on ? C.accent : C.border}`, borderRadius: 12, background: on ? C.accentBg : C.bgCard, overflow: "hidden" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
                        <button onClick={() => toggleChapter(s.slug, ch.slug)} style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, background: "none", border: "none", cursor: "pointer", textAlign: "left", color: C.text }}>
                          <span style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${on ? C.accent : C.borderLight}`, background: on ? C.accent : "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{on ? "✓" : ""}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: on ? C.accentLight : C.text }}>{ch.name}</span>
                        </button>
                        {on && hasTopics && (
                          <button onClick={() => setOpenDropdown(isOpen ? null : key)} style={{ fontSize: 12, fontWeight: 700, color: C.accentLight, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 10px", cursor: "pointer", whiteSpace: "nowrap" }}>
                            {topicCountLabel(key, ch.topics)} {isOpen ? "▲" : "▼"}
                          </button>
                        )}
                      </div>
                      {on && hasTopics && isOpen && (
                        <div style={{ borderTop: `1px solid ${C.border}`, padding: "10px 14px", display: "flex", flexWrap: "wrap", gap: 6, background: C.surface }}>
                          {ch.topics.map((t) => {
                            const tOn = isTopicOn(key, t.slug);
                            return (
                              <button key={t.slug} onClick={() => toggleTopic(s.slug, ch.slug, t.slug, ch.topics)}
                                style={{ fontSize: 12, fontWeight: 600, padding: "5px 10px", borderRadius: 14, border: `1px solid ${tOn ? C.accent : C.border}`, background: tOn ? C.accentBg : C.bgCard, color: tOn ? C.accentLight : C.textMuted, cursor: "pointer" }}>
                                {tOn ? "✓ " : ""}{t.name}
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
          ))}
        </Section>
      )}

      {/* Summary + continue */}
      {examData && (
        <div style={{ position: "sticky", bottom: 0, background: C.bg, borderTop: `1px solid ${C.border}`, padding: "14px 0 4px", marginTop: 10 }}>
          {error && <div style={{ fontSize: 13, color: C.redText, background: C.redBg, padding: "8px 12px", borderRadius: 8, marginBottom: 10 }}>{error}</div>}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 13, color: C.textMuted, flex: 1 }}>
              {subjects.size} subject{subjects.size !== 1 ? "s" : ""} · {chapterCount} chapter{chapterCount !== 1 ? "s" : ""} selected
            </div>
            <button onClick={onContinue} style={{ padding: "12px 28px", borderRadius: 11, background: C.accent, color: "#fff", border: "none", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
              Continue →
            </button>
          </div>
        </div>
      )}
      </>)}

      {step === "config" && (
        <div>
          <button onClick={() => setStep("select")} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, color: C.textMuted, fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 20 }}>← Edit selection</button>

          {poolLoading ? (
            <div style={{ padding: 40, textAlign: "center", color: C.textMuted }}>Loading questions…</div>
          ) : (
            <>
              {/* Source */}
              <Section n={4} title="Create test from" C={C}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
                  {[
                    { key: "all", label: "All Questions", icon: "📋" },
                    { key: "incorrect", label: "Incorrect Qs", icon: "❌" },
                    { key: "bookmarked", label: "Bookmarked Qs", icon: "🔖" },
                  ].map((s) => {
                    const on = source === s.key;
                    return (
                      <button key={s.key} onClick={() => { if (s.key !== "all" && !user) { setError("Sign in to use this filter."); return; } setError(""); setSource(s.key); }}
                        style={{ padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${on ? C.accent : C.border}`, background: on ? C.accentBg : C.bgCard, color: on ? C.accentLight : C.text, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
                        <span style={{ fontSize: 18, marginRight: 8 }}>{s.icon}</span>{s.label}
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Year */}
              <Section n={5} title="Year of papers" C={C}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    { key: "all", label: "All Years" },
                    { key: "last1", label: "Past Year" },
                    { key: "last3", label: "Past 3 Years" },
                    { key: "last5", label: "Past 5 Years" },
                    { key: "last10", label: "Past 10 Years" },
                  ].map((y) => {
                    const on = yearFilter === y.key;
                    return (
                      <button key={y.key} onClick={() => setYearFilter(y.key)}
                        style={{ padding: "10px 18px", borderRadius: 20, border: `1.5px solid ${on ? C.accent : C.border}`, background: on ? C.accentBg : C.bgCard, color: on ? C.accentLight : C.textMuted, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                        {y.label}
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Count */}
              <Section n={6} title="Number of questions" C={C}>
                <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 10 }}>Available with these filters: <strong style={{ color: C.text }}>{filteredPool.length}</strong> Qs</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {[10, 20, 30, 50, 75, 100].filter((n) => n <= filteredPool.length).map((n) => (
                    <button key={n} onClick={() => setCount(n)} style={{ padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, border: `1.5px solid ${count === n ? C.accent : C.border}`, background: count === n ? C.accentBg : C.bgCard, color: count === n ? C.accentLight : C.textMuted, cursor: "pointer" }}>{n} Qs</button>
                  ))}
                </div>
                <input type="number" min={1} max={filteredPool.length || 1} value={count}
                  onChange={(e) => setCount(Math.min(filteredPool.length || 1, Math.max(1, parseInt(e.target.value || "1", 10))))}
                  style={{ width: "100%", maxWidth: 220, padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.bgCard, color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </Section>

              {/* Duration */}
              <Section n={7} title="Test duration" C={C}>
                <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 10 }}>Recommended: {count * 2} min</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 320 }}>
                  <button onClick={() => { setDurationEdited(true); setDurationMin((d) => Math.max(1, d - 5)); }} style={{ padding: "9px 18px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontWeight: 800, cursor: "pointer" }}>− 5m</button>
                  <div style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: 800 }}>{durationMin} min</div>
                  <button onClick={() => { setDurationEdited(true); setDurationMin((d) => d + 5); }} style={{ padding: "9px 18px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontWeight: 800, cursor: "pointer" }}>+ 5m</button>
                </div>
              </Section>

              {error && <div style={{ fontSize: 13, color: C.redText, background: C.redBg, padding: "10px 14px", borderRadius: 8, marginBottom: 14 }}>{error}</div>}

              <button onClick={generate} disabled={generating || filteredPool.length === 0}
                style={{ width: "100%", padding: "15px", borderRadius: 12, background: generating || filteredPool.length === 0 ? C.surfaceHigh : C.accent, color: generating || filteredPool.length === 0 ? C.textDim : "#fff", border: "none", fontWeight: 800, fontSize: 16, cursor: generating ? "wait" : "pointer" }}>
                {generating ? "Generating…" : filteredPool.length === 0 ? "No questions match" : `Generate Test (${count} Qs · ${durationMin} min)`}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ n, title, children, C }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ width: 26, height: 26, borderRadius: "50%", background: C.accentBg, color: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{n}</span>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
          }
