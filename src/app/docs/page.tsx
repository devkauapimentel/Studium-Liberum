"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search as SearchIcon, BookOpen, ArrowLeft, RefreshCw, Layers } from "lucide-react";

interface DocResult {
  docset: string;
  name: string;
  type: string;
  path: string;
  docsetFolder: string;
}

export default function DocsSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DocResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }
    const debounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/docs/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data || []);
      } catch (err) {
        console.error("Docset search failed", err);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--color-bg-primary)" }}>
      <header className="shrink-0 flex items-center justify-between px-8 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "rgba(9, 9, 11, 0.8)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Layers size={18} className="text-[var(--color-accent-amber)]" />
            Central Offline nativa (Docsets)
          </h2>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden justify-center bg-[var(--color-bg-primary)]">
        <div className="w-full max-w-4xl h-full flex flex-col relative border-x border-[var(--color-border)] shadow-2xl">
          <div className="p-8 pb-4 shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] z-10">
            <div className="relative">
              <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar funções, bibliotecas, tags (ex: printf, div)..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-lg border border-[var(--color-border)] focus:border-[var(--color-accent-amber)] focus:outline-none transition-all shadow-inner"
                style={{ background: "rgba(24, 24, 27, 0.8)", color: "var(--color-text-primary)", backdropFilter: "blur(12px)" }}
                autoFocus
              />
              {loading && <RefreshCw size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[var(--color-accent-amber)]" />}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-3 ml-2 font-mono">Buscando em C, Docker, PostgreSQL, JS, HTML, CSS...</p>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {query.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <BookOpen size={64} className="mx-auto mb-6 text-[var(--color-text-muted)] opacity-30" />
                <h3 className="text-xl font-semibold text-[var(--color-text-secondary)] mb-2">
                  Documentação Offline
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
                  Pesquise por qualquer método, classe ou função instalada. Os resultados abrirão em um visualizador nativo limpo e rápido, sem precisar do Zeal.
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2 animate-fade-in">
                {results.map((res, i) => (
                  <Link 
                    href={`/viewer/docs?doc=${encodeURIComponent(res.docsetFolder)}&path=${encodeURIComponent(res.path)}`} 
                    key={i} 
                    className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center bg-[var(--color-bg-tertiary)] group-hover:bg-[var(--color-accent-amber)]/20 group-hover:text-[var(--color-accent-amber)] text-[var(--color-text-muted)]">
                      <BookOpen size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate text-[var(--color-text-primary)]">{res.name}</h4>
                      <p className="text-[11px] text-[var(--color-text-muted)] truncate">{res.path}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] tracking-wider">
                        {res.type}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[var(--color-accent-amber)]/10 text-[var(--color-accent-amber)] tracking-wider border border-[var(--color-accent-amber)]/20">
                        {res.docset}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="text-center py-20">
                  <p className="text-[var(--color-text-secondary)]">Nenhum resultado encontrado em suas documentações para "{query}".</p>
                </div>
              )
            )}
          </div>
      </main>
    </div>
  );
}
