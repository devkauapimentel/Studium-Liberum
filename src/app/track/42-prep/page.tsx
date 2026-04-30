"use client";

import { use42Progress } from "@/hooks/use-42-progress";
import { roadmap, gameRules } from "@/lib/42-data";
import { Terminal, AlertTriangle, ShieldAlert, FolderOpen, ChevronRight } from "lucide-react";
import { useState } from "react";

import Link from 'next/link';

export default function Home() {
  const { completed, resetProgress, isLoaded } = use42Progress();
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [scaffolding, setScaffolding] = useState(false);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center font-mono opacity-50">INITIALIZING SYSTEM...</div>;

  const totalExercises = roadmap.reduce((acc, phase) => acc + phase.exercises.length, 0);
  const completedExercises = roadmap.reduce((acc, phase) => {
    return acc + phase.exercises.filter((ex) => completed[ex.id]).length;
  }, 0);

  const overallProgress = totalExercises === 0 ? 0 : Math.round((completedExercises / totalExercises) * 100);

  const scaffoldAll = async () => {
    setScaffolding(true);
    try {
      const res = await fetch('/api/42-workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scaffoldAll: true }),
      });
      const data = await res.json();
      alert(`[OK] ${data.message}\nWorkspace: ${data.workspaceRoot}`);
    } catch {
      alert('[ERROR] Failed to scaffold workspace.');
    } finally {
      setScaffolding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans p-4 sm:p-8 flex flex-col selection:bg-[#00FF41] selection:text-black">
      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 min-h-0 space-y-8">
        {/* Header section */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-end border-b-2 border-[#1A1A1A] pb-4 mb-4 gap-6">
          <div>
            <a href="http://localhost:3000" className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#666] hover:text-[#00FF41] mb-4 uppercase tracking-widest transition-colors">
              <ChevronRight size={12} className="rotate-180" />
              Voltar ao Studium Liberum
            </a>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white flex items-center gap-4 leading-none">
              <Terminal size={48} className="text-[#00FF41] shrink-0" />
              42 RIO PISCINA
            </h1>
            <p className="font-mono text-xs text-[#666] tracking-[0.2em] mt-2 uppercase underline decoration-[#00FF41] underline-offset-4">Offline Survival Tracker // 26 Days // Moulinette Enabled</p>
          </div>
          
          <div className="flex flex-col items-end gap-2 shrink-0 text-right">
            <div className="text-[10px] font-mono text-[#444] mb-1">
              SYSTEM LOAD: <span className={overallProgress === 100 ? "text-[#00FF41]" : "text-[#E0E0E0]"}>{overallProgress}%</span>
              <span className="ml-4">{completedExercises}/{totalExercises} EXERCISES</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`w-3 h-3 ${i < Math.ceil(overallProgress / 20) ? "bg-[#00FF41]" : "bg-[#333]"}`}></div>
              ))}
            </div>
            <div className="w-full md:w-80 h-1 bg-[#1A1A1A] mt-2 overflow-hidden">
              <div 
                className="h-full bg-[#00FF41] transition-all duration-500 ease-in-out" 
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
          
          {/* Main Content - Phases Track */}
          <main className="lg:col-span-8 flex flex-col space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Preparation Modules</h2>
              <div className="flex gap-2">
                <button 
                  onClick={scaffoldAll}
                  disabled={scaffolding}
                  className="font-mono text-[10px] bg-[#1A1A1A] px-3 py-1.5 hover:bg-[#00FF41]/20 hover:text-[#00FF41] transition-colors uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderOpen size={12} />
                  {scaffolding ? 'Creating...' : 'Init Workspace'}
                </button>
                {completedExercises > 0 && (
                  <button 
                    onClick={resetProgress}
                    className="font-mono text-[10px] bg-[#1A1A1A] px-2 py-1 hover:bg-red-500/20 hover:text-red-500 transition-colors uppercase cursor-pointer"
                  >
                    Factory Reset
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {roadmap.map((phase, index) => {
                const phaseTotal = phase.exercises.length;
                const phaseCompleted = phase.exercises.filter((ex) => completed[ex.id]).length;
                const isComplete = phaseTotal > 0 && phaseCompleted === phaseTotal;
                
                let isLocked = false;
                if (index > 0) {
                  const prevPhase = roadmap[index - 1];
                  if (prevPhase.gatekeeperExamId && !completed[prevPhase.gatekeeperExamId]) {
                    isLocked = true;
                  }
                }

                // Deselect if it becomes locked
                const isActive = selectedPhase === phase.id && !isLocked;

                return (
                  <div 
                    key={phase.id} 
                    className={`relative transition-colors duration-200 border-l-2 ${isComplete ? 'border-[#00FF41]' : isActive ? 'border-[#00FF41]' : isLocked ? 'border-[#111] opacity-40' : 'border-[#333] opacity-50'}`}
                  >
                    {/* Phase Header */}
                    <div 
                      className={`pl-4 flex flex-col group justify-between items-stretch ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => {
                        if (!isLocked) setSelectedPhase(isActive ? null : phase.id);
                      }}
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <span className={`font-mono text-[10px] ${isActive || isComplete ? 'text-[#00FF41]' : ''}`}>
                          PHASE 0{index + 1}
                        </span>
                        <span className={`text-[10px] ${isActive && phaseCompleted < phaseTotal ? 'text-[#00FF41] animate-pulse' : isComplete ? 'text-[#00FF41]' : 'text-[#666]'}`}>
                          {isLocked ? 'LOCKED' : isComplete ? 'DONE' : isActive ? 'ACTIVE' : 'PENDING'}
                          {!isLocked && ` — ${phaseCompleted}/${phaseTotal}`}
                        </span>
                      </div>
                      <h3 className={`font-bold text-lg leading-tight uppercase tracking-tight transition-colors ${isComplete ? 'text-white' : isActive ? 'text-white' : 'text-[#666]'}`}>
                        {phase.title}
                        <span className="font-mono text-[10px] ml-3 text-[#666] tracking-widenormal">({phase.days})</span>
                      </h3>
                      {!isLocked && (
                        <div className="w-full h-1 bg-[#1A1A1A] mt-3">
                          <div className="h-full bg-[#00FF41] transition-all duration-300" style={{ width: phaseTotal > 0 ? `${(phaseCompleted / phaseTotal) * 100}%` : '0%' }}></div>
                        </div>
                      )}
                    </div>

                    {/* Phase Exercises */}
                    {!isLocked && (
                      <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-[5000px] mt-6 ml-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-[11px] font-mono text-[#888] mb-6 italic leading-relaxed">{phase.description}</p>
                          
                        <div className="space-y-2">
                          {phase.exercises.map((exercise, idx) => {
                            const isChecked = !!completed[exercise.id];
                            return (
                              <Link
                                href={`/track/42-prep/subject/${exercise.id}`}
                                key={exercise.id}
                                className={`w-full text-left p-4 flex gap-4 items-center justify-between border-l-4 transition-all group/item ${
                                  exercise.isExam 
                                    ? 'border-red-500 bg-[#1A0505] hover:bg-[#2A0505]' 
                                    : isChecked
                                      ? 'border-[#00FF41] bg-[#0A1A0A] hover:bg-[#112211]'
                                      : 'border-[#333] bg-[#111] hover:bg-[#151515] hover:border-[#00FF41]'
                                }`}
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-mono ${isChecked ? 'text-[#00FF41]' : exercise.isExam ? 'text-red-500' : 'text-[#666]'}`}>
                                      {exercise.isExam ? '⚠ EXAM' : `EX0${idx}`}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#444]">{"//"}</span>
                                    <span className={`text-[10px] font-mono ${isChecked ? 'text-[#00FF41]' : 'text-[#666]'}`}>
                                      {exercise.turnInDir}/
                                    </span>
                                    {isChecked && (
                                      <span className="text-[10px] font-mono text-[#00FF41] font-bold">✔ VALIDATED</span>
                                    )}
                                  </div>
                                  <h4 className={`font-bold uppercase tracking-wider text-sm ${exercise.isExam ? 'text-red-400' : 'text-white'}`}>
                                    {exercise.title}
                                  </h4>
                                  <p className="text-[11px] text-[#888] font-mono mt-1 leading-relaxed truncate">
                                    {exercise.description}
                                  </p>
                                  <div className="flex gap-2 mt-2">
                                    {exercise.expectedFiles.map(f => (
                                      <span key={f} className="text-[9px] font-mono bg-[#0A0A0A] px-1.5 py-0.5 text-[#666]">{f}</span>
                                    ))}
                                    <span className={`text-[9px] font-mono px-1.5 py-0.5 uppercase font-bold ${
                                      exercise.validationType === 'c' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-400'
                                    }`}>{exercise.validationType}</span>
                                  </div>
                                </div>
                                <ChevronRight size={16} className="text-[#444] group-hover/item:text-[#00FF41] transition-colors shrink-0" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </main>

          {/* Sidebar - Rules */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:pl-4">
            <div className="sticky top-8 space-y-6">
              
              <div className="bg-[#00FF41] p-4 text-black">
                <h2 className="font-black text-xl leading-none uppercase mb-2 italic flex items-center gap-2">
                  <ShieldAlert size={20} />
                  {gameRules.title}
                </h2>
                <ul className="font-mono text-[11px] leading-tight space-y-2 mt-4">
                  {gameRules.items.map((rule, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span className={idx === gameRules.items.length - 1 ? "font-bold underline italic uppercase" : ""}>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compilation Standard */}
              <div className="bg-[#111] border border-[#222] p-4 flex flex-col">
                <h2 className="text-[10px] font-mono font-bold text-[#666] mb-4 tracking-widest uppercase">Compilation Standard</h2>
                <div className="bg-black p-3 font-mono text-[11px] text-[#00FF41] leading-relaxed">
                  <span className="text-[#666]">$</span> gcc <span className="text-red-400">-Wall -Wextra -Werror</span> *.c
                </div>
                <div className="mt-4 bg-black p-3 font-mono text-[11px] text-[#00FF41] leading-relaxed">
                  <span className="text-[#666]">$</span> norminette *.c
                </div>
              </div>

              {/* 42 Header */}
              <div className="bg-[#111] border border-[#222] p-4 flex flex-col">
                <h2 className="text-[10px] font-mono font-bold text-[#666] mb-4 tracking-widest uppercase">Target Standard</h2>
                <div className="bg-black p-3 font-mono text-[9px] text-[#444] leading-relaxed">
                  {"/* ************************************** */"}<br/>
                  {"/*                                          */"}<br/>
                  {"/*    42_RIO_PREP         :::      :::::::: */"}<br/>
                  {"/*    Makefile          :+:      :+:    :+: */"}<br/>
                  {"/*    By: user42        +:+ +:+     +:+     */"}<br/>
                  {"/*    Created: 2026     +#+  +:+      +#+   */"}<br/>
                  {"/* ************************************** */"}
                </div>
                <div className="mt-4 flex items-start gap-2 text-[10px] text-[#FF4136] font-mono border-t border-[#222] pt-4">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <p>Violation of the rules will result in compilation failure under the Piscina conditions. Respect the Norm. Build from scratch.</p>
                </div>
              </div>

              {/* Moulinette Info */}
              <div className="bg-[#111] border border-[#222] p-4 flex flex-col">
                <h2 className="text-[10px] font-mono font-bold text-[#00FF41] mb-3 tracking-widest uppercase">Moulinette — Automated</h2>
                <div className="font-mono text-[10px] text-[#888] space-y-1.5">
                  <p>1. File Check — verifica arquivos no turn-in dir</p>
                  <p>2. Norminette — valida estilo do código C</p>
                  <p>3. Compilation — gcc -Wall -Wextra -Werror</p>
                  <p>4. Tests — executa e compara output</p>
                  <div className="border-t border-[#222] pt-2 mt-3">
                    <p className="text-[#FF4136]">Sem checkbox manual. A Moulinette decide.</p>
                  </div>
                </div>
              </div>

            </div>
          </aside>
          
        </div>
        
        <footer className="mt-8 flex justify-between items-center text-[10px] font-mono text-[#444] border-t border-[#1A1A1A] pt-4 pb-8">
          <div className="flex gap-4">
            <span>POPOS_ENV // LINUX_STABLE</span>
            <span>STORAGE: LOCAL_IDB</span>
            <span>MOULINETTE: ACTIVE</span>
          </div>
          <div className="tracking-widest uppercase text-right">
            Focus mode: <span className="text-[#00FF41]">ENABLED</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
