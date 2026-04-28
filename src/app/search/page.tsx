"use client";

import { useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, FileText, Video, BookOpen, ArrowLeft } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      <header className="flex items-center gap-4 px-8 py-6 border-b border-[var(--color-border)]">
        <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h2 className="text-lg font-semibold">Busca Unificada</h2>
      </header>

      <div className="max-w-3xl mx-auto px-8 py-12">
        {/* Search input */}
        <div className="relative mb-8">
          <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar em todos os seus materiais..."
            className="w-full pl-12 pr-4 py-4 rounded-xl text-lg border border-[var(--color-border)] focus:border-[var(--color-accent-blue)] focus:outline-none transition-colors"
            style={{ background: "var(--color-bg-secondary)", color: "var(--color-text-primary)" }}
            autoFocus
          />
        </div>

        {/* Placeholder — será substituído pela busca FTS5 na Fase 2 */}
        {query.length === 0 ? (
          <div className="text-center py-16">
            <SearchIcon size={64} className="mx-auto mb-6 text-[var(--color-text-muted)] opacity-30" />
            <h3 className="text-xl font-semibold text-[var(--color-text-secondary)] mb-2">
              Busque em todos os seus materiais
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              PDFs, notas, vídeos e mais — tudo pesquisável num único lugar.
              A busca full-text (FTS5) será ativada na próxima fase.
            </p>
            <div className="flex justify-center gap-6 mt-8">
              <Shortcut icon={<FileText size={16} />} label="PDFs" />
              <Shortcut icon={<Video size={16} />} label="Vídeos" />
              <Shortcut icon={<BookOpen size={16} />} label="Notas" />
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 text-center">
            <p className="text-[var(--color-text-secondary)]">
              🔍 Busca FTS5 será implementada na Fase 2.
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Buscando por: <strong className="text-[var(--color-accent-blue)]">{query}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Shortcut({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--color-text-muted)]"
      style={{ background: "var(--color-bg-secondary)" }}>
      {icon} {label}
    </div>
  );
}
