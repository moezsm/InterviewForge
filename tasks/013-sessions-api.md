# Task 013 — Sessions API Route (Optional)

## Phase
Phase 4 / Phase 5

## Objective
Create an API route for persisting test sessions if server-side session storage is desired.

## Steps
1. Create `src/app/api/sessions/route.ts`.
2. Implement `POST` handler:
   - Read `categoryId`, `questionIds`, `userAnswers`, and `score` from the request body.
   - Validate all required fields.
   - Store the session in memory (or Supabase if configured).
   - Return the created session with status 201.
3. Optionally implement `GET` handler to list past sessions.

## Acceptance Criteria
- `POST /api/sessions` creates and returns a session record.
- Validation errors return 400.

## Notes
- This task is optional for the MVP. The results page can work entirely client-side without this route.
- Implement this if session history or persistence is needed.

## Files to Create
- `src/app/api/sessions/route.ts`
