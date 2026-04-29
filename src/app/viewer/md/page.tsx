import { readFileSync } from "fs";
import { resolve, basename } from "path";
import Link from "next/link";
import { ArrowLeft, FileText, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PageProps {
  searchParams: Promise<{ file: string }>;
}

export default async function MarkdownViewerPage({ searchParams }: PageProps) {
  const { file } = await searchParams;

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--color-text-muted)] p-8">
        Nenhum arquivo selecionado.
      </div>
    );
  }

  const filePath = decodeURIComponent(file);
  const fileName = basename(filePath);
  
  let content = "";
  try {
    const absolutePath = resolve(filePath);
    content = readFileSync(absolutePath, "utf-8");
  } catch (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <FileText size={48} className="mb-4 text-[var(--color-accent-red)] opacity-50" />
        <h2 className="text-xl font-semibold mb-2">Erro ao carregar o arquivo</h2>
        <p className="text-[var(--color-text-muted)] font-mono text-sm break-all">{filePath}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-bg-primary)] h-screen overflow-hidden">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-6 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "var(--color-bg-primary)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[var(--color-accent-blue)]" />
            <h1 className="font-semibold text-sm truncate max-w-md">{fileName}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <a href={`/api/serve?file=${encodeURIComponent(filePath)}`} download={fileName}
             className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] transition-colors">
            <Download size={14} /> Download
          </a>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-8 flex justify-center custom-scrollbar">
        <article className="prose prose-invert prose-blue max-w-4xl w-full bg-[var(--color-bg-card)] p-8 md:p-12 rounded-xl border border-[var(--color-border)] shadow-2xl backdrop-blur-md">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
