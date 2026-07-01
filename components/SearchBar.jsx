"use client";
/**
 * SearchBar.jsx
 * 
 * Fuzzy search across all chapters + topics for the current exam.
 * Selecting a result sets active.chapter (+ active.topic) and triggers a DB fetch.
 * 
 * Props:
 *   examSlug  {string}   — current exam slug, used to scope search to that exam's taxonomy
 *   onSelect  {fn}       — called with { subject, chapter, topic } slugs when user picks a result
 *   C         {object}   — theme colours
 * 
 * Usage inside Sidebar:
 *   <SearchBar examSlug={examSlug} onSelect={handleSearchSelect} C={C} />
 */

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { EXAM_TAXONOMY } from "@/lib/taxonomy";

const SLUG_ALIAS = { "jee-mains":"jee-main", "jee-adv":"jee-advanced" };
const normalizeSlug = s => SLUG_ALIAS[(s||"").toLowerCase()] || (s||"");

// ── Build flat search index for one exam ──────────────────────────────────────
function buildIndex(examSlug) {
  const exam = EXAM_TAXONOMY[normalizeSlug(examSlug)];
  if (!exam) return [];

  const entries = [];
  for (const subj of exam.subjects) {
    for (const ch of subj.chapters) {
      // Chapter entry
      entries.push({
        type:           "chapter",
        name:           ch.name,
        nameLower:      ch.name.toLowerCase(),
        slug:           ch.slug,
        subject:        subj.name,
        subject_slug:   subj.slug,
        chapter:        ch.name,
        chapter_slug:   ch.slug,
        topic:          null,
        topic_slug:     null,
        // Pre-split for word-start matching
        words:          ch.name.toLowerCase().split(/[\s\-–—,()]+/).filter(Boolean),
      });

      // Topic entries
      for (const tp of ch.topics) {
        entries.push({
          type:           "topic",
          name:           tp.name,
          nameLower:      tp.name.toLowerCase(),
          slug:           tp.slug,
          subject:        subj.name,
          subject_slug:   subj.slug,
          chapter:        ch.name,
          chapter_slug:   ch.slug,
          topic:          tp.name,
          topic_slug:     tp.slug,
          words:          tp.name.toLowerCase().split(/[\s\-–—,()]+/).filter(Boolean),
        });
      }
    }
  }
  return entries;
}

// ── Fuzzy search with priority scoring ───────────────────────────────────────
function search(query, index, limit = 8) {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 1) return [];

  const scored = [];
  for (const entry of index) {
    let score = null;

    if (entry.nameLower === q) {
      score = 0;                               // exact match
    } else if (entry.nameLower.startsWith(q)) {
      score = 1;                               // name starts with query
    } else if (entry.words.some(w => w.startsWith(q))) {
      score = 2;                               // a word starts with query
    } else if (entry.nameLower.includes(q)) {
      score = 3;                               // anywhere in name
    }

    if (score !== null) {
      scored.push({ score, entry });
    }
  }

  // Sort: score ASC, then chapters before topics, then alpha
  scored.sort((a, b) =>
    a.score !== b.score ? a.score - b.score :
    a.entry.type !== b.entry.type ? (a.entry.type === "chapter" ? -1 : 1) :
    a.entry.name.localeCompare(b.entry.name)
  );

  return scored.slice(0, limit).map(s => s.entry);
}

