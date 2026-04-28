"use client";

import { useState } from "react";
import { Play, Search, Zap, FolderOpen } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TrackCard from "@/components/dashboard/TrackCard";
import ProgressRing from "@/components/dashboard/ProgressRing";
import Countdown from "@/components/dashboard/Countdown";
import type { AppConfig } from "@/lib/types";

interface DashboardClientProps {
  config: AppConfig;
  trackStats: { trackId: string; videos: number; pdfs: number; docs: number; total: number }[];
}

export default function DashboardClient({ config, trackStats }: DashboardClientProps) {
  const [activePage, setActivePage] = useState("dashboard");
  const [activeTrack, setActiveTrack] = useState<string | undefined>();

  const totalFiles = trackStats.reduce((sum, t) => sum + t.total, 0);
  const totalVideos = trackStats.reduce((sum, t) => sum + t.videos, 0);
  const totalPdfs = trackStats.reduce((sum, t) => sum + t.pdfs, 0);

  // Calculate overall progress
  const allSubjects = config.tracks.flatMap((t) => t.subjects ?? []);
  const completed = allSubjects.filter((s) => s.status === "completed").length;
  const overallProgress = allSubjects.length > 0 ? (completed / allSubjects.length) * 100 : 0;

  return (
    <div className="flex min-h-screen">
      <Sidebar
        tracks={config.tracks}
        activeTrack={activeTrack}
        onTrackSelect={(id) => {
          setActiveTrack(id);
          setActivePage("track");
        }}
        onNavigate={setActivePage}
        activePage={activePage}
      />

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{
          marginLeft: "var(--sidebar-width)",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-8 border-b border-[var(--color-border)]"
          style={{
            height: "var(--header-height)",
            background: "rgba(9, 9, 11, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            style={{ background: "var(--color-bg-tertiary)" }}
          >
            <Search size={16} />
            <span>Buscar...</span>
            <kbd className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-1.5 py-0.5 rounded font-mono ml-8">
              Ctrl+K
            </kbd>
          </button>
        </header>

        <div className="p-8 space-y-8 animate-fade-in">
          {/* ─── CONTINUE DE ONDE PAROU (Anti-TDAH) ─── */}
          <section className="glass-card p-6 animate-pulse-glow cursor-pointer group"
            style={{ borderLeft: "4px solid var(--color-accent-blue)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--gradient-blue)" }}
                >
                  <Play size={24} className="text-white ml-0.5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-accent-blue)] font-semibold uppercase tracking-wider mb-1">
                    Continuar de onde parou
                  </p>
                  <h3 className="text-lg font-bold group-hover:text-white transition-colors">
                    Adicione seu primeiro material de estudo
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                    Coloque vídeos ou PDFs em library/ para começar
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-accent-blue)]">
                <Zap size={20} />
                <span className="text-sm font-semibold">Começar</span>
              </div>
            </div>
          </section>

          {/* ─── STATS ROW ─── */}
          <section className="grid grid-cols-4 gap-4">
            <StatCard
              icon="📁"
              value={totalFiles}
              label="Arquivos"
              color="var(--color-accent-blue)"
            />
            <StatCard
              icon="📺"
              value={totalVideos}
              label="Vídeos"
              color="var(--color-accent-purple)"
            />
            <StatCard
              icon="📄"
              value={totalPdfs}
              label="PDFs"
              color="var(--color-accent-amber)"
            />
            <StatCard
              icon="📚"
              value={config.tracks.length}
              label="Tracks"
              color="var(--color-accent-green)"
            />
          </section>

          {/* ─── PROGRESS + COUNTDOWN ─── */}
          <section className="grid grid-cols-3 gap-6">
            <div className="glass-card p-6 flex items-center justify-center">
              <ProgressRing
                value={overallProgress}
                size={140}
                strokeWidth={10}
                color="var(--color-accent-blue)"
                label="Progresso Geral"
                sublabel={`${completed}/${allSubjects.length} matérias`}
              />
            </div>

            <div className="glass-card p-6 flex items-center justify-center">
              <ProgressRing
                value={totalFiles > 0 ? Math.min((totalFiles / 100) * 100, 100) : 0}
                size={140}
                strokeWidth={10}
                color="var(--color-accent-purple)"
                label="Biblioteca"
                sublabel={`${totalFiles} materiais indexados`}
              />
            </div>

            {config.features.countdown.enabled && (
              <Countdown
                label={config.features.countdown.label}
                targetDate={config.features.countdown.date}
              />
            )}
          </section>

          {/* ─── TRACK CARDS ─── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Seus Tracks</h3>
              <button className="flex items-center gap-1.5 text-sm text-[var(--color-accent-blue)] hover:underline">
                <FolderOpen size={16} />
                Gerenciar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {config.tracks.map((track) => {
                const stats = trackStats.find((s) => s.trackId === track.id) ?? {
                  videos: 0, pdfs: 0, docs: 0, total: 0,
                };
                return (
                  <TrackCard
                    key={track.id}
                    track={track}
                    fileCount={stats}
                    onClick={() => {
                      setActiveTrack(track.id);
                      setActivePage("track");
                    }}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="glass-card p-4 flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-2xl font-bold" style={{ color }}>
          {value}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}
