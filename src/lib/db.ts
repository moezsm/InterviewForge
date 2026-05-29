import { Category } from "@/types/category";
import { Question } from "@/types/question";
import { Session } from "@/types/session";
import { randomUUID } from "crypto";
import { supabase } from "./supabase";

// ---------------------------------------------------------------------------
// In-memory fallback store (used when Supabase env vars are not configured)
// ---------------------------------------------------------------------------

const memCategories: Category[] = [
  { id: "cat-backend", name: "Backend Development" },
  { id: "cat-frontend", name: "Frontend Development" },
  { id: "cat-system-design", name: "System Design" },
];

const memQuestions: Question[] = [
  // Backend Development
  {
    id: "q1",
    categoryId: "cat-backend",
    questionText: "What is the purpose of an ORM in backend development?",
    correctAnswer:
      "An ORM maps database tables to programming language objects, allowing developers to interact with the database using code instead of raw SQL.",
  },
  {
    id: "q2",
    categoryId: "cat-backend",
    questionText: "Explain the difference between SQL and NoSQL databases.",
    correctAnswer:
      "SQL databases are relational and use structured schemas with tables, while NoSQL databases are non-relational and can store unstructured data in formats like documents, key-value pairs, or graphs.",
  },
  {
    id: "q3",
    categoryId: "cat-backend",
    questionText: "What is middleware in the context of web servers?",
    correctAnswer:
      "Middleware is software that sits between the server and the application logic, processing requests and responses, handling tasks like authentication, logging, and error handling.",
  },
  // Frontend Development
  {
    id: "q4",
    categoryId: "cat-frontend",
    questionText:
      "What is the Virtual DOM and why do frameworks like React use it?",
    correctAnswer:
      "The Virtual DOM is a lightweight in-memory representation of the real DOM. React uses it to efficiently batch and minimize direct DOM manipulations, improving performance.",
  },
  {
    id: "q5",
    categoryId: "cat-frontend",
    questionText: "What is the difference between CSS Flexbox and Grid?",
    correctAnswer:
      "Flexbox is designed for one-dimensional layouts (row or column), while CSS Grid is designed for two-dimensional layouts (rows and columns simultaneously).",
  },
  {
    id: "q6",
    categoryId: "cat-frontend",
    questionText: "What are React hooks and name three commonly used ones?",
    correctAnswer:
      "React hooks are functions that let you use state and lifecycle features in functional components. Common hooks include useState, useEffect, and useContext.",
  },
  // System Design
  {
    id: "q7",
    categoryId: "cat-system-design",
    questionText: "What is horizontal scaling and how does it differ from vertical scaling?",
    correctAnswer:
      "Horizontal scaling adds more machines to a system to handle load, while vertical scaling adds more resources (CPU, RAM) to a single machine. Horizontal scaling is generally more resilient and scalable.",
  },
  {
    id: "q8",
    categoryId: "cat-system-design",
    questionText: "Explain the CAP theorem.",
    correctAnswer:
      "The CAP theorem states that a distributed system can only guarantee two out of three properties: Consistency, Availability, and Partition Tolerance.",
  },
  {
    id: "q9",
    categoryId: "cat-system-design",
    questionText: "What is a load balancer and why is it used?",
    correctAnswer:
      "A load balancer distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed, improving reliability and performance.",
  },
];

const memSessions: Session[] = [];

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({ id: row.id, name: row.name }));
  }
  return [...memCategories];
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .eq("id", id)
      .single();
    if (error) return undefined;
    return data ? { id: data.id, name: data.name } : undefined;
  }
  return memCategories.find((c) => c.id === id);
}

export async function addCategory(name: string): Promise<Category> {
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .insert({ name })
      .select("id, name")
      .single();
    if (error) throw new Error(error.message);
    return { id: data.id, name: data.name };
  }
  const category: Category = { id: randomUUID(), name };
  memCategories.push(category);
  return category;
}

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export async function getQuestionsByCategory(categoryId: string): Promise<Question[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("questions")
      .select("id, category_id, question_text, correct_answer")
      .eq("category_id", categoryId);
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
      id: row.id,
      categoryId: row.category_id,
      questionText: row.question_text,
      correctAnswer: row.correct_answer,
    }));
  }
  return memQuestions.filter((q) => q.categoryId === categoryId);
}

export async function getAllQuestions(): Promise<Question[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("questions")
      .select("id, category_id, question_text, correct_answer");
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
      id: row.id,
      categoryId: row.category_id,
      questionText: row.question_text,
      correctAnswer: row.correct_answer,
    }));
  }
  return [...memQuestions];
}

export async function addQuestion(
  categoryId: string,
  questionText: string,
  correctAnswer: string
): Promise<Question> {
  if (supabase) {
    const { data, error } = await supabase
      .from("questions")
      .insert({ category_id: categoryId, question_text: questionText, correct_answer: correctAnswer })
      .select("id, category_id, question_text, correct_answer")
      .single();
    if (error) throw new Error(error.message);
    return {
      id: data.id,
      categoryId: data.category_id,
      questionText: data.question_text,
      correctAnswer: data.correct_answer,
    };
  }
  const question: Question = {
    id: randomUUID(),
    categoryId,
    questionText,
    correctAnswer,
  };
  memQuestions.push(question);
  return question;
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export async function addSession(
  session: Omit<Session, "id" | "createdAt">
): Promise<Session> {
  if (supabase) {
    const { data, error } = await supabase
      .from("sessions")
      .insert({
        category_id: session.categoryId,
        question_ids: session.questionIds,
        user_answers: session.userAnswers,
        score: session.score,
      })
      .select("id, category_id, question_ids, user_answers, score, created_at")
      .single();
    if (error) throw new Error(error.message);
    return {
      id: data.id,
      categoryId: data.category_id,
      questionIds: data.question_ids,
      userAnswers: data.user_answers,
      score: data.score,
      createdAt: data.created_at,
    };
  }
  const newSession: Session = {
    ...session,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  memSessions.push(newSession);
  return newSession;
}

export async function getSessions(): Promise<Session[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("sessions")
      .select("id, category_id, question_ids, user_answers, score, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
      id: row.id,
      categoryId: row.category_id,
      questionIds: row.question_ids,
      userAnswers: row.user_answers,
      score: row.score,
      createdAt: row.created_at,
    }));
  }
  return [...memSessions];
}
