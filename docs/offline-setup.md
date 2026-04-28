# Offline Setup Guide

## Overview

Studium Liberum works 100% without internet. This guide covers how to set up the optional offline reference tools for the first time (requires internet once).

## Quick Setup

```bash
bash scripts/setup-offline.sh
```

This installs Kiwix, Zeal, and pdftotext.

## Kiwix (Offline Stack Overflow + Wikipedia)

### Install
```bash
sudo apt install kiwix-tools
```

### Download ZIM Files

Visit [download.kiwix.org](https://download.kiwix.org/zim/) and download:

| File | Size | Content |
|------|------|---------|
| `stackoverflow.com_pt_all.zim` | ~500 MB | Stack Overflow in Portuguese |
| `stackoverflow.com_en_all.zim` | ~25 GB | Stack Overflow in English (optional) |
| `wikipedia_pt_all_maxi.zim` | ~10 GB | Wikipedia in Portuguese |

Place downloaded `.zim` files in: `library/kiwix/`

### Test
```bash
kiwix-serve --port=8080 library/kiwix/*.zim
# Open http://localhost:8080
```

## Zeal (Offline API Documentation)

### Install
```bash
sudo apt install zeal
```

### Download Docsets
1. Open Zeal
2. Go to **Tools → Docsets**
3. Search and install:
   - C
   - JavaScript
   - Node.js
   - TypeScript
   - Bash
   - Git
   - Python
   - React

Zeal runs as a separate desktop app. The Studium search integrates with it via deep links.

## pdftotext (PDF Indexing)

```bash
sudo apt install poppler-utils
```

This enables full-text search inside PDF files. Without it, PDFs are still viewable but not searchable.
