"use client";

import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Clock, Play, RotateCcw } from 'lucide-react';

interface ExamTimerProps {
  exerciseId: string;
  durationMinutes: number;
  onTimeUp: () => void;
}

const STORAGE_PREFIX = '42_exam_timer_';

export default function ExamTimer({ exerciseId, durationMinutes, onTimeUp }: ExamTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const storageKey = `${STORAGE_PREFIX}${exerciseId}`;

  // Load timer state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return;

    try {
      const data = JSON.parse(stored);
      const elapsed = Math.floor((Date.now() - data.startedAt) / 1000);
      const remaining = data.totalSeconds - elapsed;

      // Use a microtask to batch all state updates and avoid cascading renders
      queueMicrotask(() => {
        if (remaining <= 0) {
          setIsTimeUp(true);
          setRemainingSeconds(0);
          setHasStarted(true);
          setIsActive(false);
        } else {
          setRemainingSeconds(remaining);
          setHasStarted(true);
          setIsActive(data.wasActive);
        }
      });
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  // Timer countdown
  useEffect(() => {
    if (!isActive || remainingSeconds === null || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev === null || prev <= 1) {
          setIsActive(false);
          setIsTimeUp(true);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, remainingSeconds, onTimeUp]);

  // Persist timer state
  useEffect(() => {
    if (hasStarted && remainingSeconds !== null) {
      const totalSeconds = durationMinutes * 60;
      const elapsed = totalSeconds - remainingSeconds;
      localStorage.setItem(storageKey, JSON.stringify({
        startedAt: Date.now() - (elapsed * 1000),
        totalSeconds,
        wasActive: isActive,
      }));
    }
  }, [remainingSeconds, isActive, hasStarted, storageKey, durationMinutes]);

  const startExam = () => {
    const totalSeconds = durationMinutes * 60;
    setRemainingSeconds(totalSeconds);
    setIsActive(true);
    setHasStarted(true);
    setIsTimeUp(false);

    localStorage.setItem(storageKey, JSON.stringify({
      startedAt: Date.now(),
      totalSeconds,
      wasActive: true,
    }));
  };

  const resetExam = () => {
    if (!window.confirm('RESET the exam timer? This cannot be undone.')) return;
    localStorage.removeItem(storageKey);
    setRemainingSeconds(null);
    setIsActive(false);
    setHasStarted(false);
    setIsTimeUp(false);
  };

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getUrgencyColor = (): string => {
    if (remainingSeconds === null) return '#666';
    const totalSeconds = durationMinutes * 60;
    const ratio = remainingSeconds / totalSeconds;
    if (ratio > 0.5) return '#00FF41';
    if (ratio > 0.25) return '#FFB800';
    return '#FF4136';
  };

  const progress = remainingSeconds !== null
    ? ((durationMinutes * 60 - remainingSeconds) / (durationMinutes * 60)) * 100
    : 0;

  // Not started yet — show start button
  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-[#1A0505] border-2 border-red-500/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={24} className="text-red-500" />
            <h2 className="font-mono text-lg font-black text-red-400 uppercase tracking-widest">
              Gatekeeper Exam
            </h2>
          </div>
          <div className="font-mono text-sm text-[#888] space-y-2 mb-6">
            <p>Duration: <span className="text-white font-bold">{durationMinutes / 60} hours</span></p>
            <p>Once started, the timer <span className="text-red-400 font-bold">CANNOT be paused</span>.</p>
            <p>Timer persists across page reloads and browser restarts.</p>
            <p className="text-red-400 text-xs mt-4">Close all reference material. This is a closed-book exam.</p>
          </div>
          <button
            onClick={startExam}
            className="w-full py-4 bg-red-500 text-black font-black uppercase tracking-[0.2em] font-mono hover:bg-red-400 transition-colors flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play size={20} />
            Start Exam — {durationMinutes / 60}h Timer Begins
          </button>
        </div>
      </div>
    );
  }

  // Timer is running or finished
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className={`border-2 p-4 ${isTimeUp ? 'bg-[#1A0505] border-red-500' : 'bg-[#050505] border-[#1A1A1A]'}`}>
        {/* Timer Bar */}
        <div className="w-full h-2 bg-[#1A1A1A] mb-4 overflow-hidden">
          <div
            className="h-full transition-all duration-1000 ease-linear"
            style={{
              width: `${progress}%`,
              backgroundColor: getUrgencyColor(),
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock size={20} style={{ color: getUrgencyColor() }} />
            <span className="font-mono text-[10px] text-[#666] uppercase tracking-widest">
              {isTimeUp ? 'TIME EXPIRED' : 'Exam in Progress'}
            </span>
          </div>

          <div
            className="font-mono text-3xl font-black tracking-wider"
            style={{ color: getUrgencyColor() }}
          >
            {remainingSeconds !== null ? formatTime(remainingSeconds) : '--:--:--'}
          </div>

          <button
            onClick={resetExam}
            className="font-mono text-[10px] text-[#666] hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer uppercase"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        </div>

        {isTimeUp && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 font-mono text-xs text-red-400 text-center uppercase tracking-widest">
            Time is up. Submit what you have. The Moulinette will judge.
          </div>
        )}
      </div>
    </div>
  );
}
