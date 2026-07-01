"use client";
import { MathJax } from "better-react-mathjax";
import { resolveImg, renderMath, splitSolutionLines } from "@/lib/mathHelpers";

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-e99a99db6bcb44eeb1b2e6db8f4cd626.r2.dev";

export default function MathContent({ text, block = false, style = {} }) {
  if (!text) return null;
  const processed = renderMath(text);

  const renderPart = (part, i) => {
    const m = part.match(/\[IMAGE:([^\]]+)\]/);
    if (m)
      return (
        <img
          key={i}
          src={resolveImg(m[1], R2_BASE)}
          alt="diagram"
          style={{ width: "auto", height: "auto", maxWidth: "min(100%, 360px)", maxHeight: 200, display: "block", margin: "10px auto", borderRadius: 8, objectFit: "contain" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      );
    return part ? <MathJax key={i} inline dynamic>{part}</MathJax> : null;
  };

  if (block) {
    const lines = splitSolutionLines(processed);
    if (lines.length > 1)
      return (
        <div style={{ lineHeight: 1.9, ...style }}>
          {lines.map((line, li) => (
            <div key={li} style={{ marginBottom: 6 }}>
              {line.split(/(\[IMAGE:[^\]]+\])/).map(renderPart)}
            </div>
          ))}
        </div>
      );
  }
  return <span style={{ lineHeight: 1.85, ...style }}>{processed.split(/(\[IMAGE:[^\]]+\])/).map(renderPart)}</span>;
}
