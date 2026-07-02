import { notFound } from "next/navigation";
import Link from "next/link";
import { getQuestionWithAnswer, getChapterQuestionSlugs } from "@/lib/api";
import { getChapter, getExamLabel } from "@/lib/taxonomy";
import { toPlainText } from "@/lib/mathHelpers";
import { DARK } from "@/lib/questionTheme";
import MathJaxProvider from "@/components/MathJaxProvider";
import QuestionCard from "@/components/QuestionCard";
import QuestionSolver from "@/components/QuestionSolver";
import BackButton from "@/components/BackButton";

// SSC CGL keeps the simpler inline-reveal card for now (per instruction --
// not doing the Marks-style test UI for this exam yet).
const SOLVER_EXAMS = new Set(["jee-main", "jee-advanced", "neet"]);

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

export default async function QuestionPage({ params, searchParams }) {
  const { exam, subject, chapter, slug } = await params;
  const sp = await searchParams;
  const { question, answer } = await getQuestionWithAnswer(slug);
  if (!question) notFound();

  const { subject: subjectData, chapter: chapterData } = getChapter(exam, subject, chapter);
  const examLabel = getExamLabel(exam);
  const useSolver = SOLVER_EXAMS.has(exam);

  // Whatever filters were active on the list page you clicked in from --
  // topic/year/shift/difficulty/question_type -- carried here as query
  // params. Previous/Next must respect these, or you'd jump between
  // questions outside the filtered set you were actually looking at.
  const filters = {
    topic: sp?.topic || undefined,
    year: sp?.year || undefined,
    shift: sp?.shift || undefined,
    difficulty: sp?.difficulty || undefined,
    question_type: sp?.question_type || undefined,
  };
  // Preserve the same filters on Previous/Next links.
  const filterQuery = Object.entries(filters)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");

  const slugList = useSolver
    ? await getChapterQuestionSlugs({ examSlug: exam, subject, chapter, ...filters })
    : [];

  const options = [question.option_1, question.option_2, question.option_3, question.option_4].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: toPlainText(question.question_text, 300),
    text: toPlainText(question.question_text, 1000),
    answerCount: 1,
    ...(options.length > 0 && {
      suggestedAnswer: options.map((opt, i) => ({ "@type": "Answer", text: toPlainText(opt, 200), position: i + 1 })),
    }),
    ...(answer?.solution_text && {
      acceptedAnswer: { "@type": "Answer", text: toPlainText(answer.solution_text, 1000) },
    }),
  };

  const T = DARK;
  const chapterHref = chapterData ? `/pyq/${exam}/${subject}/${chapter}` : null;

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ padding: "16px 20px 0" }}>
        <BackButton C={T} fallbackHref={chapterHref || `/pyq/${exam}`} />
      </div>

      <nav style={{ padding: "12px 20px", fontSize: 13, color: T.textMuted, display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Link href="/">Home</Link> ›
        <Link href={`/pyq/${exam}`}>{examLabel}</Link> ›
        {subjectData && <span style={{ color: T.textDim }}>{subjectData.name}</span>} ›
        {chapterData && <Link href={chapterHref}>{chapterData.name}</Link>}
      </nav>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 60px" }}>
        {!useSolver && (
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: "8px 0 20px" }}>
            {examLabel} {question.year ? `${question.year} ` : ""}
            {question.shift ? `(${question.shift}) ` : ""}
            — {subjectData?.name || question.subject_name} PYQ
          </h1>
        )}

        <MathJaxProvider>
          {useSolver ? (
            <QuestionSolver
              // Same fix as the chapter-page topic bug: without a key tied
              // to the actual question, Next.js can reuse a stale component
              // instance across Next/Previous clicks -- URL updates
              // correctly but the visible content doesn't, or shows a
              // mismatched previous question's data.
              key={`${exam}-${subject}-${chapter}-${slug}`}
              q={question}
              answer={answer}
              examLabel={examLabel}
              chapterName={chapterData?.name}
              chapterHref={chapterHref}
              basePath={`/pyq/${exam}/${subject}/${chapter}`}
              filterQuery={filterQuery}
              slugList={slugList}
            />
          ) : (
            <>
              <QuestionCard q={question} C={T} isMobile={false} initialAnswer={answer} />
              {chapterHref && (
                <div style={{ marginTop: 32, textAlign: "center" }}>
                  <Link href={chapterHref} style={{ display: "inline-block", padding: "10px 22px", borderRadius: 10, border: `1px solid ${T.accent}`, color: T.accentLight, fontWeight: 700, fontSize: 14 }}>
                    ← More {chapterData?.name} questions
                  </Link>
                </div>
              )}
            </>
          )}
        </MathJaxProvider>
      </main>
    </div>
  );
}
