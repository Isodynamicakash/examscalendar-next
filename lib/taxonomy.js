// lib/taxonomy.js
//
// This wraps your REAL taxonomy-data.js (copied 1:1 from your
// EXAM_TAXONOMY.js -- 328 chapters, 2755 topics, nothing changed).
// These are just helper functions so the Next.js pages don't need to
// know the raw data shape.

import { EXAM_TAXONOMY, EXAM_LABEL } from "./taxonomy-data";

export { EXAM_TAXONOMY, EXAM_LABEL };

export function getExam(examSlug) {
  return EXAM_TAXONOMY[examSlug] || null;
}

export function getExamLabel(examSlug) {
  return EXAM_LABEL[examSlug] || EXAM_TAXONOMY[examSlug]?.name || examSlug;
}

export function getSubject(examSlug, subjectSlug) {
  const exam = getExam(examSlug);
  return exam?.subjects.find((s) => s.slug === subjectSlug) || null;
}

export function getChapter(examSlug, subjectSlug, chapterSlug) {
  const exam = getExam(examSlug);
  const subject = exam?.subjects.find((s) => s.slug === subjectSlug);
  const chapter = subject?.chapters.find((c) => c.slug === chapterSlug);
  return { exam, subject, chapter };
}

// Every exam slug -- used by generateStaticParams() on /pyq/[exam]
export function getAllExamSlugs() {
  return Object.keys(EXAM_TAXONOMY);
}

// Every {exam, subject, chapter} combo -- used by generateStaticParams()
// on /pyq/[exam]/[subject]/[chapter]. This pre-builds all chapter pages
// at build time. Fast, free, zero DB hits for the page shell -- only the
// question LIST inside each page hits your live API.
export function getAllChapterParams() {
  const out = [];
  for (const [examSlug, exam] of Object.entries(EXAM_TAXONOMY)) {
    for (const subject of exam.subjects || []) {
      for (const chapter of subject.chapters || []) {
        out.push({ exam: examSlug, subject: subject.slug, chapter: chapter.slug });
      }
    }
  }
  return out;
}
