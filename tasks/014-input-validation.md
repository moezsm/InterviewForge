# Task 014 — Input Validation

## Phase
Phase 6 — Final MVP Polish

## Objective
Add client-side validation to all forms to prevent empty or invalid submissions.

## Steps
1. In the admin category form: prevent submission if the category name is empty. Show an inline error message.
2. In the admin question form: prevent submission if question text or correct answer is empty. Show inline error messages.
3. In the test session form: highlight unanswered questions on submit. Allow submission but warn the user.
4. Disable submit buttons while a request is in flight to prevent double submissions.

## Acceptance Criteria
- Empty fields show validation messages.
- Submit buttons are disabled during pending requests.
- Unanswered test questions show a visual warning.

## Files to Modify
- `src/app/admin/categories/page.tsx`
- `src/app/admin/questions/page.tsx`
- `src/components/TestSessionForm.tsx`
