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
import { useEffect } from "react";

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

  const onContinue = () => {
    if (!validate()) return;
    // Phase 5b will pick this selection up. For now, stash it and show a
    // placeholder so the selection UI can be verified end to end.
    const payload = {
      exam,
      selections: [...chapters].map((key) => {
        const [subjectSlug, chapterSlug] = key.split(":");
        const cur = topics[key];
        return { subjectSlug, chapterSlug, topics: cur === "ALL" || cur == null ? "ALL" : [...cur] };
      }),
    };
    sessionStorage.setItem("ec_create_test_selection", JSON.stringify(payload));
    setError("");
    alert("Selection saved ✓ (Step 4: count / duration / source / year comes next — Phase 5b).");
  };

  // --- counts for the summary ---------------------------------------------
  const chapterCount = chapters.size;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "16px 16px 80px", color: C.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>Create a Test</h1>
      <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 24px" }}>Pick an exam, subjects, and chapters. Then choose how many questions and which years.</p>

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
