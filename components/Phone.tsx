"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Calendar, Chat, Check, Pill, Sun, Alert, Doc, Heart } from "./Icons";

export type ScreenKey = "today" | "medicine" | "detail" | "plan" | "ask" | "scan" | "confirm" | "simple" | "help";

/** Lets any screen navigate the phone, and remembers which medicine is open. */
const PhoneCtx = createContext<{ go: (k: ScreenKey) => void; med: string; openMed: (m: string) => void }>({
  go: () => {},
  med: "Ibuprofen",
  openMed: () => {},
});

/* Sample data shown in the mock UI — illustrative only. Days are counted from surgery (Day 0). */

const mint = { background: "var(--mint-100)", color: "var(--mint-700)" };
const pink = { background: "var(--pink-100)", color: "var(--pink-700)" };

function Ring({ value, label }: { value: number; label: string }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r={r} stroke="rgba(20,48,42,.08)" strokeWidth="6" fill="none" />
      <circle
        cx="25"
        cy="25"
        r={r}
        stroke="#34a083"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
        transform="rotate(-90 25 25)"
        style={{ transition: "stroke-dashoffset .8s cubic-bezier(.22,1,.36,1)" }}
      />
      <text x="25" y="29" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14302a">
        {label}
      </text>
    </svg>
  );
}

function Today() {
  const [taken, setTaken] = useState<null | boolean>(null);
  const [walks, setWalks] = useState(2);
  const count = 3 + (taken ? 1 : 0);
  const { go, openMed } = useContext(PhoneCtx);
  return (
    <>
      <div className="s-sub" style={{ marginBottom: 0 }}>Day 4 of recovery · Sun, Oct 25</div>
      <div className="s-title">Good morning</div>

      <div className="s-card" style={{ marginTop: 8, background: "linear-gradient(160deg,#fff,var(--mint-100))" }}>
        <div className="s-row">
          <div className="s-ico" style={{ background: "var(--mint-600)", color: "#fff" }}><Pill size={16} /></div>
          <div className="grow">
            <small style={{ color: "var(--mint-700)", fontWeight: 600 }}>DUE NOW · 8:00 AM</small>
            <b>Cephalexin 500 mg</b>
            <small>1 capsule · with food</small>
          </div>
        </div>
        {taken === null ? (
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <button className="ev-btn approve on" style={{ flex: 1, height: 32 }} onClick={() => setTaken(true)}>I took it</button>
            <button className="ev-btn" style={{ height: 32 }} onClick={() => setTaken(false)}>Skip</button>
          </div>
        ) : (
          <div className="s-row" style={{ marginTop: 10, fontSize: 11.5, color: "var(--mint-700)", fontWeight: 600 }}>
            <Check size={14} /> {taken ? "Logged at 8:02 AM" : "Skipped"}
            <button style={{ marginLeft: "auto", fontSize: 11, color: "var(--muted)" }} onClick={() => setTaken(null)}>Undo</button>
          </div>
        )}
      </div>

      <button className="s-card s-row tap" style={{ padding: 10 }} onClick={() => go("medicine")}>
        <Ring value={count / 5} label={`${count}/5`} />
        <div className="grow">
          <b>{count} of 5 taken today</b>
          <small>Morning · Afternoon · Evening</small>
        </div>
        <span className="chev">›</span>
      </button>

      <button className="s-card s-row tap" style={{ padding: 10 }} onClick={() => openMed("Tylenol")}>
        <div className="s-ico" style={mint}><Pill size={16} /></div>
        <div className="grow">
          <b>Tylenol · only when needed</b>
          <small>Next one OK at 4:15 PM</small>
        </div>
        <span className="chev">›</span>
      </button>

      <div className="s-card s-row" style={{ padding: 10 }}>
        <div className="s-ico" style={mint}><Heart size={16} /></div>
        <div className="grow">
          <b>Walk 3 times</b>
          <small>2,140 steps today</small>
        </div>
        <button className="s-check done" style={{ width: "auto", padding: "0 8px", borderRadius: 12, fontSize: 11, fontWeight: 700 }} onClick={() => setWalks((w) => (w >= 3 ? 0 : w + 1))}>
          {walks}/3
        </button>
      </div>

      <div className="s-card s-row" style={{ padding: 10, background: "rgba(253,231,238,.85)" }}>
        <div className="s-ico" style={{ background: "#fff", color: "var(--pink-700)" }}><Alert size={16} /></div>
        <div className="grow">
          <b>No driving</b>
          <small>Until Day 14 · from your papers, p. 2</small>
        </div>
      </div>
    </>
  );
}

