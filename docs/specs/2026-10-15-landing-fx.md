# Landing v4 - "a parte de fora do GuiOS"

Pedido do Guilherme (15/10/2026): experiência única estilo react-bits - cursor custom,
menu de contexto próprio, full-width 16:9, efeito na foto, scrolls diferentes, botões
com estrutura própria. Referências: Gustavo Domingues (brutalist/marquee) e Caio Scura.

## Conceito
A landing é a casca do sistema: labels em mono como prompts (`gui@os:~/projetos $`),
cursor e menu de contexto próprios, amarelo marca-texto promovido a acento de sistema.
Ousadia concentrada no hero (nome gigante, 2ª linha em contorno) + cursor; seções
disciplinadas. Números 01–05 removidos (não eram sequência) → caminhos de terminal.

## Efeitos (src/components/landing/fx/, todos com motion, sem gsap/three)
| Efeito | Inspiração react-bits | Gate |
|---|---|---|
| CursorFX: dot+anel difference, rótulo "abrir ↗", ClickSpark | TargetCursor/ClickSpark | pointer:fine && !reduced |
| LandingContextMenu (botão direito) | - (linguagem do GuiOS) | desktop |
| VelocityMarquee da stack | ScrollVelocity | reduced → estático |
| SplitWords nos títulos | SplitText | reduced → fade |
| TiltPhoto (3D + P&B→cor) | TiltedCard | touch/reduced → off |
| Magnetic + brilho no CTA | Magnet/StarBorder | idem |
| SpotlightCard nos projetos | SpotlightCard/GlareHover | hover-only |
| ScrollProgress amarelo | - | sempre |

## Layout
Container full-bleed `px-[clamp(20px,5vw,96px)]`; hero 100dvh; marquee full-bleed;
projetos: destaques em linha dupla larga, demais em grid; contato gigante.

## Não muda
GuiOS inteiro, modal de projetos (ganha só spotlight), SEO/metadata, mobile = sem
cursor/context menu, Lighthouse 100 como critério de aceite.
