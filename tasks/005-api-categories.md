# Task 005 — Categories API Route

## Phase
Phase 3 — Admin Features

## Objective
Create the API route for listing and creating categories.

## Steps
1. Create `src/app/api/categories/route.ts`.
2. Implement `GET` handler:
   - Return all categories from `db.getCategories()` as JSON.
3. Implement `POST` handler:
   - Read `name` from the request body.
   - Validate that `name` is a non-empty string; return 400 if invalid.
   - Call `db.addCategory(name)` and return the new category with status 201.

## Acceptance Criteria
- `GET /api/categories` returns a JSON array of categories.
- `POST /api/categories` with `{ "name": "Frontend" }` creates and returns a new category.
- Missing or empty `name` returns a 400 error.

## Files to Create
- `src/app/api/categories/route.ts`
