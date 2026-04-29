// ═══════════════════════════════════════
// Studium Liberum — Syllabus Parser
// Reads sumario_rocketseat.txt to enforce chronological ordering
// ═══════════════════════════════════════

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { SyllabusEntry, FileEntry } from "./types";

/**
 * Parse a syllabus file with format:
 *   = 1_Primeiros passos
 *   #F0001 #F0002 #F0003 ...
 *
 *   = 2_Configurando o Ambiente
 *   #F0014 #F0015 ...
 *
 * Returns ordered SyllabusEntry[] with the exact chronological order.
 */
export function parseSyllabus(syllabusPath: string): SyllabusEntry[] {
  if (!existsSync(syllabusPath)) return [];

  try {
    const content = readFileSync(syllabusPath, "utf-8");
    const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
    const entries: SyllabusEntry[] = [];

    let current: SyllabusEntry | null = null;

    for (const line of lines) {
      if (line.startsWith("= ")) {
        // Parse: "= 1_Primeiros passos" → order=1, title="Primeiros passos"
        const raw = line.slice(2).trim();
        const underscoreIdx = raw.indexOf("_");
        if (underscoreIdx > 0) {
          const order = parseInt(raw.slice(0, underscoreIdx), 10);
          const title = raw.slice(underscoreIdx + 1).trim();
          current = { order, title, ids: [] };
          entries.push(current);
        }
      } else if (current && line.startsWith("#")) {
        // Parse IDs: "#F0001 #F0002 #F0003 ..."
        const ids = line.split(/\s+/).filter((id) => id.startsWith("#"));
        current.ids.push(...ids);
      }
    }

    return entries.sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}

/**
 * Reorder file entries based on a syllabus.
 * Matches folder names to syllabus titles using fuzzy prefix matching:
 *   Folder: "01-primeiros-passos" → matches title "Primeiros passos"
 *   Folder: "06-projeto-receita" → matches title "Projeto - Página de Receita"
 *
 * Unmatched entries go at the end.
 */
export function orderBySyllabus(entries: FileEntry[], syllabus: SyllabusEntry[]): FileEntry[] {
  if (syllabus.length === 0) return entries;

  // Normalize for fuzzy matching
  function normalize(s: string): string {
    return s
      .toLowerCase()
      .replace(/^[\d]+-/, "")      // Remove leading number prefix "01-"
      .replace(/[-_]/g, " ")       // Normalize separators
      .replace(/\s+/g, " ")        // Collapse spaces
      .trim();
  }

  const ordered: { entry: FileEntry; order: number }[] = [];
  const unmatched: FileEntry[] = [];

  for (const entry of entries) {
    if (entry.type !== "directory") {
      unmatched.push(entry);
      continue;
    }

    const normalizedName = normalize(entry.name);
    let bestMatch: SyllabusEntry | null = null;
    let bestScore = 0;

    for (const syl of syllabus) {
      const normalizedTitle = normalize(syl.title);

      // Exact containment match (either direction)
      if (normalizedName.includes(normalizedTitle) || normalizedTitle.includes(normalizedName)) {
        const score = Math.max(normalizedName.length, normalizedTitle.length);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = syl;
        }
      }

      // Prefix number matching: "01-primeiros-passos" → order 1
      const numMatch = entry.name.match(/^(\d+)/);
      if (numMatch) {
        const num = parseInt(numMatch[1], 10);
        if (num === syl.order) {
          bestMatch = syl;
          bestScore = Infinity; // Number match wins
          break;
        }
      }
    }

    if (bestMatch) {
      ordered.push({ entry, order: bestMatch.order });
    } else {
      unmatched.push(entry);
    }
  }

  // Sort matched entries by syllabus order
  ordered.sort((a, b) => a.order - b.order);

  return [...ordered.map((o) => o.entry), ...unmatched];
}

/**
 * Get the syllabus for a specific track, if it exists
 */
export function getTrackSyllabus(libraryPath: string, trackId: string): SyllabusEntry[] {
  // Check for syllabus file in track root (e.g., library/rocketseat/sumario_rocketseat.txt)
  const trackPath = join(libraryPath, trackId);
  const candidates = [
    join(trackPath, `sumario_${trackId}.txt`),
    join(trackPath, "sumario.txt"),
    join(trackPath, "syllabus.txt"),
  ];

  for (const path of candidates) {
    if (existsSync(path)) {
      return parseSyllabus(path);
    }
  }

  return [];
}
