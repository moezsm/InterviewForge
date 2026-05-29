# Task 008 — Admin Questions Page

## Phase
Phase 3 — Admin Features

## Objective
Build the admin page for viewing and creating questions within a selected category.

## Steps
1. Create `src/app/admin/questions/page.tsx`.
2. Add a category selector dropdown populated from `GET /api/categories`.
3. When a category is selected, fetch and display its questions from `GET /api/questions?categoryId=...`.
4. Add a form to create a new question with:
   - Question text (textarea)
   - Correct answer (text input)
5. On form submit, `POST` to `/api/questions` with the selected `categoryId` and refresh the list.
6. Handle loading and empty states.

## Components to Build
- `src/components/QuestionForm.tsx` — form with question text, correct answer, and submit button.
- `src/components/QuestionCard.tsx` — displays a single question and its correct answer.

## Acceptance Criteria
- Page displays a category selector.
- Selecting a category shows its questions.
- User can create a question and see it appear in the list.

## Files to Create
- `src/app/admin/questions/page.tsx`
- `src/components/QuestionForm.tsx`
- `src/components/QuestionCard.tsx`
