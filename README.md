# Custom Sleep Tracker

Premium dark-mode one-tap sleep tracker built with Next.js App Router, Auth.js Google login, Prisma/PostgreSQL, Tailwind CSS, Framer Motion, shadcn-style primitives, and Recharts.

## Project structure

```txt
app/
  (auth)/page.tsx                 # Minimal Google-only landing page
  (app)/layout.tsx                # Authenticated shell
  (app)/dashboard/page.tsx        # Sleep action + analytics dashboard
  actions/                        # Server actions for auth and sleep sessions
  api/auth/[...nextauth]/route.ts # Auth.js route handlers
components/
  dashboard/                      # One-tap button, rating modal, chart, nav
  ui/                             # shadcn-style primitives
lib/                              # Prisma client and shared utilities
prisma/schema.prisma              # PostgreSQL data model
```

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables and fill in Google OAuth credentials:

   ```bash
   cp .env.example .env
   ```

3. Start PostgreSQL and apply the Prisma schema:

   ```bash
   npm run prisma:migrate
   ```

4. Run the local development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).
