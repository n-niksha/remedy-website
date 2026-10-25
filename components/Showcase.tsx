"use client";

import { useState } from "react";
import Phone, { type ScreenKey } from "./Phone";
import { Sun, Pill, Calendar, Chat, Check, Heart } from "./Icons";

type Item = { k: ScreenKey; title: string; body: string; Icon: typeof Sun };

const left: Item[] = [
  { k: "today", title: "Today", body: "What matters right now: a countdown and what to stop before surgery; after it, the dose that’s due, daily goals and what you can’t do yet.", Icon: Sun },
  { k: "medicine", title: "Medicines", body: "Sorted into take every day, only when needed, stopped for now and finished — with brand and generic names.", Icon: Pill },
  { k: "plan", title: "Plan", body: "Your journey from before surgery to recovery. Pick a day, or see every key day on one timeline. Visits have Call, Directions and Add to Calendar.", Icon: Calendar },
];

const right: Item[] = [
  { k: "ask", title: "Ask", body: "“Can I take Advil?” Answers come only from your plan, with the line they came from. Emergency words always get “Call 911” first.", Icon: Chat },
  { k: "confirm", title: "Confirm", body: "One item at a time, with the exact line from your papers. Looks right, Edit, or Not on my papers.", Icon: Check },
  { k: "simple", title: "Simple look", body: "Big tiles, big buttons, one thing per screen, almost no scrolling and “Read to me” — for anyone who finds phones hard.", Icon: Heart },
];

export default function Showcase() {
  const [screen, setScreen] = useState<ScreenKey>("today");

  const isOn = (k: ScreenKey) =>
    screen === k || (k === "confirm" && screen === "scan") || (k === "medicine" && screen === "detail") || (k === "simple" && screen === "help");

  const render = (items: Item[], side: string) => (
    <div className={`show-list ${side}`}>
      {items.map(({ k, title, body, Icon }, i) => (
        <button
          key={k}
          className={`show-item ${isOn(k) ? "on" : ""}`}
          onClick={() => setScreen(k === "confirm" ? "scan" : k)}
          data-reveal
          style={{ ["--d" as string]: i }}
        >
          <h4>
            <span className="ico"><Icon size={16} /></span>
            {title}
          </h4>
          <p>{body}</p>
        </button>
      ))}
    </div>
  );

  return (
    <div className="showcase">
      {render(left, "show-left")}
      <div className="show-phone" data-reveal>
        <Phone screen={screen} onNavigate={setScreen} />
      </div>
      {render(right, "show-right")}
    </div>
  );
}
