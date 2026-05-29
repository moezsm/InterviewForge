import { Category } from "@/types/category";
import { Question } from "@/types/question";
import { Session } from "@/types/session";
import { randomUUID } from "crypto";

const categories: Category[] = [
  { id: "cat-backend", name: "Backend Development" },
  { id: "cat-frontend", name: "Frontend Development" },
  { id: "cat-system-design", name: "System Design" },
];

const questions: Question[] = [
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

const sessions: Session[] = [];

export function getCategories(): Category[] {
  return [...categories];
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getQuestionsByCategory(categoryId: string): Question[] {
  return questions.filter((q) => q.categoryId === categoryId);
}

export function getAllQuestions(): Question[] {
  return [...questions];
}

export function addCategory(name: string): Category {
  const category: Category = { id: randomUUID(), name };
  categories.push(category);
  return category;
}

export function addQuestion(
  categoryId: string,
  questionText: string,
  correctAnswer: string
): Question {
  const question: Question = {
    id: randomUUID(),
    categoryId,
    questionText,
    correctAnswer,
  };
  questions.push(question);
  return question;
}

export function addSession(
  session: Omit<Session, "id" | "createdAt">
): Session {
  const newSession: Session = {
    ...session,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  sessions.push(newSession);
  return newSession;
}

export function getSessions(): Session[] {
  return [...sessions];
}
