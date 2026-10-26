/**
 * Real screens from the Remedy app (iPhone simulator, fictional sample patient).
 * Source files live in ../app-media; the web-sized copies are in /public/app.
 */

export type Media = { img: string; video?: string; alt: string };

const clip = (name: string, alt: string): Media => ({
  img: `/app/clips/${name}-poster.jpg`,
  video: `/app/clips/${name}.mp4`,
  alt,
});

export const shot = (name: string, alt: string): Media => ({ img: `/app/shots/${name}.webp`, alt });

export const media = {
  importPapers: clip("01-import-papers", "Choosing papers to import: scan, photos, PDF, MyChart or Apple Health Records"),
  reading: clip("02-reading-your-papers", "Remedy reading the papers and counting medicines, rules, visits and to-dos"),
  aiSees: clip("03-what-the-ai-sees", "What the AI sees: the page with names and record numbers hidden"),
  review: clip("04-review-each-item", "Reviewing each item next to the exact line from the papers"),
  pickDate: clip("05-pick-surgery-date", "Picking the surgery date when the plan is ready"),
  todayBefore: clip("06-today-before-surgery", "Today before surgery: medicines to stop and put away"),
  logDose: clip("07-log-a-dose", "Today after surgery: tapping “I took it” for the dose that’s due"),
  searchMeds: clip("08-search-medicines", "Searching medicines: Advil is matched to Ibuprofen, don’t take"),
  planJourney: clip("09-plan-journey", "Plan: the whole journey from before surgery to recovery"),
  changeDate: clip("10-change-surgery-date", "Changing the surgery date moves the whole plan"),
  ask: clip("11-ask-a-question", "Ask: “Can I take Advil?” answered from the papers"),
  askSymptom: clip("12-ask-symptom", "Ask: a swollen calf gets “Call your surgeon’s office”"),
  simple: clip("13-simple-look", "The Simple look: big tiles and a “Read to me” button"),
  mychart: clip("14-import-from-mychart", "Importing medicines and visits from MyChart"),
  addVisit: clip("15-add-visit-to-calendar", "Adding a follow-up visit to Calendar"),

  medicineDetail: shot("14-medicine-detail", "Ibuprofen: don’t take right now, with the line from the papers"),
  todayAfter: shot("11-today-after-surgery", "Today on day 3 of recovery"),

  doseBanner: {
    img: "/app/widgets/dose-reminder-banner-poster.jpg",
    video: "/app/widgets/dose-reminder-banner.mp4",
    alt: "A dose reminder with “I took it” and “Remind me in 10 min” buttons",
  } as Media,
  lockScreen: { img: "/app/widgets/lockscreen-widgets-today-journey-rectangular.webp", alt: "Lock Screen with a dose reminder and the Today and Journey widgets" } as Media,
  homeWidgets: { img: "/app/widgets/home-today-large-journey-medium.webp", alt: "Home Screen with the large Today widget and the Journey widget" } as Media,
  homeWidgetsSmall: { img: "/app/widgets/home-today-small-journey-small-today-medium.webp", alt: "Small and medium Today and Journey widgets on the Home Screen" } as Media,
};

export const widget = (name: string, alt: string): Media => ({ img: `/app/widgets/${name}.webp`, alt });

export const addWidget: Media = {
  img: "/app/widgets/add-widget-poster.jpg",
  video: "/app/widgets/add-widget.mp4",
  alt: "Adding a Remedy widget from the widget gallery",
};
