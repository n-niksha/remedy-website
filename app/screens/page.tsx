import type { Metadata } from "next";
import Phone from "@/components/Phone";
import { media, shot, widget, addWidget, type Media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Every screen — Remedy",
  description: "Every screen in the Remedy app, from adding your papers to widgets and reminders.",
};

type Screen = { m: Media; caption: string };

/** Every screenshot and clip from the app, in app order. All show a fictional sample patient. */
const groups: { id: string; title: string; body: string; screens: Screen[] }[] = [
  {
    id: "add",
    title: "Add your papers",
    body: "Before- or after-surgery papers, from the camera, Photos, a PDF, MyChart or Apple Health Records.",
    screens: [
      { m: shot("01-import-choose-papers", "Which papers: before or after surgery, names to hide, and five ways to add them"), caption: "Choose which papers, add names to hide, then pick how to add them." },
      { m: shot("02-import-pick-photos", "Picking photos of papers from the photo library"), caption: "Pick up to 10 photos of your papers." },
      { m: media.importPapers, caption: "Adding papers." },
      { m: media.mychart, caption: "Importing from MyChart." },
    ],
  },
  {
    id: "reading",
    title: "Reading, privately",
    body: "Personal details are hidden on the phone first. You can see exactly what was sent.",
    screens: [
      { m: shot("03-reading-your-papers", "Reading your papers: words read, name and record numbers hidden, medicines found"), caption: "Reading the words, hiding your name and record numbers, then finding medicines, rules and visits." },
      { m: shot("04-what-the-ai-sees", "What the AI sees: the page with personal details hidden"), caption: "What the AI sees — blacked-out parts never left your phone." },
      { m: media.reading, caption: "Reading your papers." },
      { m: media.aiSees, caption: "Scrolling through what was sent." },
    ],
  },
  {
    id: "confirm",
    title: "Check each item",
    body: "One item at a time, next to the exact line from your papers.",
    screens: [
      { m: shot("05-review-stop-taking", "Stop taking Fish Oil from 7 days before surgery, with the line from the papers"), caption: "Stop taking Fish Oil from 7 days before surgery — with the line it came from." },
      { m: shot("06-review-edit-item", "Meloxicam: stop from 4 days before surgery because it causes blood thinning"), caption: "Looks right, Edit, or Not on my papers." },
      { m: shot("07-review-ok-to-take", "Editing an item's name and timing"), caption: "Edit anything that doesn’t match your papers." },
      { m: media.review, caption: "Reviewing each item." },
      { m: shot("08-plan-ready-surgery-date", "Your plan is ready: pick your surgery date"), caption: "Your plan is ready — confirm the surgery date." },
      { m: media.pickDate, caption: "Picking the surgery date." },
    ],
  },
  {
    id: "today",
    title: "Today",
    body: "What matters right now, before and after surgery.",
    screens: [
      { m: shot("09-today-before-surgery", "Today before surgery: countdown and medicines to stop today"), caption: "Before surgery: a countdown and what to stop today." },
      { m: shot("10-today-put-away", "Medicines marked as put away"), caption: "Mark medicines as put away." },
      { m: shot("11-today-after-surgery", "Today after surgery: the dose that's due"), caption: "After surgery: the dose that’s due, with I took it and Skip." },
      { m: shot("12-today-marked-taken", "A missed dose and a dose marked as taken"), caption: "Missed doses, and doses marked as taken." },
      { m: media.todayBefore, caption: "Today before surgery." },
      { m: media.logDose, caption: "Logging a dose." },
    ],
  },
  {
    id: "medicines",
    title: "Medicines",
    body: "Search by brand or generic name and see whether you can take it right now.",
    screens: [
      { m: shot("13-medicines-search", "Searching Advil finds Ibuprofen: don't take"), caption: "Advil finds Ibuprofen — don’t take until your surgeon says it’s OK." },
      { m: shot("14-medicine-detail", "Ibuprofen details with the line from the papers"), caption: "Details, with the line from your papers." },
      { m: media.searchMeds, caption: "Searching medicines." },
    ],
  },
  {
    id: "plan",
    title: "Plan",
    body: "The whole journey, rules, visits and to-dos — counted from surgery day.",
    screens: [
      { m: shot("15-plan-journey", "Plan: pick a day or see the whole journey"), caption: "Pick a day, or see every key day on one timeline." },
      { m: shot("22-plan-visits", "Rules, visits and to-dos in the plan"), caption: "Rules like no driving, visits and to-dos." },
      { m: shot("23-visit-detail", "Follow-up visit details with Add to Calendar and Call"), caption: "Visit details with Add to Calendar and Call." },
      { m: shot("24-add-to-calendar", "Adding the visit to Calendar with alerts"), caption: "Added to Calendar with alerts 2 hours and 1 day before." },
      { m: media.planJourney, caption: "Scrolling the journey." },
      { m: media.addVisit, caption: "Adding a visit to Calendar." },
    ],
  },
  {
    id: "ask",
    title: "Ask",
    body: "Answers come only from your papers, with the line they came from.",
    screens: [
      { m: shot("18-ask-answer", "Ask: Can I take Advil? answered from the papers"), caption: "“Can I take Advil?” — answered from your papers." },
      { m: shot("19-ask-symptom", "Ask: a swollen calf gets Call your surgeon's office"), caption: "Warning signs get “Call your surgeon’s office”." },
      { m: media.ask, caption: "Asking a question." },
      { m: media.askSymptom, caption: "Asking about a symptom." },
    ],
  },
  {
    id: "settings",
    title: "Settings & looks",
    body: "Change the surgery date and the whole plan moves. Pick Classic or Simple, and a theme.",
    screens: [
      { m: shot("16-settings-surgery-date", "Changing the surgery date in Settings"), caption: "Change the surgery date." },
      { m: shot("17-plan-after-date-change", "The plan after the surgery date changed"), caption: "Every day in the plan moves with it." },
      { m: shot("20-settings-look", "Choosing the Classic or Simple look and a theme"), caption: "Classic or Simple, and four themes." },
      { m: shot("21-simple-look", "The Simple look with big tiles"), caption: "The Simple look: big tiles and Read to me." },
      { m: media.changeDate, caption: "Changing the surgery date." },
      { m: media.simple, caption: "Using the Simple look." },
    ],
  },
  {
    id: "widgets",
    title: "Widgets & reminders",
    body: "On the Home Screen, the Lock Screen and in notifications.",
    screens: [
      { m: widget("banner-dose-reminder-home", "A dose reminder banner with I took it and Remind me in 10 min"), caption: "A dose reminder with I took it and Remind me in 10 min." },
      { m: media.doseBanner, caption: "Answering a dose reminder." },
      { m: widget("notification-center-real-8am-reminder", "An 8 AM reminder in Notification Center"), caption: "An 8 AM reminder scheduled by the app." },
      { m: widget("lockscreen-widgets-today-journey-rectangular", "Lock Screen with the Today and Journey widgets"), caption: "Lock Screen: Today and Journey widgets." },
      { m: widget("lockscreen-editor-remedy-widgets", "Remedy widgets in the Lock Screen editor"), caption: "Adding Remedy widgets to the Lock Screen." },
      { m: widget("lockscreen-inline-widget-picker", "The inline Remedy widget in the Lock Screen picker"), caption: "The inline widget above the clock." },
      { m: widget("home-today-large-journey-medium", "Large Today widget and medium Journey widget"), caption: "Home Screen: large Today, medium Journey." },
      { m: widget("home-today-medium-journey-large", "Medium Today widget and large Journey widget"), caption: "Medium Today, large Journey." },
      { m: widget("home-today-small-journey-small-today-medium", "Small Today and Journey widgets and a medium Today widget"), caption: "Small and medium widgets." },
      { m: addWidget, caption: "Adding a widget from the gallery." },
    ],
  },
];

export default function Screens() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 20 }}>
        <div className="container">
          <span className="eyebrow" data-reveal>Inside the app</span>
          <h1 className="h-display" data-reveal style={{ ["--d" as string]: 1, marginTop: 24 }}>
            Every <span className="serif mint-text">screen.</span>
          </h1>
          <p className="lead" data-reveal style={{ ["--d" as string]: 2 }}>
            Real screens and recordings from Remedy, in the order you’d use it. All show a fictional sample patient.
          </p>
          <nav className="screens-jump" data-reveal style={{ ["--d" as string]: 3 }}>
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="pill pill-grey">{g.title}</a>
            ))}
          </nav>
        </div>
      </section>

      {groups.map((g) => (
        <section className="section-tight" id={g.id} key={g.id}>
          <div className="container">
            <div className="section-head">
              <h2 className="h-2" data-reveal>{g.title}</h2>
              <p className="lead" data-reveal>{g.body}</p>
            </div>
            <div className="screens-grid">
              {g.screens.map((s, i) => (
                <figure className="screen-card" data-reveal style={{ ["--d" as string]: i % 4 }} key={s.m.img}>
                  <Phone media={s.m} />
                  <figcaption>
                    {s.m.video && <span className="pill pill-mint">Clip</span>} {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