function Medicine() {
  const groups = [
    { h: "Take every day", items: [{ k: "Cephalexin", n: "Cephalexin 500 mg", d: "8 AM · 2 PM · 8 PM" }, { k: "Metoprolol", n: "Metoprolol 25 mg", d: "8 AM and 8 PM" }], s: mint },
    { h: "Only when needed", items: [{ k: "Tylenol", n: "Tylenol 500 mg", d: "Every 6 hours · max 4 a day" }], s: mint },
    { h: "Stopped for now", items: [{ k: "Ibuprofen", n: "Ibuprofen (Motrin, Advil)", d: "Until Day 7 after surgery" }, { k: "Aspirin", n: "Aspirin 325 mg", d: "Until your surgeon says OK" }], s: pink },
  ];
  const { openMed } = useContext(PhoneCtx);
  return (
    <>
      <div className="s-title">Medicines</div>
      <div className="s-sub">From 2 documents · all confirmed by you</div>
      {groups.map((g) => (
        <div key={g.h}>
          <div className="s-section" style={{ marginTop: 6 }}>{g.h}</div>
          {g.items.map((m) => (
            <button className="s-card s-row tap" key={m.n} style={{ padding: 10 }} onClick={() => openMed(m.k)}>
              <div className="s-ico" style={g.s}><Pill size={16} /></div>
              <div className="grow">
                <b>{m.n}</b>
                <small>{m.d}</small>
              </div>
              <span className="chev">›</span>
            </button>
          ))}
        </div>
      ))}
    </>
  );
}

const meds: Record<string, { names: string; verdict: string; sub: string; stop?: boolean; quote: string; src: string; extra: [string, string] }> = {
  Ibuprofen: {
    names: "Also called Motrin, Advil",
    verdict: "Don’t take until Day 7 after surgery",
    sub: "Stopped since Day −4 · Oct 17",
    stop: true,
    quote: "Stop ibuprofen (Motrin, Advil) 4 days before surgery. Do not restart until 1 week after surgery.",
    src: "Pre-op instructions · page 1",
    extra: ["OK to take again", "Day 7 after surgery · Oct 28"],
  },
  Aspirin: {
    names: "325 mg tablet",
    verdict: "Don’t take until your surgeon says OK",
    sub: "Stopped since Day −7 · Oct 14",
    stop: true,
    quote: "Aspirin 325mg: hold 7 days before surgery until cleared by surgeon.",
    src: "Pre-op instructions · page 1",
    extra: ["Next visit", "Post-op visit · Day 10"],
  },
  Cephalexin: {
    names: "Antibiotic · also called Keflex",
    verdict: "Take at 8 AM, 2 PM and 8 PM",
    sub: "500 mg · 1 capsule with food · until finished",
    quote: "Cephalexin 500mg by mouth at 8 AM, 2 PM and 8 PM with food until all tablets are finished, to prevent infection.",
    src: "Discharge papers · page 2",
    extra: ["Reason", "To prevent infection"],
  },
  Metoprolol: {
    names: "Also called Lopressor",
    verdict: "Take at 8 AM and 8 PM",
    sub: "25 mg · keep taking every day",
    quote: "Continue metoprolol 25mg twice daily, including the morning of surgery.",
    src: "Pre-op instructions · page 1",
    extra: ["Surgery day", "Take it that morning too"],
  },
  Tylenol: {
    names: "Also called acetaminophen",
    verdict: "OK to take when needed — next one at 4:15 PM",
    sub: "500 mg · at least 6 hours apart · max 4 a day",
    quote: "Acetaminophen (Tylenol) 500mg every 6 hours as needed for pain. Do not exceed 4 doses in 24 hours.",
    src: "Discharge papers · page 2",
    extra: ["Reason", "Pain"],
  },
};

