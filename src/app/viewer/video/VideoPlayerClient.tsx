"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const savedTimeRef = useRef<number | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Swallow harmless AbortErrors from the video element to prevent Next.js dev overlay
    const handleUnhandledRejection = (e: PromiseRejectionEvent) => {
      if (e.reason && e.reason.name === "AbortError") {
        e.preventDefault(); // Stop the error from bubbling up to Next.js
      }
    };
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => window.removeEventListener("unhandledrejection", handleUnhandledRejection);
  }, []);

  // Load saved progress (DISABLED: User wants it to start from the beginning)
  useEffect(() => {
    /*
    const saved = localStorage.getItem(`progress:${filePath}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.currentTime) savedTimeRef.current = data.currentTime;
        if (data.completed) setCompleted(true);
      } catch { }
    }
    */
  }, [filePath]);

  // Apply saved progress after metadata loads
  const handleMetadataLoaded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration;
    if (dur && isFinite(dur) && dur > 0) {
      setDuration(dur);
      /*
      if (savedTimeRef.current !== null) {
        video.currentTime = Math.min(savedTimeRef.current, dur - 1);
        savedTimeRef.current = null;
      }
      */
    }
  }, []);

  // Poll for duration as fallback
  useEffect(() => {
    if (duration > 0) return;
    const poll = setInterval(() => {
      const dur = videoRef.current?.duration;
      if (dur && isFinite(dur) && dur > 0) {
        setDuration(dur);
        if (savedTimeRef.current !== null && videoRef.current) {
          videoRef.current.currentTime = Math.min(savedTimeRef.current, dur - 1);
          savedTimeRef.current = null;
        }
        clearInterval(poll);
      }
    }, 500);
    const stop = setTimeout(() => clearInterval(poll), 15000);
    return () => { clearInterval(poll); clearTimeout(stop); };
  }, [duration]);

  // Save progress every 5 seconds
  const saveProgress = useCallback(() => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    if (!dur || !isFinite(dur)) return;
    localStorage.setItem(`progress:${filePath}`, JSON.stringify({
      currentTime: videoRef.current.currentTime,
      duration: dur,
      completed,
      lastWatched: new Date().toISOString(),
    }));
  }, [filePath, completed]);

  useEffect(() => {
    const interval = setInterval(saveProgress, 5000);
    return () => clearInterval(interval);
  }, [saveProgress]);

  // Idle Timer logic to hide controls
  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isPlaying) {
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isPlaying, resetIdleTimer]);

  async function togglePlay() {
    if (!videoRef.current) return;
    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.warn("Play error:", err);
    }
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
    const dur = videoRef.current.duration;
    if (!dur || !isFinite(dur)) return;
    videoRef.current.currentTime = parseFloat(e.target.value);
    resetIdleTimer();
  }

  function skipForward() {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    if (!dur || !isFinite(dur)) return;
    videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, dur - 0.1);
    resetIdleTimer();
  }

  function skipBack() {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
    resetIdleTimer();
  }

  function markComplete() {
    setCompleted(true);
    setShowConfetti(true);
    saveProgress();
    setTimeout(() => setShowConfetti(false), 2000);
  }

  function formatTime(s: number) {
    if (!s || !isFinite(s)) return "0:00";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  function toggleFullscreen() {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      resetIdleTimer();
      switch (e.key) {
        case " ": case "k": e.preventDefault(); togglePlay(); break;
        case "ArrowRight": e.preventDefault(); skipForward(); break;
        case "ArrowLeft": e.preventDefault(); skipBack(); break;
        case "m": e.preventDefault(); toggleMute(); break;
        case "f": e.preventDefault(); toggleFullscreen(); break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetIdleTimer, togglePlay, skipForward, skipBack, toggleMute, toggleFullscreen]); // Added dependencies to avoid stale closures

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen bg-black overflow-hidden select-none transition-all duration-500 ${isIdle && isPlaying ? 'cursor-none' : 'cursor-default'}`}
      onMouseMove={resetIdleTimer}
      onClick={resetIdleTimer}
      onMouseLeave={() => isPlaying && setIsIdle(true)}
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="confetti-particle absolute w-3 h-3 rounded-sm"
              style={{
                background: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"][i % 5],
                left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }} />
          ))}
          <div className="text-5xl animate-fade-in font-bold drop-shadow-lg">🎉</div>
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src={`/api/serve?file=${encodeURIComponent(filePath)}`}
        preload="auto"
        className="absolute inset-0 w-full h-full object-contain"
        onLoadedMetadata={handleMetadataLoaded}
        onDurationChange={() => {
          const dur = videoRef.current?.duration;
          if (dur && isFinite(dur) && dur > 0) setDuration(dur);
        }}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => { setIsPlaying(false); setIsIdle(false); }}
        onEnded={() => {
          setIsPlaying(false);
          setIsIdle(false);
          if (!completed) markComplete();
        }}
        onClick={togglePlay}
      />

      {/* Top Header - Floating with gradient background */}
      <header 
        className={`absolute top-0 left-0 right-0 p-6 pt-8 flex items-start justify-between z-10 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-500 ${isIdle && isPlaying ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="p-3 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md text-white transition-all hover:scale-105 active:scale-95">
            <ArrowLeft size={20} />
          </Link>
          <div className="min-w-0 drop-shadow-md">
            <h2 className="text-lg font-bold text-white truncate leading-tight">{fileName}</h2>
            <p className="text-sm text-gray-300/80 truncate font-medium">{filePath.split('/').slice(-3, -1).join(' / ')}</p>
          </div>
        </div>
        {!completed ? (
          <button onClick={markComplete}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            style={{ background: "var(--color-accent-green)", color: "white" }}>
            <CheckCircle2 size={18} /> Marcar como Assistido
          </button>
        ) : (
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-black/40 backdrop-blur-md text-[var(--color-accent-green)] border border-[var(--color-accent-green)] shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <CheckCircle2 size={18} /> Concluído
          </span>
        )}
      </header>

      {/* Bottom Controls - Floating Glass Card */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-10 transition-all duration-500 ease-out ${isIdle && isPlaying ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}
      >
        <div className="glass-card p-4 flex flex-col gap-3 bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl">
          
          {/* Progress bar */}
          <div className="relative group flex items-center h-4 cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            if (videoRef.current && duration) {
              videoRef.current.currentTime = pos * duration;
              setCurrentTime(pos * duration);
            }
          }}>
            <div className="absolute left-0 right-0 h-1.5 bg-white/20 rounded-full overflow-hidden transition-all group-hover:h-2">
              <div 
                suppressHydrationWarning
                className="h-full bg-blue-500 relative transition-all duration-100"
                style={{ width: isMounted && duration > 0 ? `${(currentTime / duration) * 100}%` : '0%', background: "var(--gradient-blue)" }}
              />
            </div>
            {/* Playhead thumb (appears on hover) */}
            <div 
              suppressHydrationWarning
              className="absolute w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2"
              style={{ left: isMounted && duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="p-3 rounded-full hover:bg-white/10 text-white transition-colors">
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              
              <div className="flex items-center gap-1 mx-2">
                <button onClick={skipBack} className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors" title="-10s">
                  <SkipBack size={18} />
                </button>
                <button onClick={skipForward} className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors" title="+10s">
                  <SkipForward size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2 ml-2">
                <button onClick={toggleMute} className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <span className="text-sm font-mono font-medium text-gray-300 ml-2">
                  {formatTime(currentTime)} <span className="opacity-50 mx-1">/</span> {formatTime(duration)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={cycleSpeed} title="Velocidade"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white/5 hover:bg-white/15 text-amber-400 transition-colors border border-white/5">
                <Gauge size={14} /> {SPEEDS[speedIndex]}x
              </button>
              
              <div className="w-px h-6 bg-white/10 mx-1"></div>
              
              <button onClick={toggleFullscreen} className="p-2.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
