"use client";

import { useState } from "react";
import { Arrow, Check } from "./Icons";

/**
 * Collects emails client-side only. To store them, POST to your provider
 * (e.g. Formspree, Resend, a Vercel route handler) inside onSubmit.
 */
export default function Waitlist({ cta = "Join the waitlist" }: { cta?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done)
    return (
      <div className="waitlist-done" role="status">
        <Check /> You’re on the list — we’ll email {email} at launch.
        <button
          style={{ marginLeft: 8, fontSize: 13, textDecoration: "underline", color: "var(--mint-700)" }}
          onClick={() => {
            setEmail("");
            setDone(false);
          }}
        >
          Add another
        </button>
      </div>
    );

  return (
    <form
      className="waitlist"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="you@email.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary" type="submit" data-magnetic>
        {cta} <Arrow />
      </button>
    </form>
  );
}
