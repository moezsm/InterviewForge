"use client";

import { FormEvent, useState } from "react";

import type { Question } from "@/types";

interface TestSessionFormProps {
  questions: Question[];
  onSubmit: (answers: Record<string, string>) => void;
}

export default function TestSessionForm({
  questions,
  onSubmit,
}: TestSessionFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [unansweredIds, setUnansweredIds] = useState<string[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextUnansweredIds = questions
      .filter((question) => !answers[question.id]?.trim())
      .map((question) => question.id);

    setUnansweredIds(nextUnansweredIds);
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {questions.map((question, index) => {
          const isUnanswered = unansweredIds.includes(question.id);

          return (
            <div
              key={question.id}
              className={`rounded-xl border p-5 shadow-sm transition ${
                isUnanswered
                  ? "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              }`}
            >
              <label
                htmlFor={`answer-${question.id}`}
                className="block space-y-3"
              >
                <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {index + 1}. {question.questionText}
                </span>
                <input
                  id={`answer-${question.id}`}
                  type="text"
                  value={answers[question.id] ?? ""}
                  onChange={(event) => {
                    const value = event.target.value;

                    setAnswers((current) => ({
                      ...current,
                      [question.id]: value,
                    }));
                    setUnansweredIds((current) =>
                      value.trim()
                        ? current.filter((id) => id !== question.id)
                        : current
                    );
                  }}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                  placeholder="Type your answer"
                />
              </label>
              {isUnanswered ? (
                <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                  This question is unanswered.
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Submit Answers
      </button>
    </form>
  );
}
