# 🤖 AGENTES.md — Orquestrador de Contexto

> **LEIA ESTE DOCUMENTO ANTES DE QUALQUER AÇÃO.**
> Este arquivo é a fonte de verdade para qualquer agente IA trabalhando neste projeto.

---

## Identidade do Projeto

| Campo | Valor |
|-------|-------|
| **Nome** | Studium Liberum |
| **Propósito** | Universidade offline pessoal — software local que centraliza materiais de estudo |
| **Owner** | Kauã Pimentel (@devkauapimentel) |
| **Repo Público** | [github.com/devkauapimentel/Studium-Liberum](https://github.com/devkauapimentel/Studium-Liberum) |
| **Repo Privado** | [github.com/devkauapimentel/studium-liberum-local](https://github.com/devkauapimentel/studium-liberum-local) |
| **Versão Atual** | 0.1.0 |
| **Stack** | Next.js 16.2 · Tailwind 4.2 · TypeScript · SQLite FTS5 · Ollama · Kiwix · Zeal |

---

## 📚 Leitura Obrigatória (nesta ordem)

Antes de qualquer ação, leia estes documentos:

| # | Documento | O que contém | Quando consultar |
|---|-----------|-------------|-----------------|
| 1 | **AGENTES.md** (este) | Regras, contexto, decisões, checklist | Sempre — é o ponto de entrada |
| 2 | [CHANGELOG.md](./CHANGELOG.md) | Estado atual, versão, o que já foi feito | Para saber em que fase estamos |
| 3 | [CONTRIBUTING.md](./CONTRIBUTING.md) | Git workflow, branches, commit convention, SemVer | Antes de qualquer commit |
| 4 | [README.md](./README.md) | Visão pública do projeto, features, setup | Para entender o que o software faz |
| 5 | [LICENSE](./LICENSE) | MIT | Referência |
| 6 | `data/config.json` | Tracks pessoais do Kauã (.gitignored) | Para entender a configuração ativa |
| 7 | `docs/*.md` | Guias de uso (setup, search, AI, offline) | Quando implementar features específicas |

### Workflow do Agente
```
NOVO AGENTE CHEGA → 
  1. Lê AGENTES.md (contexto + regras)
  2. Lê CHANGELOG.md (onde estamos?)
  3. Roda `git log -5` (últimos commits)
  4. Roda `npm run dev` (funciona?)
  5. Lê CONTRIBUTING.md (como commitar?)
  6. COMEÇA A TRABALHAR
  
AGENTE TERMINA →
  1. Atualiza CHANGELOG.md (o que fez)
  2. Atualiza AGENTES.md → "Histórico de Decisões" (decisões tomadas)
  3. Roda o comando: `git add -A && git commit -m "feat/fix: descrição" && bash scripts/push-all.sh`
  4. ENTREGA

### ⚠️ Gatilho de Automação (Trigger Word)
Se o usuário citar `@AGENTES.md` ou pedir para "atualizar documentação/commit", você, como Inteligência Artificial, **DEVE EXECUTAR IMEDIATAMENTE e SEM PERGUNTAR** a rotina de encerramento acima:
1. Escreva a alteração no `CHANGELOG.md`.
2. Adicione ao "Histórico de Decisões" no `AGENTES.md` (se houve mudança de arquitetura).
3. Use a tool de terminal para rodar `git add -A && git commit -m "..." && bash scripts/push-all.sh`.
Isso garante que o contexto do projeto nunca seja perdido e o versionamento seja automatizado.
```

---

## Regras Para Agentes

### 1. NUNCA faça isso
- ❌ Não mova/delete arquivos fora de `00.University/` sem confirmação explícita
- ❌ Não modifique o Obsidian vault, Isabelly, Terapia, ou qualquer outro projeto
- ❌ Não instale dependências globais sem perguntar (sudo apt, pip install --global)
- ❌ Não commite direto na `main` — use `dev` ou `feat/*`
- ❌ Não force-push em `main`
- ❌ Não hardcode paths pessoais do Kauã no código público
- ❌ Não gere código para exercícios 42 (regra da 42 Network)

### 2. SEMPRE faça isso
- ✅ Leia este arquivo inteiro antes de iniciar qualquer trabalho
- ✅ Verifique o CHANGELOG.md para entender o estado atual
- ✅ Use Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- ✅ Teste antes de commitar (`npm run dev` funciona? Sem erros?)
- ✅ Atualize o CHANGELOG.md a cada commit significativo
- ✅ Push para AMBOS os remotes: `git push origin dev && git push private dev`
- ✅ Mantenha o código genérico — config pessoal fica em `data/config.json` (.gitignored)

### 3. Workflow de Desenvolvimento
```
1. git checkout dev
2. Implementar feature/fix
3. Testar: npm run dev → verificar no browser
4. git add -A && git commit -m "feat: descrição"
5. git push origin dev && git push private dev
6. Quando estável: PR dev → main
7. Atualizar CHANGELOG.md com nova versão
8. git tag vX.Y.Z && git push --tags origin && git push --tags private
```

### 4. Princípios de Arquitetura e Código (Clean Code & Architecture)

**Clean Code:**
- **Nomes Descritivos:** Variáveis e funções devem revelar intenção (ex: `indexOfflineFiles()` e não `doIndex()`).
- **Funções Pequenas:** Uma função faz apenas UMA coisa. Se tem "E" no nome, deve ser dividida.
- **Sem Magic Numbers/Strings:** Use constantes documentadas em caixas altas (ex: `const MAX_CHUNK_SIZE = 5 * 1024 * 1024`).
- **Comentários do Porquê:** O código explica o "como". Comentários existem para explicar o "porquê" (decisões de negócio/trade-offs).

**Clean Architecture & Design Patterns:**
- **Separação de Preocupações (SoC):** Componentes React (UI) não devem ter regras de negócio densas. A lógica pesada e queries de banco de dados (`better-sqlite3`) pertencem à camada de lib/serviço (`src/lib` e `src/app/api`).
- **Dependency Inversion:** Dependa de abstrações/interfaces TypeScript (`SearchEngine`), e não da implementação direta, facilitando a troca de motores no futuro.
- **Padrões Adotados:**
  - *Singleton:* Para conexão com o SQLite (`src/lib/db.ts`), garantindo que não haja esgotamento de conexões.
  - *Adapter:* Para formatar respostas de APIs externas (ex: Ollama) para a interface unificada do Studium.
  - *Observer/Event Listener:* Usado no streaming de mídia para gerenciar o `AbortSignal` e evitar memory leaks.

**Trade-offs do Studium Liberum:**
- **Performance vs Abstração:** O foco é alta performance para atingir máxima velocidade e fluidez (zero stuttering), aproveitando todo o poder da máquina local (que é potente). Portanto, sacrificar "pureza arquitetural" (usando queries SQL diretas e Streams granulares) é o padrão adotado para garantir carregamento instantâneo.
- **Offline-First vs Sincronização:** Toda feature deve funcionar 100% desconectada da internet. Arquivos locais e PDFs são "Fonte da Verdade", preterindo APIs externas sempre que possível.
- **Minimalismo vs Over-engineering:** Mantenha o ecossistema brutalista e fácil de ler, evitando criar dezenas de pastas de abstração se não houver necessidade real.

---

## Contexto Completo do Owner (Kauã)

### Sistema de Produtividade
- **Protocolo MIT** (War OS): sistema de produtividade para TDAH
- **Obsidian** (PARA method): vault em `/home/dev_kaua/Documents/Organize my life/Second Brain/`
- **Habitica**: gamificação (8 Dailies, 17 Hábitos) — NÃO integrado no Studium
- **Ollama**: 4 modelos locais (qwen2.5-coder 14b/7b, qwen2.5 14b, qwen3.5)

### Tracks de Estudo do Kauã
```json
{
  "tracks": [
    {
      "id": "uninter",
      "name": "Uninter — Engenharia de Software",
      "status": "Matéria ativa: Análise e Modelagem (3 sem atrasado). 13 dívidas técnicas.",
      "priority": "ALTA"
    },
    {
      "id": "rocketseat",
      "name": "Rocketseat Fullstack",
      "status": "205/1134 aulas (18%). Parou em F0205. Sprint pendente: Git.",
      "priority": "MÉDIA"
    },
    {
      "id": "42-prep",
      "name": "42 Rio — Piscina",
      "status": "Piscina 13/Jul — 07/Ago 2026. Exercícios C00-C06 + Shell00-01.",
      "priority": "ALTA",
      "deadline": "2026-07-13"
    },
    {
      "id": "dev-refs",
      "name": "Referências Dev",
      "status": "Livros: Gersting (Matemática), Linux All-In-One, Grokking Algorithms.",
      "priority": "BAIXA"
    }
  ]
}
```

### Ambiente Técnico
| Item | Valor |
|------|-------|
| OS | Pop!_OS (Linux) |
| Node.js | v22.22.2 |
| Disco | 321 GB total · ~198 GB livres |
| Editor | VS Code + Zed |
| Browser | Chrome |
| Terminal | Integrado |

### Projetos Relacionados (NÃO TOCAR)
| Projeto | Path | Status |
|---------|------|--------|
| Isabelly/People | `01 - Projects/Isabelly/` | Ativo — NÃO modificar |
| Terapia | `01 - Projects/Terapia/` | Ativo — NÃO modificar |
| 42.rioPreparation | `01 - Projects/42.rioPreparation/` | Ativo — app separado |
| Obsidian Vault | `Documents/Organize my life/Second Brain/` | Ativo — NÃO modificar |
| Pegador de Contato | `01 - Projects/pegador-de-contato/` | Manter |
| WhatsApp Labels | `01 - Projects/whatsapp-labels/` | Manter |

---

## Documentação e Auto-Ajuda

### Para o Usuário (Kauã e outros)

Três camadas de ajuda integradas no software:

| Camada | O que é | Como funciona |
|--------|---------|---------------|
| **🔘 Tooltips** | Hover em qualquer botão/ícone | Tooltip aparece explicando a função |
| **❓ /help** | Página interativa de ajuda | Guias passo-a-passo com screenshots para cada feature |
| **🤖 IA contextual** | Chat Ollama que conhece o software | Ollama recebe `docs/*.md` como contexto + a pergunta do usuário |

### Ollama Conhece o Software

Quando o usuário pergunta algo sobre o próprio Studium Liberum (ex: "como adicionar um novo track?"), o sistema faz RAG nos arquivos `docs/`:

```
USUÁRIO: "Como eu adiciono uma nova matéria?"

SISTEMA:
  1. Detecta que a pergunta é sobre o software (não sobre estudo)
  2. Busca em docs/library-guide.md → encontra seção "Adding Subjects"
  3. Alimenta o Ollama com esse trecho como contexto
  4. Ollama responde: "Para adicionar uma matéria, vá em Settings → ..."
```

### Docs que serão criados em `docs/`

| Arquivo | Conteúdo |
|---------|----------|
| `setup.md` | Instalação, primeiro boot, configuração inicial |
| `library-guide.md` | Como organizar materiais, adicionar tracks/subjects, convenção de nomes |
| `search-guide.md` | Como usar a busca unificada, filtros, atalhos |
| `ai-guide.md` | Como usar o chat IA, RAG, selecionar modelos |
| `offline-setup.md` | Instalar Kiwix, Zeal, baixar ZIM files |
| `troubleshooting.md` | Problemas comuns (Ollama não inicia, PDF não indexa, etc.) |
| `architecture.md` | Como o sistema funciona internamente (para devs/contribuidores) |

> Estes arquivos servem dupla função: são legíveis por humanos no browser E são usados como contexto pelo Ollama para responder perguntas sobre o software.

---

## 🧠 Fluxo Anti-TDAH (Como Estudar)

O sistema é projetado para eliminar decisões e fricção. O fluxo é linear e guiado:

### Como assistir aulas
```
1. Abre localhost:3000
2. Dashboard mostra "CONTINUAR DE ONDE PAROU" no topo
   └── Um botão grande, impossível de ignorar
3. Clica → abre direto no vídeo, no segundo exato onde parou
4. Terminou o vídeo → marca como "Assistido" (um clique)
5. Sistema sugere o próximo vídeo automaticamente
   └── "Próximo: Aula 6 - Seção pricing parte 02"
6. Não precisa pensar, só seguir
```

### Regras anti-autosabotagem embutidas no software
| Regra | Implementação |
|-------|--------------|
| **Sem escolha** | Dashboard mostra UMA ação principal: "Continue de onde parou" |
| **Sem multitarefa** | Modo foco esconde sidebar + chat quando reproduzindo vídeo |
| **Sem rabbit hole** | Busca mostra max 5 resultados. Quer mais? Clique explícito |
| **Progresso visível** | Barra de progresso circular SEMPRE visível. Você vê que está avançando |
| **Micro-vitórias** | Cada aula concluída = animação de confete + contador sobe |
| **Sem decisão** | O sistema decide a próxima aula. Você só executa |

### Se tiver dúvida durante o estudo
```
1. Pausa o vídeo
2. Ctrl+K → abre busca inline (não sai da tela)
3. Digita a dúvida → resultados dos seus PDFs + IA
4. Fecha → volta pro vídeo no mesmo segundo
```

---

## Integração 42 Apps

### Decisão: 42.rioPreparation → Embutido como Rota

O app `42.rioPreparation` é um Next.js com:
- 5 fases (Shell → C Foundations → Pointers → Strings → Memory)
- Sistema de desbloqueio sequencial (Gatekeeper Exams)
- Progresso em localStorage
- Estética terminal/brutalist
- 16 arquivos de curriculum em `data/`

**Faz sentido integrar como rota `/track/42-prep` dentro do Studium Liberum**, porque:
1. Já é Next.js + Tailwind (mesma stack)
2. Já é offline-first
3. Centraliza tudo num único lugar
4. O progresso passa a ser salvo no SQLite (mais durável que localStorage)

**Como:** Os componentes do 42.rioPreparation são migrados para `src/components/42-prep/` e acessíveis via `/track/42-prep`. Os 16 markdown files vão para `library/42-prep/curriculum/`.

### 42-dashboard (perdido)
O 42-dashboard era um Node.js+HTML com:
- Vista linear e radial (star map) do curriculum
- state.json para progresso

**Foi absorvido.** O Studium Liberum faz tudo que ele fazia + mais. Não precisa recriar.

### Status de duplicatas
| Item | Status |
|------|--------|
| 42.rioPreparation | ✅ Existe em `01 - Projects/42.rioPreparation/` (restaurado do GitHub) |
| 42-School/42-dashboard | ❌ Deletado — substituído pelo Studium Liberum |
| library/42-prep/ | ✅ Pastas vazias esperando conteúdo (sem duplicata) |
| `00 - Study/00 - 42.rio/Testes/` | ⚠️ Pasta antiga com testes — mover para library/ quando construir |

---

## Estrutura do Projeto

```
00.University/                    ← WORKSPACE
├── AGENTES.md                    ← ESTE ARQUIVO (orquestrador)
├── README.md                     ← Docs públicas (genéricas)
├── CONTRIBUTING.md               ← Git workflow + standards
├── CHANGELOG.md                  ← Histórico de versões
├── LICENSE                       ← MIT
├── .gitignore
│
├── library/                      ← Conteúdo de estudo (.gitignored)
│   ├── uninter/                  ← Pastas do Kauã (auto-criadas pelo config)
│   ├── rocketseat/
│   ├── 42-prep/
│   └── dev-refs/
│
├── src/                          ← Next.js app (CÓDIGO PRINCIPAL)
│   ├── app/                      ← Pages (App Router)
│   ├── components/               ← React components
│   └── lib/                      ← Core logic
│
├── scripts/                      ← Automação
│   ├── start.sh                  ← Inicia tudo
│   ├── stop.sh                   ← Para tudo
│   ├── push-all.sh               ← Push origin + private
│   └── backup-config.sh          ← Backup config → private repo
│
├── data/                         ← Config + DB (.gitignored no public)
│   ├── config.json               ← Tracks do usuário
│   ├── studium.db                ← SQLite search index
│   └── progress.json             ← Progresso de vídeos/PDFs
│
├── docs/                         ← Documentação
└── public/                       ← Assets estáticos
```

---

## Scripts de Automação

### `scripts/push-all.sh` — Push para ambos os repos
```bash
#!/bin/bash
BRANCH=$(git branch --show-current)
echo "Pushing $BRANCH to origin (public) and private..."
git push origin "$BRANCH" && git push private "$BRANCH"
echo "✅ Both remotes updated"
```

### `scripts/backup-config.sh` — Backup do config pessoal
```bash
#!/bin/bash
# Commits personal config to a special branch on private repo only
git stash
git checkout personal-config 2>/dev/null || git checkout -b personal-config
cp data/config.json . 2>/dev/null
cp data/progress.json . 2>/dev/null
git add config.json progress.json
git commit -m "chore: backup personal config $(date +%Y-%m-%d)"
git push private personal-config
git checkout dev
git stash pop
echo "✅ Personal config backed up to private repo"
```

---

## Checklist de Continuidade

Quando um novo agente assume o trabalho:

- [ ] Li AGENTES.md por completo
- [ ] Verifiquei a versão atual no CHANGELOG.md
- [ ] Rodei `git log -5` para ver últimos commits
- [ ] Rodei `npm run dev` para confirmar que o app funciona
- [ ] Identifiquei em qual fase estamos (ver CHANGELOG)
- [ ] Não vou tocar em projetos fora de `00.University/`

---

## Histórico de Decisões

| Data | Decisão | Motivo |
|------|---------|--------|
| 2026-04-28 | Next.js 16.2 + Tailwind 4.2 | Versões mais recentes, Kauã já usa Next.js |
| 2026-04-28 | Sistema genérico + config pessoal | Portfolio público + uso pessoal |
| 2026-04-28 | Ollama opcional (graceful degradation) | Nem todos têm GPU/RAM para LLM local |
| 2026-04-28 | Kiwix + Zeal opcionais | Core funciona sem dependências externas |
| 2026-04-28 | Dual-remote (public + private) | Open-source + backup pessoal |
| 2026-04-28 | RAG para AI context | IA responde baseado nos materiais do usuário |
| 2026-04-28 | Habitica NÃO integrado | É online, vai contra o propósito offline |
| 2026-04-29 | ReadableStream 256KB para vídeo | Buffer síncrono de 5MB travava o Node.js quando browser cancelava seek |
| 2026-04-29 | Cinema Mode (player imersivo) | Controles flutuantes com auto-hide = zero distração durante estudo |
| 2026-04-29 | Swallow AbortError global | Next.js 16 dev overlay captura erros inofensivos de vídeo e trava a UI |
| 2026-04-29 | Semantic file grouping | PDFs agrupados como anexos de vídeos, .url parseados, .fig como download |
| 2026-04-29 | Syllabus parser para Rocketseat | sumario_rocketseat.txt define ordem cronológica das aulas |
| 2026-04-29 | SQLite Single Source of Truth | Migração completa do localStorage para better-sqlite3 para persistência resiliente do progresso |
| 2026-04-29 | Dynamic Track Progress | O Card da Trilha recalcula a barra de progresso baseado nos vídeos assistidos se não houver 'subjects' |
| 2026-04-29 | Motor RAG Integrado (Fase 5) | API Chat injeta contexto do FTS5 local via SQLite dinamicamente para o Ollama |
| 2026-04-29 | Auto-Versionamento de Agentes | Padronizado que a citação de @AGENTES.md forçará a IA a atualizar CHANGELOG e executar o push-all.sh automaticamente |
| 2026-04-29 | Tailwind Typography v4 Fix | Plugin `@tailwindcss/typography` carregado explicitamente no CSS para estilar o `.prose` do RAG/Markdown. Sem ele, a UI quebra em um monobloco invisível. |
| 2026-04-29 | SearchModal (Ctrl+K) Shield | Interceptação global do atalho `Ctrl+K` na raiz (`layout.tsx`) usando `e.preventDefault()`, substituindo a barra nativa do Chrome. |
| 2026-04-29 | Semantic Stopwords FTS5 | O SQLite Search parou de apagar palavras com `< 3` caracteres (quebrando buscas em 'C'). Adicionado um Array de `Stop Words` PT-BR exato. |
| 2026-04-29 | Strict LLM Aesthetics | RAG System Prompt reescrito para obrigar esteticismo `Grok/ChatGPT` usando `\n\n` obrigatório para parágrafos + Emojis de tópicos. |
| 2026-04-29 | Chat UI Grok Clone | Refatoração completa da barra de input para comportar "100dvh" com âncora inferior absoluta e expansão de texto auto-calculada via scrollHeight. Scrollbars default escondidos/customizados para maxilar UX minimalista. |
| 2026-04-30 | AbortController no Chat | Botão de parar adicionado à UI do Chat. Envia signal de abort na requisição NDJSON do Ollama para economizar VRAM/CPU caso a IA divague. |
| 2026-04-30 | Turbopack Fix (Root DB) | Removidos bancos SQLite da raiz do projeto (`.studium.db`) e migrados para `/data/` para impedir que o File Watcher do Next.js congele (52s delay) ao tentar parsear binários massivos a cada salvamento. |
| 2026-04-30 | Absorção 42.rio | O app isolado `42.rioPreparation` foi absorvido para a rota `/track/42-prep`. Mantida 100% da estética brutalista e da infraestrutura de testes da Moulinette. Apenas o salvamento foi trocado de `localStorage` para `SQLite` visando segurança. |
