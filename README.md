# ExamsCalendar -- Next.js SEO Migration (full parity)

## What's in here -- everything ported, build-tested

- `/` -- Landing page. Full 1:1 port of `LandingPage.jsx`: same hero, animations, stats bar, feature cards, footer, theme toggle. Navigation now uses real routes (`/pyq/jee-main` etc.) instead of local hash-state.
- `/pyq/[exam]` -- The FULL interactive browser (`QuestionBrowserClient`). Same sidebar (Subject/Chapter/Topic static + Year/Shift/Date live from DB), same `SearchBar`, same filter chips/pills, same mobile drawer, same pagination, same MathJax rendering, same reveal-answer behavior. This is a line-for-line behavioral port of your current `QuestionBrowser.jsx` -- opening this route feels identical to your app today.
- `/pyq/[exam]/[subject]/[chapter]` -- Same `QuestionBrowserClient`, but the page **server-fetches the first page of real questions** and seeds them as props before the component mounts. Result: the initial HTML response already contains real question text (crawlable), and after hydration it's the exact same interactive experience as above, just pre-filtered to this chapter.
- `/pyq/[exam]/[subject]/[chapter]/[slug]` -- Individual question page. Server-rendered question + answer + solution, unique metadata per question, JSON-LD `Question` schema, canonical URL.
- `/sitemap.xml`, `/robots.txt` -- auto-generated.

Ran `npm run build` -- compiles clean. Exam-level pages statically generated (4 exams); chapter and question pages render on-demand and are cached via ISR (see note below on why).

## Design decision: why chapter pages aren't pre-built at build time

With 328 chapters, eagerly generating every chapter page during the Vercel build would require your live Railway backend to be reachable *during that build* -- fragile, and it'll break your deploys if the backend is ever down or slow at exactly the wrong moment. Instead, chapter and question pages render on the **first real visit or crawl**, then get cached (1 hour by default, see `REVALIDATE_SECONDS` in `lib/api.js`). Same end result for SEO -- fast, cached, crawlable -- without coupling your frontend deploy to backend uptime.

## What's genuinely identical to your current app

Every visual element, every interaction, every filter, the search bar, MathJax rendering, the mobile drawer, pagination, theme toggle -- all ported directly from your real files, not rebuilt from scratch. The only functional difference: clicking an exam card now navigates to a real URL instead of changing internal app state, and chapter/question URLs are addressable and shareable now (they weren't before).

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill in your real Railway API URL
npm run dev
```

## Before deploying

- **CORS**: client-side fetches (live filters, "Reveal answer" on list pages, filter changes) hit `NEXT_PUBLIC_API_URL` directly from the browser. Make sure your FastAPI CORS config allows your Vercel domain.
- **Env vars on Vercel**: set `API_BASE_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_R2_PUBLIC_URL`, `SITE_URL`.
- Deploy as a **new** Vercel project (or preview branch) first -- your current live app keeps running untouched until you're happy with this and switch the domain over.

## Still outstanding (not blocking, but worth knowing)

1. **Sitemap only covers exam pages right now** -- add a `GET /api/sitemap` endpoint on FastAPI (returns `{slug, exam, subject, chapter, updated_at}` for every active question) and wire it into `app/sitemap.js` (TODO already marked there) so individual question URLs get submitted to Google at scale.
2. **AdminReview** -- untouched, out of scope per your instruction. Keep using it as-is (still has the client-side password issue flagged earlier, worth fixing whenever you touch that file next).
3. Theme toggle does a state update (no reload) but isn't shared in a global context across pages yet -- each page remembers via `localStorage`, consistent with your original `main.jsx` behavior.
