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

    // Se for HTML, injetamos nossa Skin Brutalista / Modernizadora
    let finalBody: Buffer | string = fileBuffer;
    if (ext === ".html") {
      let htmlStr = fileBuffer.toString("utf-8");
      
      const MODERN_CSS = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        body, #content { 
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important; 
          background: #09090b !important; 
          color: #ededed !important; 
          line-height: 1.7 !important;
          max-width: 900px !important;
          margin: 0 auto !important;
          padding: 2rem !important;
          border: none !important;
        }

        a { color: #f59e0b !important; text-decoration: none !important; font-weight: 500 !important; }
        a:hover { text-decoration: underline !important; color: #fbbf24 !important; }
        
        h1, h2, h3, h4, h5 { 
          font-family: 'Inter', sans-serif !important; 
          color: #ffffff !important; 
          border-bottom: 1px solid #27272a !important; 
          padding-bottom: 12px !important; 
          margin-top: 40px !important; 
          font-weight: 700 !important;
        }
        h1 { font-size: 2.5rem !important; border-bottom: none !important; }

        /* CppReference Specific Modernization */
        #mw-page-base, #mw-head-base, #siteNotice, #mw-navigation, #p-cactions, #catlinks, .printfooter { display: none !important; } 
        
        /* Navbar Navigation CppReference */
        .t-navbar { 
          background: #18181b !important; 
          border: 1px solid #27272a !important; 
          border-radius: 12px !important; 
          padding: 1.5rem !important; 
          margin-bottom: 2rem !important; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important; 
        }

        /* Definition Blocks */
        .t-dcl-begin, .t-dsc-begin, .t-dcl, .t-dsc { background: transparent !important; border: none !important; }
        .t-dcl { 
          border-left: 4px solid #f59e0b !important; 
          padding-left: 1.5rem !important; 
          background: #18181b !important; 
          border-radius: 0 12px 12px 0 !important; 
          margin: 1.5rem 0 !important; 
          padding-top: 1rem !important;
          padding-bottom: 1rem !important;
        }

        /* Tables */
        table.t-dsc-begin, table.wikitable { 
          width: 100% !important; 
          border-collapse: collapse !important; 
          margin: 2rem 0 !important;
          background: #09090b !important;
        }
        table.t-dsc-begin td, table.wikitable td, table.wikitable th { 
          padding: 1rem !important; 
          border-bottom: 1px solid #27272a !important; 
          border: 1px solid #27272a !important;
        }
        table.wikitable th { background: #18181b !important; color: #fff !important; }

        /* Code & Pre Blocks */
        pre.source-c, pre, .mw-geshi {
          background: #18181b !important;
          border: 1px solid #27272a !important;
          border-radius: 12px !important;
          font-family: 'JetBrains Mono', monospace !important;
          color: #a1a1aa !important;
          padding: 1.5rem !important;
          font-size: 0.9em !important;
          overflow-x: auto !important;
        }
        p code, li code, td code { 
          padding: 0.2rem 0.5rem !important; 
          border-radius: 6px !important; 
          color: #fbbf24 !important; 
          background: #18181b !important; 
          border: 1px solid #27272a !important;
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 0.85em !important;
        }
        
        .dash-anchor { display: none !important; }
        .t-example-live-link { display: none !important; } /* Hide Run this code buttons */
      </style>`;

      // Injetar logo antes do </head> ou simplesmente no final do arquivo
      htmlStr = htmlStr.replace("</head>", MODERN_CSS + "\n</head>");
      // Fallback caso não tenha </head>
      if (!htmlStr.includes("</head>")) {
        htmlStr += MODERN_CSS;
      }

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
