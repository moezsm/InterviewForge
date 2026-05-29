"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import CategoryList from "@/components/CategoryList";
import Loading from "@/components/Loading";
import type { Category } from "@/types";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <header className="space-y-3 text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            InterviewForge
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            Pick a category and practice interview questions at your own pace.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Categories
          </h2>
          {isLoading ? (
            <Loading message="Loading categories..." />
          ) : categories.length > 0 ? (
            <CategoryList categories={categories} linkMode={true} />
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              No categories available yet.
            </p>
          )}
        </section>

        <div className="pt-2 text-center sm:text-left">
          <Link
            href="/admin/categories"
            className="text-sm font-medium text-zinc-600 underline underline-offset-4 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            Admin access
          </Link>
        </div>
      </div>
    </main>
  );
}
