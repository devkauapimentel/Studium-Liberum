"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

interface CountdownProps {
  label: string;
  targetDate: string; // ISO date
}

export default function Countdown({ label, targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <div className="glass-card p-4 glow-green">
        <div className="flex items-center gap-2 mb-2">
          <Timer size={16} className="text-[var(--color-accent-green)]" />
          <span className="text-xs font-semibold text-[var(--color-accent-green)] uppercase tracking-wider">
            {label}
          </span>
        </div>
        <p className="text-lg font-bold text-[var(--color-accent-green)]">🎉 Chegou!</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 glow-green">
      <div className="flex items-center gap-2 mb-3">
        <Timer size={16} className="text-[var(--color-accent-green)]" />
        <span className="text-xs font-semibold text-[var(--color-accent-green)] uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex gap-3" suppressHydrationWarning>
        <TimeUnit value={timeLeft.days} unit="dias" />
        <TimeUnit value={timeLeft.hours} unit="hrs" />
        <TimeUnit value={timeLeft.minutes} unit="min" />
        <TimeUnit value={timeLeft.seconds} unit="seg" />
      </div>
    </div>
  );
}

function TimeUnit({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-2xl font-bold font-mono tabular-nums"
        style={{ color: "var(--color-accent-green)" }}
        suppressHydrationWarning
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
        {unit}
      </span>
    </div>
  );
}
