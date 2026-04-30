import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const docsetsDir = path.join(process.cwd(), "library", "docsets");
  if (!fs.existsSync(docsetsDir)) {
    return NextResponse.json([]);
  }

  const docsets = fs.readdirSync(docsetsDir).filter((d) => d.endsWith(".docset"));
  const installed = [];

  for (const docset of docsets) {
    const plistPath = path.join(docsetsDir, docset, "Contents", "Info.plist");
    let indexFilePath = "index.html"; // fallback
    let name = docset.replace(".docset", "");

    if (fs.existsSync(plistPath)) {
      const plistContent = fs.readFileSync(plistPath, "utf-8");
      
      // Extract dashIndexFilePath
      const indexPathMatch = plistContent.match(/<key>dashIndexFilePath<\/key>\s*<string>([^<]+)<\/string>/);
      if (indexPathMatch && indexPathMatch[1]) {
        indexFilePath = indexPathMatch[1];
      }

      // Extract CFBundleName
      const nameMatch = plistContent.match(/<key>CFBundleName<\/key>\s*<string>([^<]+)<\/string>/);
      if (nameMatch && nameMatch[1]) {
        name = nameMatch[1];
      }
    }

    installed.push({
      folder: docset,
      name,
      indexFilePath,
      icon: name.toLowerCase() // We can map this to an icon in the frontend
    });
  }

  return NextResponse.json(installed);
}
