# Search Guide

## Quick Search

Press **`Ctrl+K`** anywhere to open the search bar.

## How Search Works

The search engine queries multiple sources simultaneously:

| Source | What it searches | Speed |
|--------|-----------------|-------|
| **SQLite FTS5** | Your PDFs, notes, markdown files | Instant |
| **Kiwix** | Stack Overflow + Wikipedia (if installed) | ~200ms |
| **Ollama** | AI-generated answer from your content | 2-5s |

Results are ranked by relevance using BM25 scoring.

## Search Syntax

| Query | What it does |
|-------|-------------|
| `binary search` | Finds documents containing both words |
| `"binary search tree"` | Finds exact phrase |
| `malloc OR calloc` | Finds documents with either word |
| `pointer NOT void` | Excludes documents with "void" |
| `track:uninter malloc` | Search only within Uninter track |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Open search |
| `Escape` | Close search |
| `↑` / `↓` | Navigate results |
| `Enter` | Open selected result |
| `Ctrl+Enter` | Open in new tab |
