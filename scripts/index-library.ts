import fs from 'fs';
import path from 'path';
const pdfParse = require('pdf-parse');
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), ".studium.db");
const db = new Database(dbPath);

const libraryPath = path.join(process.cwd(), 'library');

function clearIndex() {
  db.exec("DELETE FROM search_index");
  console.log("Index cleared.");
}

function addFileToIndex(title: string, content: string, filePath: string, extension: string, trackId: string) {
  const stmt = db.prepare(`
    INSERT INTO search_index (title, content, path, extension, trackId)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(title, content, filePath, extension, trackId);
}

// Quebra o texto em pedaços com overlap (para buscas não cortarem palavras pela metade)
function chunkText(text: string, maxLen = 1000): string[] {
  const chunks = [];
  let i = 0;
  // Remove multiple spaces/newlines to save space
  const cleanText = text.replace(/\s+/g, ' ').trim();
  while (i < cleanText.length) {
    chunks.push(cleanText.slice(i, i + maxLen));
    i += maxLen - 100; // 100 chars of overlap
  }
  return chunks;
}

async function processDirectory(dir: string, trackId: string = "") {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name === 'docsets' || entry.name.endsWith('.docset')) {
        console.log(`[SKIP] Ignorando diretório de docsets para evitar loop infinito de indexação.`);
        continue;
      }
      // O primeiro nível dentro de library/ é o trackId
      const currentTrackId = trackId === "" ? entry.name : trackId;
      await processDirectory(fullPath, currentTrackId);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      
      if (ext === '.md' || ext === '.txt') {
        console.log(`[MD/TXT] Indexing: ${entry.name}`);
        const text = fs.readFileSync(fullPath, 'utf8');
        const chunks = chunkText(text);
        chunks.forEach((chunk, i) => {
          addFileToIndex(`${entry.name} (Chunk ${i+1})`, chunk, fullPath, ext, trackId);
        });
      } else if (ext === '.pdf') {
        console.log(`[PDF] Indexing: ${entry.name}`);
        try {
          const dataBuffer = fs.readFileSync(fullPath);
          const data = await pdfParse(dataBuffer);
          const chunks = chunkText(data.text, 1500); 
          chunks.forEach((chunk, i) => {
            addFileToIndex(`${entry.name} (Chunk ${i+1})`, chunk, fullPath, ext, trackId);
          });
        } catch (err) {
          console.error(`Falha ao ler PDF ${entry.name}:`, err);
        }
      }
    }
  }
}

async function main() {
  console.log("🚀 Iniciando FTS5 Indexer Pipeline...");
  clearIndex();
  await processDirectory(libraryPath);
  console.log("✅ Indexação completa. Banco de dados atualizado com sucesso!");
}

main().catch(console.error);
