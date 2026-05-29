import Link from "next/link";

import type { ScoreResult } from "@/types";

interface ResultSummaryProps {
  scoreResult: ScoreResult;
  categoryId?: string;
}

export default function ResultSummary({
  scoreResult,
  categoryId,
}: ResultSummaryProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Score
        </p>
        <p className="mt-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          {scoreResult.score} / {scoreResult.total}
        </p>
      </div>

      <div className="space-y-4">
        {scoreResult.results.map((result) => {
          const isCorrect = result.isCorrect;

          return (
            <article
              key={result.questionId}
              className={`rounded-xl border p-5 shadow-sm ${
                isCorrect
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40"
                  : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {result.questionText}
                  </p>
                  <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    <p>
                      <span className="font-semibold">Your answer:</span>{" "}
                      {result.userAnswer || "No answer provided"}
                    </p>
                    <p>
                      <span className="font-semibold">Correct answer:</span>{" "}
                      {result.correctAnswer}
                    </p>
                  </div>
                </div>
                <span
                  aria-label={isCorrect ? "Correct" : "Incorrect"}
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                    isCorrect
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {isCorrect ? "✓" : "✕"}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Try Again
        </Link>
        {categoryId ? (
          <Link
            href={`/test/${categoryId}`}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Retry Category
          </Link>
        ) : null}
      </div>
    </section>
  );
}
