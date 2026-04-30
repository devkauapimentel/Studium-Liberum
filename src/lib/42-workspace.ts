import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * The workspace root where students write their code.
 * Mirrors the 42 vogsphere submission structure.
 */
export const WORKSPACE_ROOT = path.resolve(process.cwd(), '..', 'Exercicios');

/**
 * Ensure a directory exists, creating it recursively if needed.
 */
export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Get the full path to a student's turn-in directory.
 */
export function getTurnInPath(turnInDir: string): string {
  return path.join(WORKSPACE_ROOT, turnInDir);
}

/**
 * Check if expected files exist in the turn-in directory.
 * Returns { found: string[], missing: string[] }
 */
export function checkFiles(turnInDir: string, expectedFiles: string[]): {
  found: string[];
  missing: string[];
  turnInPath: string;
} {
  const fullPath = getTurnInPath(turnInDir);
  const found: string[] = [];
  const missing: string[] = [];

  for (const file of expectedFiles) {
    const filePath = path.join(fullPath, file);
    if (fs.existsSync(filePath)) {
      found.push(file);
    } else {
      missing.push(file);
    }
  }

  return { found, missing, turnInPath: fullPath };
}

/**
 * Read a file from the turn-in directory.
 */
export function readTurnInFile(turnInDir: string, filename: string): string | null {
  const filePath = path.join(getTurnInPath(turnInDir), filename);
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

/**
 * Run norminette on files in the turn-in directory.
 * Returns { passed: boolean, output: string }
 */
export function runNorminette(turnInDir: string, files: string[]): {
  passed: boolean;
  output: string;
} {
  const fullPath = getTurnInPath(turnInDir);
  const targets = files
    .filter(f => f.endsWith('.c') || f.endsWith('.h'))
    .map(f => path.join(fullPath, f));

  if (targets.length === 0) {
    return { passed: true, output: 'No C/H files to check.' };
  }

  try {
    const output = execSync(`norminette ${targets.join(' ')}`, {
      encoding: 'utf8',
      timeout: 15000,
    });
    const passed = !output.includes('Error');
    return { passed, output: output.trim() };
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string };
    const output = (error.stdout || '') + (error.stderr || '');
    return { passed: false, output: output.trim() || 'Norminette crashed.' };
  }
}

/**
 * Compile C files with strict 42 flags.
 * Returns { passed: boolean, output: string, binaryPath: string | null }
 */
export function compileC(turnInDir: string, files: string[], testMainContent?: string): {
  passed: boolean;
  output: string;
  binaryPath: string | null;
} {
  const fullPath = getTurnInPath(turnInDir);
  const tmpDir = path.join(fullPath, '.moulinette_tmp');
  ensureDir(tmpDir);

  const binaryPath = path.join(tmpDir, 'a.out');
  const sources = files
    .filter(f => f.endsWith('.c'))
    .map(f => path.join(fullPath, f));

  // If a test main is provided, write it to a temp file
  if (testMainContent) {
    const mainPath = path.join(tmpDir, 'main_test.c');
    fs.writeFileSync(mainPath, testMainContent);
    sources.push(mainPath);
  }

  try {
    const cmd = `gcc -Wall -Wextra -Werror ${sources.join(' ')} -o ${binaryPath}`;
    execSync(cmd, {
      encoding: 'utf8',
      timeout: 15000,
      cwd: fullPath,
    });
    return { passed: true, output: 'Compilation successful.', binaryPath };
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string };
    const output = (error.stdout || '') + (error.stderr || '');
    // Cleanup binary if it exists
    try { fs.unlinkSync(binaryPath); } catch { /* ignore */ }
    return { passed: false, output: output.trim() || 'Compilation failed.', binaryPath: null };
  }
}

/**
 * Run a compiled binary and capture its output.
 */
export function runBinary(binaryPath: string, input?: string): {
  output: string;
  exitCode: number;
} {
  try {
    const options: Record<string, unknown> = {
      encoding: 'utf8' as const,
      timeout: 10000,
    };
    if (input) {
      options.input = input;
    }
    const output = execSync(binaryPath, options as Parameters<typeof execSync>[1]);
    return { output: (output as string).toString(), exitCode: 0 };
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; status?: number };
    return {
      output: ((error.stdout || '') + (error.stderr || '')).trim(),
      exitCode: error.status || 1,
    };
  }
}

/**
 * Run a shell script and capture its output.
 */
export function runShellScript(turnInDir: string, scriptFile: string): {
  output: string;
  exitCode: number;
} {
  const fullPath = getTurnInPath(turnInDir);
  const scriptPath = path.join(fullPath, scriptFile);

  try {
    // First check if file has execute permissions
    fs.accessSync(scriptPath, fs.constants.X_OK);
  } catch {
    return { output: `Permission denied: ${scriptFile} is not executable. Run: chmod +x ${scriptFile}`, exitCode: 126 };
  }

  try {
    const output = execSync(`bash "${scriptPath}"`, {
      encoding: 'utf8',
      timeout: 10000,
      cwd: fullPath,
    });
    return { output: output.toString().trim(), exitCode: 0 };
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; status?: number };
    return {
      output: ((error.stdout || '') + (error.stderr || '')).trim(),
      exitCode: error.status || 1,
    };
  }
}

/**
 * Clean up moulinette temp files.
 */
export function cleanupMoulinette(turnInDir: string): void {
  const tmpDir = path.join(getTurnInPath(turnInDir), '.moulinette_tmp');
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch { /* ignore */ }
}

/**
 * Scaffold the complete exercise workspace for a phase.
 */
export function scaffoldPhaseWorkspace(exercises: { turnInDir: string; expectedFiles: string[] }[]): string[] {
  const created: string[] = [];
  for (const ex of exercises) {
    const dir = getTurnInPath(ex.turnInDir);
    if (!fs.existsSync(dir)) {
      ensureDir(dir);
      created.push(ex.turnInDir);
    }
  }
  return created;
}

/**
 * Check git status for the workspace.
 */
export function checkGitStatus(turnInDir: string): {
  isRepo: boolean;
  hasChanges: boolean;
  output: string;
} {
  const fullPath = getTurnInPath(turnInDir);
  try {
    const status = execSync('git status --porcelain', {
      encoding: 'utf8',
      timeout: 5000,
      cwd: WORKSPACE_ROOT,
    });
    return {
      isRepo: true,
      hasChanges: status.trim().length > 0,
      output: status.trim() || 'Working tree clean.',
    };
  } catch {
    return { isRepo: false, hasChanges: false, output: 'Not a git repository.' };
  }
}
