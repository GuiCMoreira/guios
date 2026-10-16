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
