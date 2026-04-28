import { getConfig, getLibraryPath } from "@/lib/config";
import { readDirectory, countFiles } from "@/lib/files";
import { join } from "path";
import { notFound } from "next/navigation";
import TrackDetailClient from "./TrackDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TrackPage({ params }: PageProps) {
  const { id } = await params;
  const config = getConfig();
  const track = config.tracks.find((t) => t.id === id);

  if (!track) notFound();

  const libraryPath = getLibraryPath();
  const trackPath = join(libraryPath, track.id);
  const files = readDirectory(trackPath);
  const counts = countFiles(files);

  return (
    <TrackDetailClient
      track={track}
      files={files}
      counts={counts}
      allTracks={config.tracks}
      features={config.features}
    />
  );
}
