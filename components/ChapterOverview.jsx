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
import TestCreateModal from "./TestCreateModal";
import { supabase } from "@/lib/supabase";

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
  onViewBookmarked, onViewMistakes, onViewTests,
}) {
  const [counts, setCounts] = useState(null);
  const [testOpen, setTestOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userCounts, setUserCounts] = useState({ bookmarked: 0, mistakes: 0, tests: 0, loaded: false });
  const [popup, setPopup] = useState(null);

  const goLogin = () => {
    if (typeof window !== "undefined") window.location.assign(`/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`);
  };

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

  // User-specific counts: bookmarked & mistakes (chapter questions ∩ user
  // history) and number of tests taken for this chapter.
  useEffect(() => {
    if (!subject || !chapter) return;
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const u = sess?.session?.user || null;
      if (cancelled) return;
      setUser(u);
      if (!u) { setUserCounts({ bookmarked: 0, mistakes: 0, tests: 0, loaded: true }); return; }

      const examId = EXAM_SLUG_TO_ID[normalizeExamSlug(examSlug)];

      // Gather this chapter's question ids from the API (paginate, limit=100).
      let ids = [];
      let offset = 0;
      for (let i = 0; i < 5; i++) {
        const res = await fetch(`${apiBase}/api/questions?exam_id=${examId}&subject=${subject.slug}&chapter=${chapter.slug}&limit=100&offset=${offset}`).then((r) => r.json()).catch(() => null);
        if (!res?.questions?.length) break;
        ids = ids.concat(res.questions.map((q) => q.id));
        if (ids.length >= (res.total || 0)) break;
        offset += 100;
      }
      const idSet = new Set(ids);

      // Bookmarks ∩ chapter.
      const { data: bms } = await supabase.from("bookmarks").select("question_id");
      const bookmarked = (bms || []).filter((b) => idSet.has(b.question_id)).length;

      // Mistakes = latest attempt wrong, ∩ chapter.
      const { data: atts } = await supabase.from("user_attempts")
        .select("question_id, is_correct, attempted_at").order("attempted_at", { ascending: true });
      const latest = new Map();
      (atts || []).forEach((a) => { if (idSet.has(a.question_id)) latest.set(a.question_id, a.is_correct); });
      let mistakes = 0;
      latest.forEach((ok) => { if (!ok) mistakes += 1; });

      // Tests taken for this chapter.
      const { count: testCount } = await supabase.from("tests")
        .select("id", { count: "exact", head: true })
        .eq("chapter_slug", chapter.slug).eq("exam_slug", normalizeExamSlug(examSlug));

      if (!cancelled) setUserCounts({ bookmarked, mistakes, tests: testCount || 0, loaded: true });
    })();
    return () => { cancelled = true; };
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
        border: `1px solid ${C.border}`, background: C.bgCard, cursor: "pointer", transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent || C.accent)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
    >
      <div style={{ fontSize: 17, fontWeight: 800, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
        {title} <span style={{ color: accent || C.accent }}>→</span>
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{subtitle}</div>
    </button>
  );

  // Map a base accent to its readable Bg/Text pair from the theme, so the
  // colored icon chip and count badge have proper contrast in both modes.
  const toneFor = (accent) => {
    if (accent === C.green) return { bg: C.greenBg, text: C.greenText };
    if (accent === C.amber) return { bg: C.amberBg, text: C.amberText };
    if (accent === C.red) return { bg: C.redBg, text: C.redText };
    if (accent === C.blue) return { bg: C.blueBg, text: C.blueText };
    if (accent === C.purple) return { bg: C.purpleBg, text: C.purpleText };
    if (accent === C.orange) return { bg: C.orangeBg, text: C.orangeText };
    return { bg: C.accentBg, text: C.accentLight };
  };

  const Bucket = ({ icon, title, subtitle, onClick, accent }) => {
    const tone = toneFor(accent);
    return (
      <button
        onClick={onClick}
        style={{ textAlign: "left", padding: "16px 18px", borderRadius: 14, border: `1px solid ${C.border}`, background: C.bgCard, cursor: "pointer", transition: "border-color 0.15s" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: tone.bg }}>{icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{title}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{subtitle}</div>
          </div>
        </div>
      </button>
    );
  };

  const MyCard = ({ icon, title, count, onClick, accent }) => {
    const tone = toneFor(accent);
    return (
      <button
        onClick={onClick}
        style={{ textAlign: "left", padding: "16px 18px", borderRadius: 14, border: `1px solid ${C.border}`, background: C.bgCard, cursor: "pointer", transition: "border-color 0.15s" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: tone.bg }}>{icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{title}</div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, color: tone.text, background: tone.bg, padding: "4px 12px", borderRadius: 12, flexShrink: 0 }}>
            {count === null ? "…" : count}
          </span>
        </div>
      </button>
    );
  };

  const loadingLabel = counts === null ? "…" : null;

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px 60px" }}>
      <div style={{ marginBottom: 16 }}>
        <BackButton C={C} fallbackHref={`/pyq/${examSlug}`} />
      </div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>{chapter.name}</h1>
        <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
          {examLabel} &middot; {counts ? counts.total.toLocaleString() : loadingLabel} PYQs | {chapter.topics?.length || 0} Topics
        </p>
        <button onClick={() => setTestOpen(true)} style={{ marginTop: 14, padding: "11px 26px", borderRadius: 24, background: C.accent, color: "#fff", border: "none", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
          📝 Create Chapter Test
        </button>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        <Card title="All Previous Year Qs" subtitle={`${counts ? counts.total.toLocaleString() : loadingLabel} PYQs`} onClick={onViewAll} accent={C.blue} />
        {chapter.topics?.length > 0 && (
          <div style={{ flex: 1, minWidth: 220, textAlign: "left", padding: "20px 22px", borderRadius: 14, border: `1px solid ${C.border}`, background: C.bgCard }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 4 }}>Topic-Wise PYQs</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 12 }}>{chapter.topics.length} Topics</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 160, overflowY: "auto" }}>
              {chapter.topics.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => onSelectTopic(t.slug)}
                  style={{ textAlign: "left", padding: "8px 10px", borderRadius: 8, background: "transparent", border: "none", color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
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

      {/* My Stuff -- bookmarked / mistakes / tests, all scoped to this chapter */}
      <div style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: "24px 0 12px" }}>My Stuff</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        <MyCard
          icon="🔖" title="Bookmarked Questions"
          count={userCounts.loaded ? userCounts.bookmarked : null}
          accent={C.purple} C={C}
          onClick={() => {
            if (!user) return goLogin();
            if (userCounts.bookmarked === 0) return setPopup("You have no bookmarked questions in this chapter.");
            onViewBookmarked?.();
          }}
        />
        <MyCard
          icon="⚠️" title="My Mistakes"
          count={userCounts.loaded ? userCounts.mistakes : null}
          accent={C.red} C={C}
          onClick={() => {
            if (!user) return goLogin();
            if (userCounts.mistakes === 0) return setPopup("You have no mistakes in this chapter yet.");
            onViewMistakes?.();
          }}
        />
        <MyCard
          icon="📝" title="Your Tests"
          count={userCounts.loaded ? userCounts.tests : null}
          accent={C.blue} C={C}
          onClick={() => {
            if (!user) return goLogin();
            if (userCounts.tests === 0) return setPopup("You haven't taken any tests in this chapter yet.");
            onViewTests?.();
          }}
        />
      </div>

      <TestCreateModal
        open={testOpen}
        onClose={() => setTestOpen(false)}
        C={C}
        examSlug={normalizeExamSlug(examSlug)}
        subjectSlug={subject.slug}
        chapterSlug={chapter.slug}
        topicSlug={null}
        scopeLabel={`${chapter.name} · ${examLabel}`}
      />

      {popup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9100, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setPopup(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 22px", maxWidth: 340, textAlign: "center" }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>📭</div>
            <p style={{ fontSize: 14, color: C.text, margin: "0 0 18px", lineHeight: 1.5 }}>{popup}</p>
            <button onClick={() => setPopup(null)} style={{ padding: "10px 26px", borderRadius: 10, background: C.accent, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
        }
