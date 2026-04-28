#!/bin/bash
# Push to both remotes (public + private)
BRANCH=$(git branch --show-current)
echo "📤 Pushing '$BRANCH' to both remotes..."
echo ""
echo "→ origin (public)..."
git push origin "$BRANCH" 2>&1
echo ""
echo "→ private (personal)..."
git push private "$BRANCH" 2>&1
echo ""
echo "✅ Both remotes updated"
