import type { Metadata } from "next";
import Link from "next/link";
import ClinicForm from "@/components/ClinicForm";
import Phone from "@/components/Phone";
import { media } from "@/lib/media";
import Ph, { Note } from "@/components/Ph";
import { site, SHOW_PLACEHOLDERS } from "@/lib/site";
import { Arrow, Check, Shield, Chart, Users, Doc, Lock, Building, Heart, Phone as PhoneIco } from "@/components/Icons";

export const metadata: Metadata = {
  title: "For clinics — Remedy",
  description: "Help surgical patients follow your instructions at home. Imports from Epic MyChart via SMART on FHIR; read-only, no Remedy server.",
};

const benefits = [
  { Icon: Heart, t: "Your instructions, not a template", b: "Patients get a day-by-day plan built from the instructions you already give them — not a generic template." },
  { Icon: Building, t: "Built on the MyChart standard", b: "Patients can import medicines and visits from Epic via SMART on FHIR, the standard your patient apps already use — tested on Epic’s developer sandbox. Or they simply scan the papers you hand them." },
  { Icon: Lock, t: "Read-only, no Remedy server", b: "Remedy never writes to the hospital record. It requests only medicines and appointments, keeps the token in memory, and forgets it after import." },
  { Icon: Shield, t: "AI checked against the page", b: "Quotes must match the page, doses must be written, and dates are never guessed. Every item is confirmed by the patient." },
  { Icon: Users, t: "Built for older patients", b: "A Simple look with big buttons and “Read to me”, plus a plan family members can follow too." },
  { Icon: Chart, t: "Expected impact", impact: true },
];

const compare = [
  ["Medication timing", "Patient works it out", "Reminders at every dose, with “I took it”"],
  ["“Stop 4 days before surgery”", "Easy to miscount", "Counted from surgery day — moves if the date changes"],
  ["Finding an instruction later", "Search through pages", "Ask in plain language — answers quote the paper"],
  ["Warning signs", "Buried on page 3", "Ask answers “Call 911” or “Call your surgeon” first"],
  ["Accuracy check", "None", "Checked against the page, with the source line shown"],
  ["Where the plan lives", "Kitchen table", "On the patient’s phone — no account, no Remedy server"],
];

