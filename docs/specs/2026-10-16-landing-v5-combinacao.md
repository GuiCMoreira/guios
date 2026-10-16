# Landing v5 — combinação dos efeitos aprovados no /lab

Aprovados (16/10/2026): #01 DotGrid, #02 TechText, #05 DecryptedText, #06 RotatingText,
#07 SplitFlapText, #09 TargetCursor, #10 Crosshair, #11 ClickSpark, #13 StarBorder,
#14 GlareHover, #17 LogoLoop, #20 Threads, #23 ShinyText + GradientText, #24 FuzzyText.

## Onde cada um entrou e o que saiu

| # | Efeito | Onde | Substitui |
|---|---|---|---|
| 01 | DotGrid | fundo do hero | grade de pontos CSS estática |
| 02 | TechText | nome no hero (uma instância por linha) | nome em texto, "Carvalho" em contorno |
| 05 | DecryptedText | comando de todos os prompts `gui@os:…` | prompt estático |
| 06 | RotatingText | linha do cargo | `// desenvolvedor fullstack` fixo |
| 07 | SplitFlapText | selo de disponibilidade | texto "disponível para novas oportunidades" |
| 09 | TargetCursor | cursor da página | anel + ponto (CursorFX, removido) |
| 10 | Crosshair | só na seção do GuiOS | — |
| 11 | ClickSpark | clique em qualquer lugar | faíscas em CSS do CursorFX |
| 13 | StarBorder | CTAs principais (Ver projetos, Entrar no GuiOS, e-mail) | pílula lisa |
| 14 | GlareHover | imagem dos cards de projeto | holofote que seguia o mouse (removido) |
| 17 | LogoLoop | faixa da stack abaixo do hero | marquee de texto (VelocityMarquee, removido) |
| 20 | Threads | fundo da seção de contato | fundo liso |
| 23 | ShinyText | dica "psiu — experimenta o botão direito" | texto fixo |
| 23 | GradientText | "sistema operacional." e "algo juntos?" | marca-texto azul |
| 24 | FuzzyText | "404" na tela de kernel panic | emoji 💥 |

Mantidos: toda a coreografia de scroll, foto com tilt, botões magnéticos, menu do botão
direito, barra de progresso, títulos que sobem palavra a palavra, modal de projetos.

## Conflitos encontrados e como resolvi

1. **Três cursores no mesmo lugar** (TargetCursor, Crosshair e o CursorFX antigo). Dois
   desenhando o cursor ao mesmo tempo brigam; e o Crosshair também "trava" com colchetes
   nos alvos, duplicando a mira. → TargetCursor é o cursor da página; o CursorFX saiu; o
   Crosshair ficou restrito à seção do GuiOS, sem efeito de trava (só as linhas e X/Y).
   Os rótulos "abrir ↗" sobreviveram: o TargetCursor lê o mesmo `data-cursor-label`.
2. **Duas luzes no mesmo card** (GlareHover + holofote atual). → ficou só o reflexo, e só
   na imagem (o texto do card não passa por baixo do brilho).
3. **ShinyText e SplitFlapText no mesmo selo** ("disponível"): no lab os dois foram
   sugeridos para ele. → o painel de aeroporto ficou com o selo; o brilho foi para a dica
   do botão direito.
4. **TechText e o contorno do "Carvalho"**: o TechText desenha preenchido, sem contorno.
   → "Carvalho" virou a mesma fonte em cinza (mantém a hierarquia das duas linhas).
5. **TechText nos títulos de seção** (ideia original): cada instância é um canvas animado;
   nos 6 títulos, somado à animação de palavras e ao prompt que descriptografa, ficaria
   pesado e repetitivo. → só no nome, onde é a assinatura do site.
6. **GradientText × marca-texto**: os dois destacam a mesma frase. → gradiente no lugar.
7. **ClickSpark × reduzir movimento / toque**: faíscas desligadas com reduced-motion; no
   toque continuam (o TargetCursor e o Crosshair se desligam sozinhos sem mouse).

## Ajustes de lapidação

- TechText guarda 5% de margem à esquerda → canvas alargado e puxado de volta para o
  nome alinhar com a coluna.
