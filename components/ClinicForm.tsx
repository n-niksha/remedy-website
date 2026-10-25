"use client";

import { useState } from "react";
import { Arrow, Check } from "./Icons";

/** Client-side only. Wire onSubmit to your form backend (Formspree, Resend, a route handler…). */
export default function ClinicForm() {
  const [sent, setSent] = useState(false);

  if (sent)
    return (
      <div className="glass" style={{ padding: 48, textAlign: "center", display: "grid", gap: 14, justifyItems: "center" }}>
        <span className="feature-ico"><Check size={24} /></span>
        <h3 className="h-2">Thanks — we’ll be in touch.</h3>
        <button className="btn btn-glass btn-sm" onClick={() => setSent(false)}>Send another request</button>
      </div>
    );

  return (
    <form
      className="form glass"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="field">
        Full name
        <input required name="name" placeholder="Dr. Jane Doe" />
      </label>
      <label className="field">
        Work email
        <input required type="email" name="email" placeholder="jane@clinic.org" />
      </label>
      <label className="field">
        Organization
        <input required name="org" placeholder="Riverside Medical Center" />
      </label>
      <label className="field">
        Role
        <select name="role" defaultValue="">
          <option value="" disabled>Select a role</option>
          <option>Physician / Surgeon</option>
          <option>Nurse / Care coordinator</option>
          <option>Pharmacist</option>
          <option>Administrator / Operations</option>
          <option>Other</option>
        </select>
      </label>
      <label className="field full">
        What would you like to explore?
        <textarea name="message" placeholder="e.g. a pilot with our orthopedic surgery patients" />
      </label>
      <div className="full" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <span className="muted" style={{ fontSize: 13.5 }}>We never ask for patient data.</span>
        <button className="btn btn-primary" type="submit" data-magnetic>
          Request a demo <Arrow />
        </button>
      </div>
    </form>
  );
}
