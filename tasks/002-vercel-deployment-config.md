# Task 002 — Configure Vercel Deployment

## Phase
Phase 1 — Project Setup

## Objective
Ensure the project is ready for one-click deployment on Vercel.

## Steps
1. Confirm `next.config.ts` has no settings that block Vercel deployment (e.g. no custom server).
2. Add a `.env.example` file listing all optional environment variables with placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```
3. Add `.env.local` to `.gitignore`.
4. Verify `npm run build` completes without errors.
5. Push to GitHub and import into Vercel to confirm a successful deploy.

## Acceptance Criteria
- `npm run build` succeeds locally.
- `.env.example` is present with documented variables.
- `.env.local` is git-ignored.

## Files to Create / Modify
- `next.config.ts`
- `.env.example`
- `.gitignore`
