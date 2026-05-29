# InterviewForge

InterviewForge is a lightweight Next.js web app for practicing technical interview questions. Admins can create test categories and question banks, and users can start a practice session, answer randomized questions, and review their score with correct answers at the end.

## Features

### MVP
- Admin category management
- Admin question management
- Randomized test sessions by category
- Simple answer submission flow
- End-of-session score summary
- Review of correct answers and mistakes

### Planned later
- AI-generated questions
- AI answer feedback
- Adaptive interview sessions
- Personalized learning paths

## Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel for deployment
- Supabase (optional for persistence and admin data)

## Run Locally

1. Clone the repository.
2. Install dependencies:
   - `npm install`
3. Start the development server:
   - `npm run dev`
4. Open `http://localhost:3000`

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Configure environment variables if Supabase is enabled.
4. Deploy.

Vercel will handle the Next.js build and hosting flow automatically.

## Usage

### Admin
1. Create a category such as Backend, .NET, or System Design.
2. Add questions and correct answers to that category.

### User
1. Choose a category.
2. Start a practice session.
3. Answer the randomized questions.
4. Review the final score, correct answers, and mistakes.

## Project Goal

Keep the product simple, fast to build, and easy to deploy as an MVP, while leaving room for future AI-powered interview coaching features.
