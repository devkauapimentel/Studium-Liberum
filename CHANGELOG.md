# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Semantic File Engine v2.0**: Automatic classification of files (video, pdf, document, code, resource)
- **Syllabus Parser**: Reads `sumario_rocketseat.txt` for chronological ordering of modules
- **.url Shortcut Support**: Parses Windows `.url` files and renders clickable external links
- **PDF Attachment Grouping**: PDFs in the same folder as videos are grouped as "Material de Apoio"
- **Figma Downloads**: `.fig`/`.figma` files get a "Baixar Figma" action button
- **Contextual Action Buttons**: Each file type gets its own action (Assistir, Abrir, Abrir Link, etc.)

### Fixed
- **Video Streaming Engine v3.0**: Rewrote range API to use 256KB ReadableStream chunks
- **AbortError Crash**: Browser seek/speed changes no longer trigger Next.js dev overlay
- **File Descriptor Leaks**: `cancel()` handler ensures file handles are always closed
- **Hydration Mismatch**: Progress bar uses `suppressHydrationWarning` for dynamic state
- **Firefox/Zen Browser Codec Crash**: Diagnosed `mGMP not initialized`. Confirmed as a Linux-level missing codec (`ffmpeg`) constraint. API optimized to `200 OK` continuous buffer or exact-byte streaming to mitigate, but hardware/OS decoders dictate the ultimate behavior.

### Changed
- **Video Player → Cinema Mode**: Fullscreen immersive player with glassmorphism floating controls
- **Auto-hide Controls**: Header and controls fade out after 3s of inactivity during playback
- **Cursor Auto-hide**: Mouse cursor disappears during playback for distraction-free viewing
- **Smart Back Button**: O botão de voltar no Video Player agora calcula a hierarquia do diretório atual e direciona o usuário para a página de trilha com a pasta e subpastas abertas (Auto-Expansão).

### Database & State (Fase 3.5 & 4)
- **SQLite Progress Migration**: Migração total do `localStorage` para `better-sqlite3`. A fonte única de verdade é `studium.db`.
- **Global Track Progress**: Card das Trilhas no Dashboard recalculam porcentagem de conclusão usando base em Total de Vídeos / Assistidos caso não haja "Fases" mapeadas.
- **Player State Leak Fix**: React agora reinicia corretamente estados como `Concluído` e `Tela de Fim` quando a prop `filePath` muda via Next.js router.
- **Drag & Drop Progress Bar Fix**: Implementado Range Input invisível para evitar chamadas pesadas do React no evento de Arrastar (`onChange`). O tempo do vídeo só é setado no `onMouseUp` para performance nativa. CSS lag delay removido.
- **Range Stream Fix**: Re-habilitado streaming de buffer por HTTP Range (`serveRange`) apenas caso solicitado no header, evitando reload do Chrome ao avançar o tempo (Seek).

## [0.1.0] - 2026-04-28

### Added
- Project initialization
- Repository structure with `library/`, `scripts/`, `docs/`
- `.gitignore` configured for Next.js + study content
- `CONTRIBUTING.md` with Git workflow standards
- `CHANGELOG.md` following Keep a Changelog format
- Initial dashboard with track cards and progress rings
- Track detail pages with file browser
- Video player and PDF viewer
- Media serve API with range request support
- Sidebar navigation with all tracks
- Full Next.js Link-based routing (no 404s)
