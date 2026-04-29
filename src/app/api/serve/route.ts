import { NextRequest, NextResponse } from "next/server";
import { statSync, existsSync, createReadStream } from "fs";
import { extname, basename } from "path";
import { Readable } from "stream";

// ═══════════════════════════════════════
// Studium Liberum — File Serve API v4.0
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

// GET /api/serve?file=/absolute/path
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

  // Desativando streaming de Range parcial para o Firefox/Zen Browser!
  // Mas como você está no Chrome, o Chrome OBRIGA o Range Header para poder dar seek
  // (avançar o vídeo sem voltar para o início).
  const range = request.headers.get("range");
  if (range && contentType.startsWith("video/")) {
    return serveRange(filePath, range, fileSize, contentType);
  }

  return serveComplete(filePath, fileSize, contentType, request.signal);
}

import { promises as fsPromises } from "fs";

async function serveRange(
  filePath: string,
  range: string,
  fileSize: number,
  contentType: string,
): Promise<Response> {
  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  
  // Limite seguro de 5MB por chunk na memória para evitar spike de RAM.
  // Como retornamos um Buffer puro, o Next.js não usa Transfer-Encoding: chunked.
  // Isso resolve perfeitamente o strict decoder do Firefox (Zen Browser).
  const MAX_CHUNK = 5 * 1024 * 1024;
  const requestedEnd = parts[1] ? parseInt(parts[1], 10) : NaN;
  const end = !isNaN(requestedEnd)
    ? Math.min(requestedEnd, fileSize - 1)
    : Math.min(start + MAX_CHUNK - 1, fileSize - 1);

  if (start >= fileSize || start < 0 || end >= fileSize || start > end) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${fileSize}` },
    });
  }

  const chunkSize = end - start + 1;
  const buffer = Buffer.alloc(chunkSize);
  
  let fh;
  let bytesRead = 0;
  try {
    fh = await fsPromises.open(filePath, "r");
    const result = await fh.read(buffer, 0, chunkSize, start);
    bytesRead = result.bytesRead;
  } finally {
    if (fh) await fh.close();
  }

  // Se o disco leu menos bytes que o esperado, fatiamos o buffer 
  // para NUNCA enviar Null Bytes (0x00) e corromper o MP4.
  const finalBuffer = buffer.subarray(0, bytesRead);
  const actualEnd = start + bytesRead - 1;

  return new Response(finalBuffer, {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${actualEnd}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": String(bytesRead),
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400", 
      "ETag": `W/"${fileSize}-${statSync(filePath).mtimeMs}"`
    },
  });
}

function serveComplete(
  filePath: string,
  fileSize: number,
  contentType: string,
  signal: AbortSignal,
): Response {
  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "Content-Length": String(fileSize),
  };

  if (contentType === "application/pdf") {
    headers["Content-Disposition"] = `inline; filename="${encodeURIComponent(basename(filePath))}"`;
  }

  const nodeStream = createReadStream(filePath, { highWaterMark: 1024 * 1024 });

  signal.addEventListener("abort", () => {
    if (!nodeStream.destroyed) nodeStream.destroy();
  });

  const webStream = Readable.toWeb(nodeStream) as ReadableStream;

  return new Response(webStream, { headers });
}
