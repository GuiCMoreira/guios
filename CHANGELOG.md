# Changelog

## [1.0.0] - 2026-08-19

### GuiOS v1: lançamento inicial

- **Desktop OS**: boot screen pulável (1x por sessão), wallpaper com auroras discretas, menu bar (app focado, idioma, relógio), dock com tiles em gradiente e indicadores de app aberto.
- **Window manager**: janelas arrastáveis com foco por clique (z-index), minimizar/restaurar, maximizar (botão e double-click), fechar; error boundary por janela.
- **App Projetos**: navegador estilo Finder com categorias (Destaques/Web/Mobile/Todos), detalhe com highlights, stack e links; deep-link via terminal e palette.
- **App Terminal**: comandos help, whoami, ls projetos, open, stack, carreira, neofetch, hire --me, lang, clear, sudo (easter egg), exit (easter egg); histórico com ↑/↓.
- **App Sobre**: bio, timeline de carreira, painel "Sobre este Dev".
- **App Contato**: GitHub, LinkedIn, e-mail.
- **Command palette (⌘K/Ctrl+K)**: apps, projetos e ações de sistema.
- **Mobile**: experiência de smartphone OS: status bar, grade de apps, apps em tela cheia.
- **i18n**: PT-BR/EN com detecção automática e persistência.
- **A11y/SEO**: prefers-reduced-motion, foco visível, metadata OpenGraph completa, favicon próprio.
- **QA**: roteiro com 32 cenários executados, 32 PASS.

## [2.0.0] - 2026-08-20

### Re-skin macOS autêntico

- **Tema duplo**: claro e escuro, seguindo a preferência do sistema, com toggle na menu bar (e no mobile). Tokens semânticos de cor em todo o app.
- **Menu bar fiel ao macOS**: logo, nome do app em negrito, menus "Arquivo" e "Ajuda" funcionais, Wi-Fi/bateria/busca, data e hora no formato do Mac.
- **Dock estilo macOS**: efeito magnification com vizinhança, separador vertical, bounce ao abrir e tooltips; ícones de GitHub, LinkedIn e Instagram para acesso rápido.
- **Ícones estilo Apple**: Finder (Projetos), Terminal, Notes (Sobre) e Mail (Contato), recriações próprias em SVG.
- **Sobre virou Notes**: sidebar de notas com seleção amarela (Sobre, Experiência, Stack & specs).
- **Wallpaper fotográfico** P&B com grão (self-hosted), clareado/escurecido conforme o tema.
- **Contato** ganhou card do Instagram.

## [2.1.0] - 2026-08-20

### Safari.app 🧭

- Novo app **Safari**: barra de endereço com histórico real (voltar/avançar/recarregar), start page de favoritos e atalhos para os projetos em destaque.
- **GitHub renderizado**: digitar github.com (ou clicar no favorito) mostra o perfil real do Gui via API pública: avatar, bio, seguidores e repositórios recentes com linguagem e stars (cache de sessão).
- **Sites com iframe liberado** carregam dentro do navegador; sites que bloqueiam embed (LinkedIn, Instagram etc.) mostram página de bloqueio estilo Safari com botão "Abrir em nova aba".
- Preparado para rodar demos dos projetos embutidas quando forem hospedadas.
- Ícone de bússola estilo macOS; no mobile o Safari entra na grade da home.

## [2.2.0] - 2026-08-20

### Guigle, vida no sistema e prontidão para o mundo

- **Guigle™**: buscador paródia no Safari: pesquisas recentes na start page, animação de busca e resultados que apontam todos para o Guilherme.
- **Lixeira no dock**: os bugs reais deletados durante o desenvolvimento deste site, com direito a lápides. 🪦
- **Terminal**: novos comandos `matrix` (chuva de caracteres), `coffee` e `guigle <termo>`.
- **Widget de clima real** de Bragança Paulista (Open-Meteo) no desktop.
- **Notificação estilo macOS** convidando para contato após 45s de exploração (1x por sessão).
- **Menu de contexto** no botão direito do desktop (wallpaper, Ajustes, Terminal, Sobre).
- **Seletor de wallpaper** nos Ajustes: água-viva, montanhas, ponte à noite ou gradiente.
- **Pronto para o mundo**: OG image (preview bonito ao compartilhar o link), 404 kernel panic, PWA instalável (manifest + ícones), robots.txt e sitemap.

## [3.0.0] - 2026-10-15

### Landing híbrida 🏠

- **Nova home clássica em `/`**: landing editorial (claro/escuro, PT/EN) com hero
  "open to work", projetos selecionados, stack agrupada, timeline de experiência,
  sobre e contato, pensada para recrutadores e visitantes fora da área.
