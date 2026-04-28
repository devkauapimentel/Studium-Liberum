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

- 🔍 **Unified Search** — Search across all your PDFs, notes, and exercises simultaneously. Powered by SQLite FTS5.
- 🤖 **Context-Aware AI** — Local Ollama integration with RAG. The AI reads your materials and answers based on YOUR content.
- 📺 **Video Player** — Watch downloaded classes with progress tracking and resume.
- 📄 **PDF Viewer** — Read course materials with embedded viewer and in-document search.
- 📂 **Custom Study Tracks** — Define your own areas of study (university, bootcamp, certifications, languages — anything).
- 🔄 **Auto-Detection** — Drop a file into any track folder → automatically indexed and searchable.
- 📚 **Offline Docs** — Technical documentation via Zeal docsets (C, Python, JavaScript, React, etc.).
- 🌐 **Offline Stack Overflow** — Full Stack Overflow archive via Kiwix.
- 📱 **LAN Access** — Open from any device on your local network.
- ❓ **Built-in Help** — `/help` page with interactive guides for every feature.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 |
| Styling | Tailwind CSS 4.2 |
| Language | TypeScript |
| Database | SQLite + FTS5 |
| Search | SQLite FTS5 + Kiwix API |
| AI | Ollama (local LLM with RAG) |
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

# First run — creates your personal config
npm run setup

# Start everything
bash scripts/start.sh

# Open → http://localhost:3000
```

### First Run Setup

On first run, the app guides you through creating your study tracks:

```
Welcome to Studium Liberum! Let's set up your library.

? Add a study track:
  Name: Computer Science Degree
  Type: university
  → Created: library/computer-science-degree/

? Add another track:
  Name: Web Development Bootcamp
  Type: bootcamp
  → Created: library/web-development-bootcamp/

? Add subjects to "Computer Science Degree":
  → Data Structures
  → Operating Systems
  → Software Engineering

Done! Start adding your materials to the library/ folder.
```

---

## How It Works

### 1. Define Your Tracks

Create any study area you want via the config or the UI:

```json
// data/config.json (auto-generated, .gitignored)
{
  "tracks": [
    {
      "id": "cs-degree",
      "name": "Computer Science Degree",
      "icon": "🎓",
      "color": "#3b82f6",
      "subjects": [
        { "name": "Data Structures", "status": "active" },
        { "name": "Operating Systems", "status": "completed" },
        { "name": "Software Engineering", "status": "upcoming" }
      ]
    },
    {
      "id": "web-bootcamp",
      "name": "Web Development Bootcamp",
      "icon": "🚀",
      "color": "#8b5cf6",
      "modules": [
        { "name": "HTML & CSS", "lessons": 50 },
        { "name": "JavaScript", "lessons": 80 }
      ]
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
│   │   ├── lecture-01.mp4        ← Video
│   │   ├── slides-chapter-3.pdf  ← PDF
│   │   └── notes.md              ← Your notes
│   └── operating-systems/
│       └── ...
└── web-bootcamp/
    ├── html-css/
    │   ├── lesson-01.mp4
    │   └── lesson-02.mp4
    └── javascript/
        └── ...
```

Files are **auto-detected and indexed** — no manual configuration needed.

### 3. Search Everything

Type any query → results from ALL your tracks, Stack Overflow, Wikipedia, and AI:

```
🔍 "binary search tree"

📄 Data Structures - Lecture 3, Page 14
   "A binary search tree is a data structure where..."

🌐 Stack Overflow (offline)
   "How to implement BST in C?" — 342 votes

🤖 AI Answer (from your materials)
   "Based on your lecture notes from Data Structures..."
```

### 4. AI That Knows Your Content

The AI assistant uses **RAG (Retrieval-Augmented Generation)** — it searches your indexed materials first, then generates answers grounded in YOUR content. Not hallucinations.

---

## Project Structure

```
studium-liberum/
│
├── library/              ← Your study content (local, .gitignored)
│   └── (your tracks)/    ← Auto-created from config
│
├── src/                  ← Next.js application
│   ├── app/              ← Pages and routes
│   ├── components/       ← React components
│   └── lib/              ← Core logic (search, indexer, AI, RAG)
│
├── scripts/              ← Automation (start, stop, index, setup)
├── docs/                 ← User documentation
├── data/                 ← Config + SQLite database (.gitignored)
└── public/               ← Static assets (fonts, icons)
```

---

## Requirements

- **Node.js** 18+ 
- **Ollama** (optional, for AI assistant)
- **Kiwix** (optional, for offline Stack Overflow / Wikipedia)
- **Zeal** (optional, for offline API documentation)
- **pdftotext** (for PDF indexing)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for Git workflow, commit conventions, and versioning standards.

---

## License

MIT © [Dev Kauã Pimentel](https://github.com/devkauapimentel)
