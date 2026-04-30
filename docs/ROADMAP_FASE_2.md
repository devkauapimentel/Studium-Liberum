# 🚀 Studium Liberum — Roadmap de Ação (Fases 8, 9, 10 e Backlog)

> *Este documento salva o contexto finalizado da sessão anterior e mapeia as próximas fases de desenvolvimento para o War OS.*

## 🧠 Fase 8: Terapia Cognitiva Autônoma ("O Espelho Lógico")
- **Objetivo:** Criar check-ins Socráticos diários com a Persona IA antes de o estudo começar.
- **Implementação:** Desenvolver uma página ou modal de "Diário/Check-in" integrado no Dashboard. A IA faz perguntas para focar sua energia no "Alpha Frame", neutralizar pensamentos intrusivos/limerência, e colocar sua mente (TDAH) nos trilhos antes de iniciar uma sessão de foco pesado.

## 🎨 Fase 9: A "Universidade Premium" (Suprema UX/UI Overhaul)
- **O Feed Contínuo:** Abolir a navegação em árvore de pastas antiga. Cada curso deve se tornar uma linha do tempo vertical (Feed), onde o próximo passo é sempre óbvio.
- **One-Click Play (Fricção Zero):** O "Card" da aula deve ser um botão massivo de Play com thumbnail. Clicou, abriu direto no Cinema Mode.
- **Estética "Dark Elite":** Cores brutalistas (`#000000` a `#0A0A0A`), bordas finas (`1px` quase transparentes) e tipografia de elite (`Geist`, `Inter`).
- **Auto-Focus Visual:** Esconder botões complementares (Figma, PDFs) e revelá-los apenas com *fade-in* suave no `hover`.

## 🗑️ Fase 10: Storage Management (Protocolo de Descarte de Guerra)
- **O Problema:** Acúmulo de arquivos `.mp4` pesados.
- **A Solução:** Criar a mecânica de "Liberar HD". O sistema oferecerá excluir o arquivo de vídeo físico da máquina (mantendo PDFs e anotações). 
- **Ghost Cards:** A aula excluída fisicamente não some do sistema. Ela vira um card "Fantasma", preservando o histórico de conclusão e as anotações feitas, apenas desabilitando o botão de assistir vídeo localmente.

---

## 🛠️ Backlog Técnico Imediato (Pendências da Sessão Anterior)

1. **Persistência de Memória do Chat IA:**
   - Atualmente a conversa reseta ao atualizar a página `/ai`. É preciso criar uma tabela `chat_history` no `studium.db` e atrelá-la ao frontend para que a IA "lembre" das suas sessões de estudo passadas usando `better-sqlite3`.

2. **Integração Real do 42.rioPreparation:**
   - Absorver definitivamente o app isolado para dentro do Studium.
   - Mover arquivos Markdown dele para `library/42-prep/curriculum/`.
   - Trazer as fases de C e Shell e os exames ("Gatekeeper Exams") para a rota `/track/42-prep`.

3. **Evolução do FTS5 (Busca RAG):**
   - Garantir que a extração em lote dos PDFs suporte documentos absurdamente grandes sem travar o worker Node.js.

---
*Pronto para iniciar. Apenas copie tarefas daqui e execute na sua próxima sessão de War OS!*
