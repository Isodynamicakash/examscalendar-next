"use client";
/**
 * LandingPageClient.jsx -- ExamsCalendar
 * Full 1:1 port of your existing LandingPage.jsx. Same theme tokens,
 * same hero copy/animation, same stats bar, same feature cards, same
 * footer. Only change: card clicks navigate to real routes
 * (/pyq/jee-main etc.) via next/router instead of local page-state.
 */
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const THEMES = {
  dark: {
    bg: "#0f1117", bgCard: "#181c27", bgCardHover: "#1e2335",
    nav: "rgba(15,17,23,0.96)", navBorder: "#242840",
    border: "#242840", borderHover: "#3a4060",
    text: "#f0f2ff", textSub: "#8892b0", textMuted: "#4a5280", textDisabled: "#2e3555",
    accent: "#4f7ef8", accentHover: "#6b93ff", accentBg: "#1a2654",
    gold: "#f5a623", goldBg: "#2d1f00",
    success: "#22c55e", successBg: "#0d2818",
    badge: "#1e2335", badgeText: "#4a5280",
    soon: "#2a3050", soonText: "#4a5280",
    shadow: "0 20px 60px rgba(0,0,0,0.5)", dropShadow: "0 24px 60px rgba(0,0,0,0.7)",
  },
  light: {
    bg: "#f8f9ff", bgCard: "#ffffff", bgCardHover: "#f0f3ff",
    nav: "rgba(248,249,255,0.97)", navBorder: "#e2e6f0",
    border: "#e2e6f0", borderHover: "#b8c0dc",
    text: "#111827", textSub: "#374151", textMuted: "#6b7280", textDisabled: "#d1d5db",
    accent: "#2563eb", accentHover: "#1d4ed8", accentBg: "#eff6ff",
    gold: "#d97706", goldBg: "#fffbeb",
    success: "#16a34a", successBg: "#f0fdf4",
    badge: "#f3f4f6", badgeText: "#374151",
    soon: "#f3f4f6", soonText: "#9ca3af",
    shadow: "0 4px 24px rgba(0,0,0,0.08)", dropShadow: "0 16px 48px rgba(0,0,0,0.12)",
  },
};

// Maps the original button ids (jee-mains / jee-adv / neet / ssc-cgl) to
// your real route slugs (jee-main / jee-advanced / neet / ssc-cgl).
const ROUTE_SLUG = { "jee-mains": "jee-main", "jee-adv": "jee-advanced", neet: "neet", "ssc-cgl": "ssc-cgl" };

function ThemeToggle({ isDark, toggle, T }) {
  return (
    <button
      onClick={toggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: T.badge, border: `1px solid ${T.border}`,
        cursor: "pointer", fontSize: 17, transition: "all .2s", color: T.textSub,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = T.bgCardHover; e.currentTarget.style.borderColor = T.borderHover; }}
      onMouseLeave={e => { e.currentTarget.style.background = T.badge; e.currentTarget.style.borderColor = T.border; }}
    >
      {isDark ? "\u2600\uFE0F" : "\uD83C\uDF19"}
    </button>
  );
}

