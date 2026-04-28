"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ZoomIn, ZoomOut, Download } from "lucide-react";
import { useState } from "react";

export default function PDFViewerClient() {
  const searchParams = useSearchParams();
  const filePath = searchParams.get("file") || "";
  const fileName = filePath.split("/").pop() || "PDF";
  const [zoom, setZoom] = useState(100);

  const pdfUrl = `/api/serve?file=${encodeURIComponent(filePath)}`;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg-primary)" }}>
      {/* Header */}
      <header
        className="flex items-center gap-4 px-6 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "var(--color-bg-secondary)" }}
      >
        <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold truncate">{fileName}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(50, z - 10))}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-sm font-mono text-[var(--color-text-secondary)] min-w-[3rem] text-center">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            <ZoomIn size={18} />
          </button>
          <a
            href={pdfUrl}
            download={fileName}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            <Download size={18} />
          </a>
        </div>
      </header>

      {/* PDF Embed */}
      <div className="flex-1 flex items-center justify-center p-4">
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&zoom=${zoom}`}
          className="w-full h-full rounded-lg border border-[var(--color-border)]"
          style={{
            minHeight: "calc(100vh - 80px)",
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
          title={fileName}
        />
      </div>
    </div>
  );
}
