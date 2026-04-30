# Protocolo RTFM: Como Aprender Autodidata (Foco TDAH)

A habilidade de ler documentações (conhecida pelos sêniores como "RTFM" - *Read The Fucking Manual*) é a barreira que separa um júnior dependente de um engenheiro autônomo. Na **42 Network** e no **Protocolo MIT**, não há professores. O manual é a sua única fonte da verdade.

Para quem tem **TDAH**, blocos gigantes de texto são o inimigo. Seu cérebro quer dopamina rápida (ver o código rodando). O segredo não é "ler tudo", o segredo é **ler a coisa certa, na hora certa, e testar imediatamente**.

Aqui está o guia altamente prático e acionável de como extrair conhecimento.

---

## 🛑 1. O Grande Erro: Tutoriais vs. Documentação

- **O que o Tutorial faz:** Te dá o "copiar e colar" para resolver um problema específico de outra pessoa. Quando o problema muda 1%, seu código quebra e você não sabe o porquê.
- **O que a Documentação faz:** Te dá as peças de lego. Ela te explica *como a ferramenta pensa*.

**Mindset TDAH:** Pare de procurar "como centralizar a div no CSS". Busque a documentação de `Flexbox`, leia os 3 conceitos principais, e teste no seu próprio arquivo.

---

## 🗺️ 2. O Mapa da Documentação (Para onde olhar?)

Quase toda documentação técnica no mundo (C, React, Docker) segue a mesma arquitetura. Pare de ler do início ao fim. Use a estrutura a seu favor:

### ⚡ A. Getting Started / Quick Start
- **O que é:** O código mínimo para a ferramenta rodar na sua máquina ("Hello World").
- **Quando usar:** **Apenas no Dia 1.** Use para instalar e fazer rodar. Depois, ignore.

### 🧠 B. Concepts / Core / Fundamentals
- **O que é:** A "Teoria da Coisa". Onde os criadores explicam a arquitetura. (Ex: No Docker, a diferença entre Image e Container. No React, o Virtual DOM).
- **Quando usar:** **Antes de codar.** Se você tem TDAH, force-se a ler apenas os Títulos e os esquemas visuais dessa aba. Se você pular isso, vai codar na base da "tentativa e erro" por horas.

### 📖 C. API Reference (A Bíblia de Consulta)
- **O que é:** O "dicionário" (ex: página do `printf` no C). Mostra todas as funções, o que elas recebem e o que retornam.
- **Quando usar:** **Enquanto estiver codando.** Você **nunca** lê isso de ponta a ponta. Você pesquisa o nome da função que precisa usar e consulta como usá-la.

---

## 🎯 3. O Método Prático (Exemplo Real: Aprendendo \`malloc\` em C)

Imagine que a Piscina da 42 mandou você alocar memória em C. Você abre o **Studium Liberum (Ctrl+K)** e busca `malloc`.

### Passo 1: Não leia o texto grande. Leia a "Assinatura da Função".
A primeira coisa que você vai procurar na tela é o código da função:
\`\`\`c
void* malloc( size_t size );
\`\`\`
**O que seu cérebro deve perguntar:**
1. **O que ela quer de mim?** R: Pede um número (`size_t size`), que é a quantidade de bytes.
2. **O que ela me devolve?** R: Um ponteiro genérico (`void*`), que é o endereço da memória alocada.

### Passo 2: O que acontece se der errado? (Return values)
Pule o texto denso e vá direto para a seção **Return value** (Valor de Retorno).
*No cppreference está escrito:* "On success, returns the pointer to the beginning of newly allocated memory. On failure, returns a null pointer (`NULL`)."
**Ação:** Agora você sabe que SEMPRE que usar `malloc`, você é obrigado a fazer um `if (ptr == NULL)` para checar erros.

### Passo 3: Roube o Código de Exemplo (Da maneira certa)
Toda documentação boa tem uma seção de **Example** no final. O cérebro com TDAH quer copiar e colar isso no projeto. **NÃO FAÇA ISSO.**
1. Abra um arquivo vazio (ou o `scratch/` do Studium Liberum).
2. Olhe para o exemplo do manual.
3. **Mude o contexto do código** para a sua própria analogia. Se o manual aloca memória para "numeros", escreva um código do zero alocando memória para "inimigos de um jogo".
4. Adicione um `printf` antes e depois da função para ver o estado mudando.

---

## 🤖 4. A Vantagem "Studium Liberum" (Para TDAH)

Se o texto da documentação for muito velho, muito denso, ou usar palavras como *undefined behavior* que estão te frustrando, **use o Modo Socrático da sua plataforma**.

**Vá no Chat de IA e digite:**
> *"Estou lendo a documentação do `malloc` e não entendi o que significa castar o `void*`. Não me dê a resposta pronta nem código, apenas faça uma analogia com a vida real para eu entender o conceito."*

A IA vai traduzir o texto complexo da documentação para a sua forma de aprendizado, sem roubar de você o processo de descoberta e raciocínio lógico da 42 Network.

**Resumo da Ópera:** A documentação é um supermercado. Você não entra no mercado e anda por todos os corredores lendo os rótulos. Você olha para as placas no teto (Concepts), vai direto para o corredor que precisa (API Reference), pega o seu produto (Exemplo), paga e vai embora codar.