- Alcance do TechText de 200px → 90px: com 200 o mouse numa linha acendia a outra.
- No toque, sem "inspeção" de letra (aparecia sozinha na primeira letra).
- SplitFlap: completava até 12 placas (bolinhas vazias) → só o tamanho da maior palavra;
  conjunto de caracteres com acentos para "DISPONÍVEL".
- StarBorder com fundo cheio: os CTAs continuam parecendo o botão principal.
- TargetCursor em mistura normal: em "diferença", o azul virava laranja no tema claro.
- ShinyText com as cores do tema: o padrão sumia no tema claro.
- `<h1>` continua no DOM com "Guilherme Carvalho" (SEO e leitores de tela); a versão
  estática aparece enquanto o canvas carrega.
- WebGL (DotGrid, Threads) só monta perto da tela; sem WebGL, o fundo fica liso e o
  conteúdo aparece normalmente.

## Validação

Lighthouse local 100/100/100/100 (desktop e mobile). Capturas no Playwright (com WebGL)
em tema escuro, claro e 390px; sem scroll lateral; zero erros de console.

## Rodada 2 (16/10/2026) — pedidos do Guilherme sobre a prévia

| Pedido | O que foi feito |
|---|---|
| Remover o painel de aeroporto (#07) | Saiu da landing; o selo "disponível" voltou a ser texto com o ponto verde |
| Header com o usuário do GitHub | `gui@os` → `GuiCMoreira` |
| Foto pequena perto do nome | Foto acompanha o bloco do nome: até 34rem (≈480px em 1600px de largura) |
| "psiu — botão direito" ilegível | O ShinyText converte a cor sozinho e não entende `var()` (virava preto); cores literais por tema |
| Carrossel da stack em arco | Voltou o carrossel reto da produção, idêntico, com o losango ✦ menor |
| Ordem dos projetos | Eliteh Protect, valorant-strathub, GuiOS, restaurant-digital, NavalhaGo, FinanceMy (constante `ORDER` em `projects.ts`) |
| NavalhaGo com imagens | Captura real do README (`hoje-desktop-claro`, dados de demonstração) e texto refeito a partir do README; repositório segue privado |
| Tela do MacBook abrindo ao contrário | Tampa com duas faces e perspectiva de cima: começa fechada (vê-se o logo por fora) e abre até ficar de pé |
| Base mais estreita que a tela | Base com a mesma largura da tela, reta; só a tampa se move |
| Texto e botão do GuiOS sumindo | Ficam visíveis depois de aparecer e só somem se rolar de volta para cima; MacBook dimensionado para tudo caber na altura da janela |
| Mais ferramentas, fonte menor | 30 ferramentas (perfil do GitHub + Altec) em fonte menor; para acrescentar, basta editar `STACK_ROWS` |
| Tags da Altec | Levantadas dos repositórios da organização com commits do Guilherme (riser3, logos, caixa-legado, BI, riser1, one-landing, comanda) |
| Card "Desenvolvedor Web" confuso | Agora: Altec (trabalho) · FATEC (formação) · Projetos pessoais e estudos (cartão mais claro, tracejado, "por conta própria") |
| E-mail parecia o canal principal | LinkedIn e Instagram em destaque na landing, no app Contato e no terminal do GuiOS e no menu do botão direito; e-mail virou opção secundária |
| Formulário de contato | Assunto, nome, canais de resposta (WhatsApp, LinkedIn, e-mail, ligação) que abrem o campo de cada um, melhor horário, mensagem; validação nos dois lados, campo-armadilha e limite de envios; entrega por FormSubmit (ou Resend com `RESEND_API_KEY`) |

## Rodada 3 (16/10/2026)

- Capas sem corte: moldura 16:10 (a proporção das capturas), imagem inteira (`object-contain`), sem o parallax/zoom que exigia cortar as bordas; a largura do slide acompanha a altura da janela.
- Eliteh Protect recapturada sem a caixa de cookies (cookies recusados antes do print).
- Fotos originais em alta: 3x4 no topo e 9:16 (original inteira) em "Além do código", regravadas em webp sem metadados (as originais não tinham GPS).