export default function Clinics() {
  const pilot = [
    { t: "Intro call", b: "30 minutes to understand your patient population and pre-op / discharge workflow." },
    { t: "Pick a cohort", b: "Choose a service line — e.g. orthopedics, cardiac or general surgery." },
    { t: "Hand off at pre-op", b: "Staff tell patients about Remedy. Patients scan their papers or import from MyChart at home." },
    { t: "Review results", b: site.clinics.pilotMeasures, ph: "what you measure: surveys, call volume, missed doses…" },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow" data-reveal>
            <Building size={14} /> For medical centers
          </span>
          <h1 className="h-display" data-reveal style={{ ["--d" as string]: 1, marginTop: 24 }}>
            Your instructions,
            <br />
            <span className="serif mint-text">followed at home.</span>
          </h1>
          <p className="lead" data-reveal style={{ ["--d" as string]: 2 }}>
            Remedy turns the pre-op and discharge papers your team already writes into a day-by-day plan patients can
            actually follow — with nothing new for your staff to install or maintain.
          </p>
          <div className="hero-actions" data-reveal style={{ ["--d" as string]: 3, justifyContent: "center", marginTop: 32 }}>
            <Link href="#contact" className="btn btn-primary" data-magnetic>
              Get in touch <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="split">
            <div data-reveal>
              <span className="eyebrow">The gap</span>
              <h2 className="h-1" style={{ marginTop: 18 }}>
                Discharge ends at the door. <span className="serif mint-text">Recovery doesn’t.</span>
              </h2>
              {(site.clinics.problem || SHOW_PLACEHOLDERS) && (
                <p className="lead" style={{ marginTop: 18 }}>
                  <Ph value={site.clinics.problem} note="2–3 sentences on the post-surgery gap from a clinic’s view, with a cited stat" />
                </p>
              )}
              <ul className="check-list">
                {["Medicines started, stopped and paused around the same date", "Relative instructions like “4 days before surgery”", "Older patients and overwhelmed caregivers"].map((t) => (
                  <li key={t} style={{ color: "var(--ink-2)" }}>
                    <Check size={18} /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal style={{ display: "flex", justifyContent: "center" }}>
              <Phone media={media.medicineDetail} width={280} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" data-reveal>Why partner</span>
            <h2 className="h-1" data-reveal>
              Built to fit your workflow — <span className="serif mint-text">not change it.</span>
            </h2>
          </div>
          <div className="grid-3">
            {benefits
              .filter((x) => !x.impact || site.clinics.impact || SHOW_PLACEHOLDERS)
              .map(({ Icon, t, b, impact }, i) => (
                <div className="feature glass" data-spot data-reveal style={{ ["--d" as string]: i % 3 }} key={t}>
                  <span className={`feature-ico ${i % 2 ? "pink" : ""}`}><Icon size={22} /></span>
                  <h3>{t}</h3>
                  <p>{impact ? <Ph value={site.clinics.impact} note="expected impact on calls / readmissions — use pilot data when you have it" /> : b}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Compared</span>
            <h2 className="h-1" data-reveal>Paper vs. Remedy</h2>
          </div>
          <div className="compare glass" data-reveal>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Printed instructions</th>
                  <th>With Remedy</th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([a, b, c]) => (
                  <tr key={a}>
                    <td><b>{a}</b></td>
                    <td className="x">{b}</td>
                    <td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {(site.clinics.pilotTerms || SHOW_PLACEHOLDERS) && (
      <section className="section" id="pilot">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Pilot program</span>
            <h2 className="h-1" data-reveal>
              Four steps to <span className="serif mint-text">your first cohort.</span>
            </h2>
            {(site.clinics.pilotTerms || SHOW_PLACEHOLDERS) && (
              <p className="lead" data-reveal>
                <Ph value={site.clinics.pilotTerms} note="pilot length, number of clinics, cost — e.g. “free for founding partners”" />
              </p>
            )}
          </div>
          <div className="timeline">
            {pilot
              .filter((p) => p.b || SHOW_PLACEHOLDERS)
              .map((p, i) => (
                <div className="t-step" data-reveal style={{ ["--d" as string]: i }} key={p.t}>
                  <span className="t-dot glass">0{i + 1}</span>
                  <h4>{p.t}</h4>
                  <p>{p.ph ? <Ph value={p.b} note={p.ph} lorem="Lorem ipsum dolor sit amet." /> : p.b}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
      )}

      <section className="section-tight">
        <div className="container grid-2">
          <div className="glass feature" data-spot data-reveal>
            <span className="feature-ico"><Doc size={22} /></span>
            <h3>Technical overview</h3>
            <p>
              Swift and SwiftUI. VisionKit, Vision and PDFKit for reading; personal details removed on-device before anything
              is sent for reading. Google Gemini (JSON schema, cleaned text and blacked-out photos only), with Apple Foundation Models on-device
              as the fallback (guided generation); Private Cloud Compute support is built in, off until Apple approves access. SMART on FHIR with OAuth 2.0 + PKCE, FHIR R4 and DSTU2, tested on
              Epic’s sandbox. HealthKit, EventKit, App Intents, WidgetKit, SwiftData.
            </p>
            {site.clinics.techBriefUrl ? (
              <a href={site.clinics.techBriefUrl} className="btn btn-glass btn-sm" style={{ alignSelf: "flex-start" }}>
                Download technical brief <Arrow />
              </a>
            ) : (
              <p><Note>optional: link a one-page technical/security brief PDF for IT teams</Note></p>
            )}
          </div>
          <div className="glass feature" data-spot data-reveal style={{ ["--d" as string]: 1 }}>
            <span className="feature-ico pink"><PhoneIco size={22} /></span>
            <h3>What patients need</h3>
            <p>
              An iPhone, the papers you already give them, and nothing else — no Remedy account, no sign-up. Works with
              printed papers, photos, PDFs, and MyChart or Apple Health Records where the hospital supports them.
            </p>
            {(site.clinics.requirements || SHOW_PLACEHOLDERS) && (
              <p>
                <Ph value={site.clinics.requirements} note="supported iPhone models / iOS, and which hospitals’ MyChart works at launch" lorem="" />
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container split" style={{ alignItems: "start" }}>
          <div data-reveal>
            <span className="eyebrow">Contact</span>
            <h2 className="h-1" style={{ marginTop: 18 }}>
              Let’s talk about <span className="serif mint-text">your patients.</span>
            </h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Tell us about your clinic and we’ll get back to you.
            </p>
            {(site.clinics.contact || SHOW_PLACEHOLDERS) && (
              <div className="person" style={{ marginTop: 32 }}>
                <span className="avatar" />
                <div>
                  <b>{site.clinics.contact?.name ?? "Lorem Ipsum"}</b>
                  <div className="muted">
                    {site.clinics.contact ? (
                      <>
                        {site.clinics.contact.role} · <a href={`mailto:${site.clinics.contact.email}`}>{site.clinics.contact.email}</a>
                      </>
                    ) : (
                      <>
                        Co-founder <Note>name, title + direct email</Note>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div data-reveal style={{ ["--d" as string]: 1 }}>
            <ClinicForm />
          </div>
        </div>
      </section>
    </>
  );
}
