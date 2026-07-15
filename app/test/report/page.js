"use client";
/**
 * Test report card (Phase 4).  /test/report?id=xxx
 *
 * Shows the graded result of a completed test:
 *   - marks obtained / max, accuracy %, time taken
 *   - correct / incorrect / unanswered breakdown (donut)
 *   - per-question review: your answer vs correct, with View Solution
 *
 * All data is read back from tests + test_questions + test_answers +
 * question content (v_questions_full) + answers table.
 */
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MathContent from "@/components/MathContent";
import MathJaxProvider from "@/components/MathJaxProvider";
import { supabase } from "@/lib/supabase";
import { DARK, LIGHT } from "@/lib/questionTheme";

const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function TestReportPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [isDark, setIsDark] = useState(true);
  useEffect(() => { const s = localStorage.getItem("ec_theme"); if (s !== null) setIsDark(s === "dark"); }, []);
  const C = isDark ? DARK : LIGHT;

  const [status, setStatus] = useState("loading");
  const [test, setTest] = useState(null);
  const [rows, setRows] = useState([]); // per-question review
  const [showSolutions, setShowSolutions] = useState(false);

  useEffect(() => {
    if (!id) { setStatus("notfound"); return; }
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess?.session?.user) { router.push(`/login?next=/test/report?id=${id}`); return; }

      const { data: t } = await supabase.from("tests").select("*").eq("id", id).maybeSingle();
      if (!t) { setStatus("notfound"); return; }
      setTest(t);

      const { data: tqs } = await supabase.from("test_questions").select("*").eq("test_id", id).order("position");
      const { data: tas } = await supabase.from("test_answers").select("*").eq("test_id", id);
      const qIds = (tqs || []).map((r) => r.question_id);

      const { data: qContent } = await supabase.from("v_questions_full")
        .select("id, question_text, option_1, option_2, option_3, option_4, question_type")
        .in("id", qIds);
      const { data: ansRows } = await supabase.from("answers").select("question_id, correct_option, solution_text").in("question_id", qIds);

      const contentById = new Map((qContent || []).map((q) => [q.id, q]));
      const ansById = new Map((ansRows || []).map((a) => [a.question_id, a]));
      const taById = new Map((tas || []).map((a) => [a.question_id, a]));

      const review = (tqs || []).map((r) => {
        const c = contentById.get(r.question_id) || {};
        const a = ansById.get(r.question_id) || {};
        const ta = taById.get(r.question_id) || {};
        return {
          position: r.position,
          question_id: r.question_id,
          question_text: c.question_text || "",
          options: [c.option_1, c.option_2, c.option_3, c.option_4].filter((x) => x != null),
          question_type: c.question_type || "MCQ",
          correct_option: a.correct_option || "",
          solution_text: a.solution_text || "",
          selected: ta.selected_option ?? null,
          is_correct: ta.is_correct,
          marks_positive: Number(r.marks_positive),
          marks_negative: Number(r.marks_negative),
        };
      });
      setRows(review);
      setStatus("ready");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (status === "loading") return <Center C={C}>Loading report…</Center>;
  if (status === "notfound") return <Center C={C}>Report not found.</Center>;

  const total = test.total_questions || rows.length;
  const acc = test.correct_count != null && (test.correct_count + test.incorrect_count) > 0
    ? Math.round((test.correct_count / (test.correct_count + test.incorrect_count)) * 100)
    : 0;
  const mins = Math.floor((test.time_taken_secs || 0) / 60);
  const secs = (test.time_taken_secs || 0) % 60;

  const backToChapter = () => {
    const last = localStorage.getItem("last_exam");
    router.push(last ? `/pyq/${last}` : "/");
  };

  // Donut geometry
  const donut = () => {
    const c = test.correct_count || 0, w = test.incorrect_count || 0, u = test.unanswered_count || 0;
    const tot = Math.max(1, c + w + u);
    const seg = [
      { v: c, color: C.green },
      { v: w, color: C.red },
      { v: u, color: C.surfaceHigh },
    ];
    const R = 54, CIRC = 2 * Math.PI * R;
    let offset = 0;
    return (
      <svg viewBox="0 0 140 140" width="140" height="140">
        <circle cx="70" cy="70" r={R} fill="none" stroke={C.surface} strokeWidth="16" />
        {seg.map((s, i) => {
          const frac = s.v / tot;
          const dash = frac * CIRC;
          const el = (
            <circle key={i} cx="70" cy="70" r={R} fill="none" stroke={s.color} strokeWidth="16"
              strokeDasharray={`${dash} ${CIRC - dash}`} strokeDashoffset={-offset}
              transform="rotate(-90 70 70)" strokeLinecap="butt" />
          );
          offset += dash;
          return el;
        })}
        <text x="70" y="66" textAnchor="middle" fontSize="24" fontWeight="800" fill={C.text}>{total}</text>
        <text x="70" y="86" textAnchor="middle" fontSize="11" fill={C.textMuted}>Total Qs</text>
      </svg>
    );
  };

  const Stat = ({ label, value, color }) => (
    <div style={{ flex: 1, minWidth: 110, padding: "16px 18px", borderRadius: 14, border: `1px solid ${C.border}`, background: C.bgCard, textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: color || C.text }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{label}</div>
    </div>
  );

  return (
    <MathJaxProvider>
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 18px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button onClick={backToChapter} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, color: C.textMuted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>← Back</button>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: 0 }}>Report Card</h1>
          <button onClick={() => setShowSolutions((s) => !s)} style={{ padding: "8px 16px", borderRadius: 10, background: C.accentBg, color: C.accentLight, border: `1px solid ${C.accent}`, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {showSolutions ? "Hide" : "View"} Solutions
          </button>
        </div>

        {/* Score banner */}
        <div style={{ textAlign: "center", padding: "22px", background: C.accentBg, border: `1px solid ${C.accent}44`, borderRadius: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accentLight, letterSpacing: 1, marginBottom: 4 }}>MARKS OBTAINED</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: C.text }}>
            {test.score > 0 ? "+" : ""}{test.score}<span style={{ fontSize: 20, color: C.textMuted }}> / {test.max_score}</span>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <Stat label={`Qs attempted out of ${total}`} value={(test.correct_count || 0) + (test.incorrect_count || 0)} color={C.accent} />
          <Stat label="Accuracy" value={`${acc}%`} color={C.greenText} />
          <Stat label="Time taken" value={`${mins}m ${secs}s`} color={C.amberText} />
        </div>

        {/* Donut breakdown */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "20px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {donut()}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <LegendRow color={C.green} label="Correct" value={test.correct_count || 0} C={C} />
            <LegendRow color={C.red} label="Incorrect" value={test.incorrect_count || 0} C={C} />
            <LegendRow color={C.surfaceHigh} label="Not Answered" value={test.unanswered_count || 0} C={C} />
          </div>
        </div>

        {/* Per-question review */}
        <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 12 }}>Question Review</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((r) => {
            const correctSet = (r.correct_option || "").split(",").map((s) => s.trim()).filter(Boolean);
            const badge = r.selected == null || r.selected === ""
              ? { text: "Not Answered", bg: C.surfaceHigh, fg: C.textMuted }
              : r.is_correct
                ? { text: `Correct +${Math.abs(r.marks_positive)}`, bg: C.greenBg, fg: C.greenText }
                : { text: `Incorrect −${Math.abs(r.marks_negative)}`, bg: C.redBg, fg: C.redText };
            return (
              <div key={r.question_id} style={{ padding: "16px 18px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bgCard }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: C.textMuted }}>Q{r.position}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: badge.fg, background: badge.bg, padding: "3px 10px", borderRadius: 6 }}>{badge.text}</span>
                </div>
                <MathContent text={r.question_text} block style={{ color: C.text, fontSize: 15, marginBottom: 12 }} />

                {r.question_type === "NUMERICAL" ? (
                  <div style={{ fontSize: 13, color: C.textMuted }}>
                    Your answer: <strong style={{ color: r.is_correct ? C.greenText : C.redText }}>{r.selected || "—"}</strong>
                    {" · "}Correct: <strong style={{ color: C.greenText }}>{r.correct_option}</strong>
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: 8 }}>
                    {r.options.map((opt, i) => {
                      const val = String(i + 1);
                      const isCorrect = correctSet.includes(val);
                      const isPicked = String(r.selected) === val;
                      let bg = C.surface, bd = C.border, fg = C.text;
                      if (isCorrect) { bg = C.greenBg; bd = C.green; fg = C.greenText; }
                      else if (isPicked && !isCorrect) { bg = C.redBg; bd = C.red; fg = C.redText; }
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${bd}`, background: bg }}>
                          <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, background: isCorrect ? C.green : isPicked ? C.red : C.surfaceHigh, color: "#fff" }}>{OPTION_LETTERS[i]}</span>
                          <MathContent text={opt} style={{ color: fg }} />
                          {isCorrect && <span style={{ marginLeft: "auto", fontSize: 12, color: C.greenText, fontWeight: 700 }}>✓ Correct</span>}
                          {isPicked && !isCorrect && <span style={{ marginLeft: "auto", fontSize: 12, color: C.redText, fontWeight: 700 }}>Your answer</span>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {showSolutions && r.solution_text && (
                  <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 10, background: C.surface, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, marginBottom: 6 }}>SOLUTION</div>
                    <MathContent text={r.solution_text} block style={{ color: C.text, fontSize: 14 }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </MathJaxProvider>
  );
}

function LegendRow({ color, label, value, C }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ width: 14, height: 14, borderRadius: 4, background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 13, color: C.textMuted, minWidth: 100 }}>{label}</span>
      <strong style={{ fontSize: 15, color: C.text }}>{value} Qs</strong>
    </div>
  );
}
function Center({ children, C }) {
  return <div style={{ minHeight: "100vh", background: C.bg, color: C.textMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{children}</div>;
          }
