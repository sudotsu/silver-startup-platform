# Retiree Business Blueprint Platform

A senior-friendly course platform built with Next.js 16, Supabase, and Stripe.

## Features
- **Senior-First UX**: High contrast, large typography (18px base), clear navigation.
- **Course System**: Modules, lessons, worksheets, video embeds.
- **Progress Tracking**: "Mark Complete" logic.
- **Payments**: Stripe Checkout & Webhooks.
- **Tech Stack**: Next.js 16.1 (App Router), React 19, Tailwind v4, Supabase (SSR).

## Project Structure
- `src/app`: Application routes (App Router).
- `src/components/ui`: Reusable UI components (Senior-Friendly).
- `src/lib`: Utilities (Supabase, Stripe, Actions).
- `supabase/migrations`: SQL schema.

## Accessibility Checklist for Seniors
- [x] Base font size bumped to 18px (`text-lg`).
- [x] Links are underlined or button-styled for clarity.
- [x] Click targets are at least 48px (`h-12`).
- [x] Color contrast matches WCAG AA/AAA (Black on Off-White).
- [x] No auto-playing media or time-sensitive inputs.

---

## Deploy to Vercel (Step-by-step)

### 1. Supabase Setup
1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** -> **New Query**.
3. Copy/Paste the contents of `supabase/migrations/0000_init.sql` and run it.
4. Go to **Project Settings** -> **API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### 2. Stripe Setup
1. Create a Stripe account.
2. Create a Product: "Retiree Business Course" and a Price ($197). Copy the Price ID (e.g., `price_...`).
3. Updates `src/app/api/stripe/checkout/route.ts` with your Price ID OR set `STRIPE_COURSE_PRICE_ID` in env vars.
4. Go to **Developers** -> **Webhooks**.
   - Add endpoint: `https://your-vercel-url.vercel.app/api/stripe/webhook`
   - Events: `checkout.session.completed`
   - Copy the **Signing Secret** (`whsec_...`).

### 3. Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel` or push to GitHub.
2. Run `vercel` in this folder.
3. When asked for Environment Variables, add the following (or use Vercel Dashboard):

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_COURSE_PRICE_ID=price_...
```

### 4. Verification
Before deploying, run:
```bash
npm run typecheck  # Ensure TS types are valid
npm run build      # Verify Next.js build passes
```

If build fails on Vercel, check the "Build Logs" for missing environment variables.
