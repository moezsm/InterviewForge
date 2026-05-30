export type TestMode = "exam" | "practice";

export interface Session {
  id: string;
  categoryId: string;
  questionIds: string[];
  userAnswers: Record<string, string>;
  score: number;
  createdAt: string;
}

export interface QuestionResult {
  questionId: string;
  questionText: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

export interface ScoreResult {
  score: number;
  total: number;
  results: QuestionResult[];
}
