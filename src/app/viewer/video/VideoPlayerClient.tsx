"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Gauge,
  CheckCircle2,
} from "lucide-react";

const SPEEDS = [1, 1.25, 1.5, 1.75, 2];

export default function VideoPlayerPage() {
  const searchParams = useSearchParams();
  const filePath = searchParams.get("file") || "";
  const fileName = filePath.split("/").pop() || "Video";

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(`progress:${filePath}`);
    if (saved) {
      const data = JSON.parse(saved);
      if (videoRef.current && data.currentTime) {
        videoRef.current.currentTime = data.currentTime;
      }
      if (data.completed) setCompleted(true);
    }
  }, [filePath]);

  // Save progress every 5 seconds
  const saveProgress = useCallback(() => {
    if (!videoRef.current) return;
    const data = {
      currentTime: videoRef.current.currentTime,
      duration: videoRef.current.duration,
      completed,
      lastWatched: new Date().toISOString(),
    };
    localStorage.setItem(`progress:${filePath}`, JSON.stringify(data));
  }, [filePath, completed]);

  useEffect(() => {
    const interval = setInterval(saveProgress, 5000);
    return () => clearInterval(interval);
  }, [saveProgress]);

  function togglePlay() {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  }

  function cycleSpeed() {
    const next = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(next);
    if (videoRef.current) videoRef.current.playbackRate = SPEEDS[next];
  }

  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  }

  function markComplete() {
    setCompleted(true);
    setShowConfetti(true);
    saveProgress();
    setTimeout(() => setShowConfetti(false), 2000);
  }

  function formatTime(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  function toggleFullscreen() {
    if (!videoRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else videoRef.current.requestFullscreen();
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg-primary)" }}>
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="confetti-particle absolute w-2 h-2 rounded-sm"
              style={{
                background: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
          <div className="text-4xl animate-fade-in">🎉</div>
        </div>
      )}

      {/* Header */}
      <header
        className="flex items-center gap-4 px-6 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "var(--color-bg-secondary)" }}
      >
        <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold truncate">{fileName}</h2>
          <p className="text-xs text-[var(--color-text-muted)] truncate">{filePath}</p>
        </div>
        {!completed ? (
          <button
            onClick={markComplete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ background: "var(--color-accent-green)", color: "white" }}
          >
            <CheckCircle2 size={16} /> Marcar como Assistido
          </button>
        ) : (
          <span className="flex items-center gap-2 text-sm text-[var(--color-accent-green)]">
            <CheckCircle2 size={16} /> Concluído
          </span>
        )}
      </header>

      {/* Video */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={`/api/serve?file=${encodeURIComponent(filePath)}`}
          className="max-h-[calc(100vh-140px)] max-w-full"
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          onEnded={() => {
            setIsPlaying(false);
            if (!completed) markComplete();
          }}
          onClick={togglePlay}
        />
      </div>

      {/* Controls */}
      <div className="px-6 py-3 border-t border-[var(--color-border)]" style={{ background: "var(--color-bg-secondary)" }}>
        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={seek}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer mb-3"
          style={{
            background: `linear-gradient(to right, var(--color-accent-blue) ${(currentTime / (duration || 1)) * 100}%, var(--color-bg-tertiary) 0%)`,
          }}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <span className="text-sm font-mono text-[var(--color-text-secondary)]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={cycleSpeed}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold hover:bg-[var(--color-bg-hover)] transition-colors"
              style={{ color: "var(--color-accent-amber)" }}
              title="Velocidade"
            >
              <Gauge size={14} /> {SPEEDS[speedIndex]}x
            </button>
            <button onClick={toggleMute} className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button onClick={toggleFullscreen} className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
