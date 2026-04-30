"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Send, Cpu, User, Loader2, Database, Shield, Plus } from "lucide-react";
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
            <form onSubmit={sendMessage} className="max-w-4xl mx-auto relative group">
              <div className="relative flex flex-row items-end bg-[#161618] border border-white/10 rounded-[32px] pl-4 pr-3 py-2.5 shadow-2xl transition-all duration-300 focus-within:border-white/30 focus-within:bg-[#1A1A1D]">
                
                {/* Plus Icon (Left) */}
                <button type="button" className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 transition-colors mb-0.5" title="Anexar arquivo">
                  <Plus size={22} strokeWidth={2} />
                </button>

                {/* Text Area (Center) */}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What do you want to know?"
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 bg-transparent px-3 py-1.5 text-[16px] focus:outline-none resize-none min-h-[38px] max-h-[200px] overflow-y-auto disabled:opacity-50 placeholder-[var(--color-text-muted)]/80"
                  style={{ color: "var(--color-text-primary)", lineHeight: "1.4" }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                
                {/* Tools (Right) */}
                <div className="flex items-center gap-1 shrink-0 mb-0.5">
                  {/* Select Model Dropdown */}
                  {ollamaAvailable && availableModels.length > 0 && (
                    <div className="relative">
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="appearance-none bg-[#2A2A2E] hover:bg-[#3A3A3E] rounded-[20px] px-4 py-1.5 text-[13px] font-semibold text-white focus:outline-none cursor-pointer transition-all mr-1"
                        style={{ paddingRight: "1rem" }}
                      >
                        {availableModels.map(m => <option key={m} value={m} className="bg-[var(--color-bg-secondary)]">{m}</option>)}
                      </select>
                    </div>
                  )}

                  {/* RAG Toggle (Icon only) */}
                  <button 
                    type="button"
                    onClick={() => setUseRag(!useRag)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${useRag ? 'text-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/10' : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/10'}`}
                    title="RAG: Conectar aos Arquivos Locais"
                  >
                    <Database size={18} />
                  </button>
                  
                  {/* Modo 42 Toggle (Icon only) */}
                  <button 
                    type="button"
                    onClick={() => setSocraticMode(!socraticMode)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${socraticMode ? 'text-[var(--color-accent-amber)] bg-[var(--color-accent-amber)]/10' : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/10'}`}
                    title="Modo 42 (Socrático)"
                  >
                    <Shield size={18} />
                  </button>

                  {/* Send Button (White Circle) */}
                  <button 
                    type="submit" 
                    disabled={!message.trim() || isLoading}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:bg-[#2A2A2E] disabled:text-[var(--color-text-muted)] hover:scale-[1.05] active:scale-95 ml-1 shadow-sm"
                    style={{ 
                      background: message.trim() ? "#FFFFFF" : "#2A2A2E", 
                      color: message.trim() ? "#000000" : "var(--color-text-muted)" 
                    }}
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className={message.trim() ? "translate-x-[1px]" : ""} />}
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center text-[11px] text-[var(--color-text-muted)] mt-5 font-medium tracking-wide opacity-50 hover:opacity-100 transition-opacity">
              By messaging Studium Liberum, you agree to process offline without leaving your machine.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
