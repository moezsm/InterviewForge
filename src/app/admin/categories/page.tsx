"use client";

import Link from "next/link";
import { useEffect, useReducer } from "react";

import CategoryForm from "@/components/CategoryForm";
import CategoryList from "@/components/CategoryList";
import Loading from "@/components/Loading";
import type { Category } from "@/types";

interface State {
  categories: Category[];
  isLoading: boolean;
  version: number;
}

type Action =
  | { type: "LOADED"; categories: Category[] }
  | { type: "ERROR" }
  | { type: "REFRESH" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOADED":
      return { ...state, categories: action.categories, isLoading: false };
    case "ERROR":
      return { ...state, categories: [], isLoading: false };
    case "REFRESH":
      return { ...state, isLoading: true, version: state.version + 1 };
  }
}

export default function AdminCategoriesPage() {
  const [state, dispatch] = useReducer(reducer, {
    categories: [],
    isLoading: true,
    version: 0,
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        if (!cancelled) dispatch({ type: "LOADED", categories: data });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "ERROR" });
      });
    return () => {
      cancelled = true;
    };
  }, [state.version]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link href="/" className="underline underline-offset-4 transition hover:text-zinc-900 dark:hover:text-zinc-100">
            Home
          </Link>
          <Link
            href="/admin/questions"
            className="underline underline-offset-4 transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Admin Questions
          </Link>
        </nav>

        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Manage Categories
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300">
            Create categories and review everything currently available for practice.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Add Category
          </h2>
          <CategoryForm
            onSuccess={() => {
              dispatch({ type: "REFRESH" });
            }}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Existing Categories
          </h2>
          {state.isLoading ? (
            <Loading message="Loading categories..." />
          ) : state.categories.length > 0 ? (
            <CategoryList categories={state.categories} />
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              No categories available yet.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
