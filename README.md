# Remedy — website

Coming-soon site for Remedy (Next.js App Router, no UI libraries).

```bash
npm install
npm run dev      # http://localhost:8000
npm run build && npm start
```

## Filling in real content
All placeholder content lives in **`lib/site.ts`**. Anything left `null` / empty shows lorem text with a
pink "(what goes here)" note. To present the site before everything is filled in, set
`NEXT_PUBLIC_HIDE_PLACEHOLDERS=true` (Vercel → Settings → Environment Variables, or `.env.local`): every
unfilled section is hidden and the site reads as finished.

## Not in lib/site.ts
- **Forms:** `components/Waitlist.tsx` and `components/ClinicForm.tsx` only show a success state. Hook up
  Formspree / Resend / a route handler in their `onSubmit` before launch.
- **Domain:** set `NEXT_PUBLIC_SITE_URL` in Vercel so Open Graph previews resolve.
- **Mockup sample data** (medicines, Dr. Rivera, dates) lives in `components/Phone.tsx`,
  `HowItWorks.tsx` and `EvidenceDemo.tsx` — illustrative, change if you like.

## Deploy
Import into Vercel (framework preset: Next.js). No other config needed.
