# Task 011 — Scoring Logic

## Phase
Phase 5 — Results and Review

## Objective
Implement a scoring function that compares user answers against correct answers.

## Steps
1. Create `src/lib/scoring.ts`.
2. Export a function:
   ```ts
   function scoreAnswers(
     questions: Question[],
     userAnswers: Record<string, string>
   ): { score: number; total: number; results: QuestionResult[] }
   ```
3. Each `QuestionResult` contains:
   - `questionId`
   - `questionText`
   - `correctAnswer`
   - `userAnswer`
   - `isCorrect` (boolean)
4. Comparison should be case-insensitive and trim whitespace.
5. Return total score, question count, and per-question results.

## Acceptance Criteria
- Exact match (case-insensitive, trimmed) is marked correct.
- Score equals the count of correct answers.
- All questions appear in the results array.

## Files to Create
- `src/lib/scoring.ts`
