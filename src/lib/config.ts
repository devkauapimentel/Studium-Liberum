// ═══════════════════════════════════════
// Studium Liberum — Config System
// ═══════════════════════════════════════

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import type { AppConfig } from "./types";

const CONFIG_PATH = join(process.cwd(), "data", "config.json");

const DEFAULT_CONFIG: AppConfig = {
  version: "0.1.0",
  tracks: [],
  features: {
    ollama: { enabled: true, defaultModel: "qwen2.5-coder:7b" },
    kiwix: { enabled: true, port: 8080 },
    zeal: { enabled: false },
    countdown: { enabled: false, label: "", date: "" },
  },
  settings: {
    theme: "dark",
    language: "pt-BR",
    autoIndex: true,
    indexIntervalMs: 2000,
  },
};

export function getConfig(): AppConfig {
  try {
    if (!existsSync(CONFIG_PATH)) {
      // Create data dir and default config
      const dataDir = join(process.cwd(), "data");
      if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
      writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));
      return DEFAULT_CONFIG;
    }
    const raw = readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw) as AppConfig;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: AppConfig): void {
  const dataDir = join(process.cwd(), "data");
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export function getLibraryPath(): string {
  return join(process.cwd(), "library");
}
