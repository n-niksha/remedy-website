"use client";

import { useState } from "react";
import { Play } from "./Icons";
import { site, SHOW_PLACEHOLDERS } from "@/lib/site";

/** Demo video from YouTube — set `site.demoVideo.youtubeId` in lib/site.ts. Loads the player only on click. */
export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const { youtubeId, poster, title } = site.demoVideo;

  return (
    <div className="video-shell glass" data-reveal>
      <div className="video-frame" data-cursor={youtubeId && !playing ? "Play" : undefined} onClick={youtubeId && !playing ? () => setPlaying(true) : undefined}>
        {youtubeId ? (
          playing ? (
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
              <img src={poster ?? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`} alt={title} />
              <div className="video-placeholder">
                <button className="play-btn glass" aria-label={`Play: ${title}`} onClick={() => setPlaying(true)}>
                  <Play size={34} />
                </button>
              </div>
            </>
          )
        ) : (
          <div className="video-placeholder">
            <span className="video-tag glass">Product demo</span>
            <div className="play-btn glass play-pulse" aria-hidden>
              <Play size={34} />
            </div>
            <div>
              <div className="h-2">See Remedy in action</div>
              {SHOW_PLACEHOLDERS && (
                <p className="ph" style={{ margin: "8px 0 0" }}>
                  (Set demoVideo.youtubeId in lib/site.ts)
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
