import { Suspense } from "react";
import PDFViewerClient from "./PDFViewerClient";

export default function PDFPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg-primary)" }}>
        <p className="text-[var(--color-text-muted)]">Carregando viewer...</p>
      </div>
    }>
      <PDFViewerClient />
    </Suspense>
  );
}
