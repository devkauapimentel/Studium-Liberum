import { NextRequest, NextResponse } from "next/server";
import { getLibraryPath } from "@/lib/config";
import { readDirectory } from "@/lib/files";
import { join } from "path";

// GET /api/files?path=uninter/banco-dados — list files in a library path
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const relativePath = searchParams.get("path") || "";
  const libraryPath = getLibraryPath();
  const targetPath = join(libraryPath, relativePath);

  // Security: ensure we don't escape library/
  if (!targetPath.startsWith(libraryPath)) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const files = readDirectory(targetPath, 0, 2);
  return NextResponse.json({ path: relativePath, files });
}
