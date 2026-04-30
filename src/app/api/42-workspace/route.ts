import { NextResponse } from 'next/server';
import { roadmap } from '@/lib/42-data';
import { scaffoldPhaseWorkspace, checkFiles, WORKSPACE_ROOT } from '@/lib/workspace';
import fs from 'fs';

/**
 * GET /api/workspace?exercise=day00-ex00
 * Returns file status for a specific exercise.
 * 
 * GET /api/workspace?phase=phase-1
 * Returns file status for all exercises in a phase.
 * 
 * GET /api/workspace
 * Returns the workspace root path and whether it exists.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const exerciseId = searchParams.get('exercise');
  const phaseId = searchParams.get('phase');

  // Return workspace info
  if (!exerciseId && !phaseId) {
    return NextResponse.json({
      workspaceRoot: WORKSPACE_ROOT,
      exists: fs.existsSync(WORKSPACE_ROOT),
    });
  }

  // Single exercise file check
  if (exerciseId) {
    const exercise = roadmap
      .flatMap(p => p.exercises)
      .find(e => e.id === exerciseId);

    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    const result = checkFiles(exercise.turnInDir, exercise.expectedFiles);
    return NextResponse.json({
      exerciseId,
      turnInDir: exercise.turnInDir,
      ...result,
    });
  }

  // Phase file check
  if (phaseId) {
    const phase = roadmap.find(p => p.id === phaseId);
    if (!phase) {
      return NextResponse.json({ error: 'Phase not found' }, { status: 404 });
    }

    const exercises = phase.exercises.map(ex => ({
      exerciseId: ex.id,
      turnInDir: ex.turnInDir,
      ...checkFiles(ex.turnInDir, ex.expectedFiles),
    }));

    return NextResponse.json({ phaseId, exercises });
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}

/**
 * POST /api/workspace
 * Body: { phaseId: "phase-1" }
 * Scaffolds the directory structure for a phase.
 * 
 * POST /api/workspace
 * Body: { scaffoldAll: true }
 * Scaffolds ALL phases.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.scaffoldAll) {
      const allExercises = roadmap.flatMap(p =>
        p.exercises.map(e => ({ turnInDir: e.turnInDir, expectedFiles: e.expectedFiles }))
      );
      const created = scaffoldPhaseWorkspace(allExercises);
      return NextResponse.json({
        message: `Scaffolded ${created.length} directories.`,
        created,
        workspaceRoot: WORKSPACE_ROOT,
      });
    }

    const phaseId = body.phaseId;
    if (!phaseId) {
      return NextResponse.json({ error: 'phaseId is required' }, { status: 400 });
    }

    const phase = roadmap.find(p => p.id === phaseId);
    if (!phase) {
      return NextResponse.json({ error: 'Phase not found' }, { status: 404 });
    }

    const exercises = phase.exercises.map(e => ({
      turnInDir: e.turnInDir,
      expectedFiles: e.expectedFiles,
    }));

    const created = scaffoldPhaseWorkspace(exercises);
    return NextResponse.json({
      message: `Scaffolded ${created.length} new directories for ${phase.title}.`,
      created,
      workspaceRoot: WORKSPACE_ROOT,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
