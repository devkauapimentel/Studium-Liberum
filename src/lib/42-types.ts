export interface TestCase {
  name: string;
  input?: string;
  expectedOutput: string;
  testMain?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  isExam?: boolean;
  turnInDir: string;
  expectedFiles: string[];
  validationType: 'shell' | 'c' | 'manual';
  allowedFunctions?: string[];
  testCases?: TestCase[];
  examDurationMinutes?: number;
  subjectFile?: string;
}

export interface Phase {
  id: string;
  title: string;
  days: string;
  description: string;
  xpRequirement: string;
  gatekeeperExamId?: string;
  exercises: Exercise[];
}

export interface Rules {
  title: string;
  items: string[];
}

export interface MoulinetteStep {
  name: string;
  status: 'pass' | 'fail' | 'skip' | 'running';
  output?: string;
}

export interface MoulinetteResult {
  exerciseId: string;
  passed: boolean;
  steps: MoulinetteStep[];
  timestamp: string;
}
