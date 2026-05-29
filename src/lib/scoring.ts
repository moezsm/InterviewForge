import { Question, QuestionResult, ScoreResult } from "@/types";

export function scoreAnswers(
  questions: Question[],
  userAnswers: Record<string, string>
): ScoreResult {
  const results: QuestionResult[] = questions.map((q) => {
    const userAnswer = (userAnswers[q.id] || "").trim().toLowerCase();
    const correctAnswer = q.correctAnswer.trim().toLowerCase();
    return {
      questionId: q.id,
      questionText: q.questionText,
      correctAnswer: q.correctAnswer,
      userAnswer: userAnswers[q.id] || "",
      isCorrect: userAnswer === correctAnswer,
    };
  });

  const score = results.filter((r) => r.isCorrect).length;

  return {
    score,
    total: questions.length,
    results,
  };
}
