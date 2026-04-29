"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search as SearchIcon, FileText, Video, BookOpen, ArrowLeft, RefreshCw, Server, File, Code, Database } from "lucide-react";

interface SearchResult {
  title: string;
  path: string;
  extension: string;
  trackId: string;
  snippet?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [indexing, setIndexing] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }
    const debounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  async function handleReindex() {
    setIndexing(true);
    try {
      await fetch("/api/index", { method: "POST" });
      alert("Banco de dados SQLite FTS5 reindexado com sucesso!");
    } catch (e) {
      alert("Erro ao reindexar.");
    } finally {
      setIndexing(false);
    }
  }

  function getIcon(ext: string) {
    if (ext === ".pdf") return <FileText size={16} className="text-[var(--color-accent-red)]" />;
    if ([".mp4", ".mkv", ".webm"].includes(ext)) return <Video size={16} className="text-[var(--color-accent-purple)]" />;
    if ([".md", ".txt"].includes(ext)) return <BookOpen size={16} className="text-[var(--color-accent-blue)]" />;
    if ([".js", ".ts", ".c", ".h", ".py"].includes(ext)) return <Code size={16} className="text-[var(--color-accent-green)]" />;
    return <File size={16} className="text-[var(--color-text-muted)]" />;
  }

  function getViewerLink(res: SearchResult) {
    if (res.extension === ".pdf") return `/viewer/pdf?file=${encodeURIComponent(res.path)}`;
    if ([".mp4", ".mkv", ".webm"].includes(res.extension)) return `/viewer/video?file=${encodeURIComponent(res.path)}`;
    if ([".md", ".txt"].includes(res.extension)) return `/viewer/md?file=${encodeURIComponent(res.path)}`;
    return `/api/serve?file=${encodeURIComponent(res.path)}`;
  }

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--color-bg-primary)" }}>
      <header className="shrink-0 flex items-center justify-between px-8 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "rgba(9, 9, 11, 0.8)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Database size={18} className="text-[var(--color-accent-blue)]" /> Busca Unificada (FTS5)
          </h2>
        </div>
        <button onClick={handleReindex} disabled={indexing} className="flex items-center gap-2 text-xs font-medium bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] px-3 py-1.5 rounded-lg transition-colors">
          <RefreshCw size={14} className={indexing ? "animate-spin text-[var(--color-accent-green)]" : "text-[var(--color-text-muted)]"} />
          {indexing ? "Indexando..." : "Reconstruir Índice"}
        </button>
      </header>

      <main className="flex-1 flex overflow-hidden justify-center bg-[var(--color-bg-primary)]">
        {/* Local Files Search */}
        <div className="w-full max-w-4xl h-full flex flex-col relative border-x border-[var(--color-border)] shadow-2xl">
          <div className="p-8 pb-4 shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] z-10">
            <div className="relative">
              <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar em PDFs, notas e vídeos..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-lg border border-[var(--color-border)] focus:border-[var(--color-accent-blue)] focus:outline-none transition-all shadow-inner"
                style={{ background: "rgba(24, 24, 27, 0.8)", color: "var(--color-text-primary)", backdropFilter: "blur(12px)" }}
                autoFocus
              />
              {loading && <RefreshCw size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[var(--color-accent-blue)]" />}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-[var(--color-bg-primary)]">
            {query.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <SearchIcon size={64} className="mx-auto mb-6 text-[var(--color-text-muted)] opacity-30" />
                <h3 className="text-xl font-semibold text-[var(--color-text-secondary)] mb-2">
                  Motor de Busca Ativo
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
                  A busca local SQLite está pronta. Digite palavras-chave para varrer instantaneamente o conteúdo de todos os seus materiais locais.
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3 animate-fade-in">
                {results.map((res, i) => (
                  <Link href={getViewerLink(res)} key={i} className="glass-card p-4 block group hover:border-[var(--color-accent-blue)]">
                    <div className="flex items-center gap-3 mb-2">
                      {getIcon(res.extension)}
                      <h4 className="font-semibold text-sm truncate flex-1 group-hover:text-[var(--color-accent-blue)] transition-colors">{res.title}</h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] tracking-wider">
                        {res.trackId}
                      </span>
                    </div>
                    {res.snippet && (
                      <p className="text-xs text-[var(--color-text-muted)] font-mono leading-relaxed bg-[var(--color-bg-tertiary)] p-2 rounded" dangerouslySetInnerHTML={{ __html: res.snippet }} />
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="text-center py-20">
                  <p className="text-[var(--color-text-secondary)]">Nenhum resultado encontrado para "{query}".</p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-2">Tente reindexar os arquivos no botão do cabeçalho.</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
