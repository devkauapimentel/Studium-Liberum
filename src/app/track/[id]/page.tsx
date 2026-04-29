import { getConfig, getLibraryPath } from "@/lib/config";
import { readDirectory, countFiles, groupSemanticFiles } from "@/lib/files";
import { getTrackSyllabus, orderBySyllabus } from "@/lib/syllabus";
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
  let files = readDirectory(trackPath);
  const counts = countFiles(files);

  // Apply semantic grouping (PDFs attached to videos, resources tagged)
  files = groupSemanticFiles(files);

  // Apply syllabus ordering if one exists (e.g., Rocketseat chronological order)
  const syllabus = getTrackSyllabus(libraryPath, track.id);
  if (syllabus.length > 0) {
    // Order each phase directory's children by syllabus
    files = files.map((entry) => {
      if (entry.type === "directory" && entry.children) {
        return {
          ...entry,
          children: orderBySyllabus(entry.children, syllabus),
        };
      }
      return entry;
    });
  }

  return (
    <TrackDetailClient
      track={track}
      files={files}
      counts={counts}
      allTracks={config.tracks}
      hasSyllabus={syllabus.length > 0}
    />
  );
}
