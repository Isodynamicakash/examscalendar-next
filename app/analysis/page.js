"use client";
/**
 * Analysis page -- per-exam practice analytics, Marks-style.
 *
 * Data sources (all real, no fabricated numbers):
 *  - user_attempts (Supabase, RLS-scoped) -> the user's attempts
 *  - v_questions_full (Supabase) -> subject_slug + difficulty per
 *    attempted question (2-query stitch, joins don't work through views)
 *  - /api/questions?...&limit=1 -> total counts per subject / difficulty
 *    (the denominators like "48 / 5992")
 *
 * Exam is taken from localStorage "last_exam" (falls back to jee-main).
 * SSC is intentionally unsupported (skipped) per product decision.
 *
 * Everything is gated: logged-out users are redirected to /login.
 */
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";
import { getExam, getExamLabel } from "@/lib/taxonomy";
import { DARK, LIGHT } from "@/lib/questionTheme";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const EXAM_SLUG_TO_ID = { "jee-main": 1, "jee-advanced": 2, neet: 3, "ssc-cgl": 6 };
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const DIFFICULTIES = ["easy", "medium", "hard"];

function startOfWeek(d) {
  const x = new Date(d); const day = x.getDay(); const diff = (day + 6) % 7; // Monday start
  x.setDate(x.getDate() - diff); x.setHours(0, 0, 0, 0); return x;
}
function weekLabel(d) { return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }); }
function monthLabel(d) { return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }); }

