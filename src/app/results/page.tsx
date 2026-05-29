"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";

import ResultSummary from "@/components/ResultSummary";
import { scoreAnswers } from "@/lib/scoring";
import type { Question, ScoreResult } from "@/types";

const SESSION_STORAGE_KEY = "interviewforge-test-session";

interface StoredSessionData {
  categoryId: string;
  questions: Question[];
  userAnswers: Record<string, string>;
}

function getSessionSnapshot(): string | null {
  return sessionStorage.getItem(SESSION_STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function ResultsPage() {
  const storedSession = useSyncExternalStore(subscribe, getSessionSnapshot, getServerSnapshot);

  const { categoryId, scoreResult } = useMemo<{
    categoryId?: string;
    scoreResult: ScoreResult | null;
  }>(() => {
    if (!storedSession) {
      return { scoreResult: null };
    }

    try {
      const { questions, userAnswers, categoryId: storedCategoryId } =
        JSON.parse(storedSession) as StoredSessionData;
      return {
        categoryId: storedCategoryId,
        scoreResult: scoreAnswers(questions, userAnswers),
      };
    } catch {
      return { scoreResult: null };
    }
  }, [storedSession]);

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

        {scoreResult ? (
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
