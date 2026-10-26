# Remedy — website

Coming-soon site for Remedy (Next.js App Router, no UI libraries).

```bash
npm install
npm run dev      # http://localhost:8000
npm run build && npm start
```

## Content
Site text, links, stats, quotes and team live in **`lib/site.ts`**. Contact is by email (no forms).

App screenshots and clips are in `public/app` (web-sized copies of `../app-media`), listed in `lib/media.ts`.
`/screens` shows every one of them.

## Before deploying
- **Domain:** set `NEXT_PUBLIC_SITE_URL` in Vercel so Open Graph previews resolve.

## Deploy
Import into Vercel (framework preset: Next.js). No other config needed.
