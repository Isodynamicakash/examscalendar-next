// lib/questionTheme.js
// Ported 1:1 from QuestionBrowser.jsx — same DARK/LIGHT tokens, same
// subject-color hashing. Nothing visually changes.

export const DARK = {
  bg: "#0f1117", bgCard: "#16191f", surface: "#1c2029", surfaceHigh: "#222736",
  border: "#2a2f3e", borderLight: "#353b4f",
  accent: "#5b6ef5", accentLight: "#7c8dff", accentBg: "#1a1d3a",
  green: "#22c55e", greenBg: "#0d2818", greenText: "#4ade80",
  red: "#ef4444", redBg: "#2d0f0f", redText: "#f87171",
  amber: "#f59e0b", amberBg: "#2d1f00", amberText: "#fbbf24",
  blue: "#3b82f6", blueBg: "#0f1f3d", blueText: "#60a5fa",
  purple: "#a855f7", purpleBg: "#1e0f38", purpleText: "#c084fc",
  orange: "#f97316", orangeBg: "#2d1500", orangeText: "#fb923c",
  text: "#e2e8f0", textMuted: "#8892a4", textDim: "#4a5268",
  nav: "#0a0d14", isDark: true, shadow: "0 4px 24px rgba(0,0,0,0.5)",
};

export const LIGHT = {
  bg: "#f0f2f8", bgCard: "#ffffff", surface: "#f8f9fc", surfaceHigh: "#eef0f7",
  border: "#dde1ef", borderLight: "#c8cde0",
  accent: "#4f5fd4", accentLight: "#4f5fd4", accentBg: "#eef0ff",
  green: "#16a34a", greenBg: "#dcfce7", greenText: "#15803d",
  red: "#dc2626", redBg: "#fee2e2", redText: "#b91c1c",
  amber: "#d97706", amberBg: "#fef3c7", amberText: "#b45309",
  blue: "#2563eb", blueBg: "#dbeafe", blueText: "#1d4ed8",
  purple: "#9333ea", purpleBg: "#f3e8ff", purpleText: "#7e22ce",
  orange: "#ea580c", orangeBg: "#ffedd5", orangeText: "#c2410c",
  text: "#1e2235", textMuted: "#5a6278", textDim: "#9ba3b8",
  nav: "#ffffff", isDark: false, shadow: "0 2px 12px rgba(0,0,0,0.08)",
};

const SUBJ_PALETTES = [
  { d: "#1a1d3a", dt: "#7c8dff", l: "#eef0ff", lt: "#4f5fd4" },
  { d: "#0d2818", dt: "#4ade80", l: "#dcfce7", lt: "#16a34a" },
  { d: "#2d1500", dt: "#fb923c", l: "#ffedd5", lt: "#ea580c" },
  { d: "#1e0f38", dt: "#c084fc", l: "#f3e8ff", lt: "#9333ea" },
  { d: "#0f1f3d", dt: "#60a5fa", l: "#dbeafe", lt: "#2563eb" },
];

export function subjColor(name, isDark) {
  const i = Math.abs([...(name || "X")].reduce((a, c) => a + c.charCodeAt(0), 0)) % SUBJ_PALETTES.length;
  const p = SUBJ_PALETTES[i];
  return isDark ? { bg: p.d, text: p.dt } : { bg: p.l, text: p.lt };
}
