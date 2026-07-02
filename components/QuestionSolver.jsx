"use client";
/**
 * QuestionSolver.jsx -- Marks-style single-question test interface.
 *
 * Show Answer / Show Solution are separate, independent actions (not a
 * single "Check Answer" flow) -- user can peek at either, or both, or
 * reset with Solve Again.
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import MathContent from "./MathContent";
import BackButton from "./BackButton";
import { DARK } from "@/lib/questionTheme";

// ---- Sounds via Web Audio API -- richer "credit"-style chime on correct,
// clear denial buzz on incorrect. No external audio files needed. ----
function getCtx() {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext || window.webkitAudioContext)();
  } catch {
    return null;
  }
}
function playTone(ctx, freq, startTime, duration, type = "sine", gainPeak = 0.14) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}
function playCorrectSound() {
  const ctx = getCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  // Bright ascending three-note chime -- "credit/success" feel
  playTone(ctx, 784, t, 0.13, "triangle");
  playTone(ctx, 988, t + 0.09, 0.13, "triangle");
  playTone(ctx, 1319, t + 0.18, 0.22, "triangle", 0.17);
}
function playIncorrectSound() {
  const ctx = getCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  // Low double-buzz "denial" tone
  playTone(ctx, 180, t, 0.16, "sawtooth", 0.13);
  playTone(ctx, 140, t + 0.15, 0.22, "sawtooth", 0.13);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function QuestionSolver({
  q, answer, examLabel, chapterName, chapterHref, basePath,
  filterQuery = "",
  slugList = [],
}) {
  const router = useRouter();
  const T = DARK;

  const [selected, setSelected] = useState(null);
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [numericInput, setNumericInput] = useState("");
  const [answerShown, setAnswerShown] = useState(false);
  const [solutionShown, setSolutionShown] = useState(false);
  const [flash, setFlash] = useState(null); // 'correct' | 'incorrect' | null
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const flashTimeoutRef = useRef(null);

  const currentIndex = slugList.indexOf(q.slug);
  const qsSuffix = filterQuery ? `?${filterQuery}` : "";
  const prevSlug = currentIndex > 0 ? slugList[currentIndex - 1] : null;
  const nextSlug = currentIndex >= 0 && currentIndex < slugList.length - 1 ? slugList[currentIndex + 1] : null;

  const resetState = useCallback(() => {
    setSelected(null);
    setSelectedMulti([]);
    setNumericInput("");
    setAnswerShown(false);
    setSolutionShown(false);
    setFlash(null);
    setSeconds(0);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }, []);

  useEffect(() => {
    resetState();
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(flashTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.slug]);

  const opts = [q.option_1, q.option_2, q.option_3, q.option_4].filter(Boolean);
  const correctOptions = (answer?.correct_option || "")
    .split(",").map((s) => s.trim()).filter(Boolean).map((n) => parseInt(n, 10) - 1);

  const isMSQ = q.question_type === "MSQ";
  const isNumerical = q.question_type === "NUMERICAL";

  const hasAnswer = isNumerical ? numericInput.trim() !== "" : isMSQ ? selectedMulti.length > 0 : selected !== null;

  const isCorrect = () => {
    if (isNumerical) {
      const given = parseFloat(numericInput);
      const expected = parseFloat(answer?.correct_option);
      return !isNaN(given) && !isNaN(expected) && Math.abs(given - expected) < 0.01;
    }
    if (isMSQ) {
      const a = [...selectedMulti].sort();
      const b = [...correctOptions].sort();
      return a.length === b.length && a.every((v, i) => v === b[i]);
    }
    return correctOptions.includes(selected);
  };

  const showAnswer = () => {
    if (!hasAnswer || answerShown) return;
    clearInterval(timerRef.current);
    const correct = isCorrect();
    setAnswerShown(true);
    setFlash(correct ? "correct" : "incorrect");
    if (correct) playCorrectSound();
    else playIncorrectSound();
    clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => setFlash(null), 700);
  };

  const showSolution = () => {
    clearInterval(timerRef.current);
    setSolutionShown(true);
  };

  const toggleMulti = (i) => {
    if (answerShown) return;
    setSelectedMulti((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const goTo = useCallback(
    (slug) => { if (slug) router.push(`${basePath}/${slug}${qsSuffix}`); },
    [basePath, qsSuffix, router]
  );

  const isCorrectOpt = (i) => correctOptions.includes(i);
  const isSelectedOpt = (i) => (isMSQ ? selectedMulti.includes(i) : selected === i);

  const optState = (i) => {
    if (!answerShown) return isSelectedOpt(i) ? "sel" : "def";
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

  const examDate = q.exam_date
    ? new Date(q.exam_date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : null;

  const flashOverlayStyle = flash
    ? { boxShadow: `0 0 0 3px ${flash === "correct" ? T.green : T.red}`, transition: "box-shadow .15s" }
    : { transition: "box-shadow .3s" };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div style={{ marginBottom: 12 }}>
        <BackButton C={T} fallbackHref={chapterHref || basePath} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: T.textMuted }}>
            Q{currentIndex >= 0 ? currentIndex + 1 : ""} {isMSQ && <span style={{ color: T.purple }}>&middot; MSQ</span>} {isNumerical && <span style={{ color: T.orange }}>&middot; Numerical</span>}
          </div>
          <div style={{ fontSize: 12, color: T.textDim }}>
            {examLabel} {q.year || ""} {examDate ? `(${examDate}${q.shift ? " " + q.shift : ""})` : q.shift || ""}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: T.accentLight, background: T.accentBg, border: `1px solid ${T.accent}44`, borderRadius: 20, padding: "4px 12px" }}>
            ⏱ {formatTime(seconds)}
          </span>
          <button disabled title="Bookmarking needs an account -- coming soon" style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: T.surface, color: T.textDim, cursor: "not-allowed", fontSize: 14 }}>🔖</button>
        </div>
      </div>

      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 22px", ...flashOverlayStyle }}>
        <MathContent text={q.question_text} block style={{ color: T.text, fontSize: 16, marginBottom: 16 }} />

        {q.has_diagram && q.images?.length > 0 &&
          q.images.filter((im) => im.position !== "solution").map((im, i) => (
            <img key={i} src={im.url} alt="question diagram" style={{ maxWidth: "100%", borderRadius: 8, margin: "10px 0" }} />
          ))}

        {!isNumerical && opts.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {opts.map((opt, i) => {
              const st = OPT[optState(i)];
              return (
                <button
                  key={i}
                  onClick={() => (isMSQ ? toggleMulti(i) : !answerShown && setSelected(i))}
                  disabled={answerShown}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${st.border}`, background: st.bg, color: st.color, cursor: answerShown ? "default" : "pointer", fontSize: 15 }}
                >
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: isMSQ ? 5 : "50%", border: `2px solid ${st.letter}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: st.letter, background: isSelectedOpt(i) ? st.letter + "22" : "transparent" }}>
                    {isSelectedOpt(i) ? "✓" : String.fromCharCode(65 + i)}
                  </span>
                  <MathContent text={opt} />
                </button>
              );
            })}
          </div>
        )}

        {isNumerical && (
          <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, display: "block", marginBottom: 6 }}>Enter your numeric answer</label>
            <input
              type="number" step="any" value={numericInput}
              onChange={(e) => !answerShown && setNumericInput(e.target.value)}
              disabled={answerShown}
              placeholder="e.g. 12.5"
              style={{ width: "100%", padding: "12px 14px", borderRadius: 10, fontSize: 16, border: `1.5px solid ${answerShown ? (isCorrect() ? T.green : T.red) : T.border}`, background: T.surface, color: T.text, outline: "none" }}
            />
            {answerShown && (
              <div style={{ marginTop: 8, fontSize: 13, color: T.textMuted }}>
                Correct answer: <strong style={{ color: T.greenText }}>{answer?.correct_option}</strong>
              </div>
            )}
          </div>
        )}

        {/* Show Answer / Show Solution -- independent buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          {!answerShown && (
            <button
              onClick={showAnswer}
              disabled={!hasAnswer}
              style={{ flex: 1, minWidth: 140, padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 700, border: "none", cursor: hasAnswer ? "pointer" : "not-allowed", background: hasAnswer ? T.accent : T.surfaceHigh, color: hasAnswer ? "#fff" : T.textDim }}
            >
              Show Answer
            </button>
          )}
          {!solutionShown && (
            <button
              onClick={showSolution}
              style={{ flex: 1, minWidth: 140, padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 700, border: `1px solid ${T.purple}`, cursor: "pointer", background: "transparent", color: T.purple }}
            >
              Show Solution
            </button>
          )}
          {(answerShown || solutionShown) && (
            <button
              onClick={resetState}
              style={{ flex: 1, minWidth: 140, padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 700, border: `1px solid ${T.border}`, cursor: "pointer", background: "transparent", color: T.textMuted }}
            >
              ↺ Solve Again
            </button>
          )}
        </div>

        {solutionShown && answer?.solution_text && (
          <div style={{ marginTop: 18, padding: "16px 18px", background: T.surface, borderRadius: 10, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.textMuted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Solution</div>
            <MathContent text={answer.solution_text} block style={{ color: T.text, fontSize: 14 }} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button onClick={() => goTo(prevSlug)} disabled={!prevSlug} style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", color: prevSlug ? T.text : T.textDim, fontWeight: 700, fontSize: 14, cursor: prevSlug ? "pointer" : "not-allowed" }}>
          ← Previous
        </button>
        <button onClick={() => goTo(nextSlug)} disabled={!nextSlug} style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${T.accent}`, background: nextSlug ? T.accentBg : "transparent", color: nextSlug ? T.accentLight : T.textDim, fontWeight: 700, fontSize: 14, cursor: nextSlug ? "pointer" : "not-allowed" }}>
          Next →
        </button>
      </div>

      {chapterHref && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <a href={chapterHref} style={{ fontSize: 13, color: T.textMuted }}>← Back to {chapterName} chapter list</a>
        </div>
      )}
    </div>
  );
}
