# InterviewForge Implementation Plan

## Phase 1 — Project Setup
1. Create a Next.js app with TypeScript.
2. Add a simple UI layer for fast form-based workflows.
3. Configure deployment for Vercel.
4. Add environment variable support for optional Supabase usage.

## Phase 2 — Core Data Setup
1. Define categories.
2. Define questions linked to categories.
3. Store question text and correct answer for each item.
4. Seed a small starter dataset for local development.

## Phase 3 — Admin Features
1. Build an admin page to list categories.
2. Add a form to create categories.
3. Build an admin page to list questions by category.
4. Add a form to create questions with:
   - question text
   - correct answer
   - category
5. Allow basic edit/delete actions if time permits.

## Phase 4 — User Test Flow
1. Build a home page with available categories.
2. Let users select a category and start a session.
3. Generate a random set of questions from that category.
4. Build a test session page with one input per question.
5. Capture answers in local component state.
6. Submit all answers at the end of the session.

## Phase 5 — Results and Review
1. Compare user answers against correct answers.
2. Calculate total score.
3. Show a results page with:
   - final score
   - each question
   - user answer
   - correct answer
   - clear indication of mistakes
4. Allow users to restart or choose another category.

## Phase 6 — Final MVP Polish
1. Add basic validation for empty inputs.
2. Add loading and empty states.
3. Make the UI responsive.
4. Confirm local run and Vercel deployment.

## Suggested Folder Structure

```text
src/
  app/
    page.tsx
    admin/
      categories/page.tsx
      questions/page.tsx
    test/
      [categoryId]/page.tsx
    results/
      page.tsx
    api/
      categories/route.ts
      questions/route.ts
      sessions/route.ts
  components/
    CategoryList.tsx
    QuestionForm.tsx
    QuestionCard.tsx
    TestSessionForm.tsx
    ResultSummary.tsx
  lib/
    questions.ts
    scoring.ts
    db.ts
  types/
    category.ts
    question.ts
    session.ts
```

## Key Pages and Components

### Pages
- `/` — category selection
- `/admin/categories` — manage categories
- `/admin/questions` — manage questions
- `/test/[categoryId]` — active test session
- `/results` — score and answer review

### Components
- Category list
- Category form
- Question form
- Question card
- Test session form
- Result summary

## API Routes

If using server routes, keep them minimal:
- `GET /api/categories`
- `POST /api/categories`
- `GET /api/questions?categoryId=...`
- `POST /api/questions`
- `POST /api/sessions`

If using Supabase directly from server actions, these routes can be skipped.

## Simple Data Model

### Category
- id
- name

### Question
- id
- categoryId
- questionText
- correctAnswer

### Session
- id
- categoryId
- questionIds
- userAnswers
- score
- createdAt

## Phase 2 Considerations
- Add AI-generated questions per category.
- Add AI feedback for free-text answers.
- Add adaptive session difficulty.
- Add user history and personalized recommendations.
