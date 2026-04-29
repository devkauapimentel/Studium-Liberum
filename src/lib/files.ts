// ═══════════════════════════════════════
// Studium Liberum — File System Utilities v2.0
// Now with semantic file classification and .url parsing
// ═══════════════════════════════════════

import { readdirSync, statSync, readFileSync } from "fs";
import { join, extname, basename } from "path";
import type { FileEntry, FileCategory } from "./types";

const VIDEO_EXTENSIONS = [".mp4", ".mkv", ".webm", ".avi"];
const PDF_EXTENSIONS = [".pdf"];
const DOC_EXTENSIONS = [".md", ".txt", ".epub"];
const CODE_EXTENSIONS = [".c", ".h", ".js", ".ts", ".py", ".sh", ".jsx", ".tsx", ".css", ".html", ".json"];
const RESOURCE_EXTENSIONS = [".fig", ".figma", ".url"];

export function getFileType(ext: string): FileCategory {
  const e = ext.toLowerCase();
  if (VIDEO_EXTENSIONS.includes(e)) return "video";
  if (PDF_EXTENSIONS.includes(e)) return "pdf";
  if (DOC_EXTENSIONS.includes(e)) return "document";
  if (CODE_EXTENSIONS.includes(e)) return "code";
  if (RESOURCE_EXTENSIONS.includes(e)) return "resource";
  return "other";
}

/**
 * Parse a Windows .url shortcut file (INI format) and extract the URL
 * Format:
 *   [InternetShortcut]
 *   URL=https://example.com
 */
export function parseUrlShortcut(filePath: string): string | null {
  try {
    const content = readFileSync(filePath, "utf-8");
    const match = content.match(/URL=(.+)/i);
    return match ? match[1].trim().replace(/\r/g, "") : null;
  } catch {
    return null;
  }
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
          const ext = extname(name).toLowerCase();
          const fileCategory = getFileType(ext);
          const entry: FileEntry = {
            name,
            path: fullPath,
            type: "file" as const,
            extension: ext,
            size: stat.size,
            fileCategory,
          };

          // Auto-parse .url files to extract the link
          if (ext === ".url") {
            const url = parseUrlShortcut(fullPath);
            if (url) entry.url = url;
          }

          return entry;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as FileEntry[];
  } catch {
    return [];
  }
}

export function countFiles(entries: FileEntry[]): { videos: number; pdfs: number; docs: number; resources: number; total: number } {
  let videos = 0, pdfs = 0, docs = 0, resources = 0, total = 0;

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
        else if (type === "resource") resources++;
      }
    }
  }

  walk(entries);
  return { videos, pdfs, docs, resources, total };
}

/**
 * Group files semantically within a directory.
 * - PDFs in the same folder as videos become "attachments" of those videos
 * - .url and .fig files are tagged as "resources" for the project
 */
export function groupSemanticFiles(entries: FileEntry[]): FileEntry[] {
  const videos: FileEntry[] = [];
  const pdfs: FileEntry[] = [];
  const resources: FileEntry[] = [];
  const dirs: FileEntry[] = [];
  const others: FileEntry[] = [];

  for (const entry of entries) {
    if (entry.type === "directory") {
      // Recursively apply semantic grouping to children
      dirs.push({
        ...entry,
        children: entry.children ? groupSemanticFiles(entry.children) : [],
      });
    } else {
      const cat = entry.fileCategory || getFileType(entry.extension || "");
      switch (cat) {
        case "video": videos.push(entry); break;
        case "pdf": pdfs.push(entry); break;
        case "resource": resources.push(entry); break;
        default: others.push(entry); break;
      }
    }
  }

  // Attach PDFs to videos if they share the same folder
  if (videos.length > 0 && pdfs.length > 0) {
    // If there's exactly 1 video, attach all PDFs to it
    if (videos.length === 1) {
      videos[0] = { ...videos[0], attachments: pdfs };
    } else {
      // Multiple videos: try name-matching, otherwise attach to first
      for (const video of videos) {
        const videoBase = basename(video.name, extname(video.name)).toLowerCase();
        const matched = pdfs.filter((pdf) => {
          const pdfBase = basename(pdf.name, ".pdf").toLowerCase();
          return pdfBase.includes(videoBase) || videoBase.includes(pdfBase);
        });
        if (matched.length > 0) {
          video.attachments = matched;
        }
      }
      // Unmatched PDFs remain standalone
    }
  }

  // Return in order: directories → videos (with attachments) → resources → others
  // PDFs that were attached to videos are excluded from the flat list
  const attachedPaths = new Set(
    videos.flatMap((v) => (v.attachments || []).map((a) => a.path))
  );
  const unattachedPdfs = pdfs.filter((p) => !attachedPaths.has(p.path));

  return [...dirs, ...videos, ...unattachedPdfs, ...resources, ...others];
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
