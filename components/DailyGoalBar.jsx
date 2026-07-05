"use client";
/**
 * DailyGoalBar.jsx -- compact daily-goal progress widget.
 *
 * Shows on all AppShell pages EXCEPT homepage and question solver
 * (those pass showDailyGoal={false} or just don't wrap in AppShell).
 *
 * Progress = distinct questions the user attempted TODAY (each question
 * counts once, regardless of how many attempts). Target = daily_goal
 * from their profile (default 30).
 *
 * Logged out: shows a "sign in to track" nudge instead of a bar.
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DailyGoalBar({ C }) {
  const router = useRouter();
  const [state, setState] = useState({ status: "loading", done: 0, goal: 30, user: null });

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess?.session?.user || null;
      if (!user) { setState({ status: "logged-out", done: 0, goal: 30, user: null }); return; }

      // Goal from profile (fall back to 30 if no profile row yet).
      let goal = 30;
      const { data: profile } = await supabase.from("user_profiles").select("daily_goal").eq("user_id", user.id).maybeSingle();
      if (profile?.daily_goal) goal = profile.daily_goal;

      // Distinct questions attempted today. RLS scopes to this user.
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const { data: attempts } = await supabase
        .from("user_attempts")
        .select("question_id, attempted_at")
        .gte("attempted_at", startOfDay.toISOString());

      const distinct = new Set((attempts || []).map((a) => a.question_id));
      setState({ status: "ok", done: distinct.size, goal, user });
    })();
  }, []);

  if (state.status === "loading") {
    return <div style={{ height: 44 }} />; // reserved space, no flicker
  }

  if (state.status === "logged-out") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: C.textMuted, fontWeight: 600 }}>🎯 Set a daily practice goal and track your streak</span>
        <button onClick={() => router.push("/login")} style={{ padding: "6px 14px", borderRadius: 8, background: C.accent, color: "#fff", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Sign in →</button>
      </div>
    );
  }

  const { done, goal } = state;
  const pct = Math.min(100, Math.round((done / goal) * 100));
  const complete = done >= goal;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 16 }}>
      <span style={{ fontSize: 13, fontWeight: 800, color: C.text, whiteSpace: "nowrap" }}>
        🎯 Daily Goal
      </span>
      <div style={{ flex: 1, height: 8, borderRadius: 20, background: C.surface, overflow: "hidden", minWidth: 80 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: complete ? C.green : C.accent, borderRadius: 20, transition: "width .4s ease" }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: complete ? C.greenText : C.textMuted, whiteSpace: "nowrap" }}>
        {done}/{goal}{complete ? " ✓" : ""}
      </span>
    </div>
  );
}
