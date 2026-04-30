# 🏛️ Studium Liberum (War OS) — Implementation Master Plan

Este documento é a especificação arquitetural final para o ecossistema "Studium Liberum", consolidado após auditoria de riscos. O objetivo é evoluir o sistema para uma **Universidade Premium Offline**, unindo o rigor acadêmico do MIT com UX hiper-fluido e infraestrutura técnica blindada.

---

## 🏗️ Fase 3.5: Dívida Técnica & Fundações de Banco de Dados

Antes de avançar os parsers, a base de dados precisa ser unificada e a pipeline de busca ativada.

### 1. Fonte Única da Verdade (Single Source of Truth) [✅ CONCLUÍDO]
- **O Risco Atual:** O progresso do app `42.rioPreparation` salva em `localStorage`, enquanto o resto do sistema usa `progress.json`. Uma aberração técnica que causa dessincronização.
- **A Solução (Implementada):** Migração completa para o **SQLite (`better-sqlite3`)**. Todo o progresso de aulas, milestones da 42 e anotações agora são persistidos em tabelas relacionais locais. Criado o Hook unificado `useProgress()` e a rota `GET/POST /api/progress` com CORS para comunicação com a 42 Rio na porta 3001. Migração silenciosa do localStorage rodando com sucesso no front-end.

### 2. Pipeline de Indexação FTS5 (O Coração da Busca Offline) [✅ CONCLUÍDO]
- **O Gap Técnico:** A Stack diz "SQLite FTS5", mas não existe código que lê os PDFs.
- **A Solução (Implementada):** Criação do Worker `scripts/index-library.ts` em Node.js usando `pdf-parse`. O script varre a pasta `/library`, extrai o texto de todos os PDFs e `.md`, quebra em blocos com overlap de 100 caracteres, e injeta nas tabelas virtuais FTS5 do SQLite. O indexador já rolou e os textos estão na base de dados. O motor de busca (`Ctrl+K`) agora tem coração e indexa até conteúdos escondidos no meio de PDFs ou aulas em Markdown.

---

## 🧩 Fase 4: Motor Semântico V3 (Engenharia de Dados e Parse) [✅ CONCLUÍDO]

O Motor V3 resolve a bagunça dos diretórios que não entendem contexto de negócio.

### 4.1. Rocketseat: Mapeamento Cruzado e Ordenação Absoluta
- **A Solução (Implementada):** A ordenação dos diretórios e arquivos foi reescrita com um algoritmo de `Natural Sort` (`localeCompare(numeric: true)`). Isso garante que arquivos nomeados como `1_` venham antes de `10_`, anulando a bagunça alfabética do Linux. A dependência de regex complexos no `messages.html` do Telegram foi dispensada, pois os arquivos já foram baixados com os títulos limpos na pasta!

### 4.2. Uninter: A Arquitetura de Bloco Acadêmico
- 1. **Ancoragem do Livro Base:** Arquivos rotulados com `[LIVRO]` ficam pinados permanentemente no topo da lista. (Implementado via hoisting semântico no Node).
- 2. **Binder Global de PDF:** Se a matéria possui múltiplas aulas teóricas e 1 PDF base, o Motor detecta a proporção 1:N e anexa o mesmo PDF a todos os cards de vídeo na interface automaticamente.
- 3. **Rotas Paralelas:** As aulas práticas seguem agrupadas naturalmente pelas nomenclaturas das pastas que você definiu.

---

## 🤖 Fase 5: Inteligência Artificial Autônoma (O Cérebro RAG) [✅ CONCLUÍDO]

- **A Solução (Implementada)**:
  - **Motor RAG Local**: Endpoint `/api/ai/chat` lê o prompt, consulta a tabela SQLite `search_index` (FTS5) buscando trechos dos PDFs e Markdown, e os injeta na requisição do Ollama.
  - **Interface NDJSON (Streaming)**: Página de chat brutalista em `/ai` parseando NDJSON streamings chunk-by-chunk em tempo real para experiência instantânea ("máquina de escrever").
  - **Toggle de Isolamento RAG**: Capacidade de habilitar ou desabilitar o injeção de contexto documental para permitir que a IA converse focada nos materiais do aluno ou no seu conhecimento pré-treinado.
  - **Markdown Render**: Respostas renderizam blocos de código com highlight, tabelas e links dinâmicos na tela.

---

## 🛠️ Fase 6: Resiliência Máxima de Vídeo [✅ CONCLUÍDO]

- **O Bug Crítico:** O vídeo atual congela no "Seek" (quando você clica no minuto 15 de repente).
- **A Correção Tática (Implementada):** API rescrita para buffer contínuo (200 OK sem Accept-Ranges) com fatiamento exato (`bytesRead`), burlando o bug do decodificador `mGMP` do Zen Browser/Linux. Limitações remanescentes mapeadas diretamente como falta de `ffmpeg` (`ubuntu-restricted-extras`) no host Linux, o que significa que o Chrome processa perfeitamente. Rabbit hole fechado.

---

## 🏛️ Fase 7: The MIT Offline Stack (Repositório de Conhecimento) [✅ CONCLUÍDO]

- **A Solução (Implementada):**
  - **Indexação Livros Base:** Criada a rota `/library/dev-refs/` com o stub guide para os livros pilares do MIT (SICP, CSAPP, OSTEP, DDIA). O motor RAG aguarda os PDFs.
  - **Kiwix Engine:** A UI de Busca via Iframe falhava, então criamos uma central dedicada: a Rota `/offline`. Um portal limpo e estável para invocar o servidor local `localhost:8080`.
  - **Zeal Deep Linking:** Adicionados cards de hiper-integração na rota `/offline` usando o protocolo nativo `zeal://` (ex: `zeal://docker`), permitindo acesso à documentação em 100ms.
  - **Docs:** Guia `docs/offline-setup.md` reescrito para orientar tanto a instalação manual no Linux quanto para servir de contexto para a Inteligência Artificial.

---

## 🧠 Fase 8: Terapia Cognitiva Autônoma ("O Espelho Lógico")

- Check-ins Socráticos diários com a Persona IA antes do estudo para neutralizar a limerência e focar a energia no "Alpha Frame", via diário integrado no Dashboard.

---

## 🎨 Fase 9: A "Universidade Premium" (Suprema UX/UI Overhaul)

### Pilar 1: O Feed Contínuo (O Fim das Pastas)
- A navegação em árvore de pastas é abolida. O curso é uma linha do tempo vertical linear (Feed).

### Pilar 2: One-Click Play (Fricção Zero)
- O "Card" da aula vira um botão massivo de Play com thumbnail. Clicou, abriu no Cinema Mode.

### Pilar 3: Estética "Dark Elite" & Tipografia
- Cores `#000000` a `#0A0A0A`. Bordas sutis de 1px (`rgba(255,255,255,0.05)`). Tipografia moderna (`Geist`, `Inter`).

### Pilar 4: Auto-Focus Visual (Botões Ocultos)
- Botões complementares (Figma, PDFs) ficam ocultos e revelam-se num *fade-in* de 200ms no `hover`. Highlight inteligente na "Próxima Aula".

---

## 🗑️ Fase 10: Storage Management (Protocolo de Descarte de Guerra)

- **O Problema:** Acumular `.mp4` vai lotar o HD.
- **A Solução:** Um botão de "Liberar X GB" aparece ao final do módulo. O script exclui o `.mp4` fisicamente, MAS preserva PDFs e `.md`.
- **Ghost Cards:** A aula excluída não some da trilha. Vira um card "Fantasma", inativo para vídeo, mas mantendo a âncora histórica e de notas escritas do aluno.
