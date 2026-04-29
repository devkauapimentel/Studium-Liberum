import { NextResponse } from "next/server";
import { readdirSync, statSync, readFileSync, existsSync } from "fs";
import { join, extname } from "path";
import { clearIndex, addFileToIndex } from "@/lib/db";
const pdfParse = require("pdf-parse");

function chunkText(text: string, maxLen = 1000): string[] {
  const chunks = [];
  let i = 0;
  const cleanText = text.replace(/\s+/g, ' ').trim();
  while (i < cleanText.length) {
    chunks.push(cleanText.slice(i, i + maxLen));
    i += maxLen - 100; // 100 chars overlap
  }
  return chunks;
}

async function walkDir(dir: string, trackId: string) {
  if (!existsSync(dir)) return;
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      await walkDir(fullPath, trackId);
    } else {
      const ext = extname(fullPath).toLowerCase();
      
      if ([".md", ".txt", ".js", ".ts", ".c", ".h"].includes(ext)) {
        try {
          const content = readFileSync(fullPath, "utf-8");
          const chunks = chunkText(content);
          chunks.forEach((chunk, i) => {
            addFileToIndex(`${file} (Chunk ${i+1})`, chunk, fullPath, ext, trackId);
          });
        } catch (err) {
          console.error(`Failed to index text ${fullPath}`, err);
        }
      } else if (ext === ".pdf") {
        try {
          const dataBuffer = readFileSync(fullPath);
          const data = await pdfParse(dataBuffer);
          const chunks = chunkText(data.text, 1500); 
          chunks.forEach((chunk, i) => {
            addFileToIndex(`${file} (Chunk ${i+1})`, chunk, fullPath, ext, trackId);
          });
        } catch (err) {
          console.error(`Failed to index PDF ${fullPath}`, err);
        }
      } else if ([".mp4", ".url", ".fig", ".mkv"].includes(ext)) {
        addFileToIndex(file, "", fullPath, ext, trackId);
      }
    }
  }
}

export async function POST() {
  try {
    const libraryPath = join(process.cwd(), "library");
    clearIndex();

    if (existsSync(libraryPath)) {
      const tracks = readdirSync(libraryPath).filter(f => statSync(join(libraryPath, f)).isDirectory());
      for (const trackId of tracks) {
        if (trackId === "kiwix") continue; 
        await walkDir(join(libraryPath, trackId), trackId);
      }
    }

    return NextResponse.json({ success: true, message: "Indexing complete" });
  } catch (error) {
    console.error("Index error:", error);
    return NextResponse.json({ error: "Failed to build search index" }, { status: 500 });
  }
}
