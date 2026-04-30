"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { MoulinetteResult, MoulinetteStep, Exercise } from '@/lib/42-types';
import { saveProgressAction } from '@/app/actions';

interface CompletionTerminalProps {
  exerciseId: string;
  exercise: Exercise;
}

export default function CompletionTerminal({ exerciseId, exercise }: CompletionTerminalProps) {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<MoulinetteResult | null>(null);
  const [fileStatus, setFileStatus] = useState<{
    found: string[];
    missing: string[];
    turnInPath: string;
  } | null>(null);
  const [displayedSteps, setDisplayedSteps] = useState<number>(0);

  // Check file status on mount
  useEffect(() => {
    fetch(`/api/42-workspace?exercise=${exerciseId}`)
      .then(res => res.json())
      .then(data => {
        if (data.found || data.missing) {
          setFileStatus(data);
        }
      })
      .catch(() => {});
  }, [exerciseId]);

  // Animate step reveal
  useEffect(() => {
    if (result && displayedSteps < result.steps.length) {
      const timer = setTimeout(() => {
        setDisplayedSteps(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [result, displayedSteps]);

  const runMoulinette = async () => {
    setIsRunning(true);
    setResult(null);
    setDisplayedSteps(0);

    try {
      const res = await fetch('/api/42-moulinette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseId }),
      });
      const data: MoulinetteResult = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        exerciseId,
        passed: false,
        steps: [{
          name: 'Connection',
          status: 'fail',
          output: 'Failed to reach Moulinette server.',
        }],
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleValidate = () => {
    if (!result?.passed) return;

    try {
      saveProgressAction({
        file_path: `42-prep:${exerciseId}`,
        status: "completed",
        timestamp: Date.now(),
      }).catch(console.error);
      router.push('/track/42-prep');
    } catch (e) {
      console.error("Action error:", e);
    }
  };

  const getStepIcon = (step: MoulinetteStep) => {
    switch (step.status) {
      case 'pass': return <CheckCircle2 size={16} className="text-[#00FF41]" />;
      case 'fail': return <XCircle size={16} className="text-[#FF4136]" />;
      case 'running': return <Loader2 size={16} className="text-yellow-400 animate-spin" />;
      case 'skip': return <Clock size={16} className="text-[#666]" />;
    }
  };

  const getStepLabel = (step: MoulinetteStep) => {
    switch (step.status) {
      case 'pass': return 'OK';
      case 'fail': return 'KO';
      case 'running': return '...';
      case 'skip': return 'SKIP';
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-12">

      {/* File Status Panel */}
      {fileStatus && (
        <div className="bg-[#0A0A0A] border border-[#222] p-4 mb-4 font-mono text-xs">
          <div className="text-[#666] uppercase tracking-widest mb-3 text-[10px]">
            Workspace: <span className="text-[#888]">{fileStatus.turnInPath}</span>
          </div>
          <div className="space-y-1">
            {fileStatus.found.map(f => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-[#00FF41]" />
                <span className="text-[#00FF41]">{f}</span>
              </div>
            ))}
            {fileStatus.missing.map(f => (
              <div key={f} className="flex items-center gap-2">
                <XCircle size={12} className="text-[#FF4136]" />
                <span className="text-[#FF4136]">{f}</span>
                <span className="text-[#666]">— missing</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Moulinette Terminal */}
      <div className="bg-[#050505] border-2 border-[#1A1A1A]">
        <div className="bg-[#111] border-b-2 border-[#1A1A1A] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal size={20} className="text-[#00FF41]" />
            <h2 className="text-[#E0E0E0] font-mono text-sm uppercase tracking-widest font-bold">
              Moulinette v4.2
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="text-[#666]">TARGET:</span>
            <span className="text-[#00FF41] bg-[#0A0A0A] px-2 py-1">{exercise.turnInDir}/</span>
            <span className={`px-2 py-1 uppercase font-bold ${
              exercise.validationType === 'c' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {exercise.validationType}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Results Display */}
          {result && (
            <div className="space-y-2">
              {result.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-300 ${
                    idx < displayedSteps ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  {idx < displayedSteps && (
                    <div className={`border-l-2 ${
                      step.status === 'pass' ? 'border-[#00FF41]' : 'border-[#FF4136]'
                    }`}>
                      <div className="flex items-center justify-between px-4 py-2 bg-[#0A0A0A]">
                        <div className="flex items-center gap-3">
                          {getStepIcon(step)}
                          <span className="font-mono text-xs uppercase tracking-wider text-[#E0E0E0]">
                            {step.name}
                          </span>
                        </div>
                        <span className={`font-mono text-xs font-bold ${
                          step.status === 'pass' ? 'text-[#00FF41]' : 'text-[#FF4136]'
                        }`}>
                          {getStepLabel(step)}
                        </span>
                      </div>
                      {step.output && (
                        <pre className="px-4 py-3 text-[11px] font-mono text-[#888] bg-[#050505] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                          {step.output}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Final Verdict */}
              {displayedSteps >= result.steps.length && (
                <div className={`mt-6 p-4 font-mono text-center uppercase tracking-[0.3em] font-black text-lg border-2 ${
                  result.passed
                    ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]'
                    : 'bg-[#FF4136]/10 text-[#FF4136] border-[#FF4136]'
                }`}>
                  {result.passed ? '✔ ALL TESTS PASSED' : '✘ MOULINETTE FAILED'}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={runMoulinette}
              disabled={isRunning}
              className={`flex-1 py-4 px-6 font-black uppercase tracking-[0.15em] font-mono text-sm border-2 transition-all duration-300 ${
                isRunning
                  ? 'bg-[#111] text-yellow-400 border-yellow-400/50 cursor-wait'
                  : 'bg-[#1A1A1A] text-white border-[#333] hover:border-[#00FF41] hover:text-[#00FF41] hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] cursor-pointer'
              }`}
            >
              {isRunning ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 size={16} className="animate-spin" />
                  Running Moulinette...
                </span>
              ) : result ? (
                '↻ Re-Run Moulinette'
              ) : (
                '▶ Run Moulinette'
              )}
            </button>

            {result?.passed && displayedSteps >= result.steps.length && (
              <button
                onClick={handleValidate}
                className="py-4 px-8 bg-[#00FF41] text-black font-black uppercase tracking-[0.15em] font-mono text-sm border-2 border-[#00FF41] hover:bg-white hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(0,255,65,0.4)] cursor-pointer"
              >
                Validate ✔
              </button>
            )}
          </div>

          {/* Info */}
          {!result && !isRunning && (
            <div className="text-[10px] font-mono text-[#444] mt-4 space-y-1">
              <p>Pipeline: File Check → {exercise.validationType === 'c' ? 'Norminette → gcc -Wall -Wextra -Werror → Tests' : 'Permissions → Script Execution → Tests'}</p>
              <p>Expected files: {exercise.expectedFiles.join(', ')}</p>
              {exercise.allowedFunctions && exercise.allowedFunctions.length > 0 && (
                <p>Allowed functions: {exercise.allowedFunctions.join(', ')}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
