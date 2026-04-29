import { NextResponse } from "next/server";
import { spawn } from "child_process";
import { join } from "path";
import net from "net";

// Check if port is already in use
async function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once("error", () => resolve(true))
      .once("listening", () => {
        tester.once("close", () => resolve(false)).close();
      })
      .listen(port);
  });
}

export async function POST() {
  try {
    const inUse = await isPortInUse(3001);
    if (inUse) {
      return NextResponse.json({ status: "already_running" });
    }

    const prepDir = join(process.cwd(), "..", "42.rioPreparation");
    
    // Spawn the detached Next.js server
    const child = spawn("npm", ["run", "dev"], {
      cwd: prepDir,
      detached: true,
      stdio: "ignore",
    });

    child.unref();

    // Wait 3 seconds to let Turbopack compile the server
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return NextResponse.json({ status: "started" });
  } catch (error) {
    console.error("Launch error:", error);
    return NextResponse.json({ error: "Failed to launch server" }, { status: 500 });
  }
}
