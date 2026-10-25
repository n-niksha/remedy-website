"use client";

import { useEffect, useRef } from "react";
import Capsule from "./Capsule";
import Phone from "./Phone";
import { Bell, Shield, Check } from "./Icons";

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    const phone = el.querySelector<HTMLElement>(".hero-phone");
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      if (phone) phone.style.transform = `rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="hero-visual" ref={ref}>
      <Capsule className="hero-capsule" />
      <div className="hero-phone">
        <Phone screen="today" width={290} />
      </div>

      <div className="float-chip glass chip-a">
        <span className="chip-icon" style={{ background: "var(--pink-100)", color: "var(--pink-700)" }}>
          <Bell size={18} />
        </span>
        <span>
          <b>Time for Cephalexin</b>
          <small>I took it · Snooze 10 min</small>
        </span>
      </div>

      <div className="float-chip glass chip-b">
        <span className="chip-icon" style={{ background: "var(--mint-100)", color: "var(--mint-700)" }}>
          <Shield size={18} />
        </span>
        <span>
          <b>Personal info removed</b>
          <small>On your phone, before it’s sent</small>
        </span>
      </div>

      <div className="float-chip glass chip-c">
        <span className="chip-icon" style={{ background: "var(--mint-600)", color: "#fff" }}>
          <Check size={18} />
        </span>
        <span>
          <b>Confirmed by you</b>
          <small>Every item, every time</small>
        </span>
      </div>
    </div>
  );
}
