"use client";

import { FormEvent, useState } from "react";

interface CategoryFormProps {
  onSuccess?: () => void;
}

export default function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category name is required.");
      return;
    }

    setError("");
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!response.ok) {
        throw new Error("Unable to create category.");
      }

      setName("");
      onSuccess?.();
    } catch {
      setSubmitError("Unable to create category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-2">
        <label
          htmlFor="category-name"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          Category name
        </label>
        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error) {
              setError("");
            }
          }}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
          placeholder="e.g. JavaScript Basics"
          disabled={isSubmitting}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>

      {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isSubmitting ? "Saving..." : "Add Category"}
      </button>
    </form>
  );
}
