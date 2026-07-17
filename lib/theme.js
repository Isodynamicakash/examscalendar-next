// lib/theme.js
// Ported 1:1 from your existing LandingPage.jsx THEMES object.
// Nothing changed here — same look, same feel.

export const THEMES = {
  dark: {
    bg: "#0a0a0f",
    bgCard: "#14161f",
    bgCardHover: "#1c1f2e",
    nav: "rgba(10,10,15,0.97)",
    navBorder: "#33395c",
    border: "#33395c",
    borderHover: "#4f577f",
    text: "#f5f6ff",
    textSub: "#aab2d4",
    textMuted: "#7a83ab",
    textDisabled: "#3a4060",
    accent: "#4f7ef8",
    accentHover: "#6b93ff",
    accentBg: "#1a2654",
    gold: "#f5a623",
    goldBg: "#2d1f00",
    success: "#22c55e",
    successBg: "#0d2818",
    badge: "#1e2335",
    badgeText: "#aab2d4",
    soon: "#2a3050",
    soonText: "#7a83ab",
    shadow: "0 20px 60px rgba(0,0,0,0.6)",
    dropShadow: "0 24px 60px rgba(0,0,0,0.8)",
  },
  light: {
    bg: "#f8f9ff",
    bgCard: "#ffffff",
    bgCardHover: "#f0f3ff",
    nav: "rgba(248,249,255,0.97)",
    navBorder: "#d3d8e6",
    border: "#d3d8e6",
    borderHover: "#a8b2d4",
    text: "#111827",
    textSub: "#374151",
    textMuted: "#5b6272",
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
    soonText: "#6b7280",
    shadow: "0 4px 24px rgba(0,0,0,0.08)",
    dropShadow: "0 16px 48px rgba(0,0,0,0.12)",
  },
};

export function getTheme(isDark) {
  return isDark ? THEMES.dark : THEMES.light;
}
