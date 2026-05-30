# Task 018 — Test Mode Selection (Exam Mode & Practice Mode)

## Phase
Phase 4 — User Test Flow

## Objective
Allow users to choose between two test modes before starting a session:
- **Exam Mode** — Answer all questions at once, see results at the end.
- **Practice Mode** — Answer one question at a time with instant feedback.

## Steps
1. Add `TestMode` type (`"exam" | "practice"`) to `src/types/session.ts`.
2. Export `TestMode` from `src/types/index.ts`.
3. Update `/test/[categoryId]` page to show a mode selection screen before loading questions.
4. Create `PracticeSessionForm` component for one-at-a-time question flow.
5. Wire mode selection to render `TestSessionForm` (exam) or `PracticeSessionForm` (practice).
6. Store selected mode in the sessionStorage payload.

## Components Built
- `src/components/PracticeSessionForm.tsx` — shows questions one at a time with instant correct/incorrect feedback after each answer.

## Files Modified
- `src/types/session.ts` — added `TestMode` type
- `src/types/index.ts` — exported `TestMode`
- `src/app/test/[categoryId]/page.tsx` — added mode selection UI and Practice Mode support

## Files Created
- `src/components/PracticeSessionForm.tsx`

## Acceptance Criteria
- User sees a mode selection screen with two cards when navigating to a test category.
- Selecting Exam Mode shows all questions at once (existing behavior).
- Selecting Practice Mode shows one question at a time.
- In Practice Mode, after checking an answer, user sees correct/incorrect feedback with the correct answer.
- In Practice Mode, after the last question, user sees a summary score and can navigate to full results.
- Both modes save results to sessionStorage and redirect to `/results` page.
- Build and lint pass without errors.
