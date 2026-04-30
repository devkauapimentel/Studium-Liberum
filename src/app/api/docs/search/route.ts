import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const docsetsDir = path.join(process.cwd(), "library", "docsets");
  if (!fs.existsSync(docsetsDir)) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const docsets = fs.readdirSync(docsetsDir).filter((d) => d.endsWith(".docset"));
  let allResults: any[] = [];

  for (const docset of docsets) {
    const dbPath = path.join(docsetsDir, docset, "Contents", "Resources", "docSet.dsidx");
    if (!fs.existsSync(dbPath)) continue;

    try {
      const db = new Database(dbPath, { readonly: true });
      // Usar q% em vez de %q% faz o SQLite usar o B-Tree Index (se existir) na coluna name, eliminando Full Table Scan
      const stmt = db.prepare(`SELECT name, type, path FROM searchIndex WHERE name LIKE ? LIMIT 30`);
      const results = stmt.all(`${q}%`);
      
      const formatted = results.map((r: any) => ({
        docset: docset.replace(".docset", ""),
        name: r.name,
        type: r.type,
        path: r.path,
        docsetFolder: docset
      }));

      allResults = allResults.concat(formatted);
      db.close();
    } catch (e) {
      console.error(`Error reading docset DB ${docset}:`, e);
    }
  }

  // Sort by exact match first, then alphabetically
  allResults.sort((a, b) => {
    const aLower = a.name.toLowerCase();
    const bLower = b.name.toLowerCase();
    const qLower = q.toLowerCase();
    
    if (aLower === qLower && bLower !== qLower) return -1;
    if (bLower === qLower && aLower !== qLower) return 1;
    if (aLower.startsWith(qLower) && !bLower.startsWith(qLower)) return -1;
    if (bLower.startsWith(qLower) && !aLower.startsWith(qLower)) return 1;
    
    return aLower.localeCompare(bLower);
  });

  return new Response(JSON.stringify(allResults.slice(0, 50)), {
    headers: { "Content-Type": "application/json" },
  });
}
