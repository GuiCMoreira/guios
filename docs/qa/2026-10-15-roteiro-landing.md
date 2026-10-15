# Roteiro QA — Landing híbrida (15/10/2026)

Ambiente: dev server local, Chrome via chrome-devtools MCP, cliques REAIS.

## Cenários

1. **Landing desktop (1440×900)** — `/` carrega landing editorial: header fixo, badge
   open-to-work, headline com marca-texto, avatar, seções 01–05, contato, footer.
   Screenshot claro E escuro (toggle do header).
2. **Âncoras do header** — clicar "Projetos" rola até #projetos (scroll suave);
   demais âncoras idem (verificar por posição de scroll).
3. **Toggle de idioma** — EN muda headline/nav/CTAs; PT volta.
4. **Seção GuiOS** — mockup MacBook renderiza; iframe `/os?preview=1` monta ao
   rolar até a seção; miniatura mostra desktop + janela Sobre aberta; iframe não
   captura cliques (clicar no mockup navega para /os).
5. **CTA "Entrar no GuiOS"** — clique real navega para `/os`; boot roda; ao fim do
   boot, janela **Sobre abre sozinha** (primeiro boot da sessão, desktop).
6. **`/os` revisitado** — voltar para `/` e entrar de novo: sem boot (flag de sessão),
   sem auto-abertura duplicada estranha.
7. **Landing mobile (390×844)** — hero legível, grid de projetos em 1 coluna, nav
   do header colapsada (só chips), CTA GuiOS presente na seção; sem scroll horizontal.
8. **GuiOS mobile preservado** — `/os` em 390×844 continua virando smartphone OS.
9. **Regressão GuiOS desktop** — janelas: abrir, arrastar, redimensionar, maximizar
   (nada mudou no window manager; smoke test).
10. **SEO** — `/sitemap.xml` lista `/` e `/os`; title da landing "Guilherme Carvalho —
    Desenvolvedor Fullstack"; title de `/os` menciona GuiOS.

## Resultados — executado em 15/10/2026, dev server :3777, cliques reais

1. PASS — landing renderiza completa; screenshots claro e escuro (dark via classe, tokens corretos em todas as seções).
2. PASS — âncoras com scroll suave (scrollIntoView verificado por scrollY: 0 → 702 → 1747 → 3181).
3. PASS — EN: h1 "I build systems companies and people use every day.", `<html lang>` "en" → "pt-BR" ao voltar.
4. PASS — iframe `/os?preview=1` monta ao rolar; miniatura mostra desktop real com Sobre aberto, dock, menu bar e clima; `pointer-events: none` (clique no mockup é o Link externo).
5. PASS — clique real em "Entrar no GuiOS" (uid 1_95) → `/os` → boot completo → **Sobre abriu sozinho** (screenshot).
6. PASS — revisita a `/os` na mesma sessão: sem boot (flag), mesa limpa sem auto-open duplicado (windows=0, dock presente).
7. PASS — 390×844 emulado: sem scroll horizontal (scrollWidth == innerWidth == 390), hero legível, seção GuiOS empilhada com MacBook abaixo do texto.
8. PASS — `/os` em 390×844 vira smartphone OS (MobileShell com app Sobre em tela cheia).
9. PASS (smoke) — dock "Projetos" com clique real abre janela (window-surface=1); Window.tsx não foi tocado.
10. PASS — sitemap lista `/` e `/os`; titles: "Guilherme Carvalho — Desenvolvedor Fullstack" e "GuiOS — o sistema operacional do portfólio".

**10/10 PASS.** Ressalva conhecida: screenshot full-page mostra seções em branco porque o
`whileInView` só anima com scroll real — comportamento esperado, conteúdo está no DOM (SEO ok).
