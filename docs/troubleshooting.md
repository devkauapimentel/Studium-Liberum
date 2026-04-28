# Troubleshooting

## Common Issues

### App won't start
```bash
# Check if port 3000 is in use
lsof -i :3000
# Kill the process if needed
kill -9 $(lsof -t -i :3000)
# Try again
bash scripts/start.sh
```

### Ollama not responding
```bash
# Check if Ollama is running
curl localhost:11434
# If not, start manually
ollama serve
# Check available models
ollama list
```

### PDFs not showing in search
- Check if `pdftotext` is installed: `which pdftotext`
- Install it: `sudo apt install poppler-utils`
- Re-index: the file watcher should pick up existing files on next restart

### Videos not playing
- Ensure the file is a supported format (`.mp4`, `.webm`, `.mkv`)
- Check browser console for errors (F12 → Console)
- `.mkv` files may need to be converted to `.mp4` for browser playback

### Search returns no results
- Wait a few seconds after adding files (indexing takes 2-5s)
- Check that the file is in a `library/` subfolder
- PDFs require `pdftotext` to be indexed

### Can't access from another device
- Ensure both devices are on the same network
- Check your IP: `hostname -I | awk '{print $1}'`
- Access via: `http://<your-ip>:3000`
- Check firewall: `sudo ufw allow 3000`

### High RAM usage
- Ollama models consume 4-14 GB RAM depending on model size
- Run `bash scripts/stop.sh` to free RAM when not studying
- Use smaller models (`qwen2.5-coder:7b` instead of `:14b`)

## Getting Help

1. Check the `/help` page in the app
2. Ask the AI: "How do I [your question]?" — it reads these docs
3. Open an issue on [GitHub](https://github.com/devkauapimentel/studium-liberum/issues)
