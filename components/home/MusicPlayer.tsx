"use client";

import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";

const VIDEO_ID = "D1PvIWdJ8xo";
const TRACK_TITLE = "Blueming";
const TRACK_ARTIST = "IU";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function MusicPlayer() {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      setCurrent(player.getCurrentTime?.() ?? 0);
    }, 500);
    return () => clearInterval(interval);
  }, [playing]);

  function handleReady(event: YouTubeEvent) {
    playerRef.current = event.target;
  }

  function handleStateChange(event: YouTubeEvent<number>) {
    const player = event.target;
    setDuration(player.getDuration?.() ?? 0);
    // 1 = playing, 2 = paused, 0 = ended
    setPlaying(event.data === 1);
    if (event.data === 0) setCurrent(0);
  }

  function toggle() {
    const player = playerRef.current;
    if (!player) return;
    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setCurrent(value);
    playerRef.current?.seekTo(value, true);
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9 }}
      className="mx-auto flex w-full max-w-md items-center gap-4 rounded-full border border-border bg-surface/85 p-2 pr-5 text-left shadow-soft backdrop-blur-md"
    >
      <div className="absolute h-px w-px overflow-hidden opacity-0">
        <YouTube
          videoId={VIDEO_ID}
          opts={{
            width: "1",
            height: "1",
            playerVars: { controls: 0, disablekb: 1, playsinline: 1 },
          }}
          onReady={handleReady}
          onStateChange={handleStateChange}
        />
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${TRACK_TITLE}` : `Play ${TRACK_TITLE} by ${TRACK_ARTIST}`}
        className="press relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground text-background hover:bg-accent"
      >
        {playing && (
          <span className="absolute inset-1 animate-spin-slow rounded-full border border-dashed border-current opacity-30" />
        )}
        {playing ? <Pause size={16} aria-hidden className="fill-current" /> : <Play size={16} aria-hidden className="ml-0.5 fill-current" />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm text-muted">
            <span className="font-medium text-foreground">{TRACK_TITLE}</span> by {TRACK_ARTIST}
          </span>
          <span className="shrink-0 text-[11px] tabular-nums text-muted">
            {formatTime(current)} / {formatTime(duration)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={current}
          onChange={seek}
          aria-label="Seek"
          className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full accent-accent"
          style={{
            background: `linear-gradient(to right, var(--accent) ${progress}%, color-mix(in srgb, var(--foreground) 12%, transparent) ${progress}%)`,
          }}
        />
      </div>
    </motion.div>
  );
}
