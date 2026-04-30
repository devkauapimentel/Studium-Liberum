import Database from "better-sqlite3";
import { join } from "path";

// Initialize the SQLite database
const dbPath = join(process.cwd(), "data", "studium.db");
const db = new Database(dbPath, { verbose: process.env.NODE_ENV === "development" ? console.log : undefined });

// Configure optimizations
db.pragma("journal_mode = WAL");
db.pragma("synchronous = NORMAL");

// Initialize schema if it doesn't exist
db.exec(`
  CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(
    title,
    content,
    path UNINDEXED,
    extension UNINDEXED,
    trackId UNINDEXED
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_path TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL, -- 'in_progress', 'completed'
    timestamp INTEGER NOT NULL,
    current_time REAL,
    duration REAL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export interface SearchResult {
  title: string;
  path: string;
  extension: string;
  trackId: string;
  snippet?: string;
}

export function searchFiles(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];
  
  // Clean punctuation and make lowercase
  const cleanQuery = query.replace(/[^\w\s\u00C0-\u00FF]/g, ' ').trim().toLowerCase();
  
  // Use a stop words list instead of length filter, so we don't accidentally filter out important short words like "C", "Go", "UI"
  const stopwords = new Set(['o', 'a', 'os', 'as', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas', 'um', 'uma', 'uns', 'umas', 'por', 'para', 'com', 'que', 'como', 'qual', 'é', 'são']);
  
  const words = cleanQuery.split(/\s+/).filter(w => w.length > 0 && !stopwords.has(w));
  
  if (words.length === 0) return [];

  // Use FTS5 OR match so natural language questions can match documents with just some of the keywords
  const ftsQuery = words.map(word => `"${word}"*`).join(" OR ");

  const stmt = db.prepare(`
    SELECT title, path, extension, trackId, snippet(search_index, 1, '<b>', '</b>', '...', 64) AS snippet
    FROM search_index
    WHERE search_index MATCH ?
    ORDER BY rank
    LIMIT 50
  `);

  return stmt.all(ftsQuery) as SearchResult[];
}

export function addFileToIndex(title: string, content: string, path: string, extension: string, trackId: string) {
  const stmt = db.prepare(`
    INSERT INTO search_index (title, content, path, extension, trackId)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(title, content, path, extension, trackId);
}

export function clearIndex() {
  db.exec("DELETE FROM search_index");
}

// ==========================================
// PROGRESS API (Single Source of Truth)
// ==========================================

export interface ProgressEntry {
  file_path: string;
  status: 'in_progress' | 'completed';
  timestamp: number;
  current_time?: number;
  duration?: number;
  updated_at?: string;
}

export function saveProgress(entry: ProgressEntry) {
  const stmt = db.prepare(`
    INSERT INTO progress (file_path, status, timestamp, current_time, duration, updated_at)
    VALUES (@file_path, @status, @timestamp, @current_time, @duration, CURRENT_TIMESTAMP)
    ON CONFLICT(file_path) DO UPDATE SET
      status = @status,
      timestamp = @timestamp,
      current_time = @current_time,
      duration = @duration,
      updated_at = CURRENT_TIMESTAMP
  `);
  stmt.run({
    file_path: entry.file_path,
    status: entry.status,
    timestamp: entry.timestamp,
    current_time: entry.current_time ?? null,
    duration: entry.duration ?? null,
  });
}

export function getProgress(filePath: string): ProgressEntry | null {
  const stmt = db.prepare(`SELECT * FROM progress WHERE file_path = ?`);
  return stmt.get(filePath) as ProgressEntry | null;
}

export function getAllProgress(): ProgressEntry[] {
  const stmt = db.prepare(`SELECT * FROM progress ORDER BY updated_at DESC`);
  return stmt.all() as ProgressEntry[];
}
