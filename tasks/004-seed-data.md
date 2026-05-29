# Task 004 — Create Seed Data and Data Access Layer

## Phase
Phase 2 — Core Data Setup

## Objective
Provide a small starter dataset for local development and a simple data access module.

## Steps
1. Create `src/lib/db.ts` with in-memory arrays for categories and questions.
2. Seed at least two categories (e.g. "Backend", "System Design").
3. Seed at least three questions per category, each with `questionText` and `correctAnswer`.
4. Export helper functions:
   - `getCategories(): Category[]`
   - `getCategoryById(id: string): Category | undefined`
   - `getQuestionsByCategory(categoryId: string): Question[]`
   - `addCategory(name: string): Category`
   - `addQuestion(categoryId: string, questionText: string, correctAnswer: string): Question`
5. Use `crypto.randomUUID()` or a simple ID generator for new entries.

## Acceptance Criteria
- Importing `@/lib/db` returns working getter and setter functions.
- Seed data is available immediately on import.
- Data persists in memory for the duration of the server process.

## Files to Create
- `src/lib/db.ts`
