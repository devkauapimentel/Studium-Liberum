# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
│              localhost:3000                         │
│  ┌───────────┐ ┌──────────┐ ┌───────────────────┐  │
│  │ Dashboard │ │ Viewer   │ │ Search + AI Chat  │  │
│  └─────┬─────┘ └────┬─────┘ └────────┬──────────┘  │
└────────┼────────────┼────────────────┼──────────────┘
         │            │                │
    ┌────┴────────────┴────────────────┴──────┐
    │         Next.js Server (API Routes)     │
    │                                         │
    │  /api/tracks    → Config + File system  │
    │  /api/search    → SQLite FTS5           │
    │  /api/files     → Serve library/ files  │
    │  /api/progress  → Read/write progress   │
    │  /api/ai/chat   → Ollama proxy + RAG    │
    │  /api/index     → Trigger re-indexing   │
    └───┬──────────┬──────────┬───────────────┘
        │          │          │
   ┌────┴───┐ ┌───┴────┐ ┌───┴────────┐
   │ SQLite │ │ Ollama │ │   Kiwix    │
   │  FTS5  │ │ :11434 │ │   :8080    │
   │(search)│ │  (AI)  │ │(wiki + SO) │
   └────────┘ └────────┘ └────────────┘
        │
   ┌────┴────────────────────────────┐
   │         library/                │
   │  (file watcher → auto-index)   │
   │                                │
   │  ├── track-1/                  │
   │  ├── track-2/                  │
   │  └── kiwix/*.zim              │
   └─────────────────────────────────┘
```

## Data Flow

### File Addition
```
User drops file → chokidar detects → indexer extracts text → SQLite FTS5 stores
```

### Search Query
```
User types query → API searches FTS5 + Kiwix → ranks results → returns to UI
                                                 ↓ (if AI enabled)
                                          Top results → Ollama → AI Answer
```

### Video Progress
```
User watches video → player saves timestamp → progress.json / SQLite
User returns later → player resumes from saved timestamp
```

## Key Technologies

### SQLite FTS5
Full-text search engine built into SQLite. Indexes all text content with BM25 ranking.

### chokidar
Node.js file watcher. Monitors `library/` for new/changed/deleted files. Triggers re-indexing automatically.

### Ollama API
Local LLM server running on port 11434. Studium sends POST requests with context (RAG) and receives streamed responses.

### React Server Components
Next.js 16 App Router with Server Components for fast initial load. Client components only where interactivity is needed (player, search, chat).

## Config System

`data/config.json` drives the entire application:
- Tracks and subjects
- Feature toggles (Ollama, Kiwix, Zeal)
- Theme and language preferences
- Auto-index settings

The config is loaded on server start and cached. Changes via the Settings UI or API trigger a config reload.
