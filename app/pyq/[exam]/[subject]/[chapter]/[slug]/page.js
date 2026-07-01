import { notFound } from "next/navigation";
import Link from "next/link";
import { getQuestionWithAnswer } from "@/lib/api";
import { getChapter, getExamLabel } from "@/lib/taxonomy";
import { toPlainText } from "@/lib/mathHelpers";
import { DARK } from "@/lib/questionTheme";
import MathJaxProvider from "@/components/MathJaxProvider";
import QuestionCard from "@/components/QuestionCard";

// ── Metadata: this is the single biggest SEO win in the whole migration.
// Every question now gets its OWN <title>, description, canonical, and
// JSON-LD — instead of every page on the site sharing one static title.
export async function generateMetadata({ params }) {
  const { exam, subject, chapter, slug } = await params;
  const { question } = await getQuestionWithAnswer(slug);
  if (!question) return {};

  const examLabel = getExamLabel(exam);
  const summary = toPlainText(question.question_text, 110);
  const yearBit = question.exam_date
    ? `${examLabel} ${question.year} (${new Date(question.exam_date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}${question.shift ? " " + question.shift : ""})`
    : question.year
    ? `${examLabel} ${question.year}${question.shift ? " " + question.shift : ""}`
    : examLabel;

  const title = `${summary} — ${yearBit}`;
  const description = `${summary} Solve this ${question.subject_name || ""} PYQ from ${yearBit} with a full step-by-step solution on ExamsCalendar.`;

  return {
    title,
    description,
    alternates: { canonical: `/pyq/${exam}/${subject}/${chapter}/${slug}` },
    openGraph: { title, description, type: "article" },
  };
}

export default async function QuestionPage({ params }) {
  const { exam, subject, chapter, slug } = await params;
  const { question, answer } = await getQuestionWithAnswer(slug);
  if (!question) notFound();

  const { exam: examData, subject: subjectData, chapter: chapterData } = getChapter(exam, subject, chapter);
  const examLabel = getExamLabel(exam);

  // JSON-LD Question schema — this is what lets Google (and AI answer
  // engines) show your question + answer directly in search results,
  // the way you saw with the getmarks.app example.
  const options = [question.option_1, question.option_2, question.option_3, question.option_4].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: toPlainText(question.question_text, 300),
    text: toPlainText(question.question_text, 1000),
    answerCount: 1,
    ...(options.length > 0 && {
      suggestedAnswer: options.map((opt, i) => ({
        "@type": "Answer",
        text: toPlainText(opt, 200),
        position: i + 1,
      })),
    }),
    ...(answer?.solution_text && {
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(answer.solution_text, 1000),
      },
    }),
  };

  const T = DARK;

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb — real <a href> links, this is crawlable internal linking */}
      <nav style={{ padding: "16px 20px", fontSize: 13, color: T.textMuted, display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Link href="/">Home</Link> ›
        <Link href={`/pyq/${exam}`}>{examLabel}</Link> ›
        {subjectData && (
          <>
            <Link href={`/pyq/${exam}/${subject}`}>{subjectData.name}</Link> ›
          </>
        )}
        {chapterData && <Link href={`/pyq/${exam}/${subject}/${chapter}`}>{chapterData.name}</Link>}
      </nav>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 60px" }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, margin: "8px 0 20px" }}>
          {examLabel} {question.year ? `${question.year} ` : ""}
          {question.shift ? `(${question.shift}) ` : ""}
          — {subjectData?.name || question.subject_name} PYQ
        </h1>

        <MathJaxProvider>
          <QuestionCard q={question} C={T} isMobile={false} initialAnswer={answer} />
        </MathJaxProvider>

        {chapterData && (
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link
              href={`/pyq/${exam}/${subject}/${chapter}`}
              style={{ display: "inline-block", padding: "10px 22px", borderRadius: 10, border: `1px solid ${T.accent}`, color: T.accentLight, fontWeight: 700, fontSize: 14 }}
            >
              ← More {chapterData.name} questions
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
