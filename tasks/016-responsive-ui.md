# Task 016 — Responsive UI

## Phase
Phase 6 — Final MVP Polish

## Objective
Ensure all pages look good on mobile, tablet, and desktop screen sizes.

## Steps
1. Use Tailwind responsive utilities (`sm:`, `md:`, `lg:`) to adjust layouts.
2. Ensure forms are full-width on mobile and constrained on larger screens.
3. Ensure the category cards grid adjusts columns based on screen width.
4. Ensure the results page is readable on small screens.
5. Test at common breakpoints: 375px, 768px, 1024px, 1440px.

## Acceptance Criteria
- All pages are usable on a 375px-wide screen.
- Layouts adapt gracefully to larger screens.
- No horizontal scrolling on any page.

## Files to Modify
- `src/app/page.tsx`
- `src/app/admin/categories/page.tsx`
- `src/app/admin/questions/page.tsx`
- `src/app/test/[categoryId]/page.tsx`
- `src/app/results/page.tsx`
