#!/bin/bash
# ═══════════════════════════════════════
# Studium Liberum — Setup Offline References
# ═══════════════════════════════════════
# Installs Kiwix + Zeal + downloads ZIM files for offline use.
# Requires internet for first-time download only.

set -e
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo "📚 Setting up offline references..."
echo ""

# 1. Install Kiwix tools
if ! command -v kiwix-serve &>/dev/null; then
    echo "Installing kiwix-tools..."
    sudo apt install -y kiwix-tools
    echo "   ✅ Kiwix installed"
else
    echo "   ✅ Kiwix already installed"
fi

# 2. Install Zeal
if ! command -v zeal &>/dev/null; then
    echo "Installing Zeal..."
    sudo apt install -y zeal
    echo "   ✅ Zeal installed"
else
    echo "   ✅ Zeal already installed"
fi

# 3. Install pdftotext
if ! command -v pdftotext &>/dev/null; then
    echo "Installing pdftotext..."
    sudo apt install -y poppler-utils
    echo "   ✅ pdftotext installed"
else
    echo "   ✅ pdftotext already installed"
fi

# 4. Download ZIM files
mkdir -p library/kiwix
echo ""
echo "📥 ZIM file download links (manual download — files are large):"
echo ""
echo "   Stack Overflow (PT): https://download.kiwix.org/zim/stack_exchange/"
echo "   Stack Overflow (EN): https://download.kiwix.org/zim/stack_exchange/"
echo "   Wikipedia (PT):      https://download.kiwix.org/zim/wikipedia/"
echo ""
echo "   After downloading, place .zim files in: $PROJECT_DIR/library/kiwix/"
echo ""
echo "   Recommended files:"
echo "   - stackoverflow.com_pt_all.zim (~500 MB)"
echo "   - stackoverflow.com_en_all.zim (~25 GB — optional, very large)"
echo "   - wikipedia_pt_all_maxi.zim (~10 GB)"
echo ""

# 5. Zeal docsets
echo "📖 Zeal docsets — open Zeal and download:"
echo "   Recommended: C, JavaScript, Node.js, TypeScript, Bash, Git, Python, React"
echo "   Zeal → Tools → Docsets → search and install"
echo ""

echo "✅ Offline reference setup complete"
echo "   Run 'bash scripts/start.sh' to launch with Kiwix enabled"
