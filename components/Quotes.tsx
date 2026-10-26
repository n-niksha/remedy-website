"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, Quote } from "./Icons";
import type { Testimonial } from "@/lib/site";

const DURATION = 6500;

/** Sliding carousel of quotes. Auto-advances, pauses on hover, and supports arrows, dots and swipe. */
export default function Quotes({ quotes }: { quotes: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = quotes.length;
  const go = (i: number) => setActive((i + n) % n);

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), DURATION);
    return () => clearTimeout(t);
  }, [active, paused, n]);

  return (
    <div
      className="quote glass"
      data-spot
      data-reveal
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      aria-roledescription="carousel"
    >
      <Quote size={36} />
      <div className="quote-viewport">
        <div className="quote-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {quotes.map((q, i) => (
            <figure key={q.quote} className="quote-slide" aria-hidden={active !== i} aria-roledescription="slide">
              <blockquote>“{q.quote}”</blockquote>
              <figcaption className="muted">— {q.by}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      {n > 1 && (
        <div className="quote-nav">
          <button className="quote-arrow glass" aria-label="Previous quote" onClick={() => go(active - 1)}>
            <span style={{ display: "inline-flex", transform: "scaleX(-1)" }}><Arrow /></span>
          </button>
          <div className="quote-dots">
            {quotes.map((_, i) => (
              <button key={i} aria-label={`Quote ${i + 1}`} aria-current={active === i} className={active === i ? "on" : ""} onClick={() => go(i)} />
            ))}
          </div>
          <button className="quote-arrow glass" aria-label="Next quote" onClick={() => go(active + 1)}>
            <Arrow />
          </button>
        </div>
      )}
    </div>
  );
}
