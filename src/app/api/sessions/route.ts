import { addSession, getSessions } from "@/lib/db";
import type { Session } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface CreateSessionBody {
  categoryId?: string;
  questionIds?: string[];
  userAnswers?: Record<string, string>;
  score?: number;
}

export async function GET() {
  const sessions: Session[] = await getSessions();
  return NextResponse.json(sessions);
}

export async function POST(request: NextRequest) {
  const { categoryId, questionIds, userAnswers = {}, score = 0 }: CreateSessionBody =
    await request.json();
  const trimmedCategoryId = categoryId?.trim();
  const validQuestionIds = Array.isArray(questionIds)
    ? questionIds.filter((questionId): questionId is string => Boolean(questionId?.trim()))
    : [];

  if (!trimmedCategoryId || validQuestionIds.length === 0) {
    return NextResponse.json(
      { error: "categoryId and questionIds are required." },
      { status: 400 }
    );
  }

  const session = await addSession({
    categoryId: trimmedCategoryId,
    questionIds: validQuestionIds,
    userAnswers,
    score,
  });

  return NextResponse.json(session, { status: 201 });
}
