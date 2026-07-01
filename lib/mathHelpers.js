// lib/mathHelpers.js
// Ported 1:1 from QuestionBrowser.jsx. This is your existing LaTeX
// preprocessing logic (tabular -> array, gathered -> aligned, [IMAGE:...]
// tokens) — unchanged, just moved into a shared file so both the server
// question page and the client browser can use it.

export function resolveImg(f, r2Base) {
  if (!f) return "";
  if (f.startsWith("http")) return f;
  return `${r2Base}/${f}`;
}

export function renderMath(text) {
  if (!text) return null;
  let t = text;
  if (t.includes("\\begin{tabular}")) {
    t = t.replace(/\\begin\{tabular\}\{([^}]*)\}([\s\S]*?)\\end\{tabular\}/g, (_, fmt, body) => {
      const parts = body.split("\\hline"), rows = [];
      parts.forEach((part) => {
        const seg = part.split("\n").map((l) => l.trim()).filter(Boolean).join(" ").replace(/\\\\$/, "").trim();
        rows.push("\\hline");
        if (seg)
          rows.push(
            seg
              .split("&")
              .map((c) => {
                const s = c.replace(/\\multicolumn\{\d+\}\{[^}]*\}\{([^}]*)\}/g, "$1").trim();
                const m = s.match(/^\$([\s\S]+)\$$/);
                if (m) return m[1];
                if (!s || s.startsWith("\\") || /^-?[\d.]+$/.test(s)) return s;
                return `\\text{${s}}`;
              })
              .join(" & ") + " \\\\"
          );
      });
      return `$$\\begin{array}{${fmt}}\n${rows.join("\n")}\n\\end{array}$$`;
    });
  }
  if (t.includes("\\begin{gathered}")) {
    t = t.replace(/\\begin\{gathered\}/g, "\\begin{aligned}");
    t = t.replace(/\\end\{gathered\}/g, "\\end{aligned}");
    t = t.replace(/\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}/g, (_, inner) => {
      const lines = inner.split("\n").map((l) => l.trim()).filter(Boolean);
      return "\\begin{aligned}" + lines.join(" \\\\ ") + "\\end{aligned}";
    });
  }
  return t;
}

export function splitSolutionLines(text) {
  if (!text) return [text];
  if (text.includes("\\begin{aligned}")) {
    const result = [], re = /\$\$[^$]*?\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}[^$]*?\$\$/g;
    let lastIdx = 0, m;
    while ((m = re.exec(text)) !== null) {
      const before = text.slice(lastIdx, m.index).trim();
      if (before) before.split("\n").map((l) => l.trim()).filter(Boolean).forEach((l) => result.push(l));
      m[1].split("&").map((s) => s.replace(/\\\\/g, "").trim()).filter((s) => s.length > 1).forEach((s) => result.push("$" + s + "$"));
      lastIdx = m.index + m[0].length;
    }
    const after = text.slice(lastIdx).trim();
    if (after) after.split("\n").map((l) => l.trim()).filter(Boolean).forEach((l) => result.push(l));
    return result.filter(Boolean);
  }
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

// Plain-text version (strips $..$, [IMAGE:...], LaTeX commands) — used
// server-side to build clean <meta description> and JSON-LD text, where
// we want readable text, not raw LaTeX/markup.
export function toPlainText(text, maxLen = 160) {
  if (!text) return "";
  let t = text
    .replace(/\[IMAGE:[^\]]+\]/g, "")
    .replace(/\$\$?([^$]*)\$\$?/g, "$1")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}\\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (t.length > maxLen) t = t.slice(0, maxLen - 1).trim() + "…";
  return t;
}
