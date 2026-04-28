import { NextResponse } from "next/server";
import { getConfig, saveConfig, getLibraryPath } from "@/lib/config";
import { readDirectory, countFiles } from "@/lib/files";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";
import type { Track } from "@/lib/types";

// GET /api/tracks — list all tracks with file stats
export async function GET() {
  const config = getConfig();
  const libraryPath = getLibraryPath();

  const tracks = config.tracks.map((track) => {
    const trackPath = join(libraryPath, track.id);
    const files = readDirectory(trackPath);
    const counts = countFiles(files);
    return { ...track, fileCount: counts };
  });

  return NextResponse.json({ tracks });
}

// POST /api/tracks — create a new track
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, icon, color, subjects } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const id = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const config = getConfig();

    // Check duplicate
    if (config.tracks.find((t) => t.id === id)) {
      return NextResponse.json({ error: "Track already exists" }, { status: 409 });
    }

    const newTrack: Track = {
      id,
      name,
      icon: icon || "📚",
      color: color || "#3b82f6",
      subjects: subjects || [],
    };

    config.tracks.push(newTrack);
    saveConfig(config);

    // Create library directory
    const trackPath = join(getLibraryPath(), id);
    if (!existsSync(trackPath)) {
      mkdirSync(trackPath, { recursive: true });
    }

    // Create subject directories
    if (newTrack.subjects) {
      for (const subject of newTrack.subjects) {
        const subjectPath = join(trackPath, subject.id);
        if (!existsSync(subjectPath)) {
          mkdirSync(subjectPath, { recursive: true });
        }
      }
    }

    return NextResponse.json({ track: newTrack }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
