"use client";

import { useEffect, useId, useRef } from "react";

/**
 * The Remedy split capsule, drawn in SVG so it can react to the cursor:
 * it tilts toward the pointer and the two halves open as the pointer gets closer.
 */
export default function Capsule({ className, interactive = true }: { className?: string; interactive?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    if (!interactive) return;
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    const mint = el.querySelector<SVGGElement>(".cap-mint");
    const cream = el.querySelector<SVGGElement>(".cap-cream");
    const tilt = el.querySelector<SVGGElement>(".cap-tilt");

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      const dist = Math.min(1, Math.hypot(e.clientX - cx, e.clientY - cy) / (r.width * 0.9));
      const open = (1 - dist) * 26;
      tilt?.setAttribute("transform", `rotate(${dx * 14 - dy * 10} 300 300)`);
      if (mint) mint.style.transform = `translate(${open}px, 0)`;
      if (cream) cream.style.transform = `translate(${-open}px, 0)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive]);

  return (
    <svg ref={ref} viewBox="0 0 600 600" className={`capsule-svg ${className ?? ""}`} aria-hidden>
      <defs>
        <linearGradient id={`m${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9ead8" />
          <stop offset="0.45" stopColor="#74d3bb" />
          <stop offset="1" stopColor="#4fae96" />
        </linearGradient>
        <linearGradient id={`c${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f8f4f2" />
          <stop offset="1" stopColor="#e2dad7" />
        </linearGradient>
        <linearGradient id={`in${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3d9a82" />
          <stop offset="1" stopColor="#5fc2a8" />
        </linearGradient>
        <filter id={`s${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      <g transform="rotate(-45 300 300)">
        <g className="cap-tilt" style={{ transition: "transform 1s cubic-bezier(.22,1,.36,1)" }}>
          {/* soft drop shadow */}
          <ellipse cx="300" cy="430" rx="230" ry="34" fill="rgba(160,60,100,0.22)" filter={`url(#s${id})`} />

          <g className="cap-cream">
            <path d="M282 200 H160 A100 100 0 0 0 160 400 H282 Q292 400 292 390 V210 Q292 200 282 200 Z" fill={`url(#c${id})`} />
            <rect x="96" y="222" width="170" height="26" rx="13" fill="#fff" opacity="0.85" />
            <path d="M282 200 Q292 200 292 210 V390 Q292 400 282 400" stroke="#e7dfdc" strokeWidth="3" fill="none" />
          </g>

          <g className="cap-mint">
            <path d="M318 196 H440 A104 104 0 0 1 440 404 H318 Z" fill={`url(#m${id})`} />
            <ellipse cx="318" cy="300" rx="16" ry="104" fill={`url(#in${id})`} />
            <ellipse cx="318" cy="300" rx="9" ry="92" fill="#35917a" opacity="0.6" />
            <rect x="350" y="218" width="160" height="28" rx="14" fill="#fff" opacity="0.5" />
          </g>
        </g>
      </g>
    </svg>
  );
}
