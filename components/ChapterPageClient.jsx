"use client";
/**
 * ChapterPageClient.jsx -- routes between the overview and the question
 * list, both of which live under the same URL /pyq/[exam]/[subject]/[chapter].
 *
 *   ?view=overview  -> ChapterOverview (Marks-style landing card grid)
 *   ?view=list      -> ChapterQuestionList (Marks-style flat list w/ filters)
 *   (no view param) -> ChapterQuestionList by default (SEO deep links get
 *                       crawlable question content immediately)
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChapterOverview from "./ChapterOverview";
import ChapterQuestionList from "./ChapterQuestionList";
import { DARK, LIGHT } from "@/lib/questionTheme";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ChapterPageClient({
  exam, subject, chapter, topic, view,
  subjectName, chapterName, topicName, chapterTopics, examLabel,
}) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("ec_theme") : null;
    if (saved !== null) setIsDark(saved === "dark");
  }, []);
  const C = isDark ? DARK : LIGHT;

  const subjectObj = { slug: subject, name: subjectName };
  const chapterObj = { slug: chapter, name: chapterName, topics: chapterTopics };

  if (view === "overview") {
    return (
      <ChapterOverview
        examSlug={exam}
        examLabel={examLabel}
        subject={subjectObj}
        chapter={chapterObj}
        apiBase={API_URL}
        C={C}
        onViewAll={() => { router.push(`/pyq/${exam}/${subject}/${chapter}?view=list`); router.refresh(); }}
        onSelectTopic={(topicSlug) => { router.push(`/pyq/${exam}/${subject}/${chapter}?topic=${topicSlug}&view=list`); router.refresh(); }}
        onSelectDifficulty={(d) => { router.push(`/pyq/${exam}/${subject}/${chapter}?view=list&difficulty=${d}`); router.refresh(); }}
        onSelectType={(t) => { router.push(`/pyq/${exam}/${subject}/${chapter}?view=list&question_type=${t}`); router.refresh(); }}
      />
    );
  }

  return (
    <ChapterQuestionList
      examSlug={exam}
      examLabel={examLabel}
      chapterName={chapterName}
      topicName={topicName}
      subjectSlug={subject}
      chapterSlug={chapter}
      topicSlug={topic}
      apiBase={API_URL}
      C={C}
    />
  );
}
