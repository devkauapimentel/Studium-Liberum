#!/bin/bash
# ═══════════════════════════════════════
# Studium Liberum — First-Run Setup
# ═══════════════════════════════════════

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo "🏛️  Studium Liberum — Setup"
echo ""

# 1. Install Node dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "   ✅ Dependencies installed"
else
    echo "📦 Dependencies already installed"
fi

# 2. Create data directory
mkdir -p data
echo "💾 Data directory ready"

# 3. Create default config if not exists
if [ ! -f "data/config.json" ]; then
    echo "⚙️  Creating default config..."
    cat > data/config.json << 'EOF'
{
  "version": "0.1.0",
  "tracks": [],
  "features": {
    "ollama": {
      "enabled": true,
      "defaultModel": "qwen2.5-coder:7b",
      "models": []
    },
    "kiwix": {
      "enabled": true,
      "port": 8080
    },
    "zeal": {
      "enabled": false
    },
    "countdown": {
      "enabled": false,
      "label": "",
      "date": ""
    }
  },
  "settings": {
    "theme": "dark",
    "language": "pt-BR",
    "autoIndex": true,
    "indexIntervalMs": 2000
  }
}
EOF
    echo "   ✅ Default config created at data/config.json"
    echo "   → Add your tracks via the UI or edit data/config.json"
else
    echo "⚙️  Config already exists"
fi

# 4. Create library directory
mkdir -p library
echo "📂 Library directory ready"

# 5. Detect available tools
echo ""
echo "🔍 Detecting available tools..."
echo ""

if command -v ollama &>/dev/null; then
    MODELS=$(ollama list 2>/dev/null | tail -n +2 | awk '{print $1}' | paste -sd ', ')
    echo "   ✅ Ollama installed (models: $MODELS)"
else
    echo "   ⬜ Ollama not installed (optional — run: curl -fsSL https://ollama.com/install.sh | sh)"
fi

if command -v kiwix-serve &>/dev/null; then
    echo "   ✅ Kiwix installed"
else
    echo "   ⬜ Kiwix not installed (optional — run: sudo apt install kiwix-tools)"
fi

if command -v zeal &>/dev/null; then
    echo "   ✅ Zeal installed"
else
    echo "   ⬜ Zeal not installed (optional — run: sudo apt install zeal)"
fi

if command -v pdftotext &>/dev/null; then
    echo "   ✅ pdftotext installed (PDF indexing enabled)"
else
    echo "   ⬜ pdftotext not installed (optional — run: sudo apt install poppler-utils)"
fi

echo ""
echo "════════════════════════════════════"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Add tracks via the UI or edit data/config.json"
echo "  2. Place study materials in library/<track>/"
echo "  3. Run: bash scripts/start.sh"
echo "  4. Open: http://localhost:3000"
echo "════════════════════════════════════"
