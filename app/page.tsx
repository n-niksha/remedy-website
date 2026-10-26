import Link from "next/link";
import HeroVisual from "@/components/HeroVisual";
import VideoSection from "@/components/VideoSection";
import HowItWorks from "@/components/HowItWorks";
import Showcase from "@/components/Showcase";
import EvidenceDemo from "@/components/EvidenceDemo";
import FAQ from "@/components/FAQ";
import Quotes from "@/components/Quotes";
import Capsule from "@/components/Capsule";
import Phone from "@/components/Phone";
import { media } from "@/lib/media";
import { site } from "@/lib/site";
import {
  Arrow, Check, Shield, Doc, Calendar, Lock, Users, Heart, Building, Alert, Pill, Scan, Bell, Chat, Phone as PhoneIco, Sun, Spark,
} from "@/components/Icons";

const tech = [
  "Apple Foundation Models",
  "Google Gemini",
  "Vision · VisionKit",
  "NaturalLanguage",
  "Epic MyChart",
  "SMART on FHIR",
  "HealthKit",
  "App Intents · Siri",
  "WidgetKit",
  "EventKit",
  "SwiftData",
];

const sources = [
  { Icon: Scan, t: "Camera scan", b: "Apple’s document scanner finds the edges, flattens the page and handles several pages in a row." },
  { Icon: Sun, t: "Photos", b: "Already took pictures of your papers? Pick them from your photo library." },
  { Icon: Doc, t: "PDF", b: "Open a PDF from Files — like one downloaded from your patient portal. Picture-only pages are read like a scan." },
  { Icon: Building, t: "MyChart (Epic)", b: "Sign in on your hospital’s own page and import medicines and visits. No AI needed — you still confirm every item." },
  { Icon: Heart, t: "Health Records", b: "Import medication records your hospital already shares with Apple Health." },
];

const rules = [
  { Icon: Shield, t: "Nothing is used until you confirm", b: "Every item from the AI or the hospital waits for your “Looks right” before it enters your plan." },
  { Icon: Doc, t: "Every quote must be on the page", b: "A medicine, rule, to-do or visit whose quote can’t be found in your papers is thrown out." },
  { Icon: Pill, t: "No invented doses", b: "A strength or amount that isn’t written on the page is removed. Missing stays missing." },
  { Icon: Calendar, t: "No guessed dates", b: "“4 days before” is kept only if that number is written. Visit dates need a full 4-digit year — otherwise it becomes “Call to book”." },
  { Icon: Alert, t: "Emergencies come first", b: "In Ask, words like “chest pain” always get “Call 911 now”. Warning signs get “Call your surgeon’s office”." },
  { Icon: Lock, t: "Same answer, every time", b: "Structured output and zero temperature mean the same papers give the same plan. Instructions hidden in papers are ignored." },
  { Icon: Scan, t: "A made-up page can’t replace yours", b: "If Gemini’s clean copy of a page drops too many of the words your phone read, Remedy throws it out and uses your phone’s own text." },
  { Icon: Pill, t: "Careful typo fixing", b: "Misread letters like “lbuprofen” are fixed on your phone — but medicine names, numbers and doses are never changed." },
  { Icon: Calendar, t: "Your surgery date, not a visit date", b: "A labelled line like “Date of surgery” always wins. You confirm the date at the end — already filled in, so it’s one tap." },
];

const everywhere = [
  { Icon: Bell, t: "Actionable reminders", b: "A notification at every dose time with “I took it” and “Remind me in 10 min” — no need to open the app." },
  { Icon: Chat, t: "Siri & Shortcuts", b: "“Hey Siri, what do I take in Remedy?” reads out what’s due. “I took my medicine” logs it." },
  { Icon: PhoneIco, t: "Home & Lock Screen widgets", b: "Today shows what’s due now and how many doses are taken. Journey counts down to surgery and through recovery." },
  { Icon: Calendar, t: "Calendar & Reminders", b: "Add visits to Calendar with alerts 1 day and 2 hours before. Visit, stop-day and to-do reminders, and to-dos in the Reminders app." },
  { Icon: Heart, t: "Apple Health steps", b: "Today’s step count right next to your walking goal." },
  { Icon: Users, t: "Accessible by default", b: "Dynamic Type, VoiceOver, Reduce Motion, “Read to me”, and plain words instead of medical shorthand." },
  { Icon: Doc, t: "Share & print", b: "An overview, a single day, your medicines or the whole journey as a PDF — for the fridge or a family member." },
  { Icon: Alert, t: "Help on every screen", b: "A big 911 button, the warning signs to watch for, and tap-to-call for your care team and pharmacy." },
  { Icon: Sun, t: "Four themes, Liquid Glass", b: "Remedy, Light, Dark or Sunrise, with Apple’s Liquid Glass design and a “next up” bar above the tabs." },
];

