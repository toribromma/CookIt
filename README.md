# Meal Muse — deterministic recipes with Supabase auth

Live: https://cook-it-eight.vercel.app/  _(URL unchanged; UI/metadata now say Meal Muse)_

This app lets you search deterministic recipes (Hugging Face), save favorites, and build a shopping list backed by Supabase auth and tables.

## Features
- Email/password auth (Supabase GoTrue), password reset via `/reset`, password update with confirmation, and client-side validation
- Deterministic recipe generation via Hugging Face `chat/completions`
- Filters: meal type, cuisine, diet
- Save/unsave recipes per user (Supabase `saved_recipes`)
- Shopping list per user with check/uncheck + from-recipe tagging (`shopping_list_items`)
- Aggregated shopping list merges identical ingredients, shows per-recipe contributions, and supports removing whole recipe batches (even multiple instances of the same recipe)
- Saved recipes expand to show ingredients and instructions
- Loading skeletons during recipe search for smoother UX

## Stack
- Next.js (app router, Node runtime)
- Supabase JS client (`@supabase/supabase-js`)
- Hugging Face Inference API
- Tailwind base import for resets; custom CSS theme

## Prerequisites
- Node.js 18+ recommended
- Supabase project (URL + anon key)
- Hugging Face API token

## Local setup
1) Install deps  
   ```bash
   npm install
   ```

2) Env vars: create `.env.local`  
   ```bash
   HF_API_KEY=your_hf_token
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3) Database: run schema in Supabase SQL editor  
   - File: `supabase/schema.sql`  
   - Creates `profiles`, `saved_recipes`, `shopping_list_items` with RLS policies.

4) Dev server  
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## Deployment (Vercel)
- Set env vars in Vercel project settings:
  - `HF_API_KEY`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Deploy the repo; no Turbopack flags are used (Webpack default).

## API routes
- `GET /api/recipes/search?q=term&mealType=&cuisine=&diet=`  
  - Deterministic HF call with caching.  
  - Returns `{ recipes: [...] }` JSON or error JSON.

## Auth flow
- Sign up / sign in via the home page panel.
- Reset password sends email; redirect completes at `/reset`.
- Data is per-user in Supabase tables (RLS enforced).

## Troubleshooting
- 500 from recipe search: check `HF_API_KEY` is set and valid; inspect server logs for HF response parsing errors.
- Supabase 404/401: ensure `supabase/schema.sql` ran and tables exist in `public` with RLS policies; confirm URL/anon key match the target project.
- Dark mode contrast: theme is set in `app/globals.css`; adjust CSS variables if needed.

## Scripts
- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run start` — start production build
- `npm run lint` — lint code

## Project structure (key paths)
- `app/` — Next app router pages and API routes
- `app/api/recipes/search/route.js` — Hugging Face recipe search
- `components/` — auth, search, saved, shopping, providers
- `src/lib/supabaseClient.js` — Supabase client setup
- `supabase/schema.sql` — database schema + RLS
