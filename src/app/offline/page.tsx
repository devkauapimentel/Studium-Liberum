import Link from "next/link";
import { Server, Zap, BookOpen, ExternalLink, Shield } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { getConfig } from "@/lib/config";

export default function OfflineToolsPage() {
  const config = getConfig();

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-primary)]">
      <Sidebar tracks={config.tracks} />

      <main className="flex-1 overflow-y-auto" style={{ marginLeft: "var(--sidebar-width)", minHeight: "100vh" }}>
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-8 border-b border-[var(--color-border)]"
          style={{ height: "var(--header-height)", background: "rgba(9, 9, 11, 0.8)", backdropFilter: "blur(12px)" }}>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Shield size={18} className="text-[var(--color-accent-green)]" />
            Central Offline (The MIT Stack)
          </h2>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
          <section className="glass-card p-8 border-l-4 border-[var(--color-accent-green)]">
            <h1 className="text-2xl font-bold mb-2">Ambiente Resiliente</h1>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Esta é a sua central de ferramentas externas que operam 100% sem internet. 
              Elas garantem que você nunca pare de estudar ou programar por falta de conexão.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Kiwix Card */}
            <section className="glass-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-accent-amber)]/20 text-[var(--color-accent-amber)]">
                  <Server size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Kiwix Engine</h3>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">ArchWiki & Wikibooks CS</p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mb-6 flex-1">
                Servidor local de ZIM files. Focado em conhecimento profundo teórico e manuais de sistemas operacionais, sem dar respostas prontas de código.
              </p>
              <a 
                href="http://localhost:8080" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] text-sm font-semibold transition-colors group"
              >
                Abrir Portal Kiwix 
                <ExternalLink size={16} className="text-[var(--color-text-muted)] group-hover:text-white" />
              </a>
            </section>

            {/* Docsets Internos Card (Antigo Zeal) */}
            <section className="glass-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-accent-amber)]/20 text-[var(--color-accent-amber)]">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Documentação Nativa</h3>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Antigo Zeal</p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mb-6 flex-1">
                <strong>O Zeal foi absorvido!</strong> Nós roubamos os manuais do Zeal e os trouxemos para dentro do Studium Liberum. Agora o C, React, Docker, SQL e tudo mais têm buscas nativas super rápidas e modo cinema sem abrir janelas feias.
              </p>
              <Link 
                href="/docs" 
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[var(--color-accent-amber)] hover:bg-[var(--color-accent-amber)]/90 text-[var(--color-bg-primary)] font-bold transition-colors shadow-lg"
              >
                Abrir Busca de Documentação
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
