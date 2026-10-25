"use client";

import { useEffect, useState } from "react";
import { AppIcon } from "./Phone";
import { Check, Pill, Calendar, Alert, Scan, Doc, Building, Heart } from "./Icons";

const steps = [
  {
    title: "Add your papers",
    body: "Scan with the camera, pick photos, open a PDF from your patient portal — or import straight from MyChart or Apple Health Records.",
  },
  {
    title: "Personal details are removed on your phone",
    body: "Names, record numbers, birthdays and addresses are blacked out on-device — by fixed rules, then Apple’s on-device AI — before the text is sent for reading.",
  },
  {
    title: "AI finds every instruction — then gets checked",
    body: "Medicines, rules, to-dos and visits are pulled out word for word. Anything that isn’t actually on the page is thrown out.",
  },
  {
    title: "You confirm each item",
    body: "One card at a time, with the exact line from your papers. Nothing is used until you say “Looks right”.",
  },
  {
    title: "Follow a simple daily plan",
    body: "Reminders at every dose time with “I took it” right on the notification, plus Siri, widgets and visit alerts.",
  },
];

const DURATION = 5200;

function Stage({ i }: { i: number }) {
  if (i === 0)
    return (
      <div style={{ display: "grid", gap: 22, justifyItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div className="doc" style={{ height: 230 }}>
            <div className="scan-beam" />
            <div className="doc-title">PRE-OPERATIVE INSTRUCTIONS</div>
            <div style={{ color: "var(--muted)", marginBottom: 10 }}>Page 1 of 3</div>
            {Array.from({ length: 11 }, (_, k) => (
              <div key={k} className="doc-line" style={{ width: `${55 + ((k * 41) % 45)}%` }} />
            ))}
          </div>
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { t: "Camera", I: Scan },
            { t: "Photos", I: Doc },
            { t: "PDF", I: Doc },
            { t: "MyChart", I: Building },
            { t: "Health Records", I: Heart },
          ].map(({ t, I }, k) => (
            <span key={t} className="pill pill-grey glass" style={{ animation: `notifIn .5s ${k * 90}ms both cubic-bezier(.22,1,.36,1)`, borderRadius: 999 }}>
              <I size={13} /> {t}
            </span>
          ))}
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div style={{ display: "grid", gap: 18, justifyItems: "center", width: "100%" }}>
        <div className="doc doc-text" style={{ width: "100%", maxWidth: 380, fontSize: 11.5 }}>
          <div>Patient: <span className="redact" style={{ animationDelay: "300ms" }}>Margaret J. Rivera</span></div>
          <div>MRN: <span className="redact" style={{ animationDelay: "500ms" }}>0048213977</span> &nbsp;DOB: <span className="redact" style={{ animationDelay: "700ms" }}>03/14/1951</span></div>
          <div>Address: <span className="redact" style={{ animationDelay: "900ms" }}>12 Oak Ln, Springfield</span></div>
          <div style={{ marginTop: 8 }}>Stop ibuprofen (Motrin, Advil) 4 days before surgery.</div>
          <div>Aspirin 325mg: hold until cleared by surgeon.</div>
          <div>Questions? Call our office (555) 010-2200.</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          <span className="pill pill-mint"><Check size={12} /> 4 personal details removed</span>
          <span className="pill pill-grey">Doses &amp; office phone kept</span>
        </div>
        <span className="muted" style={{ fontSize: 13 }}>This is “What the AI sees”.</span>
      </div>
    );
  if (i === 2) {
    const words: [string, string?][] = [
      ["Stop"], ["ibuprofen", "med"], ["(Motrin, Advil)", "med"], ["4 days", "time"], ["before"], ["surgery.", "time"],
      ["Take"], ["cephalexin", "med"], ["500mg", "med"], ["every 8 hours", "time"],
      ["No"], ["driving"], ["for"], ["2 weeks.", "time"], ["Follow"], ["up"], ["in"], ["10–14 days.", "time"],
    ];
    return (
      <div style={{ display: "grid", gap: 22, justifyItems: "center" }}>
        <span className="pill pill-grey">Reading 3 pages · answers tied to the paper’s exact words</span>
        <div className="ocr-words">
          {words.map(([w, c], k) => (
            <span key={k} className={`ocr-word ${c ?? ""}`} style={{ animationDelay: `${k * 90}ms` }}>
              {w}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          <span className="pill pill-mint">Medicine</span>
          <span className="pill pill-pink">Timing · Day −4</span>
          <span className="pill pill-grey">Visit date not written → “Call to book”</span>
        </div>
      </div>
    );
  }
  if (i === 3)
    return (
      <div style={{ width: "100%", display: "grid", justifyItems: "center" }}>
        {[
          { n: "Stop taking: Ibuprofen (Motrin, Advil)", s: "“…4 days before surgery.” · p.1", st: "Looks right", c: "pill-mint" },
          { n: "Take every day: Cephalexin 500 mg", s: "“…every 8 hours until finished.” · p.2", st: "Looks right", c: "pill-mint" },
          { n: "Call to book your post-op visit", s: "No full date on your papers", st: "Needs you", c: "pill-pink" },
        ].map((d, k) => (
          <div key={k} className="draft-card glass" style={{ animation: `notifIn .6s ${k * 150}ms both cubic-bezier(.22,1,.36,1)` }}>
            <div className="meta">
              <b>{d.n}</b>
              <small>{d.s}</small>
            </div>
            <span className={`pill ${d.c}`}>{d.st === "Looks right" && <Check size={12} />} {d.st}</span>
          </div>
        ))}
      </div>
    );
  return (
    <div style={{ width: "100%", display: "grid", justifyItems: "center" }}>
      {[
        { t: "Time for Cephalexin", b: "500 mg · 1 capsule with food", w: "now", I: Pill, actions: true },
        { t: "Stop taking ibuprofen today", b: "4 days before surgery · put it away", w: "8:00 AM", I: Alert },
        { t: "Post-op visit in 2 hours", b: "10:30 AM · bring your medicine list", w: "8:30 AM", I: Calendar },
      ].map((n, k) => (
        <div key={k} className="notif glass" style={{ animationDelay: `${k * 260}ms` }}>
          <span className="app-ico"><AppIcon /></span>
          <div className="n-body">
            <div className="n-head">
              <span>REMEDY</span>
              <span>{n.w}</span>
            </div>
            <b>{n.t}</b>
            <div className="muted">{n.b}</div>
            {n.actions && (
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <span className="ev-btn approve on" style={{ display: "inline-flex", alignItems: "center" }}>I took it</span>
                <span className="ev-btn" style={{ display: "inline-flex", alignItems: "center" }}>Snooze 10 min</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), DURATION);
    return () => clearTimeout(t);
  }, [active, paused]);

  return (
    <div
      className={`how ${paused ? "paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ ["--dur" as string]: `${DURATION}ms` }}
    >
      <div className="how-steps" role="tablist" aria-label="How Remedy works">
        {steps.map((s, i) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={active === i}
            className={`how-step ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="how-num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <span className="how-progress" key={`${active}-${i}`} />
          </button>
        ))}
      </div>
      <div className="how-stage glass" data-spot>
        {steps.map((_, i) => (
          <div key={i} className={`stage-panel ${active === i ? "show" : ""}`} aria-hidden={active !== i}>
            {active === i && <Stage i={i} />}
          </div>
        ))}
      </div>
    </div>
  );
}