- **GuiOS movido para `/os`**, com seção na landing exibindo o sistema REAL rodando
  em miniatura dentro de um mockup de MacBook (iframe lazy `?preview=1`, escalado e
  não interativo) e CTA "Entrar no GuiOS".
- **Onboarding no GuiOS**: no primeiro boot da sessão (desktop), o app Sobre abre
  sozinho: ninguém mais cai numa mesa vazia sem saber onde clicar.
- Sitemap com as duas rotas; metadata raiz atualizada para o formato híbrido.

## [3.1.0] - 2026-10-15

### Vitrine com imagens e detalhe por projeto 🖼️

- **Cards com captura real** na landing: screenshot da página inicial de cada projeto
  (sites em produção, captura oficial do FinanceMy com dados fictícios, capa própria do NavalhaGo).
- **Modal de detalhe** ao clicar no card: imagem grande, descrição estendida, destaques técnicos,
  stack completa e ações (demo/GitHub, ou nota de repositório privado). Esc/backdrop fecham.
- **GuiOS entrou na vitrine como projeto** (com botão "Entrar no GuiOS") e **NavalhaGo** estreia
  com selo "em desenvolvimento".
- Selo WIP para projetos em desenvolvimento ativo (FinanceMy, NavalhaGo).

## [4.0.0] - 2026-10-15

### Landing "a parte de fora do GuiOS" ⚡

- **Full-width de verdade**: a página usa a tela inteira (respiro lateral fluido), hero de
  100dvh com o nome em escala gigante, segunda linha só em contorno.
- **Cursor próprio do sistema**: ponto + anel em mix-blend-difference, cresce sobre
  interativos, vira rótulo "abrir ↗" nos cards e solta faíscas no clique. Só em ponteiro
  fino e sem prefers-reduced-motion.
- **Botão direito é nosso**: menu de contexto do sistema (Entrar no GuiOS, copiar e-mail,
  tema, idioma, sociais) no lugar do menu do navegador.
- **Voz de terminal**: títulos de seção viram prompts (`gui@os:~/projetos$ ls --destaques`)
  e entram palavra por palavra (SplitText); números 01–05 aposentados.
- **Marquee da stack** que acelera e inverte com a velocidade do scroll (ScrollVelocity).
- **Foto com tilt 3D** que revela a cor no hover; **botões magnéticos**; **holofote** que
  segue o mouse nos cards; **barra de progresso** de scroll âmbar.
- Grid de projetos assimétrico (7/5 · 5/7 · 6/6). Tudo degradando com elegância no touch
  e com reduced-motion. Inspiração: react-bits, implementado em casa só com motion.

## [4.1.0] - 2026-10-15

### Scroll coreografado e laboratório 🧪

- **Cada seção rola de um jeito**: o hero se afasta (encolhe, desfoca e some), os
  **projetos travam a tela e passam na horizontal** (contador e barra de progresso),
  a **tela do MacBook se levanta** até mostrar o GuiOS de frente, as ferramentas viram
  faixas gigantes que deslizam em sentidos opostos, a experiência vira **cartões que
  empilham**, o texto do "Sobre" **acende palavra por palavra** e o título do contato
  cresce até ocupar a tela.
- **Acento azul claro** no lugar do amarelo (com versão escura para texto no tema claro,
  mantendo contraste AA).
- **Cursor centralizado**: o anel recebia o deslocamento de −50% três vezes (classe do
  Tailwind no wrapper, classe no anel e `style` do motion).
- **Carrossel da stack legível**: a velocidade era em % por frame; agora é em % por
  segundo, com aceleração do scroll limitada a 3x.
- **/lab**: 24 protótipos do React Bits rodando com o conteúdo e as cores do portfólio,
  com botão de aprovar e "copiar lista" para escolher o que entra no site.

## [5.0.0] - 2026-10-16

### Landing v5: efeitos aprovados no /lab, contato de verdade e vitrine refeita

- **Efeitos do React Bits aprovados no laboratório**, combinados sem conflito: grade de pontos viva
  no hero, nome em TechText, prompts que se descriptografam, cargo que alterna, mira que trava nos
  alvos (com "abrir ↗"), mira com coordenadas na seção do GuiOS, faíscas de clique, estrelas na
  borda dos botões principais, reflexo nas capas, fios atrás do contato, brilho e gradiente nos
  destaques e "404" com interferência.
- **Formulário de contato**: assunto, nome, canais de resposta (WhatsApp, LinkedIn, e-mail,
  ligação) que abrem o campo de cada um, melhor horário e mensagem; validação no navegador e no
  servidor, campo-armadilha contra robôs e limite de envios. Entrega por e-mail via FormSubmit
  (ou Resend, com `RESEND_API_KEY`).
