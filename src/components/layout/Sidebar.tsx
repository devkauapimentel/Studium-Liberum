"use client";

import { useState } from "react";
import {
  BookOpen,
  Search,
  Home,
  Settings,
  HelpCircle,
  Bot,
  ChevronRight,
  Library,
} from "lucide-react";
import type { Track } from "@/lib/types";

interface SidebarProps {
  tracks: Track[];
  activeTrack?: string;
  onTrackSelect: (trackId: string) => void;
  onNavigate: (page: string) => void;
  activePage: string;
}

export default function Sidebar({
  tracks,
  activeTrack,
  onTrackSelect,
  onNavigate,
  activePage,
}: SidebarProps) {
  const [tracksExpanded, setTracksExpanded] = useState(true);

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col border-r border-[var(--color-border)]"
      style={{
        width: "var(--sidebar-width)",
        background: "var(--color-bg-secondary)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{ background: "var(--gradient-blue)" }}>
          🏛️
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">Studium Liberum</h1>
          <p className="text-[11px] text-[var(--color-text-muted)]">Your Offline University</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {/* Main nav */}
        <NavItem
          icon={<Home size={18} />}
          label="Dashboard"
          active={activePage === "dashboard"}
          onClick={() => onNavigate("dashboard")}
        />
        <NavItem
          icon={<Search size={18} />}
          label="Buscar"
          shortcut="⌘K"
          active={activePage === "search"}
          onClick={() => onNavigate("search")}
        />
        <NavItem
          icon={<Bot size={18} />}
          label="Assistente IA"
          active={activePage === "ai"}
          onClick={() => onNavigate("ai")}
        />

        {/* Divider */}
        <div className="h-px bg-[var(--color-border)] my-3" />

        {/* Tracks */}
        <button
          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hover:text-[var(--color-text-secondary)] transition-colors"
          onClick={() => setTracksExpanded(!tracksExpanded)}
        >
          <ChevronRight
            size={14}
            className={`transition-transform ${tracksExpanded ? "rotate-90" : ""}`}
          />
          Tracks de Estudo
        </button>

        {tracksExpanded &&
          tracks.map((track) => (
            <NavItem
              key={track.id}
              icon={<span className="text-base">{track.icon}</span>}
              label={track.name.split("—")[0].trim()}
              active={activeTrack === track.id}
              onClick={() => onTrackSelect(track.id)}
              accentColor={track.color}
            />
          ))}

        {/* Divider */}
        <div className="h-px bg-[var(--color-border)] my-3" />

        <NavItem
          icon={<Library size={18} />}
          label="Biblioteca"
          active={activePage === "library"}
          onClick={() => onNavigate("library")}
        />
        <NavItem
          icon={<Settings size={18} />}
          label="Configurações"
          active={activePage === "settings"}
          onClick={() => onNavigate("settings")}
        />
        <NavItem
          icon={<HelpCircle size={18} />}
          label="Ajuda"
          active={activePage === "help"}
          onClick={() => onNavigate("help")}
        />
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[var(--color-border)]">
        <p className="text-[11px] text-[var(--color-text-muted)]">
          v0.1.0 · 100% Offline
        </p>
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  shortcut,
  active,
  onClick,
  accentColor,
}: {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  active: boolean;
  onClick: () => void;
  accentColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all ${
        active
          ? "text-[var(--color-text-primary)] font-medium"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
      }`}
      style={
        active
          ? {
              background: accentColor
                ? `${accentColor}15`
                : "var(--color-bg-hover)",
              borderLeft: accentColor
                ? `3px solid ${accentColor}`
                : undefined,
            }
          : undefined
      }
    >
      <span className="opacity-80">{icon}</span>
      <span className="flex-1 text-left truncate">{label}</span>
      {shortcut && (
        <kbd className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 rounded font-mono">
          {shortcut}
        </kbd>
      )}
    </button>
  );
}
