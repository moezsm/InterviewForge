# Task 010 — Test Session Page

## Phase
Phase 4 — User Test Flow

## Objective
Build the test session page where users answer randomized questions from a category.

## Steps
1. Create `src/app/test/[categoryId]/page.tsx`.
2. Read `categoryId` from the route params.
3. Fetch questions from `GET /api/questions?categoryId=...`.
4. Randomize the question order on the client side.
5. Display each question with a text input for the user's answer.
6. Store all answers in local component state as `Record<string, string>` (questionId → answer).
7. Add a "Submit" button at the bottom.
8. On submit, navigate to the results page, passing answers and question data via query params, URL state, or a lightweight session store.

## Components to Build
- `src/components/TestSessionForm.tsx` — renders questions with inputs and a submit button.

## Helper to Build
- `src/lib/questions.ts` — export a `shuffleQuestions(questions: Question[]): Question[]` utility.

## Acceptance Criteria
- Page loads questions for the selected category.
- Questions appear in a random order.
- User can type an answer for each question.
- Submitting navigates to the results page with all answer data intact.

## Files to Create
- `src/app/test/[categoryId]/page.tsx`
- `src/components/TestSessionForm.tsx`
- `src/lib/questions.ts`
