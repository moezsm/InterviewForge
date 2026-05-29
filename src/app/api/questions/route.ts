import { addQuestion, getAllQuestions, getQuestionsByCategory } from "@/lib/db";
import type { Question } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface CreateQuestionBody {
  categoryId?: string;
  questionText?: string;
  correctAnswer?: string;
}

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get("categoryId")?.trim();
  const questions: Question[] = categoryId
    ? await getQuestionsByCategory(categoryId)
    : await getAllQuestions();

  return NextResponse.json(questions);
}

export async function POST(request: NextRequest) {
  const { categoryId, questionText, correctAnswer }: CreateQuestionBody =
    await request.json();
  const trimmedCategoryId = categoryId?.trim();
  const trimmedQuestionText = questionText?.trim();
  const trimmedCorrectAnswer = correctAnswer?.trim();

  if (!trimmedCategoryId || !trimmedQuestionText || !trimmedCorrectAnswer) {
    return NextResponse.json(
      { error: "categoryId, questionText, and correctAnswer are required." },
      { status: 400 }
    );
  }

  const question: Question = await addQuestion(
    trimmedCategoryId,
    trimmedQuestionText,
    trimmedCorrectAnswer
  );

  return NextResponse.json(question, { status: 201 });
}