function Hero({ onJeeMains, T, isDark }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  const anim = (d) => ({
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(18px)",
    transition: `opacity .6s ease ${d}s, transform .6s ease ${d}s`,
  });

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "120px 32px 80px",
      width: "100%", maxWidth: "100vw", overflow: "hidden",
      position: "relative", zIndex: 1,
    }}>
      {isDark && (
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 300, pointerEvents: "none",
          background: "radial-gradient(ellipse, #2563eb0a 0%, transparent 70%)",
        }} />
      )}

      <div style={{
        ...anim(0),
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "7px 18px", borderRadius: 24, marginBottom: 28,
        background: isDark ? "#1a2654" : "#eff6ff",
        border: `1px solid ${isDark ? "#2d4080" : "#bfdbfe"}`,
        fontSize: 12, fontWeight: 600, color: isDark ? "#93b4fd" : "#1d4ed8",
        letterSpacing: .5,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s ease infinite", flexShrink: 0 }} />
        JEE Mains &middot; JEE Advanced &middot; NEET &middot; SSC CGL &mdash; Live Now
        <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}`}</style>
      </div>

      <h1 style={{
        ...anim(.1),
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        fontSize: "clamp(2rem, 4vw, 3.6rem)",
        fontWeight: 800, lineHeight: 1.18,
        margin: "0 0 6px", color: T.text,
        maxWidth: 860, width: "100%",
        letterSpacing: -1, textAlign: "center",
      }}>
        Your one stop destination for
      </h1>
      <h1 style={{
        ...anim(.15),
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        fontSize: "clamp(2rem, 4vw, 3.6rem)",
        fontWeight: 800, lineHeight: 1.18,
        margin: "0 0 28px",
        color: isDark ? "#4f7ef8" : "#2563eb",
        maxWidth: 860, width: "100%",
        letterSpacing: -1, textAlign: "center",
      }}>
        All Exams
      </h1>

      <p style={{
        ...anim(.22),
        fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
        color: T.textSub, maxWidth: 600,
        lineHeight: 1.75, margin: "0 0 40px", fontWeight: 400,
      }}>
        Free previous year questions for JEE, NEET and SSC &mdash;
        fully searchable with complete solutions.
      </p>

      <div style={{ ...anim(.3), display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { label: "JEE Mains", id: "jee-mains", bg: "#2563eb", shadow: "rgba(37,99,235,.35)", hover: "#1d4ed8" },
          { label: "JEE Advanced", id: "jee-adv", bg: "#7c3aed", shadow: "rgba(124,58,237,.35)", hover: "#6d28d9" },
          { label: "NEET", id: "neet", bg: "#16a34a", shadow: "rgba(22,163,74,.35)", hover: "#15803d" },
          { label: "SSC CGL", id: "ssc-cgl", bg: "#d97706", shadow: "rgba(217,119,6,.35)", hover: "#b45309" },
        ].map(btn => (
          <button key={btn.id} onClick={() => onJeeMains(btn.id)} style={{
            padding: "12px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700,
            background: btn.bg, border: "none", color: "#ffffff", cursor: "pointer",
            boxShadow: `0 4px 20px ${btn.shadow}`,
            letterSpacing: .2, transition: "background .15s, box-shadow .15s, transform .15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = btn.hover; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${btn.shadow}`; }}
            onMouseLeave={e => { e.currentTarget.style.background = btn.bg; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 20px ${btn.shadow}`; }}
          >
            {btn.label} &rarr;
          </button>
        ))}
      </div>

      <div style={{
        ...anim(.45),
        display: "flex", gap: 0, marginTop: 64,
        flexWrap: "wrap", justifyContent: "center",
        background: T.bgCard, border: `1px solid ${T.border}`,
        borderRadius: 14, overflow: "hidden", boxShadow: T.shadow,
      }}>
        {[
          { num: "50,000+", label: "PYQs" },
          { num: "10+", label: "Years Covered" },
          { num: "100%", label: "Free to Use" },
          { num: "4", label: "Exam Categories" },
        ].map((s, i) => (
          <div key={s.label} style={{ textAlign: "center", padding: "20px 36px", borderRight: i < 3 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, color: T.text, letterSpacing: -.5 }}>{s.num}</div>
            <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 500, letterSpacing: .8, textTransform: "uppercase", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub, T }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <div style={{
        display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
        color: T.accent, textTransform: "uppercase", marginBottom: 12,
        background: T.accentBg, padding: "4px 12px", borderRadius: 6,
      }}>{eyebrow}</div>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: T.text, margin: "0 0 14px", letterSpacing: -.5 }}>{title}</h2>
      {sub && <p style={{ fontSize: 15, color: T.textSub, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

function Features({ onJeeMains, T, isDark }) {
  const cards = [
    { icon: "\uD83C\uDFAF", title: "JEE Mains PYQs", desc: "10+ years of questions with complete solutions. Filter by chapter, topic, difficulty and question type.", onClick: () => onJeeMains("jee-mains") },
    { icon: "\uD83C\uDFC6", title: "JEE Advanced PYQs", desc: "Complete JEE Advanced previous year papers. Filter by subject, chapter, topic and year.", onClick: () => onJeeMains("jee-adv") },
    { icon: "\uD83E\uDE7A", title: "NEET PYQs", desc: "Complete NEET previous year papers with detailed solutions. Filter by subject, chapter, topic and year.", onClick: () => onJeeMains("neet") },
    { icon: "\uD83D\uDCCB", title: "SSC CGL PYQs", desc: "SSC CGL Tier I previous year papers across all 4 subjects. Filter by shift, chapter and more.", onClick: () => onJeeMains("ssc-cgl") },
  ];

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "0 24px 80px", maxWidth: 1160, margin: "0 auto" }}>
      <SectionHeader eyebrow="Live Now" title="Browse previous year questions" sub="Fully searchable and filterable PYQ banks -- free for every student." T={T} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {cards.map((c, i) => (
          <div key={c.title} onClick={c.onClick} style={{
            background: T.bgCard, border: `1px solid ${isDark ? "#2d4080" : "#bfdbfe"}`,
            borderRadius: 16, padding: "28px 24px 24px", cursor: "pointer",
            transition: "transform .18s, box-shadow .18s, border-color .18s",
            animation: "fadeUp .45s ease both", animationDelay: `${i * .08}s`,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = isDark ? "0 16px 40px rgba(37,99,235,.2)" : "0 12px 32px rgba(37,99,235,.12)";
              e.currentTarget.style.borderColor = isDark ? "#4f7ef8" : "#93c5fd";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = isDark ? "#2d4080" : "#bfdbfe";
            }}
          >
            <div style={{ fontSize: 30, marginBottom: 16 }}>{c.icon}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700, color: T.text, margin: 0 }}>{c.title}</h3>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: isDark ? "#1a2654" : "#eff6ff", color: isDark ? "#93b4fd" : "#2563eb", border: `1px solid ${isDark ? "#2d4080" : "#bfdbfe"}`, letterSpacing: .5, flexShrink: 0 }}>LIVE</span>
            </div>
            <p style={{ fontSize: 14, color: T.textSub, lineHeight: 1.65, margin: "0 0 18px" }}>{c.desc}</p>
            <div style={{ fontSize: 13, fontWeight: 600, color: isDark ? "#4f7ef8" : "#2563eb", display: "flex", alignItems: "center", gap: 4 }}>
              Browse questions <span>&rarr;</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

function Footer({ T }) {
  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, padding: "36px 24px", textAlign: "center", position: "relative", zIndex: 1, background: T.bg }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 10, color: T.accent, letterSpacing: -.3 }}>ExamsCalendar.PYQ</div>
      <div style={{ fontSize: 13, color: T.textMuted }}>Free PYQs for JEE &middot; JEE Advanced &middot; NEET &middot; SSC CGL</div>
    </footer>
  );
}

export default function LandingPageClient() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("ec_theme");
    if (saved !== null) setIsDark(saved === "dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem("ec_theme", next ? "dark" : "light");
      return next;
    });
  };

  const onJeeMains = (id) => {
    const slug = ROUTE_SLUG[id] || id;
    router.push(`/pyq/${slug}`);
  };

  const T = isDark ? THEMES.dark : THEMES.light;

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif", background: T.bg, minHeight: "100vh", color: T.text, transition: "background .3s, color .3s" }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
        button { font-family: inherit; }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: isDark ? "#0f1117" : "#ffffff",
        borderBottom: `2px solid ${T.navBorder}`,
        padding: "0", height: 60, display: "flex", alignItems: "stretch",
      }}>
        <div style={{ width: "100%", display: "flex", alignItems: "stretch", height: "100%" }}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 800,
            padding: "0 24px", color: T.accent, letterSpacing: -.4, cursor: "default",
            display: "flex", alignItems: "center", flexShrink: 0, borderRight: `1px solid ${T.navBorder}`,
          }}>ExamsCalendar</div>
          <div ref={menuRef} style={{ display: "flex", alignItems: "stretch", flex: 1, position: "relative" }} />
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "0 16px", borderLeft: `1px solid ${T.navBorder}` }}>
            <ThemeToggle isDark={isDark} toggle={toggleTheme} T={T} />
          </div>
        </div>
      </nav>

      <Hero onJeeMains={onJeeMains} T={T} isDark={isDark} />
      <Features onJeeMains={onJeeMains} T={T} isDark={isDark} />
      <Footer T={T} />
    </div>
  );
}
