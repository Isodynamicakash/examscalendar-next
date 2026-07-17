// lib/questionTheme.js
// Ported 1:1 from QuestionBrowser.jsx -- same DARK/LIGHT tokens, same
// subject-color hashing. Dark mode reworked: true-black page, neon
// borders, white text. Added `textSub` and `dropShadow` keys since
// other components reference them and they were previously missing
// (missing keys silently drop the CSS property instead of erroring).

export const DARK = {
  bg: "#000000", bgCard: "#0a0a0f", surface: "#0d0d13", surfaceHigh: "#15151f",
  border: "#3a3a55", borderLight: "#55557a",
  accent: "#00d4ff", accentLight: "#7fe8ff", accentBg: "#00293a",
  green: "#00ff9d", greenBg: "#00331f", greenText: "#00ff9d",
  red: "#ff3b5c", redBg: "#3a0012", redText: "#ff3b5c",
  amber: "#ffd60a", amberBg: "#3d2f00", amberText: "#ffd60a",
  blue: "#00d4ff", blueBg: "#00293a", blueText: "#00d4ff",
  purple: "#b967ff", purpleBg: "#2a0a3d", purpleText: "#b967ff",
  orange: "#ff9100", orangeBg: "#3a1d00", orangeText: "#ff9100",
  text: "#ffffff", textSub: "#f2f2ff", textMuted: "#e5e5fa", textDim: "#9a9ac0",
  nav: "#000000", isDark: true,
  shadow: "0 4px 30px rgba(0,0,0,0.8)",
  dropShadow: "0 24px 60px rgba(0,0,0,0.9)",
};

export const LIGHT = {
  bg: "#f0f2f8", bgCard: "#ffffff", surface: "#f8f9fc", surfaceHigh: "#eef0f7",
  border: "#c8cde0", borderLight: "#a8b0d0",
  accent: "#4f5fd4", accentLight: "#4f5fd4", accentBg: "#eef0ff",
  green: "#16a34a", greenBg: "#dcfce7", greenText: "#15803d",
  red: "#dc2626", redBg: "#fee2e2", redText: "#b91c1c",
  amber: "#d97706", amberBg: "#fef3c7", amberText: "#b45309",
  blue: "#2563eb", blueBg: "#dbeafe", blueText: "#1d4ed8",
  purple: "#9333ea", purpleBg: "#f3e8ff", purpleText: "#7e22ce",
  orange: "#ea580c", orangeBg: "#ffedd5", orangeText: "#c2410c",
  text: "#1e2235", textSub: "#374151", textMuted: "#5a6278", textDim: "#9ba3b8",
  nav: "#ffffff", isDark: false,
  shadow: "0 2px 12px rgba(0,0,0,0.08)",
  dropShadow: "0 16px 48px rgba(0,0,0,0.12)",
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
