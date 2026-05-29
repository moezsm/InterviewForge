# Task 015 — Loading and Empty States

## Phase
Phase 6 — Final MVP Polish

## Objective
Add consistent loading indicators and empty state messages across all pages.

## Steps
1. Add a simple loading spinner or "Loading..." text to every page that fetches data.
2. Add empty state messages:
   - Home page: "No categories available yet."
   - Admin categories: "No categories created. Add one above."
   - Admin questions: "No questions in this category."
   - Results: handle edge case of zero questions gracefully.
3. Keep the loading component simple — a reusable `<Loading />` component or inline text.

## Acceptance Criteria
- Every data-fetching page shows a loading state before data arrives.
- Every list shows a helpful message when empty.

## Files to Modify
- `src/app/page.tsx`
- `src/app/admin/categories/page.tsx`
- `src/app/admin/questions/page.tsx`
- `src/app/results/page.tsx`
