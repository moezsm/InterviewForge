# InterviewForge

InterviewForge is a lightweight Next.js web app for practicing technical interview questions. Admins can create test categories and question banks, and users can start a practice session, answer randomized questions, and review their score with correct answers at the end.

## Features

### MVP
- Admin category management (create and list categories)
- Admin question management (create questions per category)
- Randomized test sessions by category
- Simple answer submission flow
- End-of-session score summary
- Review of correct answers and mistakes

### Planned Later
- AI-generated questions
- AI answer feedback
- Adaptive interview sessions
- Personalized learning paths

## Tech Stack
- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Vercel** for deployment
- **Supabase** (optional, for persistence)

## Project Structure

```
src/
  app/
    page.tsx                    # Home — category selection
    layout.tsx                  # Root layout
    globals.css                 # Global styles
    admin/
      categories/page.tsx       # Admin: manage categories
      questions/page.tsx        # Admin: manage questions
    test/
      [categoryId]/page.tsx     # Test session
    results/
      page.tsx                  # Score & answer review
    api/
      categories/route.ts       # Categories REST API
      questions/route.ts        # Questions REST API
      sessions/route.ts         # Sessions REST API
  components/
    Loading.tsx                 # Reusable loading indicator
    CategoryList.tsx            # Category grid display
    CategoryForm.tsx            # Create category form
    QuestionForm.tsx            # Create question form
    QuestionCard.tsx            # Question display card
    TestSessionForm.tsx         # Test answer form
    ResultSummary.tsx           # Score and results display
  lib/
    db.ts                       # In-memory data store + seed data
    questions.ts                # Question shuffle utility
    scoring.ts                  # Answer scoring logic
  types/
    category.ts                 # Category type
    question.ts                 # Question type
    session.ts                  # Session & scoring types
    index.ts                    # Re-exports
```

---

## Run Locally

### Quick Start (Setup Script)

```bash
git clone https://github.com/moezsm/InterviewForge.git
cd InterviewForge
chmod +x setup.sh
./setup.sh
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Manual Setup

1. **Prerequisites**: Node.js 18+ and npm
2. Clone the repository:
   ```bash
   git clone https://github.com/moezsm/InterviewForge.git
   cd InterviewForge
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. (Optional) Create environment file for Supabase:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

### Step-by-Step Instructions

1. **Push to GitHub**
   Make sure your code is pushed to a GitHub repository.

2. **Import into Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
   - Click **"Add New…"** → **"Project"**.
   - Select your **InterviewForge** repository from the list.

3. **Configure Build Settings**
   Vercel auto-detects Next.js. Verify these settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install`

4. **Set Environment Variables** (optional, for Supabase)
   If you plan to use Supabase for persistent data:
   - In the Vercel project settings, go to **Settings** → **Environment Variables**.
   - Add:
     | Name | Value |
     |------|-------|
     | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
     | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

5. **Deploy**
   - Click **"Deploy"**. Vercel will build and deploy your app.
   - Your app will be live at `https://your-project.vercel.app`.

6. **Automatic Deployments**
   Every push to the `main` branch will trigger a new deployment automatically.

---

## Deploy with Supabase (Optional Persistence)

The MVP works with in-memory data (resets on server restart). To add persistent storage with Supabase:

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account/project.
2. Note your **Project URL** and **anon public key** from **Settings** → **API**.

### Step 2: Create Database Tables

In the Supabase SQL Editor, run:

```sql
-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Questions table
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sessions table (optional)
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id),
  question_ids UUID[] NOT NULL,
  user_answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed data
INSERT INTO categories (id, name) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Backend Development'),
  ('00000000-0000-0000-0000-000000000002', 'Frontend Development'),
  ('00000000-0000-0000-0000-000000000003', 'System Design');
```

### Step 3: Configure Environment Variables

Add your Supabase credentials to `.env.local` (local) or Vercel environment variables (production):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 4: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 5: Update Data Layer

Replace the in-memory functions in `src/lib/db.ts` with Supabase client calls. The API routes and components won't need changes since they use the same function signatures.

---

## Usage

### Admin
1. Navigate to `/admin/categories` to create categories (e.g., Backend, Frontend, System Design).
2. Navigate to `/admin/questions` to add questions to each category.

### User
1. Visit the home page and choose a category.
2. Answer the randomized questions in the test session.
3. Submit and review your score, correct answers, and mistakes.
4. Retry the same category or pick a different one.

---

## Development

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## License

MIT
