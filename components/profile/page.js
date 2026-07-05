"use client";
/**
 * Profile page. Logged-out users are redirected to /login (personalized
 * feature). Lets the user set: display name, stream, class (only for
 * Engineering/Medical), target year, and daily goal (preset buttons).
 *
 * Backed by the user_profiles table (one row per user, keyed by
 * user_id). Uses upsert so first save creates the row, later saves
 * update it.
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";
import { DARK, LIGHT } from "@/lib/questionTheme";

const STREAMS = ["Engineering", "Medical", "SSC / Govt Exams", "Other"];
const CLASS_STREAMS = new Set(["Engineering", "Medical"]); // these ask for class
const CLASSES = ["Class 11", "Class 12", "Dropper"];
const GOAL_PRESETS = [10, 20, 30, 50];

function initials(name, email) {
  const s = (name || email || "?").trim();
  return s.charAt(0).toUpperCase();
}

function ProfileInner() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("ec_theme");
    if (saved !== null) setIsDark(saved === "dark");
  }, []);
  const C = isDark ? DARK : LIGHT;

  const currentYear = new Date().getFullYear();
  const YEARS = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3];

  const [state, setState] = useState({ status: "loading", user: null });
  const [name, setName] = useState("");
  const [stream, setStream] = useState("");
  const [klass, setKlass] = useState("");
  const [targetYear, setTargetYear] = useState(YEARS[1]);
  const [dailyGoal, setDailyGoal] = useState(30);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess?.session?.user || null;
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (profile) {
        setName(profile.display_name || "");
        setStream(profile.stream || "");
        setKlass(profile.target_class || "");
        setTargetYear(profile.target_year || YEARS[1]);
        setDailyGoal(profile.daily_goal || 30);
      }
      setState({ status: "ok", user });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    if (!state.user) return;
    setSaving(true); setSaved(false);
    try {
      const row = {
        user_id: state.user.id,
        display_name: name.trim() || null,
        stream: stream || null,
        target_class: CLASS_STREAMS.has(stream) ? (klass || null) : null,
        target_year: targetYear,
        daily_goal: dailyGoal,
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("user_profiles").upsert(row, { onConflict: "user_id" });
      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error("Profile save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  if (state.status === "loading") {
    return <div style={{ color: C.textMuted, padding: 20 }}>Loading…</div>;
  }

  const showClass = CLASS_STREAMS.has(stream);
  const email = state.user?.email;

  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 6 };

  const Pill = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{ padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, border: `1.5px solid ${active ? C.accent : C.border}`, background: active ? C.accentBg : C.surface, color: active ? C.accentLight : C.textMuted, cursor: "pointer" }}>{label}</button>
  );

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 20px" }}>Profile</h1>

      {/* Identity card */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 20 }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg,${C.accent},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
          {initials(name, email)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>{name || "Your name"}</div>
          <div style={{ fontSize: 13, color: C.textMuted, wordBreak: "break-all" }}>{email}</div>
          <div style={{ fontSize: 12, color: C.textDim, marginTop: 2 }}>
            {[stream, showClass ? klass : null, `Target ${targetYear}`].filter(Boolean).join(" · ")}
          </div>
        </div>
      </div>

      {/* Editable fields */}
      <div style={{ padding: "20px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Stream</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {STREAMS.map((s) => <Pill key={s} label={s} active={stream === s} onClick={() => setStream(s)} />)}
          </div>
        </div>

        {showClass && (
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Class</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CLASSES.map((c) => <Pill key={c} label={c} active={klass === c} onClick={() => setKlass(c)} />)}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Target Year</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {YEARS.map((y) => <Pill key={y} label={String(y)} active={targetYear === y} onClick={() => setTargetYear(y)} />)}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Daily Goal (questions per day)</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {GOAL_PRESETS.map((g) => <Pill key={g} label={`${g} Qs`} active={dailyGoal === g} onClick={() => setDailyGoal(g)} />)}
          </div>
        </div>
      </div>

      <button onClick={save} disabled={saving} style={{ padding: "13px 28px", borderRadius: 10, background: saving ? C.surfaceHigh : C.accent, color: saving ? C.textDim : "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: saving ? "wait" : "pointer" }}>
        {saving ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
      </button>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AppShell showDailyGoal={false}>
      <ProfileInner />
    </AppShell>
  );
}
