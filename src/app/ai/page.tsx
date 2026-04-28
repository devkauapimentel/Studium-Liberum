"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Send, Cpu } from "lucide-react";

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [ollamaAvailable, setOllamaAvailable] = useState<boolean | null>(null);

  // Check Ollama on mount
  useEffect(() => {
    fetch("http://localhost:11434/api/tags")
      .then(() => setOllamaAvailable(true))
      .catch(() => setOllamaAvailable(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg-primary)" }}>
      <header className="flex items-center gap-4 px-8 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "var(--color-bg-secondary)" }}>
        <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <Bot size={20} className="text-[var(--color-accent-purple)]" />
        <h2 className="text-lg font-semibold flex-1">Assistente IA</h2>
        <div className="flex items-center gap-2">
          <Cpu size={14} />
          <span className="text-xs text-[var(--color-text-muted)]">
            {ollamaAvailable === null ? "Verificando Ollama..." : ollamaAvailable ? "🟢 Ollama Online" : "🔴 Ollama Offline"}
          </span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {ollamaAvailable === false ? (
          <div className="glass-card p-8 max-w-lg text-center">
            <Bot size={64} className="mx-auto mb-4 text-[var(--color-text-muted)] opacity-30" />
            <h3 className="text-xl font-semibold mb-2">Ollama não detectado</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              O assistente IA precisa do Ollama rodando localmente.
            </p>
            <div className="glass-card p-4 text-left text-sm font-mono" style={{ background: "var(--color-bg-primary)" }}>
              <p className="text-[var(--color-text-muted)]"># Instalar Ollama:</p>
              <p className="text-[var(--color-accent-green)]">curl -fsSL https://ollama.com/install.sh | sh</p>
              <p className="text-[var(--color-text-muted)] mt-2"># Baixar um modelo:</p>
              <p className="text-[var(--color-accent-green)]">ollama pull qwen2.5-coder:7b</p>
              <p className="text-[var(--color-text-muted)] mt-2"># Iniciar o serviço:</p>
              <p className="text-[var(--color-accent-green)]">ollama serve</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 w-full max-w-3xl flex flex-col items-center justify-center">
              <Bot size={48} className="mb-4 text-[var(--color-accent-purple)] opacity-50" />
              <h3 className="text-lg font-semibold text-[var(--color-text-secondary)] mb-2">
                Pergunte qualquer coisa
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] text-center max-w-md">
                O assistente usa RAG para responder com base nos seus materiais de estudo.
                Chat completo será implementado na Fase 3.
              </p>
            </div>

            {/* Input */}
            <div className="w-full max-w-3xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Faça uma pergunta sobre seus estudos..."
                  className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-accent-purple)] focus:outline-none transition-colors"
                  style={{ background: "var(--color-bg-secondary)", color: "var(--color-text-primary)" }}
                />
                <button className="px-4 py-3 rounded-xl transition-colors" style={{ background: "var(--color-accent-purple)" }}>
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
