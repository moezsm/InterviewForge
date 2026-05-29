"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import Loading from "@/components/Loading";
import QuestionCard from "@/components/QuestionCard";
import QuestionForm from "@/components/QuestionForm";
import type { Category, Question } from "@/types";

export default function AdminQuestionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);

  const fetchQuestions = useCallback(async (categoryId: string) => {
    if (!categoryId) {
      return;
    }

    try {
      const response = await fetch(
        `/api/questions?categoryId=${encodeURIComponent(categoryId)}`
      );
      const data: Question[] = await response.json();
      setQuestions(data);
    } catch {
      setQuestions([]);
    } finally {
      setIsQuestionsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data: Category[] = await response.json();

        if (!isMounted) {
          return;
        }

        setCategories(data);

        if (data.length > 0) {
          setIsQuestionsLoading(true);
          setSelectedCategoryId((current) => current || data[0].id);
        }
      } catch {
        if (isMounted) {
          setCategories([]);
        }
      } finally {
        if (isMounted) {
          setIsCategoriesLoading(false);
        }
      }
    };

    void fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedCategoryId) {
      return;
    }

    let isMounted = true;

    const loadQuestions = async () => {
      try {
        const response = await fetch(
          `/api/questions?categoryId=${encodeURIComponent(selectedCategoryId)}`
        );
        const data: Question[] = await response.json();

        if (isMounted) {
          setQuestions(data);
        }
      } catch {
        if (isMounted) {
          setQuestions([]);
        }
      } finally {
        if (isMounted) {
          setIsQuestionsLoading(false);
        }
      }
    };

    void loadQuestions();

    return () => {
      isMounted = false;
    };
  }, [selectedCategoryId]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link href="/" className="underline underline-offset-4 transition hover:text-zinc-900 dark:hover:text-zinc-100">
            Home
          </Link>
          <Link
            href="/admin/categories"
            className="underline underline-offset-4 transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Admin Categories
          </Link>
        </nav>

        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Manage Questions
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300">
            Choose a category, add new questions, and review the current question bank.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Select Category
          </h2>
          {isCategoriesLoading ? (
            <Loading message="Loading categories..." />
          ) : categories.length > 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <label
                htmlFor="category-select"
                className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Category
              </label>
              <select
                id="category-select"
                value={selectedCategoryId}
                onChange={(event) => {
                  setIsQuestionsLoading(true);
                  setSelectedCategoryId(event.target.value);
                }}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              No categories available yet.
            </p>
          )}
        </section>

        {selectedCategoryId ? (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Add Question
            </h2>
            <QuestionForm
              categoryId={selectedCategoryId}
              onSuccess={() => {
                setIsQuestionsLoading(true);
                void fetchQuestions(selectedCategoryId);
              }}
            />
          </section>
        ) : null}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Questions
          </h2>
          {!selectedCategoryId && !isCategoriesLoading ? (
            <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              Select a category to view questions.
            </p>
          ) : isQuestionsLoading ? (
            <Loading message="Loading questions..." />
          ) : questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          ) : selectedCategoryId ? (
            <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              No questions found for this category.
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
