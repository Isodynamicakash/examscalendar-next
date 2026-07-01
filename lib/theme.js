// lib/theme.js
// Ported 1:1 from your existing LandingPage.jsx THEMES object.
// Nothing changed here — same look, same feel.

export const THEMES = {
  dark: {
    bg: "#0f1117",
    bgCard: "#181c27",
    bgCardHover: "#1e2335",
    nav: "rgba(15,17,23,0.96)",
    navBorder: "#242840",
    border: "#242840",
    borderHover: "#3a4060",
    text: "#f0f2ff",
    textSub: "#8892b0",
    textMuted: "#4a5280",
    textDisabled: "#2e3555",
    accent: "#4f7ef8",
    accentHover: "#6b93ff",
    accentBg: "#1a2654",
    gold: "#f5a623",
    goldBg: "#2d1f00",
    success: "#22c55e",
    successBg: "#0d2818",
    badge: "#1e2335",
    badgeText: "#4a5280",
    soon: "#2a3050",
    soonText: "#4a5280",
    shadow: "0 20px 60px rgba(0,0,0,0.5)",
    dropShadow: "0 24px 60px rgba(0,0,0,0.7)",
  },
  light: {
    bg: "#f8f9ff",
    bgCard: "#ffffff",
    bgCardHover: "#f0f3ff",
    nav: "rgba(248,249,255,0.97)",
    navBorder: "#e2e6f0",
    border: "#e2e6f0",
    borderHover: "#b8c0dc",
    text: "#111827",
    textSub: "#374151",
    textMuted: "#6b7280",
    textDisabled: "#d1d5db",
    accent: "#2563eb",
    accentHover: "#1d4ed8",
    accentBg: "#eff6ff",
    gold: "#d97706",
    goldBg: "#fffbeb",
    success: "#16a34a",
    successBg: "#f0fdf4",
    badge: "#f3f4f6",
    badgeText: "#374151",
    soon: "#f3f4f6",
    soonText: "#9ca3af",
    shadow: "0 4px 24px rgba(0,0,0,0.08)",
    dropShadow: "0 16px 48px rgba(0,0,0,0.12)",
  },
};

export function getTheme(isDark) {
  return isDark ? THEMES.dark : THEMES.light;
}
