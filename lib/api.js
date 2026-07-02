// lib/api.js
// Server-side fetch helpers. These run on the server (in Server Components),
// hit your EXISTING FastAPI backend — no backend changes needed at all.
// Uses your real endpoints from routers/questions.py.

const API_BASE = process.env.API_BASE_URL || "http://localhost:8000";

// Mirrors your DB `exams` table exactly (copied from QuestionBrowser.jsx's
// EXAM_SLUG_TO_ID) — no API call needed to resolve slug -> numeric id.
export const EXAM_SLUG_TO_ID = {
  "jee-main": 1,
  "jee-advanced": 2,
  neet: 3,
  "ssc-cgl": 6,
};

// How often a page is allowed to go "stale" before Next.js re-fetches it
// on the next visit (ISR). 1 hour is a safe default — lower it if you
// want new questions to show up faster, or wire up on-demand revalidation
// from your admin upload flow later (revalidatePath()).
const REVALIDATE_SECONDS = 3600;

async function safeFetchJson(url, opts = {}) {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      ...opts,
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      console.error(`API error ${res.status} for ${url}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    // Network failure (backend unreachable, DNS, etc.) -- log and
    // degrade gracefully instead of crashing the page/build. The page
    // itself decides how to handle a null result (notFound(), empty
    // state, etc.)
    console.error(`Fetch failed for ${url}:`, err.message);
    return null;
  }
}

// GET /api/questions/{slug}  — full question (text, options, tags, images)
export function getQuestion(slug) {
  return safeFetchJson(`${API_BASE}/api/questions/${encodeURIComponent(slug)}`);
}

// GET /api/questions/{slug}/answer — correct option + solution + images
export function getAnswer(slug) {
  return safeFetchJson(`${API_BASE}/api/questions/${encodeURIComponent(slug)}/answer`);
}

// Fetch question + answer together, in parallel — both land in the
// server-rendered HTML that Google (and users) see immediately.
export async function getQuestionWithAnswer(slug) {
  const [question, answer] = await Promise.all([getQuestion(slug), getAnswer(slug)]);
  return { question, answer };
}

// GET /api/questions?exam_id=...&subject=...&chapter=...&limit=...&offset=...
export function listQuestions({ examSlug, subject, chapter, topic, year, shift, difficulty, question_type, limit = 20, offset = 0 } = {}) {
  const params = new URLSearchParams();
  const examId = examSlug ? EXAM_SLUG_TO_ID[examSlug] : undefined;
  if (examId) params.set("exam_id", examId);
  if (subject) params.append("subject", subject);
  if (chapter) params.append("chapter", chapter);
  if (topic) params.append("topic", topic);
  (year || []).forEach((v) => params.append("year", v));
  (shift || []).forEach((v) => params.append("shift", v));
  (difficulty || []).forEach((v) => params.append("difficulty", v));
  (question_type || []).forEach((v) => params.append("question_type", v));
  params.set("limit", limit);
  params.set("offset", offset);
  return safeFetchJson(`${API_BASE}/api/questions?${params.toString()}`);
}

// GET /api/questions/filters?exam_id=...  — years/shifts/dates for an exam
export function getFilters(examId) {
  const params = examId ? `?exam_id=${examId}` : "";
  return safeFetchJson(`${API_BASE}/api/questions/filters${params}`);
}

// Lightweight ordered slug list for a chapter -- used for Previous/Next
// navigation on the single-question page. Assumes most chapters have
// under a few hundred questions; if a chapter genuinely has more,
// Previous/Next will only work within this first batch (documented
// limitation, fine for typical PYQ chapter sizes).
export async function getChapterQuestionSlugs({ examSlug, subject, chapter, topic, year, shift, difficulty, question_type }) {
  const data = await listQuestions({
    examSlug, subject, chapter, topic,
    year: year ? [year] : undefined,
    shift: shift ? [shift] : undefined,
    difficulty: difficulty ? [difficulty] : undefined,
    question_type: question_type ? [question_type] : undefined,
    limit: 300, offset: 0,
  });
  return (data?.questions || []).map((q) => q.slug);
}
