"use client";

import Link from "next/link";
import { Play, Search, Zap, FolderOpen, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllProgressAction, saveProgressAction } from "@/app/actions";
import Sidebar from "@/components/layout/Sidebar";
import TrackCard from "@/components/dashboard/TrackCard";
import ProgressRing from "@/components/dashboard/ProgressRing";
import Countdown from "@/components/dashboard/Countdown";
import type { AppConfig } from "@/lib/types";

interface DashboardClientProps {
  config: AppConfig;
  trackStats: { trackId: string; videos: number; pdfs: number; docs: number; total: number }[];
}

interface SavedProgress {
  currentTime: number;
  duration: number;
  completed: boolean;
  lastWatched: string;
}

export default function DashboardClient({ config, trackStats }: DashboardClientProps) {
  const totalFiles = trackStats.reduce((sum, t) => sum + t.total, 0);
  const totalVideos = trackStats.reduce((sum, t) => sum + t.videos, 0);
  const totalPdfs = trackStats.reduce((sum, t) => sum + t.pdfs, 0);

  const allSubjects = config.tracks.flatMap((t) => t.subjects ?? []);
  const completed = allSubjects.filter((s) => s.status === "completed").length;
  const overallProgress = allSubjects.length > 0 ? (completed / allSubjects.length) * 100 : 0;

  // Read last watched video from localStorage
  const [lastVideo, setLastVideo] = useState<{ path: string; name: string; progress: SavedProgress; trackName: string } | null>(null);
  const [watchedCount, setWatchedCount] = useState(0);
  const [allProgress, setAllProgress] = useState<any[]>([]);

  useEffect(() => {
    async function loadProgress() {
      // One-time migration from localStorage to SQLite
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("progress:")) {
          try {
            const data: SavedProgress = JSON.parse(localStorage.getItem(key)!);
            await saveProgressAction({
              file_path: key.replace("progress:", ""),
              status: data.completed ? "completed" : "in_progress",
              timestamp: new Date(data.lastWatched).getTime(),
              current_time: data.currentTime,
              duration: data.duration
            });
            localStorage.removeItem(key);
            i--; // Adjust index after removal
          } catch { /* ignore */ }
        }
      }

      // Fetch from Single Source of Truth
      const result = await getAllProgressAction();
      if (result.success && result.data) {
        const progressList = result.data;
        const watched = progressList.filter(p => p.status === "completed").length;
        setWatchedCount(watched);
        setAllProgress(progressList); // We need this to pass to TrackCards

        if (progressList.length > 0) {
          const mostRecent = progressList[0]; // Already ordered by updated_at DESC
          const fileName = mostRecent.file_path.split("/").pop() || "Video";
          
          let trackName = "";
          for (const track of config.tracks) {
            if (mostRecent.file_path.includes(`/${track.id}/`) || mostRecent.file_path.includes(`/${track.id.replace("-", "")}/`)) {
              trackName = track.name;
              break;
            }
          }
          
          setLastVideo({
            path: mostRecent.file_path,
            name: fileName,
            progress: {
              currentTime: mostRecent.current_time || 0,
              duration: mostRecent.duration || 0,
              completed: mostRecent.status === "completed",
              lastWatched: new Date(mostRecent.timestamp).toISOString()
            },
            trackName
          });
        }
      }
    }
    loadProgress();
  }, [config.tracks]);

  function formatTime(s: number) {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  function timeAgo(isoDate: string): string {
    const diff = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "agora";
    if (mins < 60) return `${mins}min atrás`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h atrás`;
    const days = Math.floor(hrs / 24);
    return `${days}d atrás`;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar tracks={config.tracks} />

      <main className="flex-1 overflow-y-auto" style={{ marginLeft: "var(--sidebar-width)", minHeight: "100vh" }}>
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-8 border-b border-[var(--color-border)]"
          style={{ height: "var(--header-height)", background: "rgba(9, 9, 11, 0.8)", backdropFilter: "blur(12px)" }}>
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <Link href="/search"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            style={{ background: "var(--color-bg-tertiary)" }}>
            <Search size={16} /><span>Buscar...</span>
            <kbd className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-1.5 py-0.5 rounded font-mono ml-8">Ctrl+K</kbd>
          </Link>
        </header>

        <div className="p-8 space-y-8 animate-fade-in">
          {/* CONTINUAR DE ONDE PAROU — hero action card */}
          {lastVideo && !lastVideo.progress.completed ? (
            <Link href={`/viewer/video?file=${encodeURIComponent(lastVideo.path)}`} className="block group">
              <section className="relative glass-card p-6 overflow-hidden animate-pulse-glow"
                style={{ borderLeft: "4px solid var(--color-accent-blue)" }}>
                {/* Gradient glow background */}
                <div className="absolute inset-0 opacity-10" style={{ background: "var(--gradient-blue)" }} />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform" style={{ background: "var(--gradient-blue)" }}>
                      <Play size={28} className="text-white ml-0.5" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-accent-blue)] font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Zap size={12} /> Continuar de onde parou
                      </p>
                      <h3 className="text-lg font-bold group-hover:text-white transition-colors truncate max-w-lg">
                        {lastVideo.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ")}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        {lastVideo.trackName && (
                          <span className="text-xs text-[var(--color-text-muted)]">{lastVideo.trackName}</span>
                        )}
                        <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                          <Clock size={10} /> {timeAgo(lastVideo.progress.lastWatched)}
                        </span>
                        <span className="text-xs font-mono text-[var(--color-text-muted)]">
                          {formatTime(lastVideo.progress.currentTime)} / {formatTime(lastVideo.progress.duration)}
                        </span>
                      </div>
                      {/* Micro progress bar */}
                      <div className="mt-2 w-64 h-1.5 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{
                          width: `${lastVideo.progress.duration > 0 ? (lastVideo.progress.currentTime / lastVideo.progress.duration) * 100 : 0}%`,
                          background: "var(--gradient-blue)",
                        }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-accent-blue)] group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-bold">Retomar</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </section>
            </Link>
          ) : (
            <Link href={config.tracks.length > 0 ? `/track/${config.tracks[0].id}` : "/settings"} className="block group">
              <section className="glass-card p-6 animate-pulse-glow" style={{ borderLeft: "4px solid var(--color-accent-blue)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-blue)" }}>
                      <Play size={24} className="text-white ml-0.5" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-accent-blue)] font-semibold uppercase tracking-wider mb-1">Comece a estudar</p>
                      <h3 className="text-lg font-bold group-hover:text-white transition-colors">
                        {totalFiles > 0 ? "Escolha um track para começar" : "Adicione seu primeiro material de estudo"}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                        {totalFiles > 0 ? `${totalFiles} materiais disponíveis` : "Coloque vídeos ou PDFs em library/ para começar"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-accent-blue)]">
                    <Zap size={20} /><span className="text-sm font-semibold">Começar</span>
                  </div>
                </div>
              </section>
            </Link>
          )}

          {/* Stats Row */}
          <section className="grid grid-cols-4 gap-4">
            <StatCard icon="📁" value={totalFiles} label="Arquivos" color="var(--color-accent-blue)" />
            <StatCard icon="📺" value={totalVideos} label="Vídeos" color="var(--color-accent-purple)" />
            <StatCard icon="📄" value={totalPdfs} label="PDFs" color="var(--color-accent-amber)" />
            <StatCard icon="✅" value={watchedCount} label="Assistidos" color="var(--color-accent-green)" />
          </section>

          {/* Progress + Countdown */}
          <section className="grid grid-cols-3 gap-6">
            <div className="glass-card p-6 flex items-center justify-center">
              <ProgressRing value={overallProgress} size={140} strokeWidth={10} color="var(--color-accent-blue)" label="Progresso Geral" sublabel={`${completed}/${allSubjects.length} matérias`} />
            </div>
            <div className="glass-card p-6 flex items-center justify-center">
              <ProgressRing value={totalVideos > 0 ? Math.min((watchedCount / totalVideos) * 100, 100) : 0} size={140} strokeWidth={10} color="var(--color-accent-purple)" label="Vídeos Assistidos" sublabel={`${watchedCount}/${totalVideos} vídeos`} />
            </div>
            {config.features.countdown.enabled && (
              <Countdown label={config.features.countdown.label} targetDate={config.features.countdown.date} />
            )}
          </section>

          {/* Track Cards */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Seus Tracks</h3>
              <Link href="/settings" className="flex items-center gap-1.5 text-sm text-[var(--color-accent-blue)] hover:underline">
                <FolderOpen size={16} /> Gerenciar
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {config.tracks.map((track) => {
                const stats = trackStats.find((s) => s.trackId === track.id) ?? { videos: 0, pdfs: 0, docs: 0, total: 0 };
                const watchedInTrack = allProgress.filter(p => p.status === "completed" && (p.file_path.includes(`/${track.id}/`) || p.file_path.includes(`/${track.id.replace("-", "")}/`))).length;
                return <TrackCard key={track.id} track={track} fileCount={stats} watchedCount={watchedInTrack} href={`/track/${track.id}`} />;
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  return (
    <div className="glass-card p-4 flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}
