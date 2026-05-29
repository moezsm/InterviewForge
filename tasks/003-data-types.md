# Task 003 — Define Data Types

## Phase
Phase 2 — Core Data Setup

## Objective
Create TypeScript types for the three core data models: Category, Question, and Session.

## Steps
1. Create `src/types/category.ts`:
   ```ts
   export interface Category {
     id: string;
     name: string;
   }
   ```
2. Create `src/types/question.ts`:
   ```ts
   export interface Question {
     id: string;
     categoryId: string;
     questionText: string;
     correctAnswer: string;
   }
   ```
3. Create `src/types/session.ts`:
   ```ts
   export interface Session {
     id: string;
     categoryId: string;
     questionIds: string[];
     userAnswers: Record<string, string>;
     score: number;
     createdAt: string;
   }
   ```
4. Create `src/types/index.ts` that re-exports all types.

## Acceptance Criteria
- All types compile without errors.
- Types are importable from `@/types`.

## Files to Create
- `src/types/category.ts`
- `src/types/question.ts`
- `src/types/session.ts`
- `src/types/index.ts`
