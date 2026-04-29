"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Command, X, Bot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Intercept Ctrl+K globally
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); // Impede o Chrome de focar na barra de endereço
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Focar no input quando abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Por enquanto redireciona para a página de busca. 
      // Futuramente, integrará a IA aqui mesmo.
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] pointer-events-none">
        <div 
          className="bg-[var(--color-bg-secondary)] w-full max-w-2xl rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className="flex items-center px-4 py-4 border-b border-[var(--color-border)]">
            <Search className="text-[var(--color-text-muted)] mr-3 shrink-0" size={20} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pergunte à IA ou pesquise materiais..."
              className="flex-1 bg-transparent border-none outline-none text-[var(--color-text-primary)] text-lg placeholder:text-[var(--color-text-muted)]"
            />
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <kbd className="hidden sm:inline-flex bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] text-[10px] font-mono px-2 py-1 rounded border border-[var(--color-border)]">ESC</kbd>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-[var(--color-bg-tertiary)] rounded-md transition-colors"
              >
                <X size={18} className="text-[var(--color-text-muted)]" />
              </button>
            </div>
          </form>

          <div className="p-4 flex flex-col gap-4">
            <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-2">Ações Rápidas</div>
            <Link 
              href="/ai" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors group"
            >
              <div className="w-8 h-8 rounded bg-[var(--color-accent-purple)]/20 flex items-center justify-center text-[var(--color-accent-purple)] group-hover:bg-[var(--color-accent-purple)] group-hover:text-white transition-colors">
                <Bot size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">Chat com IA</span>
                <span className="text-xs text-[var(--color-text-muted)]">Abra o terminal de IA completo</span>
              </div>
            </Link>
          </div>
          
          <div className="bg-[var(--color-bg-tertiary)] px-4 py-3 flex items-center justify-between text-[10px] text-[var(--color-text-muted)] border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <span>Navegação Rápida</span>
            </div>
            <div className="flex items-center gap-1 font-mono">
              <Command size={10} /> K
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
