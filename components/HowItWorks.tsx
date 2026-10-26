"use client";

import { useEffect, useState } from "react";
import Phone from "./Phone";
import { media, type Media } from "@/lib/media";
import { Check } from "./Icons";

const steps = [
  {
    title: "Add your papers",
    body: "Scan with the camera, pick photos, open a PDF from your patient portal — or import straight from MyChart or Apple Health Records.",
  },
  {
    title: "Personal details are removed on your phone",
    body: "Names, record numbers, birthdays, addresses and patient stickers are blacked out on-device — by fixed rules, Apple’s name finder and Apple’s on-device AI — before anything is sent for reading.",
  },
  {
    title: "AI finds every instruction — then gets checked",
    body: "Medicines, rules, to-dos, visits and phone numbers are pulled out word for word. Anything that isn’t actually on the page is thrown out.",
  },
  {
    title: "You confirm each item",
    body: "One card at a time, with the exact line from your papers. Nothing is used until you say “Looks right”.",
  },
  {
    title: "Follow a simple daily plan",
    body: "Today shows what to take and what to stop. Reminders at every dose time have “I took it” and “Remind me in 10 min” right on the notification, plus Siri, widgets and visit alerts.",
  },
];

/** `ms` is how long each step stays up — at least one full play of its clip. */
const stages: { m: Media; ms: number; pills: { t: string; c: string }[] }[] = [
  { m: media.importPapers, ms: 5200, pills: [{ t: "Camera · Photos · PDF", c: "pill-grey" }, { t: "MyChart · Health Records", c: "pill-grey" }] },
  { m: media.aiSees, ms: 5200, pills: [{ t: "11 personal details hidden", c: "pill-mint" }, { t: "This is “What the AI sees”", c: "pill-grey" }] },
  { m: media.reading, ms: 5200, pills: [{ t: "10 medicines · 3 rules · 4 to-dos", c: "pill-mint" }, { t: "Every item checked against your papers", c: "pill-grey" }] },
  { m: media.review, ms: 7400, pills: [{ t: "Looks right", c: "pill-mint" }, { t: "Edit", c: "pill-grey" }, { t: "Not on my papers", c: "pill-pink" }] },
  { m: media.doseBanner, ms: 9000, pills: [{ t: "I took it", c: "pill-mint" }, { t: "Remind me in 10 min", c: "pill-grey" }] },
];

function Stage({ i }: { i: number }) {
  const { m, pills } = stages[i];
  return (
    <div style={{ display: "grid", gap: 18, justifyItems: "center" }}>
      <Phone media={m} width={210} />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {pills.map(({ t, c }, k) => (
          <span key={t} className={`pill ${c}`} style={{ animation: `notifIn .5s ${k * 90}ms both cubic-bezier(.22,1,.36,1)` }}>
            {c === "pill-mint" && <Check size={12} />} {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), stages[active].ms);
    return () => clearTimeout(t);
  }, [active, paused]);

  return (
    <div
      className={`how ${paused ? "paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ ["--dur" as string]: `${stages[active].ms}ms` }}
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
