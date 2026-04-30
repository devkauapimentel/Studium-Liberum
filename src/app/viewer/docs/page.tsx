import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ doc: string; path: string }>;
}

export default async function DocsetViewerPage({ searchParams }: PageProps) {
  const { doc, path } = await searchParams;

  if (!doc || !path) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--color-text-muted)] p-8">
        Parâmetros inválidos.
      </div>
    );
  }

  // A URL real do iframe será nossa rota de serve estático
  const iframeSrc = `/api/docs/serve/${doc}/${path}`;

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-bg-primary)] h-screen overflow-hidden">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-6 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "var(--color-bg-primary)" }}>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-[var(--color-accent-amber)]" />
            <h1 className="font-semibold text-sm truncate max-w-md">{doc.replace(".docset", "")}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <a href={iframeSrc} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] transition-colors">
            <ExternalLink size={14} /> Abrir nova aba
          </a>
        </div>
      </header>

      {/* Content Area - Iframe for HTML content */}
      <main className="flex-1 overflow-hidden bg-[var(--color-bg-primary)]">
        <iframe 
          src={iframeSrc} 
          className="w-full h-full border-none"
          title={`Documentation: ${doc}`}
          sandbox="allow-same-origin allow-scripts"
        />
      </main>
    </div>
  );
}
