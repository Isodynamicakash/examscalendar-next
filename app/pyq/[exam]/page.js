import { notFound } from "next/navigation";
import { getExam, getExamLabel, getAllExamSlugs } from "@/lib/taxonomy";
import QuestionBrowserClient from "@/components/QuestionBrowserClient";

// Still statically known at build time (which exam slugs exist) even
// though the page itself is now the full interactive client experience.
export async function generateStaticParams() {
  return getAllExamSlugs().map((exam) => ({ exam }));
}

export async function generateMetadata({ params }) {
  const { exam } = await params;
  const examLabel = getExamLabel(exam) || exam;
  const title = `${examLabel} Previous Year Questions (PYQs) with Solutions | ExamsCalendar`;
  const description = `Browse ${examLabel} previous year questions by subject and chapter, with detailed solutions. Free, no login required.`;
  return { title, description, alternates: { canonical: `/pyq/${exam}` } };
}

export default async function ExamPage({ params }) {
  const { exam } = await params;
  if (!getExam(exam)) notFound();

  // The full interactive experience. No subject/chapter pre-selected;
  // user picks from the sidebar. (Reverted the URL-driven subject
  // experiment that broke mobile chapter selection.)
  return <QuestionBrowserClient examId={exam} />;
}
