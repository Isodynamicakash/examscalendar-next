// lib/units.js
//
// Class (11/12) and Unit grouping metadata for chapters, matching the
// standard NCERT syllabus split. Physics and Chemistry chapters are
// identical across jee-main / jee-advanced / neet, so this one mapping
// covers all three -- only Mathematics (JEE) and Biology (NEET) differ.
//
// NOTE: these unit boundaries follow standard NCERT/JEE conventions, not
// a direct copy of Marks' exact grouping (which I don't have full
// visibility into) -- review and adjust names/groupings if you want
// them to match Marks exactly.

const PHYSICS_UNITS = [
  { name: "Mechanics 1", chapters: ["physical-world", "units-and-measurements", "motion-straight-line", "motion-plane", "laws-of-motion"] },
  { name: "Mechanics 2", chapters: ["work-energy-power", "rotational-motion", "gravitation", "mechanical-properties-solids", "mechanical-properties-fluids"] },
  { name: "Heat & Thermodynamics", chapters: ["thermal-properties", "thermodynamics", "kinetic-theory"] },
  { name: "Oscillations & Waves", chapters: ["oscillations", "waves"] },
  { name: "Electrostatics", chapters: ["electric-charges-fields", "electrostatic-potential-capacitance"] },
  { name: "Current Electricity & Magnetism", chapters: ["current-electricity", "moving-charges-magnetism", "magnetism-matter", "em-induction", "alternating-current"] },
  { name: "Electromagnetic Waves", chapters: ["em-waves"] },
  { name: "Optics", chapters: ["ray-optics", "wave-optics"] },
  { name: "Modern Physics", chapters: ["dual-nature", "atoms", "nuclei", "semiconductor-electronics"] },
];

const PHYSICS_CLASS_11 = new Set([
  "physical-world", "units-and-measurements", "motion-straight-line", "motion-plane", "laws-of-motion",
  "work-energy-power", "rotational-motion", "gravitation", "mechanical-properties-solids", "mechanical-properties-fluids",
  "thermal-properties", "thermodynamics", "kinetic-theory", "oscillations", "waves",
]);

const CHEMISTRY_UNITS = [
  { name: "Physical Chemistry 1", chapters: ["basic-concepts", "structure-of-atom", "periodic-table", "chemical-bonding", "states-of-matter", "thermodynamics-chem", "equilibrium", "redox-reactions"] },
  { name: "Physical Chemistry 2", chapters: ["solid-state", "solutions", "electrochemistry", "chemical-kinetics", "surface-chemistry"] },
  { name: "Inorganic Chemistry", chapters: ["hydrogen", "s-block", "p-block-11", "p-block-12", "d-f-block", "coordination-compounds", "metallurgy"] },
  { name: "Organic Chemistry 1", chapters: ["organic-basics", "hydrocarbons", "haloalkanes-haloarenes"] },
  { name: "Organic Chemistry 2", chapters: ["alcohols-phenols-ethers", "aldehydes-ketones-acids", "amines", "biomolecules", "polymers"] },
  { name: "Environmental & Everyday Chemistry", chapters: ["environmental-chemistry", "chemistry-everyday-life"] },
];

const CHEMISTRY_CLASS_11 = new Set([
  "basic-concepts", "structure-of-atom", "periodic-table", "chemical-bonding", "states-of-matter",
  "thermodynamics-chem", "equilibrium", "redox-reactions", "hydrogen", "s-block", "p-block-11",
  "organic-basics", "hydrocarbons", "environmental-chemistry",
]);

const MATH_UNITS = [
  { name: "Sets, Relations & Functions", chapters: ["sets", "relations-functions", "relations-functions-12"] },
  { name: "Algebra", chapters: ["complex-numbers-quadratic", "linear-inequalities", "permutations-combinations", "binomial-theorem", "sequences-series", "matrices", "determinants", "mathematical-induction"] },
  { name: "Trigonometry", chapters: ["trigonometric-functions", "inverse-trig"] },
  { name: "Coordinate Geometry", chapters: ["straight-lines", "conic-sections"] },
  { name: "Vectors & 3D Geometry", chapters: ["intro-3d-geometry", "vector-algebra", "3d-geometry"] },
  { name: "Calculus", chapters: ["limits-derivatives", "continuity-differentiability", "application-derivatives", "integrals", "application-integrals", "differential-equations"] },
  { name: "Statistics & Probability", chapters: ["statistics", "probability-11", "probability-12"] },
  { name: "Mathematical Reasoning & LP", chapters: ["mathematical-reasoning", "linear-programming"] },
];

