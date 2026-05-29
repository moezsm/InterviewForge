# Task 001 — Initialize Next.js Project

## Phase
Phase 1 — Project Setup

## Objective
Scaffold a new Next.js application with TypeScript and Tailwind CSS.

## Steps
1. Run `npx create-next-app@latest` with TypeScript enabled and the App Router.
2. Enable Tailwind CSS during project creation.
3. Verify the generated folder structure matches:
   ```
   src/
     app/
       layout.tsx
       page.tsx
   ```
4. Run `npm run dev` and confirm the default page loads at `http://localhost:3000`.
5. Remove any boilerplate content from `page.tsx` and replace with a simple heading: "InterviewForge".

## Acceptance Criteria
- Project starts without errors using `npm run dev`.
- TypeScript strict mode is enabled in `tsconfig.json`.
- Tailwind CSS utility classes render correctly.

## Files to Create / Modify
- `package.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
