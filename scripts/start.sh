#!/bin/bash
# ═══════════════════════════════════════
# Studium Liberum — Start All Services
# ═══════════════════════════════════════

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo "🏛️  Studium Liberum — Starting..."
echo ""

# 1. Check & start Ollama (optional)
if command -v ollama &>/dev/null; then
    if ! curl -s localhost:11434 &>/dev/null; then
        echo "🤖 Starting Ollama..."
        ollama serve &>/dev/null &
        sleep 2
        if curl -s localhost:11434 &>/dev/null; then
            echo "   ✅ Ollama running on :11434"
        else
            echo "   ⚠️  Ollama failed to start (continuing without AI)"
        fi
    else
        echo "🤖 Ollama already running on :11434"
    fi
else
    echo "🤖 Ollama not installed (AI features disabled)"
fi

# 2. Check & start Kiwix (optional)
if command -v kiwix-serve &>/dev/null; then
    ZIM_FILES=$(find "$PROJECT_DIR/library/kiwix" -name "*.zim" 2>/dev/null)
    if [ -n "$ZIM_FILES" ]; then
        if ! curl -s localhost:8080 &>/dev/null; then
            echo "📚 Starting Kiwix..."
            kiwix-serve --port=8080 $ZIM_FILES &>/dev/null &
            echo "   ✅ Kiwix running on :8080"
        else
            echo "📚 Kiwix already running on :8080"
        fi
    else
        echo "📚 No ZIM files found (run: bash scripts/setup-offline.sh)"
    fi
else
    echo "📚 Kiwix not installed (offline wiki disabled)"
fi

# 3. Start Next.js
echo ""
echo "🚀 Starting Studium Liberum..."
echo "   → http://localhost:3000"
echo "   → http://$(hostname -I | awk '{print $1}'):3000 (LAN)"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev -- --hostname 0.0.0.0
