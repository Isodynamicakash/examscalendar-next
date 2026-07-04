import { notFound } from "next/navigation";
import { getChapter, getExamLabel } from "@/lib/taxonomy";
import ChapterPageClient from "@/components/ChapterPageClient";

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
  const { subject: subjectData, chapter: chapterData } = getChapter(exam, subject, chapter);
  if (!chapterData) notFound();

  const topic = sp?.topic || null;
  const view = sp?.view || null;

  const topicData = topic ? (chapterData.topics || []).find((t) => t.slug === topic) : null;

  return (
    <ChapterPageClient
      key={`${subject}-${chapter}-${topic || "none"}-${view || "default"}`}
      exam={exam}
      subject={subject}
      chapter={chapter}
      topic={topic}
      view={view}
      subjectName={subjectData?.name}
      chapterName={chapterData?.name}
      topicName={topicData?.name}
      chapterTopics={chapterData?.topics || []}
      examLabel={getExamLabel(exam)}
    />
  );
}
