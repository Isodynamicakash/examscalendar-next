import { getAllChapterParams, getAllExamSlugs } from "@/lib/taxonomy";

// This is what actually gets your questions DISCOVERED, not just
// crawlable. Submit /sitemap.xml to Google Search Console once deployed.
//
// NOTE: listing every individual question here at scale needs a
// dedicated lightweight endpoint on your FastAPI backend, e.g.:
//   GET /api/sitemap  ->  [{ slug, exam, subject, chapter, updated_at }, ...]
// paginated/streamed for thousands of rows. For now this generates the
// exam/subject/chapter tier (which is what most of your ranking value
// comes from anyway) — wire the question-level loop in once that
// endpoint exists (marked TODO below).

export const dynamic = "force-static";

export default async function sitemap() {
  const base = process.env.SITE_URL || "https://www.examscalendar.com";
  const now = new Date();
  const staticEntries = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];
  const examEntries = getAllExamSlugs().map((exam) => ({
    url: `${base}/pyq/${exam}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));
  const chapterEntries = getAllChapterParams().map(({ exam, subject, chapter }) => ({
    url: `${base}/pyq/${exam}/${subject}/${chapter}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  // TODO once you add GET /api/sitemap on the backend:
  // const API_BASE = process.env.API_BASE_URL || "http://localhost:8000";
  // const res = await fetch(`${API_BASE}/api/sitemap`);
  // const rows = await res.json();
  // const questionEntries = rows.map((r) => ({
  //   url: `${base}/pyq/${r.exam}/${r.subject}/${r.chapter}/${r.slug}`,
  //   lastModified: r.updated_at,
  //   changeFrequency: "monthly",
  //   priority: 0.6,
  // }));
  return [...staticEntries, ...examEntries, ...chapterEntries];
}
