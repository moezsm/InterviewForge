import type { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Question
          </p>
          <p className="mt-1 text-base text-zinc-900 dark:text-zinc-100">
            {question.questionText}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Correct answer
          </p>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
            {question.correctAnswer}
          </p>
        </div>
      </div>
    </article>
  );
}
