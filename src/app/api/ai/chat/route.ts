import { NextRequest } from "next/server";
import { getConfig } from "@/lib/config";

// POST /api/ai/chat — send a message to Ollama and stream the response
export async function POST(request: NextRequest) {
  const config = getConfig();
  const { message, model } = await request.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ollamaModel = model || config.features.ollama.defaultModel || "qwen2.5-coder:7b";

  try {
    // Stream response from Ollama
    const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: ollamaModel,
        messages: [
          {
            role: "system",
            content: "Você é o assistente do Studium Liberum, uma universidade offline. Responda de forma clara e concisa em português. Se a pergunta for sobre programação, dê exemplos de código.",
          },
          { role: "user", content: message },
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

    // Forward the stream to the client
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
      JSON.stringify({ error: "Ollama não está rodando. Execute: ollama serve" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
