# Changelog

## [1.0.0] — 2026-08-19

### GuiOS v1 — lançamento inicial

- **Desktop OS**: boot screen pulável (1x por sessão), wallpaper com auroras discretas, menu bar (app focado, idioma, relógio), dock com tiles em gradiente e indicadores de app aberto.
- **Window manager**: janelas arrastáveis com foco por clique (z-index), minimizar/restaurar, maximizar (botão e double-click), fechar; error boundary por janela.
- **App Projetos**: navegador estilo Finder com categorias (Destaques/Web/Mobile/Todos), detalhe com highlights, stack e links; deep-link via terminal e palette.
- **App Terminal**: comandos help, whoami, ls projetos, open, stack, carreira, neofetch, hire --me, lang, clear, sudo (easter egg), exit (easter egg); histórico com ↑/↓.
- **App Sobre**: bio, timeline de carreira, painel "Sobre este Dev".
- **App Contato**: GitHub, LinkedIn, e-mail.
- **Command palette (⌘K/Ctrl+K)**: apps, projetos e ações de sistema.
- **Mobile**: experiência de smartphone OS — status bar, grade de apps, apps em tela cheia.
- **i18n**: PT-BR/EN com detecção automática e persistência.
- **A11y/SEO**: prefers-reduced-motion, foco visível, metadata OpenGraph completa, favicon próprio.
- **QA**: roteiro com 32 cenários executados — 32 PASS.

## [2.0.0] — 2026-08-20

### Re-skin macOS autêntico

- **Tema duplo**: claro e escuro, seguindo a preferência do sistema, com toggle na menu bar (e no mobile). Tokens semânticos de cor em todo o app.
- **Menu bar fiel ao macOS**: logo, nome do app em negrito, menus "Arquivo" e "Ajuda" funcionais, Wi-Fi/bateria/busca, data e hora no formato do Mac.
- **Dock estilo macOS**: efeito magnification com vizinhança, separador vertical, bounce ao abrir e tooltips; ícones de GitHub, LinkedIn e Instagram para acesso rápido.
- **Ícones estilo Apple**: Finder (Projetos), Terminal, Notes (Sobre) e Mail (Contato) — recriações próprias em SVG.
- **Sobre virou Notes**: sidebar de notas com seleção amarela (Sobre, Experiência, Stack & specs).
- **Wallpaper fotográfico** P&B com grão (self-hosted), clareado/escurecido conforme o tema.
- **Contato** ganhou card do Instagram.

## [2.1.0] — 2026-08-20

### Safari.app 🧭

- Novo app **Safari**: barra de endereço com histórico real (voltar/avançar/recarregar), start page de favoritos e atalhos para os projetos em destaque.
- **GitHub renderizado**: digitar github.com (ou clicar no favorito) mostra o perfil real do Gui via API pública — avatar, bio, seguidores e repositórios recentes com linguagem e stars (cache de sessão).
- **Sites com iframe liberado** carregam dentro do navegador; sites que bloqueiam embed (LinkedIn, Instagram etc.) mostram página de bloqueio estilo Safari com botão "Abrir em nova aba".
- Preparado para rodar demos dos projetos embutidas quando forem hospedadas.
- Ícone de bússola estilo macOS; no mobile o Safari entra na grade da home.

## [4.0.0] — 2026-10-15

### Landing "a parte de fora do GuiOS" ⚡

- **Full-width de verdade**: a página usa a tela inteira (respiro lateral fluido), hero de
  100dvh com o nome em escala gigante — segunda linha só em contorno.
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

## [3.1.0] — 2026-10-15

### Vitrine com imagens e detalhe por projeto 🖼️

- **Cards com captura real** na landing: screenshot da página inicial de cada projeto
  (sites em produção, captura oficial do FinanceMy com dados fictícios, capa própria do NavalhaGo).
- **Modal de detalhe** ao clicar no card: imagem grande, descrição estendida, destaques técnicos,
  stack completa e ações (demo/GitHub, ou nota de repositório privado). Esc/backdrop fecham.
- **GuiOS entrou na vitrine como projeto** (com botão "Entrar no GuiOS") e **NavalhaGo** estreia
  com selo "em desenvolvimento".
- Selo WIP para projetos em desenvolvimento ativo (FinanceMy, NavalhaGo).

## [3.0.0] — 2026-10-15

### Landing híbrida 🏠

- **Nova home clássica em `/`**: landing editorial (claro/escuro, PT/EN) com hero
  "open to work", projetos selecionados, stack agrupada, timeline de experiência,
  sobre e contato — pensada para recrutadores e visitantes fora da área.
- **GuiOS movido para `/os`**, com seção na landing exibindo o sistema REAL rodando
  em miniatura dentro de um mockup de MacBook (iframe lazy `?preview=1`, escalado e
  não interativo) e CTA "Entrar no GuiOS".
- **Onboarding no GuiOS**: no primeiro boot da sessão (desktop), o app Sobre abre
  sozinho — ninguém mais cai numa mesa vazia sem saber onde clicar.
- Sitemap com as duas rotas; metadata raiz atualizada para o formato híbrido.

## [2.2.0] — 2026-08-20

### Guigle, vida no sistema e prontidão para o mundo

- **Guigle™**: buscador paródia no Safari — pesquisas recentes na start page, animação de busca e resultados que apontam todos para o Guilherme.
- **Lixeira no dock**: os bugs reais deletados durante o desenvolvimento deste site, com direito a lápides. 🪦
- **Terminal**: novos comandos `matrix` (chuva de caracteres), `coffee` e `guigle <termo>`.
- **Widget de clima real** de Bragança Paulista (Open-Meteo) no desktop.
- **Notificação estilo macOS** convidando para contato após 45s de exploração (1x por sessão).
- **Menu de contexto** no botão direito do desktop (wallpaper, Ajustes, Terminal, Sobre).
- **Seletor de wallpaper** nos Ajustes: água-viva, montanhas, ponte à noite ou gradiente.
- **Pronto para o mundo**: OG image (preview bonito ao compartilhar o link), 404 kernel panic, PWA instalável (manifest + ícones), robots.txt e sitemap.
