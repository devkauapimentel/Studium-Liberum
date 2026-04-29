import { NextRequest, NextResponse } from "next/server";
import { searchFiles } from "@/lib/db";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = searchFiles(query);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("FTS5 Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
