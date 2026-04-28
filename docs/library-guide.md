# Library Guide

## How the Library Works

The `library/` folder is your personal content directory. Place your study materials here and the system indexes them automatically.

```
library/
├── your-track-name/
│   ├── subject-1/
│   │   ├── lecture-01.mp4
│   │   ├── slides.pdf
│   │   └── notes.md
│   └── subject-2/
│       └── ...
└── another-track/
    └── ...
```

## Adding a New Track

### Via the UI (recommended)
1. Go to **Settings** → **Tracks**
2. Click **"+ Add Track"**
3. Enter: name, icon (emoji), color
4. Add subjects
5. The folder is auto-created in `library/`

### Via config.json
Edit `data/config.json` and add to the `tracks` array:
```json
{
  "id": "my-new-track",
  "name": "My New Track",
  "icon": "📘",
  "color": "#6366f1",
  "subjects": [
    { "id": "intro", "name": "Introduction", "status": "active" }
  ]
}
```
Restart the app — folders are auto-created.

### Via API
```bash
curl -X POST http://localhost:3000/api/tracks \
  -H "Content-Type: application/json" \
  -d '{"name": "My Track", "icon": "📘", "color": "#6366f1"}'
```

## Adding a New Subject to an Existing Track

### Via the UI
1. Go to **Settings** → click on the track
2. Click **"+ Add Subject"**
3. Enter name and status (active/completed/upcoming)

### Via config.json
Add to the track's `subjects` array:
```json
{ "id": "new-subject", "name": "New Subject", "status": "active" }
```

## Supported File Types

| Type | Extension | How it's indexed |
|------|-----------|-----------------|
| Video | `.mp4`, `.mkv`, `.webm` | Filename + metadata |
| PDF | `.pdf` | Full text extraction (requires pdftotext) |
| Markdown | `.md` | Full text |
| EPUB | `.epub` | Metadata only |
| Code | `.c`, `.js`, `.py`, `.ts` | Full text |

## Naming Conventions

For best organization, use this pattern:
```
NNN-description.ext
```
Examples:
- `001-introduction.mp4`
- `002-variables-and-types.mp4`
- `chapter-03-loops.pdf`

The system uses the number prefix to determine playback order.

## Auto-Detection

When you place a new file in any `library/` subfolder:
1. The file watcher detects it (< 2 seconds)
2. If it's a PDF → text is extracted and indexed
3. If it's markdown → content is indexed directly
4. If it's a video → filename and metadata are indexed
5. The file appears in the file browser and search results immediately
