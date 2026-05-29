"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Loading from "@/components/Loading";
import ResultSummary from "@/components/ResultSummary";
import { scoreAnswers } from "@/lib/scoring";
import type { Question, ScoreResult } from "@/types";

const SESSION_STORAGE_KEY = "interviewforge-test-session";

interface StoredSessionData {
  categoryId: string;
  questions: Question[];
  userAnswers: Record<string, string>;
}

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<string>();
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);

      if (!storedSession) {
        setIsLoading(false);
        return;
      }

      try {
        const { questions, userAnswers, categoryId: storedCategoryId } =
          JSON.parse(storedSession) as StoredSessionData;

        setCategoryId(storedCategoryId);
        setScoreResult(scoreAnswers(questions, userAnswers));
      } catch {
        setScoreResult(null);
      } finally {
        setIsLoading(false);
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Results
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300">
            Review your score and compare your answers with the expected responses.
          </p>
        </header>

        {isLoading ? (
          <Loading message="Loading results..." />
        ) : scoreResult ? (
          <ResultSummary scoreResult={scoreResult} categoryId={categoryId} />
        ) : (
          <div className="space-y-4 rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center dark:border-zinc-700">
            <p className="text-zinc-600 dark:text-zinc-300">
              No test session data found.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Go Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
