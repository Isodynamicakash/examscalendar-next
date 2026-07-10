"use client";
/**
 * Test-taking page (Phase 3).  /test/[id]
 *
 * Loads a test (created by TestCreateModal), its question snapshot, and
 * the question content. Presents an exam-style UI:
 *   - one question at a time, with options / numerical input
 *   - a question palette (answered / not answered / marked / not visited)
 *   - Save & Next, Mark for Review & Next, Clear Response, Previous
 *   - a countdown timer (auto-submits at 0)
 *   - Submit -> grades everything, writes results, goes to /test/[id]/report
 *
 * Question CONTENT comes from Supabase v_questions_full (by id); the
 * correct answer from the answers table. No slugs needed.
 *
 * Answers are persisted to test_answers as the user goes (fire-and-forget)
 * so a refresh doesn't lose progress.
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import MathContent from "@/components/MathContent";
import MathJaxProvider from "@/components/MathJaxProvider";
import { supabase } from "@/lib/supabase";
import { DARK, LIGHT } from "@/lib/questionTheme";

const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function TestPage() {
  const { id } = useParams();
  const router = useRouter();

  const [isDark, setIsDark] = useState(true);
  useEffect(() => { const s = localStorage.getItem("ec_theme"); if (s !== null) setIsDark(s === "dark"); }, []);
  const C = isDark ? DARK : LIGHT;

  const [status, setStatus] = useState("loading"); // loading | ready | error | notfound
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);   // [{...content, position, marks_positive, marks_negative}]
  const [answersMap, setAnswersMap] = useState({}); // question_id -> {selected, marked, visited, timeSpent}
  const [idx, setIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const tickRef = useRef(null);
  const qStartRef = useRef(Date.now());

  // ── Load test + questions + content ──────────────────────────────────────
  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess?.session?.user || null;
      if (!user) { router.push(`/login?next=/test/${id}`); return; }

      const { data: t, error: tErr } = await supabase.from("tests").select("*").eq("id", id).maybeSingle();
      if (tErr || !t) { setStatus("notfound"); return; }
      if (t.status === "completed") { router.replace(`/test/${id}/report`); return; }
      setTest(t);

      const { data: tqs } = await supabase.from("test_questions").select("*").eq("test_id", id).order("position");
      if (!tqs || tqs.length === 0) { setStatus("error"); return; }
      const qIds = tqs.map((r) => r.question_id);

      // Content from v_questions_full, answers from answers table.
      const { data: qContent } = await supabase.from("v_questions_full")
        .select("id, slug, question_text, option_1, option_2, option_3, option_4, question_type, marks_positive, marks_negative")
        .in("id", qIds);
      const { data: ansRows } = await supabase.from("answers").select("question_id, correct_option, solution_text").in("question_id", qIds);
      const contentById = new Map((qContent || []).map((q) => [q.id, q]));
      const ansById = new Map((ansRows || []).map((a) => [a.question_id, a]));

      const merged = tqs.map((r) => {
        const c = contentById.get(r.question_id) || {};
        const a = ansById.get(r.question_id) || {};
        return {
          question_id: r.question_id,
          position: r.position,
          marks_positive: Number(r.marks_positive),
          marks_negative: Number(r.marks_negative),
          question_text: c.question_text || "",
          options: [c.option_1, c.option_2, c.option_3, c.option_4].filter((x) => x != null),
          question_type: c.question_type || "MCQ",
          correct_option: a.correct_option || "",
          solution_text: a.solution_text || "",
        };
      });
      setQuestions(merged);

      // Resume any previously-saved answers.
      const { data: prev } = await supabase.from("test_answers").select("*").eq("test_id", id);
      const amap = {};
      merged.forEach((q) => { amap[q.question_id] = { selected: null, marked: false, visited: false, timeSpent: 0 }; });
      (prev || []).forEach((p) => {
        amap[p.question_id] = {
          selected: p.selected_option ?? null,
          marked: !!p.marked_for_review,
          visited: true,
          timeSpent: p.time_taken_secs || 0,
        };
      });
      setAnswersMap(amap);

      // Timer: remaining = duration - elapsed since created.
      const elapsed = Math.floor((Date.now() - new Date(t.created_at).getTime()) / 1000);
      setSecondsLeft(Math.max(0, t.duration_secs - elapsed));

      setStatus("ready");
      qStartRef.current = Date.now();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ── Countdown ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (status !== "ready") return;
    tickRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { clearInterval(tickRef.current); doSubmit(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Mark current question visited.
  useEffect(() => {
    if (status !== "ready" || questions.length === 0) return;
    const q = questions[idx];
    if (!q) return;
    setAnswersMap((m) => ({ ...m, [q.question_id]: { ...m[q.question_id], visited: true } }));
    qStartRef.current = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, status]);

  const cur = questions[idx];
  const curAns = cur ? answersMap[cur.question_id] : null;

  const persistAnswer = useCallback(async (qid, patch) => {
    // fire-and-forget upsert of a single answer row
    const a = answersMap[qid] || {};
    const spent = (a.timeSpent || 0) + Math.floor((Date.now() - qStartRef.current) / 1000);
    supabase.from("test_answers").upsert({
      test_id: id,
      question_id: qid,
      selected_option: patch.selected !== undefined ? patch.selected : (a.selected ?? null),
      marked_for_review: patch.marked !== undefined ? patch.marked : (a.marked ?? false),
      time_taken_secs: spent,
      updated_at: new Date().toISOString(),
    }, { onConflict: "test_id,question_id" }).then(() => {});
  }, [answersMap, id]);

  const selectOption = (val) => {
    if (!cur) return;
    setAnswersMap((m) => ({ ...m, [cur.question_id]: { ...m[cur.question_id], selected: val, visited: true } }));
  };

  const goTo = (i) => { if (i >= 0 && i < questions.length) setIdx(i); };

  const saveNext = () => {
    if (cur) persistAnswer(cur.question_id, { selected: curAns?.selected ?? null });
    goTo(idx + 1);
  };
  const markNext = () => {
    if (cur) {
      setAnswersMap((m) => ({ ...m, [cur.question_id]: { ...m[cur.question_id], marked: true } }));
      persistAnswer(cur.question_id, { marked: true, selected: curAns?.selected ?? null });
    }
    goTo(idx + 1);
  };
  const clearResp = () => {
    if (!cur) return;
    setAnswersMap((m) => ({ ...m, [cur.question_id]: { ...m[cur.question_id], selected: null } }));
    persistAnswer(cur.question_id, { selected: null });
  };

  // ── Submit + grade ───────────────────────────────────────────────────────
  const doSubmit = async (auto = false) => {
    if (submitting) return;
    setSubmitting(true);
    clearInterval(tickRef.current);
    try {
      let score = 0, maxScore = 0, correct = 0, incorrect = 0, unanswered = 0;
      const answerRows = [];
      for (const q of questions) {
        maxScore += q.marks_positive;
        const a = answersMap[q.question_id] || {};
        const sel = a.selected;
        const correctSet = (q.correct_option || "").split(",").map((s) => s.trim()).filter(Boolean);
        let isCorrect = null;
        if (sel == null || sel === "") {
          unanswered += 1;
        } else {
          // MCQ/MSQ: option numbers; numerical: compare as number.
          if (q.question_type === "NUMERICAL") {
            const g = parseFloat(sel), e = parseFloat(q.correct_option);
            isCorrect = !isNaN(g) && !isNaN(e) && Math.abs(g - e) < 1e-6;
          } else {
            isCorrect = correctSet.length === 1 && String(sel) === String(correctSet[0]);
          }
          if (isCorrect) { score += q.marks_positive; correct += 1; }
          else { score -= q.marks_negative; incorrect += 1; }
        }
        answerRows.push({
          test_id: id, question_id: q.question_id,
          selected_option: sel ?? null, is_correct: isCorrect,
          marked_for_review: !!a.marked, time_taken_secs: a.timeSpent || 0,
          updated_at: new Date().toISOString(),
        });
      }

      await supabase.from("test_answers").upsert(answerRows, { onConflict: "test_id,question_id" });

      const timeTaken = test.duration_secs - secondsLeft;
      await supabase.from("tests").update({
        status: "completed", score, max_score: maxScore,
        correct_count: correct, incorrect_count: incorrect, unanswered_count: unanswered,
        time_taken_secs: Math.max(0, timeTaken), submitted_at: new Date().toISOString(),
      }).eq("id", id);

      router.replace(`/test/${id}/report`);
    } catch (e) {
      console.error("Submit failed:", e);
      setSubmitting(false);
      setShowSubmitConfirm(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────
  if (status === "loading") return <Center C={C}>Loading test…</Center>;
  if (status === "notfound") return <Center C={C}>Test not found.</Center>;
  if (status === "error") return <Center C={C}>This test has no questions.</Center>;

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const lowTime = secondsLeft <= 60;

  const paletteColor = (q) => {
    const a = answersMap[q.question_id] || {};
    if (a.marked) return C.purple;
    if (a.selected != null && a.selected !== "") return C.green;
    if (a.visited) return C.red;
    return C.surfaceHigh;
  };

  const answeredCount = questions.filter((q) => { const a = answersMap[q.question_id]; return a?.selected != null && a?.selected !== ""; }).length;

  return (
    <MathJaxProvider>
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: `1px solid ${C.border}`, background: C.nav, position: "sticky", top: 0, zIndex: 100 }}>
        <span style={{ fontWeight: 800, fontSize: 15 }}>Test</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, background: lowTime ? C.redBg : C.surface, color: lowTime ? C.redText : C.text, fontWeight: 800, fontSize: 14 }}>
          ⏱ {mm}:{ss}
        </div>
        <button onClick={() => setShowSubmitConfirm(true)} style={{ padding: "8px 20px", borderRadius: 10, background: C.accent, color: "#fff", border: "none", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>Submit</button>
      </div>

      <div style={{ flex: 1, display: "flex", gap: 0, flexDirection: "row" }}>
        {/* Question area */}
        <div style={{ flex: 1, padding: "20px 22px", maxWidth: 800, margin: "0 auto", width: "100%" }}>
          {cur && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.textMuted }}>Q{idx + 1}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.greenText, background: C.greenBg, padding: "2px 8px", borderRadius: 6 }}>+{cur.marks_positive}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.redText, background: C.redBg, padding: "2px 8px", borderRadius: 6 }}>−{cur.marks_negative}</span>
              </div>

              <MathContent text={cur.question_text} block style={{ color: C.text, fontSize: 16, marginBottom: 20 }} />

              {cur.question_type === "NUMERICAL" ? (
                <input
                  type="text" inputMode="decimal" placeholder="Enter your answer"
                  value={curAns?.selected ?? ""}
                  onChange={(e) => selectOption(e.target.value)}
                  style={{ width: "100%", maxWidth: 280, padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 15, outline: "none" }}
                />
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {cur.options.map((opt, i) => {
                    const val = String(i + 1);
                    const on = String(curAns?.selected) === val;
                    return (
                      <button key={i} onClick={() => selectOption(val)} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${on ? C.accent : C.border}`, background: on ? C.accentBg : C.bgCard, cursor: "pointer" }}>
                        <span style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, background: on ? C.accent : C.surface, color: on ? "#fff" : C.textMuted }}>{OPTION_LETTERS[i]}</span>
                        <MathContent text={opt} style={{ color: C.text }} />
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Palette (desktop) */}
        <div style={{ width: 240, flexShrink: 0, borderLeft: `1px solid ${C.border}`, padding: "18px 16px", display: "none", background: C.bgCard }} className="ec-palette">
          <div style={{ fontSize: 12, fontWeight: 800, color: C.textMuted, marginBottom: 4 }}>Overview</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 14 }}>{answeredCount} / {questions.length} answered</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {questions.map((q, i) => (
              <button key={q.question_id} onClick={() => goTo(i)} style={{ aspectRatio: "1", borderRadius: 8, border: i === idx ? `2px solid ${C.accent}` : `1px solid ${C.border}`, background: paletteColor(q), color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>{i + 1}</button>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: C.textMuted, display: "flex", flexDirection: "column", gap: 6 }}>
            <Legend c={C.green} label="Answered" C={C} />
            <Legend c={C.red} label="Not answered" C={C} />
            <Legend c={C.purple} label="Marked for review" C={C} />
            <Legend c={C.surfaceHigh} label="Not visited" C={C} />
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{ display: "flex", gap: 8, padding: "12px 18px", borderTop: `1px solid ${C.border}`, background: C.nav, flexWrap: "wrap" }}>
        <button onClick={clearResp} style={btn(C, "ghost")}>Clear Response</button>
        <button onClick={markNext} style={btn(C, "ghost")}>Mark for Review & Next</button>
        <button onClick={() => goTo(idx - 1)} disabled={idx === 0} style={{ ...btn(C, "ghost"), opacity: idx === 0 ? 0.4 : 1 }}>Previous</button>
        <div style={{ flex: 1 }} />
        <button onClick={saveNext} style={btn(C, "primary")}>Save & Next</button>
      </div>

      {/* Mobile palette toggle -- simple horizontal strip under top bar */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "8px 12px", borderTop: `1px solid ${C.border}`, background: C.bgCard }} className="ec-palette-mobile">
        {questions.map((q, i) => (
          <button key={q.question_id} onClick={() => goTo(i)} style={{ minWidth: 34, height: 34, borderRadius: 8, flexShrink: 0, border: i === idx ? `2px solid ${C.accent}` : `1px solid ${C.border}`, background: paletteColor(q), color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>{i + 1}</button>
        ))}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .ec-palette { display: block !important; }
          .ec-palette-mobile { display: none !important; }
        }
      `}</style>

      {/* Submit confirm */}
      {showSubmitConfirm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowSubmitConfirm(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 22px", maxWidth: 360, textAlign: "center" }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>📝</div>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>Submit test?</p>
            <p style={{ fontSize: 13, color: C.textMuted, margin: "0 0 18px" }}>{answeredCount} of {questions.length} answered. You can't change answers after submitting.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowSubmitConfirm(false)} style={{ flex: 1, ...btn(C, "ghost") }}>Cancel</button>
              <button onClick={() => doSubmit(false)} disabled={submitting} style={{ flex: 1, ...btn(C, "primary") }}>{submitting ? "Submitting…" : "Submit"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </MathJaxProvider>
  );
}

function btn(C, kind) {
  if (kind === "primary") return { padding: "11px 22px", borderRadius: 10, background: C.accent, color: "#fff", border: "none", fontWeight: 800, fontSize: 13, cursor: "pointer" };
  return { padding: "11px 18px", borderRadius: 10, background: "transparent", color: C.text, border: `1px solid ${C.border}`, fontWeight: 700, fontSize: 13, cursor: "pointer" };
}
function Legend({ c, label, C }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 14, height: 14, borderRadius: 4, background: c, display: "inline-block" }} />{label}</div>;
}
function Center({ children, C }) {
  return <div style={{ minHeight: "100vh", background: C.bg, color: C.textMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{children}</div>;
}
