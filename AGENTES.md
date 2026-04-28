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
  3. Commita com Conventional Commits
  4. `bash scripts/push-all.sh` (push ambos remotes)
  5. ENTREGA
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
