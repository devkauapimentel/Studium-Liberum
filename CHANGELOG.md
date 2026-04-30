# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Visualizador Nativo de Documentações (`/docs`)**: Absorção total dos Docsets do Zeal para dentro do Studium Liberum. Agora o sistema varre os bancos SQLite (`docSet.dsidx`) de todos os manuais baixados e os disponibiliza em uma busca nativa unificada (`/docs`). Os manuais HTML são lidos diretamente do disco local e limpos esteticamente antes de renderizar em um Iframe protegido, eliminando 100% a necessidade de sair da plataforma ou abrir a janela legada do Zeal.
- **Modo 42 / Socrático (IA)**: Implementado botão "Modo 42" no Chat (`/ai`), ativando um bloqueio estrito no System Prompt. A IA agora é proibida de gerar código-fonte e passa a responder exclusivamente via Método Socrático para forçar o aluno a pensar, adequando-se à metodologia da 42 Network.
- **Central Offline Refinada**: A página `/offline` foi atualizada. O bloco do Kiwix agora foca no `ArchWiki` e `Wikibooks CS` em vez do Stack Overflow (90GB de peso inútil/sabotagem). Os links nativos `zeal://` foram mapeados perfeitamente para os pacotes instalados (`C`, `Docker`, `JavaScript`, `React`, etc).
- **Ollama RAG Engine (Fase 5)**: Integração com LLMs locais (ex: `qwen2.5-coder`). O backend `/api/ai/chat` intercepta mensagens e busca no FTS5 (`studium.db`) arquivos relevantes antes de responder, injetando os snippets direto no System Prompt.
- **Chat UI (NDJSON Streaming)**: Criada a interface completa em `/ai` com suporte a streaming de texto em tempo real (máquina de escrever) parseando as respostas NDJSON do Ollama sem quebrar a UI.
- **Auto-Resize Chatbar (Grok Style)**: Refatorada a lógica de input do chat para igualar o design *Grok*: scrollbar nativa ultrafina customizada via CSS Webkit, expansão dinâmica do container via manipulação direta do DOM, botão enviar reposicionado óticamente, e fixação absoluta com fading visual.
- **Central Offline (Fase 7)**: Nova página (`/offline`) dedicada ao "MIT Stack". Centraliza links profundos via protocolo nativo do Linux `zeal://` para chamadas de documentação instantâneas (Docker, React, C), e fornece botão de acesso direto ao Kiwix Engine local (`localhost:8080`) isolando-o de frames com falhas.
- **Renderização Markdown Dinâmica**: O Chat utiliza `react-markdown` e `remark-gfm` + `remark-breaks` para estruturar códigos, listas e tabelas. Adicionada forte diretriz estética Grok/ChatGPT ao System Prompt.
- **Modal de Busca Híbrido (Fase 5.1)**: Criada a fundação do `<SearchModal>` ativado via `Ctrl+K` em qualquer lugar do app, prevenindo comportamento nativo do Chrome.
- **Seletor de Modelos Dinâmico**: O Chat agora exibe um dropdown em tempo real buscando na API do Ollama (`/api/tags`) os modelos disponíveis na máquina para switch instantâneo.
- **Toggle de RAG**: Botão dinâmico adicionado à UI do Chat para permitir que o usuário ligue/desligue a injeção de contexto de documentos no Ollama.
- **Semantic File Engine v2.0**: Automatic classification of files (video, pdf, document, code, resource)
- **Syllabus Parser**: Reads `sumario_rocketseat.txt` for chronological ordering of modules
- **.url Shortcut Support**: Parses Windows `.url` files and renders clickable external links
- **PDF Attachment Grouping**: PDFs in the same folder as videos are grouped as "Material de Apoio"
- **Figma Downloads**: `.fig`/`.figma` files get a "Baixar Figma" action button
- **Contextual Action Buttons**: Each file type gets its own action (Assistir, Abrir, Abrir Link, etc.)

### Fixed
- **Video Streaming Engine v3.0**: Rewrote range API to use 256KB ReadableStream chunks
- **AbortError Crash**: Browser seek/speed changes no longer trigger Next.js dev overlay
- **File Descriptor Leaks**: `cancel()` handler ensures file handles are always closed
- **Hydration Mismatch**: Progress bar uses `suppressHydrationWarning` for dynamic state
- **Firefox/Zen Browser Codec Crash**: Diagnosed `mGMP not initialized`. Confirmed as a Linux-level missing codec (`ffmpeg`) constraint. API optimized to `200 OK` continuous buffer or exact-byte streaming to mitigate, but hardware/OS decoders dictate the ultimate behavior.
- **Monobloco Markdown (Tailwind Typography)**: Adicionado `@plugin "@tailwindcss/typography"` ausente no Tailwind v4. Isso ativou a renderização visual perfeita de fontes, quebras, listas e margens (`.prose`).
- **FTS5 Stopwords Search**: Motor de busca refatorado. Substituído o corte bruto por tamanho de caractere (`> 2`) por uma lista cirúrgica de *Stop Words*, permitindo busca exata por módulos pequenos ("C", "Go", "UI").
- **ESM pdf-parse Crash**: Corrigido crash fatal do servidor de dev Next.js convertendo o import da biblioteca `pdf-parse` para `require()` CJS nativo.
- **Chat Bubble Overflow**: Adicionado `min-w-0` e `break-all` aos balões do chat para evitar que strings monolíticas do usuário esticassem o container ou gerassem scroll horizontal indesejado quebrando o design.

### Changed
- **Video Player → Cinema Mode**: Fullscreen immersive player with glassmorphism floating controls
- **Auto-hide Controls**: Header and controls fade out after 3s of inactivity during playback
- **Cursor Auto-hide**: Mouse cursor disappears during playback for distraction-free viewing
- **Smart Back Button**: O botão de voltar no Video Player agora calcula a hierarquia do diretório atual e direciona o usuário para a página de trilha com a pasta e subpastas abertas (Auto-Expansão).

### Database & State (Fase 3.5 & 4)
- **SQLite Progress Migration**: Migração total do `localStorage` para `better-sqlite3`. A fonte única de verdade é `studium.db`.
- **Global Track Progress**: Card das Trilhas no Dashboard recalculam porcentagem de conclusão usando base em Total de Vídeos / Assistidos caso não haja "Fases" mapeadas.
- **Player State Leak Fix**: React agora reinicia corretamente estados como `Concluído` e `Tela de Fim` quando a prop `filePath` muda via Next.js router.
- **Drag & Drop Progress Bar Fix**: Implementado Range Input invisível para evitar chamadas pesadas do React no evento de Arrastar (`onChange`). O tempo do vídeo só é setado no `onMouseUp` para performance nativa. CSS lag delay removido.
- **Range Stream Fix**: Re-habilitado streaming de buffer por HTTP Range (`serveRange`) apenas caso solicitado no header, evitando reload do Chrome ao avançar o tempo (Seek).

## [0.1.0] - 2026-04-28

### Added
- Project initialization
- Repository structure with `library/`, `scripts/`, `docs/`
- `.gitignore` configured for Next.js + study content
- `CONTRIBUTING.md` with Git workflow standards
- `CHANGELOG.md` following Keep a Changelog format
- Initial dashboard with track cards and progress rings
- Track detail pages with file browser
- Video player and PDF viewer
- Media serve API with range request support
- Sidebar navigation with all tracks
- Full Next.js Link-based routing (no 404s)
