# Remedy — website

Coming-soon site for Remedy (Next.js App Router, no UI libraries).

```bash
npm install
npm run dev      # http://localhost:8000
npm run build && npm start
```

## Filling in real content
All site content lives in **`lib/site.ts`**. Anything left `null` / empty is hidden. To see where each
missing piece goes, set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true` in `.env.local`: unfilled spots then show
lorem text with a pink "(what goes here)" note.

App screenshots and clips are in `public/app` (web-sized copies of `../app-media`), listed in `lib/media.ts`.
`/screens` shows every one of them.

## Not in lib/site.ts
- **Forms:** `components/Waitlist.tsx` and `components/ClinicForm.tsx` only show a success state. Hook up
  Formspree / Resend / a route handler in their `onSubmit` before launch.
- **Domain:** set `NEXT_PUBLIC_SITE_URL` in Vercel so Open Graph previews resolve.

## Deploy
Import into Vercel (framework preset: Next.js). No other config needed.
