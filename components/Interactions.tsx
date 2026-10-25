"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide pointer + scroll behaviour:
 *  - liquid-glass cursor ring that grows over links and shows labels for [data-cursor="Label"]
 *  - spotlight highlight on any [data-spot] element (sets --mx / --my)
 *  - magnetic pull on [data-magnetic] elements
 *  - background blob that trails the cursor
 *  - fade-up reveal for [data-reveal] elements
 */
export default function Interactions() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    const body = document.body;
    const bg = document.querySelector<HTMLElement>(".blob-cursor");
    let x = -100,
      y = -100,
      rx = -100,
      ry = -100,
      raf = 0;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      body.classList.add("has-cursor");
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (bg) {
        bg.style.setProperty("--bx", `${x - 190}px`);
        bg.style.setProperty("--by", `${y - 190}px`);
      }

      const t = e.target as HTMLElement;

      const spot = t.closest<HTMLElement>("[data-spot]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${x - r.left}px`);
        spot.style.setProperty("--my", `${y - r.top}px`);
      }

      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== m) magnet.style.transform = "";
      magnet = m;
      if (m && !reduce) {
        const r = m.getBoundingClientRect();
        const dx = x - (r.left + r.width / 2);
        const dy = y - (r.top + r.height / 2);
        m.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
      }

      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const text = t.closest("input, textarea");
      const interactive = t.closest("a, button, select, [role=tab], label");

      body.classList.toggle("cursor-label", !!labelled);
      body.classList.toggle("cursor-text", !labelled && !!text);
      body.classList.toggle("cursor-hover", !labelled && !text && !!interactive);
      if (labelled && label.current) label.current.textContent = labelled.dataset.cursor ?? "";
    };

    const onLeave = () => body.classList.remove("has-cursor");
    const onDown = () => ring.current?.animate([{ scale: 1 }, { scale: 0.8 }, { scale: 1 }], { duration: 350 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      <div ref={bar} className="scroll-progress" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
