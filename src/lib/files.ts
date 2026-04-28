// ═══════════════════════════════════════
// Studium Liberum — File System Utilities
// ═══════════════════════════════════════

import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";
import type { FileEntry } from "./types";

const VIDEO_EXTENSIONS = [".mp4", ".mkv", ".webm", ".avi"];
const PDF_EXTENSIONS = [".pdf"];
const DOC_EXTENSIONS = [".md", ".txt", ".epub"];
const CODE_EXTENSIONS = [".c", ".h", ".js", ".ts", ".py", ".sh", ".jsx", ".tsx"];

export function getFileType(ext: string): "video" | "pdf" | "document" | "code" | "other" {
  const e = ext.toLowerCase();
  if (VIDEO_EXTENSIONS.includes(e)) return "video";
  if (PDF_EXTENSIONS.includes(e)) return "pdf";
  if (DOC_EXTENSIONS.includes(e)) return "document";
  if (CODE_EXTENSIONS.includes(e)) return "code";
  return "other";
}

export function readDirectory(dirPath: string, depth = 0, maxDepth = 4): FileEntry[] {
  if (depth > maxDepth) return [];

  try {
    const entries = readdirSync(dirPath);
    return entries
      .filter((name) => !name.startsWith("."))
      .map((name) => {
        const fullPath = join(dirPath, name);
        try {
          const stat = statSync(fullPath);
          if (stat.isDirectory()) {
            return {
              name,
              path: fullPath,
              type: "directory" as const,
              children: readDirectory(fullPath, depth + 1, maxDepth),
            };
          }
          return {
            name,
            path: fullPath,
            type: "file" as const,
            extension: extname(name).toLowerCase(),
            size: stat.size,
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean) as FileEntry[];
  } catch {
    return [];
  }
}

export function countFiles(entries: FileEntry[]): { videos: number; pdfs: number; docs: number; total: number } {
  let videos = 0, pdfs = 0, docs = 0, total = 0;

  function walk(items: FileEntry[]) {
    for (const item of items) {
      if (item.type === "directory" && item.children) {
        walk(item.children);
      } else if (item.type === "file" && item.extension) {
        total++;
        const type = getFileType(item.extension);
        if (type === "video") videos++;
        else if (type === "pdf") pdfs++;
        else if (type === "document") docs++;
      }
    }
  }

  walk(entries);
  return { videos, pdfs, docs, total };
}

export function getRelativePath(fullPath: string, basePath: string): string {
  return fullPath.replace(basePath, "").replace(/^\//, "");
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
