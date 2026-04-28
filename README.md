# 🏛️ Studium Liberum

> **Your offline university.** A comprehensive, air-gapped study ecosystem that works 100% without internet.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-FTS5-003b57?logo=sqlite)](https://sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## The Problem

You have classes to watch, PDFs to read, exercises to solve, documentation to search — and your internet is unreliable. When it goes down, you lose access to everything: Stack Overflow, MDN, Wikipedia, your course platform, even Google.

## The Solution

**Studium Liberum** is a local-first web application that turns your computer into a personal offline university. Define your own study tracks, populate them with your materials, and access everything through a single, beautiful, searchable interface — with a local AI assistant that understands your content.

**Pull the ethernet cable. Everything still works.**

---

## Features

| Feature | Description |
|---------|------------|
| 🔍 **Unified Search** | Search across all your PDFs, notes, and exercises simultaneously. Powered by SQLite FTS5 with BM25 ranking. |
| 🤖 **Context-Aware AI** | Local Ollama integration with RAG. The AI reads your materials and answers based on YOUR content — no internet required. |
| 📺 **Video Player** | Watch downloaded classes with progress tracking, speed controls (1x–2x), and resume from where you left off. |
| 📄 **PDF Viewer** | Read course materials with embedded viewer, in-document search, and page navigation. |
| 📂 **Custom Study Tracks** | Define your own areas of study — university courses, bootcamps, certifications, languages, anything. |
| 🔄 **Auto-Detection** | Drop a file into any track folder → automatically indexed and searchable within seconds. |
| 📚 **Offline Documentation** | C, JavaScript, Python, Node.js, Bash, Git, React, and more via Zeal docsets. |
| 🌐 **Offline Stack Overflow** | Full Stack Overflow archive (PT and EN) via Kiwix ZIM files. |
| 📱 **LAN Access** | Access from any device on your local network — laptop, tablet, phone. |
| ❓ **Built-in Help** | Interactive `/help` page + AI that understands the software itself (self-documenting RAG). |
| ⚙️ **Everything Optional** | Ollama, Kiwix, Zeal are all optional. The core app works without any external dependencies. |

---

## How It Works

### 1. Define Your Tracks

Create any study area you want — via the UI, API, or config file:

```json
{
  "tracks": [
    {
      "id": "cs-degree",
      "name": "Computer Science Degree",
      "icon": "🎓",
      "color": "#3b82f6",
      "subjects": [
        { "name": "Data Structures", "status": "active" },
        { "name": "Databases", "status": "completed" }
      ]
    },
    {
      "id": "web-bootcamp",
      "name": "Web Development Bootcamp",
      "icon": "🚀",
      "color": "#8b5cf6"
    }
  ]
}
```

### 2. Add Your Materials

Drop files into the corresponding track folder:

```
library/
├── cs-degree/
│   ├── data-structures/
│   │   ├── lecture-01.mp4         ← Video
│   │   ├── slides-chapter-3.pdf   ← PDF
│   │   └── notes.md               ← Your notes
│   └── databases/
└── web-bootcamp/
    ├── html-css/
    └── javascript/
```

Files are **auto-detected and indexed** — no manual configuration needed.

### 3. Search Everything

Type any query → results from ALL your tracks, Stack Overflow, Wikipedia, and AI simultaneously:

```
🔍 "binary search tree"

📄 Data Structures — Lecture 3, Page 14
   "A binary search tree is a data structure where..."

🌐 Stack Overflow (offline)
   "How to implement BST in C?" — 342 votes

🤖 AI Answer (grounded in your materials)
   "Based on your lecture notes from Data Structures..."
```

### 4. AI That Knows Your Content

The AI assistant uses **RAG (Retrieval-Augmented Generation)**:

1. You ask a question
2. The system searches your indexed materials for relevant context
3. Relevant snippets are fed to the local LLM (Ollama)
4. The AI generates an answer **grounded in YOUR content**

It also understands the software itself — ask "How do I add a new track?" and it'll guide you using the built-in documentation.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router) |
| Styling | Tailwind CSS 4.2 |
| Language | TypeScript |
| Database | SQLite + FTS5 (better-sqlite3) |
| Search | SQLite FTS5 + Kiwix API |
| AI | Ollama (local LLM with RAG) |
| Offline Docs | Zeal + Kiwix |
| File Watching | chokidar |
| Icons | Lucide React |
| Fonts | Inter + JetBrains Mono (local) |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/devkauapimentel/studium-liberum.git
cd studium-liberum

# Install dependencies
npm install

# Start everything (app + optional services)
bash scripts/start.sh

# Open in browser
# → http://localhost:3000
```

### Optional: Offline References

```bash
# Install Ollama (AI assistant)
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen2.5-coder:7b

# Install offline documentation
bash scripts/setup-offline.sh
# This sets up Zeal (API docs) + Kiwix (Stack Overflow + Wikipedia)
```

---

## Project Structure

```
studium-liberum/
│
├── library/              ← Your study content (local, .gitignored)
│   └── (your tracks)/    ← Auto-created from config
│
├── src/                  ← Next.js application
│   ├── app/              ← Pages and API routes
│   ├── components/       ← React components
│   └── lib/              ← Core logic (search, indexer, RAG, AI)
│
├── scripts/              ← Automation (start, stop, setup)
├── docs/                 ← User documentation
├── data/                 ← Config + SQLite database (.gitignored)
└── public/               ← Static assets (fonts, icons)
```

---

## Graceful Degradation

Every external service is **optional**. The core app always works:

| Service | If Missing | If Present |
|---------|-----------|------------|
| Ollama | AI chat hidden, search still works | Full AI assistant with RAG |
| Kiwix | No Stack Overflow/Wikipedia results | Offline SO + Wikipedia in search |
| Zeal | No API docs links | Quick links to C/JS/Python/etc. docs |
| pdftotext | PDFs viewable but not searchable | Full-text PDF search |

---

## Requirements

| Requirement | Version | Required? |
|------------|---------|-----------|
| Node.js | 18+ | ✅ Yes |
| Ollama | Latest | ⬜ Optional |
| Kiwix | Latest | ⬜ Optional |
| Zeal | Latest | ⬜ Optional |
| pdftotext | Any | ⬜ Optional |

---

## Documentation

| Guide | Description |
|-------|------------|
| [Setup Guide](docs/setup.md) | Installation and first-run configuration |
| [Library Guide](docs/library-guide.md) | How to organize materials and manage tracks |
| [Search Guide](docs/search-guide.md) | How to use the unified search engine |
| [AI Guide](docs/ai-guide.md) | How to use the AI assistant and RAG |
| [Offline Setup](docs/offline-setup.md) | Installing Kiwix, Zeal, and ZIM files |
| [Troubleshooting](docs/troubleshooting.md) | Common issues and solutions |
| [Architecture](docs/architecture.md) | How the system works internally |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Git workflow (branches, PRs)
- Commit conventions (Conventional Commits)
- Versioning (Semantic Versioning)

---

## License

MIT © [Dev Kauã Pimentel](https://github.com/devkauapimentel)
