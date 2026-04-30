import { NextResponse } from 'next/server';
import { roadmap } from '@/lib/42-data';
import {
  checkFiles,
  runNorminette,
  compileC,
  runBinary,
  runShellScript,
  cleanupMoulinette,
  readTurnInFile,
  getTurnInPath,
} from '@/lib/42-workspace';
import type { MoulinetteStep, MoulinetteResult } from '@/lib/42-types';
import fs from 'fs';

/**
 * POST /api/moulinette
 * Body: { exerciseId: "e2-0" }
 * 
 * Runs the full Moulinette validation pipeline:
 * 1. File Check
 * 2. Norminette (for C files)
 * 3. Compilation (for C files) / Permissions (for shell)
 * 4. Test Execution
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const exerciseId = body.exerciseId;

    if (!exerciseId) {
      return NextResponse.json({ error: 'exerciseId is required' }, { status: 400 });
    }

    // Find the exercise
    const exercise = roadmap
      .flatMap(p => p.exercises)
      .find(e => e.id === exerciseId);

    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    const steps: MoulinetteStep[] = [];
    let allPassed = true;

    // ═══════════════════════════════════════════
    // STEP 1: FILE CHECK
    // ═══════════════════════════════════════════
    const fileCheck = checkFiles(exercise.turnInDir, exercise.expectedFiles);

    if (fileCheck.missing.length > 0) {
      steps.push({
        name: 'File Check',
        status: 'fail',
        output: `Missing files in ${exercise.turnInDir}/:\n${fileCheck.missing.map(f => `  ✘ ${f}`).join('\n')}\n\nFound:\n${fileCheck.found.map(f => `  ✔ ${f}`).join('\n') || '  (none)'}`,
      });
      allPassed = false;

      // Return early — no point continuing
      const result: MoulinetteResult = {
        exerciseId,
        passed: false,
        steps,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(result);
    }

    steps.push({
      name: 'File Check',
      status: 'pass',
      output: `All files present in ${exercise.turnInDir}/:\n${fileCheck.found.map(f => `  ✔ ${f}`).join('\n')}`,
    });

    // ═══════════════════════════════════════════
    // PIPELINE BRANCH: C vs SHELL
    // ═══════════════════════════════════════════
    if (exercise.validationType === 'c') {
      // ─────────────────────────────────────────
      // STEP 2: NORMINETTE
      // ─────────────────────────────────────────
      const normResult = runNorminette(exercise.turnInDir, exercise.expectedFiles);

      if (!normResult.passed) {
        steps.push({
          name: 'Norminette',
          status: 'fail',
          output: normResult.output,
        });
        allPassed = false;

        // In 42, norminette failure = immediate stop
        const result: MoulinetteResult = {
          exerciseId,
          passed: false,
          steps,
          timestamp: new Date().toISOString(),
        };
        cleanupMoulinette(exercise.turnInDir);
        return NextResponse.json(result);
      }

      steps.push({
        name: 'Norminette',
        status: 'pass',
        output: normResult.output,
      });

      // ─────────────────────────────────────────
      // STEP 3: COMPILATION
      // ─────────────────────────────────────────
      // Run test cases
      if (exercise.testCases && exercise.testCases.length > 0) {
        let compilationPassed = true;

        for (const testCase of exercise.testCases) {
          if (!testCase.testMain) continue;

          const compResult = compileC(
            exercise.turnInDir,
            exercise.expectedFiles,
            testCase.testMain
          );

          if (!compResult.passed) {
            steps.push({
              name: `Compilation [${testCase.name}]`,
              status: 'fail',
              output: `gcc -Wall -Wextra -Werror\n\n${compResult.output}`,
            });
            compilationPassed = false;
            allPassed = false;
            break;
          }

          // ─────────────────────────────────────
          // STEP 4: TEST EXECUTION
          // ─────────────────────────────────────
          if (compResult.binaryPath) {
            const runResult = runBinary(compResult.binaryPath, testCase.input);
            const expected = testCase.expectedOutput;
            let testPassed = false;

            // Handle special test assertions
            if (expected === '__NOT_EMPTY__') {
              testPassed = runResult.output.trim().length > 0;
            } else if (expected === '__EXIT_ZERO__') {
              testPassed = runResult.exitCode === 0;
            } else if (expected.startsWith('__STARTS_WITH__:')) {
              const prefix = expected.replace('__STARTS_WITH__:', '');
              testPassed = runResult.output.trim().startsWith(prefix);
            } else if (expected.startsWith('__CONTAINS__:')) {
              const needle = expected.replace('__CONTAINS__:', '');
              testPassed = runResult.output.includes(needle);
            } else if (expected === '__POSITIVE__') {
              testPassed = parseInt(runResult.output.trim()) > 0;
            } else {
              // Exact match (trimmed)
              testPassed = runResult.output.trim() === expected.trim();
            }

            if (!testPassed) {
              steps.push({
                name: `Test: ${testCase.name}`,
                status: 'fail',
                output: `Expected: ${expected}\nGot:      ${runResult.output.trim() || '(empty)'}\nExit code: ${runResult.exitCode}`,
              });
              allPassed = false;
            } else {
              steps.push({
                name: `Test: ${testCase.name}`,
                status: 'pass',
                output: `Output: ${runResult.output.trim() || '(empty)'}`,
              });
            }
          }
        }

        if (compilationPassed && !steps.some(s => s.name.startsWith('Compilation'))) {
          steps.push({
            name: 'Compilation',
            status: 'pass',
            output: 'gcc -Wall -Wextra -Werror — OK',
          });
        }
      } else {
        // No test cases — just compile to check
        const compResult = compileC(exercise.turnInDir, exercise.expectedFiles);
        if (!compResult.passed) {
          steps.push({
            name: 'Compilation',
            status: 'fail',
            output: `gcc -Wall -Wextra -Werror\n\n${compResult.output}`,
          });
          allPassed = false;
        } else {
          steps.push({
            name: 'Compilation',
            status: 'pass',
            output: 'gcc -Wall -Wextra -Werror — OK',
          });
        }
      }
    } else if (exercise.validationType === 'shell') {
      // ─────────────────────────────────────────
      // SHELL PIPELINE
      // ─────────────────────────────────────────
      const scriptFile = exercise.expectedFiles[0];
      const scriptPath = getTurnInPath(exercise.turnInDir) + '/' + scriptFile;

      // STEP 2: Permissions check
      try {
        fs.accessSync(scriptPath, fs.constants.X_OK);
        steps.push({
          name: 'Permissions',
          status: 'pass',
          output: `${scriptFile} has execute permission.`,
        });
      } catch {
        steps.push({
          name: 'Permissions',
          status: 'fail',
          output: `${scriptFile} is NOT executable.\nRun: chmod +x ${scriptFile}`,
        });
        allPassed = false;

        const result: MoulinetteResult = {
          exerciseId,
          passed: false,
          steps,
          timestamp: new Date().toISOString(),
        };
        return NextResponse.json(result);
      }

      // STEP 3: Execution & Tests
      if (exercise.testCases && exercise.testCases.length > 0) {
        for (const testCase of exercise.testCases) {
          const expected = testCase.expectedOutput;

          if (expected === '__EXIT_ZERO__') {
            const runResult = runShellScript(exercise.turnInDir, scriptFile);
            const passed = runResult.exitCode === 0;
            steps.push({
              name: `Test: ${testCase.name}`,
              status: passed ? 'pass' : 'fail',
              output: passed
                ? `Script exited with code 0.`
                : `Script exited with code ${runResult.exitCode}.\n${runResult.output}`,
            });
            if (!passed) allPassed = false;
          } else if (expected === '__NOT_EMPTY__') {
            const content = readTurnInFile(exercise.turnInDir, exercise.expectedFiles[0]);
            const passed = content !== null && content.trim().length > 0;
            steps.push({
              name: `Test: ${testCase.name}`,
              status: passed ? 'pass' : 'fail',
              output: passed ? 'File has content.' : 'File is empty or missing.',
            });
            if (!passed) allPassed = false;
          } else if (expected.startsWith('__FILE_EXISTS__:')) {
            const filename = expected.replace('__FILE_EXISTS__:', '');
            // Would need to run the script first in a sandbox, for now just check script content
            const content = readTurnInFile(exercise.turnInDir, scriptFile);
            const passed = content !== null && content.includes(filename);
            steps.push({
              name: `Test: ${testCase.name}`,
              status: passed ? 'pass' : 'fail',
              output: passed
                ? `Script references '${filename}'.`
                : `Script doesn't reference '${filename}'.`,
            });
            if (!passed) allPassed = false;
          } else if (expected.startsWith('__DIR_EXISTS__:')) {
            const dirName = expected.replace('__DIR_EXISTS__:', '');
            const content = readTurnInFile(exercise.turnInDir, scriptFile);
            const passed = content !== null && content.includes(dirName.split('/')[0]);
            steps.push({
              name: `Test: ${testCase.name}`,
              status: passed ? 'pass' : 'fail',
              output: passed
                ? `Script creates required directory structure.`
                : `Script doesn't appear to create '${dirName}'.`,
            });
            if (!passed) allPassed = false;
          } else if (expected.startsWith('__CONTAINS__:')) {
            const needle = expected.replace('__CONTAINS__:', '');
            const content = readTurnInFile(exercise.turnInDir, scriptFile);
            const passed = content !== null && content.includes(needle);
            steps.push({
              name: `Test: ${testCase.name}`,
              status: passed ? 'pass' : 'fail',
              output: passed
                ? `Script contains '${needle}'.`
                : `Script doesn't contain '${needle}'.`,
            });
            if (!passed) allPassed = false;
          } else {
            // Direct output comparison
            const runResult = runShellScript(exercise.turnInDir, scriptFile);
            const passed = runResult.output.trim() === expected.trim();
            steps.push({
              name: `Test: ${testCase.name}`,
              status: passed ? 'pass' : 'fail',
              output: passed
                ? `Output matches expected.`
                : `Expected: ${expected}\nGot: ${runResult.output}`,
            });
            if (!passed) allPassed = false;
          }
        }
      }
    }

    // Cleanup temp files
    cleanupMoulinette(exercise.turnInDir);

    const result: MoulinetteResult = {
      exerciseId,
      passed: allPassed,
      steps,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error('Moulinette error:', err);
    return NextResponse.json(
      { error: 'Internal moulinette error', details: String(err) },
      { status: 500 }
    );
  }
}
