"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Send, Cpu, User, Loader2, Database, Shield } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

type Message = { role: "user" | "assistant"; content: string };

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ollamaAvailable, setOllamaAvailable] = useState<boolean | null>(null);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("qwen2.5-coder:7b");
  const [useRag, setUseRag] = useState(true);
  const [socraticMode, setSocraticMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check Ollama on mount and load models
  useEffect(() => {
    fetch("http://localhost:11434/api/tags")
      .then((res) => res.json())
      .then((data) => {
        setOllamaAvailable(true);
        if (data.models && data.models.length > 0) {
          const models = data.models.map((m: any) => m.name);
          setAvailableModels(models);
          if (!models.includes("qwen2.5-coder:7b")) {
            setSelectedModel(models[0]);
          }
        }
      })
      .catch(() => setOllamaAvailable(false));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          model: selectedModel,
          useRag,
          socraticMode,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to connect to AI");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let aiText = "";
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.trim()) {
              try {
                const parsed = JSON.parse(line);
                if (parsed.message?.content) {
                  aiText += parsed.message.content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = aiText;
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error("Error parsing NDJSON line:", line);
              }
            }
          }
        }
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `❌ Erro: ${err.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: "var(--color-bg-primary)" }}>
      <header className="flex items-center justify-between px-8 border-b border-[var(--color-border)] shrink-0"
        style={{ height: "var(--header-height)", background: "var(--color-bg-secondary)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <Bot size={20} className="text-[var(--color-accent-purple)]" />
          <h2 className="text-lg font-bold tracking-tight">Ollama RAG</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Cpu size={14} className={ollamaAvailable ? "text-[var(--color-accent-green)]" : "text-red-500"} />
            <span className="text-xs font-mono font-medium text-[var(--color-text-muted)]">
              {ollamaAvailable === null ? "Verificando..." : ollamaAvailable ? "LOCAL ENGINE" : "OFFLINE"}
            </span>
          </div>
        </div>
      </header>

      {ollamaAvailable === false ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="glass-card p-8 max-w-lg text-center bg-[var(--color-bg-secondary)]">
            <Cpu size={64} className="mx-auto mb-4 text-red-500 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Motor de IA Desconectado</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              O Studium Liberum requer que o Ollama esteja rodando em background (localhost:11434).
            </p>
            <div className="glass-card p-4 text-left text-sm font-mono border border-[var(--color-border)] bg-black/50">
              <p className="text-[var(--color-text-muted)]"># 1. Instalar Ollama:</p>
              <p className="text-[var(--color-accent-green)]">curl -fsSL https://ollama.com/install.sh | sh</p>
              <p className="text-[var(--color-text-muted)] mt-2"># 2. Baixar o modelo de IA:</p>
              <p className="text-[var(--color-accent-green)]">ollama pull qwen2.5-coder:7b</p>
              <p className="text-[var(--color-text-muted)] mt-2"># 3. Iniciar o serviço:</p>
              <p className="text-[var(--color-accent-green)]">ollama serve</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center mt-20 opacity-60">
                  <Bot size={64} className="text-[var(--color-accent-purple)] mb-6" />
                  <h2 className="text-2xl font-bold mb-2">Cérebro Autônomo</h2>
                  <p className="max-w-md text-[var(--color-text-muted)]">
                    Estou conectado ao seu banco de dados local. Posso ler seus PDFs, códigos e anotações para te ajudar a estudar.
                  </p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`flex gap-4 ${msg.role === "assistant" ? "" : "flex-row-reverse"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)]" : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"}`}>
                      {msg.role === "assistant" ? <Bot size={18} /> : <User size={18} />}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "assistant" ? "bg-transparent border border-[var(--color-border)]" : "bg-[var(--color-bg-tertiary)]"}`}>
                      {msg.role === "assistant" ? (
                        <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-black/50 prose-pre:border prose-pre:border-[var(--color-border)] prose-p:leading-relaxed prose-li:my-1">
                          {msg.content === "" ? <span className="animate-pulse">● ● ●</span> : <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{msg.content}</ReactMarkdown>}
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-6 bg-transparent pb-8">
            <form onSubmit={sendMessage} className="max-w-3xl mx-auto relative group">
              {/* Subtle background glow effect when focused */}
              <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-transparent via-transparent to-transparent group-focus-within:from-[var(--color-accent-purple)]/50 group-focus-within:via-[var(--color-accent-blue)]/50 group-focus-within:to-[var(--color-accent-cyan)]/50 transition-all duration-700 opacity-0 blur-md group-focus-within:opacity-100 -z-10"></div>
              
              <div className="relative flex flex-col bg-[#111113]/90 backdrop-blur-2xl border border-[var(--color-border)]/50 rounded-[28px] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 group-focus-within:border-[var(--color-border)] group-focus-within:bg-[#151518]/95">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mensagem para Studium Liberum..."
                  disabled={isLoading}
                  rows={1}
                  className="w-full px-5 pt-4 pb-2 bg-transparent text-[16px] focus:outline-none resize-none min-h-[56px] max-h-[250px] overflow-y-auto disabled:opacity-50 placeholder-[var(--color-text-muted)]/70"
                  style={{ color: "var(--color-text-primary)", lineHeight: "1.5" }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                
                <div className="flex items-center justify-between px-3 pb-2 mt-1">
                  <div className="flex items-center gap-1.5">
                    {/* Select Model Dropdown */}
                    {ollamaAvailable && availableModels.length > 0 && (
                      <div className="relative flex items-center">
                        <select
                          value={selectedModel}
                          onChange={(e) => setSelectedModel(e.target.value)}
                          className="appearance-none bg-transparent hover:bg-[var(--color-bg-tertiary)]/70 border border-transparent rounded-2xl px-4 py-2 text-[13px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus:outline-none cursor-pointer transition-all"
                        >
                          {availableModels.map(m => <option key={m} value={m} className="bg-[var(--color-bg-secondary)]">{m}</option>)}
                        </select>
                      </div>
                    )}

                    {/* RAG Toggle */}
                    <button 
                      type="button"
                      onClick={() => setUseRag(!useRag)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[13px] font-semibold transition-all duration-300 ${useRag ? 'bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)]' : 'bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/70'}`}
                      title="RAG: Conectar aos seus arquivos e Manuais"
                    >
                      <Database size={15} />
                      {useRag ? 'RAG' : 'RAG'}
                    </button>
                    
                    {/* Modo 42 */}
                    <button 
                      type="button"
                      onClick={() => setSocraticMode(!socraticMode)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[13px] font-semibold transition-all duration-300 ${socraticMode ? 'bg-[var(--color-accent-amber)]/10 text-[var(--color-accent-amber)]' : 'bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/70'}`}
                      title="Modo 42: Apenas método Socrático (sem dar o código pronto)"
                    >
                      <Shield size={15} />
                      Modo 42
                    </button>
                  </div>

                  <button 
                    type="submit" 
                    disabled={!message.trim() || isLoading}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100 hover:scale-[1.08] active:scale-95"
                    style={{ 
                      background: message.trim() ? "var(--color-text-primary)" : "var(--color-bg-tertiary)", 
                      color: message.trim() ? "var(--color-bg-primary)" : "var(--color-text-muted)",
                      boxShadow: message.trim() ? "0 4px 14px rgba(255,255,255,0.15)" : "none"
                    }}
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className={message.trim() ? "translate-x-[-1px] translate-y-[1px]" : "translate-x-[-1px]"} />}
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center text-[11px] text-[var(--color-text-muted)] mt-5 font-medium tracking-wide opacity-60">
              Processamento offline seguro. Nenhum dado deixa sua máquina.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
