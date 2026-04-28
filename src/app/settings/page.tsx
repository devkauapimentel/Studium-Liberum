import { getConfig } from "@/lib/config";
import Link from "next/link";
import { ArrowLeft, Settings as SettingsIcon, Palette, Globe, Bot, Timer, BookOpen } from "lucide-react";

export default function SettingsPage() {
  const config = getConfig();

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      <header className="flex items-center gap-4 px-8 border-b border-[var(--color-border)]"
        style={{ height: "var(--header-height)", background: "var(--color-bg-secondary)" }}>
        <Link href="/" className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <SettingsIcon size={20} className="text-[var(--color-text-muted)]" />
        <h2 className="text-lg font-semibold">Configurações</h2>
      </header>

      <div className="max-w-3xl mx-auto p-8 space-y-6 animate-fade-in">
        {/* Tracks */}
        <section className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={20} className="text-[var(--color-accent-blue)]" />
            <h3 className="font-semibold">Tracks de Estudo</h3>
          </div>
          <div className="space-y-2">
            {config.tracks.map((track) => (
              <Link key={track.id} href={`/track/${track.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
                <span>{track.icon}</span>
                <span className="flex-1 text-sm">{track.name}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{track.subjects?.length ?? 0} matérias</span>
              </Link>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Para adicionar ou modificar tracks, edite <code className="font-mono bg-[var(--color-bg-tertiary)] px-1 py-0.5 rounded">data/config.json</code> ou use a API: <code className="font-mono bg-[var(--color-bg-tertiary)] px-1 py-0.5 rounded">POST /api/tracks</code>
          </p>
        </section>

        {/* Features */}
        <section className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon size={20} className="text-[var(--color-accent-purple)]" />
            <h3 className="font-semibold">Features</h3>
          </div>
          <div className="space-y-3">
            <FeatureRow icon={<Bot size={16} />} label="Ollama (IA)" enabled={config.features.ollama.enabled}
              detail={`Modelo: ${config.features.ollama.defaultModel}`} />
            <FeatureRow icon={<Globe size={16} />} label="Kiwix (Wiki offline)" enabled={config.features.kiwix.enabled}
              detail={`Porta: ${config.features.kiwix.port}`} />
            <FeatureRow icon={<Timer size={16} />} label="Countdown" enabled={config.features.countdown.enabled}
              detail={config.features.countdown.enabled ? `${config.features.countdown.label}: ${config.features.countdown.date}` : "Desativado"} />
          </div>
        </section>

        {/* Theme */}
        <section className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette size={20} className="text-[var(--color-accent-amber)]" />
            <h3 className="font-semibold">Aparência</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-text-secondary)]">Tema:</span>
            <span className="px-3 py-1 rounded-lg text-sm font-medium" style={{ background: "var(--color-bg-tertiary)" }}>
              🌙 Escuro
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-3">
            Idioma: {config.settings.language} · Auto-index: {config.settings.autoIndex ? "Ativado" : "Desativado"}
          </p>
        </section>

        <p className="text-xs text-[var(--color-text-muted)] text-center">
          Studium Liberum v{config.version} · 100% Offline
        </p>
      </div>
    </div>
  );
}

function FeatureRow({ icon, label, enabled, detail }: { icon: React.ReactNode; label: string; enabled: boolean; detail: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--color-bg-tertiary)" }}>
      {icon}
      <span className="flex-1 text-sm">{label}</span>
      <span className="text-xs text-[var(--color-text-muted)]">{detail}</span>
      <span className={`w-2 h-2 rounded-full ${enabled ? "bg-[var(--color-accent-green)]" : "bg-[var(--color-text-muted)]"}`} />
    </div>
  );
}
