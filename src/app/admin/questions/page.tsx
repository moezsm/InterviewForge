"use client";

import Link from "next/link";
import { useEffect, useReducer } from "react";

import Loading from "@/components/Loading";
import QuestionCard from "@/components/QuestionCard";
import QuestionForm from "@/components/QuestionForm";
import type { Category, Question } from "@/types";

interface State {
  categories: Category[];
  selectedCategoryId: string;
  questions: Question[];
  isCategoriesLoading: boolean;
  isQuestionsLoading: boolean;
  questionsVersion: number;
}

type Action =
  | { type: "CATEGORIES_LOADED"; categories: Category[] }
  | { type: "CATEGORIES_ERROR" }
  | { type: "SELECT_CATEGORY"; categoryId: string }
  | { type: "QUESTIONS_LOADED"; questions: Question[] }
  | { type: "QUESTIONS_ERROR" }
  | { type: "REFRESH_QUESTIONS" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CATEGORIES_LOADED": {
      const firstId =
        state.selectedCategoryId || (action.categories.length > 0 ? action.categories[0].id : "");
      return {
        ...state,
        categories: action.categories,
        isCategoriesLoading: false,
        selectedCategoryId: firstId,
        isQuestionsLoading: firstId !== "",
      };
    }
    case "CATEGORIES_ERROR":
      return { ...state, categories: [], isCategoriesLoading: false };
    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategoryId: action.categoryId,
        isQuestionsLoading: true,
      };
    case "QUESTIONS_LOADED":
      return { ...state, questions: action.questions, isQuestionsLoading: false };
    case "QUESTIONS_ERROR":
      return { ...state, questions: [], isQuestionsLoading: false };
    case "REFRESH_QUESTIONS":
      return { ...state, isQuestionsLoading: true, questionsVersion: state.questionsVersion + 1 };
    default:
      return state;
  }
}

const initialState: State = {
  categories: [],
  selectedCategoryId: "",
  questions: [],
  isCategoriesLoading: true,
  isQuestionsLoading: false,
  questionsVersion: 0,
};

export default function AdminQuestionsPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { categories, selectedCategoryId, questions, isCategoriesLoading, isQuestionsLoading } =
    state;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        if (!cancelled) dispatch({ type: "CATEGORIES_LOADED", categories: data });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "CATEGORIES_ERROR" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedCategoryId) return;
    let cancelled = false;
    fetch(`/api/questions?categoryId=${encodeURIComponent(selectedCategoryId)}`)
      .then((res) => res.json())
      .then((data: Question[]) => {
        if (!cancelled) dispatch({ type: "QUESTIONS_LOADED", questions: data });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "QUESTIONS_ERROR" });
      });
    return () => {
      cancelled = true;
    };
  }, [selectedCategoryId, state.questionsVersion]);

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
                  dispatch({ type: "SELECT_CATEGORY", categoryId: event.target.value });
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
                dispatch({ type: "REFRESH_QUESTIONS" });
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
