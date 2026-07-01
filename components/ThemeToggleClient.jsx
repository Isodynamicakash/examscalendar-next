"use client";
import { useState, useEffect } from "react";

export default function ThemeToggleClient() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("ec_theme");
    if (saved) setIsDark(saved === "dark");
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("ec_theme", next ? "dark" : "light");
      // Full reload keeps this simple for now — same effective UX,
      // avoids needing a global theme context wired through every page.
      window.location.reload();
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid #242840", background: "#1e2335", cursor: "pointer", fontSize: 15 }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
