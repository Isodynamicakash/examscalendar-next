"use client";
import { MathJaxContext } from "better-react-mathjax";

const MATHJAX_CONFIG = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: { inlineMath: [["$", "$"]], displayMath: [["$$", "$$"]], packages: { "[+]": ["ams", "array"] } },
};

export default function MathJaxProvider({ children }) {
  return <MathJaxContext config={MATHJAX_CONFIG}>{children}</MathJaxContext>;
}