- **LinkedIn e Instagram como canais principais** na landing, no GuiOS e no menu do botão direito;
  e-mail virou opção secundária.
- **MacBook abrindo de verdade**: tampa com duas faces que levanta de fechada até ficar de pé,
  base reta com a largura da tela; texto e botão do GuiOS ficam visíveis depois de aparecer.
- **Vitrine**: nova ordem (Eliteh Protect, valorant-strathub, GuiOS, restaurant-digital, NavalhaGo,
  FinanceMy), capturas em Full HD sem cortes, NavalhaGo com captura real do README, cards com a
  mesma altura e modal em duas colunas (imagem e informações) que não rola.
- **Experiência**: Altec com a stack real (levantada dos repositórios com commits do Guilherme),
  FATEC como formação e um cartão mais claro para projetos pessoais e estudos.
- **Ferramentas**: 30 itens em fonte menor; carrossel reto da stack mantido com losango menor.
- **Topo**: `GuiCMoreira` no header e fotos originais em alta (3x4 no topo, 9:16 no "Sobre"),
  regravadas sem metadados.

## [5.1.0] - 2026-10-16

### GuiOS para quem não é da área e README novo

- **App Projetos com capturas**: cada projeto mostra a imagem no card e no detalhe; o detalhe abre em
  duas colunas conforme a largura da janela e explica em linguagem simples o que é, que problema
  resolve e o que o Guilherme fez, antes da parte técnica ("Por dentro").
- **App Sobre detalhado**: notas Sobre, Experiência (Altec, FATEC, projetos pessoais) e Stack & specs
  reescritas em blocos; grupos de ferramentas compartilhados com a landing.
- **Janelas na área livre da mesa**: abrem sem cobrir o cartão de apresentação nem o clima, encolhem
  em telas menores e saem em cascata; janela movida pelo usuário mantém a posição.
- **Reduzir movimento sem erro de hidratação**: hook próprio (`useReducedMotionSafe`) e mesma
  estrutura de DOM nos dois modos; zero erros de console com e sem a preferência.
- Boot do GuiOS não mostra mais aviso de i18n no primeiro quadro.
- **README reformulado** com as três camadas (landing, GuiOS, laboratório), decisões técnicas,
  testes e capturas novas em webp.

## [5.1.1] - 2026-10-16

### Formulário de contato volta a entregar

- O FormSubmit (atrás do Cloudflare) passou a recusar as chamadas feitas a partir dos servidores da
  Vercel (`403 · Error 1010`, bloqueio por IP de datacenter), e toda mensagem terminava em "Não
  consegui entregar". Agora a rota valida e devolve o pedido pronto, e o navegador do visitante o
  envia ao FormSubmit. Com `RESEND_API_KEY`, a entrega continua saindo do servidor.

## [5.1.2] - 2026-10-16

### Sem travessão

- Todos os travessões do projeto saíram (497, em 82 arquivos). Nos textos do site, cada frase ganhou a
  pontuação que pede (vírgula, dois-pontos, ponto ou parênteses); títulos de página usam " | "
  (`Guilherme Carvalho | Desenvolvedor Fullstack`); intervalos e valores vazios usam hífen;
  comentários de código e documentos internos, hífen.

## [5.2.0] - 2026-10-16

### Notebook novo na seção do GuiOS

- A tampa feita à mão (que ficava de lado no meio da animação e mudava de tamanho) deu lugar ao
  **MacBook Scroll, do Aceternity UI**: com o scroll, a tela se levanta, sai do notebook e cresce até
  quem lê, com o GuiOS real rodando dentro.
- Adaptações: a tela recebe o iframe do GuiOS em vez de uma imagem; ícones do teclado trocados do
  `@tabler/icons-react` pelo `lucide-react` (sem dependência nova); o percurso da tela é medido
  para ela parar antes do texto e do botão "Entrar no GuiOS" em qualquer altura de janela.
- Abaixo de 768px e com "reduzir movimento", aparece um notebook parado (o componente tem 512px
  fixos e não foi pensado para ficar parado).

## [5.2.1] - 2026-10-16

### Papel de parede padrão

- O GuiOS abre com o **gradiente** como papel de parede (antes, a água-viva). Vale para quem nunca
  escolheu outro nos Ajustes e para a prévia no MacBook da landing; quem já escolheu mantém a
  escolha. O padrão fica em `DEFAULT_WALLPAPER`, em `src/lib/wallpaper.tsx`.
