"use client";

import Link from "next/link";
import { Video, FileText, BookOpen, Code, AlertCircle, CheckCircle2 } from "lucide-react";
import type { Track } from "@/lib/types";

interface TrackCardProps {
  track: Track;
  fileCount: { videos: number; pdfs: number; docs: number; total: number };
  href: string;
}

export default function TrackCard({ track, fileCount, href }: TrackCardProps) {
  const activeSubjects = track.subjects?.filter((s) => s.status === "active").length ?? 0;
  const debtSubjects = track.subjects?.filter((s) => s.status === "debt").length ?? 0;
  const completedSubjects = track.subjects?.filter((s) => s.status === "completed").length ?? 0;
  const totalSubjects = track.subjects?.length ?? 0;
  const progress = totalSubjects > 0 ? (completedSubjects / totalSubjects) * 100 : 0;

  return (
    <Link
      href={href}
      className="glass-card p-5 text-left w-full group block"
      style={{
        borderTop: `3px solid ${track.color}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{track.icon}</span>
          <div>
            <h3 className="font-semibold text-sm group-hover:text-white transition-colors">
              {track.name}
            </h3>
            {track.subjects && (
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                {totalSubjects} matérias
              </p>
            )}
            {track.phases && (
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                {track.phases.length} fases · {track.phases.reduce((a, p) => a + p.modules, 0)} módulos
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Status badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {activeSubjects > 0 && (
          <Badge color="var(--color-accent-blue)" icon={<BookOpen size={10} />} text={`${activeSubjects} ativa`} />
        )}
        {debtSubjects > 0 && (
          <Badge color="var(--color-accent-red)" icon={<AlertCircle size={10} />} text={`${debtSubjects} dívida`} />
        )}
        {completedSubjects > 0 && (
          <Badge color="var(--color-accent-green)" icon={<CheckCircle2 size={10} />} text={`${completedSubjects} concluída`} />
        )}
      </div>

      {/* File counts */}
      <div className="flex gap-3 text-[11px] text-[var(--color-text-muted)]">
        {fileCount.videos > 0 && (
          <span className="flex items-center gap-1">
            <Video size={12} /> {fileCount.videos}
          </span>
        )}
        {fileCount.pdfs > 0 && (
          <span className="flex items-center gap-1">
            <FileText size={12} /> {fileCount.pdfs}
          </span>
        )}
        {fileCount.docs > 0 && (
          <span className="flex items-center gap-1">
            <Code size={12} /> {fileCount.docs}
          </span>
        )}
        {fileCount.total === 0 && (
          <span className="italic">Nenhum material ainda</span>
        )}
      </div>

      {/* Progress bar */}
      {totalSubjects > 0 && (
        <div className="mt-4">
          <div className="h-1.5 rounded-full bg-[var(--color-bg-tertiary)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: track.color,
              }}
            />
          </div>
        </div>
      )}
    </Link>
  );
}

function Badge({
  color,
  icon,
  text,
}: {
  color: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <span
      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
      style={{
        background: `${color}15`,
        color: color,
      }}
    >
      {icon} {text}
    </span>
  );
}
