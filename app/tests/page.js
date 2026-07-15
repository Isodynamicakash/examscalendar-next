"use client";
/**
 * Test history page.  /tests?exam=&subject=&chapter=
 *
 * Lists the user's past tests (optionally scoped to a chapter via query
 * params). Tapping a completed test opens its report; an in-progress test
 * resumes. Built from the tests table.
 */
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { DARK, LIGHT } from "@/lib/questionTheme";
import BackButton from "@/components/BackButton";

function TestsInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const exam = sp.get("exam");
  const subject = sp.get("subject");
  const chapter = sp.get("chapter");

  const [isDark, setIsDark] = useState(true);
  useEffect(() => { const s = localStorage.getItem("ec_theme"); if (s !== null) setIsDark(s === "dark"); }, []);
  const C = isDark ? DARK : LIGHT;

  const [status, setStatus] = useState("loading");
  const [tests, setTests] = useState([]);
  const [filter, setFilter] = useState("all"); // all | completed | in_progress

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess?.session?.user) { router.push(`/login?next=/tests${window.location.search}`); return; }

      let q = supabase.from("tests").select("*").order("created_at", { ascending: false });
      if (exam) q = q.eq("exam_slug", exam);
      if (subject) q = q.eq("subject_slug", subject);
      if (chapter) q = q.eq("chapter_slug", chapter);
      const { data } = await q;
      setTests(data || []);
      setStatus("ready");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, subject, chapter]);

  const open = (t) => {
    if (t.status === "completed") router.push(`/test/report?id=${t.id}`);
    else router.push(`/test?id=${t.id}`);
  };

  const shown = tests.filter((t) => filter === "all" ? true : filter === "completed" ? t.status === "completed" : t.status !== "completed");

  const fmtDate = (s) => {
    try { return new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return ""; }
  };

  if (status === "loading") return <div style={{ minHeight: "100vh", background: C.bg, color: C.textMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>Loading tests…</div>;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 16px 60px" }}>
        <div style={{ marginBottom: 16 }}>
          <BackButton C={C} fallbackHref={exam && subject && chapter ? `/pyq/${exam}/${subject}/${chapter}?view=overview` : "/"} />
        </div>

        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>Test History</h1>
          <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>{shown.length} {shown.length === 1 ? "Test" : "Tests"}{chapter ? ` · ${chapter.replace(/-/g, " ")}` : ""}</p>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "18px 0 22px" }}>
          {["all", "completed", "in_progress"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: `1px solid ${filter === f ? C.accent : C.border}`, background: filter === f ? C.accentBg : C.surface, color: filter === f ? C.accentLight : C.textMuted, cursor: "pointer" }}>
              {f === "all" ? "All" : f === "completed" ? "Completed" : "Ongoing"}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 20px", color: C.textMuted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>No tests yet</p>
            <p style={{ fontSize: 13, margin: 0 }}>Create a test from a chapter to get started.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {shown.map((t, i) => {
              const done = t.status === "completed";
              const acc = done && (t.correct_count + t.incorrect_count) > 0
                ? Math.round((t.correct_count / (t.correct_count + t.incorrect_count)) * 100) : null;
              return (
                <button key={t.id} onClick={() => open(t)} style={{ textAlign: "left", padding: "16px 18px", borderRadius: 14, border: `1px solid ${C.border}`, background: C.bgCard, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 4 }}>
                      CT {String(tests.length - tests.indexOf(t)).padStart(2, "0")}
                      {t.source && t.source !== "all" && <span style={{ fontSize: 11, fontWeight: 700, color: C.accentLight, marginLeft: 8 }}>· {t.source}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>
                      {t.total_questions} Qs · {Math.round(t.duration_secs / 60)} min · {fmtDate(t.created_at)}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    {done ? (
                      <>
                        <div style={{ fontSize: 18, fontWeight: 900, color: t.score >= 0 ? C.greenText : C.redText }}>{t.score > 0 ? "+" : ""}{t.score}<span style={{ fontSize: 12, color: C.textMuted }}>/{t.max_score}</span></div>
                        {acc != null && <div style={{ fontSize: 11, color: C.textMuted }}>{acc}% acc</div>}
                      </>
                    ) : (
                      <span style={{ fontSize: 11, fontWeight: 800, color: C.amberText, background: C.amberBg, padding: "4px 10px", borderRadius: 8 }}>Resume →</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TestsPage() {
  return <Suspense fallback={null}><TestsInner /></Suspense>;
                  }
