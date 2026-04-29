import { NextRequest } from "next/server";
import { getConfig } from "@/lib/config";
import { searchFiles } from "@/lib/db";

// POST /api/ai/chat — send a message to Ollama and stream the response
export async function POST(request: NextRequest) {
  const config = getConfig();
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { messages, model, useRag = true } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Messages array is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ollamaModel = model || config.features.ollama.defaultModel || "qwen2.5-coder:7b";
  const lastMessage = messages[messages.length - 1].content;

  let systemPrompt = `Você é o assistente de IA do Studium Liberum (Universidade Offline do Kauã). Você é direto, brutalista e focado em alta performance.
INFORMAÇÃO DO SISTEMA: Todas as aulas, PDFs, códigos e materiais do usuário ficam estritamente salvos localmente na pasta: /home/dev_kaua/Documents/01 - Projects/00.University/library/.
Exemplos de pastas: /library/rocketseat/, /library/42-prep/.
REGRA DE FORMATAÇÃO (ESTÉTICA GROK/CHATGPT): Você deve OBRIGATORIAMENTE formatar suas respostas de forma vibrante e super legível. 
1. Use EMOJIS organizacionais para iniciar parágrafos principais (ex: 🧠 **Visão Geral**, ⚙️ **Como Funciona**, 💻 **Exemplo**). 
2. Sempre use Tópicos/Bullet points (-) para listar características.
3. Coloque termos importantes em **negrito**.
4. Pule linhas DUPLAS (use \\n\\n obrigatoriamente) entre CADA parágrafo ou tópico para o texto respirar. NUNCA responda com um bloco maciço de texto contínuo.
REGRA ABSOLUTA: Você **CONSEGUE LER PDFs E MARKDOWNS**. O nosso sistema extrai o texto dos PDFs em background e injeta para você ler de forma invisível. Nunca diga "Não posso ler PDFs". Se você receber contexto extraído abaixo, use-o para responder detalhadamente. Caso não haja contexto, responda com o seu conhecimento técnico base.
Responda sempre considerando que o usuário não usa plataformas online, tudo está no disco rígido dele.`;

  if (useRag) {
    try {
      const results = searchFiles(lastMessage);
      if (results && results.length > 0) {
        const topResults = results.slice(0, 5); // Take top 5 snippets
        let contextText = "CONTEXTO EXTRAÍDO DA BASE DE ESTUDOS LOCAL DO USUÁRIO:\n\n";
        topResults.forEach((res, index) => {
          const cleanSnippet = res.snippet ? res.snippet.replace(/<[^>]+>/g, "") : "";
          contextText += `[Documento ${index + 1}: ${res.title} | Trilha: ${res.trackId}]\n${cleanSnippet}\n\n`;
        });
        systemPrompt += `\n\n${contextText}\n\nSUA TAREFA: Responda o usuário com base nos documentos acima. MANTENHA A FORMATAÇÃO MARKDOWN IMPECÁVEL (use listas e negrito). Cite os documentos se os usar. Se o contexto não ajudar, use seu próprio conhecimento.`;
      } else {
        systemPrompt += `\n\nAVISO INTERNO (RAG FALHOU): A busca no banco de dados local (FTS5) não encontrou NENHUM trecho de PDF ou Markdown que corresponda à última mensagem do usuário. 
Sua ação obrigatória: Informe ao usuário, de forma direta e brutalista, que as palavras-chave dele não retornaram nada nos arquivos locais. Peça para ele fornecer palavras-chave mais específicas do conteúdo da aula que ele quer buscar.
NUNCA invente que você não tem capacidade de ler PDFs. Apenas diga que a busca local retornou vazia.`;
      }
    } catch (e) {
      console.error("RAG Context Error:", e);
    }
  }

  try {
    // Stream response from Ollama
    const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: ollamaModel,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      return new Response(JSON.stringify({ error: `Ollama error: ${errorText}` }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const reader = ollamaResponse.body?.getReader();
    if (!reader) {
      return new Response(JSON.stringify({ error: "No response stream" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = decoder.decode(value, { stream: true });
            controller.enqueue(new TextEncoder().encode(text));
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Ollama não está rodando. Execute: ollama serve no terminal." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
