"use client";

import { useState } from "react";

import { scoreAnswers } from "@/lib/scoring";
import type { Question, QuestionResult } from "@/types";

interface PracticeSessionFormProps {
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
}

export default function PracticeSessionForm({
  questions,
  onComplete,
}: PracticeSessionFormProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackResults, setFeedbackResults] = useState<
    Record<string, QuestionResult>
  >({});

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return null;
  }

  const currentAnswer = answers[currentQuestion.id] ?? "";
  const currentFeedback = feedbackResults[currentQuestion.id];
  const isLastQuestion = currentIndex === questions.length - 1;
  const totalCorrect = Object.values(feedbackResults).filter(
    (result) => result.isCorrect
  ).length;

  const handleCheckAnswer = () => {
    const scoreResult = scoreAnswers([currentQuestion], {
      [currentQuestion.id]: currentAnswer,
    });
    const nextResult = scoreResult.results[0];

    if (!nextResult) {
      return;
    }

    setFeedbackResults((current) => ({
      ...current,
      [currentQuestion.id]: nextResult,
    }));
    setShowFeedback(true);
  };

  const handleAdvance = () => {
    if (isLastQuestion) {
      onComplete({
        ...answers,
        [currentQuestion.id]: currentAnswer,
      });
      return;
    }

    setCurrentIndex((current) => current + 1);
    setShowFeedback(false);
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Stay focused and check each answer before moving on.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <label htmlFor={`answer-${currentQuestion.id}`} className="block space-y-3">
          <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {currentIndex + 1}. {currentQuestion.questionText}
          </span>
          <input
            id={`answer-${currentQuestion.id}`}
            type="text"
            value={currentAnswer}
            onChange={(event) => {
              const value = event.target.value;

              setAnswers((current) => ({
                ...current,
                [currentQuestion.id]: value,
              }));
            }}
            disabled={showFeedback}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            placeholder="Type your answer"
          />
        </label>
      </div>

      {showFeedback && currentFeedback ? (
        <div className="space-y-4">
          <div
            className={`rounded-xl border p-5 shadow-sm ${
              currentFeedback.isCorrect
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40"
                : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40"
            }`}
          >
            <div className="space-y-3">
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {currentFeedback.isCorrect ? "Correct!" : "Not quite."}
              </p>
              <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                <p>
                  <span className="font-semibold">Your answer:</span>{" "}
                  {currentFeedback.userAnswer || "No answer provided"}
                </p>
                <p>
                  <span className="font-semibold">Correct answer:</span>{" "}
                  {currentFeedback.correctAnswer}
                </p>
              </div>
            </div>
          </div>

          {isLastQuestion ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Practice complete
              </p>
              <p className="mt-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                {totalCorrect} / {questions.length}
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                You have finished all questions. View your full results summary.
              </p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleAdvance}
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isLastQuestion ? "View Results" : "Next Question"}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleCheckAnswer}
          disabled={!currentAnswer.trim()}
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Check Answer
        </button>
      )}
    </section>
  );
}
