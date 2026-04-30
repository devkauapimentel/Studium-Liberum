import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import mime from "mime"; // need to check if mime is installed, otherwise use simple map

const MIME_MAP: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ doc: string; path: string[] }> }
) {
  const resolvedParams = await params;
  const { doc, path: filePathArr } = resolvedParams;

  try {
    const basePath = path.join(
      process.cwd(),
      "library",
      "docsets",
      doc,
      "Contents",
      "Resources",
      "Documents"
    );

    const safePath = path.join(basePath, ...filePathArr);

    // Prevent directory traversal
    if (!safePath.startsWith(basePath)) {
      return new Response("Forbidden", { status: 403 });
    }

    if (!fs.existsSync(safePath)) {
      return new Response("File not found", { status: 404 });
    }

    const ext = path.extname(safePath).toLowerCase();
    let contentType = MIME_MAP[ext] || "application/octet-stream";

    const fileBuffer = fs.readFileSync(safePath);

    // Se for HTML, podemos injetar uma base tag ou scripts para limpar o visual
    let finalBody: Buffer | string = fileBuffer;
    if (ext === ".html") {
      let htmlStr = fileBuffer.toString("utf-8");
      // Remover elements indesejados da Dash (opcional)
      htmlStr = htmlStr.replace(/<style>.*?<\/style>/is, (match) => {
        return match + `\n<style>
          body { font-family: system-ui, -apple-system, sans-serif !important; background: var(--color-bg-primary, #09090b); color: var(--color-text-primary, #ededed); }
          a { color: var(--color-accent-blue, #3b82f6); }
          .dash-anchor { display: none !important; }
        </style>`;
      });
      finalBody = htmlStr;
    }

    return new Response(finalBody, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Docset serve error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
