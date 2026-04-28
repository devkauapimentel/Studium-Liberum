#!/bin/bash
# ═══════════════════════════════════════
# Studium Liberum — Backup Personal Config
# ═══════════════════════════════════════
# Pushes config.json and progress.json to a special branch
# on the PRIVATE repo only. Never touches the public repo.

set -e
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo "🔒 Backing up personal config..."

# Ensure we're on a clean state
CURRENT_BRANCH=$(git branch --show-current)

# Create temp copies
cp data/config.json /tmp/studium-config.json 2>/dev/null || true
cp data/progress.json /tmp/studium-progress.json 2>/dev/null || true

# Switch to personal-config branch
git stash --quiet 2>/dev/null || true
git checkout personal-config 2>/dev/null || git checkout -b personal-config

# Copy config files to root (so git can track them)
cp /tmp/studium-config.json config.json 2>/dev/null || true
cp /tmp/studium-progress.json progress.json 2>/dev/null || true

# Commit and push ONLY to private
git add config.json progress.json 2>/dev/null
git commit -m "chore: backup personal config $(date +%Y-%m-%d_%H:%M)" --quiet 2>/dev/null || echo "No changes to backup"
git push private personal-config --quiet 2>/dev/null

# Return to original branch
git checkout "$CURRENT_BRANCH" --quiet
git stash pop --quiet 2>/dev/null || true

# Cleanup
rm -f /tmp/studium-config.json /tmp/studium-progress.json

echo "✅ Config backed up to private repo (branch: personal-config)"
