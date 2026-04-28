#!/bin/bash
# ═══════════════════════════════════════
# Studium Liberum — Stop All Services
# ═══════════════════════════════════════

echo "🏛️  Studium Liberum — Stopping..."

# Stop Kiwix
if pgrep -x "kiwix-serve" &>/dev/null; then
    pkill -x "kiwix-serve"
    echo "📚 Kiwix stopped"
else
    echo "📚 Kiwix was not running"
fi

# Stop Ollama (frees ~28 GB RAM)
if pgrep -x "ollama" &>/dev/null; then
    pkill -x "ollama"
    echo "🤖 Ollama stopped (RAM freed)"
else
    echo "🤖 Ollama was not running"
fi

# Stop Next.js
if pgrep -f "next dev" &>/dev/null; then
    pkill -f "next dev"
    echo "🚀 Next.js stopped"
else
    echo "🚀 Next.js was not running"
fi

echo ""
echo "✅ All services stopped"
