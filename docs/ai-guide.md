# AI Guide

## Overview

The AI assistant uses **RAG (Retrieval-Augmented Generation)** to answer questions using YOUR study materials as context.

## Two Modes

### 📚 Study Mode
For questions about your subjects. The system searches your indexed PDFs and notes, finds relevant passages, and feeds them to the AI.

**Example:**
```
You: "What is a foreign key in databases?"

System searches → finds "Banco de Dados - Aula 3.pdf, page 7"
AI answers: "Based on your lecture notes, a foreign key is..."
```

### 💻 Code Mode
For programming questions. Uses the `qwen2.5-coder` model with Stack Overflow and documentation as context.

**Example:**
```
You: "How to use malloc in C?"

System searches → finds Stack Overflow article + your C exercise notes
AI answers: "malloc() allocates memory on the heap. Here's how..."
```

## How RAG Works

```
1. You type a question
2. System searches SQLite FTS5 for relevant content
3. Top 5 matching passages are extracted
4. These passages + your question are sent to Ollama
5. Ollama generates an answer grounded in your materials
6. If no local content matches → AI uses general knowledge
   (and tells you: "I didn't find this in your materials")
```

## Selecting a Model

If you have multiple Ollama models, you can switch between them in the AI panel:

| Model | Best for |
|-------|---------|
| `qwen2.5-coder:7b` | Code questions, fast responses |
| `qwen2.5-coder:14b` | Complex code, architecture questions |
| `qwen2.5:14b` | General study questions, explanations |

## Without Ollama

If Ollama is not installed, the AI panel is hidden. Search still works — you just won't get AI-generated answers.

To install Ollama:
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen2.5-coder:7b
```
