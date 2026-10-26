"use client";

import { useState } from "react";
import { Check, Alert } from "./Icons";

/* Page 1 of the app's sample patient papers, exactly as shown in "What the AI sees". */
const lines = [
  "1. Seven (7) days before your surgery, do not take: Fish Oil · Multivitamin",
  "2. Four (4) days before your surgery, do not take (these cause blood thinning): Meloxicam (Mobic) · Advil or Motrin (ibuprofen)",
  "3. The day before surgery and the morning of surgery, do not take: Metformin",
  "4. The morning of surgery, do not take: Lisinopril",
  "5. OK to take - keep taking these every day, including the morning of surgery: Baby aspirin 81 mg · Atorvastatin · Omeprazole",
  "6. Tylenol (acetaminophen) is OK to take before surgery if you need something for pain.",
];

type Status = "pending" | "approved" | "rejected";

const drafts: { line: number; kind: string; title: string; reason: string; tag: string; flag?: boolean }[] = [
  { line: 0, kind: "Stop taking", title: "Fish Oil (Omega-3)", reason: "When: from 7 days before surgery.", tag: "Medicine" },
  { line: 1, kind: "Stop taking", title: "Meloxicam (Mobic)", reason: "When: from 4 days before surgery. Why: these cause blood thinning.", tag: "Medicine" },
  { line: 2, kind: "Stop taking", title: "Metformin", reason: "When: the day before surgery and the morning of surgery.", tag: "Medicine" },
  { line: 4, kind: "OK to take", title: "Baby aspirin 81 mg", reason: "Keep taking every day, including the morning of surgery.", tag: "Medicine" },
];

export default function EvidenceDemo() {
  const [hover, setHover] = useState<number | null>(null);
  const [status, setStatus] = useState<Status[]>(drafts.map(() => "pending"));
  const [saved, setSaved] = useState(false);
  const [titles, setTitles] = useState(drafts.map((d) => d.title));
  const [editing, setEditing] = useState<number | null>(null);

  const approved = status.filter((s) => s === "approved").length;
  const set = (i: number, s: Status) => {
    setSaved(false);
    setStatus((prev) => prev.map((v, j) => (j === i ? (v === s ? "pending" : s) : v)));
  };

  return (
    <div className="evidence glass" data-reveal>
      <div className="ev-doc">
        <h5>Directions for Your Medications Preoperatively</h5>
        <div className="sub">
          <span>After Visit Summary · <span className="ev-hidden">hidden</span> MRN: <span className="ev-hidden">hidden</span></span>
          <span>Page 1</span>
        </div>
        {lines.map((l, i) => {
          const d = drafts.findIndex((x) => x.line === i);
          const lit = hover !== null && drafts[hover].line === i;
          return (
            <div key={i} className={`ev-line ${lit ? (drafts[hover!].flag ? "lit-pink" : "lit") : ""}`} style={{ opacity: d === -1 && hover !== null ? 0.5 : 1 }}>
              {l}
            </div>
          );
        })}
        <p className="muted" style={{ fontFamily: "var(--font-sans)", fontSize: 12, marginTop: 14, marginBottom: 0 }}>
          From the app’s fictional sample patient. Names and record numbers are hidden on the phone before anything is sent.
        </p>
      </div>

      <div className="ev-drafts">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 4px 6px", gap: 8, flexWrap: "wrap" }}>
          <b>Confirm each item</b>
          <span className="pill pill-grey">Hover to see the line it came from</span>
        </div>
        {drafts.map((d, i) => (
          <div
            key={i}
            className={`ev-draft ${status[i] === "rejected" ? "rejected" : ""} ${d.flag ? "dropped" : ""}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
          >
            <div className="ev-top">
              <b>
                <span className="muted" style={{ fontWeight: 500 }}>{d.kind}:</span>{" "}
                {editing === i ? (
                  <input
                    className="s-input"
                    style={{ display: "inline-block", width: "auto", margin: 0, fontSize: 14, padding: "2px 8px" }}
                    value={titles[i]}
                    autoFocus
                    onFocus={(e) => e.currentTarget.select()}
                    onChange={(e) => setTitles((t) => t.map((x, j) => (j === i ? e.target.value : x)))}
                    onKeyDown={(e) => e.key === "Enter" && setEditing(null)}
                  />
                ) : (
                  titles[i]
                )}
              </b>
              <span className={`pill ${d.flag ? "pill-pink" : "pill-mint"}`}>
                {d.flag && <Alert size={12} />} {d.tag}
              </span>
            </div>
            <div className="ev-reason">{d.reason}</div>
            <div className="ev-actions">
              <button className={`ev-btn approve ${status[i] === "approved" ? "on" : ""}`} onClick={() => set(i, "approved")}>
                {status[i] === "approved" ? "✓ Looks right" : "Looks right"}
              </button>
              <button className={`ev-btn ${editing === i ? "approve on" : ""}`} onClick={() => setEditing(editing === i ? null : i)}>
                {editing === i ? "Save" : "Edit"}
              </button>
              <button className={`ev-btn reject ${status[i] === "rejected" ? "on" : ""}`} onClick={() => set(i, "rejected")}>
                Not on my papers
              </button>
            </div>
          </div>
        ))}
        <div className="ev-save">
          {saved ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--mint-700)", fontWeight: 550 }}>
              <Check /> {approved} item{approved === 1 ? "" : "s"} added to your plan
            </span>
          ) : (
            <span className="muted">
              {approved === 0 ? "Nothing is used until you confirm it." : `${approved} confirmed · ${drafts.length - approved} not used`}
            </span>
          )}
          <button className="btn btn-primary btn-sm" disabled={approved === 0} onClick={() => setSaved(true)}>
            Add to plan
          </button>
        </div>
      </div>
    </div>
  );
}
