"use client";

import { useState } from "react";
import { Plus } from "./Icons";

export default function FAQ({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div key={i} className={`faq-item glass ${open === i ? "open" : ""}`} data-reveal style={{ ["--d" as string]: i }}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {it.q}
            <span className="faq-plus"><Plus /></span>
          </button>
          <div className="faq-a">
            <div>
              <p>{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
