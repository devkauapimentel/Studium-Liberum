// ═══════════════════════════════════════
// Studium Liberum — Type Definitions
// ═══════════════════════════════════════

export interface Subject {
  id: string;
  name: string;
  status: "active" | "completed" | "upcoming" | "debt";
}

export interface Track {
  id: string;
  name: string;
  icon: string;
  color: string;
  subjects?: Subject[];
  phases?: { name: string; modules: number }[];
}

export interface CountdownConfig {
  enabled: boolean;
  label: string;
  date: string; // ISO date
}

export interface FeaturesConfig {
  ollama: {
    enabled: boolean;
    defaultModel: string;
    models?: string[];
  };
  kiwix: {
    enabled: boolean;
    port: number;
  };
  zeal: {
    enabled: boolean;
  };
  countdown: CountdownConfig;
}

export interface AppConfig {
  version: string;
  tracks: Track[];
  features: FeaturesConfig;
  settings: {
    theme: "dark" | "light";
    language: string;
    autoIndex: boolean;
    indexIntervalMs: number;
  };
}

export interface FileEntry {
  name: string;
  path: string;
  type: "file" | "directory";
  extension?: string;
  size?: number;
  children?: FileEntry[];
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  path: string;
  type: "pdf" | "markdown" | "video" | "code" | "kiwix" | "ai";
  trackId?: string;
  relevance: number;
}

export interface VideoProgress {
  path: string;
  currentTime: number;
  duration: number;
  completed: boolean;
  lastWatched: string; // ISO date
}
