"use client";

import { useState } from "react";
import { Check, Alert } from "./Icons";

const lines = [
  "1. Stop ibuprofen (Motrin, Advil) 4 days before surgery.",
  "2. Continue metoprolol 25mg twice daily, including the morning of surgery.",
  "3. Take an extra-strength pain reliever as needed.",
  "4. Bring your inhalers to the hospital.",
  "5. Follow up with Dr. Rivera in 10–14 days.",
];

type Status = "pending" | "approved" | "rejected";

const drafts = [
  { line: 0, kind: "Stop taking", title: "Ibuprofen (Motrin, Advil)", reason: "From Day −4 · “4” is written on the page, so the day count is kept.", tag: "Medicine" },
  { line: 1, kind: "Take every day", title: "Metoprolol 25 mg", reason: "Strength and “twice daily” found in the quote.", tag: "Medicine" },
  { line: 3, kind: "To-do", title: "Bring your inhalers to the hospital", reason: "Before surgery · quote matches page 1.", tag: "To-do" },
  { line: 4, kind: "To-do", title: "Call to book your follow-up visit", reason: "No full date with a 4-digit year — so it becomes a call, never a guessed date.", tag: "Check this", flag: true },
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
        <h5>Pre-Operative Instructions</h5>
        <div className="sub">
          <span>Patient: ██████ · MRN: ██████</span>
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
        <div className="ev-line" style={{ marginTop: 14, fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--pink-700)", background: "var(--pink-100)", display: "flex", gap: 8, alignItems: "flex-start" }}>
          <Alert size={13} /> Line 3 names no medicine or dose, so no medicine or dose was made up for it.
        </div>
        <p className="muted" style={{ fontFamily: "var(--font-sans)", fontSize: 12, marginTop: 14, marginBottom: 0 }}>
          Sample document for illustration.
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
