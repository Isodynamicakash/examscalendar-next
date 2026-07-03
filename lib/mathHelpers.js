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

// Finds the position right after the matching \end{array} for a
// \begin{array} whose body starts at `searchFrom`, correctly handling
// nested \begin{array}...\end{array} blocks (e.g. a table used just to
// wrap text inside a cell of an outer table) by tracking nesting depth
// instead of matching the first \end{array} found.
function findMatchingArrayEnd(text, searchFrom) {
  const openTag = "\\begin{array}";
  const closeTag = "\\end{array}";
  let depth = 1;
  let i = searchFrom;
  while (depth > 0) {
    const nextOpen = text.indexOf(openTag, i);
    const nextClose = text.indexOf(closeTag, i);
    if (nextClose === -1) return -1; // unbalanced -- bail out safely
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + openTag.length;
    } else {
      depth--;
      i = nextClose + closeTag.length;
    }
  }
  return i;
}

// Converts \hline-separated rows into MathJax array rows. Cells that
// themselves contain a nested \begin{array}...\end{array} (already
// converted by the outer pass) are left as-is instead of being
// re-wrapped in \text{} -- they're already valid math.
function formatArrayRows(body) {
  const parts = body.split("\\hline");
  const rows = [];
  parts.forEach((part) => {
    const seg = part.split("\n").map((l) => l.trim()).filter(Boolean).join(" ").replace(/\\\\$/, "").trim();
    rows.push("\\hline");
    if (seg) {
      rows.push(
        seg
          .split("&")
          .map((c) => {
            const s = c.trim();
            if (s.includes("\\begin{array}")) return s; // nested table, leave alone
            const cleaned = s.replace(/\\multicolumn\{\d+\}\{[^}]*\}\{([^}]*)\}/g, "$1").trim();
            const m = cleaned.match(/^\$([\s\S]+)\$$/);
            if (m) return m[1];
            if (!cleaned || cleaned.startsWith("\\") || /^-?[\d.]+$/.test(cleaned)) return cleaned;
            return `\\text{${cleaned}}`;
          })
          .join(" & ") + " \\\\"
      );
    }
  });
  return rows.join("\n");
}

// Walks the text left to right, converting every \begin{array}{fmt}...
// \end{array} block it finds (outermost first, nested ones handled
// recursively via formatArrayRows leaving them untouched -- they get
// converted on their own pass since this function keeps scanning after
// each match). Only wraps a block in $$...$$ if it wasn't already
// inside a $$...$$ pair in the source text (avoids nesting $$ inside $$,
// which is invalid and was the second thing breaking your table).
function convertArrayBlocks(text) {
  let result = "";
  let i = 0;
  while (i < text.length) {
    const openIdx = text.indexOf("\\begin{array}", i);
    if (openIdx === -1) {
      result += text.slice(i);
      break;
    }
    result += text.slice(i, openIdx);

    const fmtMatch = text.slice(openIdx).match(/^\\begin\{array\}\{([^}]*)\}/);
    if (!fmtMatch) {
      // Malformed (no format spec) -- copy one char and keep scanning
      // rather than looping forever or crashing.
      result += text[openIdx];
      i = openIdx + 1;
      continue;
    }

    const bodyStart = openIdx + fmtMatch[0].length;
    const endPos = findMatchingArrayEnd(text, bodyStart);
    if (endPos === -1) {
      // Unbalanced tags in the source data -- output the rest as-is
      // rather than risk an infinite loop or corrupting the text further.
      result += text.slice(openIdx);
      break;
    }

    const bodyEnd = endPos - "\\end{array}".length;
    // Strip any stray "$$" that landed inside the body -- a table body
    // should never legitimately contain one (it's a leftover artifact
    // from the same mismatched-tag error in the source data, e.g.
    // "\end{tabular}$$" where the $$ was meant to close the outer math
    // block but got orphaned inside a nested table instead).
    const body = text.slice(bodyStart, bodyEnd).replace(/\$\$/g, "");
    const fmt = fmtMatch[1];
    const convertedBody = formatArrayRows(body);

    const alreadyInMath = text.slice(Math.max(0, openIdx - 2), openIdx) === "$$";
    result += alreadyInMath
      ? `\\begin{array}{${fmt}}\n${convertedBody}\n\\end{array}`
      : `$$\\begin{array}{${fmt}}\n${convertedBody}\n\\end{array}$$`;

    i = endPos;
  }
  return result;
}

export function renderMath(text) {
  if (!text) return null;
  let t = text;

  // Normalize tabular -> array everywhere BEFORE parsing. This fixes
  // two real problems at once: (1) mismatched open/close tags like
  // \begin{array}...\end{tabular} in the source data, and (2) nested
  // \begin{tabular} blocks used just for text-wrapping inside a cell --
  // both become consistent \begin{array}...\end{array} pairs that the
  // nesting-aware parser below can then handle correctly.
  t = t.replace(/\\begin\{tabular\}/g, "\\begin{array}").replace(/\\end\{tabular\}/g, "\\end{array}");

  if (t.includes("\\begin{array}")) {
    t = convertArrayBlocks(t);
  }

  // Safety net: some source questions have tables with genuinely
  // MISSING tags (more \end{array} than \begin{array} in the raw data,
  // not just mismatched names) -- no parser can correctly reconstruct
  // where a missing tag was supposed to go, since that information
  // isn't in the data. When this happens, convertArrayBlocks bails out
  // and leaves the unmatched tags as literal text. Only trigger this
  // fallback when counts are actually unbalanced -- a successfully
  // converted table also legitimately contains begin/end array tags,
  // and we must not strip those.
  const openCount = (t.match(/\\begin\{array\}/g) || []).length;
  const closeCount = (t.match(/\\end\{array\}/g) || []).length;
  if (openCount !== closeCount) {
    t = t
      .replace(/\\begin\{array\}(\{[^}]*\})?/g, "")
      .replace(/\\end\{array\}/g, "")
      .replace(/\$\$/g, "")
      .replace(/\\hline/g, "")
      .replace(/&/g, " — ")
      .replace(/\\\\/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{2,}/g, "\n")
      .trim();
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
