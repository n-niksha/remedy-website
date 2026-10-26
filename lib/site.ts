/**
 * ─────────────────────────────────────────────────────────────
 *  REMEDY SITE CONTENT — the words and links used across the site.
 * ─────────────────────────────────────────────────────────────
 */

export type Stat = { value: string; label: string; source: string };
export type Testimonial = { quote: string; by: string };
export type Person = { name: string; role: string };

export const site = {
  email: "get.remedyapp@gmail.com",

  socials: [{ label: "YouTube", href: "https://www.youtube.com/@Remedy-v1u" }],

  launch: "Winter 2026",

  /** Demo video on YouTube (the id from the watch?v= link). Poster is a local copy of its thumbnail. */
  demoVideo: {
    youtubeId: "TjHznx987hQ",
    poster: "/app/demo-poster.jpg",
    title: "Remedy: Recovery made simple.",
  },

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

  team: [
    { name: "Dorron Hoffman", role: "Co-founder" },
    { name: "Nikhil Shah", role: "Co-founder" },
  ] as Person[],

  faq: {
    caregivers:
      "Yes. Share or print the plan as a PDF — an overview, a single day with boxes to tick, your medicines, or the whole journey — so a family member or caregiver can follow along. The plan itself stays on your phone.",
    launchAndDevices: "Remedy launches in Winter 2026 on iPhone. It needs iOS 27 or later.",
  },

  clinics: {
    problem:
      "Patients go home with pages of instructions — medicines to stop days before surgery, new doses after — and many don’t follow them. In one study, 42% of surgical patients didn’t follow their pre-op medication advice, and two surgeries were cancelled over blood thinners that weren’t stopped in time (Tse et al., 2025).",
    requirements: "An iPhone running iOS 27 or later.",
  },
};
