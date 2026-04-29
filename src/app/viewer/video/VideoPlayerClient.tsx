"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProgress } from "@/hooks/useProgress";
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
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const SPEEDS = [1, 1.25, 1.5, 1.75, 2];
const VIDEO_EXTENSIONS = [".mp4", ".mkv", ".webm", ".avi"];

export default function VideoPlayerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filePath = searchParams.get("file") || "";
  const fileName = filePath.split("/").pop() || "Video";
  const siblingVideos = searchParams.get("siblings");
  
  const { progress, saveProgress: saveDBProgress } = useProgress(filePath);
  
  // Parse siblings list if provided, otherwise will be empty
  const [videoList, setVideoList] = useState<string[]>([]);

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
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState(5);
  const isDraggingRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const savedTimeRef = useRef<number | null>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  // Reset state when navigating to a new video (React doesn't remount the component if only search params change)
  useEffect(() => {
    setCompleted(false);
    setShowEndScreen(false);
    setIsPlaying(false);
    setDuration(0);
    setCurrentTime(0);
    savedTimeRef.current = null;
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [filePath]);

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

  // Find sibling videos in same folder by scanning filenames
  useEffect(() => {
    if (siblingVideos) {
      try {
        setVideoList(JSON.parse(decodeURIComponent(siblingVideos)));
      } catch { /* ignore */ }
    }
  }, [siblingVideos]);

  const currentIndex = videoList.indexOf(filePath);
  const nextVideoPath = currentIndex >= 0 && currentIndex < videoList.length - 1 ? videoList[currentIndex + 1] : null;
  const prevVideoPath = currentIndex > 0 ? videoList[currentIndex - 1] : null;

  function navigateToVideo(path: string) {
    const params = new URLSearchParams();
    params.set("file", path);
    if (videoList.length > 0) params.set("siblings", encodeURIComponent(JSON.stringify(videoList)));
    router.push(`/viewer/video?${params.toString()}`);
  }

  // Sync initial loaded state from DB
  useEffect(() => {
    if (progress) {
      if (progress.status === "completed") {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
      if (progress.current_time && savedTimeRef.current === null) {
        savedTimeRef.current = progress.current_time;
      }
    }
  }, [progress]);

  // Apply saved progress after metadata loads
  const handleMetadataLoaded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration;
    if (dur && isFinite(dur) && dur > 0) {
      setDuration(dur);
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
  const handleSaveProgress = useCallback(() => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    if (!dur || !isFinite(dur)) return;
    
    saveDBProgress({
      current_time: videoRef.current.currentTime,
      duration: dur,
      status: completed ? "completed" : "in_progress",
      timestamp: Date.now()
    });
  }, [completed, saveDBProgress]);

  useEffect(() => {
    const interval = setInterval(handleSaveProgress, 5000);
    return () => clearInterval(interval);
  }, [handleSaveProgress]);

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
    const isNowComplete = !completed;
    setCompleted(isNowComplete);
    if (isNowComplete) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      
      // Auto-advance if manually checked
      if (nextVideoPath) {
        setShowEndScreen(true);
        setAutoAdvanceCountdown(5);
        let count = 5;
        autoAdvanceRef.current = setInterval(() => {
          count--;
          setAutoAdvanceCountdown(count);
          if (count <= 0) {
            if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
            navigateToVideo(nextVideoPath);
          }
        }, 1000);
      }
    } else {
      // If user unchecked, stop any auto-advance
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
      setShowEndScreen(false);
    }
    
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      saveDBProgress({
        current_time: videoRef.current.currentTime,
        duration: dur,
        status: isNowComplete ? "completed" : "in_progress",
        timestamp: Date.now()
      });
    }
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
        onTimeUpdate={() => {
          if (!isDraggingRef.current) {
            setCurrentTime(videoRef.current?.currentTime || 0);
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => { setIsPlaying(false); setIsIdle(false); }}
        onEnded={() => {
          setIsPlaying(false);
          setIsIdle(false);
          if (!completed) markComplete();
          if (nextVideoPath) {
            setShowEndScreen(true);
            setAutoAdvanceCountdown(5);
            let count = 5;
            autoAdvanceRef.current = setInterval(() => {
              count--;
              setAutoAdvanceCountdown(count);
              if (count <= 0) {
                if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
                navigateToVideo(nextVideoPath);
              }
            }, 1000);
          }
        }}
        onClick={togglePlay}
      />

      {/* Top Header - Floating with gradient background */}
      <header 
        className={`absolute top-0 left-0 right-0 p-6 pt-8 flex items-start justify-between z-10 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-500 ${isIdle && isPlaying ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex items-center gap-4">
          <button onClick={() => {
            const match = filePath.match(/\/library\/([^/]+)\//);
            if (match && match[1]) {
              const trackId = match[1];
              const folderPath = filePath.substring(0, filePath.lastIndexOf("/"));
              router.push(`/track/${trackId}?expand=${encodeURIComponent(folderPath)}`);
            } else {
              router.push("/");
            }
          }} className="p-3 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md text-white transition-all hover:scale-105 active:scale-95" title="Voltar para a Trilha">
            <ArrowLeft size={20} />
          </button>
          {prevVideoPath && (
            <button onClick={() => navigateToVideo(prevVideoPath)}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md text-white transition-all hover:scale-105 active:scale-95" title="Vídeo anterior">
              <ChevronLeft size={18} />
            </button>
          )}
          <div className="min-w-0 drop-shadow-md">
            <h2 className="text-lg font-bold text-white truncate leading-tight">
              {currentIndex >= 0 ? `${currentIndex + 1}/${videoList.length} · ` : ""}{fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ")}
            </h2>
            <p className="text-sm text-gray-300/80 truncate font-medium">{filePath.split('/').slice(-3, -1).join(' / ')}</p>
          </div>
          {nextVideoPath && (
            <button onClick={() => navigateToVideo(nextVideoPath)}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md text-white transition-all hover:scale-105 active:scale-95" title="Próximo vídeo">
              <ChevronRight size={18} />
            </button>
          )}
        </div>
        {!completed ? (
          <button onClick={markComplete}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            style={{ background: "var(--color-accent-green)", color: "white" }}>
            <CheckCircle2 size={18} /> Marcar como Assistido
          </button>
        ) : (
          <button onClick={markComplete}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-black/40 backdrop-blur-md text-[var(--color-accent-green)] border border-[var(--color-accent-green)] shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:bg-white/10 transition-colors">
            <CheckCircle2 size={18} /> Concluído
          </button>
        )}
      </header>

      {/* Next Video End Screen */}
      {showEndScreen && nextVideoPath && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card p-8 max-w-md text-center bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl">
            <CheckCircle2 size={48} className="mx-auto mb-4 text-[var(--color-accent-green)]" />
            <h3 className="text-xl font-bold text-white mb-2">Vídeo concluído! 🎉</h3>
            <p className="text-gray-300 mb-1">Próximo:</p>
            <p className="text-lg font-semibold text-white mb-4 truncate">
              {nextVideoPath.split("/").pop()?.replace(/\.[^/.]+$/, "").replace(/_/g, " ")}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => {
                if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
                setShowEndScreen(false);
              }}
                className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors">
                Ficar aqui
              </button>
              <button onClick={() => {
                if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
                navigateToVideo(nextVideoPath);
              }}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
                style={{ background: "var(--gradient-blue)" }}>
                Próximo ({autoAdvanceCountdown}s) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls - Floating Glass Card */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-10 transition-all duration-500 ease-out ${isIdle && isPlaying ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}
      >
        <div className="glass-card p-4 flex flex-col gap-3 bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl">
          
          {/* Progress bar */}
          <div className="relative group flex items-center h-4 cursor-pointer">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onMouseDown={() => { isDraggingRef.current = true; }}
              onTouchStart={() => { isDraggingRef.current = true; }}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              onMouseUp={(e) => {
                isDraggingRef.current = false;
                if (videoRef.current) videoRef.current.currentTime = Number((e.target as HTMLInputElement).value);
              }}
              onTouchEnd={(e) => {
                isDraggingRef.current = false;
                if (videoRef.current) videoRef.current.currentTime = Number((e.target as HTMLInputElement).value);
              }}
              className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
            />
            <div className="absolute left-0 right-0 h-1.5 bg-white/20 rounded-full overflow-hidden transition-all group-hover:h-2">
              <div 
                suppressHydrationWarning
                className="h-full bg-blue-500 relative"
                style={{ width: isMounted && duration > 0 ? `${(currentTime / duration) * 100}%` : '0%', background: "var(--gradient-blue)" }}
              />
            </div>
            {/* Playhead thumb (appears on hover) */}
            <div 
              suppressHydrationWarning
              className="absolute w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform -translate-x-1/2"
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
