/**
 * ─────────────────────────────────────────────────────────────
 *  REMEDY SITE CONTENT — fill in everything marked `null` here.
 * ─────────────────────────────────────────────────────────────
 *
 * Anything left as `null` (or an empty list) is a placeholder:
 *  - by default it shows lorem text with a pink "(what to put here)" note
 *  - set NEXT_PUBLIC_HIDE_PLACEHOLDERS=true (e.g. in Vercel, or `.env.local`)
 *    and every unfilled section is hidden instead, so the site looks finished.
 */

export const SHOW_PLACEHOLDERS = process.env.NEXT_PUBLIC_HIDE_PLACEHOLDERS !== "true";

export type Stat = { value: string; label: string; source: string };
export type Person = { name: string; role: string; bio: string; photo?: string; linkedin?: string };

export const site = {
  /** Public contact email, e.g. "hello@remedyhealth.app" */
  email: null as string | null,

  /** Social links shown in the footer, e.g. [{ label: "LinkedIn", href: "https://…" }] */
  socials: [] as { label: string; href: string }[],

  /** Short line under the logo in the footer, e.g. "Built in Austin, TX" */
  footerNote: null as string | null,

  /** Launch timing shown on the waitlist card, e.g. "Spring 2027" */
  launch: null as string | null,

  /** Demo video: drop the file in /public and set e.g. "/demo.mp4" (poster optional) */
  demoVideo: { src: null as string | null, poster: null as string | null, length: "1:30" },

  /** Three problem stats with sources, e.g. { value: "40%", label: "of patients…", source: "JAMA 2023" } */
  stats: [] as Stat[],

  /** Pilot / partner clinic names (shown as a logo strip). Leave empty to hide. */
  partners: [] as string[],

  /** One testimonial from a clinician, beta tester or caregiver */
  testimonial: null as { quote: string; name: string; role: string } | null,

  /** Founding team, shown on the home page */
  team: [] as Person[],

  /** Roadmap dates (status items themselves are real; only dates are placeholders) */
  roadmap: {
    beta: null as string | null, // e.g. "Dec 2026"
    pilots: null as string | null, // e.g. "Q1 2027"
    launch: null as string | null, // e.g. "Spring 2027"
  },

  faq: {
    /** Answer to "Can a family member or caregiver help?" */
    caregivers: null as string | null,
    /** Answer to "When does Remedy launch, and which iPhones are supported?" */
    launchAndDevices: null as string | null,
  },

  clinics: {
    /** 2–3 sentences on the post-surgery gap from a clinic's view, with a cited stat */
    problem: null as string | null,
    /** Expected impact on calls / readmissions — use pilot data when you have it */
    impact: null as string | null,
    /** Pilot terms, e.g. "8-week pilot, free for our first five founding partners." */
    pilotTerms: null as string | null,
    /** What you measure in a pilot, e.g. "Patient surveys, call volume and missed doses." */
    pilotMeasures: null as string | null,
    /** Supported iPhones / iOS and which hospitals' MyChart work at launch */
    requirements: null as string | null,
    /** Person clinics will talk to */
    contact: null as { name: string; role: string; email: string } | null,
    /** Optional link to a one-page technical/security brief PDF for IT teams */
    techBriefUrl: null as string | null,
  },

  privacy: {
    lastUpdated: null as string | null, // e.g. "November 1, 2026"
    /** What the website/app collects (waitlist emails, analytics, crash reports…) */
    collected: null as string | null,
    /** Privacy contact email and company address */
    contact: null as string | null,
  },
};
