# Contributing to Studium Liberum

## Git Workflow

### Branches

| Branch | Purpose | Merges to |
|--------|---------|-----------|
| `main` | Production-ready releases | — |
| `dev` | Active development | `main` (via PR) |
| `feat/*` | New features | `dev` |
| `fix/*` | Bug fixes | `dev` |

```
main ─────────────────────────────── stable releases
  │
  └── dev ────────────────────────── active development
        │
        ├── feat/search-engine ───── feature work
        ├── feat/ai-chat
        └── fix/pdf-viewer-crash
```

**Rules:**
- Never commit directly to `main`
- `dev` is the working branch — commit here for small changes
- Create `feat/*` or `fix/*` branches for bigger features
- Merge to `main` only when a version is stable and tested

---

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) — simple and standard.

```
<type>: <description>
```

**Types:**

| Type | When to use | Example |
|------|------------|---------|
| `feat` | New feature | `feat: add unified search engine` |
| `fix` | Bug fix | `fix: video player not resuming` |
| `docs` | Documentation only | `docs: update README with setup instructions` |
| `style` | Formatting, no logic change | `style: fix indentation in search component` |
| `refactor` | Code change without new feature or fix | `refactor: extract search logic to hook` |
| `chore` | Maintenance, deps, config | `chore: update dependencies` |
| `test` | Adding or fixing tests | `test: add search API integration test` |

**Rules:**
- Use present tense: `add feature` not `added feature`
- Use lowercase: `feat: add search` not `Feat: Add Search`
- Keep it under 72 characters
- No period at the end

---

### Versioning

We follow [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH
```

| Part | When to increment | Example |
|------|------------------|---------|
| MAJOR | Breaking changes | 1.0.0 → 2.0.0 |
| MINOR | New features (backwards compatible) | 1.0.0 → 1.1.0 |
| PATCH | Bug fixes | 1.0.0 → 1.0.1 |

**Current version:** `0.1.0` (initial structure)

**Release process:**
1. Work on `dev` branch
2. When stable, create PR `dev → main`
3. Update `CHANGELOG.md` with new version
4. Tag the release: `git tag v0.2.0`
5. Push tags: `git push --tags`

---

### Changelog

Update `CHANGELOG.md` with every PR to `main`. Format:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing features

### Fixed
- Bug fixes

### Removed
- Removed features
```

---

## Project Structure

```
studium-liberum/
├── library/              ← Study content (local only, .gitignored)
│   ├── uninter/          ← University courses
│   ├── rocketseat/       ← Fullstack formation
│   ├── 42-prep/          ← Piscina preparation
│   ├── dev-refs/         ← Books, docs, references
│   └── kiwix/            ← Offline Wikipedia/SO (ZIM files)
│
├── src/                  ← Next.js application
├── scripts/              ← Automation scripts
├── docs/                 ← Project documentation
├── data/                 ← SQLite database (gitignored)
└── public/               ← Static assets
```

**Note:** The `library/` folder contains personal study materials and is `.gitignored`.
The application code in `src/` is what gets versioned and pushed to GitHub.