const MATH_CLASS_11 = new Set([
  "sets", "relations-functions", "trigonometric-functions", "mathematical-induction", "complex-numbers-quadratic",
  "linear-inequalities", "permutations-combinations", "binomial-theorem", "sequences-series", "straight-lines",
  "conic-sections", "intro-3d-geometry", "limits-derivatives", "mathematical-reasoning", "statistics", "probability-11",
]);

const BIOLOGY_UNITS = [
  { name: "Diversity in Living World", chapters: ["the-living-world", "biological-classification", "plant-kingdom", "animal-kingdom"] },
  { name: "Structural Organisation", chapters: ["morphology-flowering-plants", "anatomy-flowering-plants", "structural-organisation-animals"] },
  { name: "Cell Biology", chapters: ["cell-unit-of-life", "biomolecules", "cell-cycle-division"] },
  { name: "Plant Physiology", chapters: ["transport-in-plants", "mineral-nutrition", "photosynthesis", "respiration-plants", "plant-growth-development"] },
  { name: "Human Physiology", chapters: ["digestion-absorption", "breathing-exchange-gases", "body-fluids-circulation", "excretory-products", "locomotion-movement", "neural-control", "chemical-coordination"] },
  { name: "Reproduction", chapters: ["reproduction-organisms", "sexual-reproduction-flowering", "human-reproduction", "reproductive-health"] },
  { name: "Genetics & Evolution", chapters: ["inheritance-variation", "molecular-basis-inheritance", "evolution"] },
  { name: "Biology in Human Welfare", chapters: ["human-health-disease", "food-production", "microbes-human-welfare"] },
  { name: "Biotechnology", chapters: ["biotechnology-principles", "biotechnology-applications"] },
  { name: "Ecology", chapters: ["organisms-populations", "ecosystem", "biodiversity-conservation", "environmental-issues"] },
];

const BIOLOGY_CLASS_11 = new Set([
  "the-living-world", "biological-classification", "plant-kingdom", "animal-kingdom",
  "morphology-flowering-plants", "anatomy-flowering-plants", "structural-organisation-animals",
  "cell-unit-of-life", "biomolecules", "cell-cycle-division",
  "transport-in-plants", "mineral-nutrition", "photosynthesis", "respiration-plants", "plant-growth-development",
  "digestion-absorption", "breathing-exchange-gases", "body-fluids-circulation", "excretory-products",
  "locomotion-movement", "neural-control", "chemical-coordination",
]);

// subject slug -> { units, class11 } -- looked up by subject slug alone,
// since Physics/Chemistry are identical across exams.
const SUBJECT_META = {
  physics: { units: PHYSICS_UNITS, class11: PHYSICS_CLASS_11 },
  chemistry: { units: CHEMISTRY_UNITS, class11: CHEMISTRY_CLASS_11 },
  mathematics: { units: MATH_UNITS, class11: MATH_CLASS_11 },
  biology: { units: BIOLOGY_UNITS, class11: BIOLOGY_CLASS_11 },
};

// Returns the chapter list re-annotated with { unit, class } fields, and
// the unit list itself (for building the unit filter chips).
export function getChaptersWithUnits(subjectSlug, chapters) {
  const meta = SUBJECT_META[subjectSlug];
  if (!meta) return { chapters, units: [] };

  const chapterToUnit = {};
  meta.units.forEach((u) => u.chapters.forEach((slug) => { chapterToUnit[slug] = u.name; }));

  const annotated = chapters.map((ch) => ({
    ...ch,
    unit: chapterToUnit[ch.slug] || "Other",
    class: meta.class11.has(ch.slug) ? "11" : "12",
  }));

  return { chapters: annotated, units: meta.units.map((u) => u.name) };
}
