# Task 012 — Results Page

## Phase
Phase 5 — Results and Review

## Objective
Build the results page that shows the user's score and a question-by-question review.

## Steps
1. Create `src/app/results/page.tsx`.
2. Retrieve the questions and user answers passed from the test session page.
3. Call the scoring function from `src/lib/scoring.ts` to compute results.
4. Display:
   - Final score (e.g. "7 / 10").
   - A list of all questions showing:
     - Question text
     - User's answer
     - Correct answer
     - Visual indicator (green for correct, red for incorrect)
5. Add a "Try Again" button that navigates back to the home page.
6. Add a "Retry Category" button that navigates back to the same category's test page.

## Components to Build
- `src/components/ResultSummary.tsx` — renders score and per-question breakdown.

## Acceptance Criteria
- Score is displayed correctly.
- Each question shows the user's answer vs the correct answer.
- Correct and incorrect answers are visually distinct.
- Navigation buttons work.

## Files to Create
- `src/app/results/page.tsx`
- `src/components/ResultSummary.tsx`
