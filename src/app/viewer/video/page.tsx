import { Suspense } from "react";
import VideoPlayerClient from "./VideoPlayerClient";

export default function VideoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg-primary)" }}>
        <p className="text-[var(--color-text-muted)]">Carregando player...</p>
      </div>
    }>
      <VideoPlayerClient />
    </Suspense>
  );
}
