"use client";
/**
 * /premium -- plans, Free vs Premium comparison, and Razorpay checkout.
 * Prices come from the backend (/api/payments/plans), never hardcoded here.
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { DARK, LIGHT } from "@/lib/questionTheme";
import { usePlan } from "@/lib/plan";
import { fetchPlans, buyPremium, formatRupees } from "@/lib/payments";

const COMPARISON = [
  { feature: "All PYQs (JEE Main, JEE Advanced, NEET)", free: "✓", premium: "✓" },
  { feature: "Chapter, topic, year and numerical filters", free: "✓", premium: "✓" },
  { feature: "Bookmarks and tests from bookmarks", free: "✓", premium: "✓" },
  { feature: "Custom tests", free: "2 a day, up to 20 Qs", premium: "Unlimited" },
  { feature: "Difficulty filters (Easy, Medium, Hard)", free: "—", premium: "✓" },
  { feature: "Correct, incorrect and unattempted filters", free: "—", premium: "✓" },
  { feature: "Practise your mistakes", free: "—", premium: "✓" },
];

const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function PremiumInner() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("ec_theme");
    if (saved !== null) setIsDark(saved === "dark");
  }, []);
  const C = isDark ? DARK : LIGHT;

  const { plan, refresh: refreshPlan } = usePlan();
  const [plans, setPlans] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [busyPlan, setBusyPlan] = useState(null);
  const [message, setMessage] = useState(null); // { tone: "ok" | "info" | "error", text }

  useEffect(() => {
    fetchPlans()
      .then((d) => setPlans(d.plans))
      .catch(() => setLoadError(true));
  }, []);

  const monthly = plans?.find((p) => p.id === "monthly");

  const buy = async (planId) => {
    setBusyPlan(planId);
    setMessage(null);
    try {
      const result = await buyPremium(planId, { color: C.accent });
      if (result.status === "paid") {
        await refreshPlan();
        setMessage({ tone: "ok", text: `Payment successful. Premium is active until ${fmtDate(result.premium_until)}.` });
      } else if (result.status === "processing") {
        setMessage({ tone: "info", text: "Payment received. Premium will be active within a few minutes. Refresh this page to check." });
      }
    } catch (e) {
      if (e.message === "SIGN_IN") { router.push("/login?next=/premium"); return; }
      setMessage({ tone: "error", text: e.message || "Something went wrong. Please try again." });
    } finally {
      setBusyPlan(null);
    }
  };

  const toneStyle = {
    ok: { background: C.greenBg, color: C.greenText },
    info: { background: C.accentBg, color: C.accentLight },
    error: { background: C.redBg, color: C.redText },
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: "0 0 6px" }}>ExamsCalendar Premium</h1>
      <p style={{ fontSize: 15, color: C.textMuted, margin: "0 0 20px", lineHeight: 1.5 }}>
        Unlimited tests and smarter filters, so you spend your time on the questions that matter.
      </p>

      {plan?.is_premium && plan.premium_until && (
        <div style={{ padding: "12px 16px", borderRadius: 12, background: C.greenBg, color: C.greenText, fontSize: 14, fontWeight: 700, marginBottom: 20 }}>
          Premium is active until {fmtDate(plan.premium_until)}. Buying again adds time on top.
        </div>
      )}

      {message && (
        <div role="status" style={{ padding: "12px 16px", borderRadius: 12, fontSize: 14, fontWeight: 600, marginBottom: 20, ...toneStyle[message.tone] }}>
          {message.text}
        </div>
      )}

      {/* Plans */}
      {loadError ? (
        <p style={{ fontSize: 14, color: C.redText }}>{"Couldn't load plans. Refresh the page to try again."}</p>
      ) : !plans ? (
        <div style={{ height: 190, borderRadius: 16, background: C.surface, marginBottom: 28 }} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 28 }}>
          {plans.map((p) => {
            const isYearly = p.id === "yearly";
            const perMonth = isYearly ? Math.round(p.amount_paise / 12 / 100) : null;
            const savePct = isYearly && monthly
              ? Math.round((1 - p.amount_paise / (monthly.amount_paise * 12)) * 100)
              : null;
            return (
              <div key={p.id} style={{ position: "relative", padding: "22px 20px", borderRadius: 16, background: C.bgCard, border: `2px solid ${isYearly ? C.amber : C.border}` }}>
                {savePct > 0 && (
                  <span style={{ position: "absolute", top: -12, right: 16, background: C.amber, color: "#1a1a1a", fontSize: 12, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>
                    Save {savePct}%
                  </span>
                )}
                <div style={{ fontSize: 15, fontWeight: 800, color: C.textMuted }}>{p.label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "8px 0 4px" }}>
                  <span style={{ fontSize: 34, fontWeight: 800, color: C.text }}>{formatRupees(p.amount_paise)}</span>
                  <span style={{ fontSize: 14, color: C.textMuted }}>/ {isYearly ? "year" : "month"}</span>
                </div>
                <div style={{ fontSize: 13, color: C.textMuted, minHeight: 18 }}>
                  {perMonth ? `Works out to ₹${perMonth} a month` : `${p.days} days of Premium`}
                </div>
                <button
                  onClick={() => buy(p.id)}
                  disabled={busyPlan !== null}
                  style={{ width: "100%", marginTop: 16, padding: "12px", borderRadius: 10, border: "none", fontSize: 15, fontWeight: 800, cursor: busyPlan ? "wait" : "pointer", background: isYearly ? C.amber : C.accent, color: isYearly ? "#1a1a1a" : "#fff", opacity: busyPlan && busyPlan !== p.id ? 0.5 : 1 }}
                >
                  {busyPlan === p.id ? "Opening payment…" : `Get ${p.label}`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Free vs Premium */}
      <h2 style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: "0 0 12px" }}>What you get</h2>
      <div style={{ overflowX: "auto", marginBottom: 24, borderRadius: 14, border: `1px solid ${C.border}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, background: C.bgCard }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px 14px", color: C.textMuted, fontWeight: 700, borderBottom: `1px solid ${C.border}` }}>Feature</th>
              <th style={{ padding: "12px 14px", color: C.textMuted, fontWeight: 700, borderBottom: `1px solid ${C.border}` }}>Free</th>
              <th style={{ padding: "12px 14px", color: C.amberText, fontWeight: 800, borderBottom: `1px solid ${C.border}` }}>Premium</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.feature}>
                <td style={{ padding: "11px 14px", color: C.text, borderBottom: `1px solid ${C.border}` }}>{row.feature}</td>
                <td style={{ padding: "11px 14px", color: C.textMuted, textAlign: "center", borderBottom: `1px solid ${C.border}` }}>{row.free}</td>
                <td style={{ padding: "11px 14px", color: C.text, fontWeight: 700, textAlign: "center", borderBottom: `1px solid ${C.border}` }}>{row.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 8px" }}>
        Prefer not to pay?{" "}
        <button onClick={() => router.push("/refer")} style={{ background: "none", border: "none", padding: 0, color: C.accentLight, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          Invite 5 friends to get 1 month free
        </button>
      </p>
      <p style={{ fontSize: 12, color: C.textDim, margin: 0, lineHeight: 1.5 }}>
        One-time payment through Razorpay (UPI, cards, net banking). No auto-renewal.
      </p>
    </div>
  );
}

export default function PremiumPage() {
  return (
    <AppShell showDailyGoal={false}>
      <PremiumInner />
    </AppShell>
  );
}
