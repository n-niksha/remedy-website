"use client";

import { useState } from "react";
import { Play } from "./Icons";
import { site } from "@/lib/site";

/** Demo video from YouTube — set `site.demoVideo.youtubeId` in lib/site.ts. Loads the player only on click. */
export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const { youtubeId, poster, title } = site.demoVideo;

  return (
    <div className="video-shell glass" data-reveal>
      <div className="video-frame" data-cursor={playing ? undefined : "Play"} onClick={playing ? undefined : () => setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt={title} />
            <div className="video-placeholder">
              <button className="play-btn glass" aria-label={`Play: ${title}`} onClick={() => setPlaying(true)}>
                <Play size={34} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
