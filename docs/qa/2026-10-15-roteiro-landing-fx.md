# Roteiro QA - Landing v4 "fx" (15/10/2026)

Ambiente: dev :3777, chrome-devtools MCP, viewport 1600×900 e 390×844.

## Cenários e resultados

1. PASS - Hero novo: nome gigante em 2 linhas (2ª em contorno), prompt `gui@os:~$ whoami`
   com cursor piscando, grade de pontos, foto P&B, dica do botão direito. Claro E escuro.
2. PASS - Full-width: containers em `px-[clamp(20px,5vw,96px)]`, conteúdo ocupa a tela
   (verificado em 1600px, sem faixa morta central).
3. PASS - CursorFX: `html.os-cursor` ativa com pointermove, anel visível nos screenshots;
   mobile emulado NÃO ativa (cursor: false). ClickSpark via CSS keyframes.
4. PASS - Menu de contexto próprio: contextmenu abre painel glass com prompt e 6 ações
   (Entrar no GuiOS, Copiar e-mail, Modo claro/escuro, English/Português, GitHub, LinkedIn);
   Esc fecha.
5. FIXED→PASS - SplitWords: títulos não apareciam porque o span clipado pelo
   overflow-hidden nunca intersecta o viewport (IntersectionObserver mede área visível).
   Gatilho movido para o pai com variants+stagger; títulos entram palavra a palavra.
6. PASS - VelocityMarquee da stack entre hero e projetos, full-bleed, itens com ✦ âmbar.
7. PASS - Grid assimétrico de projetos (7/5 · 5/7 · 6/6 no xl), spotlight segue o mouse
   (CSS vars), rótulo "abrir ↗" no cursor sobre os cards.
8. PASS - Prompts por seção no lugar de números: `~/projetos$ ls --destaques`,
   `~/guios$ ./boot --preview`, `~/stack$ ls ferramentas/`, `~/experiencia$ git log
   --oneline`, `~/sobre$ cat bio.md`, `./contato --agora`.
9. PASS - ScrollProgress amarelo no topo (visível nos screenshots ao rolar).
10. PASS - Mobile 390×844: sem scroll horizontal (390==390), sem cursor/context menu,
    hero empilhado legível; marquee estático só com reduced-motion.
11. PASS - Botões magnéticos (Magnetic) nos CTAs/sociais; tilt 3D + P&B→cor na foto
    (hover desktop).
12. PASS - Build de produção limpo; modal de projetos e GuiOS intocados.
