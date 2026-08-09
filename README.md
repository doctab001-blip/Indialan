# HindiQuest

**Verified:** `npm install`, `npm run dev`, and `npm run build` were all actually run against this exact codebase. The dashboard and lesson pages were hit over HTTP and their rendered content checked (not just a 200 status). One real bug was found and fixed in the process — see "Fonts" below.

A gamified Hindi-learning dashboard built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Lucide icons.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's in here

- `app/page.tsx` — the dashboard: top nav (logo, streak, avatar) and the zig-zagging lesson path, grouped into units.
- `app/lesson/[lessonId]/page.tsx` — a working lesson flow (multiple-choice questions, hearts, progress bar, completion screen). Clicking any completed/active node on the dashboard routes here.
- `lib/lessons.ts` — the single source of truth for units, lessons, and quiz content. Both pages read from this file, so adding a lesson or question means editing one place.
- `components/ui/` — standard shadcn/ui primitives (`button`, `avatar`, `progress`) implemented directly rather than requiring the shadcn CLI, so the project runs immediately after `npm install`.

## Wiring in real data later

`lib/lessons.ts` currently exports a static `UNITS` array. To connect it to a real backend:

1. Replace the static export with a fetch (server component / route handler / your API of choice).
2. Keep the `Unit` / `Lesson` / `QuizQuestion` shapes, or update `getLessonById` and `getAllLessonIds` to match your new shape.
3. Lesson progress (`status: "completed" | "active" | "locked"`) and hearts/streak on the dashboard are currently hardcoded — these are the two places you'll want to swap in a real user/progress model first.

## Fonts

Baloo 2 and Inter are loaded via a plain `<link>` tag in `app/layout.tsx`, **not** `next/font/google`. That's a deliberate fix: `next/font/google` fetches font files at build time, and `next build` fails outright if it can't reach `fonts.googleapis.com` — a real risk on offline CI runners, locked-down Docker builds, or restrictive corporate networks. A `<link>` fetches in the browser at runtime instead, so a blocked or slow font host just falls back to the system font rather than breaking your build.

## Design notes

- Palette: violet (primary/active), emerald (completed), orange (streak/accents), slate (locked) — chosen for a playful, high-contrast gamified feel.
- Fonts: Baloo 2 (rounded, playful) for headings and node labels, Inter for body text — see "Fonts" above for how they're loaded.
- The active lesson node has a small conic-gradient "rangoli" ring behind its icon as a subtle nod to the subject matter, instead of a generic glow.
