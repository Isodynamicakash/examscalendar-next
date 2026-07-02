"use client";
/**
 * QuestionSolver.jsx
 *
 * The Marks-style single-question test interface. Different interaction
 * model from the list-view QuestionCard: pick an answer -> press "Check
 * Answer" -> reveal + sound + solution -> Previous/Next to move through
 * the chapter.
 *
 * Handles all three question types:
 *   MCQ        -- single-select radio-style options
 *   MSQ        -- multi-select (several options can be correct)
 *   NUMERICAL  -- free numeric input, compared against the correct value
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import MathContent from "./MathContent";
import { DARK } from "@/lib/questionTheme";

// ---- Simple beep sounds via Web Audio API -- no external audio files ----
function playTone(freq, duration, type = "sine") {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio not available (e.g. autoplay policy) -- fail silently
  }
}
function playCorrectSound() {
  playTone(880, 0.12);
  setTimeout(() => playTone(1175, 0.18), 100);
}
function playIncorrectSound() {
  playTone(220, 0.25, "sawtooth");
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function QuestionSolver({
  q,
  answer,
  examLabel,
  chapterName,
  chapterHref,
  basePath,       // e.g. /pyq/jee-main/physics/alternating-current
  slugList = [],  // ordered slugs in this chapter, for Previous/Next
}) {
  const router = useRouter();
  const T = DARK;

  const [selected, setSelected] = useState(null);       // MCQ: number
  const [selectedMulti, setSelectedMulti] = useState([]); // MSQ: array of numbers
  const [numericInput, setNumericInput] = useState("");   // NUMERICAL: string
  const [checked, setChecked] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const currentIndex = slugList.indexOf(q.slug);
  const prevSlug = currentIndex > 0 ? slugList[currentIndex - 1] : null;
  const nextSlug = currentIndex >= 0 && currentIndex < slugList.length - 1 ? slugList[currentIndex + 1] : null;

  // Reset state + restart timer whenever the question changes (navigating
  // via Previous/Next re-mounts this with a new `q`, since it's a new
  // server-rendered page -- but guard on q.slug in case of client nav).
  useEffect(() => {
    setSelected(null);
    setSelectedMulti([]);
    setNumericInput("");
    setChecked(false);
    setSeconds(0);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.slug]);

  const opts = [q.option_1, q.option_2, q.option_3, q.option_4].filter(Boolean);
  const correctOptions = (answer?.correct_option || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((n) => parseInt(n, 10) - 1); // stored as 1-indexed

  const isMSQ = q.question_type === "MSQ";
  const isNumerical = q.question_type === "NUMERICAL";

  const hasAnswer = isNumerical
    ? numericInput.trim() !== ""
    : isMSQ
    ? selectedMulti.length > 0
    : selected !== null;

  const checkAnswer = () => {
    if (!hasAnswer || checked) return;
    clearInterval(timerRef.current);

    let correct;
    if (isNumerical) {
      const given = parseFloat(numericInput);
      const expected = parseFloat(answer?.correct_option);
      // small tolerance for float rounding in stored numeric answers
      correct = !isNaN(given) && !isNaN(expected) && Math.abs(given - expected) < 0.01;
    } else if (isMSQ) {
      const a = [...selectedMulti].sort();
      const b = [...correctOptions].sort();
      correct = a.length === b.length && a.every((v, i) => v === b[i]);
    } else {
      correct = correctOptions.includes(selected);
    }

    setChecked(true);
    if (correct) playCorrectSound();
    else playIncorrectSound();
  };

  const toggleMulti = (i) => {
    if (checked) return;
    setSelectedMulti((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const goTo = useCallback(
    (slug) => {
      if (!slug) return;
      router.push(`${basePath}/${slug}`);
    },
    [basePath, router]
  );

  const isCorrectOpt = (i) => correctOptions.includes(i);
  const isSelectedOpt = (i) => (isMSQ ? selectedMulti.includes(i) : selected === i);

  const optState = (i) => {
    if (!checked) return isSelectedOpt(i) ? "sel" : "def";
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

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Top bar: question number, exam/year, timer, bookmark placeholder */}
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
          {/* Bookmark: visual placeholder only -- becomes functional once accounts exist */}
          <button
            disabled
            title="Bookmarking needs an account -- coming soon"
            style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: T.surface, color: T.textDim, cursor: "not-allowed", fontSize: 14 }}
          >
            🔖
          </button>
        </div>
      </div>

      {/* Question */}
      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 22px" }}>
        <MathContent text={q.question_text} block style={{ color: T.text, fontSize: 16, marginBottom: 16 }} />

        {q.has_diagram && q.images?.length > 0 &&
          q.images.filter((im) => im.position !== "solution").map((im, i) => (
            <img key={i} src={im.url} alt="question diagram" style={{ maxWidth: "100%", borderRadius: 8, margin: "10px 0" }} />
          ))}

        {/* MCQ / MSQ options */}
        {!isNumerical && opts.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {opts.map((opt, i) => {
              const st = OPT[optState(i)];
              return (
                <button
                  key={i}
                  onClick={() => (isMSQ ? toggleMulti(i) : !checked && setSelected(i))}
                  disabled={checked}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${st.border}`, background: st.bg, color: st.color, cursor: checked ? "default" : "pointer", fontSize: 15 }}
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

        {/* NUMERICAL input */}
        {isNumerical && (
          <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, display: "block", marginBottom: 6 }}>Enter your numeric answer</label>
            <input
              type="number"
              step="any"
              value={numericInput}
              onChange={(e) => !checked && setNumericInput(e.target.value)}
              disabled={checked}
              placeholder="e.g. 12.5"
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 10, fontSize: 16,
                border: `1.5px solid ${checked ? (Math.abs(parseFloat(numericInput) - parseFloat(answer?.correct_option)) < 0.01 ? T.green : T.red) : T.border}`,
                background: T.surface, color: T.text, outline: "none",
              }}
            />
            {checked && (
              <div style={{ marginTop: 8, fontSize: 13, color: T.textMuted }}>
                Correct answer: <strong style={{ color: T.greenText }}>{answer?.correct_option}</strong>
              </div>
            )}
          </div>
        )}

        {/* Check Answer button */}
        {!checked && (
          <button
            onClick={checkAnswer}
            disabled={!hasAnswer}
            style={{
              marginTop: 18, width: "100%", padding: "13px", borderRadius: 10, fontSize: 15, fontWeight: 700,
              border: "none", cursor: hasAnswer ? "pointer" : "not-allowed",
              background: hasAnswer ? T.accent : T.surfaceHigh, color: hasAnswer ? "#fff" : T.textDim,
            }}
          >
            Check Answer
          </button>
        )}

        {/* Solution */}
        {checked && answer?.solution_text && (
          <div style={{ marginTop: 18, padding: "16px 18px", background: T.surface, borderRadius: 10, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.textMuted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Solution</div>
            <MathContent text={answer.solution_text} block style={{ color: T.text, fontSize: 14 }} />
          </div>
        )}
      </div>

      {/* Previous / Next */}
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button
          onClick={() => goTo(prevSlug)}
          disabled={!prevSlug}
          style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", color: prevSlug ? T.text : T.textDim, fontWeight: 700, fontSize: 14, cursor: prevSlug ? "pointer" : "not-allowed" }}
        >
          ← Previous
        </button>
        <button
          onClick={() => goTo(nextSlug)}
          disabled={!nextSlug}
          style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${T.accent}`, background: nextSlug ? T.accentBg : "transparent", color: nextSlug ? T.accentLight : T.textDim, fontWeight: 700, fontSize: 14, cursor: nextSlug ? "pointer" : "not-allowed" }}
        >
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
