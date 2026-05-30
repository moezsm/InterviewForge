"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import Loading from "@/components/Loading";
import PracticeSessionForm from "@/components/PracticeSessionForm";
import TestSessionForm from "@/components/TestSessionForm";
import { shuffleQuestions } from "@/lib/questions";
import type { Question, TestMode } from "@/types";

const SESSION_STORAGE_KEY = "interviewforge-test-session";

interface TestSessionPayload {
  categoryId: string;
  questions: Question[];
  userAnswers: Record<string, string>;
  mode: TestMode;
}

interface TestCategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const MODE_OPTIONS: Array<{
  description: string;
  emoji: string;
  id: TestMode;
  name: string;
}> = [
  {
    id: "exam",
    name: "Exam Mode",
    emoji: "📝",
    description: "Answer all questions, then see your results at the end",
  },
  {
    id: "practice",
    name: "Practice Mode",
    emoji: "🎯",
    description: "Answer one question at a time with instant feedback",
  },
];

export default function TestCategoryPage({ params }: TestCategoryPageProps) {
  const router = useRouter();
  const { categoryId } = React.use(params);
  const [selectedMode, setSelectedMode] = React.useState<TestMode | null>(null);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    if (!selectedMode) {
      return () => {
        isMounted = false;
      };
    }

    const loadQuestions = async () => {
      try {
        const response = await fetch(
          `/api/questions?categoryId=${encodeURIComponent(categoryId)}`
        );
        const data: Question[] = await response.json();

        if (isMounted) {
          setQuestions(shuffleQuestions(data));
        }
      } catch {
        if (isMounted) {
          setQuestions([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadQuestions();

    return () => {
      isMounted = false;
    };
  }, [categoryId, selectedMode]);

  const handleSelectMode = (mode: TestMode) => {
    setQuestions([]);
    setIsLoading(true);
    setSelectedMode(mode);
  };

  const handleSubmit = (userAnswers: Record<string, string>) => {
    if (!selectedMode) {
      return;
    }

    const payload: TestSessionPayload = {
      categoryId,
      questions,
      userAnswers,
      mode: selectedMode,
    };

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
    router.push("/results");
  };

  const description =
    selectedMode === "practice"
      ? "Answer one question at a time and check each response before moving on."
      : selectedMode === "exam"
        ? "Answer each question and submit when you are ready to review your score."
        : "Choose how you want to take this category before loading the questions.";

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <nav className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link
            href="/"
            className="underline underline-offset-4 transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Home
          </Link>
        </nav>

        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Interview Test
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300">{description}</p>
        </header>

        {selectedMode === null ? (
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Choose Your Mode
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300">
                Pick the test style that best fits how you want to practice.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {MODE_OPTIONS.map((mode) => (
                <div
                  key={mode.id}
                  className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                >
                  <div className="flex h-full flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <span className="text-3xl" aria-hidden="true">
                        {mode.emoji}
                      </span>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                          {mode.name}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">
                          {mode.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectMode(mode.id)}
                      className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                    >
                      Select {mode.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : isLoading ? (
          <Loading message="Loading questions..." />
        ) : questions.length > 0 ? (
          selectedMode === "exam" ? (
            <TestSessionForm questions={questions} onSubmit={handleSubmit} />
          ) : (
            <PracticeSessionForm questions={questions} onComplete={handleSubmit} />
          )
        ) : (
          <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            No questions found.
          </p>
        )}
      </div>
    </main>
  );
}
