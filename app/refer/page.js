"use client";
/**
 * Invite friends page. Shows the user's referral link, coin balance and
 * how many friends joined. Data comes from the get_my_referral() RPC.
 * Logged-out users are sent to /login (same as the profile page).
 */
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";
import { DARK, LIGHT } from "@/lib/questionTheme";
import { getMyReferral, referralLink } from "@/lib/referral";
import { usePlan } from "@/lib/plan"; // [premium]

const PREMIUM_COST = 100; // coins for 1 month of Premium (redeem comes with the Premium release)

function ReferInner() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("ec_theme");
    if (saved !== null) setIsDark(saved === "dark");
  }, []);
  const C = isDark ? DARK : LIGHT;

  const [state, setState] = useState({ status: "loading", data: null });
  const [copied, setCopied] = useState(false);
  const { plan, refresh: refreshPlan } = usePlan(); // [premium]
  const [redeeming, setRedeeming] = useState(false);
  const [redeemMsg, setRedeemMsg] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess?.session?.user) { router.push("/login?next=/refer"); return; }
      try {
        const data = await getMyReferral();
        setState({ status: "ok", data });
      } catch (e) {
        console.error("Loading referral failed:", e);
        setState({ status: "error", data: null });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.status === "loading") {
    return <div style={{ color: C.textMuted, padding: 20 }}>Loading…</div>;
  }
  if (state.status === "error") {
    return <div style={{ color: C.redText, padding: 20, fontSize: 14 }}>Couldn't load your invite link. Refresh the page to try again.</div>;
  }

  const { code, coins, friends_joined: joined, coins_per_referral: perFriend } = state.data;
  const link = referralLink(code);
  const friendsForPremium = Math.ceil(PREMIUM_COST / perFriend); // 5
  const filled = Math.min(Math.floor(coins / perFriend), friendsForPremium);
  const coinsLeft = Math.max(PREMIUM_COST - coins, 0);
  const shareText = `I'm practising JEE & NEET PYQs on ExamsCalendar. Sign up with my link: ${link}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      inputRef.current?.select(); // fallback where clipboard API is blocked
      document.execCommand?.("copy");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // [premium] spend coins for Premium
  const redeem = async () => {
    setRedeeming(true);
    setRedeemMsg(null);
    const { data, error } = await supabase.rpc("redeem_premium");
    if (error) {
      setRedeemMsg(String(error.message).includes("INSUFFICIENT_COINS")
        ? `You need ${PREMIUM_COST} coins to unlock Premium.`
        : "Couldn't unlock Premium. Please try again.");
    } else {
      const until = new Date(data.premium_until).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      setRedeemMsg(`Premium unlocked until ${until}.`);
      setState((st) => ({ ...st, data: { ...st.data, coins: data.coins } }));
      refreshPlan();
    }
    setRedeeming(false);
  };

  const shareMore = async () => {
    if (navigator.share) {
      await navigator.share({ title: "ExamsCalendar", text: shareText }).catch(() => {});
    } else {
      copyLink();
    }
  };

  const card = { padding: "20px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 20 };
  const btn = { padding: "11px 18px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none" };

  return (
    <div>
      <button
        onClick={() => router.push("/profile")}
        style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, color: C.textMuted, fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 6px" }}>Invite friends</h1>
      <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 20px", lineHeight: 1.5 }}>
        Get {perFriend} coins for every friend who signs up with your link. {PREMIUM_COST} coins unlock 1 month of Premium.
      </p>

      {/* Coins and progress */}
      <div style={card}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 40, fontWeight: 800, color: C.amber, lineHeight: 1 }}>{coins}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.textMuted }}>coins</span>
        </div>

        <div style={{ display: "flex", gap: 6, marginTop: 16 }} aria-label={`${filled} of ${friendsForPremium} friends towards Premium`}>
          {Array.from({ length: friendsForPremium }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 10, borderRadius: 5, background: i < filled ? C.amber : C.surfaceHigh, border: `1px solid ${i < filled ? C.amber : C.border}` }} />
          ))}
        </div>

        <p style={{ fontSize: 13, color: C.textMuted, margin: "12px 0 0" }}>
          {joined === 0
            ? `No friends have joined yet. Invite ${friendsForPremium} friends to earn ${PREMIUM_COST} coins.`
            : `${joined} ${joined === 1 ? "friend has" : "friends have"} joined. `}
          {joined > 0 && (coinsLeft > 0 ? `${coinsLeft} more coins for 1 month of Premium.` : "You have enough coins for 1 month of Premium.")}
        </p>
        {/* [premium] Premium status + redeem */}
        {plan?.is_premium && plan.premium_until && (
          <p style={{ fontSize: 13, fontWeight: 700, color: C.greenText, margin: "12px 0 0" }}>
            Premium active until {new Date(plan.premium_until).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
        <button
          onClick={redeem}
          disabled={coins < PREMIUM_COST || redeeming}
          style={{ ...btn, width: "100%", marginTop: 14, background: coins >= PREMIUM_COST ? C.amber : C.surfaceHigh, color: coins >= PREMIUM_COST ? "#1a1a1a" : C.textDim, cursor: coins >= PREMIUM_COST && !redeeming ? "pointer" : "not-allowed" }}
        >
          {redeeming ? "Unlocking…" : coins >= PREMIUM_COST
            ? `${plan?.is_premium ? "Add" : "Unlock"} 1 month of Premium (${PREMIUM_COST} coins)`
            : `${coinsLeft} more coins to unlock Premium`}
        </button>
        {redeemMsg && <p style={{ fontSize: 13, color: C.text, margin: "8px 0 0" }}>{redeemMsg}</p>}
        {/* [payments] */}
        <p style={{ fontSize: 13, color: C.textMuted, margin: "10px 0 0" }}>
          {"Don't want to wait? "}
          <button onClick={() => router.push("/premium")} style={{ background: "none", border: "none", padding: 0, color: C.accentLight, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            See Premium plans
          </button>
        </p>
      </div>

      {/* Link and sharing */}
      <div style={card}>
        <label style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 8 }}>Your invite link</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            ref={inputRef}
            readOnly
            value={link}
            onFocus={(e) => e.target.select()}
            style={{ flex: 1, minWidth: 0, padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 14, outline: "none" }}
          />
          <button onClick={copyLink} style={{ ...btn, background: copied ? C.greenBg : C.accent, color: copied ? C.greenText : "#fff", whiteSpace: "nowrap" }}>
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...btn, background: "#25D366", color: "#fff", textDecoration: "none", display: "inline-block" }}
          >
            Share on WhatsApp
          </a>
          <button onClick={shareMore} style={{ ...btn, background: C.surface, color: C.text, border: `1.5px solid ${C.border}` }}>
            More ways to share
          </button>
        </div>
      </div>

      {/* How it works: a real sequence, so numbered */}
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: "0 0 12px" }}>How it works</h2>
        {[
          "Share your link with friends preparing for JEE or NEET.",
          `They sign up with Google using your link, and you get ${perFriend} coins.`,
          `Collect ${PREMIUM_COST} coins to unlock 1 month of Premium.`,
        ].map((text, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 2 ? 10 : 0 }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: C.accentBg, color: C.accentLight, fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.5, paddingTop: 2 }}>{text}</span>
          </div>
        ))}
        <p style={{ fontSize: 12, color: C.textDim, margin: "14px 0 0", lineHeight: 1.5 }}>
          Only new accounts count, and each friend can be referred once.
        </p>
      </div>
    </div>
  );
}

export default function ReferPage() {
  return (
    <AppShell showDailyGoal={false}>
      <ReferInner />
    </AppShell>
  );
}
