import { getModuleContent } from '@/lib/42-markdown';
import { roadmap } from '@/lib/42-data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CompletionTerminal from '@/components/42-prep/CompletionTerminal';
import ExamTimer from '@/components/42-prep/ExamTimer';
import Link from 'next/link';
import { Terminal, FileCode, ShieldAlert, BookOpen, Ban, Search } from 'lucide-react';

/** Generate man page commands relevant to the exercise */
function getManPages(exercise: { allowedFunctions?: string[]; validationType: string; title: string }): string[] {
  const mans: string[] = [];
  if (exercise.allowedFunctions) {
    for (const fn of exercise.allowedFunctions) {
      mans.push(`man ${fn}`);
    }
  }
  // If the exercise title starts with ft_, the real function is the name without ft_
  const title = exercise.title;
  if (title.startsWith('ft_')) {
    const realFn = title.replace('ft_', '');
    mans.push(`man ${realFn}`);
  }
  if (exercise.validationType === 'c' && mans.length === 0) {
    mans.push('man ascii');
  }
  return [...new Set(mans)];
}

export default async function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Find exercise in roadmap
  const exercise = roadmap
    .flatMap(p => p.exercises)
    .find(e => e.id === id);

  // Try to load markdown content using subjectFile (module-level PDF)
  const content = exercise ? getModuleContent(exercise.subjectFile || id) : null;

  if (!exercise) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-red-500 font-mono p-8 flex flex-col items-center justify-center selection:bg-red-500 selection:text-black">
        <div className="border-4 border-red-500 p-8 max-w-2xl w-full">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 animate-pulse">Fatal Error</h1>
          <p className="text-red-400 text-lg uppercase tracking-widest border-t-2 border-red-500 pt-4">Module [{id}] not localized in databank.</p>
          <Link href="/track/42-prep" className="mt-8 inline-block bg-red-500 text-black px-6 py-3 font-bold uppercase hover:bg-white hover:text-black transition-colors">Return to Root</Link>
        </div>
      </div>
    );
  }

  // Find the phase this exercise belongs to
  const phase = roadmap.find(p => p.exercises.some(e => e.id === id));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] p-4 sm:p-8 font-sans selection:bg-[#00FF41] selection:text-black">
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <Link href="/track/42-prep" className="text-[#888] font-mono text-xs hover:text-white uppercase flex items-center gap-2 transition-colors">
          <span className="text-[#00FF41]">&lt;</span> Return to Dashboard
        </Link>
        {phase && (
          <span className="font-mono text-[10px] text-[#666] uppercase tracking-widest">
            {phase.title} {"//"} {phase.days}
          </span>
        )}
      </div>

      {/* Exercise Info Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className={`p-6 border-2 ${exercise.isExam ? 'border-red-500/50 bg-[#1A0505]' : 'border-[#1A1A1A] bg-[#111]'}`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${exercise.isExam ? 'text-red-500' : 'text-[#00FF41]'}`}>
                {exercise.isExam ? '⚠ GATEKEEPER EXAM' : `EXERCISE // ${exercise.turnInDir}`}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                {exercise.title}
              </h1>
              <p className="text-[#888] font-mono text-sm mt-2 leading-relaxed">
                {exercise.description}
              </p>
            </div>
            {exercise.isExam ? (
              <ShieldAlert size={32} className="text-red-500 shrink-0" />
            ) : (
              <FileCode size={32} className="text-[#00FF41] shrink-0" />
            )}
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-[#222]">
            <div className="bg-[#0A0A0A] p-3">
              <div className="font-mono text-[9px] text-[#666] uppercase tracking-widest mb-1">Turn-in Dir</div>
              <div className="font-mono text-xs text-white">{exercise.turnInDir}/</div>
            </div>
            <div className="bg-[#0A0A0A] p-3">
              <div className="font-mono text-[9px] text-[#666] uppercase tracking-widest mb-1">Files</div>
              <div className="font-mono text-xs text-white">{exercise.expectedFiles.join(', ')}</div>
            </div>
            <div className="bg-[#0A0A0A] p-3">
              <div className="font-mono text-[9px] text-[#666] uppercase tracking-widest mb-1">Type</div>
              <div className={`font-mono text-xs font-bold uppercase ${exercise.validationType === 'c' ? 'text-blue-400' : 'text-yellow-400'}`}>
                {exercise.validationType}
              </div>
            </div>
            <div className="bg-[#0A0A0A] p-3">
              <div className="font-mono text-[9px] text-[#666] uppercase tracking-widest mb-1">Allowed Fn</div>
              <div className="font-mono text-xs text-white">
                {exercise.allowedFunctions && exercise.allowedFunctions.length > 0
                  ? exercise.allowedFunctions.join(', ')
                  : 'None'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 42 METHODOLOGY — How to solve this exercise */}
      <div className="max-w-4xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Allowed Resources */}
        <div className="bg-[#111] border border-[#222] p-4">
          <h3 className="font-mono text-[10px] text-[#00FF41] uppercase tracking-widest mb-3 flex items-center gap-2">
            <BookOpen size={14} />
            Allowed Resources
          </h3>
          <div className="space-y-2 font-mono text-[11px]">
            {getManPages(exercise).map((cmd, i) => (
              <div key={i} className="bg-[#0A0A0A] px-2 py-1.5 text-[#00FF41] flex items-center gap-2">
                <span className="text-[#666]">$</span> {cmd}
              </div>
            ))}
            <div className="text-[#888] text-[10px] mt-2 space-y-1">
              <p>• Google: search <span className="text-white">concepts</span> only</p>
              <p>• Peers: ask about <span className="text-white">concepts</span></p>
              <p>• Your brain + terminal</p>
            </div>
          </div>
        </div>

        {/* How to Solve */}
        <div className="bg-[#111] border border-[#222] p-4">
          <h3 className="font-mono text-[10px] text-[#00FF41] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Search size={14} />
            How to Solve (42 Way)
          </h3>
          <ol className="font-mono text-[10px] text-[#888] space-y-1.5 list-decimal list-inside">
            <li>Read the subject <span className="text-white">3 times</span></li>
            <li>Run <span className="text-[#00FF41]">man</span> for the function</li>
            <li>Try to code it <span className="text-white">yourself</span></li>
            <li>Compile: <span className="text-[#00FF41]">gcc -Wall -Wextra -Werror</span></li>
            <li>Test with your own <span className="text-white">main.c</span></li>
            <li>Run <span className="text-[#00FF41]">norminette</span></li>
            <li>Stuck 30min? Google the <span className="text-white">concept</span></li>
            <li>Submit to <span className="text-[#00FF41]">Moulinette</span></li>
          </ol>
        </div>

        {/* Forbidden */}
        <div className="bg-[#1A0505] border border-red-500/30 p-4">
          <h3 className="font-mono text-[10px] text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Ban size={14} />
            Forbidden (= Expulsion)
          </h3>
          <ul className="font-mono text-[10px] text-red-400/80 space-y-1.5">
            <li>✘ ChatGPT / Copilot / Any AI</li>
            <li>✘ Copy code from GitHub</li>
            <li>✘ YouTube solution tutorials</li>
            <li>✘ Ask someone for the answer</li>
            <li>✘ Use forbidden functions</li>
            <li>✘ Skip norminette</li>
          </ul>
          <div className="mt-3 text-[9px] text-red-500/60 border-t border-red-500/20 pt-2">
            At 42: cheating = -42 = immediate blackhole
          </div>
        </div>
      </div>

      {/* Markdown Content (if available) */}
      {content && (
        <div className="max-w-4xl mx-auto border-2 border-[#1A1A1A] bg-[#111] shadow-[8px_8px_0px_0px_#00FF41]">
          <header className="border-b-2 border-[#1A1A1A] p-4 sm:p-6 bg-[#050505] flex justify-between items-center gap-4">
            <div className="font-mono text-xs text-[#00FF41] uppercase tracking-widest flex items-center gap-3">
              <Terminal size={18} /> Subject PDF
            </div>
            <div className="font-mono text-[10px] text-[#666] uppercase bg-[#1A1A1A] px-3 py-1">Target: {id}.md</div>
          </header>
          
          <div className="p-4 sm:p-8 lg:p-12">
            <div className="prose prose-invert max-w-none 
              prose-headings:font-black prose-headings:text-white prose-headings:tracking-tighter prose-headings:uppercase
              prose-h1:text-4xl prose-h1:border-b-2 prose-h1:border-[#00FF41] prose-h1:pb-4 prose-h1:mb-12
              prose-h2:text-2xl prose-h2:text-[#E0E0E0] prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:text-[#00FF41] hover:prose-h3:bg-[#00FF41] hover:prose-h3:text-black transition-colors prose-h3:inline-block prose-h3:px-2 prose-h3:-ml-2 prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-lg prose-h4:text-white prose-h4:mt-8
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-sans
              prose-a:text-[#00FF41] prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-2
              prose-code:bg-[#050505] prose-code:text-[#00FF41] prose-code:font-mono prose-code:px-1.5 prose-code:py-0.5 prose-code:border prose-code:border-[#333] prose-code:rounded-none prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#050505] prose-pre:border-2 prose-pre:border-[#333] prose-pre:rounded-none prose-pre:p-4
              prose-hr:border-[#333] prose-hr:border-2 prose-hr:my-8
              prose-strong:text-white prose-strong:font-black
              prose-li:text-gray-300 prose-li:my-1
              prose-ul:list-square prose-ul:marker:text-[#00FF41]
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {/* Exam Timer (for exam exercises) */}
      {exercise.isExam && exercise.examDurationMinutes && (
        <ExamTimer
          exerciseId={exercise.id}
          durationMinutes={exercise.examDurationMinutes}
          onTimeUp={() => {
            // Timer expired — the Moulinette section below will still work
          }}
        />
      )}

      {/* Moulinette Terminal */}
      <CompletionTerminal exerciseId={id} exercise={exercise} />
    </div>
  );
}
