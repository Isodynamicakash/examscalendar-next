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
import { DARK } from "@/lib/questionTheme";
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

export default function QuestionSolver({ q, answer, examLabel, chapterName, chapterHref, basePath, filterQuery = "", slugList = [] }) {
  const T = DARK;
  const router = useRouter();

  const [selected, setSelected] = useState(null);
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [numericInput, setNumericInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [attemptNum, setAttemptNum] = useState(1);
  const [flash, setFlash] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const flashTimeoutRef = useRef(null);

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

  const resetAll = useCallback(() => {
    setSelected(null); setSelectedMulti([]); setNumericInput("");
    setChecked(false); setWasCorrect(null); setRevealed(false);
    setAttemptNum(1);
    setFlash(null); setSeconds(0);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }, []);

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
    if (correct || attemptNum >= 2) setRevealed(true);
    setFlash(correct ? "correct" : "incorrect");
    if (correct) playCorrectSound(); else playIncorrectSound();
    clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => setFlash(null), 700);
    recordAttempt(correct);
  };

  const showAnswerNow = () => setRevealed(true);
  const toggleMulti = (i) => { if (checked) return; setSelectedMulti((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])); };
  const goTo = useCallback((slug) => { if (slug) { router.push(`${basePath}/${slug}${qsSuffix}`); router.refresh(); } }, [basePath, qsSuffix, router]);

  const isCorrectOpt = (i) => correctOptions.includes(i);
  const isSelectedOpt = (i) => (isMSQ ? selectedMulti.includes(i) : selected === i);

  const optState = (i) => {
    if (!checked) return isSelectedOpt(i) ? "sel" : "def";
    if (!revealed) {
      if (isSelectedOpt(i) && !isCorrectOpt(i)) return "bad";
      return "def";
    }
    if (isCorrectOpt(i)) return "ok";
    if (isSelectedOpt(i)) return "bad";
    return "dim";
  };
  const OPT = {
    def: { bg: T.bgCard, border: T.border, color: T.text, letter: T.textMuted },
    sel: { bg: T.blueBg, border: T.blue, color: T.blueText, letter: T.blue },
    ok: { bg: T.greenBg, border: T.green, color: T.greenText, letter: T.green },
    bad: { bg: T.redBg, border: T.red, color: T.redText, letter: T.red },
    dim: { bg: T.bgCard, border: T.border, color: T.textDim, letter: T.textDim },
  };
  const examDate = q.exam_date ? new Date(q.exam_date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : null;
  const flashOverlayStyle = flash ? { boxShadow: `0 0 0 3px ${flash === "correct" ? T.green : T.red}`, transition: "box-shadow .15s" } : { transition: "box-shadow .3s" };

  const bmLabel = !user ? "Sign in to bookmark" : bookmarked ? "Remove bookmark" : "Bookmark this question";
  const bmColor = bookmarked ? "#f59e0b" : T.textDim;
  const bmBg = bookmarked ? "#f59e0b22" : T.surface;

  const showCheckBtn = !checked;
  const showShowAnswerBtn = checked && !revealed;
  const showSolveAgainBtn = checked;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
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
          <button onClick={toggleBookmark} disabled={bmBusy || bookmarked === null} title={bmLabel} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${bookmarked ? "#f59e0b" : T.border}`, background: bmBg, color: bmColor, cursor: bmBusy ? "wait" : "pointer", fontSize: 14 }}>
            🔖
          </button>
        </div>
      </div>

      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 22px", ...flashOverlayStyle }}>
        <MathContent text={q.question_text} block style={{ color: T.text, fontSize: 16, marginBottom: 16 }} />
        {q.has_diagram && q.images?.length > 0 && !q.question_text?.includes("[IMAGE:") && q.images.filter((im) => im.position !== "solution").map((im, i) => (<img key={i} src={im.url} alt="question diagram" style={{ maxWidth: "100%", borderRadius: 8, margin: "10px 0" }} />))}

        {!isNumerical && opts.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {opts.map((opt, i) => { const st = OPT[optState(i)]; return (
              <button key={i} onClick={() => (isMSQ ? toggleMulti(i) : !checked && setSelected(i))} disabled={checked} style={{ display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${st.border}`, background: st.bg, color: st.color, cursor: checked ? "default" : "pointer", fontSize: 15 }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: isMSQ ? 5 : "50%", border: `2px solid ${st.letter}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: st.letter, background: isSelectedOpt(i) ? st.letter + "22" : "transparent" }}>{isSelectedOpt(i) ? "✓" : String.fromCharCode(65 + i)}</span>
                <MathContent text={opt} />
              </button>
            ); })}
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

        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          {showCheckBtn && (
            <button onClick={checkAnswer} disabled={!hasAnswer} style={{ flex: 1, minWidth: 140, padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 700, border: "none", cursor: hasAnswer ? "pointer" : "not-allowed", background: hasAnswer ? T.accent : T.surfaceHigh, color: hasAnswer ? "#fff" : T.textDim }}>
              Check Answer
            </button>
          )}
          {showShowAnswerBtn && (
            <button onClick={showAnswerNow} style={{ flex: 1, minWidth: 140, padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 700, border: `1px solid ${T.purple}`, cursor: "pointer", background: "transparent", color: T.purple }}>
              Show Answer
            </button>
          )}
          {showSolveAgainBtn && (
            <button onClick={solveAgain} style={{ flex: 1, minWidth: 140, padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 700, border: `1px solid ${T.border}`, cursor: "pointer", background: "transparent", color: T.textMuted }}>
              ↺ Solve Again
            </button>
          )}
        </div>

        {revealed && answer?.solution_text && (
          <div style={{ marginTop: 18, padding: "16px 18px", background: T.surface, borderRadius: 10, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.textMuted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Solution</div>
            <MathContent text={answer.solution_text} block style={{ color: T.text, fontSize: 14 }} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button onClick={() => goTo(prevSlug)} disabled={!prevSlug} style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", color: prevSlug ? T.text : T.textDim, fontWeight: 700, fontSize: 14, cursor: prevSlug ? "pointer" : "not-allowed" }}>← Previous</button>
        <button onClick={() => goTo(nextSlug)} disabled={!nextSlug} style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${T.accent}`, background: nextSlug ? T.accentBg : "transparent", color: nextSlug ? T.accentLight : T.textDim, fontWeight: 700, fontSize: 14, cursor: nextSlug ? "pointer" : "not-allowed" }}>Next →</button>
      </div>

      {chapterHref && <div style={{ textAlign: "center", marginTop: 20 }}><a href={chapterHref} style={{ fontSize: 13, color: T.textMuted }}>← Back to {chapterName} chapter list</a></div>}
    </div>
  );
                                                                                                                                                                                                                                                                               }
