import { notFound } from "next/navigation";
import { listQuestions } from "@/lib/api";
import { getChapter, getExamLabel } from "@/lib/taxonomy";
import QuestionBrowserClient from "@/components/QuestionBrowserClient";

const PAGE_SIZE = 10; // matches QuestionBrowserClient's PAGE_SIZE

// NOTE: deliberately NOT using generateStaticParams here. With 328
// chapters, eagerly building all of them would require your live
// backend to be reachable during the Vercel build itself -- fragile.
// Instead these render on-demand on first visit/crawl and get cached
// via the `revalidate` setting in lib/api.js (ISR). Same end result
// (fast, cached, crawlable) without a build-time backend dependency.

export async function generateMetadata({ params }) {
  const { exam, subject, chapter } = await params;
  const { subject: subjectData, chapter: chapterData } = getChapter(exam, subject, chapter);
  if (!chapterData) return {};
  const examLabel = getExamLabel(exam);
  const title = `${chapterData.name} PYQ — ${subjectData?.name} | ${examLabel}`;
  const description = `Previous year questions for ${chapterData.name} (${subjectData?.name}, ${examLabel}) with detailed solutions, chapter-wise, year-wise. Free on ExamsCalendar.`;
  return {
    title,
    description,
    alternates: { canonical: `/pyq/${exam}/${subject}/${chapter}` },
  };
}

export default async function ChapterPage({ params, searchParams }) {
  const { exam, subject, chapter } = await params;
  const sp = await searchParams;
  const { chapter: chapterData } = getChapter(exam, subject, chapter);
  if (!chapterData) notFound();

  // Fetch the FIRST PAGE of real questions server-side. This is what
  // lands in the crawlable HTML response -- then QuestionBrowserClient
  // hydrates on top of it and behaves exactly like your current app
  // (live filtering, search, pagination, everything) from that point on.
  const data = await listQuestions({ examSlug: exam, subject, chapter, limit: PAGE_SIZE, offset: 0 });

  // ?topic=... and ?view=... come from in-app navigation (clicking a
  // chapter or topic in ChapterBrowsePage/ChapterOverview). Direct visits
  // (e.g. from Google) have neither, and default to showing the flat
  // question list immediately -- that's the crawlable content this page
  // exists for. In-app clicks explicitly request the Overview screen.
  const topic = sp?.topic || null;
  const view = sp?.view || null;

  return (
    <QuestionBrowserClient
      // Forces a genuinely fresh component instance on chapter/topic/view
      // changes. Without this, a query-param-only navigation (e.g. picking
      // a topic) keeps the same component instance alive, and its internal
      // state -- seeded once from initialActive/initialView on first mount
      // -- never re-syncs to the new URL. A manual refresh "fixed" it only
      // because that forces a real remount; this key does the same thing
      // automatically on every click.
      key={`${subject}-${chapter}-${topic || "none"}-${view || "default"}`}
      examId={exam}
      initialActive={{ subject, chapter, topic, year: [], shift: [], difficulty: [], question_type: [], exam_date: [] }}
      initialView={view}
      initialQuestions={data?.questions || []}
      initialTotal={data?.total || 0}
    />
  );
}
