# Task 006 — Questions API Route

## Phase
Phase 3 — Admin Features

## Objective
Create the API route for listing and creating questions.

## Steps
1. Create `src/app/api/questions/route.ts`.
2. Implement `GET` handler:
   - Read `categoryId` from the query string.
   - If `categoryId` is provided, return questions for that category.
   - If `categoryId` is missing, return all questions.
3. Implement `POST` handler:
   - Read `categoryId`, `questionText`, and `correctAnswer` from the request body.
   - Validate all three fields are non-empty strings; return 400 if invalid.
   - Call `db.addQuestion(categoryId, questionText, correctAnswer)` and return the new question with status 201.

## Acceptance Criteria
- `GET /api/questions?categoryId=xyz` returns filtered questions.
- `POST /api/questions` with valid body creates and returns a new question.
- Missing fields return a 400 error.

## Files to Create
- `src/app/api/questions/route.ts`
