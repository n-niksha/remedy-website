"use client";

import { useState } from "react";
import Phone from "./Phone";
import { media, type Media } from "@/lib/media";
import { Sun, Pill, Calendar, Chat, Check, Heart } from "./Icons";

type Item = { k: string; m: Media; title: string; body: string; Icon: typeof Sun };

const left: Item[] = [
  { k: "today", m: media.logDose, title: "Today", body: "What matters right now: a countdown and what to stop before surgery; after it, the dose that’s due, daily goals and what you can’t do yet.", Icon: Sun },
  { k: "medicine", m: media.searchMeds, title: "Medicines", body: "Search by brand or generic name — “Advil” finds Ibuprofen — and see whether you can take it right now, with the line from your papers.", Icon: Pill },
  { k: "plan", m: media.planJourney, title: "Plan", body: "Your journey from before surgery to recovery. Pick a day, or see every key day on one timeline. Visits have Call, Directions and Add to Calendar.", Icon: Calendar },
];

const right: Item[] = [
  { k: "ask", m: media.askSymptom, title: "Ask", body: "“Can I take Advil?” Answers come only from your plan, with the line they came from. Warning signs get “Call your surgeon’s office”.", Icon: Chat },
  { k: "confirm", m: media.review, title: "Confirm", body: "One item at a time, with the exact line from your papers. Looks right, Edit, or Not on my papers.", Icon: Check },
  { k: "simple", m: media.simple, title: "Simple look", body: "Big tiles, big buttons, one thing per screen, almost no scrolling and “Read to me” — for anyone who finds phones hard.", Icon: Heart },
];

export default function Showcase() {
  const [cur, setCur] = useState<Item>(left[0]);

  const render = (items: Item[], side: string) => (
    <div className={`show-list ${side}`}>
      {items.map((item, i) => (
        <button
          key={item.k}
          className={`show-item ${cur.k === item.k ? "on" : ""}`}
          onClick={() => setCur(item)}
          data-reveal
          style={{ ["--d" as string]: i }}
        >
          <h4>
            <span className="ico"><item.Icon size={16} /></span>
            {item.title}
          </h4>
          <p>{item.body}</p>
        </button>
      ))}
    </div>
  );

  return (
    <div className="showcase">
      {render(left, "show-left")}
      <div className="show-phone" data-reveal>
        <Phone media={cur.m} />
      </div>
      {render(right, "show-right")}
    </div>
  );
}
