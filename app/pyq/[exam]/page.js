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
  const examLabel = getExamLabel(exam);
  const title = `${examLabel} Previous Year Questions — Chapter-wise PYQs with Solutions`;
  const description = `Browse ${examLabel} previous year questions by subject and chapter, with detailed solutions. Free, no login required.`;
  return { title, description, alternates: { canonical: `/pyq/${exam}` } };
}

export default async function ExamPage({ params, searchParams }) {
  const { exam } = await params;
  if (!getExam(exam)) notFound();
  const sp = await searchParams;
  const initialSubject = sp?.subject || null;

  // The full interactive experience. If a ?subject= is present (e.g. the
  // user pressed back to this point), pre-select it so the back button
  // walks subject -> exam -> home instead of jumping out.
  return <QuestionBrowserClient examId={exam} initialSubject={initialSubject} />;
}
