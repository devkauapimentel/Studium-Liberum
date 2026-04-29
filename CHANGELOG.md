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
- **Cache Corruption**: Added `Cache-Control: no-store` to prevent stale range request caching

### Changed
- **Video Player → Cinema Mode**: Fullscreen immersive player with glassmorphism floating controls
- **Auto-hide Controls**: Header and controls fade out after 3s of inactivity during playback
- **Cursor Auto-hide**: Mouse cursor disappears during playback for distraction-free viewing

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
