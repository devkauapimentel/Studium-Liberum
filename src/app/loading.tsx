import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] text-[var(--color-text-muted)] animate-fade-in">
      <Loader2 size={32} className="animate-spin mb-4 text-[var(--color-accent-blue)]" />
      <p className="font-mono text-sm tracking-widest uppercase">Carregando Módulos...</p>
    </div>
  );
}
