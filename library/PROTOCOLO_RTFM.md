# Protocolo RTFM: Como Aprender Lendo Documentações

A habilidade de ler documentações (conhecida pelos sêniores como "RTFM" - *Read The Fucking Manual*) é a barreira que separa um júnior dependente de um engenheiro autônomo. Na **42 Network** e no **Protocolo MIT**, não há professores segurando a sua mão. O manual é a sua única fonte da verdade.

Documentações oficiais não foram feitas para serem lidas como um livro de romance (da primeira à última página). Elas são mapas territoriais.

Aqui está o guia definitivo de como extrair conhecimento direto da fonte.

---

## 1. Mude o seu Mindset
Tutoriais do YouTube te ensinam a resolver **um** problema específico que o autor teve.
Documentações te ensinam como a **ferramenta funciona por baixo dos panos**, permitindo que você resolva **qualquer** problema.
Pare de procurar "como fazer X no React" e comece a perguntar "o que é X e como a arquitetura do React lida com ele?".

## 2. A Anatomia Padrão de um Manual
Quase toda documentação técnica no mundo (C, React, Docker, etc.) segue a mesma estrutura. Domine-a:

1. **Getting Started / Quick Start:** O "Hello World". Onde você vê a coisa funcionando em 5 minutos. Use isso apenas para configurar o ambiente.
2. **Concepts / Core / Fundamentals:** **(Onde você deve focar primeiro)**. Explica os conceitos arquiteturais. Ex: No Docker, a diferença entre Image e Container. No React, o Virtual DOM. Leia isso como um livro didático.
3. **API Reference / Referência da API:** O "dicionário". É a lista de todas as funções, métodos, parâmetros e tipos (ex: `printf` no C). **Não se lê isso de ponta a ponta**. Você só abre a API Reference quando precisa consultar o que uma função específica aceita e o que ela retorna.
4. **Guides / Cookbooks:** Casos de uso práticos ensinados pela própria equipe da ferramenta (ex: "Como conectar no banco de dados").

---

## 3. A Estratégia de Leitura em 4 Fases

### Fase 1: O Voo de Pássaro (Skimming)
Quando for aprender uma tecnologia nova, não leia o código logo de cara.
- Leia a Introdução para entender **qual problema a ferramenta resolve**.
- Olhe o Menu Lateral (Sidebar). O menu lateral é o índice do mapa. Ele te mostra o tamanho da ferramenta e onde as coisas estão.
- Se familiarize com os jargões. Ex: O React usa "Hooks", "Props", "State". O Docker usa "Volumes", "Networks".

### Fase 2: O Foco na Arquitetura (Conceitos)
Vá direto para a seção de "Conceitos Essenciais". 
Aqui você deve gastar energia mental. Faça anotações no Obsidian. Entenda os blocos de fundação. Se você pular essa parte e for direto para o código, você vai programar "na base da tentativa e erro", o que gera dívida técnica e bugs.

### Fase 3: A Busca Cirúrgica (Ctrl+F é seu melhor amigo)
Quando você for programar de verdade, vai esquecer o nome da função ou a ordem dos parâmetros. É aqui que entra o Studium Liberum.
- Você precisa alocar memória em C? Busque por `malloc`.
- O foco aqui é abrir a **API Reference**.
- Olhe a **Assinatura da Função**: `void* malloc( size_t size );`
  - O que ela recebe? (um `size_t`).
  - O que ela retorna? (um ponteiro nulo `void*`).
- Sempre olhe as **condições de erro**. O que a função faz se falhar? (Retorna `NULL`).

### Fase 4: Reprodução (Código de Exemplo)
No fim da página de uma função na documentação (como no `cppreference`), sempre há um bloco de código de exemplo.
- Não copie e cole.
- Leia o código de exemplo linha por linha. Tente adivinhar qual será o "Output" (saída) impresso no terminal antes de rodá-lo.
- Digite o código no seu próprio editor para treinar a memória muscular.

---

## 4. Como lidar com a Frustração e Textos Densos (ex: C / RFCs)

Documentações muito maduras e de baixo nível (como C e Linux) têm um nível de precisão acadêmica. Elas usam termos difíceis para evitar ambiguidades.
- **Não entre em pânico.** Se você não entender uma palavra (ex: "comportamento indefinido / undefined behavior"), jogue a palavra na busca e aprenda ela primeiro.
- Leia um parágrafo denso três vezes. Se não entender, escreva no chat do **Modo Socrático do Studium Liberum**: *"Estou lendo a documentação do `malloc` e não entendi a frase X. Me explique usando uma analogia sem me dar código"*.

A genialidade vem da paciência de mastigar o texto técnico até ele fazer sentido.

> *"If you read the manual, you will know. If you know, you will win."*
