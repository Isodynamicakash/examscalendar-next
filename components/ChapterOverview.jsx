"use client";
/**
 * ChapterOverview.jsx
 *
 * Shown right after picking a chapter -- matches the Marks "chapter
 * landing" screen: All Previous Year Qs / Topic-wise PYQs / Difficulty
 * buckets. Deliberately excludes anything needing an account (Your
 * Progress, Bookmarked Qs, My Mistakes, Test History).
 */
import { useState, useEffect } from "react";
import BackButton from "./BackButton";

const EXAM_SLUG_TO_ID = { "jee-main": 1, "jee-advanced": 2, neet: 3, "ssc-cgl": 6 };
const SLUG_ALIAS = { "jee-mains": "jee-main", "jee-adv": "jee-advanced" };
function normalizeExamSlug(s) {
  const slug = (s || "").trim().toLowerCase();
  return SLUG_ALIAS[slug] || slug;
}

export default function ChapterOverview({
  examSlug, examLabel, subject, chapter,
  apiBase, C,
  onViewAll, onSelectTopic, onSelectDifficulty, onSelectType,
}) {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    if (!subject || !chapter) return;
    const examId = EXAM_SLUG_TO_ID[normalizeExamSlug(examSlug)];
    const base = `${apiBase}/api/questions?exam_id=${examId}&subject=${subject.slug}&chapter=${chapter.slug}&limit=1`;

    const fetchTotal = (extra = "") =>
      fetch(`${base}${extra}`).then((r) => r.json()).then((d) => d.total || 0).catch(() => 0);

    Promise.all([
      fetchTotal(),
      fetchTotal("&difficulty=easy"),
      fetchTotal("&difficulty=medium"),
      fetchTotal("&difficulty=hard"),
      fetchTotal("&question_type=NUMERICAL"),
    ]).then(([total, easy, medium, hard, numerical]) => {
      setCounts({ total, easy, medium, hard, numerical });
    });
  }, [examSlug, subject, chapter, apiBase]);

  // Defensive fallback -- if subject/chapter somehow don't resolve
  // (e.g. a stale link), show a simple message instead of crashing the
  // whole page.
  if (!subject || !chapter) {
    return (
      <div style={{ maxWidth: 480, margin: "60px auto", textAlign: "center", color: C.textMuted, fontSize: 14 }}>
        Couldn't load this chapter. Try picking it again from the subject list.
      </div>
    );
  }

  const Card = ({ title, subtitle, onClick, accent }) => (
    <button
      onClick={onClick}
      style={{
        flex: 1, minWidth: 220, textAlign: "left", padding: "20px 22px", borderRadius: 14,
        border: `1px solid ${accent || C.accent}55`, background: C.bgCard, cursor: "pointer",
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 800, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
        {title} <span style={{ color: accent || C.accent }}>→</span>
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{subtitle}</div>
    </button>
  );

  const Bucket = ({ icon, title, subtitle, onClick, accent }) => (
    <button
      onClick={onClick}
      style={{ textAlign: "left", padding: "18px 20px", borderRadius: 14, border: `1px solid ${accent}44`, background: accent + "10", cursor: "pointer" }}
    >
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{title}</div>
      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{subtitle}</div>
    </button>
  );

  const loadingLabel = counts === null ? "…" : null;

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px 60px" }}>
      <div style={{ marginBottom: 16 }}>
        <BackButton C={C} fallbackHref="/" />
      </div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>{chapter.name}</h1>
        <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
          {examLabel} &middot; {counts ? counts.total.toLocaleString() : loadingLabel} PYQs | {chapter.topics?.length || 0} Topics
        </p>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        <Card title="All Previous Year Qs" subtitle={`${counts ? counts.total.toLocaleString() : loadingLabel} PYQs`} onClick={onViewAll} accent={C.blue} />
        {chapter.topics?.length > 0 && (
          <div style={{ flex: 1, minWidth: 220, textAlign: "left", padding: "20px 22px", borderRadius: 14, border: `1px solid ${C.purple}55`, background: C.bgCard }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 4 }}>Topic-Wise PYQs</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 12 }}>{chapter.topics.length} Topics</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 160, overflowY: "auto" }}>
              {chapter.topics.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => onSelectTopic(t.slug)}
                  style={{ textAlign: "left", padding: "7px 10px", borderRadius: 8, background: "transparent", border: "none", color: C.textMuted, fontSize: 13, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.surface)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 12 }}>Difficulty Wise Qs Buckets</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 20 }}>
        <Bucket icon="☀️" title="Easy" subtitle={`${counts ? counts.easy.toLocaleString() : loadingLabel} Qs`} onClick={() => onSelectDifficulty("easy")} accent={C.green} />
        <Bucket icon="🎯" title="Medium" subtitle={`${counts ? counts.medium.toLocaleString() : loadingLabel} Qs`} onClick={() => onSelectDifficulty("medium")} accent={C.amber} />
        <Bucket icon="🧗" title="Hard" subtitle={`${counts ? counts.hard.toLocaleString() : loadingLabel} Qs`} onClick={() => onSelectDifficulty("hard")} accent={C.red} />
      </div>

      {counts && counts.numerical > 0 && (
        <>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 12 }}>Other</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            <Bucket icon="🔢" title="Numerical" subtitle={`${counts.numerical.toLocaleString()} Qs`} onClick={() => onSelectType("NUMERICAL")} accent={C.orange} />
          </div>
        </>
      )}
    </div>
  );
}
