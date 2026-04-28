import { getConfig, getLibraryPath } from "@/lib/config";
import { readDirectory, countFiles } from "@/lib/files";
import { join } from "path";
import DashboardClient from "./DashboardClient";

export default function Home() {
  const config = getConfig();
  const libraryPath = getLibraryPath();

  // Get file counts for each track
  const trackStats = config.tracks.map((track) => {
    const trackPath = join(libraryPath, track.id);
    const files = readDirectory(trackPath);
    const counts = countFiles(files);
    return { trackId: track.id, ...counts };
  });

  return <DashboardClient config={config} trackStats={trackStats} />;
}