const roadmap = [
  { s: "done", label: "Built", t: "iOS app", b: "Scanning, redaction, AI extraction with checks, Confirm, Today, Plan, Ask, reminders, Siri and widgets." },
  { s: "done", label: "Built", t: "Hospital import", b: "MyChart via SMART on FHIR and Apple Health Records — tested on Epic’s developer sandbox." },
];

const faqs = [
  {
    q: "What papers can Remedy read?",
    a: "Pre-op and post-op instructions, discharge papers and after-visit summaries — scanned with the camera, picked from Photos, or opened as a PDF. You can also import medicines and visits from MyChart (Epic) or Apple Health Records.",
  },
  {
    q: "What happens to my personal information?",
    a: "Before anything is sent for reading, Remedy removes names, record numbers, birthdays, addresses and patient stickers on your phone, in four layers, and shows you exactly what was sent. Your plan, papers and chat are saved only on your phone. There’s no Remedy account and no Remedy server.",
  },
  {
    q: "Which AI does Remedy use?",
    a: "Google Gemini reads your papers first. It only ever gets the cleaned text and blacked-out photos (you can switch the photos off). If it can’t, Remedy falls back to Apple’s on-device AI, which works with no internet. The screen always shows which AI read your papers.",
  },
  {
    q: "What if the AI gets something wrong?",
    a: "Everything the AI returns is checked against your papers in code: quotes must be on the page, doses must be written, and dates are never guessed. If anything was left out, you see a “Check this” note. Then you confirm every item yourself, next to the exact line it came from.",
  },
  {
    q: "Is it easy to use for older adults?",
    a: "Yes. The Simple look has big tiles, big buttons, one thing per screen, almost no scrolling and a “Read to me” button. You can switch between Classic and Simple at any time.",
  },
  { q: "Can a family member or caregiver help?", a: site.faq.caregivers },
  { q: "When does Remedy launch, and what do I need?", a: site.faq.launchAndDevices },
];

