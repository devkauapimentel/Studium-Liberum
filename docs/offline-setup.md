# Guia de Configuração Offline Máxima (The MIT Stack)

O Studium Liberum foi desenhado para ser invulnerável a quedas de internet, paywalls ou censuras. Para garantir isso, operamos com a "Offline Stack", que é baseada no Kiwix e no Zeal.

## 1. Kiwix (O Repositório Global)

O Kiwix é um leitor offline que hospeda cópias massivas da internet inteira em formato ZIM (arquivos super compactados). 
No Studium Liberum, nós focamos na "Stack Dev":
- Stack Overflow completo (sem depender do Google).
- Wikipedia de Ciência da Computação.
- Documentações oficiais via DevDocs.

### Instalação (Pop!_OS / Ubuntu)
```bash
flatpak install flathub org.kiwix.desktop
```
*(Ou instale via servidor CLI para rodar silenciosamente em background).*

### Baixando Arquivos ZIM
1. Abra o Kiwix.
2. Navegue até a biblioteca (Library).
3. Busque por "Stack Overflow" e baixe a versão em Inglês de programação.
4. Busque por "DevDocs" e faça o download.

No Studium Liberum, você pode acessar a UI web do Kiwix através da rota `/offline` se o servidor local (`localhost:8080`) estiver rodando.

---

## 2. Zeal (Documentação Ultra Rápida Nativa)

Zeal é um navegador de documentações offline desenhado para desenvolvedores de software. Ele baixa os docsets do *Dash* (macOS) e os disponibiliza no Linux. 
É muito mais rápido que o Kiwix porque é construído de forma nativa e indexado por chaves API.

### Instalação (Pop!_OS / Ubuntu)
```bash
sudo apt install zeal
```

### Configurando o Studium Liberum + Zeal
O Studium Liberum possui integração nativa com o protocolo `zeal://`.
Ao acessar a página de `Central Offline`, você pode clicar nos botões que injetam a chamada do Zeal. 

Exemplo: se você quer saber tudo sobre Flexbox no CSS, pode clicar no link e o Zeal vai estourar na sua tela com o doc aberto em menos de 100ms.

### Baixando Documentações
1. Abra o Zeal.
2. Vá em `Tools > Docsets`.
3. Na aba `Available`, baixe `C`, `C++`, `Docker`, `PostgreSQL`, `React`, `HTML`, `CSS` e `JavaScript`.

---

## 3. Livros de Referência Base (Os Sagrados)

A pasta `library/dev-refs/` foi criada no seu diretório raiz. É lá que você deve baixar e largar os "Livros Pilares" de Ciência da Computação ensinados no MIT:

1. **SICP** - Structure and Interpretation of Computer Programs.
2. **CSAPP** - Computer Systems: A Programmer's Perspective.
3. **OSTEP** - Operating Systems: Three Easy Pieces.
4. **DDIA** - Designing Data-Intensive Applications.

Quando você dropar os PDFs lá dentro, o **Motor RAG FTS5 do Studium Liberum** (nossa Inteligência Artificial) vai escanear esses livros sagrados silenciosamente na próxima compilação, e você poderá fazer perguntas profundas direto no Chat!
