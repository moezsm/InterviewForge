import { addCategory, getCategories } from "@/lib/db";
import type { Category } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface CreateCategoryBody {
  name?: string;
}

export async function GET() {
  const categories: Category[] = getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const { name }: CreateCategoryBody = await request.json();
  const trimmedName = name?.trim();

  if (!trimmedName) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 }
    );
  }

  const category: Category = addCategory(trimmedName);
  return NextResponse.json(category, { status: 201 });
}
