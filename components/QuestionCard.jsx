"use client";
import { useState } from "react";
import Link from "next/link";
import MathContent from "./MathContent";
import { subjColor } from "@/lib/questionTheme";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// q            = question object (from /api/questions or /api/questions/{slug})
// initialAnswer= optional, pass this on the SSR question-detail page since
//                the answer is ALREADY fetched server-side (getQuestionWithAnswer).
//                On list pages, leave it undefined — reveal fetches on click,
//                exactly like your current app.
// prevHref / nextHref = optional hrefs for the fixed Previous/Next nav buttons.
//                Pass these from the page (SSR knows the slug list); if omitted
//                the corresponding button renders disabled.
// bookmarked / onBookmarkToggle = optional controlled bookmark state. If you
//                don't pass onBookmarkToggle, the button still toggles visually
//                and calls POST/DELETE on `${apiBase}/api/questions/{slug}/bookmark`
//                (adjust that endpoint to match your real API — this is a
//                reasonable default, not a confirmed contract).
export default function QuestionCard({
  q,
  index,
  C,
  isMobile,
  apiBase,
  initialAnswer,
  prevHref,
  nextHref,
  bookmarked: bookmarkedProp,
  onBookmarkToggle,
}) {
  const [revealed, setRevealed] = useState(!!initialAnswer && index === undefined);
  const [answer, setAnswer] = useState(initialAnswer || null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [bookmarked, setBookmarked] = useState(!!bookmarkedProp);
  const [bookmarkBusy, setBookmarkBusy] = useState(false);

  const reveal = async () => {
    if (revealed) { setRevealed(false); setSelected(null); return; }
    if (answer) { setRevealed(true); return; } // already have it (SSR-provided)
    setLoading(true);
    try {
      const res = await fetch(`${apiBase || API}/api/questions/${q.slug}/answer`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setAnswer(await res.json());
      setRevealed(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async () => {
    const next = !bookmarked;
    setBookmarked(next); // optimistic
    setBookmarkBusy(true);
    try {
      if (onBookmarkToggle) {
        await onBookmarkToggle(next, q);
      } else {
        await fetch(`${apiBase || API}/api/questions/${q.slug}/bookmark`, {
          method: next ? "POST" : "DELETE",
        });
      }
    } catch (e) {
      console.error(e);
      setBookmarked(!next); // revert on failure
    } finally {
      setBookmarkBusy(false);
    }
  };

  const opts = [q.option_1, q.option_2, q.option_3, q.option_4].filter(Boolean);
  const isCorrect = (i) => (answer?.correct_option ? answer.correct_option.split(",").map((s) => s.trim()).includes(String(i + 1)) : false);
  const optState = (i) => {
    if (!revealed) return selected === i ? "sel" : "def";
    if (isCorrect(i)) return "ok";
    if (selected === i) return "bad";
    return "dim";
  };
  const OPT = {
    def: { bg: C.bgCard, border: C.border, color: C.text, badgeBg: C.surfaceHigh, badgeColor: C.textMuted },
    sel: { bg: C.blueBg, border: C.blue, color: C.blueText, badgeBg: C.blue, badgeColor: "#fff" },
    ok: { bg: C.greenBg, border: C.green, color: C.greenText, badgeBg: C.green, badgeColor: "#fff" },
    bad: { bg: C.redBg, border: C.red, color: C.redText, badgeBg: C.red, badgeColor: "#fff" },
    dim: { bg: C.bgCard, border: C.border, color: C.textDim, badgeBg: C.surfaceHigh, badgeColor: C.textDim },
  };
  const TYPE_C = { MCQ: C.blue, MSQ: C.purple, NUMERICAL: C.orange };
  const DIFF_C = { easy: C.green, medium: C.amber, hard: C.red };
  const sc = subjColor(q.subject_name || "X", C.isDark);
  const examDate = q.exam_date ? new Date(q.exam_date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : null;
  const pad = isMobile ? "12px 12px" : "16px 20px";
  const gridCols = isMobile ? "1fr" : "1fr 1fr";

  return (
    <div style={{ paddingBottom: 76 }}>
      <div
        style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", transition: "border-color .15s" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.borderLight)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
      >
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "8px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {index !== undefined && <span style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 6, padding: "1px 8px", flexShrink: 0 }}>Q{index + 1}</span>}
            {q.subject_name && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, background: sc.bg, color: sc.text, border: `1px solid ${sc.text}44`, whiteSpace: "nowrap" }}>{q.subject_name}</span>}
            {q.question_type && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, background: (TYPE_C[q.question_type] || C.blue) + "18", color: TYPE_C[q.question_type] || C.blue, border: `1px solid ${TYPE_C[q.question_type] || C.blue}44`, whiteSpace: "nowrap" }}>{q.question_type}</span>}
            {q.difficulty && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, background: (DIFF_C[q.difficulty] || C.amber) + "18", color: DIFF_C[q.difficulty] || C.amber, border: `1px solid ${DIFF_C[q.difficulty] || C.amber}44`, textTransform: "capitalize", whiteSpace: "nowrap" }}>{q.difficulty}</span>}

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              {(q.marks_positive || q.marks_negative) && (
                <span style={{ fontSize: 11, fontWeight: 700 }}>
                  {q.marks_positive && <span style={{ color: C.green }}>+{q.marks_positive}</span>}
                  {q.marks_positive && q.marks_negative && <span style={{ color: C.textDim }}> / </span>}
                  {q.marks_negative && <span style={{ color: C.red }}>{q.marks_negative}</span>}
                </span>
              )}
              {/* Standard bookmark/save icon, matching MARKS' square bookmark button */}
              <button
                onClick={toggleBookmark}
                disabled={bookmarkBusy}
                aria-label={bookmarked ? "Remove bookmark" : "Bookmark this question"}
                aria-pressed={bookmarked}
                title={bookmarked ? "Bookmarked" : "Bookmark"}
                style={{
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 7,
                  border: `1px solid ${bookmarked ? C.accent : C.border}`,
                  background: bookmarked ? C.accentBg : "transparent",
                  color: bookmarked ? C.accentLight : C.textMuted,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <path d="M6 3.5a1.5 1.5 0 0 0-1.5 1.5v15.2a.6.6 0 0 0 .93.5L12 16.4l6.57 4.3a.6.6 0 0 0 .93-.5V5a1.5 1.5 0 0 0-1.5-1.5H6z" />
                </svg>
              </button>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {examDate && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: C.isDark ? "#a78bfa" : "#7c3aed", background: C.isDark ? "#1e0f38" : "#f3e8ff", border: `1px solid ${C.isDark ? "#a78bfa33" : "#a78bfa55"}`, borderRadius: 6, padding: "3px 9px", whiteSpace: "nowrap" }}>📅 {examDate}</span>}
            {!examDate && q.year && <span style={{ fontSize: 11, fontWeight: 700, color: C.isDark ? "#a78bfa" : "#7c3aed", background: C.isDark ? "#1e0f38" : "#f3e8ff", border: `1px solid ${C.isDark ? "#a78bfa33" : "#a78bfa55"}`, borderRadius: 6, padding: "3px 9px", whiteSpace: "nowrap" }}>{q.year}</span>}
            {q.shift && <span style={{ fontSize: 11, fontWeight: 700, color: C.isDark ? "#60a5fa" : "#1d4ed8", background: C.isDark ? "#0f1f3d" : "#dbeafe", border: `1px solid ${C.isDark ? "#60a5fa33" : "#3b82f644"}`, borderRadius: 6, padding: "3px 9px", whiteSpace: "nowrap" }}>{q.shift}</span>}
            {q.chapter_name && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: C.isDark ? "#fbbf24" : "#92400e", background: C.isDark ? "#2d1f00" : "#fef3c7", border: `1px solid ${C.isDark ? "#fbbf2433" : "#f59e0b44"}`, borderRadius: 6, padding: "3px 9px", wordBreak: "break-word" }}>📂 {q.chapter_name}</span>}
            {q.topic_name && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: C.isDark ? "#34d399" : "#065f46", background: C.isDark ? "#0d2818" : "#d1fae5", border: `1px solid ${C.isDark ? "#34d39933" : "#10b98144"}`, borderRadius: 6, padding: "3px 9px", wordBreak: "break-word" }}>› {q.topic_name}</span>}
          </div>
        </div>

        <div style={{ padding: pad }}>
          <MathContent text={q.question_text} block style={{ color: C.text, fontSize: 15, marginBottom: 14 }} />

          {q.has_diagram && q.images?.length > 0 && !q.question_text?.includes("[IMAGE:") &&
            q.images.filter((im) => im.position !== "solution").map((im, i) => (
              <img key={i} src={im.url} alt="question diagram" style={{ maxWidth: "100%", borderRadius: 8, margin: "10px 0" }} />
            ))}

          {opts.length > 0 && (
            <>
              {/* Top-right "Show Answer" link, matching MARKS' "Show Correct Answer" placement */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                <button
                  onClick={reveal}
                  disabled={loading}
                  style={{ background: "transparent", border: "none", color: C.accentLight, fontWeight: 700, fontSize: 12.5, cursor: "pointer", padding: "4px 2px" }}
                >
                  {loading ? "Loading…" : revealed ? "Hide answer" : "Show Correct Answer"}
                </button>
              </div>

              {/* Four-quadrant option grid, MARKS-style */}
              <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 10 }}>
                {opts.map((opt, i) => {
                  const st = OPT[optState(i)];
                  const showYouMarked = revealed && selected === i;
                  const showCorrectTag = revealed && isCorrect(i);
                  return (
                    <button
                      key={i}
                      onClick={() => !revealed && setSelected(i)}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        textAlign: "left",
                        padding: "12px 14px",
                        borderRadius: 12,
                        border: `1.5px solid ${st.border}`,
                        background: st.bg,
                        color: st.color,
                        cursor: revealed ? "default" : "pointer",
                        fontSize: 14,
                        minHeight: 56,
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: st.badgeBg,
                          color: st.badgeColor,
                          fontWeight: 800,
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ marginTop: 2, flex: 1 }}>
                        <MathContent text={opt} />
                      </span>
                      {(showYouMarked || showCorrectTag) && (
                        <span
                          style={{
                            position: "absolute",
                            top: -9,
                            right: 10,
                            fontSize: 9.5,
                            fontWeight: 800,
                            padding: "2px 7px",
                            borderRadius: 20,
                            background: showCorrectTag ? C.green : C.red,
                            color: "#fff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {showCorrectTag ? "Correct" : "You marked"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {opts.length === 0 && (
            <button
              onClick={reveal}
              disabled={loading}
              style={{ marginTop: 14, padding: "9px 18px", borderRadius: 10, border: `1px solid ${C.accent}`, background: revealed ? "transparent" : C.accentBg, color: C.accentLight, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
            >
              {loading ? "Loading…" : revealed ? "Hide answer" : "Reveal answer"}
            </button>
          )}

          {revealed && answer?.solution_text && (
            <div style={{ marginTop: 14, padding: "14px 16px", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Solution</div>
              <MathContent text={answer.solution_text} block style={{ color: C.text, fontSize: 14 }} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom action bar — stays on screen while scrolling the solution, MARKS-style */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          background: C.bgCard,
          borderTop: `1px solid ${C.border}`,
          boxShadow: "0 -4px 16px rgba(0,0,0,0.18)",
          padding: isMobile ? "10px 12px" : "12px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 900, margin: "0 auto" }}>
          {prevHref ? (
            <Link
              href={prevHref}
              style={{ flex: 1, textAlign: "center", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, color: C.text, fontWeight: 700, fontSize: 13.5, textDecoration: "none" }}
            >
              ← Previous
            </Link>
          ) : (
            <span style={{ flex: 1, textAlign: "center", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, color: C.textDim, fontWeight: 700, fontSize: 13.5, opacity: 0.5 }}>
              ← Previous
            </span>
          )}

          <button
            onClick={reveal}
            disabled={loading}
            style={{ flex: 1.3, textAlign: "center", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.accent}`, background: C.accentBg, color: C.accentLight, fontWeight: 800, fontSize: 13.5, cursor: "pointer" }}
          >
            {loading ? "Loading…" : revealed ? "Solve again" : "Show Answer"}
          </button>

          {nextHref ? (
            <Link
              href={nextHref}
              style={{ flex: 1, textAlign: "center", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.accent}`, background: C.accent, color: "#fff", fontWeight: 700, fontSize: 13.5, textDecoration: "none" }}
            >
              Next →
            </Link>
          ) : (
            <span style={{ flex: 1, textAlign: "center", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, color: C.textDim, fontWeight: 700, fontSize: 13.5, opacity: 0.5 }}>
              Next →
            </span>
          )}
        </div>
      </div>
    </div>
  );
                          }
