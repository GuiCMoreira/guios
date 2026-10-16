import type { Project } from "@/lib/types";

export const GITHUB_URL = "https://github.com/GuiCMoreira";
export const LINKEDIN_URL = "https://www.linkedin.com/in/guilherme-de-carvalho-moreira/";
export const INSTAGRAM_URL = "https://www.instagram.com/_guic_m/";
export const AVATAR_URL = "https://avatars.githubusercontent.com/u/142915547?v=4";
// Fotos originais (regravadas sem metadados) para a landing.
export const PHOTO_3X4 = "/me/guilherme-3x4.webp";
export const PHOTO_9X16 = "/me/guilherme-9x16.webp";
export const EMAIL = "gui0307carvalho@gmail.com";

const allProjects: Project[] = [
  {
    id: "restaurant-digital",
    name: "restaurant-digital",
    year: 2026,
    category: "web",
    featured: true,
    stack: ["Next.js", "NestJS", "RabbitMQ", "Socket.IO", "Supabase", "Redis"],
    github: "https://github.com/GuiCMoreira/restaurant-digital",
    demo: "https://restaurant-digital-web.vercel.app",
    image: "/projects/restaurant-digital.webp",
    tagline: {
      pt: "Cardápio digital em microsserviços que conversam por filas",
      en: "Digital menu built on microservices that talk through queues",
    },
    plain: {
      what: {
        pt: "Um cardápio digital para restaurantes: o cliente faz o pedido pelo celular, na própria mesa, e ele aparece na hora na cozinha.",
        en: "A digital menu for restaurants: customers order from their phone at the table, and the order shows up in the kitchen instantly.",
      },
      problem: {
        pt: "Menos espera e menos erro de anotação: o pedido sai da mesa direto para a cozinha e para a conta, e o garçom fecha tudo no fim.",
        en: "Less waiting and fewer note-taking mistakes: the order goes straight from the table to the kitchen and to the bill, and the waiter closes it at the end.",
      },
      myPart: {
        pt: "Projeto de estudo para aprender a arquitetura usada por sistemas grandes, em que várias partes independentes conversam por mensagens. Construí todas essas partes e a ligação entre elas.",
        en: "A study project to learn the architecture big systems use, where several independent parts talk to each other through messages. I built all of those parts and the connections between them.",
      },
    },
    description: {
      pt: "O cliente pede pela mesa, a cozinha recebe na hora e o garçom fecha a conta. Três apps Next.js e quatro serviços NestJS — pedido, cozinha, comanda e notificação —, cada um com o próprio banco, trocando eventos por um exchange do RabbitMQ.",
      en: "Customers order from their table, the kitchen sees it instantly and the waiter closes the bill. Three Next.js apps and four NestJS services — order, kitchen, billing and notification —, each with its own database, exchanging events through a RabbitMQ exchange.",
    },
    highlights: [
      {
        pt: "Um evento, vários consumidores: o pedido chega à cozinha e à comanda sem que um saiba do outro",
        en: "One event, many consumers: the order reaches kitchen and bill without either knowing about the other",
      },
      {
        pt: "Tempo real com rooms do Socket.IO: cada mesa só recebe o que é dela",
        en: "Real time with Socket.IO rooms: each table only gets its own updates",
      },
      {
        pt: "Contratos dos eventos num pacote compartilhado, checados pelo compilador",
        en: "Event contracts in a shared package, checked by the compiler",
      },
    ],
  },
  {
    id: "valorant-strathub",
    name: "valorant-strathub",
    year: 2025,
    category: "web",
    featured: true,
    stack: ["PHP 8", "PostgreSQL", "Supabase", "Tailwind CSS", "PHPUnit", "PHPStan"],
    github: "https://github.com/GuiCMoreira/valorant-strathub",
    demo: "https://valorantstrathub.vercel.app",
    image: "/projects/valorant-strathub.webp",
    tagline: {
      pt: "Estratégias de Valorant por agente e mapa, em PHP sem framework",
      en: "Valorant strategies by agent and map, in framework-free PHP",
    },
    plain: {
      what: {
        pt: "Uma plataforma onde jogadores de Valorant (um jogo de tiro competitivo) compartilham, avaliam e encontram estratégias para cada personagem e mapa.",
        en: "A platform where players of Valorant (a competitive shooter game) share, rate and find strategies for each character and map.",
      },
      problem: {
        pt: "Boas estratégias ficam espalhadas em vídeos e grupos. Aqui elas ficam organizadas num só lugar, com avaliação da comunidade para as melhores aparecerem primeiro.",
        en: "Good strategies are scattered across videos and chat groups. Here they're organized in one place, with community ratings so the best ones rise to the top.",
      },
      myPart: {
        pt: "Projeto de conclusão de curso, feito em equipe na FATEC e depois revisado com foco em segurança e testes automatizados. Foi escrito sem usar framework, o que exige construir à mão partes que normalmente vêm prontas.",
        en: "Final college project, built as a team at FATEC and later reviewed with a focus on security and automated tests. It was written without a framework, which means building by hand parts that usually come ready-made.",
      },
    },
    description: {
      pt: "Plataforma colaborativa onde jogadores publicam, avaliam e encontram estratégias. Trabalho de conclusão de curso escrito sem framework — roteamento, sessão, CSRF e camada de dados feitos à mão — e revisado depois com foco em segurança.",
      en: "Collaborative platform where players publish, rate and find strategies. Final college project written without a framework — routing, sessions, CSRF and data layer by hand — and later reviewed with a security focus.",
    },
    highlights: [
      {
        pt: "Sessão persistente no padrão split-token, com revogação por dispositivo",
        en: "Persistent session using the split-token pattern, revocable per device",
      },
      {
        pt: "74 testes PHPUnit e PHPStan nível 6 na CI",
        en: "74 PHPUnit tests and PHPStan level 6 in CI",
      },
      {
        pt: "Roda sem conta em serviço nenhum: SQLite e disco local por padrão",
        en: "Runs without any cloud account: SQLite and local disk by default",
      },
    ],
  },
  {
    id: "financemy",
    name: "FinanceMy",
    year: 2026,
    category: "web",
    featured: true,
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vitest", "Docker"],
    github: "https://github.com/GuiCMoreira/financemy",
    image: "/projects/financemy.webp",
    status: "wip",
    tagline: {
      pt: "Controle financeiro self-hosted que mostra em que dia o saldo fica negativo",
      en: "Self-hosted finance app that shows the day your balance goes negative",
    },
    plain: {
      what: {
        pt: "Um aplicativo de finanças pessoais que mostra, dia a dia, quanto dinheiro vai ter na conta.",
        en: "A personal finance app that shows, day by day, how much money you'll have in your account.",
      },
      problem: {
        pt: "A maioria dos apps só mostra o saldo de hoje. Este avisa em que dia o saldo vai ficar negativo, contando contas, parcelas e a fatura do cartão.",
        en: "Most apps only show today's balance. This one tells you on which day your balance will go negative, counting bills, installments and the credit card statement.",
      },
      myPart: {
        pt: "Construí para organizar as minhas próprias finanças, e qualquer pessoa pode instalar o seu. Ainda não está 100% completo.",
        en: "I built it to organize my own finances, and anyone can install their own copy. It's not 100% complete yet.",
      },
    },
    description: {
      pt: "Fluxo de caixa por data, cartão com fechamento e vencimento de verdade, reembolsos de quem usa o seu cartão, parcelamentos, recorrências e relatórios. Cada pessoa sobe a própria instância, protegida por senha. As regras vivem numa camada pura, sem banco nem React, coberta por 85 testes.",
      en: "Cash flow by date, credit cards with real closing and due dates, reimbursements from people who use your card, installments, recurring entries and reports. Each person runs their own password-protected instance. Business rules live in a pure layer, with no database or React, covered by 85 tests.",
    },
    highlights: [
      {
        pt: "Uma tabela de lançamentos: parcelamento e recorrência são geradores, não tipos",
        en: "One entries table: installments and recurrences are generators, not types",
      },
      {
        pt: "Dinheiro em centavos inteiros e datas como YYYY-MM-DD: nada de float nem fuso",
        en: "Money as integer cents and dates as YYYY-MM-DD: no floats, no timezone bugs",
      },
      {
        pt: "Demo completa com um comando: docker compose sobe banco, app e dados fictícios",
        en: "Full demo in one command: docker compose brings up database, app and sample data",
      },
    ],
  },
  {
    id: "eliteh-protect",
    name: "Eliteh Protect",
    year: 2026,
    category: "web",
    featured: true,
    stack: ["Next.js", "TypeScript", "Supabase", "PL/pgSQL", "Vitest"],
    demo: "https://www.elitehprotect.com",
    image: "/projects/eliteh-protect.webp",
    tagline: {
      pt: "Site e sistema interno de uma empresa de segurança patrimonial",
      en: "Website and internal system for a property security company",
    },
    plain: {
      what: {
        pt: "Um site e um sistema de gestão para a Eliteh Protect, empresa de Bragança Paulista que instala concertinas, cercas elétricas e redes de proteção.",
        en: "A website and a management system for Eliteh Protect, a company in Bragança Paulista (Brazil) that installs razor wire, electric fences and safety nets.",
      },
      problem: {
        pt: "A Eliteh precisava ser encontrada por quem procura proteção para a casa no Google e, ao mesmo tempo, organizar o dia a dia: orçamentos, estoque, financeiro, equipe e ordens de serviço, que antes ficavam espalhados.",
        en: "Eliteh needed to be found on Google by people looking to protect their homes, and also to organize its day-to-day: quotes, inventory, finances, staff and service orders, which used to be scattered.",
      },
      myPart: {
        pt: "Desenvolvi as duas partes: o site, que traz clientes e pedidos de orçamento, e o sistema interno completo, que a equipe usa todos os dias. Está em produção.",
        en: "I built both parts: the website, which brings in customers and quote requests, and the full internal system the team uses every day. It's live in production.",
      },
    },
    description: {
      pt: "Duas aplicações no mesmo projeto, em produção: o site institucional, com foco em SEO local, e o painel administrativo que a empresa usa no dia a dia — estoque, financeiro, RH e ordens de serviço. Repositório privado.",
      en: "Two applications in one project, in production: the company website, focused on local SEO, and the admin panel the team uses daily — inventory, finance, HR and service orders. Private repository.",
    },
    highlights: [
      {
        pt: "35 rotas de API e 33 telas no painel administrativo",
        en: "35 API routes and 33 screens in the admin panel",
      },
      {
        pt: "Regras críticas em funções PL/pgSQL, cobertas por 484 testes",
        en: "Critical rules in PL/pgSQL functions, covered by 484 tests",
      },
    ],
  },
  {
    id: "guios",
    name: "GuiOS",
    year: 2026,
    category: "web",
    featured: true,
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind v4", "Motion", "Zustand"],
    github: "https://github.com/GuiCMoreira/guios",
    demo: "https://guicmoreira.vercel.app/os",
    image: "/projects/guios.webp",
    tagline: {
      pt: "Este portfólio — o sistema operacional que você pode abrir agora",
      en: "This portfolio — the operating system you can open right now",
    },
    plain: {
      what: {
        pt: "Este próprio portfólio, em versão \"sistema operacional\": um computador de mentira dentro do navegador, com janelas, programas e até um terminal.",
        en: "This very portfolio, as an \"operating system\": a make-believe computer inside the browser, with windows, apps and even a terminal.",
      },
      problem: {
        pt: "Mostrar habilidades de um jeito que a pessoa possa experimentar, e não só ler. Cada detalhe, de arrastar janelas a abrir programas, foi construído do zero.",
        en: "Showing skills in a way people can try out, not just read. Every detail, from dragging windows to opening apps, was built from scratch.",
      },
      myPart: {
        pt: "Fiz tudo: o design, as animações e a lógica que imita um sistema operacional de verdade, com cuidado para funcionar bem no celular e para pessoas com deficiência.",
        en: "I did everything: the design, the animations and the logic that mimics a real operating system, making sure it works well on phones and for people with disabilities.",
      },
    },
    description: {
      pt: "Um mini-macOS construído do zero dentro do site: janelas que arrastam, redimensionam e maximizam com animação, dock com magnification, terminal com easter eggs, Safari com buscador paródia e até uma Lixeira com os bugs reais deletados durante o desenvolvimento. No celular, vira um smartphone.",
      en: "A mini-macOS built from scratch inside the site: windows that drag, resize and maximize with animation, a dock with magnification, a terminal full of easter eggs, a Safari with a parody search engine and even a Trash holding the real bugs deleted during development. On a phone, it becomes a smartphone.",
    },
    highlights: [
      {
        pt: "Window manager próprio: geometria em motion values, sem re-render durante o drag",
        en: "Custom window manager: geometry in motion values, zero re-renders while dragging",
      },
      {
        pt: "Lighthouse 100 em acessibilidade, SEO e boas práticas",
        en: "Lighthouse 100 on accessibility, SEO and best practices",
      },
      {
        pt: "Tema claro/escuro, PT/EN e prefers-reduced-motion em todas as animações",
        en: "Light/dark theme, PT/EN and prefers-reduced-motion across every animation",
      },
    ],
  },
  {
    id: "navalhago",
    name: "NavalhaGo",
    year: 2026,
    category: "web",
    featured: true,
    status: "wip",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Tailwind 4", "PWA", "Turborepo", "Vitest", "pgTAP", "Playwright"],
    image: "/projects/navalhago.webp",
    tagline: {
      pt: "Agenda e gestão para barbearias, do horário marcado pelo link ao caixa fechado",
      en: "Barbershop scheduling and management, from the booking link to the closed register",
    },
    plain: {
      what: {
        pt: "Um aplicativo para barbearias organizarem a agenda e o caixa: cada barbeiro tem a sua agenda e o cliente marca o horário sozinho, pelo celular.",
        en: "An app for barbershops to organize their schedule and register: each barber has their own schedule and customers book on their own, from their phone.",
      },
      problem: {
        pt: "Barbearias ainda marcam horário por mensagem e anotam tudo no papel. Aqui o cliente agenda e recebe a confirmação no WhatsApp, e o dono vê quanto cada barbeiro tem a receber.",
        en: "Barbershops still take bookings by text message and write everything on paper. Here customers book and get a WhatsApp confirmation, and the owner sees how much each barber has earned.",
      },
      myPart: {
        pt: "Estou construindo do zero, pensado como produto para vender por assinatura. Ainda em desenvolvimento.",
        en: "I'm building it from scratch, designed as a product to sell by subscription. Still in development.",
      },
    },
    description: {
      pt: "SaaS multi-tenant para barbearias: cada cadeira tem a sua agenda, o cliente marca sozinho pelo link da barbearia e confirma pelo WhatsApp, e a comanda já sai com a comissão de cada barbeiro calculada. Tem Pix no agendamento, clube de assinatura, fidelidade, campanhas para clientes sumidos, relatórios e app instalável. Em desenvolvimento ativo — repositório privado por enquanto.",
      en: "Multi-tenant SaaS for barbershops: each chair has its own schedule, customers book on their own through the shop's link and confirm on WhatsApp, and the bill comes out with each barber's commission already calculated. It has Pix at booking, a subscription club, loyalty, win-back campaigns, reports and an installable app. Under active development — private repository for now.",
    },
    highlights: [
      {
        pt: "Mais de 650 testes: 168 de regras (Vitest), 423 asserções no banco (pgTAP) e 34 fluxos ponta a ponta por tamanho de tela (Playwright)",
        en: "650+ tests: 168 rule tests (Vitest), 423 database assertions (pgTAP) and 34 end-to-end flows per screen size (Playwright)",
      },
      {
        pt: "Isolamento entre barbearias garantido no banco, com RLS do Postgres testada",
        en: "Isolation between barbershops enforced in the database, with tested Postgres RLS",
      },
      {
        pt: "Horário sobreposto é impossível por constraint EXCLUDE no Postgres, não por um if no código",
        en: "Overlapping bookings are impossible thanks to a Postgres EXCLUDE constraint, not an if statement",
      },
    ],
  },
];

// Ordem da vitrine (landing, GuiOS e Safari usam a mesma).
const ORDER = ["eliteh-protect", "valorant-strathub", "guios", "restaurant-digital", "navalhago", "financemy"];

export const projects: Project[] = [...allProjects].sort((a, b) => {
  const ia = ORDER.indexOf(a.id);
  const ib = ORDER.indexOf(b.id);
  return (ia === -1 ? ORDER.length : ia) - (ib === -1 ? ORDER.length : ib);
});

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
