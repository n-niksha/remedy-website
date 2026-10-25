import type { Metadata } from "next";
import Ph, { Note } from "@/components/Ph";
import { site, SHOW_PLACEHOLDERS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy — Remedy",
  description: "How Remedy handles your health information.",
};

export default function Privacy() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <span className="eyebrow" data-reveal>Privacy</span>
          <h1 className="h-1" data-reveal style={{ marginTop: 22 }}>
            Your health data stays <span className="serif mint-text">yours.</span>
          </h1>
          {(site.privacy.lastUpdated || SHOW_PLACEHOLDERS) && (
            <p className="lead" data-reveal>
              Last updated: {site.privacy.lastUpdated ?? <Note>date</Note>}
            </p>
          )}
        </div>
      </section>
      <section style={{ paddingBottom: 100 }}>
        <div className="container">
          <article className="prose glass" data-reveal>
            <h2>The short version</h2>
            <p>
              Remedy has no account and no Remedy server. Your plan, papers and chat are saved only on your iPhone.
              Before your papers are sent for reading, personal details are removed on your phone.
            </p>
            <h2>How your papers are read</h2>
            <ul>
              <li>Text is recognised on your phone with Apple’s Vision framework.</li>
              <li>Names, record numbers, birthdays, addresses and similar details are removed on your phone — by fixed rules, Apple’s on-device name finder and Apple’s on-device AI. The page photo is blacked out on your phone too. You can see exactly what was sent.</li>
              <li>The cleaned text and blacked-out photos are read by Google Gemini (you can switch the photos off in Settings). If Gemini isn’t available, Remedy uses Apple’s on-device AI, which never leaves your phone.</li>
              <li>Connections are HTTPS only and nothing is cached.</li>
            </ul>
            <h2>Hospital and Apple Health imports</h2>
            <ul>
              <li>MyChart sign-in happens on your hospital’s own page; Remedy never sees your password.</li>
              <li>Remedy asks only for medicines and appointments, keeps the access token in memory and forgets it after import.</li>
              <li>Remedy never writes to your hospital record or to Apple Health.</li>
            </ul>
            <h2>Your control</h2>
            <ul>
              <li>Nothing is used until you confirm it.</li>
              <li>You can clear your chat or delete your whole plan in Settings at any time.</li>
            </ul>
            {(site.privacy.collected || SHOW_PLACEHOLDERS) && (
              <>
                <h2>What we collect</h2>
                <p><Ph value={site.privacy.collected} note="website waitlist emails, analytics, crash reporting — be specific" /></p>
              </>
            )}
            {(site.privacy.contact || site.email || SHOW_PLACEHOLDERS) && (
              <>
                <h2>Contact</h2>
                <p><Ph value={site.privacy.contact ?? site.email} note="privacy contact email and company address" /></p>
              </>
            )}
            <p className="muted" style={{ fontSize: 14, marginTop: 28 }}>
              Remedy is not medical advice. It follows the papers your care team gave you and always points you to your
              care team or 911.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
