"use client";

import { FormEvent, useState } from "react";

interface QuestionFormProps {
  categoryId: string;
  onSuccess?: () => void;
}

interface FormErrors {
  questionText?: string;
  correctAnswer?: string;
  submit?: string;
}

export default function QuestionForm({
  categoryId,
  onSuccess,
}: QuestionFormProps) {
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuestionText = questionText.trim();
    const trimmedCorrectAnswer = correctAnswer.trim();
    const nextErrors: FormErrors = {};

    if (!trimmedQuestionText) {
      nextErrors.questionText = "Question text is required.";
    }

    if (!trimmedCorrectAnswer) {
      nextErrors.correctAnswer = "Correct answer is required.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          questionText: trimmedQuestionText,
          correctAnswer: trimmedCorrectAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create question.");
      }

      setQuestionText("");
      setCorrectAnswer("");
      onSuccess?.();
    } catch {
      setErrors({ submit: "Unable to create question. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-2">
        <label
          htmlFor="question-text"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          Question text
        </label>
        <textarea
          id="question-text"
          value={questionText}
          onChange={(event) => {
            setQuestionText(event.target.value);
            setErrors((current) => ({ ...current, questionText: undefined, submit: undefined }));
          }}
          rows={4}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
          placeholder="Write the interview question"
          disabled={isSubmitting}
        />
        {errors.questionText ? (
          <p className="text-sm text-red-600">{errors.questionText}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="correct-answer"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          Correct answer
        </label>
        <input
          id="correct-answer"
          type="text"
          value={correctAnswer}
          onChange={(event) => {
            setCorrectAnswer(event.target.value);
            setErrors((current) => ({ ...current, correctAnswer: undefined, submit: undefined }));
          }}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
          placeholder="Enter the correct answer"
          disabled={isSubmitting}
        />
        {errors.correctAnswer ? (
          <p className="text-sm text-red-600">{errors.correctAnswer}</p>
        ) : null}
      </div>

      {errors.submit ? <p className="text-sm text-red-600">{errors.submit}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isSubmitting ? "Saving..." : "Add Question"}
      </button>
    </form>
  );
}
