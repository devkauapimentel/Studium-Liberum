import Link from "next/link";
import { ArrowLeft, HelpCircle, BookOpen, Search, Bot, Video, FolderPlus, Terminal } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      <header className="flex items-center gap-4 px-8 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "var(--color-bg-secondary)" }}>
        <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <HelpCircle size={20} className="text-[var(--color-accent-cyan)]" />
        <h2 className="text-lg font-semibold">Ajuda</h2>
      </header>

      <div className="max-w-3xl mx-auto p-8 space-y-6 animate-fade-in">
        <h3 className="text-xl font-bold mb-6">Como usar o Studium Liberum</h3>

        <HelpCard icon={<Video size={20} />} color="var(--color-accent-purple)"
          title="Como assistir aulas?"
          steps={["Clique em um Track (ex: Uninter)", "Vá até a seção 'Arquivos'", "Clique 'Assistir' ao lado do vídeo", "O progresso salva automaticamente a cada 5s", "Ao voltar, continua do ponto exato"]} />

        <HelpCard icon={<FolderPlus size={20} />} color="var(--color-accent-green)"
          title="Como adicionar materiais?"
          steps={["Coloque seus arquivos em library/[track]/[matéria]/", "Ex: library/uninter/banco-dados/aula-01.mp4", "O sistema detecta automaticamente em 2 segundos", "PDFs, vídeos (mp4, webm), notas (md) são suportados"]} />

        <HelpCard icon={<Search size={20} />} color="var(--color-accent-blue)"
          title="Como buscar conteúdo?"
          steps={["Clique em 'Buscar' na sidebar ou use Ctrl+K", "Digite qualquer palavra", "A busca procura em PDFs, notas e nomes de arquivo", "Full-text search (FTS5) será ativado na Fase 2"]} />

        <HelpCard icon={<Bot size={20} />} color="var(--color-accent-amber)"
          title="Como usar a IA?"
          steps={["Instale o Ollama: curl -fsSL https://ollama.com/install.sh | sh", "Baixe um modelo: ollama pull qwen2.5-coder:7b", "Inicie: ollama serve", "Vá em 'Assistente IA' na sidebar", "A IA responde com base nos seus materiais (RAG)"]} />

        <HelpCard icon={<Terminal size={20} />} color="var(--color-accent-red)"
          title="Comandos úteis"
          steps={["bash scripts/start.sh → Inicia tudo", "bash scripts/stop.sh → Para tudo (libera RAM)", "bash scripts/push-all.sh → Push nos 2 repos", "bash scripts/setup.sh → Setup inicial"]} />

        <div className="glass-card p-6 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Dúvidas do software? A IA lê estes docs automaticamente.
            Basta perguntar: &quot;Como adiciono uma matéria?&quot;
          </p>
        </div>
      </div>
    </div>
  );
}

function HelpCard({ icon, color, title, steps }: { icon: React.ReactNode; color: string; title: string; steps: string[] }) {
  return (
    <div className="glass-card p-6" style={{ borderLeft: `3px solid ${color}` }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, color }}>{icon}</div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm text-[var(--color-text-secondary)]">
            <span className="font-mono text-xs font-bold min-w-[1.5rem]" style={{ color }}>{i + 1}.</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
