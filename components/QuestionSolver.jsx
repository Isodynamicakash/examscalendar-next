"use client";
/**
 * QuestionSolver.jsx -- pick, check, reveal-on-earn flow.
 *
 * State machine for reveals (correctAnswer + solution together):
 *   attempt 1 correct   -> auto-reveal
 *   attempt 1 wrong     -> user must click "Show Answer" to reveal
 *   attempt >=2 correct -> auto-reveal
 *   attempt >=2 wrong   -> auto-reveal (they've had one free attempt)
 *
 * Every Check Answer click records a row in user_attempts, so accuracy
 * stats have data to work with later.
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import MathContent from "./MathContent";
import { DARK, LIGHT } from "@/lib/questionTheme";
import { supabase } from "@/lib/supabase";

function getCtx() { if (typeof window === "undefined") return null; try { return new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; } }
function playTone(ctx, freq, startTime, duration, type = "sine", gainPeak = 0.14) {
  const osc = ctx.createOscillator(); const gain = ctx.createGain();
  osc.type = type; osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(startTime); osc.stop(startTime + duration + 0.02);
}
function playCorrectSound() { const ctx = getCtx(); if (!ctx) return; const t = ctx.currentTime;
  playTone(ctx, 784, t, 0.13, "triangle"); playTone(ctx, 988, t + 0.09, 0.13, "triangle"); playTone(ctx, 1319, t + 0.18, 0.22, "triangle", 0.17); }
function playIncorrectSound() { const ctx = getCtx(); if (!ctx) return; const t = ctx.currentTime;
  playTone(ctx, 180, t, 0.16, "sawtooth", 0.13); playTone(ctx, 140, t + 0.15, 0.22, "sawtooth", 0.13); }

function formatTime(sec) { const m = Math.floor(sec / 60).toString().padStart(2, "0"); const s = Math.floor(sec % 60).toString().padStart(2, "0"); return `${m}:${s}`; }

// Standard bookmark-ribbon icon (outline / filled), matching the MARKS app's
// save button. Swap this out easily if the brand wants a different glyph.
function BookmarkIcon({ filled }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M6 3.5a1.5 1.5 0 0 0-1.5 1.5v15.2a.6.6 0 0 0 .93.5L12 16.4l6.57 4.3a.6.6 0 0 0 .93-.5V5a1.5 1.5 0 0 0-1.5-1.5H6z" />
    </svg>
  );
}

export default function QuestionSolver({ q, answer, examLabel, chapterName, chapterHref, basePath, filterQuery = "", slugList = [] }) {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("ec_theme") : null;
    if (saved !== null) setIsDark(saved === "dark");
  }, []);
  const T = isDark ? DARK : LIGHT;
  const router = useRouter();

  const [selected, setSelected] = useState(null);
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [numericInput, setNumericInput] = useState("");
  const [checked, setChecked] = useState(false);       // has Check Answer been clicked this attempt
  const [wasCorrect, setWasCorrect] = useState(null);  // result of the check
  const [revealed, setRevealed] = useState(false);     // solution + correct-answer visible
  const [attemptNum, setAttemptNum] = useState(1);     // 1st, 2nd, 3rd try on THIS question this session
  const [flash, setFlash] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const flashTimeoutRef = useRef(null);

  // Auth + bookmark state
  const [user, setUser] = useState(null);
  const [bookmarked, setBookmarked] = useState(null);
  const [bmBusy, setBmBusy] = useState(false);

  const currentIndex = slugList.indexOf(q.slug);
  const qsSuffix = filterQuery ? `?${filterQuery}` : "";
  const prevSlug = currentIndex > 0 ? slugList[currentIndex - 1] : null;
  const nextSlug = currentIndex >= 0 && currentIndex < slugList.length - 1 ? slugList[currentIndex + 1] : currentIndex === -1 && slugList.length > 0 ? slugList[0] : null;

  const opts = [q.option_1, q.option_2, q.option_3, q.option_4].filter(Boolean);
  const correctOptions = (answer?.correct_option || "").split(",").map((s) => s.trim()).filter(Boolean).map((n) => parseInt(n, 10) - 1);
  const isMSQ = q.question_type === "MSQ";
  const isNumerical = q.question_type === "NUMERICAL";
  const hasAnswer = isNumerical ? numericInput.trim() !== "" : isMSQ ? selectedMulti.length > 0 : selected !== null;

  // Reset ALL state on question change (Next/Prev nav). Timer restarts.
  const resetAll = useCallback(() => {
    setSelected(null); setSelectedMulti([]); setNumericInput("");
    setChecked(false); setWasCorrect(null); setRevealed(false);
    setAttemptNum(1);
    setFlash(null); setSeconds(0);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }, []);

  // Solve Again: clear input + result but INCREMENT attemptNum so the
  // next Check Answer knows this is attempt 2+ and behaves differently
  // for wrong answers (auto-reveal instead of requiring Show Answer).
  const solveAgain = useCallback(() => {
    setSelected(null); setSelectedMulti([]); setNumericInput("");
    setChecked(false); setWasCorrect(null); setRevealed(false);
    setAttemptNum((n) => n + 1);
    setFlash(null); setSeconds(0);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }, []);

  useEffect(() => {
    resetAll();
    return () => { clearInterval(timerRef.current); clearTimeout(flashTimeoutRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.slug]);

  // Remember the chapter being practiced so the "Continue Solving"
  // banner on the chapter browse page can offer to resume it. The API
  // returns subject_slug/chapter_slug on the question but NOT exam_slug,
  // so we derive all three from basePath (/pyq/{exam}/{subject}/{chapter})
  // which is always reliable.
  useEffect(() => {
    try {
      const parts = (basePath || "").split("/").filter(Boolean); // ["pyq", exam, subject, chapter]
      const examSlug = parts[1];
      const subjectSlug = parts[2] || q?.subject_slug;
      const chapterSlug = parts[3] || q?.chapter_slug;
      const chName = q?.chapter_name || chapterName;
      if (examSlug && subjectSlug && chapterSlug) {
        localStorage.setItem("last_practiced", JSON.stringify({
          examSlug, subjectSlug, chapterSlug, chapterName: chName,
        }));
      }
    } catch {}
  }, [basePath, q?.subject_slug, q?.chapter_slug, q?.chapter_name, chapterName]);

  // Load auth + bookmark state for this question
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const u = sess?.session?.user || null;
      if (cancelled) return;
      setUser(u);
      if (!u || !q?.id) { setBookmarked(false); return; }
      const { data, error } = await supabase.from("bookmarks").select("id").eq("question_id", q.id).maybeSingle();
      if (cancelled) return;
      if (error) { console.error("Bookmark check failed:", error); setBookmarked(false); return; }
      setBookmarked(!!data);
    })();
    return () => { cancelled = true; };
  }, [q?.id]);

  const toggleBookmark = async () => {
    if (!user) { router.push("/login"); return; }
    if (bmBusy || !q?.id) return;
    setBmBusy(true);
    try {
      if (bookmarked) {
        const { error } = await supabase.from("bookmarks").delete().eq("question_id", q.id);
        if (error) throw error; setBookmarked(false);
      } else {
        const { error } = await supabase.from("bookmarks").insert({ user_id: user.id, question_id: q.id });
        if (error) throw error; setBookmarked(true);
      }
    } catch (e) { console.error("Bookmark toggle failed:", e); }
    finally { setBmBusy(false); }
  };

  const evaluateCorrect = () => {
    if (isNumerical) {
      const g = parseFloat(numericInput), e = parseFloat(answer?.correct_option);
      return !isNaN(g) && !isNaN(e) && Math.abs(g - e) < 0.01;
    }
    if (isMSQ) {
      const a = [...selectedMulti].sort(), b = [...correctOptions].sort();
      return a.length === b.length && a.every((v, i) => v === b[i]);
    }
    return correctOptions.includes(selected);
  };

  // Record the attempt to Supabase (logged-in users only). Fire and
  // forget -- the UI doesn't wait on it, so a slow network never
  // slows down the reveal.
  const recordAttempt = async (correct) => {
    if (!user || !q?.id) return;
    const selectedStr = isNumerical
      ? numericInput
      : isMSQ
      ? selectedMulti.map((i) => i + 1).join(",")
      : selected !== null ? String(selected + 1) : "";
    try {
      const { error } = await supabase.from("user_attempts").insert({
        user_id: user.id,
        question_id: q.id,
        selected_option: selectedStr,
        is_correct: correct,
        time_taken_secs: seconds,
      });
      if (error) console.error("Attempt record failed:", error);
    } catch (e) { console.error("Attempt record threw:", e); }
  };

  const checkAnswer = () => {
    if (!hasAnswer || checked) return;
    clearInterval(timerRef.current);
    const correct = evaluateCorrect();
    setChecked(true);
    setWasCorrect(correct);

    // Reveal rule: correct always reveals; wrong reveals only on attempt >=2
    if (correct || attemptNum >= 2) setRevealed(true);

    setFlash(correct ? "correct" : "incorrect");
    if (correct) playCorrectSound(); else playIncorrectSound();
    clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => setFlash(null), 700);

    // Record for stats (background)
    recordAttempt(correct);
  };

  // "Show Answer" button appears only for wrong first-attempt state,
  // where reveal is gated. Clicking it opens the reveal.
  const showAnswerNow = () => setRevealed(true);

  const toggleMulti = (i) => { if (checked) return; setSelectedMulti((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])); };

  const goTo = useCallback((slug) => { if (slug) { router.push(`${basePath}/${slug}${qsSuffix}`); router.refresh(); } }, [basePath, qsSuffix, router]);

  const isCorrectOpt = (i) => correctOptions.includes(i);
  const isSelectedOpt = (i) => (isMSQ ? selectedMulti.includes(i) : selected === i);

  // Option colouring rules:
  //   - before check: default, blue on selected
  //   - after check, NOT revealed: red on wrongly-selected only, correct stays hidden (default look)
  //   - after check, revealed: green on correct, red on wrongly-selected, dim on others
  const optState = (i) => {
    if (!checked) return isSelectedOpt(i) ? "sel" : "def";
    if (!revealed) {
      // Show only their own mistake, don't leak the correct one yet
      if (isSelectedOpt(i) && !isCorrectOpt(i)) return "bad";
      return "def";
    }
    if (isCorrectOpt(i)) return "ok";
    if (isSelectedOpt(i)) return "bad";
    return "dim";
  };
  // Solid lettered badges (circle for MCQ, rounded-square for MSQ), matching
  // the MARKS app's quadrant option cards.
  const OPT = {
    def: { bg: T.bgCard, border: T.border, color: T.text, badgeBg: T.surfaceHigh, badgeColor: T.textMuted },
    sel: { bg: T.blueBg, border: T.blue, color: T.blueText, badgeBg: T.blue, badgeColor: "#fff" },
    ok: { bg: T.greenBg, border: T.green, color: T.greenText, badgeBg: T.green, badgeColor: "#fff" },
    bad: { bg: T.redBg, border: T.red, color: T.redText, badgeBg: T.red, badgeColor: "#fff" },
    dim: { bg: T.bgCard, border: T.border, color: T.textDim, badgeBg: T.surfaceHigh, badgeColor: T.textDim },
  };
  const examDate = q.exam_date ? new Date(q.exam_date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : null;
  const flashOverlayStyle = flash ? { boxShadow: `0 0 0 3px ${flash === "correct" ? T.green : T.red}`, transition: "box-shadow .15s" } : { transition: "box-shadow .3s" };

  const bmLabel = !user ? "Sign in to bookmark" : bookmarked ? "Remove bookmark" : "Bookmark this question";
  const bmColor = bookmarked ? "#f59e0b" : T.textDim;
  const bmBg = bookmarked ? "#f59e0b22" : T.surface;

  // Buttons visible per phase:
  //   before check: Check Answer (enabled iff hasAnswer)
  //   checked + revealed: Solve Again
  //   checked + not revealed (wrong 1st): Show Answer, Solve Again
  const showCheckBtn = !checked;
  const showShowAnswerBtn = checked && !revealed;
  const showSolveAgainBtn = checked;

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text }}>
    {/* Bottom padding reserves room for the fixed action bar so it never
        covers the solution text, however far you scroll. */}
    <div style={{ maxWidth: 720, margin: "0 auto", paddingBottom: 92 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: T.textMuted }}>
            Q{currentIndex >= 0 ? currentIndex + 1 : ""} {isMSQ && <span style={{ color: T.purple }}>&middot; MSQ</span>} {isNumerical && <span style={{ color: T.orange }}>&middot; Numerical</span>} {attemptNum > 1 && <span style={{ color: T.textDim, fontWeight: 600 }}>&middot; Attempt {attemptNum}</span>}
          </div>
          <div style={{ fontSize: 12, color: T.textDim }}>
            {examLabel} {q.year || ""} {examDate ? `(${examDate}${q.shift ? " " + q.shift : ""})` : q.shift || ""}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: T.accentLight, background: T.accentBg, border: `1px solid ${T.accent}44`, borderRadius: 20, padding: "4px 12px" }}>
            ⏱ {formatTime(seconds)}
          </span>
          {/* Standard bookmark/save icon button, matching the MARKS app */}
          <button
            onClick={toggleBookmark}
            disabled={bmBusy || bookmarked === null}
            aria-pressed={!!bookmarked}
            title={bmLabel}
            style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: `1px solid ${bookmarked ? "#f59e0b" : T.border}`, background: bmBg, color: bmColor, cursor: bmBusy ? "wait" : "pointer" }}
          >
            <BookmarkIcon filled={!!bookmarked} />
          </button>
        </div>
      </div>

      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 22px", ...flashOverlayStyle }}>
        <MathContent text={q.question_text} block style={{ color: T.text, fontSize: 16, marginBottom: 16 }} />
        {q.has_diagram && q.images?.length > 0 && !q.question_text?.includes("[IMAGE:") && q.images.filter((im) => im.position !== "solution").map((im, i) => (<img key={i} src={im.url} alt="question diagram" style={{ maxWidth: "100%", borderRadius: 8, margin: "10px 0" }} />))}

        {!isNumerical && opts.length > 0 && (
          // Four-quadrant option grid, MARKS-style. auto-fit collapses to a
          // single column on narrow (mobile) widths automatically.
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, marginTop: 10 }}>
            {opts.map((opt, i) => {
              const st = OPT[optState(i)];
              const showYouMarked = checked && isSelectedOpt(i) && (!isCorrectOpt(i) || !revealed) && !(revealed && isCorrectOpt(i));
              const showCorrectTag = revealed && isCorrectOpt(i);
              return (
                <button
                  key={i}
                  onClick={() => (isMSQ ? toggleMulti(i) : !checked && setSelected(i))}
                  disabled={checked}
                  style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${st.border}`, background: st.bg, color: st.color, cursor: checked ? "default" : "pointer", fontSize: 15, minHeight: 58 }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 24,
                      height: 24,
                      borderRadius: isMSQ ? 6 : "50%",
                      background: st.badgeBg,
                      color: st.badgeColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {isSelectedOpt(i) && !revealed ? "✓" : String.fromCharCode(65 + i)}
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
                        background: showCorrectTag ? T.green : T.red,
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
        )}

        {isNumerical && (
          <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, display: "block", marginBottom: 6 }}>Enter your numeric answer</label>
            <input type="number" step="any" value={numericInput} onChange={(e) => !checked && setNumericInput(e.target.value)} disabled={checked} placeholder="e.g. 12.5" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, fontSize: 16, border: `1.5px solid ${checked ? (wasCorrect ? T.green : T.red) : T.border}`, background: T.surface, color: T.text, outline: "none" }} />
            {revealed && (
              <div style={{ marginTop: 8, fontSize: 13, color: T.textMuted }}>
                Correct answer: <strong style={{ color: T.greenText }}>{answer?.correct_option}</strong>
              </div>
            )}
          </div>
        )}

        {revealed && answer?.solution_text && (
          <div style={{ marginTop: 18, padding: "16px 18px", background: T.surface, borderRadius: 10, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.textMuted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Solution</div>
            <MathContent text={answer.solution_text} block style={{ color: T.text, fontSize: 14 }} />
          </div>
        )}
      </div>

      {chapterHref && <div style={{ textAlign: "center", marginTop: 20 }}><a href={chapterHref} style={{ fontSize: 13, color: T.textMuted }}>← Back to {chapterName} chapter list</a></div>}
    </div>

    {/* Fixed bottom action bar -- Previous / primary action(s) / Next.
        Stays pinned to the viewport regardless of scroll position, so the
        controls never disappear behind the solution text, MARKS-style. */}
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        background: T.bgCard,
        borderTop: `1px solid ${T.border}`,
        boxShadow: "0 -4px 16px rgba(0,0,0,0.18)",
        padding: "10px 16px",
      }}
    >
      <div style={{ display: "flex", gap: 10, maxWidth: 720, margin: "0 auto", alignItems: "center" }}>
        <button
          onClick={() => goTo(prevSlug)}
          disabled={!prevSlug}
          style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", color: prevSlug ? T.text : T.textDim, fontWeight: 700, fontSize: 13.5, cursor: prevSlug ? "pointer" : "not-allowed", opacity: prevSlug ? 1 : 0.5 }}
        >
          ← Previous
        </button>

        <div style={{ display: "flex", gap: 8, flex: 1.6 }}>
          {showCheckBtn && (
            <button onClick={checkAnswer} disabled={!hasAnswer} style={{ flex: 1, padding: "12px", borderRadius: 10, fontSize: 13.5, fontWeight: 800, border: "none", cursor: hasAnswer ? "pointer" : "not-allowed", background: hasAnswer ? T.accent : T.surfaceHigh, color: hasAnswer ? "#fff" : T.textDim }}>
              Check Answer
            </button>
          )}
          {showShowAnswerBtn && (
            <button onClick={showAnswerNow} style={{ flex: 1, padding: "12px", borderRadius: 10, fontSize: 13.5, fontWeight: 800, border: `1px solid ${T.purple}`, cursor: "pointer", background: "transparent", color: T.purple }}>
              Show Answer
            </button>
          )}
          {showSolveAgainBtn && (
            <button onClick={solveAgain} style={{ flex: 1, padding: "12px", borderRadius: 10, fontSize: 13.5, fontWeight: 800, border: `1px solid ${T.accent}`, cursor: "pointer", background: T.accentBg, color: T.accentLight }}>
              ↺ Solve Again
            </button>
          )}
        </div>

        <button
          onClick={() => goTo(nextSlug)}
          disabled={!nextSlug}
          style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${T.accent}`, background: nextSlug ? T.accent : "transparent", color: nextSlug ? "#fff" : T.textDim, fontWeight: 700, fontSize: 13.5, cursor: nextSlug ? "pointer" : "not-allowed", opacity: nextSlug ? 1 : 0.5 }}
        >
          Next →
        </button>
      </div>
    </div>
    </div>
  );
}