function AnalysisInner() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  useEffect(() => { const s = localStorage.getItem("ec_theme"); if (s !== null) setIsDark(s === "dark"); }, []);
  const C = isDark ? DARK : LIGHT;

  const [examSlug, setExamSlug] = useState("jee-main");
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);

  // Aggregated results
  const [subjectStats, setSubjectStats] = useState([]);   // [{slug,name,attempted,correct,total,accuracy}]
  const [difficultyStats, setDifficultyStats] = useState([]); // [{key,label,attempted,correct,total,accuracy}]
  const [overall, setOverall] = useState({ attempted: 0, correct: 0, total: 0, accuracy: 0, avgTime: 0 });
  const [attemptsRaw, setAttemptsRaw] = useState([]); // for weekly/monthly

  // UI controls
  const [period, setPeriod] = useState("weekly"); // weekly | monthly
  const [diffFilter, setDiffFilter] = useState("all"); // all | easy | medium | hard

  useEffect(() => {
    const last = typeof window !== "undefined" ? localStorage.getItem("last_exam") : null;
    let slug = last || "jee-main";
    if (slug === "ssc-cgl") slug = "jee-main"; // SSC unsupported -> default
    setExamSlug(slug);
  }, []);

  useEffect(() => {
    if (!examSlug) return;
    (async () => {
      setStatus("loading");
      const { data: sess } = await supabase.auth.getSession();
      const u = sess?.session?.user || null;
      if (!u) { router.push("/login?next=/analysis"); return; }
      setUser(u);

      const examId = EXAM_SLUG_TO_ID[examSlug];
      const exam = getExam(examSlug);
      const subjects = (exam?.subjects || []).map((s) => ({ slug: s.slug, name: s.name }));

      // 1) Fetch this user's attempts.
      const { data: attempts, error: aErr } = await supabase
        .from("user_attempts")
        .select("question_id, is_correct, time_taken_secs, attempted_at");
      if (aErr) { console.error(aErr); setStatus("error"); return; }
      const rows = attempts || [];

      // 2) Get subject + difficulty for each attempted question via
      //    v_questions_full. Scope to this exam's questions.
      const qIds = Array.from(new Set(rows.map((r) => r.question_id)));
      let qMeta = new Map();
      if (qIds.length > 0) {
        const { data: qs, error: qErr } = await supabase
          .from("v_questions_full")
          .select("id, subject_slug, difficulty, exam_slug")
          .in("id", qIds);
        if (qErr) { console.error(qErr); }
        (qs || []).forEach((q) => qMeta.set(q.id, q));
      }

      // Keep only attempts belonging to THIS exam.
      const examRows = rows.filter((r) => qMeta.get(r.question_id)?.exam_slug === examSlug);

      // LATEST attempt per question decides correct/incorrect (so a later
      // correct retry overrides an earlier miss) -- matches the badge logic.
      const latestByQ = new Map();
      examRows
        .slice()
        .sort((a, b) => new Date(a.attempted_at) - new Date(b.attempted_at))
        .forEach((r) => latestByQ.set(r.question_id, r));
      const latest = Array.from(latestByQ.values());

      // 3) Fetch totals (denominators) per subject and per difficulty.
      const fetchTotal = (params) =>
        fetch(`${API_URL}/api/questions?exam_id=${examId}&${params}&limit=1`)
          .then((r) => r.json()).then((d) => d.total || 0).catch(() => 0);

      const subjTotals = await Promise.all(subjects.map((s) => fetchTotal(`subject=${s.slug}`)));
      const diffTotals = await Promise.all(DIFFICULTIES.map((d) => fetchTotal(`difficulty=${d}`)));
      const grandTotal = await fetchTotal("");

      // Aggregate per subject.
      const subjAgg = subjects.map((s, i) => {
        const mine = latest.filter((r) => qMeta.get(r.question_id)?.subject_slug === s.slug);
        const attempted = mine.length;
        const correct = mine.filter((r) => r.is_correct).length;
        return { ...s, attempted, correct, total: subjTotals[i], accuracy: attempted ? Math.round((correct / attempted) * 100) : 0 };
      });

      // Aggregate per difficulty.
      const diffAgg = DIFFICULTIES.map((d, i) => {
        const mine = latest.filter((r) => (qMeta.get(r.question_id)?.difficulty || "").toLowerCase() === d);
        const attempted = mine.length;
        const correct = mine.filter((r) => r.is_correct).length;
        return { key: d, label: d.charAt(0).toUpperCase() + d.slice(1), attempted, correct, total: diffTotals[i], accuracy: attempted ? Math.round((correct / attempted) * 100) : 0 };
      });

      const totAttempted = latest.length;
      const totCorrect = latest.filter((r) => r.is_correct).length;
      const avgTime = examRows.length ? Math.round(examRows.reduce((s, r) => s + (r.time_taken_secs || 0), 0) / examRows.length) : 0;

      setSubjectStats(subjAgg);
      setDifficultyStats(diffAgg);
      setOverall({ attempted: totAttempted, correct: totCorrect, total: grandTotal, accuracy: totAttempted ? Math.round((totCorrect / totAttempted) * 100) : 0, avgTime });
      setAttemptsRaw(examRows.map((r) => ({ ...r, meta: qMeta.get(r.question_id) })));
      setStatus("ok");
    })();
  }, [examSlug, router]);

  // Weekly / monthly attempted-count series (respects difficulty filter).
  const timeSeries = useMemo(() => {
    const filtered = diffFilter === "all"
      ? attemptsRaw
      : attemptsRaw.filter((r) => (r.meta?.difficulty || "").toLowerCase() === diffFilter);

    const buckets = new Map();
    filtered.forEach((r) => {
      const d = new Date(r.attempted_at);
      const key = period === "weekly" ? startOfWeek(d).toISOString() : new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
      if (!buckets.has(key)) buckets.set(key, { count: 0, timeSum: 0, correct: 0 });
      const b = buckets.get(key); b.count += 1; b.timeSum += r.time_taken_secs || 0; if (r.is_correct) b.correct += 1;
    });

    const arr = Array.from(buckets.entries())
      .map(([iso, b]) => ({ date: new Date(iso), count: b.count, avgTime: b.count ? Math.round(b.timeSum / b.count) : 0, accuracy: b.count ? Math.round((b.correct / b.count) * 100) : 0 }))
      .sort((a, b) => a.date - b.date)
      .slice(-8); // last 8 periods

    return arr.map((x) => ({
      label: period === "weekly" ? weekLabel(x.date) : monthLabel(x.date),
      count: x.count,
      avgTime: x.avgTime,
      accuracy: x.accuracy,
    }));
  }, [attemptsRaw, period, diffFilter]);

  // "This week / this month" summary stats for the chart headers -- the
  // value for the CURRENT period only (matches Marks' top-right stat).
  const currentPeriodStats = useMemo(() => {
    const now = new Date();
    const curKey = period === "weekly" ? startOfWeek(now).toISOString() : new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const filtered = diffFilter === "all"
      ? attemptsRaw
      : attemptsRaw.filter((r) => (r.meta?.difficulty || "").toLowerCase() === diffFilter);
    let count = 0, timeSum = 0, correct = 0;
    filtered.forEach((r) => {
      const d = new Date(r.attempted_at);
      const key = period === "weekly" ? startOfWeek(d).toISOString() : new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
      if (key === curKey) { count += 1; timeSum += r.time_taken_secs || 0; if (r.is_correct) correct += 1; }
    });
    const avg = count ? Math.round(timeSum / count) : 0;
    return {
      count,
      avgTimeLabel: `${Math.floor(avg / 60)}m ${avg % 60}s`,
      accuracy: count ? Math.round((correct / count) * 100) : 0,
    };
  }, [attemptsRaw, period, diffFilter]);

  if (status === "loading") {
    return <div style={{ color: C.textMuted, padding: 40, textAlign: "center" }}>Loading your analysis…</div>;
  }
  if (status === "error") {
    return <div style={{ color: C.redText, padding: 40, textAlign: "center" }}>Couldn't load analysis. Please try again.</div>;
  }

  const examLabel = getExamLabel(examSlug);
  const shownDifficulties = diffFilter === "all" ? difficultyStats : difficultyStats.filter((d) => d.key === diffFilter);

  const Card = ({ children, style }) => (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", ...style }}>{children}</div>
  );
  const SUBJECT_COLORS = [C.blue, C.green, C.purple, C.orange];

  return (
    <div>
      <button
        onClick={() => { const last = localStorage.getItem("last_exam"); window.location.assign(last ? `/pyq/${last}` : "/"); }}
        style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, color: C.textMuted, fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}
      >← Back</button>

      <div style={{ marginBottom: 6 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: 0 }}>Analysis</h1>
        <p style={{ fontSize: 13, color: C.textMuted, margin: "4px 0 0" }}>{examLabel} · your attempted PYQs</p>
      </div>

      {/* Overall summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, margin: "20px 0" }}>
        <Card>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.accent }}>{overall.attempted}</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Questions attempted</div>
        </Card>
        <Card>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.green }}>{overall.correct}</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Correct</div>
        </Card>
        <Card>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.text }}>{overall.accuracy}%</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Accuracy</div>
        </Card>
        <Card>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.text }}>{overall.avgTime}s</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Avg time / question</div>
        </Card>
      </div>

      {/* Subject-wise progress */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 4 }}>Your Progress</div>
        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Attempted vs total questions per subject</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {subjectStats.map((s, i) => {
            const pct = s.total ? Math.min(100, (s.attempted / s.total) * 100) : 0;
            return (
              <div key={s.slug}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.name}</span>
                  <span style={{ fontSize: 12, color: C.textMuted }}>{s.attempted} / {s.total.toLocaleString()} · {s.accuracy}% acc</span>
                </div>
                <div style={{ height: 8, borderRadius: 20, background: C.surface, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: SUBJECT_COLORS[i % SUBJECT_COLORS.length], borderRadius: 20 }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Difficulty filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[{ k: "all", l: "All Qs" }, { k: "easy", l: "Easy" }, { k: "medium", l: "Moderate" }, { k: "hard", l: "Tough" }].map((o) => (
          <button key={o.k} onClick={() => setDiffFilter(o.k)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: `1.5px solid ${diffFilter === o.k ? C.accent : C.border}`, background: diffFilter === o.k ? C.accentBg : C.surface, color: diffFilter === o.k ? C.accentLight : C.textMuted, cursor: "pointer" }}>{o.l}</button>
        ))}
      </div>

      {/* Difficulty breakdown cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
        {shownDifficulties.map((d) => (
          <Card key={d.key}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 8 }}>{d.label}</div>
            <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.9 }}>
              Attempted: <strong style={{ color: C.text }}>{d.attempted}</strong> / {d.total.toLocaleString()}<br/>
              Correct: <strong style={{ color: C.greenText }}>{d.correct}</strong><br/>
              Accuracy: <strong style={{ color: C.text }}>{d.accuracy}%</strong>
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly / Monthly attempted chart */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>Detailed Attempt Analysis</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["weekly", "monthly"].map((p) => (
              <button key={p} onClick={() => setPeriod(p)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, border: `1px solid ${period === p ? C.accent : C.border}`, background: period === p ? C.accentBg : "transparent", color: period === p ? C.accentLight : C.textMuted, cursor: "pointer", textTransform: "capitalize" }}>{p}</button>
            ))}
          </div>
        </div>

        {timeSeries.length === 0 ? (
          <div style={{ padding: 30, textAlign: "center", color: C.textDim, fontSize: 13 }}>No attempts yet in this period. Start practicing to see your trends.</div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Qs Attempted</span>
              <span style={{ fontSize: 13, color: C.textMuted }}><strong style={{ color: C.accent, fontSize: 15 }}>{currentPeriodStats.count} Qs</strong> {period === "weekly" ? "this week" : "this month"}</span>
            </div>
            <div style={{ width: "100%", height: 190 }}>
              <ResponsiveContainer>
                <BarChart data={timeSeries}>
                  <XAxis dataKey="label" tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={{ stroke: C.border }} tickLine={false} />
                  <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: C.surface }} contentStyle={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 12 }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {timeSeries.map((_, i) => <Cell key={i} fill={C.accent} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "20px 0 6px" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Time Per Qs</span>
              <span style={{ fontSize: 13, color: C.textMuted }}><strong style={{ color: C.purple, fontSize: 15 }}>{currentPeriodStats.avgTimeLabel}</strong> {period === "weekly" ? "this week's avg" : "this month's avg"}</span>
            </div>
            <div style={{ width: "100%", height: 190 }}>
              <ResponsiveContainer>
                <BarChart data={timeSeries}>
                  <XAxis dataKey="label" tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={{ stroke: C.border }} tickLine={false} />
                  <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: C.surface }} contentStyle={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 12 }} formatter={(v) => [`${v}s`, "avg time"]} />
                  <Bar dataKey="avgTime" radius={[6, 6, 0, 0]}>
                    {timeSeries.map((_, i) => <Cell key={i} fill={C.purple} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "20px 0 6px" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Accuracy</span>
              <span style={{ fontSize: 13, color: C.textMuted }}><strong style={{ color: C.green, fontSize: 15 }}>{currentPeriodStats.accuracy}%</strong> {period === "weekly" ? "this week's avg" : "this month's avg"}</span>
            </div>
            <div style={{ width: "100%", height: 190 }}>
              <ResponsiveContainer>
                <BarChart data={timeSeries}>
                  <XAxis dataKey="label" tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={{ stroke: C.border }} tickLine={false} />
                  <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip cursor={{ fill: C.surface }} contentStyle={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 12 }} formatter={(v) => [`${v}%`, "accuracy"]} />
                  <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                    {timeSeries.map((_, i) => <Cell key={i} fill={C.green} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <AppShell showDailyGoal={false}>
      <AnalysisInner />
    </AppShell>
  );
}
