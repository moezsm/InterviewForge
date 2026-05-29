# Task 009 — Home Page with Category Selection

## Phase
Phase 4 — User Test Flow

## Objective
Build the public home page where users choose a category and start a test session.

## Steps
1. Update `src/app/page.tsx`.
2. Fetch categories from `GET /api/categories`.
3. Display each category as a clickable card or button.
4. Clicking a category navigates to `/test/[categoryId]`.
5. Show a loading state while fetching.
6. Show an empty state if no categories exist.

## Acceptance Criteria
- Home page displays all available categories.
- Clicking a category navigates to the test session page for that category.
- Loading and empty states are handled.

## Files to Modify
- `src/app/page.tsx`
