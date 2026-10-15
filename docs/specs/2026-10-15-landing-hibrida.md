# Landing híbrida — portfólio clássico + GuiOS

## Problema
O GuiOS é um ótimo destino, mas uma porta de entrada ruim para quem não é da área:
recrutadores e curiosos precisam ver nome/foto/stack/projetos em segundos, sem interagir.
No mobile, emular um iPhone dentro do próprio celular adiciona atrito sem surpreender.
Dentro do GuiOS, visitantes leigos caem numa mesa vazia sem saber onde clicar.

## Decisões (com o Guilherme, 15/10/2026)
1. **Híbrido**: landing clássica em `/`, GuiOS movido para `/os`.
2. **Estética**: editorial claro+escuro (ref.: lucasweb.dev + gabrieloliroddev.online) —
   tipografia display grande, numeração de seções (01–05), marca-texto amarelo,
   badge "open to work", muito respiro. Segue o tema do sistema com toggle (já existente).
3. **Entrada do GuiOS**: seção com mockup de MacBook exibindo o GuiOS REAL em miniatura
   (iframe `/os?preview=1`, lazy + escalado, não interativo) e CTA "Entrar no GuiOS".
4. **Mobile**: landing é a experiência principal; GuiOS mobile continua acessível em `/os`.
5. **Onboarding no GuiOS**: no primeiro boot da sessão (desktop), o app **Sobre** abre
   sozinho — ninguém mais cai numa mesa vazia.

## Estrutura da landing (`/`)
Header fixo (nome, âncoras, PT/EN, tema, botão GuiOS) →
Hero (badge open-to-work, headline com marca-texto, sub, links sociais, avatar) →
01 Projetos (cards tipográficos de `src/data/projects.ts`) →
02 GuiOS (MacBook + preview real + CTA) →
03 Ferramentas (grupos frontend/backend/ferramentas de `mainStack`) →
04 Experiência (timeline de `src/data/career.ts`) →
05 Sobre (avatar + bio) →
Contato (CTA gigante + e-mail/GitHub/LinkedIn/Instagram) → footer.

## Técnica
- `src/app/page.tsx` → `<Landing />`; novo `src/app/os/page.tsx` → `<GuiOS preview={searchParams.preview === "1"} />`.
- `GuiOS` ganha prop `preview`: pula boot, não grava flag, abre o Sobre, esconde a
  notificação de contato. O iframe tem 1280×800 internos (força modo desktop) e é
  escalado por `transform: scale()` medido com ResizeObserver; monta só quando a seção
  se aproxima do viewport (IntersectionObserver) e fica `pointer-events-none`.
- i18n: bloco `landing.*` no dicionário existente. Tokens `--landing-bg`/`--landing-card`
  em `globals.css` (off-white no claro, quase-preto no escuro).
- Sitemap ganha `/os`. Metadata raiz passa a descrever o portfólio; `/os` tem título próprio.

## Fora de escopo / pendente do usuário
- Formação acadêmica: sem dado real, NÃO inventar — seção omitida até o Guilherme informar.
- E-mail público e datas de carreira seguem com `// REVISAR`.
