# Task 007 — Admin Categories Page

## Phase
Phase 3 — Admin Features

## Objective
Build the admin page for viewing and creating categories.

## Steps
1. Create `src/app/admin/categories/page.tsx`.
2. Display a list of all existing categories fetched from `GET /api/categories`.
3. Add a form at the top with a single text input for category name and a submit button.
4. On form submit, `POST` to `/api/categories` and refresh the list.
5. Show a loading state while fetching.
6. Show an empty state message when no categories exist.

## Components to Build
- `src/components/CategoryList.tsx` — renders a list of category names.
- `src/components/CategoryForm.tsx` — form with name input and submit button (optional extraction).

## Acceptance Criteria
- Page loads and displays seeded categories.
- User can create a new category and see it appear in the list.
- Empty and loading states are handled.

## Files to Create
- `src/app/admin/categories/page.tsx`
- `src/components/CategoryList.tsx`
