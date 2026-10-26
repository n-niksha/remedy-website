"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Media } from "@/lib/media";

/** An iPhone frame showing a real screen from the app — a looping clip if there is one, else a screenshot. */
export default function Phone({ media, width, priority }: { media: Media; width?: number; priority?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);

  // clips only play while they're on screen
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [media.video]);

  return (
    <div className="phone" style={width ? ({ "--pw": `${width}px` } as React.CSSProperties) : undefined}>
      <div className="phone-screen">
        {media.video ? (
          <video
            ref={video}
            key={media.video}
            src={media.video}
            poster={media.img}
            aria-label={media.alt}
            autoPlay
            muted
            loop
            playsInline
            preload={priority ? "auto" : "metadata"}
          />
        ) : (
          <Image src={media.img} alt={media.alt} width={720} height={1564} sizes={`${width ?? 300}px`} priority={priority} />
        )}
      </div>
    </div>
  );
}

export function AppIcon({ size = 38 }: { size?: number }) {
  return <Image src="/logo.png" alt="" width={size} height={size} />;
}
