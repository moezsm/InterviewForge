"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import CategoryForm from "@/components/CategoryForm";
import CategoryList from "@/components/CategoryList";
import Loading from "@/components/Loading";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/categories");
      const data: Category[] = await response.json();
      setCategories(data);
    } catch {
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data: Category[] = await response.json();

        if (isMounted) {
          setCategories(data);
        }
      } catch {
        if (isMounted) {
          setCategories([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

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
              setIsLoading(true);
              void fetchCategories();
            }}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Existing Categories
          </h2>
          {isLoading ? (
            <Loading message="Loading categories..." />
          ) : categories.length > 0 ? (
            <CategoryList categories={categories} />
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