export default function Home() {

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow" data-reveal>
              <span className="dot" /> Coming to iPhone · {site.launch}
            </span>
            <h1 className="h-display" data-reveal style={{ ["--d" as string]: 1 }}>
              Recovery,
              <br />
              <span className="serif mint-text">made simple.</span>
            </h1>
            <p className="lead" data-reveal style={{ ["--d" as string]: 2 }}>
              Remedy turns the papers you get before and after surgery into a simple, day-by-day plan — what to take,
              what to stop, what you can and can’t do yet, and when your visits are.
            </p>
            <div className="hero-actions" data-reveal style={{ ["--d" as string]: 3 }}>
              <Link href="#demo" className="btn btn-primary" data-magnetic>
                Watch the demo <Arrow />
              </Link>
              <Link href="/screens" className="btn btn-glass" data-magnetic>
                See every screen
              </Link>
            </div>
            <div className="hero-meta" data-reveal style={{ ["--d" as string]: 4 }}>
              <span className="check"><Check /> Every item from your own papers or record</span>
              <span className="check"><Check /> You confirm everything</span>
              <span className="check"><Check /> No account needed</span>
            </div>
          </div>
          <div data-reveal style={{ ["--d" as string]: 2 }}>
            <HeroVisual />
          </div>
        </div>
        <span className="scroll-hint" aria-hidden />
      </section>

      {/* ---------- BUILT ON ---------- */}
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container tech-strip">
          <span className="label">Built on</span>
          <div className="marquee">
            <div className="marquee-track">
              {[...tech, ...tech].map((p, i) => (
                <span className="marquee-item" key={i}>
                  <Spark size={16} /> {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROBLEM ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>The problem</span>
            <h2 className="h-1" data-reveal>
              Going home is the hardest part of <span className="serif mint-text">getting better.</span>
            </h2>
            <p className="lead" data-reveal>
              Patients leave with pages of dense instructions — medicines to stop days before surgery, new doses after,
              and rules that change day by day — often while tired, in pain, or relying on family to keep track.
            </p>
          </div>
          <div className="stats">
            {site.stats.map((s, i) => (
                <div className="stat glass" data-spot data-reveal style={{ ["--d" as string]: i }} key={i}>
                  <div className="stat-num mint-text">{s.value}</div>
                  <p>{s.label}</p>
                  <p className="muted" style={{ marginTop: 10, fontSize: 12.5 }}>Source: {s.source}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ---------- DEMO VIDEO ---------- */}
      <section className="section" id="demo" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" data-reveal>Demo</span>
            <h2 className="h-1" data-reveal>
              From paper to plan in <span className="serif mint-text">minutes.</span>
            </h2>
          </div>
          <VideoSection />
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>How it works</span>
            <h2 className="h-1" data-reveal>
              Five steps. <span className="serif mint-text">Zero guesswork.</span>
            </h2>
            <p className="lead" data-reveal>
              Remedy does the reading and organising. You stay in control of what goes into your plan. Every day is
              counted from surgery — Day 0 — so changing the date moves the whole plan at once.
            </p>
          </div>
          <div data-reveal>
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* ---------- SOURCES ---------- */}
      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Five ways in</span>
            <h2 className="h-2" data-reveal>However your papers arrive, Remedy can read them.</h2>
          </div>
          <div className="sources">
            {sources.map(({ Icon, t, b }, i) => (
              <div className="source glass" data-spot data-reveal style={{ ["--d" as string]: i }} key={t}>
                <span className={`feature-ico ${i > 2 ? "pink" : ""}`}><Icon size={22} /></span>
                <b>{t}</b>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- APP SHOWCASE ---------- */}
      <section className="section" id="app">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" data-reveal>The app</span>
            <h2 className="h-1" data-reveal>
              Designed to be <span className="serif mint-text">calm and clear.</span>
            </h2>
            <p className="lead" data-reveal>
              Two looks — Classic and Simple — built on the same plan. Pick a screen to see it in the real app.
            </p>
          </div>
          <Showcase />
        </div>
      </section>

      {/* ---------- SAFETY ---------- */}
      <section className="section" id="safety">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Safety</span>
            <h2 className="h-1" data-reveal>
              AI that <span className="serif mint-text">shows its work.</span>
            </h2>
            <p className="lead" data-reveal>
              Remedy doesn’t trust the AI. Its answers are checked against your papers in code, and every item from your
              papers shows the exact line it came from. Try it — hover an item, then confirm it.
            </p>
          </div>
          <EvidenceDemo />

          <div className="grid-3" style={{ marginTop: 28 }}>
            {rules.map(({ Icon, t, b }, i) => (
              <div className="feature glass" data-spot data-reveal style={{ ["--d" as string]: i % 3 }} key={t}>
                <span className={`feature-ico ${i % 2 ? "pink" : ""}`}><Icon size={22} /></span>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRIVACY ---------- */}
      <section className="section-tight">
        <div className="container">
          <div className="privacy-band glass glass-dark" data-reveal>
            <div>
              <span className="eyebrow" style={{ background: "rgba(255,255,255,.1)", borderColor: "rgba(255,255,255,.2)", color: "var(--mint-200)" }}>
                <Lock size={14} /> Privacy
              </span>
              <h2 className="h-1" style={{ marginTop: 20 }}>
                Cleaned on your phone, <span className="serif" style={{ color: "var(--mint-300)" }}>before anything leaves it.</span>
              </h2>
              <p className="lead" style={{ marginTop: 18 }}>
                Names, record numbers and other personal details are removed on your phone before anything is sent
                for reading. Your plan lives on your phone. No account, no sign-up, no Remedy server.
              </p>
              <ul className="check-list">
                <li><Check size={18} /> Four layers on-device: fixed rules, Apple’s name finder, Apple’s on-device AI, then every copy of a name is hidden</li>
                <li><Check size={18} /> The photo is blacked out too, sticker and barcode included — see “What the AI sees”, page by page</li>
                <li><Check size={18} /> Gemini only gets cleaned text and blacked-out photos; the on-device AI never leaves your phone</li>
                <li><Check size={18} /> Plan, papers and chat saved only on your phone</li>
                <li><Check size={18} /> Hospital sign-in is read-only; your password is typed only on the hospital’s page, and the access is forgotten after import</li>
              </ul>
            </div>
            <div className="device-orb" aria-hidden>
              <span className="orb-ring r1" />
              <span className="orb-ring r2" />
              <span className="orb-ring r3" />
              <div className="orb-core">
                <Shield size={44} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- EVERYWHERE ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" data-reveal>Beyond the app</span>
            <h2 className="h-1" data-reveal>
              There when you need it — <span className="serif mint-text">even when you don’t open it.</span>
            </h2>
          </div>
          <div className="widget-shots" data-reveal>
            <Phone media={media.lockScreen} />
            <Phone media={media.homeWidgets} />
            <Phone media={media.homeWidgetsSmall} />
          </div>
          <div className="grid-3">
            {everywhere.map(({ Icon, t, b }, i) => (
              <div className="feature glass" data-spot data-reveal style={{ ["--d" as string]: i % 3 }} key={t}>
                <span className={`feature-ico ${i % 2 ? "" : "pink"}`}><Icon size={22} /></span>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- AUDIENCE ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" data-reveal>Who it’s for</span>
            <h2 className="h-1" data-reveal>
              Built for patients. <span className="serif mint-text">And the people who help them.</span>
            </h2>
          </div>
          <div className="grid-3">
            {[
              { Icon: Heart, t: "Older adults", b: "The Simple look: big tiles, big buttons, one thing per screen and “Read to me” for every screen.", bg: "linear-gradient(135deg,#fde7ee,#fbc2d3)", c: "var(--pink-700)" },
              { Icon: Users, t: "Families & caregivers", b: "One clear plan everyone can follow — shared or printed as a PDF — instead of a folder of papers on the kitchen table.", bg: "linear-gradient(135deg,#dcf6ee,#8fdfc9)", c: "var(--mint-700)" },
              { Icon: Building, t: "Surgical teams & clinics", b: "Help patients follow the instructions you already give them — before and after surgery.", bg: "linear-gradient(135deg,#fbf8f5,#efe9e5)", c: "var(--ink)" },
            ].map(({ Icon, t, b, bg, c }, i) => (
              <div className="aud glass feature" data-spot data-reveal style={{ ["--d" as string]: i }} key={t}>
                <div className="aud-top" style={{ background: bg }}>
                  <span className="feature-ico" style={{ width: 72, height: 72, borderRadius: 24, color: c }}>
                    <Icon size={32} />
                  </span>
                </div>
                <div className="aud-body">
                  <h3>{t}</h3>
                  <p>{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ROADMAP ---------- */}
      <section className="section-tight" id="progress">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Progress</span>
            <h2 className="h-1" data-reveal>
              Built and <span className="serif mint-text">tested.</span>
            </h2>
          </div>
          <div className="roadmap">
            {roadmap.map((r, i) => (
              <div className="rm glass" data-spot data-reveal style={{ ["--d" as string]: i }} key={r.t}>
                <span className={`rm-status ${r.s}`} style={{ color: "var(--mint-700)" }}>
                  <i /> {r.label}
                </span>
                <h4>{r.t}</h4>
                <p>{r.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- QUOTES ---------- */}
      <section className="section-tight" id="quotes">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow" data-reveal>From clinicians</span>
              <h2 className="h-1" data-reveal>
                What care teams <span className="serif mint-text">are saying.</span>
              </h2>
            </div>
            <Quotes quotes={site.testimonials} />
          </div>
        </section>

      {/* ---------- TEAM ---------- */}
      <section className="section-tight" id="team">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow" data-reveal>Team</span>
              <h2 className="h-1" data-reveal>
                The people behind <span className="serif mint-text">Remedy.</span>
              </h2>
            </div>
            <div className="team">
              {site.team.map((m, i) => (
                <div className="member glass" data-spot data-reveal style={{ ["--d" as string]: i }} key={m.name}>
                  <h4>{m.name}</h4>
                  <div className="role">{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* ---------- CLINIC CTA ---------- */}
      <section className="section-tight">
        <div className="container">
          <div className="glass" data-spot data-reveal style={{ padding: "44px 44px", display: "flex", gap: 24, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ maxWidth: 620 }}>
              <span className="eyebrow"><Building size={14} /> For medical centers</span>
              <h2 className="h-2" style={{ marginTop: 16 }}>Give every surgical patient a plan they’ll actually follow.</h2>
              <p className="muted" style={{ margin: "10px 0 0" }}>Patients can import from Epic MyChart via SMART on FHIR, tested on Epic’s developer sandbox.</p>
            </div>
            <Link href="/clinics" className="btn btn-primary" data-magnetic>
              For clinics <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" data-reveal>FAQ</span>
            <h2 className="h-1" data-reveal>Questions, answered.</h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* ---------- LAUNCH ---------- */}
      <section className="section" id="launch" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="cta glass" data-spot data-reveal>
            <Capsule className="cta-capsule" interactive={false} />
            <span className="eyebrow">
              <span className="dot" /> Launching {site.launch}
            </span>
            <h2 className="h-1" style={{ maxWidth: 760 }}>
              Coming to iPhone <span className="serif mint-text">this winter.</span>
            </h2>
            <p className="lead">Questions, or want to hear when it’s out? Email us.</p>
            <a href={`mailto:${site.email}`} className="btn btn-primary" data-magnetic>
              {site.email} <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
