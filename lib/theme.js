// lib/theme.js
// Ported 1:1 from your existing LandingPage.jsx THEMES object.
// Dark mode reworked: true-black page, neon borders, white text.

export const THEMES = {
  dark: {
    bg: "#000000",
    bgCard: "#0a0a0f",
    bgCardHover: "#131320",
    nav: "rgba(0,0,0,0.97)",
    navBorder: "#2a2a3d",
    border: "#3a3a55",
    borderHover: "#55557a",
    text: "#ffffff",
    textSub: "#f2f2ff",
    textMuted: "#e5e5fa",
    textDisabled: "#6b6b85",

    accent: "#00d4ff",
    accentHover: "#33ddff",
    accentBg: "#00293a",
    accentLight: "#7fe8ff",

    gold: "#ffd60a",
    goldBg: "#3d2f00",
    success: "#00ff9d",
    successBg: "#00331f",

    // neon accent set used by the icon chips / borders
    green: "#00ff9d",
    greenBg: "#00331f",
    greenText: "#00ff9d",
    amber: "#ffd60a",
    amberBg: "#3d2f00",
    amberText: "#ffd60a",
    red: "#ff3b5c",
    redBg: "#3a0012",
    redText: "#ff3b5c",
    blue: "#00d4ff",
    blueBg: "#00293a",
    blueText: "#00d4ff",
    purple: "#b967ff",
    purpleBg: "#2a0a3d",
    purpleText: "#b967ff",
    orange: "#ff9100",
    orangeBg: "#3a1d00",
    orangeText: "#ff9100",

    badge: "#13131f",
    badgeText: "#f2f2ff",
    soon: "#1e1e2e",
    soonText: "#e5e5fa",
    shadow: "0 20px 60px rgba(0,0,0,0.8)",
    dropShadow: "0 24px 60px rgba(0,0,0,0.9)",
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
    accentLight: "#2563eb",

    gold: "#d97706",
    goldBg: "#fffbeb",
    success: "#16a34a",
    successBg: "#f0fdf4",

    green: "#059669",
    greenBg: "#d1fae5",
    greenText: "#065f46",
    amber: "#d97706",
    amberBg: "#fef3c7",
    amberText: "#92400e",
    red: "#dc2626",
    redBg: "#fee2e2",
    redText: "#991b1b",
    blue: "#2563eb",
    blueBg: "#dbeafe",
    blueText: "#1e40af",
    purple: "#7c3aed",
    purpleBg: "#ede9fe",
    purpleText: "#5b21b6",
    orange: "#ea580c",
    orangeBg: "#ffedd5",
    orangeText: "#9a3412",

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