function Detail() {
  const { go, med } = useContext(PhoneCtx);
  const m = meds[med] ?? meds.Ibuprofen;
  return (
    <>
      <button className="s-sub back" onClick={() => go("medicine")}>‹ Medicines</button>
      <div className="s-title">{med}</div>
      <div className="s-sub">{m.names}</div>
      <div className="s-card" style={{ background: m.stop ? "var(--pink-100)" : "var(--mint-100)", borderColor: "#fff" }}>
        <b style={{ fontSize: 15, color: m.stop ? "var(--pink-700)" : "var(--mint-700)" }}>{m.verdict}</b>
        <div className="muted" style={{ fontSize: 11, marginTop: 3 }}>{m.sub}</div>
      </div>
      <div className="s-card">
        <div className="s-section" style={{ marginTop: 0 }}>From your papers</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 12, lineHeight: 1.45 }}>“{m.quote}”</div>
        <div className="muted" style={{ fontSize: 10.5, marginTop: 6 }}>{m.src}</div>
      </div>
      <div className="s-card s-row">
        <div className="s-ico" style={mint}><Alert size={16} /></div>
        <div className="grow">
          <b>{m.extra[0]}</b>
          <small>{m.extra[1]}</small>
        </div>
      </div>
    </>
  );
}

function Plan() {
  const [day, setDay] = useState(4);
  const strip = useRef<HTMLDivElement>(null);
  const days = [-4, -1, 0, 1, 4, 7, 10, 14];
  const label = (d: number) => (d === 0 ? "Surgery" : `Day ${d > 0 ? d : `−${-d}`}`);
  // Surgery (Day 0) was Wed, Oct 21 in the sample plan
  const date = (d: number) =>
    new Date(2026, 9, 21 + d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  // keep the selected day centred in the strip
  useEffect(() => {
    const el = strip.current?.querySelector<HTMLElement>(`[data-day="${day}"]`);
    if (el && strip.current) strip.current.scrollTo({ left: el.offsetLeft - strip.current.clientWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
  }, [day]);
  const items: Record<number, { ok: string[]; no: string[]; visit?: string; todo?: string }> = {
    [-4]: { ok: [], no: ["Ibuprofen, aspirin"], todo: "Stop ibuprofen today" },
    [-1]: { ok: ["Light dinner"], no: ["Food after midnight"], todo: "Bring your inhalers" },
    0: { ok: [], no: ["Driving home yourself"], visit: "Surgery · 7:30 AM" },
    1: { ok: ["Short walks"], no: ["Showering", "Driving"] },
    4: { ok: ["Showering", "Short walks"], no: ["Driving", "Lifting over 10 lb"] },
    7: { ok: ["Ibuprofen again"], no: ["Driving"] },
    10: { ok: ["Showering"], no: ["Driving"], visit: "Post-op visit · 10:30 AM" },
    14: { ok: ["Driving"], no: ["Heavy lifting"] },
  };
  const it = items[day];
  return (
    <>
      <div className="s-title">Plan</div>
      <div className="s-sub">Your journey, counted from surgery</div>
      <div ref={strip} className="day-strip">
        {days.map((d) => (
          <button
            key={d}
            data-day={d}
            onClick={() => setDay(d)}
            style={{
              flexShrink: 0,
              padding: "7px 10px",
              borderRadius: 14,
              fontSize: 10.5,
              fontWeight: 600,
              background: day === d ? "var(--mint-600)" : d === 0 ? "var(--pink-100)" : "rgba(255,255,255,.8)",
              color: day === d ? "#fff" : d === 0 ? "var(--pink-700)" : "var(--ink-2)",
              border: "1px solid #fff",
            }}
          >
            {label(d)}
          </button>
        ))}
      </div>
      <div key={day} className="screen-swap">
        <div style={{ fontWeight: 650, fontSize: 13, margin: "0 2px 8px" }}>
          {label(day)} <span className="muted" style={{ fontWeight: 500 }}>· {date(day)}</span>
        </div>
        {it.visit && (
          <div className="s-card s-row" style={{ padding: 10 }}>
            <div className="s-ico" style={pink}><Calendar size={16} /></div>
            <div className="grow">
              <b>{it.visit}</b>
              <small>Dr. Rivera · Call · Directions</small>
            </div>
          </div>
        )}
        {it.todo && (
          <div className="s-card s-row" style={{ padding: 10 }}>
            <div className="s-ico" style={mint}><Doc size={16} /></div>
            <div className="grow"><b>{it.todo}</b><small>To-do</small></div>
          </div>
        )}
        {it.ok.length > 0 && <div className="s-section">Allowed</div>}
        {it.ok.map((t) => (
          <div className="s-card s-row" key={t} style={{ padding: 9 }}>
            <span className="s-check done"><Check size={12} strokeWidth={3} /></span>
            <div className="grow"><b>{t}</b></div>
          </div>
        ))}
        {it.no.length > 0 && <div className="s-section">Not yet</div>}
        {it.no.map((t) => (
          <div className="s-card s-row" key={t} style={{ padding: 9, background: "rgba(253,231,238,.85)" }}>
            <span className="s-check" style={{ borderColor: "var(--pink-500)", color: "var(--pink-700)", fontWeight: 700 }}>×</span>
            <div className="grow"><b>{t}</b></div>
          </div>
        ))}
      </div>
    </>
  );
}

const qa: Record<string, { a: React.ReactNode; quote?: string; emergency?: boolean }> = {
  "Can I take Advil?": {
    a: <><b>No — not until Day 7 after surgery.</b> Advil is ibuprofen, which is stopped for now.</>,
    quote: "Do not restart until 1 week after surgery.” · p. 1",
  },
  "Can I shower?": {
    a: <><b>Yes.</b> Showering is OK from Day 2 after surgery. No tub baths.</>,
    quote: "You may shower 2 days after surgery. No tub baths.” · p. 2",
  },
  "What do I take today?": {
    a: <><b>Cephalexin</b> at 8 AM, 2 PM and 8 PM, and <b>Metoprolol</b> at 8 AM and 8 PM. Tylenol only if needed.</>,
  },
  "When is my next visit?": {
    a: <><b>Post-op visit, Day 10</b> — Sat, Oct 31 at 10:30 AM with Dr. Rivera.</>,
    quote: "Post-op visit: Saturday, October 31, 2026, 10:30 AM, Dr. Rivera.” · p. 3",
  },
  "I have chest pain": { a: <b style={{ color: "#c62828" }}>Call 911 now.</b>, emergency: true },
};

function Ask() {
  const [thread, setThread] = useState(["Can I take Advil?", "I have chest pain"]);
  const ask = (q: string) => setThread((t) => [...t.filter((x) => x !== q), q].slice(-2));
  return (
    <>
      <div className="s-title">Ask</div>
      <div className="s-sub">Answers come only from your own plan</div>
      {thread.map((q) => {
        const r = qa[q];
        return (
          <div key={q} className="screen-swap">
            <div className="bubble me">{q}</div>
            <div className="bubble ai" style={r.emergency ? { background: "#fff1f1", borderColor: "#ffd6d6" } : undefined}>
              {r.a}
              {r.quote && (
                <div style={{ fontFamily: "Georgia, serif", fontSize: 11, marginTop: 6, padding: "6px 8px", borderRadius: 10, background: "var(--mint-100)" }}>
                  “{r.quote}
                </div>
              )}
              {r.emergency && (
                <div style={{ marginTop: 6, background: "#d32f2f", color: "#fff", borderRadius: 12, padding: "7px 0", textAlign: "center", fontWeight: 700 }}>
                  Call 911
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {Object.keys(qa)
          .filter((q) => !thread.includes(q))
          .slice(0, 3)
          .map((q) => (
            <button key={q} className="pill pill-grey tap-pill" style={{ fontSize: 10.5 }} onClick={() => ask(q)}>
              {q}
            </button>
          ))}
      </div>
    </>
  );
}

function Help() {
  const { go } = useContext(PhoneCtx);
  return (
    <>
      <button className="s-sub back" onClick={() => go("simple")} style={{ fontSize: 15 }}>‹ Back</button>
      <div className="s-title">Help</div>
      <div style={{ background: "#d32f2f", color: "#fff", borderRadius: 18, padding: "16px 0", textAlign: "center", fontSize: 20, fontWeight: 800, margin: "6px 0 12px" }}>
        Call 911
      </div>
      <div className="s-section">Call your surgeon’s office if</div>
      {["Fever over 101°F", "Bleeding that won’t stop", "Swollen or painful calf"].map((t) => (
        <div className="s-card s-row" key={t} style={{ padding: 10 }}>
          <div className="s-ico" style={pink}><Alert size={16} /></div>
          <div className="grow"><b>{t}</b></div>
        </div>
      ))}
      <div className="s-card s-row" style={{ padding: 10 }}>
        <div className="s-ico" style={mint}><Chat size={16} /></div>
        <div className="grow">
          <b>Dr. Rivera’s office</b>
          <small>(555) 010-2200</small>
        </div>
      </div>
    </>
  );
}

function ScanScreen() {
  return (
    <div style={{ position: "absolute", inset: "-46px 0 0 0", background: "#121614", color: "#fff" }}>
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, textAlign: "center", fontSize: 12, opacity: 0.8 }}>
        Position the document in view
      </div>
      <div style={{ position: "absolute", top: 110, left: 34, right: 34, bottom: 180, display: "grid", placeItems: "center" }}>
        <div className="doc" style={{ width: "100%", height: "100%", transform: "rotate(-2deg)" }}>
          <div className="scan-beam" />
          <div className="doc-title">PRE-OPERATIVE INSTRUCTIONS</div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className={`doc-line ${[3, 4, 9].includes(i) ? "hl" : ""}`} style={{ width: `${60 + ((i * 37) % 40)}%` }} />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", border: "3px solid #fff", display: "grid", placeItems: "center" }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#fff" }} />
        </div>
      </div>
    </div>
  );
}

const confirmItems = [
  { k: "Stop taking", t: "Ibuprofen (Motrin, Advil)", w: "From 4 days before surgery", q: "Stop ibuprofen (Motrin, Advil) 4 days before surgery." },
  { k: "Take every day", t: "Metoprolol 25 mg", w: "8 AM and 8 PM, including surgery morning", q: "Continue metoprolol 25mg twice daily, including the morning of surgery." },
  { k: "To-do", t: "Call to book your post-op visit", w: "No full date on your papers", q: "Follow up with Dr. Rivera in 10–14 days." },
];

function Confirm() {
  const [i, setI] = useState(0);
  const [edit, setEdit] = useState<string | null>(null);
  const [titles, setTitles] = useState(confirmItems.map((c) => c.t));
  const done = i >= confirmItems.length;
  const next = () => {
    setEdit(null);
    setI(i + 1);
  };
  const it = confirmItems[Math.min(i, confirmItems.length - 1)];
  return (
    <>
      <div className="s-title">Confirm</div>
      <div className="s-sub">{done ? "All done" : `Item ${i + 1} of ${confirmItems.length} · nothing is used until you say yes`}</div>
      <div style={{ height: 4, borderRadius: 4, background: "rgba(20,48,42,.08)", marginBottom: 12 }}>
        <div style={{ height: 4, borderRadius: 4, background: "var(--mint-500)", width: `${(i / confirmItems.length) * 100}%`, transition: "width .5s" }} />
      </div>
      {done ? (
        <div className="s-card screen-swap" style={{ textAlign: "center", padding: 22 }}>
          <span className="s-check done" style={{ margin: "0 auto 8px", width: 40, height: 40 }}><Check size={20} strokeWidth={3} /></span>
          <b style={{ fontSize: 15 }}>Your plan is ready</b>
          <div className="muted" style={{ fontSize: 11, margin: "4px 0 10px" }}>When is your surgery? Your papers count days from it.</div>
          <button className="ev-btn" onClick={() => { setI(0); setTitles(confirmItems.map((c) => c.t)); }}>Start over</button>
        </div>
      ) : (
        <div key={i} className="screen-swap">
          <div className="s-card" style={{ padding: 14 }}>
            <span className={`pill ${it.k === "Stop taking" ? "pill-pink" : "pill-mint"}`} style={{ fontSize: 10.5 }}>{it.k}</span>
            {edit !== null ? (
              <input
                className="s-input"
                value={edit}
                autoFocus
                    onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => setEdit(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (setTitles((t) => t.map((x, j) => (j === i ? edit : x))), setEdit(null))}
              />
            ) : (
              <b style={{ display: "block", fontSize: 16, margin: "8px 0 2px" }}>{titles[i]}</b>
            )}
            <div className="muted" style={{ fontSize: 11.5 }}>{it.w}</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 11.5, marginTop: 10, padding: "8px 10px", borderRadius: 10, background: "var(--cream)", borderLeft: "3px solid var(--mint-400)" }}>
              “{it.q}”
            </div>
            <div className="muted" style={{ fontSize: 10, marginTop: 5 }}>From your papers · page 1</div>
          </div>
          <button className="ev-btn approve on" style={{ width: "100%", height: 38, fontSize: 13, marginBottom: 6 }} onClick={next}>
            Looks right
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              className={`ev-btn ${edit !== null ? "approve on" : ""}`}
              style={{ flex: "0 0 30%", height: 34 }}
              onClick={() => {
                if (edit === null) return setEdit(titles[i]);
                setTitles((t) => t.map((x, j) => (j === i ? edit : x)));
                setEdit(null);
              }}
            >
              {edit !== null ? "Save" : "Edit"}
            </button>
            <button className="ev-btn" style={{ flex: 1, height: 34, whiteSpace: "nowrap", padding: "0 8px" }} onClick={next}>Not on my papers</button>
          </div>
        </div>
      )}
    </>
  );
}

function Simple() {
  const [took, setTook] = useState(false);
  const [reading, setReading] = useState(false);
  const { go } = useContext(PhoneCtx);
  const tiles: { t: string; I: typeof Pill; s: React.CSSProperties; k: ScreenKey }[] = [
    { t: "Medicines", I: Pill, s: mint, k: "medicine" },
    { t: "Plan", I: Calendar, s: mint, k: "plan" },
    { t: "Ask", I: Chat, s: mint, k: "ask" },
    { t: "Help", I: Alert, s: { background: "rgba(255,255,255,.2)", color: "#fff" }, k: "help" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="s-title" style={{ fontSize: 24 }}>Hello</div>
        <button className={`pill ${reading ? "pill-pink" : "pill-mint"}`} style={{ fontSize: 11 }} onClick={() => setReading((r) => !r)}>
          {reading ? "■ Stop reading" : "🔊 Read to me"}
        </button>
      </div>
      <div className="s-card" style={{ padding: 14, marginTop: 8, background: took ? "var(--mint-100)" : "#fff" }}>
        <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{took ? "DONE" : "TAKE NOW"}</div>
        <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-.02em", margin: "2px 0 10px" }}>Cephalexin</div>
        <button
          onClick={() => setTook((t) => !t)}
          style={{ width: "100%", height: 52, borderRadius: 16, fontSize: 18, fontWeight: 700, color: "#fff", background: took ? "var(--mint-700)" : "var(--mint-600)" }}
        >
          {took ? "✓ Taken" : "I took it"}
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {tiles.map(({ t, I, s, k }) => (
          <button key={t} className="s-card tap" onClick={() => go(k)} style={{ margin: 0, padding: 14, display: "grid", gap: 8, justifyItems: "start", textAlign: "left", ...(t === "Help" ? { background: "#d32f2f", color: "#fff", borderColor: "#d32f2f" } : {}) }}>
            <span className="s-ico" style={{ width: 38, height: 38, ...s }}><I size={20} /></span>
            <b style={{ fontSize: 17 }}>{t}</b>
          </button>
        ))}
      </div>
    </>
  );
}

const screens: Record<ScreenKey, () => React.ReactElement> = {
  today: Today,
  medicine: Medicine,
  detail: Detail,
  plan: Plan,
  ask: Ask,
  scan: ScanScreen,
  confirm: Confirm,
  simple: Simple,
  help: Help,
};

const tabs: { k: ScreenKey; label: string; Icon: typeof Sun }[] = [
  { k: "today", label: "Today", Icon: Sun },
  { k: "medicine", label: "Medicines", Icon: Pill },
  { k: "plan", label: "Plan", Icon: Calendar },
  { k: "ask", label: "Ask", Icon: Chat },
];

export default function Phone({
  screen = "today",
  onNavigate,
  width,
}: {
  screen?: ScreenKey;
  onNavigate?: (k: ScreenKey) => void;
  width?: number;
}) {
  const [cur, setCur] = useState<ScreenKey>(screen);
  const [med, setMed] = useState("Ibuprofen");
  useEffect(() => setCur(screen), [screen]);

  const go = (k: ScreenKey) => {
    setCur(k);
    onNavigate?.(k);
  };
  const openMed = (m: string) => {
    setMed(m);
    go("detail");
  };

  // The scan button shows the camera briefly, then the Confirm screen
  useEffect(() => {
    if (cur !== "scan") return;
    const t = setTimeout(() => go("confirm"), 2200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);

  const Screen = screens[cur];
  const dark = cur === "scan";
  const noTabs = dark || cur === "simple" || cur === "help";
  const activeTab = cur === "detail" ? "medicine" : cur;
  return (
    <div className="phone" style={width ? ({ "--pw": `${width}px` } as React.CSSProperties) : undefined}>
      <div className="phone-screen">
        <div className="island" />
        <div className="statusbar" style={{ color: dark ? "#fff" : undefined }}>
          <span>9:41</span>
          <span className="icons">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.3" y="5" width="3" height="6" rx="1" /><rect x="8.6" y="2.5" width="3" height="8.5" rx="1" /><rect x="12.9" y="0" width="3" height="11" rx="1" /></svg>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3.5" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="15" height="8" rx="2" fill="currentColor" /><rect x="21.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".4" /></svg>
          </span>
        </div>
        <div className={`screen-body ${noTabs ? "no-tabs" : ""}`}>
          <div key={cur + med} className="screen-swap">
            <PhoneCtx.Provider value={{ go, med, openMed }}>
              <Screen />
            </PhoneCtx.Provider>
          </div>
        </div>
        {!noTabs && (
          <div className="tabbar">
            {tabs.map(({ k, label, Icon }) => (
              <button key={k} className={`tab ${activeTab === k ? "on" : ""}`} onClick={() => go(k)}>
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        )}
        <div className="home-ind" style={{ background: dark ? "#fff" : undefined }} />
      </div>
    </div>
  );
}

export function AppIcon({ size = 38 }: { size?: number }) {
  return <Image src="/logo.png" alt="" width={size} height={size} />;
}

