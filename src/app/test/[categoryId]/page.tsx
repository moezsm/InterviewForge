"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import Loading from "@/components/Loading";
import TestSessionForm from "@/components/TestSessionForm";
import { shuffleQuestions } from "@/lib/questions";
import type { Question } from "@/types";

const SESSION_STORAGE_KEY = "interviewforge-test-session";

interface TestSessionPayload {
  categoryId: string;
  questions: Question[];
  userAnswers: Record<string, string>;
}

interface TestCategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default function TestCategoryPage({ params }: TestCategoryPageProps) {
  const router = useRouter();
  const { categoryId } = React.use(params);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

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
  }, [categoryId]);

  const handleSubmit = (userAnswers: Record<string, string>) => {
    const payload: TestSessionPayload = {
      categoryId,
      questions,
      userAnswers,
    };

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
    router.push("/results");
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <nav className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link href="/" className="underline underline-offset-4 transition hover:text-zinc-900 dark:hover:text-zinc-100">
            Home
          </Link>
        </nav>

        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Interview Test
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300">
            Answer each question and submit when you are ready to review your score.
          </p>
        </header>

        {isLoading ? (
          <Loading message="Loading questions..." />
        ) : questions.length > 0 ? (
          <TestSessionForm questions={questions} onSubmit={handleSubmit} />
        ) : (
          <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            No questions found.
          </p>
        )}
      </div>
    </main>
  );
}
