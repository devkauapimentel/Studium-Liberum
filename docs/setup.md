# Setup Guide

## Requirements

| Tool | Required? | Install |
|------|-----------|---------|
| Node.js 18+ | ✅ Yes | `nvm install 18` or [nodejs.org](https://nodejs.org) |
| Ollama | ⬜ Optional | `curl -fsSL https://ollama.com/install.sh \| sh` |
| Kiwix | ⬜ Optional | `sudo apt install kiwix-tools` |
| Zeal | ⬜ Optional | `sudo apt install zeal` |
| pdftotext | ⬜ Optional | `sudo apt install poppler-utils` |

## Installation

```bash
git clone https://github.com/devkauapimentel/studium-liberum.git
cd studium-liberum
bash scripts/setup.sh
```

## First Run

```bash
bash scripts/start.sh
# Opens at http://localhost:3000
```

On first launch, the app creates a default config at `data/config.json`. Add your study tracks via the Settings page or by editing the config file directly.

## Adding Your First Track

1. Open `http://localhost:3000/settings`
2. Click **"Add Track"**
3. Fill in: Name, Icon (emoji), Color
4. Add subjects/modules
5. Click **Create** → folder is auto-created in `library/`
6. Place your study materials (PDFs, videos) in the new folder
7. Files are indexed automatically within seconds

## Stopping

```bash
bash scripts/stop.sh
# Stops Next.js, Ollama, and Kiwix — frees all RAM
```

## LAN Access

By default, the app binds to `0.0.0.0:3000`, making it accessible from any device on your local network:

```
http://<your-ip>:3000
```

Find your IP with: `hostname -I | awk '{print $1}'`
