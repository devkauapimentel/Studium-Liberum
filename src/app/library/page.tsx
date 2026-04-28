import { getConfig, getLibraryPath } from "@/lib/config";
import { readDirectory, countFiles } from "@/lib/files";
import { join } from "path";
import Link from "next/link";
import { ArrowLeft, FolderOpen, Video, FileText, Code, File, HardDrive } from "lucide-react";

export default function LibraryPage() {
  const config = getConfig();
  const libraryPath = getLibraryPath();

  const trackData = config.tracks.map((track) => {
    const trackPath = join(libraryPath, track.id);
    const files = readDirectory(trackPath);
    const counts = countFiles(files);
    return { track, counts };
  });

  const totalFiles = trackData.reduce((sum, t) => sum + t.counts.total, 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      <header className="flex items-center gap-4 px-8 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "var(--color-bg-secondary)" }}>
        <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <HardDrive size={20} className="text-[var(--color-accent-amber)]" />
        <h2 className="text-lg font-semibold flex-1">Biblioteca</h2>
        <span className="text-sm text-[var(--color-text-muted)]">{totalFiles} arquivos</span>
      </header>

      <div className="p-8 space-y-6 animate-fade-in">
        <p className="text-sm text-[var(--color-text-muted)]">
          Todos os materiais em <code className="font-mono text-xs bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 rounded">library/</code> — organizados por track.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {trackData.map(({ track, counts }) => (
            <Link key={track.id} href={`/track/${track.id}`} className="glass-card p-5 group" style={{ borderLeft: `3px solid ${track.color}` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{track.icon}</span>
                <h3 className="font-semibold text-sm group-hover:text-white transition-colors">{track.name}</h3>
              </div>
              <div className="flex gap-4 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1"><Video size={12} /> {counts.videos} vídeos</span>
                <span className="flex items-center gap-1"><FileText size={12} /> {counts.pdfs} PDFs</span>
                <span className="flex items-center gap-1"><Code size={12} /> {counts.docs} docs</span>
                <span className="flex items-center gap-1"><File size={12} /> {counts.total} total</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-3">Como adicionar materiais</h3>
          <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <p>1. Coloque seus arquivos em <code className="font-mono text-xs bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 rounded">library/[track]/[matéria]/</code></p>
            <p>2. O sistema detecta automaticamente em 2 segundos</p>
            <p>3. Vídeos (mp4, webm), PDFs e notas (md, txt) são suportados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