// ── Highlight matching part of result name ────────────────────────────────────
function Highlight({ text, query, C }) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark style={{
        background: C.accent + "33",
        color: C.accentLight,
        borderRadius: 3,
        padding: "0 1px",
        fontWeight: 800,
      }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

// ── SearchBar component ───────────────────────────────────────────────────────
export default function SearchBar({ examSlug, onSelect, C }) {
  const [query,     setQuery]     = useState("");
  const [results,   setResults]   = useState([]);
  const [open,      setOpen]      = useState(false);
  const [cursor,    setCursor]    = useState(-1);   // keyboard navigation index

  const inputRef    = useRef(null);
  const dropdownRef = useRef(null);

  // Rebuild index only when exam changes
  const index = useMemo(() => buildIndex(examSlug), [examSlug]);

  // Run search whenever query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      setCursor(-1);
      return;
    }
    const hits = search(query, index);
    setResults(hits);
    setOpen(hits.length > 0);
    setCursor(-1);
  }, [query, index]);

  // Close on outside click
  useEffect(() => {
    const fn = (e) => {
      if (
        !inputRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setOpen(false);
        setCursor(-1);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleSelect = useCallback((entry) => {
    // Set active filters and trigger fetch
    onSelect({
      subject:      entry.subject_slug,
      chapter:      entry.chapter_slug,
      topic:        entry.topic_slug,     // null for chapter results
    });
    setQuery("");
    setResults([]);
    setOpen(false);
    setCursor(-1);
    inputRef.current?.blur();
  }, [onSelect]);

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor(c => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor(c => Math.max(c - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (cursor >= 0 && cursor < results.length) {
        handleSelect(results[cursor]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setCursor(-1);
      inputRef.current?.blur();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (cursor >= 0 && dropdownRef.current) {
      const item = dropdownRef.current.querySelector(`[data-idx="${cursor}"]`);
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [cursor]);

  return (
    <div style={{ position: "relative", padding: "10px 12px 8px" }}>
      {/* Input */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: C.surface,
        border: `1.5px solid ${open ? C.accent : C.border}`,
        borderRadius: 10,
        padding: "7px 10px",
        transition: "border-color .15s",
      }}>
        {/* Search icon */}
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, color: open ? C.accentLight : C.textDim }}>
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="2"/>
          <path d="M13 13l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && results.length && setOpen(true)}
          placeholder="Search chapters & topics…"
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            fontSize: 12.5,
            color: C.text,
            fontFamily: "inherit",
            minWidth: 0,
          }}
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={() => { setQuery(""); setResults([]); setOpen(false); inputRef.current?.focus(); }}
            style={{
              background: "none", border: "none",
              color: C.textDim, cursor: "pointer",
              fontSize: 14, padding: 0, lineHeight: 1,
              flexShrink: 0,
            }}
          >×</button>
        )}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "calc(100% - 2px)",
            left: 12,
            right: 12,
            zIndex: 600,
            background: C.bgCard,
            border: `1.5px solid ${C.accent}55`,
            borderRadius: 12,
            boxShadow: C.shadow,
            maxHeight: 320,
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: `${C.border} transparent`,
          }}
        >
          {results.map((entry, i) => {
            const isChapter = entry.type === "chapter";
            const active    = cursor === i;

            return (
              <div
                key={entry.type + entry.chapter_slug + (entry.topic_slug || "")}
                data-idx={i}
                onMouseDown={(e) => { e.preventDefault(); handleSelect(entry); }}
                onMouseEnter={() => setCursor(i)}
                style={{
                  padding: isChapter ? "9px 12px" : "7px 12px 7px 28px",
                  cursor: "pointer",
                  background: active
                    ? C.accent + "18"
                    : "transparent",
                  borderBottom: i < results.length - 1 ? `1px solid ${C.border}` : "none",
                  transition: "background .1s",
                }}
              >
                {/* Type badge + Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  {isChapter ? (
                    <span style={{
                      fontSize: 10, fontWeight: 800,
                      color: C.isDark ? "#fbbf24" : "#92400e",
                      background: C.isDark ? "#2d1f00" : "#fef3c7",
                      border: `1px solid ${C.isDark ? "#fbbf2433" : "#f59e0b44"}`,
                      borderRadius: 4, padding: "1px 5px",
                      flexShrink: 0, letterSpacing: .3,
                    }}>CH</span>
                  ) : (
                    <span style={{
                      fontSize: 10, fontWeight: 800,
                      color: C.isDark ? "#34d399" : "#065f46",
                      background: C.isDark ? "#0d2818" : "#d1fae5",
                      border: `1px solid ${C.isDark ? "#34d39933" : "#10b98144"}`,
                      borderRadius: 4, padding: "1px 5px",
                      flexShrink: 0, letterSpacing: .3,
                    }}>TP</span>
                  )}

                  <span style={{
                    fontSize: 13,
                    fontWeight: isChapter ? 700 : 500,
                    color: active ? C.accentLight : C.text,
                    lineHeight: 1.35,
                  }}>
                    <Highlight text={entry.name} query={query} C={C} />
                  </span>
                </div>

                {/* Breadcrumb: Subject › Chapter (only for topics) */}
                {!isChapter && (
                  <div style={{
                    fontSize: 11, color: C.textDim, marginTop: 2,
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <span>{entry.subject}</span>
                    <span style={{ color: C.textDim }}>›</span>
                    <span>{entry.chapter}</span>
                  </div>
                )}

                {/* Breadcrumb for chapters: Subject */}
                {isChapter && (
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>
                    {entry.subject}
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer hint */}
          <div style={{
            padding: "6px 12px",
            fontSize: 10, color: C.textDim,
            borderTop: `1px solid ${C.border}`,
            display: "flex", gap: 10,
          }}>
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </div>
      )}
    </div>
  );
}
