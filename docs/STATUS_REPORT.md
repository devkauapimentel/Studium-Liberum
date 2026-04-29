# 📊 Status Report & Overview: Studium Liberum (War OS)

**Versão Atual:** 0.1.0
**Status:** Desenvolvimento Ativo (Fases 1 a 5 Concluídas; Focando agora em Estabilização e IA)

---

## 1. Visão Geral do Sistema

O **Studium Liberum** é um sistema de "Universidade Local" (Offline-First) desenvolvido para centralizar os estudos de alto desempenho de Kauã Pimentel. Foi concebido com base no **"Protocolo MIT / War OS"**, focando em produtividade extrema, ausência total de distrações e mitigação de fricção para indivíduos com TDAH.

### Core Stack
- **Framework:** Next.js 16.2 (App Router)
- **Estilização:** Tailwind CSS 4.2
- **Linguagem:** TypeScript
- **Banco de Dados/Indexador:** SQLite (preparado para buscas FTS5 rápidas e offline)
- **Integração IA:** Ollama e Kiwix previstos na arquitetura local.

---

## 2. O Que Já Foi Desenvolvido (Fases 1 a 5)

A fundação do software já está construída, testada e em operação:

### 🎯 Dashboard Linear e Anti-TDAH
- O frontend (acessível em `localhost:3000`) remove as escolhas exaustivas de navegação. Ele mostra diretamente de onde o usuário parou através de botões **"Continuar"**, impedindo o "rabbit hole" de abrir dezenas de pastas.
- Utiliza **Next.js Link** para garantir uma navegação SPA instantânea e fluida, sem recarregar a tela.
- O progresso dos vídeos é salvo no background usando `localStorage` e arquivos `progress.json`.

### 🗂️ Motor Semântico Universal (Sistema de Arquivos Inteligente)
A arquitetura não lê apenas os arquivos; ela compreende o ecossistema educacional.
- **Uninter:** Ao abrir uma disciplina, se um arquivo PDF (`.pdf`) e um vídeo da aula dividirem a mesma pasta física (em `/library`), o sistema reconhece a relação semântica e exibe o PDF como "Material de Apoio" diretamente abaixo do player.
- **Rocketseat:** Foi criada a base para suportar ecossistemas complexos. 
  - **Syllabus Parser:** O motor lê um arquivo de gabarito (`sumario_rocketseat.txt`) para forçar a organização estrita e cronológica dos módulos na UI, sobrepondo a ordem alfabética imposta pelo sistema operacional (Linux).
  - Suporte total a renderização de atalhos externos (`.url`) e ferramentas de design (`.fig`), oferecendo botões contextuais imediatos ("Baixar Figma", "Abrir Link").

### 🎬 Cinema Mode (Player de Vídeo de Alta Frequência)
- O reprodutor de vídeo possui uma interface "Glassmorphism" translúcida e flutuante que se auto-oculta (**Modo Foco**) após 3 segundos de inatividade, sumindo inclusive com o cursor do mouse.
- Suporta múltiplos atalhos de teclado de produtividade (Space, Setas, K, M, F).
- Barra de progressão construída "from scratch", livre de barras genéricas do HTML5, garantindo que a imersão seja inquebrável.
- Ao finalizar um módulo, uma tela de **Vitória** (Confetti e Status) é disparada para fornecer reforço de dopamina imediata (técnica para TDAH) e redirecionar compulsoriamente para o vídeo subsequente em 5 segundos.

### 🕳️ "O Wormhole" (Integração do App 42.rioPreparation)
- Ao invés de reconstruir o currículo de C e Shell brutalista da 42 Rio, o projeto anterior (`42.rioPreparation`), já construído em Next.js, foi envelopado diretamente no War OS como a rota `/track/42-prep`.
- Isso atende à diretiva de consolidação: um único servidor roda o universo completo do usuário (faculdade, programação e piscina).

### 🔧 Roteamento de Vídeo Local (API Range Request)
- Implementada a API `/api/serve/route.ts` que lida com `Range Requests` emulando servidores CDN robustos para entregar grandes arquivos mp4 locais sem explodir a RAM do Node.js.
- Foram introduzidos mecanismos de segurança e `AbortSignal` listeners para impedir vazamentos de memória e erros do Next.js overlay. (Ainda requer estabilização fina na Fase 6).

---

## 3. Diretrizes de Arquitetura em Vigor

O documento-mestre de orquestração `AGENTES.md` e o `CHANGELOG.md` definem:
1. **Regras estritas:** Nenhuma ação fora da pasta do projeto. Configurações pessoais isoladas no `data/config.json` (gitignored). Push duplo para public e private origin.
2. **Offline-First:** Nenhuma funcionalidade deve quebrar caso o cabo de rede seja desconectado. Todas as "fontes da verdade" vêm do disco rígido local.
3. **Desempenho:** Streaming por chunks pequenos (atualmente testando 256KB a 1MB), leitura otimizada e buffers limitados na memória.

---

## 4. O Cenário Atual (Roadmap)

Embora a infraestrutura UI/UX seja robusta, o motor C++ de leitura e entrega de `Range Requests` em streaming de vídeo (o coração da plataforma) apresenta falhas intermitentes ao processar "Seek" (avançar rapidamente a linha do tempo), causando congelamentos. 

A resolução deste impasse marca o início da **Fase 6**, pavimentando o caminho para a introdução dos Modelos de Linguagem locais (**Fases 7 e 8**) que tornarão o Studium Liberum totalmente autônomo.
