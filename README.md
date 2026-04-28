# 🏛️ Studium Liberum

> **Your offline university.** A comprehensive, air-gapped study ecosystem that works 100% without internet.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-FTS5-003b57?logo=sqlite)](https://sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## The Problem

You have classes to watch, PDFs to read, exercises to solve, documentation to search — and your internet drops without warning. When it goes down, you lose access to everything: Stack Overflow, MDN, Wikipedia, your course platform, even Google.

## The Solution

**Studium Liberum** is a local-first web application that centralizes all your study materials into a single, searchable, offline-capable interface. It combines a unified search engine, video/PDF viewer, offline documentation (via Kiwix + Zeal), and a local AI assistant (via Ollama) — all running on `localhost`.

**Pull the ethernet cable. Everything still works.**

---

## Features

- 🔍 **Unified Search** — Search across all your PDFs, notes, exercises, Stack Overflow, and Wikipedia simultaneously. Powered by SQLite FTS5.
- 🤖 **AI Assistant** — Local Ollama integration as your offline "Google". Ask questions, get code explanations, understand concepts — no internet required.
- 📺 **Video Player** — Watch downloaded classes with progress tracking. Resume where you left off.
- 📄 **PDF Viewer** — Read course materials with embedded viewer. Searchable content.
- 📂 **File Browser** — Navigate all study tracks from a single sidebar.
- 🔄 **Auto-Detection** — Drop a new file into `library/` and it's automatically indexed and available.
- 📚 **Offline Docs** — C, JavaScript, Node.js, Bash, Git, and more via Zeal docsets.
- 🌐 **Offline Stack Overflow** — Full Stack Overflow archive via Kiwix ZIM files.
- 📱 **LAN Access** — Open from any device on your local network.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 |
| Styling | Tailwind CSS 4.2 |
| Language | TypeScript |
| Database | SQLite + FTS5 (better-sqlite3) |
| Search | SQLite FTS5 + Kiwix API |
| AI | Ollama (local LLM) |
| Offline Docs | Zeal + Kiwix |
| File Watch | chokidar |

---

## Quick Start

```bash
# Clone
git clone https://github.com/devkauapimentel/studium-liberum.git
cd studium-liberum

# Install
npm install

# Start everything (app + Ollama + Kiwix)
bash scripts/start.sh

# Open
# → http://localhost:3000
```

---

## Project Structure

```
studium-liberum/
│
├── library/                 ← Your study content (local, .gitignored)
│   ├── uninter/             ← University courses (PDFs, videos)
│   ├── rocketseat/          ← Fullstack formation (36 modules)
│   ├── 42-prep/             ← 42 Rio Piscina preparation
│   ├── dev-refs/            ← Books, Anki, documentation
│   └── kiwix/               ← ZIM files (Wikipedia, Stack Overflow)
│
├── src/                     ← Next.js application
│   ├── app/                 ← Pages and routes
│   ├── components/          ← React components
│   └── lib/                 ← Core logic (search, indexer, AI)
│
├── scripts/                 ← Automation (start, stop, index)
├── docs/                    ← Documentation
├── data/                    ← SQLite database (auto-generated)
└── public/                  ← Static assets (fonts, icons)
```

---

## Adding Study Content

The `library/` folder is your personal content directory. It is **not tracked by git** — you populate it with your own materials.

### Uninter
```bash
# Download from AVA → place in the correct subject folder
library/uninter/_ativo/analise-e-modelagem/     # Active subject
library/uninter/_divida-tecnica/06-banco-dados/  # Technical debt
```

### Rocketseat
```bash
# Download from Telegram → place in the module folder
library/rocketseat/fase-1-html-css/08-formularios/  # Current module
```

### 42 Rio
```bash
# Write exercises directly
library/42-prep/c-exercises/C00/ex00/ft_putchar.c
```

Files are **auto-detected and indexed** within seconds of being placed.

---

## Offline Reference Setup

```bash
# Install offline tools (requires internet once)
bash scripts/setup-offline.sh

# This installs:
# → Zeal (C, JS, Node, Bash, Git docs)
# → Kiwix (Stack Overflow PT/EN, Wikipedia PT)
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for Git workflow, commit conventions, and versioning standards.

---

## License

MIT © [Dev Kauã Pimentel](https://github.com/devkauapimentel)
