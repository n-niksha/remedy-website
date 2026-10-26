/**
 * ─────────────────────────────────────────────────────────────
 *  REMEDY SITE CONTENT — fill in everything marked `null` here.
 * ─────────────────────────────────────────────────────────────
 *
 * Anything left as `null` (or an empty list) is hidden on the site.
 * To see where each missing piece goes, set NEXT_PUBLIC_SHOW_PLACEHOLDERS=true
 * (e.g. in `.env.local`): unfilled spots then show lorem text with a pink note.
 */

export const SHOW_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export type Stat = { value: string; label: string; source: string };
export type Testimonial = { quote: string; by: string };
export type Person = { name: string; role: string };

export const site = {
  /** Public contact email, e.g. "hello@remedyhealth.app" */
  email: null as string | null,

  /** Social links shown in the footer, e.g. [{ label: "LinkedIn", href: "https://…" }] */
  socials: [] as { label: string; href: string }[],

  /** Short line under the logo in the footer, e.g. "Built in Austin, TX" */
  footerNote: null as string | null,

  /** Launch timing shown on the waitlist card, e.g. "Spring 2027" */
  launch: null as string | null,

  /** Demo video on YouTube (the id from the watch?v= link). Poster is a local copy of its thumbnail. */
  demoVideo: {
    youtubeId: "TjHznx987hQ" as string | null,
    poster: "/app/demo-poster.jpg" as string | null,
    title: "Remedy: Recovery made simple.",
  },

  /** Three problem stats with sources, e.g. { value: "40%", label: "of patients…", source: "JAMA 2023" } */
  stats: [
    {
      value: "42%",
      label: "of surgical patients didn’t follow their pre-op medication advice — most often because they forgot or misunderstood it.",
      source: "Tse et al., Healthcare, 2025",
    },
    {
      value: "78%",
      label: "of patients leaving the ER didn’t fully understand their discharge instructions — and most didn’t realise it.",
      source: "Engel et al., Annals of Emergency Medicine, 2009",
    },
    {
      value: "1 in 4",
      label: "older adults is back in hospital within six months of major surgery — 1 in 8 within a month.",
      source: "Wang et al., JAMA Network Open, 2024",
    },
  ] as Stat[],

  /** Pilot / partner clinic names (shown as a logo strip). Leave empty to hide. */
  partners: [] as string[],

  /** Quotes from clinicians, shown as a carousel on the home page. `by` is the attribution line. */
  testimonials: [
    {
      quote: "My patients struggle to recall what they should do with their medications; this will be so helpful!",
      by: "HSS physician",
    },
    {
      quote: "I often have patients who sit in my office and manually enter the dates into their calendar — this does it for them! Brilliant!!",
      by: "Anonymous doctor",
    },
    {
      quote: "The safety of our surgeries and anesthesia often relies on patients timing their medications correctly. This is a fantastic tool!",
      by: "Perioperative medical team",
    },
  ] as Testimonial[],

  /** Founding team, shown on the home page */
  team: [
    { name: "Dorron Hoffman", role: "Co-founder" },
    { name: "Nikhil Shah", role: "Co-founder" },
  ] as Person[],

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
