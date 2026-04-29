import { NextRequest, NextResponse } from "next/server";
import { statSync, existsSync } from "fs";
import { open, readFile } from "fs/promises";
import { extname, basename } from "path";

// ═══════════════════════════════════════
// Studium Liberum — File Serve API v3.0
// ═══════════════════════════════════════

const MIME_MAP: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mkv": "video/x-matroska",
  ".avi": "video/x-msvideo",
  ".pdf": "application/pdf",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".c": "text/x-c; charset=utf-8",
  ".h": "text/x-c; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".ts": "text/typescript; charset=utf-8",
  ".py": "text/x-python; charset=utf-8",
  ".sh": "text/x-shellscript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".fig": "application/octet-stream",
  ".url": "text/plain; charset=utf-8",
};

// Max chunk per range request: 5MB
// Trade-off: larger = fewer HTTP requests = smoother playback
//            smaller = faster initial load + more responsive seek
const MAX_CHUNK_SIZE = 5 * 1024 * 1024;

// Files under this size are read entirely into memory (Buffer)
// Above this, use streaming (ReadableStream) to avoid RAM spikes
const BUFFER_THRESHOLD = 50 * 1024 * 1024; // 50MB

// GET /api/serve?file=/absolute/path — serve a file from library/
export async function GET(request: NextRequest) {
  const filePath = request.nextUrl.searchParams.get("file");

  if (!filePath) {
    return NextResponse.json({ error: "No file specified" }, { status: 400 });
  }

  // Security: only serve files from library/
  const libraryPath = process.cwd() + "/library";
  if (!filePath.startsWith(libraryPath)) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const stat = statSync(filePath);
  const ext = extname(filePath).toLowerCase();
  const contentType = MIME_MAP[ext] || "application/octet-stream";
  const fileSize = stat.size;

  const range = request.headers.get("range");
  const isMedia = contentType.startsWith("video/") || contentType.startsWith("audio/");

  // Video/Audio WITH Range header → 206 Partial Content (seeking, progressive load)
  if (isMedia && range) {
    return serveRange(filePath, range, fileSize, contentType);
  }

  // Video/Audio WITHOUT Range header → 200 with full Content-Length
  // The browser needs this to know the total size and calculate duration
  // Then it will send Range requests for actual byte fetching
  if (isMedia && !range) {
    return serveBuffer(filePath, fileSize, contentType);
  }

  // Everything else (PDFs, text, code)
  return serveBuffer(filePath, fileSize, contentType);
}

/**
 * Serve a byte range using a ReadableStream.
 * We read in small chunks (256KB) so that if the browser aborts the request
 * (e.g. user seeks or changes speed), we can cancel immediately without hanging.
 */
async function serveRange(
  filePath: string,
  range: string,
  fileSize: number,
  contentType: string,
): Promise<Response> {
  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);

  // Cap open-ended ranges to MAX_CHUNK_SIZE
  const requestedEnd = parts[1] ? parseInt(parts[1], 10) : undefined;
  const end = requestedEnd !== undefined
    ? Math.min(requestedEnd, fileSize - 1)
    : Math.min(start + MAX_CHUNK_SIZE - 1, fileSize - 1);

  const chunkSize = end - start + 1;

  // Validate
  if (start >= fileSize || start < 0 || end >= fileSize || start > end) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${fileSize}` },
    });
  }

  const fh = await open(filePath, "r");
  const CHUNK = 256 * 1024; // 256KB streaming chunks for responsiveness
  let position = start;

  const stream = new ReadableStream({
    async pull(controller) {
      try {
        const remaining = (end + 1) - position;
        const toRead = Math.min(CHUNK, remaining);
        
        if (toRead <= 0) {
          controller.close();
          await fh.close().catch(() => {});
          return;
        }
        
        const buffer = Buffer.alloc(toRead);
        const result = await fh.read(buffer, 0, toRead, position);
        
        if (result.bytesRead === 0) {
          controller.close();
          await fh.close().catch(() => {});
          return;
        }
        
        controller.enqueue(new Uint8Array(buffer.buffer, buffer.byteOffset, result.bytesRead));
        position += result.bytesRead;
      } catch {
        controller.error();
        await fh.close().catch(() => {});
      }
    },
    async cancel() {
      // Browser aborted the request (e.g. user seeked)
      await fh.close().catch(() => {});
    },
  });

  return new Response(stream, {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": String(chunkSize),
      "Content-Type": contentType,
      "Cache-Control": "no-store", // Prevent aggressive browser caching from breaking range requests
    },
  });
}

/**
 * Serve a complete file as a Buffer response.
 * For files under BUFFER_THRESHOLD, reads into memory.
 * For larger files, falls back to streaming.
 */
async function serveBuffer(
  filePath: string,
  fileSize: number,
  contentType: string,
): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "Content-Length": String(fileSize),
    "Accept-Ranges": "bytes",
  };

  if (contentType === "application/pdf") {
    headers["Content-Disposition"] = `inline; filename="${encodeURIComponent(basename(filePath))}"`;
  }

  // Small files: read entirely into memory
  if (fileSize <= BUFFER_THRESHOLD) {
    const buffer = await readFile(filePath);
    return new Response(buffer, { headers });
  }

  // Large files: stream to avoid RAM spike
  const fh = await open(filePath, "r");
  const CHUNK = 1024 * 1024; // 1MB streaming chunks
  let position = 0;

  const stream = new ReadableStream({
    async pull(controller) {
      try {
        const toRead = Math.min(CHUNK, fileSize - position);
        if (toRead <= 0) {
          controller.close();
          await fh.close();
          return;
        }
        const buffer = Buffer.alloc(toRead);
        const result = await fh.read(buffer, 0, toRead, position);
        if (result.bytesRead === 0) {
          controller.close();
          await fh.close();
          return;
        }
        controller.enqueue(new Uint8Array(buffer.buffer, buffer.byteOffset, result.bytesRead));
        position += result.bytesRead;
      } catch {
        controller.close();
        await fh.close().catch(() => {});
      }
    },
    async cancel() {
      await fh.close().catch(() => {});
    },
  });

  return new Response(stream, { headers });
}
