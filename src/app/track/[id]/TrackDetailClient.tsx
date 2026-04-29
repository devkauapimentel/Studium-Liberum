"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  FileText,
  FolderOpen,
  ChevronRight,
  Video,
  File,
  Code,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  Paperclip,
  Palette,
  LinkIcon,
  Package,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import type { Track, FileEntry } from "@/lib/types";

interface TrackDetailClientProps {
  track: Track;
  files: FileEntry[];
  counts: { videos: number; pdfs: number; docs: number; resources?: number; total: number };
  allTracks: Track[];
  hasSyllabus?: boolean;
}

const STATUS_MAP = {
  active: { label: "Ativa", icon: BookOpen, color: "var(--color-accent-blue)" },
  debt: { label: "Dívida", icon: AlertCircle, color: "var(--color-accent-red)" },
  completed: { label: "Concluída", icon: CheckCircle2, color: "var(--color-accent-green)" },
  upcoming: { label: "Pendente", icon: Clock, color: "var(--color-accent-amber)" },
};

export default function TrackDetailClient({ track, files, counts, allTracks, hasSyllabus }: TrackDetailClientProps) {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set());

  function toggleDir(path: string) {
    setExpandedDirs((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar tracks={allTracks} />
      <main className="flex-1 overflow-y-auto" style={{ marginLeft: "var(--sidebar-width)", minHeight: "100vh" }}>
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center gap-4 px-8 border-b border-[var(--color-border)]"
          style={{ height: "var(--header-height)", background: "rgba(9, 9, 11, 0.8)", backdropFilter: "blur(12px)" }}>
          <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <span className="text-2xl">{track.icon}</span>
          <h2 className="text-lg font-semibold flex-1">{track.name}</h2>
          {hasSyllabus && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
              style={{ background: `${track.color}15`, color: track.color }}>
              <Package size={12} /> Ordem Cronológica
            </span>
          )}
          <Link href="/search" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            style={{ background: "var(--color-bg-tertiary)" }}>
            <Search size={16} /><span>Buscar...</span>
            <kbd className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-1.5 py-0.5 rounded font-mono ml-4">Ctrl+K</kbd>
          </Link>
        </header>

        <div className="p-8 space-y-8 animate-fade-in">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <MiniStat icon={<Video size={18} />} value={counts.videos} label="Vídeos" color={track.color} />
            <MiniStat icon={<FileText size={18} />} value={counts.pdfs} label="PDFs" color={track.color} />
            <MiniStat icon={<Code size={18} />} value={counts.docs} label="Docs" color={track.color} />
            <MiniStat icon={<File size={18} />} value={counts.total} label="Total" color={track.color} />
          </div>

          {/* Subjects */}
          {track.subjects && track.subjects.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4">Matérias</h3>
              <div className="grid grid-cols-2 gap-3">
                {track.subjects.map((subject) => {
                  const status = STATUS_MAP[subject.status];
                  const Icon = status.icon;
                  return (
                    <div key={subject.id} className="glass-card p-4 flex items-center gap-3"
                      style={{ borderLeft: `3px solid ${status.color}` }}>
                      <Icon size={16} style={{ color: status.color }} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{subject.name}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: status.color }}>{status.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Phases */}
          {track.phases && track.phases.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4">Fases</h3>
              <div className="space-y-2">
                {track.phases.map((phase, i) => (
                  <div key={i} className="glass-card p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{ background: `${track.color}20`, color: track.color }}>{i + 1}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{phase.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{phase.modules} módulos</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* File Browser */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FolderOpen size={20} /> Arquivos</h3>
            {files.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <FolderOpen size={48} className="mx-auto mb-4 text-[var(--color-text-muted)]" />
                <p className="text-[var(--color-text-secondary)]">Nenhum arquivo ainda</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Coloque seus materiais em <code className="font-mono text-xs bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 rounded">library/{track.id}/</code>
                </p>
              </div>
            ) : (
              <div className="glass-card divide-y divide-[var(--color-border)]">
                {files.map((entry) => (
                  <FileRow key={entry.path} entry={entry} depth={0} expandedDirs={expandedDirs} onToggle={toggleDir} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function FileRow({ entry, depth, expandedDirs, onToggle }: {
  entry: FileEntry; depth: number; expandedDirs: Set<string>; onToggle: (p: string) => void;
}) {
  const isExpanded = expandedDirs.has(entry.path);
  const isDir = entry.type === "directory";
  const isPlayable = [".mp4", ".mkv", ".webm", ".avi"].includes(entry.extension || "");
  const isPdf = entry.extension === ".pdf";
  const isUrl = entry.extension === ".url";
  const isFigma = entry.extension === ".fig" || entry.extension === ".figma";
  const isResource = isUrl || isFigma;
  const hasAttachments = entry.attachments && entry.attachments.length > 0;

  function getIcon() {
    if (isDir) return <FolderOpen size={16} className="text-[var(--color-accent-amber)]" />;
    if (isFigma) return <Palette size={16} className="text-[var(--color-accent-purple)]" />;
    if (isUrl) return <LinkIcon size={16} className="text-[var(--color-accent-cyan)]" />;
    switch (entry.extension) {
      case ".mp4": case ".mkv": case ".webm": case ".avi": return <Video size={16} className="text-[var(--color-accent-purple)]" />;
      case ".pdf": return <FileText size={16} className="text-[var(--color-accent-red)]" />;
      case ".md": case ".txt": return <BookOpen size={16} className="text-[var(--color-accent-blue)]" />;
      case ".c": case ".h": case ".js": case ".ts": case ".py": return <Code size={16} className="text-[var(--color-accent-green)]" />;
      default: return <File size={16} className="text-[var(--color-text-muted)]" />;
    }
  }

  // Clean display name: remove extension for .url files to show just the title
  function getDisplayName() {
    if (isUrl) return entry.name.replace(/\.url$/, "");
    if (isFigma) return entry.name.replace(/\.(fig|figma)$/, "") + " (Figma)";
    return entry.name;
  }

  function formatSize(bytes?: number) {
    if (!bytes) return "";
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${(bytes / 1073741824).toFixed(1)} GB`;
  }

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer"
        style={{ paddingLeft: `${16 + depth * 24}px` }}
        onClick={() => isDir && onToggle(entry.path)}>
        {isDir ? <ChevronRight size={14} className={`transition-transform text-[var(--color-text-muted)] ${isExpanded ? "rotate-90" : ""}`} /> : <span className="w-3.5" />}
        {getIcon()}
        <span className={`flex-1 text-sm truncate ${isResource ? "text-[var(--color-text-secondary)]" : ""}`}>{getDisplayName()}</span>
        {entry.size && !isResource ? <span className="text-xs text-[var(--color-text-muted)]">{formatSize(entry.size)}</span> : null}

        {/* Video: Play button */}
        {isPlayable && (
          <Link href={`/viewer/video?file=${encodeURIComponent(entry.path)}`}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium hover:bg-[var(--color-accent-purple)] hover:text-white transition-colors"
            style={{ color: "var(--color-accent-purple)", background: "rgba(139,92,246,0.1)" }}
            onClick={(e) => e.stopPropagation()}>
            <Play size={12} /> Assistir
          </Link>
        )}

        {/* PDF: Open button */}
        {isPdf && (
          <Link href={`/viewer/pdf?file=${encodeURIComponent(entry.path)}`}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium hover:bg-[var(--color-accent-red)] hover:text-white transition-colors"
            style={{ color: "var(--color-accent-red)", background: "rgba(239,68,68,0.1)" }}
            onClick={(e) => e.stopPropagation()}>
            <FileText size={12} /> Abrir
          </Link>
        )}

        {/* .url: External link button */}
        {isUrl && entry.url && (
          <a href={entry.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium hover:bg-[var(--color-accent-cyan)] hover:text-white transition-colors"
            style={{ color: "var(--color-accent-cyan)", background: "rgba(6,182,212,0.1)" }}
            onClick={(e) => e.stopPropagation()}>
            <ExternalLink size={12} /> Abrir Link
          </a>
        )}

        {/* .fig: Download/Open button */}
        {isFigma && (
          <a href={`/api/serve?file=${encodeURIComponent(entry.path)}`} download={entry.name}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium hover:bg-[var(--color-accent-purple)] hover:text-white transition-colors"
            style={{ color: "var(--color-accent-purple)", background: "rgba(139,92,246,0.1)" }}
            onClick={(e) => e.stopPropagation()}>
            <Palette size={12} /> Baixar Figma
          </a>
        )}

        {/* Attachment indicator */}
        {hasAttachments && (
          <span className="flex items-center gap-1 text-[10px] text-[var(--color-accent-amber)]">
            <Paperclip size={10} /> {entry.attachments!.length} anexo{entry.attachments!.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Render PDF attachments inline below the video */}
      {hasAttachments && (
        <div style={{ paddingLeft: `${40 + depth * 24}px` }}
          className="py-2 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
            📎 Material de Apoio
          </p>
          {entry.attachments!.map((att) => (
            <Link key={att.path} href={`/viewer/pdf?file=${encodeURIComponent(att.path)}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs hover:bg-[var(--color-bg-hover)] transition-colors group"
              style={{ background: "rgba(239,68,68,0.05)" }}>
              <FileText size={12} className="text-[var(--color-accent-red)]" />
              <span className="flex-1 text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] truncate">
                {att.name}
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)]">{formatSize(att.size)}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Directory children */}
      {isDir && isExpanded && entry.children?.map((child) => (
        <FileRow key={child.path} entry={child} depth={depth + 1} expandedDirs={expandedDirs} onToggle={onToggle} />
      ))}
    </>
  );
}

function formatSize(bytes?: number) {
  if (!bytes) return "";
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`;
  return `${(bytes / 1073741824).toFixed(1)} GB`;
}

function MiniStat({ icon, value, label, color }: { icon: React.ReactNode; value: number; label: string; color: string }) {
  return (
    <div className="glass-card p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, color }}>{icon}</div>
      <div>
        <p className="text-xl font-bold" style={{ color }}>{value}</p>
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}
