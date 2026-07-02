"use client";
/**
 * ChapterBrowsePage.jsx
 *
 * The "choose a chapter" screen -- matches the Marks layout: subject
 * tabs on the left, a filter bar (Class / Units / Sort) up top, chapter
 * cards below. No sidebar-accordion, no login-gated features (Not
 * Started / Weak Chapter etc. deliberately excluded).
 *
 * Shown whenever no chapter is selected yet. Once a chapter IS picked,
 * QuestionBrowserClient switches to the (separately designed, TBD)
 * chapter-detail view.
 */
import { useState, useMemo } from "react";
import { EXAM_TAXONOMY } from "@/lib/taxonomy";
import { getChaptersWithUnits } from "@/lib/units";

const SLUG_ALIAS = { "jee-mains": "jee-main", "jee-adv": "jee-advanced" };
function normalizeExamSlug(s) {
  const slug = (s || "").trim().toLowerCase();
  return SLUG_ALIAS[slug] || slug;
}

function FilterModal({ open, onClose, sortBy, setSortBy, C }) {
  if (!open) return null;
  const options = [
    ["default", "Default"],
    ["az", "Alphabetical Order (A - Z)"],
    ["za", "Alphabetical Order (Z - A)"],
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 480, margin: "0 auto", background: C.bgCard, borderRadius: "18px 18px 0 0", padding: "20px 20px 24px", maxHeight: "70vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: C.text }}>Sort By</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
        {options.map(([val, label]) => (
          <button
            key={val}
            onClick={() => setSortBy(val)}
            style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "12px 4px", background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: 14 }}
          >
            <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${sortBy === val ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {sortBy === val && <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.accent }} />}
            </span>
            {label}
          </button>
        ))}
        <button onClick={onClose} style={{ marginTop: 16, width: "100%", padding: "13px", borderRadius: 10, border: "none", background: C.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          Show Results
        </button>
      </div>
    </div>
  );
}

function Dropdown({ label, value, options, onChange, C }) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label || label;
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
      >
        {selectedLabel} <span style={{ fontSize: 10, color: C.textDim }}>▾</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 50, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: C.shadow, minWidth: 180, maxHeight: 280, overflowY: "auto" }}>
            {options.map((o) => (
              <button
                key={o.value}
                onClick={() => { onChange(o.value); setOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", background: value === o.value ? C.accentBg : "transparent", border: "none", color: value === o.value ? C.accentLight : C.text, fontSize: 13, fontWeight: value === o.value ? 700 : 400, cursor: "pointer" }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ChapterBrowsePage({ examSlug, examLabel, activeSubject, onSelectSubject, onSelectChapter, C }) {
  const [classFilter, setClassFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [modalOpen, setModalOpen] = useState(false);

  const examData = EXAM_TAXONOMY[normalizeExamSlug(examSlug)] || { subjects: [] };
  const subject = examData.subjects.find((s) => s.slug === activeSubject) || examData.subjects[0];

  const { chapters: annotated, units: unitList } = useMemo(
    () => (subject ? getChaptersWithUnits(subject.slug, subject.chapters) : { chapters: [], units: [] }),
    [subject]
  );

  const filtered = useMemo(() => {
    let list = annotated.filter(
      (ch) => (classFilter === "all" || ch.class === classFilter) && (unitFilter === "all" || ch.unit === unitFilter)
    );
    if (sortBy === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "za") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [annotated, classFilter, unitFilter, sortBy]);

  const classOptions = [{ value: "all", label: "All Classes" }, { value: "11", label: "Class 11" }, { value: "12", label: "Class 12" }];
  const unitOptions = [{ value: "all", label: "All Units" }, ...unitList.map((u) => ({ value: u, label: u }))];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px 60px" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Subject tabs -- simple vertical nav, not a filter accordion */}
        <div style={{ width: 180, flexShrink: 0, display: "flex", flexDirection: "column", gap: 6, position: "sticky", top: 70 }}>
          {examData.subjects.map((s) => (
            <button
              key={s.slug}
              onClick={() => onSelectSubject(s.slug)}
              style={{
                textAlign: "left", padding: "12px 14px", borderRadius: 10, fontSize: 14, fontWeight: 700,
                border: `1px solid ${s.slug === subject?.slug ? C.accent : C.border}`,
                background: s.slug === subject?.slug ? C.accentBg : "transparent",
                color: s.slug === subject?.slug ? C.accentLight : C.text, cursor: "pointer",
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>{subject?.name} PYQs</h1>
            <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>Chapter-wise Collection of {subject?.name} PYQs</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <button onClick={() => setModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 20, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              ⚙ Filter
            </button>
            <Dropdown label="All Classes" value={classFilter} options={classOptions} onChange={setClassFilter} C={C} />
            {unitList.length > 0 && <Dropdown label="All Units" value={unitFilter} options={unitOptions} onChange={setUnitFilter} C={C} />}
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 12, color: C.textMuted }}>Showing {filtered.length} chapters</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((ch) => (
              <button
                key={ch.slug}
                onClick={() => onSelectChapter(ch.slug)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left", padding: "16px 18px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bgCard, cursor: "pointer" }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{ch.name}</div>
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 3 }}>{ch.unit} &middot; Class {ch.class}</div>
                </div>
                <span style={{ fontSize: 18, color: C.textDim }}>›</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 0", color: C.textDim, fontSize: 13 }}>No chapters match this filter</div>
            )}
          </div>
        </div>
      </div>

      <FilterModal open={modalOpen} onClose={() => setModalOpen(false)} sortBy={sortBy} setSortBy={setSortBy} C={C} />
    </div>
  );
}
