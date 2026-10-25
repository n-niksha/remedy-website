"use client";

import { useRef, useState } from "react";
import { Play } from "./Icons";
import { site, SHOW_PLACEHOLDERS } from "@/lib/site";

/** Demo video — set `site.demoVideo.src` in lib/site.ts once the file is in /public. */
export default function VideoSection() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { src, poster, length } = site.demoVideo;

  const play = () => {
    ref.current?.play();
    setPlaying(true);
  };

  return (
    <div className="video-shell glass" data-reveal>
      <div className="video-frame" data-cursor={playing ? undefined : src ? "Play" : "Soon"} onClick={src && !playing ? play : undefined}>
        {src ? (
          <>
            <video
              ref={ref}
              src={src}
              poster={poster || undefined}
              controls={playing}
              playsInline
              preload="metadata"
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
            />
            {!playing && (
              <div className="video-placeholder">
                <button className="play-btn glass" aria-label="Play demo video" onClick={play}>
                  <Play size={34} />
                </button>
                <span className="video-time glass">{length}</span>
              </div>
            )}
          </>
        ) : (
          <div className="video-placeholder">
            <span className="video-tag glass">Product demo</span>
            <div className="play-btn glass play-pulse" aria-hidden>
              <Play size={34} />
            </div>
            <div>
              <div className="h-2">See Remedy in action</div>
              <p className="muted" style={{ margin: "8px 0 0" }}>Demo video coming soon.</p>
              {SHOW_PLACEHOLDERS && (
                <p className="ph" style={{ margin: "8px 0 0" }}>
                  (Add the video to /public and set demoVideo.src in lib/site.ts)
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
